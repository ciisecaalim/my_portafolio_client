import React, { useState, useEffect, useRef } from 'react';
import {
  FaCog, FaPalette, FaBell, FaShieldAlt, FaGlobe, FaSave, FaUndo,
  FaUser, FaEnvelope, FaUpload, FaKey, FaClock, FaCloud, FaDatabase,
  FaNetworkWired, FaUsersCog, FaEyeSlash, FaLanguage
} from 'react-icons/fa';

const STORAGE_KEY = 'adminSettings';

const defaultSettings = {
  profile: { name: 'Ciise Caalim', email: 'ciise@example.com', role: 'Admin', avatar: null },
  preferences: { theme: 'dark', language: 'en', dateFormat: 'YYYY-MM-DD', sessionTimeout: 30 },
  security: { twoFA: true },
  notifications: { email: true, system: true, push: false },
  sessions: [
    { id: 's1', device: 'Chrome — Windows', lastActive: '2026-02-10 09:12', ip: '192.168.1.12' },
    { id: 's2', device: 'Safari — iPhone', lastActive: '2026-02-09 21:04', ip: '10.0.0.5' }
  ],
  system: { apiUrl: '/api', apiKey: '', db: { type: 'MongoDB', status: 'connected' }, network: { ip: '192.168.1.10', gateway: '192.168.1.1' } },
  privacy: { role: 'Admin', permissions: ['read', 'write', 'deploy'], dataVisibility: { analytics: true, personal: false } }
};

const SmallLabel = ({ children }) => (
  <div className="text-xs text-gray-400">{children}</div>
);

const Toggle = ({ checked, onChange, ariaLabel }) => (
  <button
    aria-label={ariaLabel}
    onClick={() => onChange(!checked)}
    className={`relative inline-flex items-center h-6 rounded-full w-11 transition-colors ${checked ? 'bg-green-500' : 'bg-gray-600'}`}
  >
    <span
      className={`inline-block w-4 h-4 transform bg-white rounded-full transition-transform ${checked ? 'translate-x-5' : 'translate-x-1'}`}
    />
  </button>
);

