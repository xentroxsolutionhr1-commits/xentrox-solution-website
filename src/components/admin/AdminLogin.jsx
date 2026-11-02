import { ArrowLeft, ArrowRight, KeyRound, LoaderCircle, Shield, Sparkles, UserRoundPlus } from 'lucide-react';

function AdminLogin({ error, busy, setupRequired, setupLoading, onSubmit, onSetup }) {
  const isSetup = setupRequired === true;

  return (
    <main className="admin-login">
      <div className="admin-login__visual">
        <div className="admin-login__grid" />
        <div className="admin-login__brand">
          <img className="admin-brand-logo" src="/Logo.svg" alt="" />
          <span className="admin-brand-name">XENTRO<span>X</span></span>
        </div>
        <div className="admin-login__message">
          <h1>Good work deserves<br />a <span>great system.</span></h1>
          <p>Your workspace for managing people, programs, and the details that keep everything moving.</p>
          <div className="admin-login__signature"><span /> Thoughtfully built for what comes next</div>
        </div>
        <div className="admin-login__orb admin-login__orb--one" />
        <div className="admin-login__orb admin-login__orb--two" />
        <div className="admin-login__visual-footer">XENTROX SOLUTIONS <span>·</span> ADMINISTRATION</div>
      </div>
      <div className="admin-login__form-side">
        <div className="admin-login__mobile-brand">
          <img className="admin-brand-logo" src="/favicon.svg" alt="" />
          <span className="admin-brand-name">XENTRO<span>X</span></span>
        </div>
        <form className="admin-login-card sm:mt-12" onSubmit={isSetup ? onSetup : onSubmit}>
          {/* <div className="admin-login-card__icon">{isSetup ? <UserRoundPlus size={22} strokeWidth={1.8} /> : <Shield size={22} strokeWidth={1.8} />}</div>
          <div className="admin-eyebrow admin-eyebrow--dark">{isSetup ? 'FIRST-TIME SETUP' : 'ADMINISTRATOR ACCESS'}</div> */}
          <h2>{setupLoading ? 'Checking setup' : isSetup ? 'Create your admin account' : 'Welcome back'}</h2>
          <p className="admin-login-card__description">{isSetup ? 'Create the first super administrator to secure your workspace.' : 'Sign in with your super administrator account to continue.'}</p>
          {error && <div className="admin-alert admin-alert--error" role="alert">{error}</div>}
          {setupLoading ? (
            <div className="admin-login-card__secure"><LoaderCircle className="admin-spin" size={16} /> Checking whether initial setup is needed</div>
          ) : setupRequired === false || isSetup ? (
            <>
              {isSetup && <label className="admin-field"><span>Full name</span><input name="name" autoComplete="name" maxLength="120" placeholder="Your name" required /></label>}
              <label className="admin-field">
                <span>Email address</span>
                <input name="email" type="email" autoComplete={isSetup ? 'email' : 'username'} placeholder="you@company.com" required />
              </label>
              <label className="admin-field">
                <span>Password</span>
                <input name="password" type="password" autoComplete={isSetup ? 'new-password' : 'current-password'} minLength={isSetup ? 8 : undefined} maxLength="72" placeholder={isSetup ? 'At least 8 characters' : 'Enter your password'} required />
              </label>
              {isSetup && <label className="admin-field"><span>Confirm password</span><input name="confirmPassword" type="password" autoComplete="new-password" minLength="8" maxLength="72" placeholder="Re-enter your password" required /></label>}
              <button className="text-center admin-button admin-button--primary admin-login-submit" type="submit" disabled={busy}>
                {busy ? <LoaderCircle className="admin-spin " size={18} /> : <>{isSetup ? 'Create admin account' : 'Sign in '} <ArrowRight size={17} /></>}
              </button>
              {!isSetup && <div className="admin-login-card__secure"><KeyRound size={13} /> Protected by encrypted administrator access</div>}
            </>
          ) : <div className="admin-login-card__secure">Initial setup status could not be loaded. Restart the backend and try again.</div>}
          <a className="admin-back-link" href="/"><ArrowLeft size={14} /> Back to XentroX</a>
        </form>
        <div className="admin-login__legal">© {new Date().getFullYear()} XentroX Solutions <span>·</span></div>
      </div>
    </main>
  );
}

export default AdminLogin;
