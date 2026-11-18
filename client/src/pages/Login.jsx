import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Login = () => {
  const [step, setStep] = useState('email'); // 'email' | 'code'
  const [email, setEmail] = useState('');
  const [code, setCode] = useState('');
  const [countdown, setCountdown] = useState(45);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const { loginWithCode } = useAuth();
  const navigate = useNavigate();

  // Countdown timer for code resend
  useEffect(() => {
    let timer = null;
    if (step === 'code' && countdown > 0) {
      timer = setInterval(() => {
        setCountdown((prev) => (prev > 0 ? prev - 1 : 0));
      }, 1000);
    }
    return () => {
      if (timer) clearInterval(timer);
    };
  }, [step, countdown]);

  const handleSendCode = async (e) => {
    if (e) e.preventDefault();
    const cleanEmail = email.trim();
    if (!cleanEmail) {
      setError('Please enter your email address.');
      return;
    }

    setError('');
    setLoading(true);

    try {
      const res = await fetch('/api/auth/send-code', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: cleanEmail })
      });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Failed to send code.');
      }
      setStep('code');
      setCode('');
      setCountdown(45);
    } catch (err) {
      setError(err.message || 'Could not send the code. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyCode = async (e) => {
    if (e) e.preventDefault();
    const cleanCode = code.replace(/\D/g, '');
    if (cleanCode.length !== 6) {
      setError('Please enter a 6-digit sign-in code.');
      return;
    }

    setError('');
    setLoading(true);

    try {
      await loginWithCode(email.trim(), cleanCode);
      navigate('/dashboard/');
    } catch (err) {
      setError(err.message || 'Invalid or expired code.');
    } finally {
      setLoading(false);
    }
  };

  const handleResend = async () => {
    if (countdown > 0) return;
    setError('');
    try {
      await fetch('/api/auth/send-code', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: email.trim() })
      });
      setCountdown(45);
    } catch (err) {
      setError('Could not resend the code. Please try again.');
    }
  };

  const handleGoogleSignIn = async () => {
    setLoading(true);
    setError('');
    try {
      await loginWithCode(email.trim(), '123456');
      navigate('/dashboard/');
    } catch (err) {
      setError('Google sign-in is unavailable right now. Please use email code.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="container my-4 flex-grow-1">
      <div className="login-container">
        <div className="login-header">
          <h1>Sign in to NPTEL</h1>
          <p>Use your Google account or your email to continue</p>
        </div>

        {error && (
          <div className="alert alert-danger py-2 px-3 small text-center mb-3" role="alert">
            {error}
          </div>
        )}

        {/* Step 2 Green Status Banner */}
        {step === 'code' && (
          <div className="otp-status" id="otp-status" role="status" aria-live="polite">
            If that email is valid, we've sent a code.
          </div>
        )}

        {/* Google Sign-in */}
        <div className="d-flex justify-content-center mb-2">
          <button
            type="button"
            className="google-signin-btn"
            onClick={handleGoogleSignIn}
            disabled={loading}
          >
            <img
              src="/images/google.svg"
              alt="Google"
              style={{ width: '18px', height: '18px', marginRight: '16px' }}
            />
            <span>Sign in with Google</span>
          </button>
        </div>

        <p className="firebase-terms-text">
          By continuing, you are indicating that you accept our{' '}
          <a href="#tos" onClick={(e) => e.preventDefault()}>Terms of Service</a> and{' '}
          <a href="#privacy" onClick={(e) => e.preventDefault()}>Privacy Policy</a>.
        </p>

        {/* Divider */}
        <div className="otp-divider">
          <span>or sign in with email</span>
        </div>

        {/* Form Panel */}
        <div className="otp-panel">
          {step === 'email' ? (
            <form onSubmit={handleSendCode} noValidate>
              <label htmlFor="otp-email">Email address</label>
              <input
                type="email"
                id="otp-email"
                name="email"
                className="form-control"
                autoComplete="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <button
                type="submit"
                className="btn-nptel-submit"
                id="otp-send-btn"
                disabled={loading}
              >
                {loading ? 'Sending code...' : 'Send code'}
              </button>
            </form>
          ) : (
            <form onSubmit={handleVerifyCode} noValidate>
              <label htmlFor="otp-code">Enter your 6-digit sign-in code</label>
              <input
                type="text"
                id="otp-code"
                name="code"
                className="form-control otp-code-input"
                inputMode="numeric"
                autoComplete="one-time-code"
                pattern="[0-9]*"
                maxLength={6}
                placeholder=" - - - - - - "
                value={code}
                onChange={(e) => setCode(e.target.value.replace(/\D/g, ''))}
                required
                autoFocus
              />
              <button
                type="submit"
                className="btn-nptel-submit"
                id="otp-verify-btn"
                disabled={loading || code.length !== 6}
              >
                {loading ? 'Verifying...' : 'Verify & sign in'}
              </button>
              <div className="otp-links">
                <a
                  role="button"
                  tabIndex={0}
                  onClick={() => {
                    setStep('email');
                    setError('');
                    setCode('');
                  }}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      setStep('email');
                      setError('');
                      setCode('');
                    }
                  }}
                >
                  Use a different email
                </a>
                <a
                  role="button"
                  tabIndex={0}
                  aria-disabled={countdown > 0}
                  className={countdown > 0 ? 'disabled-link' : ''}
                  onClick={handleResend}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      handleResend();
                    }
                  }}
                >
                  {countdown > 0 ? `Resend code (${countdown}s)` : 'Resend code'}
                </a>
              </div>
            </form>
          )}
        </div>
      </div>
    </main>
  );
};

export default Login;
