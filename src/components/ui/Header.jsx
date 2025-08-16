import React, { useState, useEffect } from 'react';
import Icon from '../AppIcon';
import Button from './Button';
import Input from './Input';
import ThemeToggle from './ThemeToggle';

const Header = () => {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const navigationItems = [
    { label: 'Home', path: '/home-dashboard', icon: 'Home' },
    { label: 'Tournaments', path: '/tournament-listing', icon: 'Trophy' },
    { label: 'Game Info', path: '/game-information-hub', icon: 'Info' },
    { label: 'Streamers', path: '/streamers-directory', icon: 'Video' },
    { label: 'Profile', path: '/player-profile', icon: 'User' }
  ];

  const handleSearch = (e) => {
    e?.preventDefault();
    console.log('Searching for:', searchQuery);
    setIsSearchOpen(false);
  };

  const handleAuthAction = () => {
    if (isAuthenticated) {
      setIsAuthenticated(false);
      setIsUserMenuOpen(false);
    } else {
      window.location.href = '/user-authentication';
    }
  };

  const toggleSearch = () => {
    setIsSearchOpen(!isSearchOpen);
    if (!isSearchOpen) {
      setTimeout(() => {
        document.getElementById('search-input')?.focus();
      }, 100);
    }
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isUserMenuOpen && !event?.target?.closest('.user-menu-container')) {
        setIsUserMenuOpen(false);
      }
      if (isSearchOpen && !event?.target?.closest('.search-container')) {
        setIsSearchOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isUserMenuOpen, isSearchOpen]);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background border-b border-border theme-transition">
      <div className="flex items-center justify-between h-16 px-4 lg:px-6">
        {/* Logo */}
        <div className="flex items-center">
          <a href="/home-dashboard" className="flex items-center space-x-2 transition-gaming hover:opacity-80">
            <div className="w-8 h-8 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center">
              <Icon name="Zap" size={20} color="var(--color-background)" />
            </div>
            <span className="text-xl font-bold text-foreground hidden sm:block">
              PUBG Tournament Hub
            </span>
          </a>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center space-x-1">
          {navigationItems?.map((item) => (
            <a
              key={item?.path}
              href={item?.path}
              className="flex items-center space-x-2 px-4 py-2 rounded-lg text-muted-foreground hover:text-primary hover:bg-muted transition-gaming group theme-transition"
            >
              <Icon name={item?.icon} size={18} className="group-hover:text-primary transition-gaming" />
              <span className="font-medium">{item?.label}</span>
            </a>
          ))}
        </nav>

        {/* Right Section */}
        <div className="flex items-center space-x-2">
          {/* Search */}
          <div className="search-container relative">
            {isSearchOpen ? (
              <form onSubmit={handleSearch} className="flex items-center">
                <Input
                  id="search-input"
                  type="search"
                  placeholder="Search tournaments, streamers..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e?.target?.value)}
                  className="w-64 h-10 theme-transition"
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  onClick={() => setIsSearchOpen(false)}
                  className="ml-2"
                >
                  <Icon name="X" size={18} />
                </Button>
              </form>
            ) : (
              <Button
                variant="ghost"
                size="icon"
                onClick={toggleSearch}
                className="hover:bg-muted"
              >
                <Icon name="Search" size={18} />
              </Button>
            )}
          </div>

          {/* Theme Toggle */}
          <ThemeToggle />

          {/* Live Status Indicator */}
          <div className="hidden md:flex items-center space-x-1 px-3 py-1 bg-success/10 rounded-full theme-transition">
            <div className="w-2 h-2 bg-success rounded-full pulse-slow"></div>
            <span className="text-xs font-mono text-success">LIVE</span>
          </div>

          {/* User Menu */}
          {isAuthenticated ? (
            <div className="user-menu-container relative">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                className="hover:bg-muted"
              >
                <div className="w-8 h-8 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center">
                  <Icon name="User" size={16} color="var(--color-background)" />
                </div>
              </Button>

              {isUserMenuOpen && (
                <div className="absolute right-0 top-12 w-64 bg-popover border border-border rounded-lg shadow-gaming animate-scale-in theme-transition">
                  <div className="p-4 border-b border-border theme-transition">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center">
                        <Icon name="User" size={20} color="var(--color-background)" />
                      </div>
                      <div>
                        <p className="font-semibold text-foreground">ProGamer2024</p>
                        <p className="text-sm text-muted-foreground font-mono">Rank: Diamond</p>
                      </div>
                    </div>
                  </div>
                  <div className="p-2">
                    <a
                      href="/player-profile"
                      className="flex items-center space-x-3 px-3 py-2 rounded-md hover:bg-muted transition-gaming theme-transition"
                    >
                      <Icon name="User" size={16} />
                      <span>View Profile</span>
                    </a>
                    <a
                      href="#"
                      className="flex items-center space-x-3 px-3 py-2 rounded-md hover:bg-muted transition-gaming theme-transition"
                    >
                      <Icon name="Settings" size={16} />
                      <span>Settings</span>
                    </a>
                    <button
                      onClick={handleAuthAction}
                      className="w-full flex items-center space-x-3 px-3 py-2 rounded-md hover:bg-muted transition-gaming text-left theme-transition"
                    >
                      <Icon name="LogOut" size={16} />
                      <span>Sign Out</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <Button
              variant="default"
              onClick={handleAuthAction}
              iconName="LogIn"
              iconPosition="left"
              className="hidden sm:flex"
            >
              Sign In
            </Button>
          )}

          {/* Mobile Menu Toggle */}
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden hover:bg-muted"
          >
            <Icon name={isMobileMenuOpen ? "X" : "Menu"} size={20} />
          </Button>
        </div>
      </div>
      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden bg-background border-t border-border animate-slide-down theme-transition">
          <nav className="p-4 space-y-2">
            {navigationItems?.map((item) => (
              <a
                key={item?.path}
                href={item?.path}
                className="flex items-center space-x-3 px-4 py-3 rounded-lg text-muted-foreground hover:text-primary hover:bg-muted transition-gaming theme-transition"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <Icon name={item?.icon} size={20} />
                <span className="font-medium">{item?.label}</span>
              </a>
            ))}
            
            <div className="flex items-center justify-between pt-4 border-t border-border theme-transition">
              <span className="text-sm text-muted-foreground">Theme</span>
              <ThemeToggle />
            </div>
            
            {!isAuthenticated && (
              <div className="pt-4">
                <Button
                  variant="default"
                  onClick={handleAuthAction}
                  iconName="LogIn"
                  iconPosition="left"
                  fullWidth
                >
                  Sign In
                </Button>
              </div>
            )}
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;