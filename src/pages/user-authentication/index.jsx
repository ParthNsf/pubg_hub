import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/ui/Header';
import LoginForm from './components/LoginForm';
import RegisterForm from './components/RegisterForm';
import ForgotPasswordForm from './components/ForgotPasswordForm';
import SocialAuth from './components/SocialAuth';
import WelcomeModal from './components/WelcomeModal';
import TwoFactorSetup from './components/TwoFactorSetup';

const UserAuthentication = () => {
  const navigate = useNavigate();
  const [currentForm, setCurrentForm] = useState('login');
  const [showWelcomeModal, setShowWelcomeModal] = useState(false);
  const [show2FASetup, setShow2FASetup] = useState(false);
  const [newUser, setNewUser] = useState(null);

  useEffect(() => {
    // Add body class for authentication page styling
    document.body?.classList?.add('auth-page');
    return () => {
      document.body?.classList?.remove('auth-page');
    };
  }, []);

  const handleLogin = (loginData) => {
    console.log('Login successful:', loginData);
    
    // Mock successful login - redirect to dashboard
    setTimeout(() => {
      navigate('/home-dashboard');
    }, 500);
  };

  const handleRegister = (registerData) => {
    console.log('Registration successful:', registerData);
    setNewUser(registerData);
    setShowWelcomeModal(true);
  };

  const handleSocialLogin = (provider) => {
    console.log(`Social login with ${provider}`);
    
    // Mock social login success
    setTimeout(() => {
      navigate('/home-dashboard');
    }, 1000);
  };

  const handleWelcomeComplete = () => {
    setShowWelcomeModal(false);
    setShow2FASetup(true);
  };

  const handle2FAComplete = () => {
    setShow2FASetup(false);
    navigate('/home-dashboard');
  };

  const toggleForm = (formType) => {
    setCurrentForm(formType);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Background Video/Animation */}
      <div className="fixed inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-background via-background/95 to-primary/5" />
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1542751371-adc38448a05e?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80')] bg-cover bg-center opacity-10" />
        
        {/* Animated Elements */}
        <div className="absolute top-20 left-10 w-32 h-32 bg-primary/10 rounded-full blur-xl animate-pulse" />
        <div className="absolute bottom-20 right-10 w-48 h-48 bg-secondary/10 rounded-full blur-xl animate-pulse delay-1000" />
        <div className="absolute top-1/2 left-1/4 w-24 h-24 bg-accent/10 rounded-full blur-xl animate-pulse delay-500" />
      </div>

      {/* Main Content */}
      <div className="relative z-10 pt-20 pb-12 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center min-h-[calc(100vh-8rem)]">
            
            {/* Left Side - Branding & Info */}
            <div className="hidden lg:block space-y-8">
              <div>
                <h1 className="text-5xl font-bold text-foreground mb-4">
                  Join the Ultimate
                  <span className="block bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                    PUBG Arena
                  </span>
                </h1>
                <p className="text-xl text-muted-foreground leading-relaxed">
                  Compete in epic tournaments, climb leaderboards, and connect with the best players in the gaming community.
                </p>
              </div>

              {/* Features */}
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-foreground">Daily Tournaments</h3>
                    <p className="text-muted-foreground">Compete in daily events with real cash prizes and exclusive rewards.</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-secondary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <svg className="w-6 h-6 text-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-foreground">Live Streaming</h3>
                    <p className="text-muted-foreground">Watch pro players, learn strategies, and stream your own gameplay.</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <svg className="w-6 h-6 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-foreground">Team Management</h3>
                    <p className="text-muted-foreground">Create teams, recruit players, and dominate squad competitions.</p>
                  </div>
                </div>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-6 pt-8 border-t border-border">
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary">50K+</div>
                  <div className="text-sm text-muted-foreground">Active Players</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-secondary">$2M+</div>
                  <div className="text-sm text-muted-foreground">Prize Pool</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-accent">1000+</div>
                  <div className="text-sm text-muted-foreground">Tournaments</div>
                </div>
              </div>
            </div>

            {/* Right Side - Authentication Forms */}
            <div className="w-full">
              <div className="bg-card/50 backdrop-blur-sm border border-border rounded-2xl p-8 shadow-gaming">
                {currentForm === 'login' && (
                  <>
                    <LoginForm onToggleForm={toggleForm} onLogin={handleLogin} />
                    <div className="mt-8">
                      <SocialAuth onSocialLogin={handleSocialLogin} />
                    </div>
                  </>
                )}

                {currentForm === 'register' && (
                  <>
                    <RegisterForm onToggleForm={toggleForm} onRegister={handleRegister} />
                    <div className="mt-8">
                      <SocialAuth onSocialLogin={handleSocialLogin} />
                    </div>
                  </>
                )}

                {currentForm === 'forgot' && (
                  <ForgotPasswordForm onToggleForm={toggleForm} />
                )}
              </div>

              {/* Mobile Features */}
              <div className="lg:hidden mt-8 space-y-4">
                <div className="text-center">
                  <h2 className="text-2xl font-bold text-foreground mb-4">
                    Join the Gaming Revolution
                  </h2>
                </div>
                
                <div className="grid grid-cols-3 gap-4 text-center">
                  <div className="bg-card/30 rounded-lg p-4">
                    <div className="text-lg font-bold text-primary">50K+</div>
                    <div className="text-xs text-muted-foreground">Players</div>
                  </div>
                  <div className="bg-card/30 rounded-lg p-4">
                    <div className="text-lg font-bold text-secondary">$2M+</div>
                    <div className="text-xs text-muted-foreground">Prizes</div>
                  </div>
                  <div className="bg-card/30 rounded-lg p-4">
                    <div className="text-lg font-bold text-accent">1000+</div>
                    <div className="text-xs text-muted-foreground">Events</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Modals */}
      <WelcomeModal
        isOpen={showWelcomeModal}
        onClose={handleWelcomeComplete}
        username={newUser?.username || 'Player'}
      />

      <TwoFactorSetup
        isOpen={show2FASetup}
        onClose={() => setShow2FASetup(false)}
        onComplete={handle2FAComplete}
      />
    </div>
  );
};

export default UserAuthentication;