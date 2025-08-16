import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const TwoFactorSetup = ({ isOpen, onClose, onComplete }) => {
  const [step, setStep] = useState(1);
  const [verificationCode, setVerificationCode] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  // Mock QR code data
  const qrCodeUrl = "https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=otpauth://totp/PUBG%20Tournament%20Hub:progamer2024@tournament.com?secret=JBSWY3DPEHPK3PXP&issuer=PUBG%20Tournament%20Hub";
  const backupCodes = [
    "1234-5678", "9876-5432", "2468-1357", "8642-9753", "1357-2468"
  ];

  const handleVerifyCode = async (e) => {
    e?.preventDefault();
    
    if (!verificationCode?.trim()) {
      setError('Please enter the verification code');
      return;
    }
    
    if (verificationCode?.length !== 6) {
      setError('Verification code must be 6 digits');
      return;
    }
    
    setIsLoading(true);
    setError('');
    
    // Mock verification
    setTimeout(() => {
      if (verificationCode === '123456') {
        setStep(3);
      } else {
        setError('Invalid verification code. Try: 123456');
      }
      setIsLoading(false);
    }, 1000);
  };

  const handleComplete = () => {
    onComplete();
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-sm">
      <div className="w-full max-w-md bg-card border border-border rounded-xl shadow-gaming overflow-hidden">
        {/* Header */}
        <div className="p-6 border-b border-border">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold text-foreground">Two-Factor Authentication</h2>
            <button
              onClick={onClose}
              className="text-muted-foreground hover:text-foreground transition-gaming"
            >
              <Icon name="X" size={20} />
            </button>
          </div>
          <p className="text-sm text-muted-foreground mt-1">
            Step {step} of 3: Secure your account
          </p>
        </div>

        {/* Content */}
        <div className="p-6">
          {step === 1 && (
            <div className="text-center space-y-6">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
                <Icon name="Shield" size={32} className="text-primary" />
              </div>
              
              <div>
                <h3 className="text-lg font-semibold text-foreground mb-2">
                  Enhance Your Security
                </h3>
                <p className="text-muted-foreground">
                  Two-factor authentication adds an extra layer of security to your account by requiring a code from your phone.
                </p>
              </div>

              <div className="bg-muted/30 rounded-lg p-4">
                <h4 className="font-medium text-foreground mb-2">You'll need:</h4>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• An authenticator app (Google Authenticator, Authy, etc.)</li>
                  <li>• Your mobile device</li>
                  <li>• A few minutes to set up</li>
                </ul>
              </div>

              <Button
                variant="default"
                onClick={() => setStep(2)}
                fullWidth
              >
                Continue Setup
              </Button>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-6">
              <div className="text-center">
                <h3 className="text-lg font-semibold text-foreground mb-2">
                  Scan QR Code
                </h3>
                <p className="text-muted-foreground text-sm">
                  Open your authenticator app and scan this QR code
                </p>
              </div>

              <div className="flex justify-center">
                <div className="p-4 bg-white rounded-lg">
                  <img
                    src={qrCodeUrl}
                    alt="2FA QR Code"
                    className="w-48 h-48"
                  />
                </div>
              </div>

              <div className="bg-muted/30 rounded-lg p-4">
                <p className="text-xs text-muted-foreground text-center">
                  Can't scan? Enter this code manually: <br />
                  <code className="font-mono text-foreground">JBSWY3DPEHPK3PXP</code>
                </p>
              </div>

              <form onSubmit={handleVerifyCode} className="space-y-4">
                <Input
                  label="Verification Code"
                  type="text"
                  placeholder="Enter 6-digit code"
                  value={verificationCode}
                  onChange={(e) => {
                    setVerificationCode(e?.target?.value?.replace(/\D/g, '')?.slice(0, 6));
                    if (error) setError('');
                  }}
                  error={error}
                  maxLength={6}
                  required
                />

                <Button
                  type="submit"
                  variant="default"
                  loading={isLoading}
                  fullWidth
                >
                  {isLoading ? 'Verifying...' : 'Verify & Continue'}
                </Button>
              </form>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-6">
              <div className="text-center">
                <div className="w-16 h-16 bg-success/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Icon name="CheckCircle" size={32} className="text-success" />
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2">
                  2FA Enabled Successfully!
                </h3>
                <p className="text-muted-foreground text-sm">
                  Save these backup codes in a safe place
                </p>
              </div>

              <div className="bg-muted/30 rounded-lg p-4">
                <h4 className="font-medium text-foreground mb-3">Backup Codes</h4>
                <div className="grid grid-cols-1 gap-2">
                  {backupCodes?.map((code, index) => (
                    <div
                      key={index}
                      className="font-mono text-sm bg-background px-3 py-2 rounded border"
                    >
                      {code}
                    </div>
                  ))}
                </div>
                <p className="text-xs text-muted-foreground mt-3">
                  Each code can only be used once. Store them securely.
                </p>
              </div>

              <Button
                variant="default"
                onClick={handleComplete}
                fullWidth
              >
                Complete Setup
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TwoFactorSetup;