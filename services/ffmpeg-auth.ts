/**
 * FFmpeg Video Authentication Service
 * Captures and processes sign language video for one-time authentication
 * Stores video securely in Supabase until security rise or additional auth required
 */

import ffmpeg from 'fluent-ffmpeg';
import { createReadStream, createWriteStream, unlinkSync } from 'fs';
import { join } from 'path';
import { supabase } from './supabase';
import { randomUUID } from 'crypto';

export interface VideoAuthConfig {
  maxDuration: number; // seconds
  maxFileSize: number; // bytes
  allowedFormats: string[];
  videoBucket: string;
}

export interface VideoAuthMetadata {
  userId: string;
  videoId: string;
  duration: number;
  format: string;
  size: number;
  signLanguage?: string;
  timestamp: Date;
  expiresAt?: Date;
}

export class FFmpegVideoAuthService {
  private config: VideoAuthConfig;

  constructor(config?: Partial<VideoAuthConfig>) {
    this.config = {
      maxDuration: 30, // 30 seconds max for sign language auth
      maxFileSize: 50 * 1024 * 1024, // 50MB
      allowedFormats: ['mp4', 'webm', 'mov'],
      videoBucket: 'deafauth-videos',
      ...config,
    };
  }

  /**
   * Process and validate video for authentication
   * Compresses video to save storage space
   */
  async processVideo(inputPath: string, userId: string): Promise<VideoAuthMetadata> {
    return new Promise((resolve, reject) => {
      const videoId = randomUUID();
      const tempOutputPath = `/tmp/deafauth-${videoId}.mp4`;

      // Get video metadata first
      ffmpeg.ffprobe(inputPath, async (err, metadata) => {
        if (err) {
          return reject(new Error(`Failed to read video metadata: ${err.message}`));
        }

        const duration = metadata.format.duration || 0;
        const size = metadata.format.size || 0;
        const format = metadata.format.format_name || '';

        // Validate video
        if (duration > this.config.maxDuration) {
          return reject(new Error(`Video too long: ${duration}s (max: ${this.config.maxDuration}s)`));
        }

        if (size > this.config.maxFileSize) {
          return reject(new Error(`File too large: ${size} bytes (max: ${this.config.maxFileSize} bytes)`));
        }

        // Process and compress video
        ffmpeg(inputPath)
          .outputOptions([
            '-c:v libx264', // H.264 codec
            '-crf 28', // Compression quality (lower = better quality)
            '-preset fast',
            '-c:a aac', // Audio codec
            '-b:a 128k', // Audio bitrate
            '-movflags +faststart', // Enable streaming
          ])
          .output(tempOutputPath)
          .on('end', async () => {
            try {
              // Upload to Supabase storage
              const { data, error } = await this.uploadToSupabase(
                tempOutputPath,
                userId,
                videoId
              );

              // Clean up temp file
              unlinkSync(tempOutputPath);

              if (error) {
                return reject(error);
              }

              const authMetadata: VideoAuthMetadata = {
                userId,
                videoId,
                duration,
                format: 'mp4',
                size,
                timestamp: new Date(),
                expiresAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days
              };

              // Store metadata in database
              await this.storeMetadata(authMetadata);

              resolve(authMetadata);
            } catch (uploadError) {
              reject(uploadError);
            }
          })
          .on('error', (ffmpegError) => {
            // Clean up on error
            try {
              unlinkSync(tempOutputPath);
            } catch {}
            reject(new Error(`FFmpeg processing failed: ${ffmpegError.message}`));
          })
          .run();
      });
    });
  }

