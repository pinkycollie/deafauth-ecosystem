# 🔒 DeafAUTH - Universal Identity Layer

**Deaf-first authentication system for the MBTQ ecosystem**

-----

## 🎯 What is DeafAUTH?

DeafAUTH is the identity and authentication foundation for:

- **PinkSync** (automation engine)
- **360 Magicians** (AI agents)
- **Fibronrose** (trust validation)
- **mbtquniverse.com** (DAO platform)

### Features:

- ✅ Deaf-first UI design (ASL-friendly, visual-first)
- ✅ Supabase-powered authentication
- ✅ **OpenID Connect (OIDC) compliant**
- ✅ **FFmpeg video authentication for sign language**
- ✅ **Deno and Node.js compatible**
- ✅ **Partner integration (PinkSync, 360 Magicians)**
- ✅ **Adaptive accessibility communication**
- ✅ Fibronrose trust scoring
- ✅ Token-based API validation
- ✅ Ready for Web3 integration

-----

## 🚀 Quick Start

### 1. Clone the Repository

```bash
git clone https://github.com/pinkycollie/deafauth-ecosystem.git
cd deafauth-ecosystem
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Set Up Supabase

1. Go to [supabase.com](https://supabase.com) and create a new project
1. Copy your project URL and API keys
1. Run this SQL in the Supabase SQL Editor:

```sql
-- Custom Deaf profiles
create table deaf_profiles (
  id uuid references auth.users on delete cascade primary key,
  preferred_communication text default 'ASL',
  accessibility_needs jsonb,
  signing_avatar_url text,
  onboarding_completed boolean default false,
  created_at timestamp default now(),
  updated_at timestamp default now()
);

-- Fibronrose trust log
create table fibronrose_trust_log (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references auth.users on delete cascade,
  action text not null,
  trust_score_delta int default 0,
  metadata jsonb,
  timestamp timestamp default now()
);

-- Function to get user trust score
create or replace function get_trust_score(user_uuid uuid)
returns int as $$
  select coalesce(sum(trust_score_delta), 0)::int
  from fibronrose_trust_log
  where user_id = user_uuid;
$$ language sql;

-- Enable Row Level Security
alter table deaf_profiles enable row level security;
alter table fibronrose_trust_log enable row level security;

-- Policies
create policy "Users can view own profile"
  on deaf_profiles for select
  using (auth.uid() = id);

create policy "Users can view own trust log"
  on fibronrose_trust_log for select
  using (auth.uid() = user_id);
```

### 4. Configure Environment

```bash
cp .env.example .env
```

Edit `.env` with your Supabase credentials:

```env
SUPABASE_URL=https://xxxxx.supabase.co
SUPABASE_ANON_KEY=your_anon_key
SUPABASE_SERVICE_KEY=your_service_role_key
```

Edit `public/config.js` with your Supabase URL and anon key.

### 5. Run Development Server

```bash
npm run dev
```

Backend runs on: `http://localhost:3000`

### 6. Open Frontend

Open `public/index.html` in your browser or serve with:

```bash
# Using Python
python -m http.server 8000 --directory public

# Using Node (install globally: npm install -g http-server)
http-server public -p 8000
```

Then visit: `http://localhost:8000`

-----

## 🔐 Production-Ready Authentication

DeafAuth now includes enterprise-grade authentication features:

### OIDC/OpenID Connect
- Full OpenID Connect Core 1.0 compliance
- OAuth 2.0 with PKCE for secure authorization
- Custom deaf-specific JWT claims
- Compatible with standard OIDC providers

### FFmpeg Video Authentication
- One-time sign language authentication
- Secure video processing and storage in Supabase
- Automatic cleanup after 30 days or security rise
- H.264 compression for efficient storage

### Deno Runtime Support
- Compatible with Node.js, Deno, and Bun
- ESM imports and npm specifiers
- Full TypeScript support across runtimes

### Partner Integration
- Automatic notification to PinkSync and 360 Magicians
- Deaf user identification for adaptive UX
- Accessibility recommendations API
- Minimal, adaptive interface coordination

See [SECURITY.md](./SECURITY.md) for detailed documentation.

-----

## 📂 Project Structure

```
deafauth-ecosystem/
├── src/
│   └── index.ts          # Backend API server
├── public/
│   ├── index.html        # Sign in page
│   ├── signup.html       # Registration page
│   ├── dashboard.html    # User dashboard
│   ├── styles.css        # Deaf-first design
│   └── config.js         # Frontend config
├── .env.example          # Environment template
├── package.json          # Dependencies
├── tsconfig.json         # TypeScript config
└── README.md             # This file
```

-----

## 🔌 API Endpoints

### Authentication

**POST** `/api/auth/signup`

```json
{
  "email": "user@example.com",
  "password": "secure_password",
  "preferredCommunication": "ASL",
  "accessibilityNeeds": {}
}
```

**POST** `/api/auth/signin`

```json
{
  "email": "user@example.com",
  "password": "secure_password"
}
```

**POST** `/api/auth/validate`
Headers: `Authorization: Bearer <token>`

### User Profile

**GET** `/api/user/profile`
Headers: `Authorization: Bearer <token>`

### Fibronrose Logging

**POST** `/api/fibronrose/log`
Headers: `Authorization: Bearer <token>`

```json
{
  "action": "task_completed",
  "trust_score_delta": 5,
  "metadata": {}
}
```

-----

## 🔗 Integration with PinkSync

PinkSync validates DeafAUTH tokens before executing workflows:

```javascript
// In PinkSync API
const response = await fetch('https://deafauth.mbtq.dev/api/auth/validate', {
  method: 'POST',
  headers: {
    'Authorization': `Bearer ${userToken}`
  }
});

const { valid, user } = await response.json();

if (valid && user.trust_score >= 10) {
  // Execute workflow
}
```

-----

## 🌐 Deployment

### Option 1: Deploy to Render/Railway (Free)

1. Push to GitHub
1. Connect to Render or Railway
1. Set environment variables
1. Deploy!

### Option 2: Deploy Frontend to GitHub Pages

```bash
# Build and push to gh-pages branch
npm run build
git subtree push --prefix public origin gh-pages
```

### Option 3: Deploy to Vercel (Later, for production)

```bash
vercel --prod
```

-----

## 🧪 Testing

1. Visit `http://localhost:8000`
1. Click “View Demo Dashboard” to see the interface
1. Or create a real account via “Sign Up”
1. Test API endpoints with your session token

-----

## 🔮 Roadmap

- [x] Basic auth with Supabase
- [x] Deaf-first UI design
- [x] Fibronrose trust logging
- [x] API token validation
- [x] **OIDC/OpenID Connect compliance**
- [x] **FFmpeg video authentication for sign language**
- [x] **Supabase custom auth integration**
- [x] **Deno runtime compatibility**
- [x] **Partner communication (PinkSync, 360 Magicians)**
- [x] **Adaptive accessibility middleware**
- [ ] ASL video onboarding UI
- [ ] Signing avatar integration
- [ ] Web3 wallet connection
- [ ] DAO governance permissions

-----

## 🤝 Contributing

This is the foundation for the MBTQ ecosystem. Contributions welcome!

-----

## 📄 License

MIT License - Built with 🤟 for the Deaf community

-----

## 🔗 Links

- **PinkSync**: https://pinksync.io
- **360 Magicians**: https://360magicians.com
- **MBTQ Universe**: https://mbtquniverse.com
- **GitHub Org**: https://github.com/deafauth