import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { API_URL } from "../../config/api";

function Auth() {
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [statusMessage, setStatusMessage] = useState('')
  const [IsSignUp, setIsSignUp] = useState(false);

  const navigate = useNavigate()

  const resetForm = () => {
    setUsername('')
    setEmail('')
    setPassword('')
  }

  const handleSignUp = () => {
    resetForm()
    setStatusMessage('')
    setIsSignUp(true)
  }
  const handleSignIn = () => {
    resetForm()
    setStatusMessage('')
    setIsSignUp(false)
  }


  const registerHandler = async (e) => {
    e.preventDefault()
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setStatusMessage('Please enter a valid email address.')
      return
    }
    if (password.length < 8) {
      setStatusMessage('Password must be at least 8 characters long.')
      return
    }

    setStatusMessage('Registration processing...')
    try {
      const res = await fetch(`${API_URL}/register`,
        {
          method: 'POST',
          headers: {
            'Content-type': 'application/json',
          },
          body: JSON.stringify({ username: username, email: email, password: password }),
        }
      )
      const data = await res.json()

      if (res.ok) {
        // clear inputs and navigate to sign in
        resetForm()
        setIsSignUp(false)
        setStatusMessage('Registration successful! Please sign in.')
      }
      else {
        const errorText = Array.isArray(data.detail)
          ? data.detail.map(err => err.msg).join(', ')
          : (data.detail || data.message || 'Registration failed');
        setStatusMessage(errorText)
        console.log(data)
      }

    } catch (error) {
      setStatusMessage(`${error} is the backend running?`)
      console.log(statusMessage)
    }
  }


  const loginHandler = async (e) => {
    e.preventDefault()

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setStatusMessage('Please enter a valid email address.')
      return
    }
    if (password.length < 8) {
      setStatusMessage('Password must be at least 8 characters long.')
      return
    }

    setStatusMessage('Logging in process...')

    try {          // here we want to fetch url then what we need is to post the data so we need to convert to string then post it
      const res = await fetch(`${API_URL}/login`,
        {
          method: 'POST',
          headers: {
            'Content-type': 'application/json',
          },
          body: JSON.stringify({ username: username, email: email, password: password }),
        }
      )  // fetch("url" , object{ method , header , body that is actual data })

      const data = await res.json() // we collect data as json

      if (res.ok) {

        localStorage.setItem('token', data.access_token)  // JWT Token
        navigate("/dashboard")
        setStatusMessage(data.message) // login successfully
        console.log(statusMessage)
        console.log(data.access_token);
        
        }
      else {
        const errorText = Array.isArray(data.detail)
          ? data.detail.map(err => err.msg).join(', ')
          : (data.detail || data.message || 'Login failed');
        setStatusMessage(errorText)
        console.log(data)
      }
    }
    catch (error) {
      setStatusMessage(`${error} , Is the Backend Working?`)
      console.log(statusMessage)
    }
  }



  return (
    <div className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden animate-fade-in">
      {/* ── Animated Background Orbs ── */}
      <div className="absolute w-[400px] h-[400px] bg-primary rounded-full blur-[80px] opacity-40 -top-24 -right-24"
        style={{ animation: 'orbFloat1 15s ease-in-out infinite' }} />
      <div className="absolute w-[300px] h-[300px] bg-secondary rounded-full blur-[80px] opacity-40 -bottom-20 -left-20"
        style={{ animation: 'orbFloat2 18s ease-in-out infinite' }} />
      <div className="absolute w-[200px] h-[200px] bg-success rounded-full blur-[80px] opacity-20 top-1/2 left-1/2"
        style={{ animation: 'orbFloat3 12s ease-in-out infinite' }} />

      {/* ── Main Container ── */}
      <div className="flex w-full max-w-[1000px] min-h-[600px] rounded-2xl overflow-hidden relative z-10
        shadow-2xl border border-white/[0.08] bg-surface/70 backdrop-blur-xl animate-scale-in">

        {/* ── Left: Branding Panel ── */}
        <div className="flex-1 bg-gradient-to-br from-primary via-secondary to-accent p-12
          flex flex-col justify-start pt-28 relative overflow-hidden max-md:p-8 max-md:hidden">
          {/* Decorative glass circles */}
          <div className="absolute top-0 left-0 right-0 bottom-0
            bg-[radial-gradient(circle_at_30%_70%,rgba(255,255,255,0.1)_0%,transparent_50%),radial-gradient(circle_at_70%_30%,rgba(255,255,255,0.05)_0%,transparent_50%)]" />

          <div className="relative z-10">
            <div className="w-16 h-16 bg-white/20 rounded-xl flex items-center justify-center text-3xl mb-8
              backdrop-blur-sm border border-white/15 animate-slide-up" style={{ animationDelay: '150ms' }}>
              💰
            </div>

            <h1 className="text-4xl font-extrabold text-white leading-tight mb-4 tracking-tight animate-slide-up" style={{ animationDelay: '250ms' }}>
              Expense Tracker
            </h1>
            <p className="text-lg text-white/80 leading-relaxed max-w-[340px] animate-slide-up" style={{ animationDelay: '350ms' }}>
              Take control of your finances. Track spending, set budgets, and
              reach your financial goals effortlessly.
            </p>

            <ul className="mt-8 flex flex-col gap-4">
              <li className="flex items-center gap-3 text-sm text-white/85 animate-slide-up" style={{ animationDelay: '450ms' }}>
                <span className="w-8 h-8 bg-white/15 rounded-lg flex items-center justify-center text-sm shrink-0">📊</span>
                Real-time expense analytics
              </li>
              <li className="flex items-center gap-3 text-sm text-white/85 animate-slide-up" style={{ animationDelay: '550ms' }}>
                <span className="w-8 h-8 bg-white/15 rounded-lg flex items-center justify-center text-sm shrink-0">🎯</span>
                Smart budget planning
              </li>
              <li className="flex items-center gap-3 text-sm text-white/85 animate-slide-up" style={{ animationDelay: '650ms' }}>
                <span className="w-8 h-8 bg-white/15 rounded-lg flex items-center justify-center text-sm shrink-0">🔔</span>
                Spending alerts & insights
              </li>
              <li className="flex items-center gap-3 text-sm text-white/85 animate-slide-up" style={{ animationDelay: '750ms' }}>
                <span className="w-8 h-8 bg-white/15 rounded-lg flex items-center justify-center text-sm shrink-0">🔒</span>
                Bank-grade security
              </li>
            </ul>
          </div>
        </div>

        {/* ── Right: Form Panel ── */}
        {!IsSignUp ? (
          <>
            <div className="flex-1 p-12 flex flex-col justify-center bg-surface max-md:p-8 animate-fade-in" key="signin">
              {/* Tabs */}
              <div className="flex bg-white/5 rounded-full p-1 mb-8 border border-white/[0.08]">
                <button id="login-tab"
                  onClick={handleSignIn}
                  className="flex-1 py-3 px-4 text-center text-sm font-semibold rounded-full
                bg-primary text-white shadow-[0_2px_10px_rgba(99,102,241,0.3)]
                transition-all duration-250">
                  Sign In
                </button>
                <button id="register-tab"
                  onClick={handleSignUp}
                  className="flex-1 py-3 px-4 text-center text-sm font-semibold rounded-full
                bg-transparent text-slate-500 hover:text-slate-400
                transition-all duration-250 cursor-pointer">
                  Sign Up
                </button>
              </div>

              {/* Status Message */}
              {statusMessage && (
                <div className={`animate-slide-down px-4 py-3 rounded-xl text-sm font-medium mb-6 flex items-center gap-2 ${
                  statusMessage.toLowerCase().includes('processing') || statusMessage.toLowerCase().includes('logging')
                    ? 'bg-primary/10 border border-primary/20 text-primary-light'
                    : statusMessage.toLowerCase().includes('success')
                      ? 'bg-emerald-500/10 border border-emerald-500/20 text-emerald-400'
                      : 'bg-rose-500/10 border border-rose-500/20 text-rose-400'
                }`}>
                  <span>{
                    statusMessage.toLowerCase().includes('processing') || statusMessage.toLowerCase().includes('logging')
                      ? '⏳'
                      : statusMessage.toLowerCase().includes('success')
                        ? '✅'
                        : '⚠️'
                  }</span>
                  {statusMessage}
                </div>
              )}

              {/* Form Header */}
              <div className="mb-8 animate-slide-up" style={{ animationDelay: '100ms' }}>
                <h2 className="text-2xl font-bold text-slate-100 mb-2">Welcome back</h2>
                <p className="text-sm text-slate-400">Enter your credentials to access your account</p>
              </div>

              {/* Login Form */}
              <form className="flex flex-col gap-5 animate-slide-up" style={{ animationDelay: '200ms' }}>
                {/* Email */}
                <div className="flex flex-col gap-2">
                  <label htmlFor="login-email" className="text-sm font-medium text-slate-400">
                    Email Address
                  </label>
                  <div className="relative flex items-center">
                    <span className="absolute left-4 text-slate-500 text-base pointer-events-none">✉️</span>
                    <input id="login-email" type="email" placeholder="you@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full py-3 pl-11 pr-4 bg-white/5 border border-white/[0.08] rounded-xl
                    text-slate-100 text-sm placeholder:text-slate-500
                    hover:bg-white/[0.08] hover:border-white/[0.12]
                    focus:bg-white/[0.08] focus:border-primary/50 focus:shadow-[0_0_0_3px_rgba(99,102,241,0.25)]
                    transition-all duration-150 outline-none" />
                  </div>
                </div>

                {/* Password */}
                <div className="flex flex-col gap-2">
                  <label htmlFor="login-password" className="text-sm font-medium text-slate-400">
                    Password
                  </label>
                  <div className="relative flex items-center">
                    <span className="absolute left-4 text-slate-500 text-base pointer-events-none">🔒</span>
                    <input id="login-password" type="password" placeholder="Enter your password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full py-3 pl-11 pr-12 bg-white/5 border border-white/[0.08] rounded-xl
                    text-slate-100 text-sm placeholder:text-slate-500
                    hover:bg-white/[0.08] hover:border-white/[0.12]
                    focus:bg-white/[0.08] focus:border-primary/50 focus:shadow-[0_0_0_3px_rgba(99,102,241,0.25)]
                    transition-all duration-150 outline-none" />
                    <button type="button" className="absolute right-3 text-slate-500 hover:text-slate-400
                  bg-transparent border-none p-1 text-sm transition-colors duration-150 cursor-pointer">
                      👁️
                    </button>
                  </div>
                </div>

                {/* Options row */}
                <div className="flex items-center justify-between mt-1">
                  <label className="flex items-center gap-2 cursor-pointer text-sm text-slate-400">
                    <input type="checkbox" id="remember-me"
                      className="appearance-none w-[18px] h-[18px] border-[1.5px] border-white/[0.08] rounded
                    bg-white/5 cursor-pointer transition-all duration-150
                    checked:bg-primary checked:border-primary" />
                    <span>Remember me</span>
                  </label>
                  <a href="#" className="text-sm text-indigo-300 font-medium hover:text-primary transition-colors duration-150">
                    Forgot password?
                  </a>
                </div>

                {/* Submit */}
                <button type="submit" id="login-btn"
                  onClick={loginHandler}
                  className="w-full py-3 px-6 bg-gradient-to-r from-primary via-secondary to-accent
                text-white text-base font-semibold rounded-xl border-none cursor-pointer
                relative overflow-hidden mt-2
                hover:-translate-y-0.5 hover:shadow-[0_8px_25px_rgba(99,102,241,0.35)]
                active:translate-y-0 transition-all duration-250">
                  Sign In
                </button>

                {/* Divider */}
                <div className="flex items-center gap-4 my-2">
                  <div className="flex-1 h-px bg-white/[0.08]" />
                  <span className="text-xs text-slate-500 uppercase tracking-wider font-medium">or continue with</span>
                  <div className="flex-1 h-px bg-white/[0.08]" />
                </div>

                {/* Social Buttons */}
                <div className="flex gap-3">
                  <button type="button" id="google-login"
                    className="flex-1 flex items-center justify-center gap-2 py-3 bg-white/5
                  border border-white/[0.08] rounded-xl text-slate-400 text-sm font-medium
                  hover:bg-white/[0.08] hover:border-white/[0.15] hover:text-slate-100
                  hover:-translate-y-0.5 transition-all duration-150 cursor-pointer">
                    <svg width="18" height="18" viewBox="0 0 24 24">
                      <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" />
                      <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                      <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                      <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                    </svg>
                    Google
                  </button>
                </div>
              </form>

              {/* Footer */}
              <p
                onClick={handleSignUp}
                className="text-center mt-6 text-sm text-slate-500 cursor-pointer">
                Don't have an account?{' '}
                <span className="text-indigo-300 font-semibold hover:text-primary transition-colors duration-150">
                  Create one
                </span>
              </p>
            </div>
          </>) :
          (<>
            <div className="flex-1 p-12 flex flex-col justify-center bg-surface max-md:p-8 animate-fade-in" key="signup">
              {/* Tabs */}
              <div className="flex bg-white/5 rounded-full p-1 mb-8 border border-white/[0.08]">
                <button id="login-tab"
                  onClick={handleSignIn}
                  className="flex-1 py-3 px-4 text-center text-sm font-semibold rounded-full
                bg-transparent text-slate-500 hover:text-slate-400
                transition-all duration-250 cursor-pointer">
                  Sign In
                </button>
                <button id="register-tab"
                  onClick={handleSignUp}
                  className="flex-1 py-3 px-4 text-center text-sm font-semibold rounded-full
                bg-primary text-white shadow-[0_2px_10px_rgba(99,102,241,0.3)]
                transition-all duration-250">
                  Sign Up
                </button>
              </div>

              {/* Status Message */}
              {statusMessage && (
                <div className={`animate-slide-down px-4 py-3 rounded-xl text-sm font-medium mb-6 flex items-center gap-2 ${
                  statusMessage.toLowerCase().includes('processing') || statusMessage.toLowerCase().includes('logging')
                    ? 'bg-primary/10 border border-primary/20 text-primary-light'
                    : statusMessage.toLowerCase().includes('success')
                      ? 'bg-emerald-500/10 border border-emerald-500/20 text-emerald-400'
                      : 'bg-rose-500/10 border border-rose-500/20 text-rose-400'
                }`}>
                  <span>{
                    statusMessage.toLowerCase().includes('processing') || statusMessage.toLowerCase().includes('logging')
                      ? '⏳'
                      : statusMessage.toLowerCase().includes('success')
                        ? '✅'
                        : '⚠️'
                  }</span>
                  {statusMessage}
                </div>
              )}

              {/* Form Header */}
              <div className="mb-8 animate-slide-up" style={{ animationDelay: '100ms' }}>
                <h2 className="text-2xl font-bold text-slate-100 mb-2">Create New Account</h2>
                <p className="text-sm text-slate-400">Fill in your details to get started</p>
              </div>

              {/* Register Form */}
              <form className="flex flex-col gap-5 animate-slide-up" style={{ animationDelay: '200ms' }}>
                {/* Username */}
                <div className="flex flex-col gap-2">
                  <label htmlFor="username" className="text-sm font-medium text-slate-400">
                    User Name
                  </label>
                  <div className="relative flex items-center">
                    <span className="absolute left-4 text-slate-500 text-base pointer-events-none">👤</span>
                    <input id="username" type="text" placeholder="johndoe123"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      className="w-full py-3 pl-11 pr-4 bg-white/5 border border-white/[0.08] rounded-xl
                    text-slate-100 text-sm placeholder:text-slate-500
                    hover:bg-white/[0.08] hover:border-white/[0.12]
                    focus:bg-white/[0.08] focus:border-primary/50 focus:shadow-[0_0_0_3px_rgba(99,102,241,0.25)]
                    transition-all duration-150 outline-none" />
                  </div>
                </div>
                {/* Email */}
                <div className="flex flex-col gap-2">
                  <label htmlFor="register-email" className="text-sm font-medium text-slate-400">
                    Email Address
                  </label>
                  <div className="relative flex items-center">
                    <span className="absolute left-4 text-slate-500 text-base pointer-events-none">✉️</span>
                    <input id="register-email" type="email" placeholder="you@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full py-3 pl-11 pr-4 bg-white/5 border border-white/[0.08] rounded-xl
                    text-slate-100 text-sm placeholder:text-slate-500
                    hover:bg-white/[0.08] hover:border-white/[0.12]
                    focus:bg-white/[0.08] focus:border-primary/50 focus:shadow-[0_0_0_3px_rgba(99,102,241,0.25)]
                    transition-all duration-150 outline-none" />
                  </div>
                </div>

                {/* Password */}
                <div className="flex flex-col gap-2">
                  <label htmlFor="register-password" className="text-sm font-medium text-slate-400">
                    Password
                  </label>
                  <div className="relative flex items-center">
                    <span className="absolute left-4 text-slate-500 text-base pointer-events-none">🔒</span>
                    <input id="register-password" type="password" placeholder="Create a strong password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full py-3 pl-11 pr-12 bg-white/5 border border-white/[0.08] rounded-xl
                    text-slate-100 text-sm placeholder:text-slate-500
                    hover:bg-white/[0.08] hover:border-white/[0.12]
                    focus:bg-white/[0.08] focus:border-primary/50 focus:shadow-[0_0_0_3px_rgba(99,102,241,0.25)]
                    transition-all duration-150 outline-none" />
                    <button type="button" className="absolute right-3 text-slate-500 hover:text-slate-400
                  bg-transparent border-none p-1 text-sm transition-colors duration-150 cursor-pointer">
                      👁️
                    </button>
                  </div>
                </div>

                {/* Submit */}
                <button type="submit" id="register-btn"
                  onClick={registerHandler}
                  className="w-full py-3 px-6 bg-gradient-to-r from-primary via-secondary to-accent
                text-white text-base font-semibold rounded-xl border-none cursor-pointer
                relative overflow-hidden mt-2
                hover:-translate-y-0.5 hover:shadow-[0_8px_25px_rgba(99,102,241,0.35)]
                active:translate-y-0 transition-all duration-250">
                  Create Account
                </button>

                {/* Divider */}
                <div className="flex items-center gap-4 my-2">
                  <div className="flex-1 h-px bg-white/[0.08]" />
                  <span className="text-xs text-slate-500 uppercase tracking-wider font-medium">or continue with</span>
                  <div className="flex-1 h-px bg-white/[0.08]" />
                </div>

                {/* Social Buttons */}
                <div className="flex gap-3">
                  <button type="button" id="google-register"
                    className="flex-1 flex items-center justify-center gap-2 py-3 bg-white/5
                  border border-white/[0.08] rounded-xl text-slate-400 text-sm font-medium
                  hover:bg-white/[0.08] hover:border-white/[0.15] hover:text-slate-100
                  hover:-translate-y-0.5 transition-all duration-150 cursor-pointer">
                    <svg width="18" height="18" viewBox="0 0 24 24">
                      <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" />
                      <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                      <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                      <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                    </svg>
                    Google
                  </button>
                </div>
              </form>

              {/* Footer */}
              <p
                onClick={handleSignIn}
                className="text-center mt-6 text-sm text-slate-500 cursor-pointer">
                Already have an account?{' '}
                <span className="text-indigo-300 font-semibold hover:text-primary transition-colors duration-150">
                  Sign in
                </span>
              </p>
            </div>
          </>)
        }


      </div>
    </div>
  );
}

export default Auth;
