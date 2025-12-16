import React, { useState, useEffect } from ‘react’;
import { User, Mail, Lock, Video, Eye, EyeOff, CheckCircle, AlertCircle, Loader, Globe, Shield, LogOut, Settings, UserCircle } from ‘lucide-react’;

// DeafAuth User Profile Type
interface DeafAuthUser {
id: string;
email: string;
username: string;
sign_lang: ‘ASL’ | ‘BSL’ | ‘LSF’ | ‘Auslan’ | ‘JSL’ | ‘Other’;
deaf_identity: ‘Deaf’ | ‘Hard-of-Hearing’ | ‘CODA’ | ‘DeafBlind’ | ‘Late-Deafened’;
auth_method: ‘passwordless’ | ‘oauth’ | ‘biometric’ | ‘video_sign’;
roles: string[];
pinksync_ready: boolean;
fibonrose_badge: string;
created_at: string;
avatar_url?: string;
}

// Component 1: Sign Language Selector
const SignLanguageSelector = ({ value, onChange, disabled = false }) => {
const signLanguages = [
{ code: ‘ASL’, name: ‘American Sign Language’, flag: ‘🇺🇸’ },
{ code: ‘BSL’, name: ‘British Sign Language’, flag: ‘🇬🇧’ },
{ code: ‘LSF’, name: ‘French Sign Language’, flag: ‘🇫🇷’ },
{ code: ‘Auslan’, name: ‘Australian Sign Language’, flag: ‘🇦🇺’ },
{ code: ‘JSL’, name: ‘Japanese Sign Language’, flag: ‘🇯🇵’ },
{ code: ‘Other’, name: ‘Other Sign Language’, flag: ‘🌍’ }
];

return (
<div className="space-y-2">
<label className="block text-sm font-medium text-gray-700">
<Globe className="inline w-4 h-4 mr-2" />
Primary Sign Language
</label>
<div className="grid grid-cols-2 gap-3">
{signLanguages.map(lang => (
<button
key={lang.code}
type=“button”
disabled={disabled}
onClick={() => onChange(lang.code)}
className={`p-4 rounded-lg border-2 transition-all ${ value === lang.code ? 'border-pink-500 bg-pink-50 shadow-md' : 'border-gray-200 hover:border-pink-300' } ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
>
<div className="text-2xl mb-1">{lang.flag}</div>
<div className="font-semibold text-sm">{lang.code}</div>
<div className="text-xs text-gray-600">{lang.name}</div>
</button>
))}
</div>
</div>
);
};

// Component 2: Deaf Identity Selector
const DeafIdentitySelector = ({ value, onChange, disabled = false }) => {
const identities = [
{ id: ‘Deaf’, label: ‘Deaf’, description: ‘Culturally Deaf’, icon: ‘🤟’ },
{ id: ‘Hard-of-Hearing’, label: ‘Hard of Hearing’, description: ‘Partial hearing’, icon: ‘👂’ },
{ id: ‘CODA’, label: ‘CODA’, description: ‘Child of Deaf Adults’, icon: ‘👨‍👩‍👧’ },
{ id: ‘DeafBlind’, label: ‘DeafBlind’, description: ‘Deaf and Blind’, icon: ‘✋’ },
{ id: ‘Late-Deafened’, label: ‘Late-Deafened’, description: ‘Became deaf later’, icon: ‘🔇’ }
];

return (
<div className="space-y-2">
<label className="block text-sm font-medium text-gray-700">
<UserCircle className="inline w-4 h-4 mr-2" />
Deaf Identity
</label>
<div className="space-y-2">
{identities.map(identity => (
<button
key={identity.id}
type=“button”
disabled={disabled}
onClick={() => onChange(identity.id)}
className={`w-full p-4 rounded-lg border-2 transition-all text-left ${ value === identity.id ? 'border-pink-500 bg-pink-50 shadow-md' : 'border-gray-200 hover:border-pink-300' } ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
>
<div className="flex items-center gap-3">
<span className="text-2xl">{identity.icon}</span>
<div className="flex-1">
<div className="font-semibold">{identity.label}</div>
<div className="text-sm text-gray-600">{identity.description}</div>
</div>
{value === identity.id && (
<CheckCircle className="w-5 h-5 text-pink-500" />
)}
</div>
</button>
))}
</div>
</div>
);
};

// Component 3: Auth Method Selector
const AuthMethodSelector = ({ value, onChange, disabled = false }) => {
const methods = [
{ id: ‘video_sign’, label: ‘Video Sign-In’, description: ‘Sign your name in ASL’, icon: Video, color: ‘pink’ },
{ id: ‘passwordless’, label: ‘Email Magic Link’, description: ‘No password needed’, icon: Mail, color: ‘blue’ },
{ id: ‘oauth’, label: ‘Social Login’, description: ‘Google, Apple, GitHub’, icon: Shield, color: ‘purple’ },
{ id: ‘biometric’, label: ‘Biometric’, description: ‘Face ID or Fingerprint’, icon: Eye, color: ‘green’ }
];

return (
<div className="space-y-2">
<label className="block text-sm font-medium text-gray-700">
<Lock className="inline w-4 h-4 mr-2" />
Authentication Method
</label>
<div className="grid grid-cols-1 md:grid-cols-2 gap-3">
{methods.map(method => {
const Icon = method.icon;
return (
<button
key={method.id}
type=“button”
disabled={disabled}
onClick={() => onChange(method.id)}
className={`p-4 rounded-lg border-2 transition-all text-left ${ value === method.id ? `border-pink-500 bg-pink-50 shadow-md` : 'border-gray-200 hover:border-gray-300' } ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
>
<Icon className={`w-6 h-6 mb-2 ${value === method.id ? 'text-pink-500' : 'text-gray-400'}`} />
<div className="font-semibold">{method.label}</div>
<div className="text-sm text-gray-600">{method.description}</div>
</button>
);
})}
</div>
</div>
);
};

// Component 4: Login Component
const DeafAuthLogin = ({ onLogin }) => {
const [email, setEmail] = useState(’’);
const [authMethod, setAuthMethod] = useState(‘passwordless’);
const [isLoading, setIsLoading] = useState(false);
const [error, setError] = useState(’’);

const handleSubmit = async () => {
if (!email) {
setError(‘Email is required’);
return;
}

```
setIsLoading(true);
setError('');

try {
  await new Promise(resolve => setTimeout(resolve, 1500));
  
  onLogin({
    id: 'user_' + Date.now(),
    email,
    username: email.split('@')[0],
    sign_lang: 'ASL',
    deaf_identity: 'Deaf',
    auth_method: authMethod,
    roles: ['user'],
    pinksync_ready: true,
    fibonrose_badge: 'Verified',
    created_at: new Date().toISOString()
  });
} catch (err) {
  setError('Login failed. Please try again.');
} finally {
  setIsLoading(false);
}
```

};

return (
<div className="max-w-md mx-auto p-6 bg-white rounded-xl shadow-lg">
<div className="text-center mb-6">
<div className="text-4xl mb-2">🤟</div>
<h2 className="text-2xl font-bold text-gray-800">DeafAuth Sign In</h2>
<p className="text-gray-600 text-sm">Deaf-first authentication</p>
</div>

```
  <div className="space-y-4">
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">
        <Mail className="inline w-4 h-4 mr-2" />
        Email Address
      </label>
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
        placeholder="you@example.com"
        disabled={isLoading}
      />
    </div>

    <AuthMethodSelector value={authMethod} onChange={setAuthMethod} disabled={isLoading} />

    {error && (
      <div className="flex items-center gap-2 p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
        <AlertCircle className="w-4 h-4" />
        {error}
      </div>
    )}

    <button
      onClick={handleSubmit}
      disabled={isLoading}
      className="w-full py-3 bg-pink-500 text-white rounded-lg font-semibold hover:bg-pink-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
    >
      {isLoading ? (
        <>
          <Loader className="w-5 h-5 animate-spin" />
          Signing you in...
        </>
      ) : (
        'Sign In'
      )}
    </button>

    <div className="text-center text-sm text-gray-600">
      New to MBTQ? <button type="button" className="text-pink-500 font-semibold hover:underline">Create Account</button>
    </div>
  </div>
</div>
```

);
};

// Component 5: Registration Component
const DeafAuthRegister = ({ onRegister }) => {
const [formData, setFormData] = useState({
email: ‘’,
username: ‘’,
sign_lang: ‘ASL’,
deaf_identity: ‘Deaf’,
auth_method: ‘passwordless’
});
const [isLoading, setIsLoading] = useState(false);
const [error, setError] = useState(’’);

const handleSubmit = async () => {
if (!formData.email || !formData.username) {
setError(‘Email and username are required’);
return;
}

```
setIsLoading(true);
setError('');

try {
  await new Promise(resolve => setTimeout(resolve, 1500));
  
  onRegister({
    id: 'user_' + Date.now(),
    ...formData,
    roles: ['user'],
    pinksync_ready: false,
    fibonrose_badge: 'Pending',
    created_at: new Date().toISOString()
  });
} catch (err) {
  setError('Registration failed. Please try again.');
} finally {
  setIsLoading(false);
}
```

};

return (
<div className="max-w-2xl mx-auto p-6 bg-white rounded-xl shadow-lg">
<div className="text-center mb-6">
<div className="text-4xl mb-2">🤟</div>
<h2 className="text-2xl font-bold text-gray-800">Join DeafAuth</h2>
<p className="text-gray-600 text-sm">Create your Deaf-first account</p>
</div>

```
  <div className="space-y-6">
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          <Mail className="inline w-4 h-4 mr-2" />
          Email
        </label>
        <input
          type="email"
          value={formData.email}
          onChange={(e) => setFormData({...formData, email: e.target.value})}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
          disabled={isLoading}
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          <User className="inline w-4 h-4 mr-2" />
          Username
        </label>
        <input
          type="text"
          value={formData.username}
          onChange={(e) => setFormData({...formData, username: e.target.value})}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
          disabled={isLoading}
        />
      </div>
    </div>

    <SignLanguageSelector 
      value={formData.sign_lang} 
      onChange={(val) => setFormData({...formData, sign_lang: val})}
      disabled={isLoading}
    />

    <DeafIdentitySelector 
      value={formData.deaf_identity} 
      onChange={(val) => setFormData({...formData, deaf_identity: val})}
      disabled={isLoading}
    />

    <AuthMethodSelector 
      value={formData.auth_method} 
      onChange={(val) => setFormData({...formData, auth_method: val})}
      disabled={isLoading}
    />

    {error && (
      <div className="flex items-center gap-2 p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
        <AlertCircle className="w-4 h-4" />
        {error}
      </div>
    )}

    <button
      onClick={handleSubmit}
      disabled={isLoading}
      className="w-full py-3 bg-pink-500 text-white rounded-lg font-semibold hover:bg-pink-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
    >
      {isLoading ? (
        <>
          <Loader className="w-5 h-5 animate-spin" />
          Creating account...
        </>
      ) : (
        'Create Account'
      )}
    </button>
  </div>
</div>
```

);
};

// Component 6: User Profile Card
const UserProfileCard = ({ user, onLogout, onEdit }) => {
const badgeColors = {
‘Verified’: ‘bg-green-100 text-green-800 border-green-300’,
‘Advocate’: ‘bg-purple-100 text-purple-800 border-purple-300’,
‘Pending’: ‘bg-yellow-100 text-yellow-800 border-yellow-300’,
‘Founder’: ‘bg-pink-100 text-pink-800 border-pink-300’
};

return (
<div className="max-w-md mx-auto p-6 bg-white rounded-xl shadow-lg">
<div className="flex items-start justify-between mb-4">
<div className="flex items-center gap-4">
<div className="w-16 h-16 bg-gradient-to-br from-pink-400 to-purple-500 rounded-full flex items-center justify-center text-white text-2xl font-bold">
{user.username.charAt(0).toUpperCase()}
</div>
<div>
<h3 className="text-xl font-bold text-gray-800">{user.username}</h3>
<p className="text-sm text-gray-600">{user.email}</p>
</div>
</div>
<button
onClick={onLogout}
className="p-2 text-gray-400 hover:text-red-500 transition-colors"
title="Logout"
>
<LogOut className="w-5 h-5" />
</button>
</div>

```
  <div className="space-y-3 mb-4">
    <div className="flex items-center justify-between py-2 border-b border-gray-100">
      <span className="text-sm text-gray-600">Sign Language</span>
      <span className="font-semibold text-gray-800">{user.sign_lang}</span>
    </div>
    <div className="flex items-center justify-between py-2 border-b border-gray-100">
      <span className="text-sm text-gray-600">Identity</span>
      <span className="font-semibold text-gray-800">{user.deaf_identity}</span>
    </div>
    <div className="flex items-center justify-between py-2 border-b border-gray-100">
      <span className="text-sm text-gray-600">Auth Method</span>
      <span className="font-semibold text-gray-800 capitalize">{user.auth_method.replace('_', ' ')}</span>
    </div>
    <div className="flex items-center justify-between py-2 border-b border-gray-100">
      <span className="text-sm text-gray-600">PinkSync</span>
      <span className={`text-sm font-semibold ${user.pinksync_ready ? 'text-green-600' : 'text-gray-400'}`}>
        {user.pinksync_ready ? 'Ready' : 'Not Connected'}
      </span>
    </div>
  </div>

  <div className="mb-4">
    <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold border ${badgeColors[user.fibonrose_badge] || badgeColors['Pending']}`}>
      Fibonrose: {user.fibonrose_badge}
    </span>
  </div>

  <button
    onClick={onEdit}
    className="w-full py-2 bg-gray-100 text-gray-700 rounded-lg font-semibold hover:bg-gray-200 transition-colors flex items-center justify-center gap-2"
  >
    <Settings className="w-4 h-4" />
    Edit Profile
  </button>
</div>
```

);
};

// Main Demo Component
export default function DeafAuthDemo() {
const [view, setView] = useState(‘login’);
const [user, setUser] = useState(null);

const handleLogin = (userData) => {
setUser(userData);
setView(‘profile’);
};

const handleRegister = (userData) => {
setUser(userData);
setView(‘profile’);
};

const handleLogout = () => {
setUser(null);
setView(‘login’);
};

return (
<div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-blue-50 py-12 px-4">
<div className="max-w-4xl mx-auto mb-8">
<div className="text-center mb-8">
<h1 className="text-4xl font-bold text-gray-800 mb-2">DeafAuth UI Components</h1>
<p className="text-gray-600">Complete authentication system for Deaf-first applications</p>
</div>

```
    {!user && (
      <div className="flex justify-center gap-4 mb-8">
        <button
          onClick={() => setView('login')}
          className={`px-6 py-2 rounded-lg font-semibold transition-colors ${
            view === 'login' 
              ? 'bg-pink-500 text-white' 
              : 'bg-white text-gray-700 hover:bg-gray-50'
          }`}
        >
          Sign In
        </button>
        <button
          onClick={() => setView('register')}
          className={`px-6 py-2 rounded-lg font-semibold transition-colors ${
            view === 'register' 
              ? 'bg-pink-500 text-white' 
              : 'bg-white text-gray-700 hover:bg-gray-50'
          }`}
        >
          Register
        </button>
      </div>
    )}
  </div>

  {view === 'login' && !user && <DeafAuthLogin onLogin={handleLogin} />}
  {view === 'register' && !user && <DeafAuthRegister onRegister={handleRegister} />}
  {view === 'profile' && user && (
    <UserProfileCard 
      user={user} 
      onLogout={handleLogout}
      onEdit={() => setView('register')}
    />
  )}

  {user && (
    <div className="max-w-4xl mx-auto mt-8 p-6 bg-white rounded-xl shadow-lg">
      <h3 className="text-lg font-bold text-gray-800 mb-4">MBTQ Ecosystem Status</h3>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="text-center p-4 bg-green-50 rounded-lg">
          <CheckCircle className="w-6 h-6 text-green-500 mx-auto mb-2" />
          <div className="text-sm font-semibold text-gray-800">DeafAuth</div>
          <div className="text-xs text-gray-600">Active</div>
        </div>
        <div className={`text-center p-4 rounded-lg ${user.pinksync_ready ? 'bg-green-50' : 'bg-gray-50'}`}>
          {user.pinksync_ready ? (
            <CheckCircle className="w-6 h-6 text-green-500 mx-auto mb-2" />
          ) : (
            <AlertCircle className="w-6 h-6 text-gray-400 mx-auto mb-2" />
          )}
          <div className="text-sm font-semibold text-gray-800">PinkSync</div>
          <div className="text-xs text-gray-600">{user.pinksync_ready ? 'Connected' : 'Setup Required'}</div>
        </div>
        <div className="text-center p-4 bg-purple-50 rounded-lg">
          <Shield className="w-6 h-6 text-purple-500 mx-auto mb-2" />
          <div className="text-sm font-semibold text-gray-800">Fibonrose</div>
          <div className="text-xs text-gray-600">{user.fibonrose_badge}</div>
        </div>
        <div className="text-center p-4 bg-blue-50 rounded-lg">
          <Video className="w-6 h-6 text-blue-500 mx-auto mb-2" />
          <div className="text-sm font-semibold text-gray-800">360 Magicians</div>
          <div className="text-xs text-gray-600">Ready</div>
        </div>
      </div>
    </div>
  )}
</div>
```

);
}
