import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import { auth } from "../firebase";
import "./Signup.css";

function Signup() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [googleLoading, setGoogleLoading] = useState(false);

  const handleSignup = (e) => {
    e.preventDefault();

    if (!name.trim() || !email.trim() || !password || !confirmPassword) {
      setError("Please fill in all fields.");
      return;
    }

    if (password.length < 6) {
      setError("Password must contain at least 6 characters.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    const existingUser = JSON.parse(
      localStorage.getItem("orion_user") || "null"
    );

    if (
      existingUser &&
      existingUser.email.toLowerCase() === email.trim().toLowerCase()
    ) {
      setError("An account with this email already exists.");
      return;
    }

    const user = {
      name: name.trim(),
      email: email.trim().toLowerCase(),
      password,
    };

    localStorage.setItem("orion_user", JSON.stringify(user));
    localStorage.setItem("orion_authenticated", "true");

    navigate("/home");
  };

  const handleGoogleSignup = async () => {
    try {
      setError("");
      setGoogleLoading(true);

      const provider = new GoogleAuthProvider();

      const result = await signInWithPopup(auth, provider);

      const user = result.user;

      const googleUser = {
        name: user.displayName || "Orion User",
        email: user.email || "",
        photoURL: user.photoURL || "",
        provider: "google",
      };

      localStorage.setItem("orion_user", JSON.stringify(googleUser));
      localStorage.setItem("orion_authenticated", "true");

      navigate("/home");
    } catch (error) {
      console.error("Google Sign-In Error:", error);

      if (error.code === "auth/popup-closed-by-user") {
        setError("Google sign-in was cancelled.");
      } else if (error.code === "auth/popup-blocked") {
        setError("Please allow popups in your browser and try again.");
      } else if (error.code === "auth/account-exists-with-different-credential") {
        setError("An account already exists with this email.");
      } else {
        setError("Google sign-in failed. Please try again.");
      }
    } finally {
      setGoogleLoading(false);
    }
  };

  return (
    <main className="signup-page">
      <div className="signup-glow signup-glow-one" />
      <div className="signup-glow signup-glow-two" />

      <section className="signup-card">
        <div className="signup-brand">
          <div className="signup-logo">
            <span />
            <span />
          </div>

          <div>
            <strong>Orion</strong>
            <small>Financial Intelligence</small>
          </div>
        </div>

        <div className="signup-heading">
          <span>GET STARTED</span>

          <h1>
            Build a better
            <br />
            financial future.
          </h1>

          <p>
            Create your Orion account and bring your
            finances together in one intelligent workspace.
          </p>
        </div>

        <form className="signup-form" onSubmit={handleSignup}>
          <div className="signup-field">
            <label>Full name</label>

            <div className="signup-input-wrap">
              <span>◉</span>

              <input
                type="text"
                placeholder="Daniel Carter"
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                  setError("");
                }}
              />
            </div>
          </div>

          <div className="signup-field">
            <label>Email address</label>

            <div className="signup-input-wrap">
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

          <div className="signup-field">
            <label>Password</label>

            <div className="signup-input-wrap">
              <span>⌑</span>

              <input
                type={showPassword ? "text" : "password"}
                placeholder="Create a password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  setError("");
                }}
              />

              <button
                type="button"
                className="signup-password-toggle"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>
          </div>

          <div className="signup-field">
            <label>Confirm password</label>

            <div className="signup-input-wrap">
              <span>⌑</span>

              <input
                type={showPassword ? "text" : "password"}
                placeholder="Repeat your password"
                value={confirmPassword}
                onChange={(e) => {
                  setConfirmPassword(e.target.value);
                  setError("");
                }}
              />
            </div>
          </div>

          {error && (
            <p className="signup-error">
              {error}
            </p>
          )}

          <label className="signup-terms">
            <input type="checkbox" required />

            <span>
              I agree to the Orion terms and privacy policy.
            </span>
          </label>

          <button type="submit" className="signup-submit">
            Create account
            <span>→</span>
          </button>
        </form>

        <div className="signup-divider">
          <span />
          <p>or continue with</p>
          <span />
        </div>

        <div className="signup-socials">
          <button
            type="button"
            onClick={handleGoogleSignup}
            disabled={googleLoading}
          >
            <strong>G</strong>
            {googleLoading ? "Connecting..." : "Google"}
          </button>

          <button type="button">
            <strong>⌘</strong>
            Apple
          </button>
        </div>

        <div className="signup-login">
          <span>Already have an account?</span>

          <button
            type="button"
            onClick={() => navigate("/login")}
          >
            Sign in
          </button>
        </div>

        <div className="signup-security">
          <span>✦</span>

          <p>
            Your financial data is protected with secure encryption.
          </p>
        </div>
      </section>
    </main>
  );
}

export default Signup;