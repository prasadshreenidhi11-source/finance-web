
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";
import "./Settings.css";

function Settings() {
  const { theme, setTheme } = useTheme();
  const navigate = useNavigate();

  const [notifications, setNotifications] = useState(true);
  const [weeklySummary, setWeeklySummary] = useState(true);
  const [aiInsights, setAiInsights] = useState(true);

  const navItems = [
    ["⌂", "Home", "/home"],
    ["⌁", "Portfolio", "/portfolio"],
    ["▦", "Accounts", "/accounts"],
    ["✦", "Insights", "/insights"],
    ["◎", "Goals", "/goals"],
    ["▤", "Reports", "/reports"],
    ["⚙", "Settings", "/settings"],
  ];

  return (
    <section className="settings-page page-transition">

      {/* SIDEBAR */}

      <aside className="settings-sidebar">

        <div className="settings-brand">

          <div className="settings-logo">
            <span />
            <span />
          </div>

          <div>
            <strong>Orion</strong>
            <small>Financial Intelligence</small>
          </div>

        </div>

        <nav className="settings-nav">

          {navItems.map(([icon, label, path]) => (
            <button
              key={label}
              className={`settings-nav-item ${
                label === "Settings" ? "active" : ""
              }`}
              onClick={() => navigate(path)}
            >
              <span className="settings-nav-icon">{icon}</span>
              <span>{label}</span>
            </button>
          ))}

        </nav>

        <div className="settings-ai-status">

          <div className="settings-ai-symbol">✦</div>

          <div>
            <strong>AI Assistant</strong>
            <span>Personalizing your experience</span>
          </div>

          <i />

        </div>

      </aside>

      {/* MAIN */}

      <main className="settings-main">

        {/* TOPBAR */}

        <header className="settings-topbar">

          <div className="settings-search">

            <span>⌕</span>

            <input
              type="text"
              placeholder="Search settings..."
            />

          </div>

          <div className="settings-user-area">

            <button className="settings-bell">
              ♧
              <i />
            </button>

            <div className="settings-user">

              <div className="settings-avatar">D</div>

              <div>
                <strong>Daniel Carter</strong>
                <span>Personal · 9 accounts</span>
              </div>

              <b>⌄</b>

            </div>

          </div>

        </header>

        {/* CONTENT */}

        <div className="settings-content">

          {/* HEADING */}

          <section className="settings-heading">

            <div>

              <span>ACCOUNT CONTROL CENTER</span>

              <h1>Settings</h1>

              <p>
                Manage your account, preferences, security,
                and financial intelligence experience.
              </p>

            </div>

            <button className="save-settings">
              Save changes
            </button>

          </section>

          {/* PROFILE */}

          <section className="settings-profile-card">

            <div className="profile-avatar-large">
              D
            </div>

            <div className="profile-main">

              <span>YOUR PROFILE</span>

              <h2>Daniel Carter</h2>

              <p>
                daniel.carter@example.com
              </p>

              <div className="profile-tags">

                <span>Personal account</span>
                <span>9 connected accounts</span>

              </div>

            </div>

            <button className="edit-profile">
              Edit profile →
            </button>

          </section>

          {/* SETTINGS GRID */}

          <section className="settings-grid">

            {/* PERSONAL */}

            <div className="settings-card personal-card">

              <div className="settings-card-heading">

                <div className="settings-card-icon purple">
                  ◉
                </div>

                <div>
                  <span>PERSONAL</span>
                  <h2>Account preferences</h2>
                </div>

              </div>

              <div className="setting-row">

                <div>
                  <strong>Full name</strong>
                  <span>Daniel Carter</span>
                </div>

                <button>Edit</button>

              </div>

              <div className="setting-row">

                <div>
                  <strong>Email address</strong>
                  <span>daniel.carter@example.com</span>
                </div>

                <button>Edit</button>

              </div>

              <div className="setting-row">

                <div>
                  <strong>Currency</strong>
                  <span>USD · United States Dollar</span>
                </div>

                <button>Edit</button>

              </div>

              <div className="setting-row">

                <div>
                  <strong>Time zone</strong>
                  <span>GMT +05:30</span>
                </div>

                <button>Edit</button>

              </div>

            </div>

            {/* APPEARANCE */}

            <div className="settings-card appearance-card">

              <div className="settings-card-heading">

                <div className="settings-card-icon blue">
                  ◐
                </div>

                <div>
                  <span>INTERFACE</span>
                  <h2>Appearance</h2>
                </div>

              </div>

              <div className="appearance-preview">

                <div className="preview-sidebar">
                  <span />
                  <span />
                  <span />
                  <span />
                </div>

                <div className="preview-content">

                  <div className="preview-top" />

                  <div className="preview-cards">
                    <span />
                    <span />
                    <span />
                  </div>

                </div>

              </div>

              {/* THEME OPTIONS */}

              <div className="theme-options">

                <button
                  className={theme === "light" ? "selected" : ""}
                  onClick={() => setTheme("light")}
                >
                  <span className="light-preview" />
                  Light
                </button>

                <button
                  className={theme === "dark" ? "selected" : ""}
                  onClick={() => setTheme("dark")}
                >
                  <span className="dark-preview" />
                  Dark
                </button>

                <button
                  className="system-option"
                  onClick={() => {
                    const systemTheme = window.matchMedia(
                      "(prefers-color-scheme: dark)"
                    ).matches
                      ? "dark"
                      : "light";

                    setTheme(systemTheme);
                  }}
                >
                  <span className="system-preview" />
                  System
                </button>

              </div>

            </div>

            {/* NOTIFICATIONS */}

            <div className="settings-card notification-card">

              <div className="settings-card-heading">

                <div className="settings-card-icon orange">
                  ♧
                </div>

                <div>
                  <span>ALERTS</span>
                  <h2>Notifications</h2>
                </div>

              </div>

              <div className="toggle-row">

                <div>
                  <strong>Push notifications</strong>
                  <span>
                    Get important account alerts instantly.
                  </span>
                </div>

                <button
                  className={`toggle ${
                    notifications ? "on" : ""
                  }`}
                  onClick={() =>
                    setNotifications(!notifications)
                  }
                >
                  <i />
                </button>

              </div>

              <div className="toggle-row">

                <div>
                  <strong>Weekly financial summary</strong>
                  <span>
                    Receive a summary of your finances.
                  </span>
                </div>

                <button
                  className={`toggle ${
                    weeklySummary ? "on" : ""
                  }`}
                  onClick={() =>
                    setWeeklySummary(!weeklySummary)
                  }
                >
                  <i />
                </button>

              </div>

              <div className="toggle-row">

                <div>
                  <strong>Goal reminders</strong>
                  <span>
                    Stay updated on upcoming milestones.
                  </span>
                </div>

                <button className="toggle on">
                  <i />
                </button>

              </div>

            </div>

            {/* AI */}

            <div className="settings-card ai-card">

              <div className="settings-card-heading">

                <div className="settings-card-icon purple">
                  ✦
                </div>

                <div>
                  <span>INTELLIGENCE</span>
                  <h2>AI preferences</h2>
                </div>

              </div>

              <div className="ai-preference">

                <div className="ai-preference-symbol">
                  ✦
                </div>

                <div>
                  <strong>Personalized insights</strong>
                  <span>
                    Let Orion analyze your financial patterns.
                  </span>
                </div>

                <button
                  className={`toggle ${
                    aiInsights ? "on" : ""
                  }`}
                  onClick={() =>
                    setAiInsights(!aiInsights)
                  }
                >
                  <i />
                </button>

              </div>

              <div className="ai-level">

                <span>Insight frequency</span>

                <div>

                  <button>Low</button>

                  <button className="selected">
                    Balanced
                  </button>

                  <button>High</button>

                </div>

              </div>

              <p className="ai-note">
                Orion uses your financial activity to surface
                relevant trends, opportunities, and alerts.
              </p>

            </div>

            {/* SECURITY */}

            <div className="settings-card security-card">

              <div className="settings-card-heading">

                <div className="settings-card-icon green">
                  ✓
                </div>

                <div>
                  <span>PROTECTION</span>
                  <h2>Security & privacy</h2>
                </div>

              </div>

              <div className="security-status">

                <div className="security-check">
                  ✓
                </div>

                <div>
                  <strong>Your account is protected</strong>
                  <span>
                    All recommended security settings are enabled.
                  </span>
                </div>

              </div>

              <div className="security-row">

                <div>
                  <strong>Password</strong>
                  <span>Last changed 32 days ago</span>
                </div>

                <button>Update</button>

              </div>

              <div className="security-row">

                <div>
                  <strong>Two-factor authentication</strong>
                  <span>Authenticator app · Enabled</span>
                </div>

                <b>Active</b>

              </div>

              <div className="security-row">

                <div>
                  <strong>Active sessions</strong>
                  <span>2 devices currently signed in</span>
                </div>

                <button>Manage</button>

              </div>

            </div>

            {/* CONNECTIONS */}

            <div className="settings-card connections-card">

              <div className="settings-card-heading">

                <div className="settings-card-icon blue">
                  ⛓
                </div>

                <div>
                  <span>CONNECTED</span>
                  <h2>Financial connections</h2>
                </div>

              </div>

              <div className="connection-row">

                <div className="connection-logo bank">
                  B
                </div>

                <div>
                  <strong>Bank of America</strong>
                  <span>Checking · •••• 4821</span>
                </div>

                <b>Connected</b>

              </div>

              <div className="connection-row">

                <div className="connection-logo chase">
                  C
                </div>

                <div>
                  <strong>Chase</strong>
                  <span>Credit Card · •••• 2190</span>
                </div>

                <b>Connected</b>

              </div>

              <div className="connection-row">

                <div className="connection-logo fidelity">
                  F
                </div>

                <div>
                  <strong>Fidelity</strong>
                  <span>Investment · •••• 7734</span>
                </div>

                <b>Connected</b>

              </div>

              <button className="add-connection">
                ＋ Connect another account
              </button>

            </div>

          </section>

          {/* PLAN */}

          <section className="settings-plan">

            <div className="plan-icon">
              ✦
            </div>

            <div className="plan-content">

              <span>YOUR PLAN</span>

              <h2>Orion Premium</h2>

              <p>
                Advanced financial intelligence, unlimited reports,
                and personalized insights.
              </p>

            </div>

            <div className="plan-details">

              <strong>$12.99</strong>
              <span>per month</span>

            </div>

            <button>
              Manage plan →
            </button>

          </section>

          {/* DANGER ZONE */}

          <section className="danger-zone">

            <div>

              <span>DANGER ZONE</span>

              <h2>Account actions</h2>

              <p>
                Export your data or permanently close your Orion
                account.
              </p>

            </div>

            <div className="danger-actions">

              <button className="export-data">
                Export my data
              </button>

              <button className="delete-account">
                Delete account
              </button>

            </div>

          </section>

        </div>

      </main>

    </section>
  );
}

export default Settings;

