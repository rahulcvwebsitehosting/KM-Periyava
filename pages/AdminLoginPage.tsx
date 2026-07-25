import React, { useState } from 'react';
import { adminLogin } from '../admin/auth';

interface AdminLoginPageProps {
  onLoginSuccess: () => void;
}

const AdminLoginPage: React.FC<AdminLoginPageProps> = ({ onLoginSuccess }) => {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (adminLogin(password)) {
      onLoginSuccess();
    } else {
      setError('Incorrect password');
      setPassword('');
    }
  };

  return (
    <div className="py-24 bg-[#FFFCF7] min-h-screen flex items-center justify-center">
      <div className="container mx-auto px-6 max-w-md">
        <div
          className="rounded-[3rem] overflow-hidden"
          style={{
            background: 'rgba(255, 252, 247, 0.75)',
            backdropFilter: 'blur(12px)',
            WebkitBackdropFilter: 'blur(12px)',
            border: '1px solid rgba(255, 200, 150, 0.25)',
            boxShadow: '0 8px 32px rgba(139, 69, 19, 0.08), inset 0 1px 0 rgba(255,255,255,0.5)'
          }}
        >
          <div className="bg-gradient-to-br from-primary to-primary-dark p-10 md:p-12 text-white text-center">
            <span className="text-4xl">ॐ</span>
            <h1 className="text-2xl font-bold heading-font tracking-tight mt-2">
              Admin Login
            </h1>
            <p className="text-white/60 text-sm mt-2 font-bold uppercase tracking-widest">
              KM Periyava Sannadhi
            </p>
          </div>

          <div className="p-8 md:p-12">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-xs font-bold uppercase tracking-[0.3em] text-primary mb-3">
                  Password
                </label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => { setPassword(e.target.value); setError(''); }}
                  className="w-full px-5 py-4 bg-orange-50/30 border border-orange-100/50 rounded-2xl text-text-dark font-bold text-lg focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
                  placeholder="Enter admin password"
                  autoFocus
                />
                {error && (
                  <p className="mt-2 text-red-500 text-sm font-bold">{error}</p>
                )}
              </div>

              <button
                type="submit"
                className="w-full bg-gradient-to-r from-primary to-primary-dark hover:from-primary-dark hover:to-primary text-white px-8 py-4 rounded-full font-bold shadow-lg shadow-primary/20 transition-all uppercase tracking-widest text-sm"
              >
                Login as Admin
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminLoginPage;