import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const ForgotPasswordForm = ({ onToggleForm }) => {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isEmailSent, setIsEmailSent] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e?.preventDefault();
    
    if (!email?.trim()) {
      setError('Email is required');
      return;
    }
    
    if (!/\S+@\S+\.\S+/?.test(email)) {
      setError('Please enter a valid email address');
      return;
    }
    
    setIsLoading(true);
    setError('');
    
    // Mock password reset
    setTimeout(() => {
      setIsEmailSent(true);
      setIsLoading(false);
    }, 1500);
  };

  const handleEmailChange = (e) => {
    setEmail(e?.target?.value);
    if (error) setError('');
  };

  if (isEmailSent) {
    return (
      <div className="w-full max-w-md mx-auto text-center">
        <div className="mb-8">
          <div className="w-16 h-16 bg-success/10 rounded-full flex items-center justify-center mx-auto mb-4">
            <Icon name="Mail" size={32} className="text-success" />
          </div>
          <h2 className="text-3xl font-bold text-foreground mb-2">Check Your Email</h2>
          <p className="text-muted-foreground">
            We've sent a password reset link to{' '}
            <span className="text-foreground font-medium">{email}</span>
          </p>
        </div>

        <div className="space-y-4">
          <div className="p-4 bg-muted/50 rounded-lg">
            <p className="text-sm text-muted-foreground">
              Didn't receive the email? Check your spam folder or try again in a few minutes.
            </p>
          </div>

          <Button
            variant="outline"
            onClick={() => {
              setIsEmailSent(false);
              setEmail('');
            }}
            fullWidth
          >
            Try Different Email
          </Button>

          <Button
            variant="ghost"
            onClick={() => onToggleForm('login')}
            fullWidth
          >
            Back to Sign In
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-md mx-auto">
      <div className="text-center mb-8">
        <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
          <Icon name="KeyRound" size={32} className="text-primary" />
        </div>
        <h2 className="text-3xl font-bold text-foreground mb-2">Reset Password</h2>
        <p className="text-muted-foreground">
          Enter your email address and we'll send you a link to reset your password
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <Input
          label="Email Address"
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={handleEmailChange}
          error={error}
          required
        />

        <Button
          type="submit"
          variant="default"
          loading={isLoading}
          fullWidth
          className="h-12"
        >
          {isLoading ? 'Sending Reset Link...' : 'Send Reset Link'}
        </Button>

        <div className="text-center">
          <button
            type="button"
            onClick={() => onToggleForm('login')}
            className="text-primary hover:text-primary/80 transition-gaming font-medium"
          >
            Back to Sign In
          </button>
        </div>
      </form>
    </div>
  );
};

export default ForgotPasswordForm;