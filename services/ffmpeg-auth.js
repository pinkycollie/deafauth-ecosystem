"use strict";
/**
 * FFmpeg Video Authentication Service
 * Captures and processes sign language video for one-time authentication
 * Stores video securely in Supabase until security rise or additional auth required
 */
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FFmpegVideoAuthService = void 0;
exports.createVideoAuthService = createVideoAuthService;
exports.videoAuthUploadMiddleware = videoAuthUploadMiddleware;
var fluent_ffmpeg_1 = require("fluent-ffmpeg");
var fs_1 = require("fs");
var supabase_1 = require("./supabase");
var crypto_1 = require("crypto");
var FFmpegVideoAuthService = /** @class */ (function () {
    function FFmpegVideoAuthService(config) {
        this.config = __assign({ maxDuration: 30, maxFileSize: 50 * 1024 * 1024, allowedFormats: ['mp4', 'webm', 'mov'], videoBucket: 'deafauth-videos' }, config);
    }
    /**
     * Process and validate video for authentication
     * Compresses video to save storage space
     */
    FFmpegVideoAuthService.prototype.processVideo = function (inputPath, userId) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                return [2 /*return*/, new Promise(function (resolve, reject) {
                        var videoId = (0, crypto_1.randomUUID)();
                        var tempOutputPath = "/tmp/deafauth-".concat(videoId, ".mp4");
                        // Get video metadata first
                        fluent_ffmpeg_1.default.ffprobe(inputPath, function (err, metadata) { return __awaiter(_this, void 0, void 0, function () {
                            var duration, size, format;
                            var _this = this;
                            return __generator(this, function (_a) {
                                if (err) {
                                    return [2 /*return*/, reject(new Error("Failed to read video metadata: ".concat(err.message)))];
                                }
                                duration = metadata.format.duration || 0;
                                size = metadata.format.size || 0;
                                format = metadata.format.format_name || '';
                                // Validate video
                                if (duration > this.config.maxDuration) {
                                    return [2 /*return*/, reject(new Error("Video too long: ".concat(duration, "s (max: ").concat(this.config.maxDuration, "s)")))];
                                }
                                if (size > this.config.maxFileSize) {
                                    return [2 /*return*/, reject(new Error("File too large: ".concat(size, " bytes (max: ").concat(this.config.maxFileSize, " bytes)")))];
                                }
                                // Process and compress video
                                (0, fluent_ffmpeg_1.default)(inputPath)
                                    .outputOptions([
                                    '-c:v libx264', // H.264 codec
                                    '-crf 28', // Compression quality (lower = better quality)
                                    '-preset fast',
                                    '-c:a aac', // Audio codec
                                    '-b:a 128k', // Audio bitrate
                                    '-movflags +faststart', // Enable streaming
                                ])
                                    .output(tempOutputPath)
                                    .on('end', function () { return __awaiter(_this, void 0, void 0, function () {
                                    var _a, data, error, authMetadata, uploadError_1;
                                    return __generator(this, function (_b) {
                                        switch (_b.label) {
                                            case 0:
                                                _b.trys.push([0, 3, , 4]);
                                                return [4 /*yield*/, this.uploadToSupabase(tempOutputPath, userId, videoId)];
                                            case 1:
                                                _a = _b.sent(), data = _a.data, error = _a.error;
                                                // Clean up temp file
                                                (0, fs_1.unlinkSync)(tempOutputPath);
                                                if (error) {
                                                    return [2 /*return*/, reject(error)];
                                                }
                                                authMetadata = {
                                                    userId: userId,
                                                    videoId: videoId,
                                                    duration: duration,
                                                    format: 'mp4',
                                                    size: size,
                                                    timestamp: new Date(),
                                                    expiresAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days
                                                };
                                                // Store metadata in database
                                                return [4 /*yield*/, this.storeMetadata(authMetadata)];
                                            case 2:
                                                // Store metadata in database
                                                _b.sent();
                                                resolve(authMetadata);
                                                return [3 /*break*/, 4];
                                            case 3:
                                                uploadError_1 = _b.sent();
                                                reject(uploadError_1);
                                                return [3 /*break*/, 4];
                                            case 4: return [2 /*return*/];
                                        }
                                    });
                                }); })
                                    .on('error', function (ffmpegError) {
                                    // Clean up on error
                                    try {
                                        (0, fs_1.unlinkSync)(tempOutputPath);
                                    }
                                    catch (_a) { }
                                    reject(new Error("FFmpeg processing failed: ".concat(ffmpegError.message)));
                                })
                                    .run();
                                return [2 /*return*/];
                            });
                        }); });
                    })];
            });
        });
    };
    /**
     * Upload processed video to Supabase storage
     */
    FFmpegVideoAuthService.prototype.uploadToSupabase = function (filePath, userId, videoId) {
        return __awaiter(this, void 0, void 0, function () {
            var fileName, fileStream, _a, data, error, uploadError_2;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        fileName = "".concat(userId, "/").concat(videoId, ".mp4");
                        fileStream = null;
                        _b.label = 1;
                    case 1:
                        _b.trys.push([1, 3, 4, 5]);
                        fileStream = (0, fs_1.createReadStream)(filePath);
                        return [4 /*yield*/, supabase_1.supabase.storage
                                .from(this.config.videoBucket)
                                .upload(fileName, fileStream, {
                                contentType: 'video/mp4',
                                cacheControl: '3600',
                                upsert: false,
                            })];
                    case 2:
                        _a = _b.sent(), data = _a.data, error = _a.error;
                        return [2 /*return*/, { data: data, error: error }];
                    case 3:
                        uploadError_2 = _b.sent();
                        return [2 /*return*/, { data: null, error: uploadError_2 }];
                    case 4:
                        // Ensure stream is properly closed
                        if (fileStream && typeof fileStream.destroy === 'function') {
                            fileStream.destroy();
                        }
                        return [7 /*endfinally*/];
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Store video authentication metadata in database
     */
    FFmpegVideoAuthService.prototype.storeMetadata = function (metadata) {
        return __awaiter(this, void 0, void 0, function () {
            var error;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, supabase_1.supabase
                            .from('visual_credentials')
                            .insert({
                            user_id: metadata.userId,
                            biometric_type: 'sign_language_video',
                            biometric_hash: metadata.videoId,
                            created_at: metadata.timestamp.toISOString(),
                            last_used_at: metadata.timestamp.toISOString(),
                        })];
                    case 1:
                        error = (_a.sent()).error;
                        if (error) {
                            throw new Error("Failed to store video metadata: ".concat(error.message));
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Retrieve video URL for verification
     */
    FFmpegVideoAuthService.prototype.getVideoUrl = function (userId, videoId) {
        return __awaiter(this, void 0, void 0, function () {
            var fileName, _a, data, error;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        fileName = "".concat(userId, "/").concat(videoId, ".mp4");
                        return [4 /*yield*/, supabase_1.supabase.storage
                                .from(this.config.videoBucket)
                                .createSignedUrl(fileName, 3600)];
                    case 1:
                        _a = _b.sent(), data = _a.data, error = _a.error;
                        if (error) {
                            console.error('Error getting video URL:', error);
                            return [2 /*return*/, null];
                        }
                        return [2 /*return*/, data.signedUrl];
                }
            });
        });
    };
    /**
     * Delete video after security rise or expiration
     */
    FFmpegVideoAuthService.prototype.deleteVideo = function (userId, videoId) {
        return __awaiter(this, void 0, void 0, function () {
            var fileName, error;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        fileName = "".concat(userId, "/").concat(videoId, ".mp4");
                        return [4 /*yield*/, supabase_1.supabase.storage
                                .from(this.config.videoBucket)
                                .remove([fileName])];
                    case 1:
                        error = (_a.sent()).error;
                        if (error) {
                            console.error('Error deleting video:', error);
                            return [2 /*return*/, false];
                        }
                        // Also remove metadata
                        return [4 /*yield*/, supabase_1.supabase
                                .from('visual_credentials')
                                .delete()
                                .eq('biometric_hash', videoId)];
                    case 2:
                        // Also remove metadata
                        _a.sent();
                        return [2 /*return*/, true];
                }
            });
        });
    };
    /**
     * Check if video exists for user
     */
    FFmpegVideoAuthService.prototype.hasVideoAuth = function (userId) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, data, error;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, supabase_1.supabase
                            .from('visual_credentials')
                            .select('id')
                            .eq('user_id', userId)
                            .eq('biometric_type', 'sign_language_video')
                            .single()];
                    case 1:
                        _a = _b.sent(), data = _a.data, error = _a.error;
                        return [2 /*return*/, !!data && !error];
                }
            });
        });
    };
    /**
     * Clean up expired videos
     */
    FFmpegVideoAuthService.prototype.cleanupExpiredVideos = function () {
        return __awaiter(this, void 0, void 0, function () {
            var thirtyDaysAgo, _a, data, error, deletedCount, _i, data_1, record, deleted;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        thirtyDaysAgo = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);
                        return [4 /*yield*/, supabase_1.supabase
                                .from('visual_credentials')
                                .select('user_id, biometric_hash')
                                .eq('biometric_type', 'sign_language_video')
                                .lt('created_at', thirtyDaysAgo.toISOString())];
                    case 1:
                        _a = _b.sent(), data = _a.data, error = _a.error;
                        if (error || !data) {
                            return [2 /*return*/, 0];
                        }
                        deletedCount = 0;
                        _i = 0, data_1 = data;
                        _b.label = 2;
                    case 2:
                        if (!(_i < data_1.length)) return [3 /*break*/, 5];
                        record = data_1[_i];
                        return [4 /*yield*/, this.deleteVideo(record.user_id, record.biometric_hash)];
                    case 3:
                        deleted = _b.sent();
                        if (deleted)
                            deletedCount++;
                        _b.label = 4;
                    case 4:
                        _i++;
                        return [3 /*break*/, 2];
                    case 5: return [2 /*return*/, deletedCount];
                }
            });
        });
    };
    return FFmpegVideoAuthService;
}());
exports.FFmpegVideoAuthService = FFmpegVideoAuthService;
/**
 * Factory function to create video auth service
 */
