import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "../firebase";
import "./Login.css";

function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();

    if (!email.trim() || !password) {
      setError("Please enter your email and password.");
      return;
    }

    const savedUser = JSON.parse(
      localStorage.getItem("orion_user") || "null"
    );

    if (!savedUser) {
      setError("No account found. Please create an account first.");
      return;
    }

    if (
      savedUser.email.toLowerCase() !== email.trim().toLowerCase() ||
      savedUser.password !== password
    ) {
      setError("Incorrect email or password.");
      return;
    }

    localStorage.setItem("orion_authenticated", "true");

    navigate("/home");
  };

  // GOOGLE LOGIN
  const handleGoogleLogin = async () => {
  try {
    setError("");

    const provider = new GoogleAuthProvider();

    const result = await signInWithPopup(auth, provider);

    const user = result.user;

    localStorage.setItem("orion_authenticated", "true");

    localStorage.setItem(
      "orion_user",
      JSON.stringify({
        name: user.displayName,
        email: user.email,
        photo: user.photoURL,
        uid: user.uid,
      })
    );

    navigate("/home");

  } catch (error) {
    console.error("Google Sign-In Error:", error);
    console.error("Error Code:", error.code);
    console.error("Error Message:", error.message);

    setError(`${error.code}: ${error.message}`);
  }
};

  return (
    <main className="login-page">
      <div className="login-background-glow glow-one" />
      <div className="login-background-glow glow-two" />

      <section className="login-card">

        <div className="login-brand">
          <div className="login-logo">
            <span />
            <span />
          </div>

          <div>
            <strong>Orion</strong>
            <small>Financial Intelligence</small>
          </div>
        </div>

        <div className="login-heading">
          <span>WELCOME BACK</span>

          <h1>
            Sign in to
            <br />
            your finances.
          </h1>

          <p>
            Manage your money, track your goals,
            and understand your financial future.
          </p>
        </div>

        <form className="login-form" onSubmit={handleLogin}>

          <div className="login-field">
            <label>Email address</label>

            <div className="login-input-wrap">
              <span>✉</span>

              <input
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  setError("");
                }}
              />
            </div>
          </div>

          <div className="login-field">

            <div className="login-label-row">
              <label>Password</label>

              <button
                type="button"
                onClick={() => navigate("/forgot-password")}
              >
                Forgot password?
              </button>
            </div>

            <div className="login-input-wrap">
              <span>⌑</span>

              <input
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  setError("");
                }}
              />

              <button
                type="button"
                className="password-toggle"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>
          </div>

          {error && <p className="login-error">{error}</p>}

          <label className="remember-row">
            <input type="checkbox" />
            <span>Remember me</span>
          </label>

          <button
            type="submit"
            className="login-submit"
          >
            Sign in
            <span>→</span>
          </button>

        </form>

        <div className="login-divider">
          <span />
          <p>or continue with</p>
          <span />
        </div>

        <div className="login-socials">

          {/* GOOGLE */}
          <button
            type="button"
            onClick={handleGoogleLogin}
          >
            <strong>G</strong>
            Google
          </button>

          {/* APPLE */}
          <button type="button">
            <strong>⌘</strong>
            Apple
          </button>

        </div>

        <div className="login-signup">
          <span>Don't have an account?</span>

          <button
            type="button"
            onClick={() => navigate("/signup")}
          >
            Create account
          </button>
        </div>

        <div className="login-security">
          <span>✦</span>

          <p>
            Your financial data is protected with secure encryption.
          </p>
        </div>

      </section>
    </main>
  );
}

export default Login;