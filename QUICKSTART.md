# DeafAuth Quick Start Guide

## Prerequisites

- Node.js 16+ or Deno 1.0+
- FFmpeg installed on your system
- Supabase account and project
- OpenID Connect provider (optional, for OIDC flow)

## Installation

### Step 1: Clone and Install Dependencies

```bash
git clone https://github.com/pinkycollie/deafauth-ecosystem.git
cd deafauth-ecosystem

# For Node.js
npm install

# For Deno
deno cache --reload src/index.ts
```

### Step 2: Set Up Environment Variables

```bash
cp .env.example .env
```

Edit `.env` with your credentials:

```env
# Supabase Configuration
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_ANON_KEY=your_anon_key_here
SUPABASE_SERVICE_KEY=your_service_role_key_here

# OIDC Configuration
OIDC_ISSUER=https://your-oidc-provider.com
OIDC_CLIENT_ID=your_client_id
OIDC_CLIENT_SECRET=your_client_secret
OIDC_REDIRECT_URI=http://localhost:3000/auth/callback

# JWT Secret (generate a strong random string)
JWT_SECRET=$(openssl rand -base64 32)
```

### Step 3: Install FFmpeg

#### Ubuntu/Debian
```bash
sudo apt update
sudo apt install ffmpeg
```

#### macOS
```bash
brew install ffmpeg
```

#### Windows
Download from https://ffmpeg.org/download.html

### Step 4: Set Up Supabase Database

Run the SQL migrations in your Supabase SQL Editor:

```sql
-- Create storage bucket for videos
INSERT INTO storage.buckets (id, name, public) 
VALUES ('deafauth-videos', 'deafauth-videos', false);

-- Set bucket policies
CREATE POLICY "Authenticated users can upload videos"
ON storage.objects FOR INSERT TO authenticated
WITH CHECK (bucket_id = 'deafauth-videos');

CREATE POLICY "Users can view own videos"
ON storage.objects FOR SELECT TO authenticated
USING (bucket_id = 'deafauth-videos' AND owner = auth.uid());

-- Ensure tables exist (should already be in your schema)
-- See README.md for full schema setup if needed
```

### Step 5: Run the Application

#### Node.js
```bash
# Development
npm run dev

# Production
npm run build
npm start
```

#### Deno
```bash
# Development
deno task dev

# Production
deno task start
```

## Testing the Features

### 1. OIDC Authentication

```typescript
import { createOIDCProvider } from './services/oidc';

const oidcProvider = createOIDCProvider({
  issuer: process.env.OIDC_ISSUER!,
  clientId: process.env.OIDC_CLIENT_ID!,
  clientSecret: process.env.OIDC_CLIENT_SECRET!,
  redirectUri: process.env.OIDC_REDIRECT_URI!,
}, process.env.JWT_SECRET!);

await oidcProvider.initialize();

// Get authorization URL
const { url, state } = oidcProvider.getAuthorizationUrl();
console.log('Visit:', url);

// Handle callback
const claims = await oidcProvider.handleCallback(params, state);
console.log('User authenticated:', claims);
```

### 2. Video Authentication

```typescript
import { createVideoAuthService } from './services/ffmpeg-auth';

const videoAuthService = createVideoAuthService();

// Process sign language video
const metadata = await videoAuthService.processVideo(
  '/path/to/video.mp4',
  'user-id-123'
);

console.log('Video stored:', metadata.videoId);
console.log('Expires:', metadata.expiresAt);

// Check if user has video auth
const hasVideo = await videoAuthService.hasVideoAuth('user-id-123');
console.log('Has video auth:', hasVideo);
```

### 3. Partner Communication

```typescript
import { createPartnerCommunicationService } from './services/partner-communication';

const partnerService = createPartnerCommunicationService(oidcProvider);

// Get deaf user profile
const profile = await partnerService.getDeafUserProfile('user-id-123');
console.log('User profile:', profile);

// Notify partners
await partnerService.notifyPartners('user-id-123', 'user_authenticated');

// Get accessibility recommendations
const recommendations = await partnerService.getAccessibilityRecommendations('user-id-123');
console.log('Recommendations:', recommendations);
```

## API Endpoints

Once running, the following endpoints are available:

### Authentication
- `GET /api/auth/oidc/authorize` - Start OIDC flow
- `POST /api/auth/oidc/callback` - Handle OIDC callback
- `POST /api/auth/video/upload` - Upload sign language video
- `GET /api/auth/verify` - Verify token
- `POST /api/auth/refresh` - Refresh token

### Accessibility
- `GET /api/accessibility/profile` - Get user accessibility profile
- `PUT /api/accessibility/preferences` - Update preferences
- `GET /api/accessibility/recommendations` - Get recommendations

### Partner
- `POST /api/partner/notify` - Notify partners
- `GET /api/partner/token` - Get partner token

## Troubleshooting

### FFmpeg Not Found
```bash
# Check FFmpeg installation
ffmpeg -version

# Add to PATH if needed
export PATH="$PATH:/path/to/ffmpeg/bin"
```

### Supabase Connection Issues
- Verify your URL and keys in `.env`
- Check your Supabase project is active
- Ensure RLS policies are correctly set

### OIDC Issues
- Verify your OIDC provider is configured
- Check redirect URI matches exactly
- Ensure client ID and secret are correct

### Video Upload Issues
- Check FFmpeg is installed and accessible
- Verify video file size is under 50MB
- Ensure video duration is under 30 seconds
- Check Supabase storage bucket exists

## Development Tips

### Enable Debug Logging
```bash
export DEBUG=deafauth:*
npm run dev
```

### Test Video Processing
```bash
# Create test video with FFmpeg
ffmpeg -f lavfi -i testsrc=duration=10:size=640x480:rate=30 test.mp4
```

### Clean Up Expired Videos
```typescript
const videoAuthService = createVideoAuthService();
const deleted = await videoAuthService.cleanupExpiredVideos();
console.log(`Cleaned up ${deleted} expired videos`);
```

## Production Deployment

### Environment Checklist
- [ ] Set strong JWT_SECRET (min 32 characters)
- [ ] Configure production OIDC issuer
- [ ] Set production redirect URIs
- [ ] Enable HTTPS/SSL
- [ ] Configure CORS for production domains
- [ ] Set up monitoring and logging
- [ ] Enable rate limiting
- [ ] Back up Supabase regularly
- [ ] Set up video cleanup cron job

### Recommended Services
- **Hosting**: Vercel, Railway, Render, or your preferred platform
- **OIDC Provider**: Auth0, Okta, Keycloak, or custom
- **Monitoring**: Sentry, LogRocket, or Datadog
- **CDN**: Cloudflare or similar for video delivery

## Security Notes

- Keep JWT_SECRET secure and never commit to version control
- Rotate secrets regularly (every 90 days recommended)
- Enable Supabase RLS on all tables
- Use HTTPS in production
- Implement rate limiting on auth endpoints
- Monitor failed authentication attempts
- Set up alerts for security events

## Support

- Documentation: [SECURITY.md](./SECURITY.md)
- Issues: https://github.com/pinkycollie/deafauth-ecosystem/issues
- Security: security@deafauth.mbtq.dev

---

Built with 🤟 for the Deaf community