function createVideoAuthService(config) {
    return new FFmpegVideoAuthService(config);
}
/**
 * Middleware to handle video upload for authentication
 */
function videoAuthUploadMiddleware(service) {
    var _this = this;
    return function (req, res) { return __awaiter(_this, void 0, void 0, function () {
        var userId, metadata, error_1;
        var _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _b.trys.push([0, 2, , 3]);
                    if (!req.file) {
                        return [2 /*return*/, res.status(400).json({ error: 'No video file provided' })];
                    }
                    userId = ((_a = req.user) === null || _a === void 0 ? void 0 : _a.id) || req.body.userId;
                    if (!userId) {
                        return [2 /*return*/, res.status(401).json({ error: 'User not authenticated' })];
                    }
                    return [4 /*yield*/, service.processVideo(req.file.path, userId)];
                case 1:
                    metadata = _b.sent();
                    res.json({
                        success: true,
                        videoId: metadata.videoId,
                        message: 'Sign language video authenticated and stored securely',
                        expiresAt: metadata.expiresAt,
                    });
                    return [3 /*break*/, 3];
                case 2:
                    error_1 = _b.sent();
                    console.error('Video auth upload error:', error_1);
                    res.status(500).json({
                        error: 'Failed to process video authentication',
                        message: error_1.message,
                    });
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    }); };
}
