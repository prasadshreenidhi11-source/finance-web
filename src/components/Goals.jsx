import React from "react";
import { useNavigate } from "react-router-dom";
import "./Goals.css";

function Goals() {
  const navigate = useNavigate();

  const navItems = [
    ["⌂", "Home", "/home"],
    ["⌁", "Portfolio", "/portfolio"],
    ["▦", "Accounts", "/accounts"],
    ["✦", "Insights", "/insights"],
    ["◎", "Goals", "/goals"],
    ["▤", "Reports", "/reports"],
    ["⚙", "Settings", "/settings"],
  ];

  const goals = [
    {
      icon: "⌂",
      name: "Dream Home",
      type: "Major Purchase",
      saved: "$48,620",
      target: "$80,000",
      progress: 61,
      remaining: "$31,380",
      monthly: "$2,400",
      color: "purple",
      date: "Jun 2027",
    },
    {
      icon: "✈",
      name: "Europe Trip",
      type: "Travel",
      saved: "$6,840",
      target: "$10,000",
      progress: 68,
      remaining: "$3,160",
      monthly: "$620",
      color: "blue",
      date: "May 2027",
    },
    {
      icon: "🚗",
      name: "New Car",
      type: "Vehicle",
      saved: "$18,420",
      target: "$30,000",
      progress: 61,
      remaining: "$11,580",
      monthly: "$950",
      color: "orange",
      date: "Aug 2027",
    },
    {
      icon: "◇",
      name: "Emergency Fund",
      type: "Safety Net",
      saved: "$14,760",
      target: "$20,000",
      progress: 74,
      remaining: "$5,240",
      monthly: "$800",
      color: "green",
      date: "Jan 2027",
    },
  ];

  return (
    <section className="goals-page page-transition">

      {/* SIDEBAR */}

      <aside className="goals-sidebar">

        <div className="goals-brand">
          <div className="goals-logo">
            <span />
            <span />
          </div>

          <div>
            <strong>Orion</strong>
            <small>Financial Intelligence</small>
          </div>
        </div>

        <nav className="goals-nav">
          {navItems.map(([icon, label, path]) => (
            <button
              key={label}
              className={`goals-nav-item ${
                label === "Goals" ? "active" : ""
              }`}
              onClick={() => navigate(path)}
            >
              <span className="goals-nav-icon">{icon}</span>
              <span>{label}</span>
            </button>
          ))}
        </nav>

        <div className="goals-ai-status">
          <div className="goals-ai-symbol">✦</div>

          <div>
            <strong>AI Assistant</strong>
            <span>Optimizing your goals</span>
          </div>

          <i />
        </div>

      </aside>

      {/* MAIN */}

      <main className="goals-main">

        {/* TOPBAR */}

        <header className="goals-topbar">

          <div className="goals-search">
            <span>⌕</span>

            <input
              type="text"
              placeholder="Search goals, targets, contributions..."
            />
          </div>

          <div className="goals-user-area">

            <button className="goals-bell">
              ♧
              <i />
            </button>

            <div className="goals-user">

              <div className="goals-avatar">D</div>

              <div>
                <strong>Daniel Carter</strong>
                <span>Personal · 9 accounts</span>
              </div>

              <b>⌄</b>

            </div>

          </div>

        </header>

        {/* CONTENT */}

        <div className="goals-content">

          {/* PAGE HEADING */}

          <section className="goals-heading">

            <div>
              <span>FINANCIAL PLANNING</span>

              <h1>Goals</h1>

              <p>
                Turn your plans into progress and build the future
                you're working toward.
              </p>
            </div>

            <button className="add-goal-btn">
              <span>＋</span>
              Create new goal
            </button>

          </section>

          {/* HERO */}

          <section className="goals-hero">

            <div className="goals-hero-content">

              <span className="goals-hero-label">
                YOUR FINANCIAL JOURNEY
              </span>

              <h2>
                You're building
                <br />
                <em>something meaningful.</em>
              </h2>

              <p>
                You've already saved more than $88K toward the things
                that matter most. Keep the momentum going.
              </p>

              <div className="hero-progress">

                <div className="hero-progress-top">
                  <span>Overall progress</span>
                  <strong>66%</strong>
                </div>

                <div className="hero-progress-bar">
                  <span />
                </div>

                <div className="hero-progress-bottom">
                  <span>$88,640 saved</span>
                  <span>$140,000 total targets</span>
                </div>

              </div>

            </div>

            <div className="goals-orbit">

              <div className="goal-orbit-ring ring-large" />
              <div className="goal-orbit-ring ring-medium" />
              <div className="goal-orbit-ring ring-small" />

              <div className="goal-orbit-center">
                <span>✦</span>
                <strong>66%</strong>
                <small>Complete</small>
              </div>

              <div className="goal-floating floating-one">
                <span>⌂</span>
                <strong>$48.6K</strong>
              </div>

              <div className="goal-floating floating-two">
                <span>✈</span>
                <strong>$6.8K</strong>
              </div>

            </div>

          </section>

          {/* SUMMARY CARDS */}

          <section className="goal-summary-grid">

            <div className="goal-summary-card">

              <div className="summary-icon purple">
                $
              </div>

              <div>
                <span>TOTAL SAVED</span>
                <strong>$88,640</strong>
                <small>Across all goals</small>
              </div>

            </div>

            <div className="goal-summary-card">

              <div className="summary-icon blue">
                ↗
              </div>

              <div>
                <span>MONTHLY CONTRIBUTION</span>
                <strong>$4,770</strong>
                <small>+8.2% this month</small>
              </div>

            </div>

            <div className="goal-summary-card">

              <div className="summary-icon green">
                ✓
              </div>

              <div>
                <span>GOALS ON TRACK</span>
                <strong>4 of 4</strong>
                <small>Everything is progressing</small>
              </div>

            </div>

            <div className="goal-summary-card">

              <div className="summary-icon orange">
                ◎
              </div>

              <div>
                <span>NEXT MILESTONE</span>
                <strong>$10,000</strong>
                <small>Europe Trip</small>
              </div>

            </div>

          </section>

          {/* GOALS HEADER */}

          <section className="goals-list-section">

            <div className="goals-section-heading">

              <div>
                <span>YOUR TARGETS</span>
                <h2>Goals you're working toward</h2>
              </div>

              <button>View timeline →</button>

            </div>

            {/* GOALS GRID */}

            <div className="goals-grid">

              {goals.map((goal) => (

                <article
                  className={`goal-card ${goal.color}`}
                  key={goal.name}
                >

                  <div className="goal-card-top">

                    <div className="goal-icon">
                      {goal.icon}
                    </div>

                    <button className="goal-more">
                      •••
                    </button>

                  </div>

                  <span className="goal-type">
                    {goal.type}
                  </span>

                  <h3>{goal.name}</h3>

                  <div className="goal-money">

                    <strong>{goal.saved}</strong>

                    <span>
                      of {goal.target}
                    </span>

                  </div>

                  <div className="goal-progress">

                    <div className="goal-progress-bar">
                      <span
                        style={{
                          width: `${goal.progress}%`,
                        }}
                      />
                    </div>

                    <div className="goal-progress-meta">
                      <strong>{goal.progress}%</strong>
                      <span>{goal.remaining} left</span>
                    </div>

                  </div>

                  <div className="goal-card-bottom">

                    <div>
                      <span>MONTHLY</span>
                      <strong>{goal.monthly}</strong>
                    </div>

                    <div>
                      <span>TARGET DATE</span>
                      <strong>{goal.date}</strong>
                    </div>

                  </div>

                </article>

              ))}

            </div>

          </section>

          {/* CONTRIBUTION + TIMELINE */}

          <section className="goals-lower-grid">

            <div className="goals-panel contribution-panel">

              <div className="goals-panel-heading">

                <div>
                  <span>CONTRIBUTIONS</span>
                  <h2>Your saving activity</h2>
                </div>

                <button>6M ▾</button>

              </div>

              <div className="contribution-total">

                <div>
                  <strong>$28,620</strong>
                  <span>Contributed in the last 6 months</span>
                </div>

                <b>↗ 14.8%</b>

              </div>

              <div className="contribution-chart">

                <div className="chart-lines">
                  <span />
                  <span />
                  <span />
                  <span />
                </div>

                <div className="contribution-bars">

                  <div>
                    <i style={{ height: "45%" }} />
                    <span>Apr</span>
                  </div>

                  <div>
                    <i style={{ height: "58%" }} />
                    <span>May</span>
                  </div>

                  <div>
                    <i style={{ height: "50%" }} />
                    <span>Jun</span>
                  </div>

                  <div>
                    <i style={{ height: "72%" }} />
                    <span>Jul</span>
                  </div>

                  <div>
                    <i style={{ height: "66%" }} />
                    <span>Aug</span>
                  </div>

                  <div className="active">
                    <i style={{ height: "88%" }} />
                    <span>Sep</span>
                  </div>

                </div>

              </div>

            </div>

            {/* TIMELINE */}

            <div className="goals-panel timeline-panel">

              <div className="goals-panel-heading">

                <div>
                  <span>UPCOMING</span>
                  <h2>Goal milestones</h2>
                </div>

                <button>Calendar →</button>

              </div>

              <div className="timeline">

                <div className="timeline-item">

                  <div className="timeline-dot purple-dot" />

                  <div>
                    <strong>Europe Trip</strong>
                    <span>$10K milestone · May 2027</span>
                  </div>

                  <b>$3,160</b>

                </div>

                <div className="timeline-item">

                  <div className="timeline-dot blue-dot" />

                  <div>
                    <strong>Emergency Fund</strong>
                    <span>$20K target · Jan 2027</span>
                  </div>

                  <b>$5,240</b>

                </div>

                <div className="timeline-item">

                  <div className="timeline-dot orange-dot" />

                  <div>
                    <strong>Dream Home</strong>
                    <span>$80K target · Jun 2027</span>
                  </div>

                  <b>$31,380</b>

                </div>

              </div>

            </div>

          </section>

          {/* AI RECOMMENDATION */}

          <section className="goal-ai-card">

            <div className="goal-ai-icon">
              ✦
            </div>

            <div className="goal-ai-content">

              <span>AI RECOMMENDATION</span>

              <h2>
                You're ahead of schedule on your
                savings goals.
              </h2>

              <p>
                Increasing your monthly contributions by just $350
                could help you reach your Dream Home goal nearly
                three months earlier.
              </p>

            </div>

           <button onClick={() => navigate("/goal-plan")}>
  Explore plan →
</button>

          </section>

        </div>

      </main>

    </section>
  );
}

export default Goals;