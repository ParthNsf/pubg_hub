import React from 'react';
import Icon from '../../../components/AppIcon';


const SocialAuth = ({ onSocialLogin }) => {
  const socialProviders = [
    {
      name: 'Discord',
      icon: 'MessageCircle',
      color: 'bg-[#5865F2] hover:bg-[#4752C4]',
      textColor: 'text-white'
    },
    {
      name: 'Steam',
      icon: 'Gamepad2',
      color: 'bg-[#171a21] hover:bg-[#2a475e]',
      textColor: 'text-white'
    },
    {
      name: 'Google',
      icon: 'Chrome',
      color: 'bg-white hover:bg-gray-50 border border-border',
      textColor: 'text-foreground'
    }
  ];

  const handleSocialLogin = (provider) => {
    // Mock social authentication
    console.log(`Authenticating with ${provider}`);
    onSocialLogin(provider);
  };

  return (
    <div className="w-full">
      <div className="relative mb-6">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-border"></div>
        </div>
        <div className="relative flex justify-center text-sm">
          <span className="px-4 bg-background text-muted-foreground">Or continue with</span>
        </div>
      </div>
      <div className="grid grid-cols-1 gap-3">
        {socialProviders?.map((provider) => (
          <button
            key={provider?.name}
            onClick={() => handleSocialLogin(provider?.name)}
            className={`
              w-full h-12 px-4 rounded-lg flex items-center justify-center space-x-3
              transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]
              ${provider?.color} ${provider?.textColor}
            `}
          >
            <Icon name={provider?.icon} size={20} />
            <span className="font-medium">Continue with {provider?.name}</span>
          </button>
        ))}
      </div>
      <div className="mt-6 p-4 bg-muted/30 rounded-lg">
        <div className="flex items-start space-x-3">
          <Icon name="Shield" size={16} className="text-primary mt-0.5" />
          <div>
            <p className="text-sm font-medium text-foreground">Secure Authentication</p>
            <p className="text-xs text-muted-foreground mt-1">
              Your data is protected with industry-standard encryption and security measures.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SocialAuth;