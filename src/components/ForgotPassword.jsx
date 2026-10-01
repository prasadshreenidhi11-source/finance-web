import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./ForgotPassword.css";

function ForgotPassword() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!email) {
      setError("Please enter your email address.");
      return;
    }

    setError("");
    setSubmitted(true);
  };

  return (
    <main className="forgot-page">
      <div className="forgot-glow forgot-glow-one" />
      <div className="forgot-glow forgot-glow-two" />

      <section className="forgot-card">

        <button
          className="forgot-back"
          onClick={() => navigate("/login")}
        >
          ← Back to sign in
        </button>

        <div className="forgot-brand">
          <div className="forgot-logo">
            <span />
            <span />
          </div>

          <div>
            <strong>Orion</strong>
            <small>Financial Intelligence</small>
          </div>
        </div>

        {!submitted ? (
          <>
            <div className="forgot-icon">
              🔐
            </div>

            <div className="forgot-heading">
              <span>ACCOUNT RECOVERY</span>

              <h1>
                Forgot your
                <br />
                password?
              </h1>

              <p>
                No worries. Enter the email address connected
                to your Orion account and we'll help you reset it.
              </p>
            </div>

            <form
              className="forgot-form"
              onSubmit={handleSubmit}
            >
              <div className="forgot-field">
                <label>Email address</label>

                <div className="forgot-input-wrap">
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

              {error && (
                <p className="forgot-error">
                  {error}
                </p>
              )}

              <button
                type="submit"
                className="forgot-submit"
              >
                Send reset link
                <span>→</span>
              </button>
            </form>

            <div className="forgot-help">
              <span>✦</span>
              <p>
                We'll send password reset instructions
                to your email address.
              </p>
            </div>
          </>
        ) : (
          <div className="forgot-success">

            <div className="success-icon">
              ✓
            </div>

            <span className="success-label">
              EMAIL SENT
            </span>

            <h1>
              Check your
              <br />
              inbox.
            </h1>

            <p>
              If an account exists for{" "}
              <strong>{email}</strong>,
              you'll receive password reset instructions shortly.
            </p>

            <button
              onClick={() => navigate("/login")}
              className="success-button"
            >
              Return to sign in
              <span>→</span>
            </button>

          </div>
        )}

        <div className="forgot-security">
          <span>✦</span>
          <p>
            Orion keeps your financial information protected.
          </p>
        </div>

      </section>
    </main>
  );
}

export default ForgotPassword;