const SettingsPanel = () => {
  const [settings, setSettings] = useState(defaultSettings);
  const [toast, setToast] = useState(null);
  const [password, setPassword] = useState({ current: '', new: '', confirm: '' });
  const fileRef = useRef(null);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) setSettings(JSON.parse(raw));
    } catch (e) {
      // ignore parse errors
    }
  }, []);

  const update = (path, value) => {
    setSettings(prev => {
      const next = { ...prev };
      const keys = path.split('.');
      let cur = next;
      for (let i = 0; i < keys.length - 1; i++) {
        cur[keys[i]] = { ...cur[keys[i]] };
        cur = cur[keys[i]];
      }
      cur[keys[keys.length - 1]] = value;
      return next;
    });
  };

  const handleFile = (file) => {
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (e) => update('profile.avatar', e.target.result);
    reader.readAsDataURL(file);
  };

  const removeAvatar = () => update('profile.avatar', null);

  const save = () => {
    // Basic validation
    if (!settings.profile.name || !settings.profile.email) {
      setToast({ type: 'error', text: 'Name and email are required' });
      setTimeout(() => setToast(null), 2500);
      return;
    }
    localStorage.setItem(STORAGE_KEY, JSON.stringify(settings));
    setToast({ type: 'success', text: 'Settings saved' });
    setTimeout(() => setToast(null), 2600);
  };

  const resetDefaults = () => {
    setSettings(defaultSettings);
    setToast({ type: 'info', text: 'Defaults restored' });
    setTimeout(() => setToast(null), 2200);
  };

  const changePassword = () => {
    if (!password.new || password.new !== password.confirm) {
      setToast({ type: 'error', text: 'Passwords do not match' });
      setTimeout(() => setToast(null), 2200);
      return;
    }
    setPassword({ current: '', new: '', confirm: '' });
    setToast({ type: 'success', text: 'Password changed (local demo)' });
    setTimeout(() => setToast(null), 2200);
  };

  const endSession = (id) => {
    setSettings(prev => ({ ...prev, sessions: prev.sessions.filter(s => s.id !== id) }));
    setToast({ type: 'info', text: 'Session ended' });
    setTimeout(() => setToast(null), 1600);
  };

  return (
    <div className="space-y-6 text-sm">
      {/* Header */}
      <div className="flex items-center gap-3">
        <div className="p-2 rounded-md bg-white/5 text-yellow-400">
          <FaCog />
        </div>
        <div>
          <div className="text-lg font-semibold">Settings</div>
          <SmallLabel>Manage application preferences, security and system configuration</SmallLabel>
        </div>
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        {/* Profile Settings */}
        <div className="glass-dark p-4 rounded-lg transition-shadow hover:shadow-lg">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <FaUser className="text-yellow-400" />
              <div className="font-medium">Profile Settings</div>
            </div>
            <SmallLabel>Update personal information</SmallLabel>
          </div>

          <div className="mt-4 grid gap-3">
            <div>
              <label className="block text-xs font-medium">Full name</label>
              <input value={settings.profile.name} onChange={e => update('profile.name', e.target.value)} className="mt-1 w-full bg-white/5 px-3 py-2 rounded" />
            </div>

            <div>
              <label className="block text-xs font-medium">Email</label>
              <input value={settings.profile.email} onChange={e => update('profile.email', e.target.value)} className="mt-1 w-full bg-white/5 px-3 py-2 rounded" />
            </div>

            <div>
              <label className="block text-xs font-medium">Role</label>
              <select value={settings.privacy.role} onChange={e => update('privacy.role', e.target.value)} className="mt-1 w-full bg-white/5 px-3 py-2 rounded">
                <option>Admin</option>
                <option>Editor</option>
                <option>Viewer</option>
              </select>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-20 h-20 rounded-full bg-white/5 overflow-hidden flex items-center justify-center">
                {settings.profile.avatar ? (
                  <img src={settings.profile.avatar} alt="avatar" className="w-full h-full object-cover" />
                ) : (
                  <div className="text-gray-400">No Image</div>
                )}
              </div>

              <div className="flex-1">
                <SmallLabel>Profile picture</SmallLabel>
                <div className="mt-2 flex items-center gap-2">
                  <input ref={fileRef} type="file" accept="image/*" onChange={e => handleFile(e.target.files[0])} className="hidden" />
                  <button onClick={() => fileRef.current && fileRef.current.click()} className="px-3 py-2 bg-white/5 rounded">Upload</button>
                  <button onClick={removeAvatar} className="px-3 py-2 bg-white/5 rounded">Remove</button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Account & Security */}
        <div className="glass-dark p-4 rounded-lg transition-shadow hover:shadow-lg">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <FaShieldAlt className="text-red-400" />
              <div className="font-medium">Account & Security</div>
            </div>
            <SmallLabel>Change password, 2FA and sessions</SmallLabel>
          </div>

          <div className="mt-4 grid gap-3">
            <div>
              <div className="text-sm font-medium">Change Password</div>
              <SmallLabel className="mb-2">Choose a strong password</SmallLabel>
              <div className="mt-2 grid gap-2">
                <input type="password" placeholder="Current password" value={password.current} onChange={e => setPassword(p => ({ ...p, current: e.target.value }))} className="w-full bg-white/5 px-3 py-2 rounded" />
                <input type="password" placeholder="New password" value={password.new} onChange={e => setPassword(p => ({ ...p, new: e.target.value }))} className="w-full bg-white/5 px-3 py-2 rounded" />
                <input type="password" placeholder="Confirm new password" value={password.confirm} onChange={e => setPassword(p => ({ ...p, confirm: e.target.value }))} className="w-full bg-white/5 px-3 py-2 rounded" />
                <div className="flex gap-2">
                  <button onClick={changePassword} className="px-3 py-2 bg-yellow-400 text-gray-900 rounded">Change Password</button>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <div className="font-medium">Two-Factor Authentication</div>
                <SmallLabel>Use an authenticator app for extra security</SmallLabel>
              </div>
              <Toggle checked={settings.security.twoFA} onChange={v => update('security.twoFA', v)} ariaLabel="Toggle 2FA" />
            </div>

            <div>
              <div className="font-medium">Active Sessions</div>
              <SmallLabel>Manage and revoke active sessions</SmallLabel>
              <div className="mt-3 space-y-2">
                {settings.sessions.map(s => (
                  <div key={s.id} className="flex items-center justify-between p-3 bg-white/5 rounded">
                    <div>
                      <div className="font-medium">{s.device}</div>
                      <SmallLabel>{s.lastActive} — {s.ip}</SmallLabel>
                    </div>
                    <div className="flex items-center gap-2">
                      <button onClick={() => endSession(s.id)} className="px-3 py-1 rounded bg-white/5">End</button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Application Preferences */}
        <div className="glass-dark p-4 rounded-lg">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <FaPalette className="text-yellow-400" />
              <div className="font-medium">Application Preferences</div>
            </div>
            <SmallLabel>Theme, language and formats</SmallLabel>
          </div>

          <div className="mt-4 grid gap-3">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-sm font-medium">Theme</div>
                <SmallLabel>Light or Dark mode</SmallLabel>
              </div>
              <div className="flex items-center gap-3">
                <button onClick={() => update('preferences.theme', 'light')} className={`px-3 py-1 rounded ${settings.preferences.theme === 'light' ? 'bg-white/10' : 'bg-white/5'}`}>Light</button>
                <button onClick={() => update('preferences.theme', 'dark')} className={`px-3 py-1 rounded ${settings.preferences.theme === 'dark' ? 'bg-white/10' : 'bg-white/5'}`}>Dark</button>
              </div>
            </div>

            <div>
              <div className="text-sm font-medium">Language</div>
              <SmallLabel>UI language</SmallLabel>
              <div className="mt-2 w-56">
                <select value={settings.preferences.language} onChange={e => update('preferences.language', e.target.value)} className="w-full bg-white/5 px-3 py-2 rounded">
                  <option value="en">English</option>
                  <option value="so">Somali</option>
                  <option value="ar">Arabic</option>
                </select>
              </div>
            </div>

            <div>
              <div className="text-sm font-medium">Date & Time Format</div>
              <SmallLabel>Choose display format</SmallLabel>
              <div className="mt-2 w-56">
                <select value={settings.preferences.dateFormat} onChange={e => update('preferences.dateFormat', e.target.value)} className="w-full bg-white/5 px-3 py-2 rounded">
                  <option value="YYYY-MM-DD">2026-02-10</option>
                  <option value="DD/MM/YYYY">10/02/2026</option>
                  <option value="MM/DD/YYYY">02/10/2026</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Notifications */}
        <div className="glass-dark p-4 rounded-lg">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <FaBell className="text-indigo-400" />
              <div className="font-medium">Notification Settings</div>
            </div>
            <SmallLabel>Control notification channels</SmallLabel>
          </div>

          <div className="mt-4 grid grid-cols-1 sm:grid-cols-3 gap-3">
            <label className="flex flex-col p-3 bg-white/5 rounded">
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-medium">Email</div>
                  <SmallLabel>Important updates</SmallLabel>
                </div>
                <Toggle checked={settings.notifications.email} onChange={v => update('notifications.email', v)} ariaLabel="Toggle email" />
              </div>
            </label>

            <label className="flex flex-col p-3 bg-white/5 rounded">
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-medium">System Alerts</div>
                  <SmallLabel>Critical system alerts</SmallLabel>
                </div>
                <Toggle checked={settings.notifications.system} onChange={v => update('notifications.system', v)} ariaLabel="Toggle system alerts" />
              </div>
            </label>

            <label className="flex flex-col p-3 bg-white/5 rounded">
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-medium">Push</div>
                  <SmallLabel>Browser push (optional)</SmallLabel>
                </div>
                <Toggle checked={settings.notifications.push} onChange={v => update('notifications.push', v)} ariaLabel="Toggle push" />
              </div>
            </label>
          </div>
        </div>

        {/* System & Technical (read-only) */}
        <div className="glass-dark p-4 rounded-lg">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <FaCloud className="text-cyan-400" />
              <div className="font-medium">System & Technical</div>
            </div>
            <SmallLabel>Read-only status and overview</SmallLabel>
          </div>

          <div className="mt-4 space-y-3">
            <div className="flex items-center justify-between p-3 bg-white/5 rounded">
              <div>
                <div className="font-medium">API Endpoint</div>
                <SmallLabel>Base URL</SmallLabel>
              </div>
              <div className="text-sm">{settings.system.apiUrl}</div>
            </div>

            <div className="flex items-center justify-between p-3 bg-white/5 rounded">
              <div>
                <div className="font-medium">Database</div>
                <SmallLabel>Connection status</SmallLabel>
              </div>
              <div className={`text-sm ${settings.system.db.status === 'connected' ? 'text-green-400' : 'text-red-400'}`}>{settings.system.db.type} — {settings.system.db.status}</div>
            </div>

            <div className="flex items-center justify-between p-3 bg-white/5 rounded">
              <div>
                <div className="font-medium">Network</div>
                <SmallLabel>IP / Gateway (read-only)</SmallLabel>
              </div>
              <div className="text-sm">{settings.system.network.ip} / {settings.system.network.gateway}</div>
            </div>
          </div>
        </div>

        {/* Privacy & Access */}
        <div className="glass-dark p-4 rounded-lg">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <FaUsersCog className="text-yellow-400" />
              <div className="font-medium">Privacy & Access Control</div>
            </div>
            <SmallLabel>Role and permission management</SmallLabel>
          </div>

          <div className="mt-4 grid gap-3">
            <div>
              <div className="text-sm font-medium">Role</div>
              <SmallLabel>Change account role</SmallLabel>
              <select value={settings.privacy.role} onChange={e => update('privacy.role', e.target.value)} className="mt-2 w-56 bg-white/5 px-3 py-2 rounded">
                <option>Admin</option>
                <option>Editor</option>
                <option>Viewer</option>
              </select>
            </div>

            <div>
              <div className="text-sm font-medium">Permissions</div>
              <SmallLabel>Grant granular access</SmallLabel>
              <div className="mt-2 flex gap-2">
                {['read', 'write', 'deploy', 'manage'].map(p => (
                  <label key={p} className={`px-3 py-2 rounded ${settings.privacy.permissions.includes(p) ? 'bg-white/10' : 'bg-white/5'}`}>
                    <input type="checkbox" checked={settings.privacy.permissions.includes(p)} onChange={() => {
                      const has = settings.privacy.permissions.includes(p);
                      if (has) update('privacy.permissions', settings.privacy.permissions.filter(x => x !== p));
                      else update('privacy.permissions', [...settings.privacy.permissions, p]);
                    }} /> <span className="ml-2">{p}</span>
                  </label>
                ))}
              </div>
            </div>

            <div>
              <div className="text-sm font-medium">Data Visibility</div>
              <SmallLabel>Control which data is visible</SmallLabel>
              <div className="mt-2 flex gap-2">
                <label className="flex items-center gap-2"><input type="checkbox" checked={settings.privacy.dataVisibility.analytics} onChange={() => update('privacy.dataVisibility.analytics', !settings.privacy.dataVisibility.analytics)} /> Analytics</label>
                <label className="flex items-center gap-2"><input type="checkbox" checked={settings.privacy.dataVisibility.personal} onChange={() => update('privacy.dataVisibility.personal', !settings.privacy.dataVisibility.personal)} /> Personal</label>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-3 pt-2">
        <button onClick={save} className="flex items-center gap-2 px-4 py-2 bg-yellow-400 text-gray-900 rounded font-semibold"><FaSave /> Save Settings</button>
        <button onClick={resetDefaults} className="flex items-center gap-2 px-4 py-2 bg-white/5 rounded"><FaUndo /> Reset Defaults</button>
        {toast && (<div className={`ml-3 px-3 py-2 rounded ${toast.type === 'success' ? 'bg-green-600 text-white' : toast.type === 'error' ? 'bg-red-600 text-white' : 'bg-blue-600 text-white'}`}>{toast.text}</div>)}
      </div>
    </div>
  );
};

export default SettingsPanel;
