import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const Footer = () => {
  const currentYear = new Date()?.getFullYear();

  const footerLinks = {
    platform: [
      { label: 'Home', href: '/home-dashboard' },
      { label: 'Tournaments', href: '/tournament-listing' },
      { label: 'Streamers', href: '/streamers-directory' },
      { label: 'Game Info', href: '/game-information-hub' }
    ],
    community: [
      { label: 'Player Profiles', href: '/player-profile' },
      { label: 'Leaderboards', href: '/tournament-listing' },
      { label: 'Teams', href: '/player-profile' },
      { label: 'Forums', href: '/game-information-hub' }
    ],
    support: [
      { label: 'Help Center', href: '#' },
      { label: 'Contact Us', href: '#' },
      { label: 'Bug Reports', href: '#' },
      { label: 'Feature Requests', href: '#' }
    ],
    legal: [
      { label: 'Privacy Policy', href: '#' },
      { label: 'Terms of Service', href: '#' },
      { label: 'Cookie Policy', href: '#' },
      { label: 'DMCA', href: '#' }
    ]
  };

  const socialLinks = [
    { name: 'Twitter', icon: 'Twitter', href: '#', color: 'hover:text-blue-400' },
    { name: 'Discord', icon: 'MessageCircle', href: '#', color: 'hover:text-indigo-400' },
    { name: 'YouTube', icon: 'Play', href: '#', color: 'hover:text-red-400' },
    { name: 'Twitch', icon: 'Tv', href: '#', color: 'hover:text-purple-400' },
    { name: 'Instagram', icon: 'Instagram', href: '#', color: 'hover:text-pink-400' }
  ];

  return (
    <footer className="bg-card border-t border-border mt-16">
      <div className="container mx-auto px-4 lg:px-6 py-12">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-8">
          {/* Brand Section */}
          <div className="lg:col-span-1">
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-8 h-8 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center">
                <Icon name="Zap" size={20} color="var(--color-background)" />
              </div>
              <span className="text-xl font-bold text-foreground">
                PUBG Hub
              </span>
            </div>
            <p className="text-muted-foreground text-sm mb-6 leading-relaxed">
              The ultimate destination for PUBG competitive gaming. Join tournaments, 
              watch streams, and connect with the global esports community.
            </p>
            
            {/* Social Links */}
            <div className="flex items-center space-x-3">
              {socialLinks?.map((social) => (
                <a
                  key={social?.name}
                  href={social?.href}
                  className={`w-10 h-10 bg-muted hover:bg-primary/10 rounded-lg flex items-center justify-center transition-gaming ${social?.color}`}
                  aria-label={social?.name}
                >
                  <Icon name={social?.icon} size={18} />
                </a>
              ))}
            </div>
          </div>

          {/* Platform Links */}
          <div>
            <h3 className="text-foreground font-semibold mb-4">Platform</h3>
            <ul className="space-y-3">
              {footerLinks?.platform?.map((link) => (
                <li key={link?.label}>
                  <a
                    href={link?.href}
                    className="text-muted-foreground hover:text-primary transition-gaming text-sm"
                  >
                    {link?.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Community Links */}
          <div>
            <h3 className="text-foreground font-semibold mb-4">Community</h3>
            <ul className="space-y-3">
              {footerLinks?.community?.map((link) => (
                <li key={link?.label}>
                  <a
                    href={link?.href}
                    className="text-muted-foreground hover:text-primary transition-gaming text-sm"
                  >
                    {link?.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Support Links */}
          <div>
            <h3 className="text-foreground font-semibold mb-4">Support</h3>
            <ul className="space-y-3">
              {footerLinks?.support?.map((link) => (
                <li key={link?.label}>
                  <a
                    href={link?.href}
                    className="text-muted-foreground hover:text-primary transition-gaming text-sm"
                  >
                    {link?.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal Links */}
          <div>
            <h3 className="text-foreground font-semibold mb-4">Legal</h3>
            <ul className="space-y-3">
              {footerLinks?.legal?.map((link) => (
                <li key={link?.label}>
                  <a
                    href={link?.href}
                    className="text-muted-foreground hover:text-primary transition-gaming text-sm"
                  >
                    {link?.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Newsletter Section */}
        <div className="border-t border-border pt-8 mb-8">
          <div className="max-w-md">
            <h3 className="text-foreground font-semibold mb-2">Stay Updated</h3>
            <p className="text-muted-foreground text-sm mb-4">
              Get the latest tournament announcements and esports news delivered to your inbox.
            </p>
            <div className="flex space-x-2">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-2 bg-input border border-border rounded-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50 transition-gaming"
              />
              <Button
                variant="default"
                iconName="Send"
                iconPosition="right"
                className="bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90"
              >
                Subscribe
              </Button>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-border pt-8">
          <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
            <div className="flex items-center space-x-6 text-sm text-muted-foreground">
              <span>© {currentYear} PUBG Tournament Hub. All rights reserved.</span>
              <div className="hidden md:flex items-center space-x-2">
                <Icon name="Shield" size={16} className="text-success" />
                <span>SSL Secured</span>
              </div>
            </div>
            
            <div className="flex items-center space-x-4 text-sm text-muted-foreground">
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-success rounded-full pulse-slow"></div>
                <span>All systems operational</span>
              </div>
              <span>•</span>
              <span>Version 2.1.0</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;