  /**
   * Upload processed video to Supabase storage
   */
  private async uploadToSupabase(
    filePath: string,
    userId: string,
    videoId: string
  ): Promise<{ data: any; error: any }> {
    const fileName = `${userId}/${videoId}.mp4`;
    
    let fileStream: any = null;
    try {
      fileStream = createReadStream(filePath);
      
      const { data, error } = await supabase.storage
        .from(this.config.videoBucket)
        .upload(fileName, fileStream, {
          contentType: 'video/mp4',
          cacheControl: '3600',
          upsert: false,
        });

      return { data, error };
    } catch (uploadError) {
      return { data: null, error: uploadError };
    } finally {
      // Ensure stream is properly closed
      if (fileStream && typeof fileStream.destroy === 'function') {
        fileStream.destroy();
      }
    }
  }

  /**
   * Store video authentication metadata in database
   */
  private async storeMetadata(metadata: VideoAuthMetadata): Promise<void> {
    const { error } = await supabase
      .from('visual_credentials')
      .insert({
        user_id: metadata.userId,
        biometric_type: 'sign_language_video',
        biometric_hash: metadata.videoId,
        created_at: metadata.timestamp.toISOString(),
        last_used_at: metadata.timestamp.toISOString(),
      });

    if (error) {
      throw new Error(`Failed to store video metadata: ${error.message}`);
    }
  }

  /**
   * Retrieve video URL for verification
   */
  async getVideoUrl(userId: string, videoId: string): Promise<string | null> {
    const fileName = `${userId}/${videoId}.mp4`;

    const { data, error } = await supabase.storage
      .from(this.config.videoBucket)
      .createSignedUrl(fileName, 3600); // 1 hour expiry

    if (error) {
      console.error('Error getting video URL:', error);
      return null;
    }

    return data.signedUrl;
  }

  /**
   * Delete video after security rise or expiration
   */
  async deleteVideo(userId: string, videoId: string): Promise<boolean> {
    const fileName = `${userId}/${videoId}.mp4`;

    const { error } = await supabase.storage
      .from(this.config.videoBucket)
      .remove([fileName]);

    if (error) {
      console.error('Error deleting video:', error);
      return false;
    }

    // Also remove metadata
    await supabase
      .from('visual_credentials')
      .delete()
      .eq('biometric_hash', videoId);

    return true;
  }

  /**
   * Check if video exists for user
   */
  async hasVideoAuth(userId: string): Promise<boolean> {
    const { data, error } = await supabase
      .from('visual_credentials')
      .select('id')
      .eq('user_id', userId)
      .eq('biometric_type', 'sign_language_video')
      .single();

    return !!data && !error;
  }

  /**
   * Clean up expired videos
   */
  async cleanupExpiredVideos(): Promise<number> {
    const thirtyDaysAgo = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);

    const { data, error } = await supabase
      .from('visual_credentials')
      .select('user_id, biometric_hash')
      .eq('biometric_type', 'sign_language_video')
      .lt('created_at', thirtyDaysAgo.toISOString());

    if (error || !data) {
      return 0;
    }

    let deletedCount = 0;
    for (const record of data) {
      const deleted = await this.deleteVideo(record.user_id, record.biometric_hash);
      if (deleted) deletedCount++;
    }

    return deletedCount;
  }
}

/**
 * Factory function to create video auth service
 */
export function createVideoAuthService(config?: Partial<VideoAuthConfig>): FFmpegVideoAuthService {
  return new FFmpegVideoAuthService(config);
}

/**
 * Middleware to handle video upload for authentication
 */
export function videoAuthUploadMiddleware(service: FFmpegVideoAuthService) {
  return async (req: any, res: any) => {
    try {
      if (!req.file) {
        return res.status(400).json({ error: 'No video file provided' });
      }

      const userId = req.user?.id || req.body.userId;
      if (!userId) {
        return res.status(401).json({ error: 'User not authenticated' });
      }

      const metadata = await service.processVideo(req.file.path, userId);

      res.json({
        success: true,
        videoId: metadata.videoId,
        message: 'Sign language video authenticated and stored securely',
        expiresAt: metadata.expiresAt,
      });
    } catch (error: any) {
      console.error('Video auth upload error:', error);
      res.status(500).json({
        error: 'Failed to process video authentication',
        message: error.message,
      });
    }
  };
}
