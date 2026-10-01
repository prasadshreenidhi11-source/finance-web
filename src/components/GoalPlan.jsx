import React, { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./GoalPlan.css";

function GoalPlan() {
  const navigate = useNavigate();

  const [extraContribution, setExtraContribution] = useState(350);

  const goal = {
    name: "Dream Home",
    type: "Major Purchase",
    icon: "⌂",
    saved: 48620,
    target: 80000,
    monthly: 2400,
    targetDate: "Jun 2027",
  };

  const remaining = goal.target - goal.saved;

  const newMonthlyContribution = goal.monthly + extraContribution;

  const progress = Math.round((goal.saved / goal.target) * 100);

  const monthsWithCurrentPlan = Math.ceil(
    remaining / goal.monthly
  );

  const monthsWithNewPlan = Math.ceil(
    remaining / newMonthlyContribution
  );

  const monthsSaved = Math.max(
    0,
    monthsWithCurrentPlan - monthsWithNewPlan
  );

  const projectedTotal = useMemo(
    () => goal.saved + newMonthlyContribution * monthsWithNewPlan,
    [newMonthlyContribution, monthsWithNewPlan, goal.saved]
  );

  const formatMoney = (value) =>
    new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      maximumFractionDigits: 0,
    }).format(value);

  return (
    <section className="goal-plan-page">

      {/* SIDEBAR */}
      <aside className="goal-plan-sidebar">

        <div className="goal-plan-brand">
          <div className="goal-plan-logo">
            <span />
            <span />
          </div>

          <div>
            <strong>Orion</strong>
            <small>Financial Intelligence</small>
          </div>
        </div>

        <nav className="goal-plan-nav">

          <button onClick={() => navigate("/")}>
            <span>⌂</span>
            Home
          </button>

          <button onClick={() => navigate("/portfolio")}>
            <span>⌁</span>
            Portfolio
          </button>

          <button onClick={() => navigate("/accounts")}>
            <span>▦</span>
            Accounts
          </button>

          <button onClick={() => navigate("/insights")}>
            <span>✦</span>
            Insights
          </button>

          <button
            className="active"
            onClick={() => navigate("/goals")}
          >
            <span>◎</span>
            Goals
          </button>

          <button onClick={() => navigate("/reports")}>
            <span>▤</span>
            Reports
          </button>

          <button onClick={() => navigate("/settings")}>
            <span>⚙</span>
            Settings
          </button>

        </nav>

        <div className="goal-plan-ai-status">
          <div className="goal-plan-ai-symbol">✦</div>

          <div>
            <strong>AI Assistant</strong>
            <span>Planning your future</span>
          </div>

          <i />
        </div>

      </aside>

      {/* MAIN */}
      <main className="goal-plan-main">

        {/* TOPBAR */}
        <header className="goal-plan-topbar">

          <div className="goal-plan-search">
            <span>⌕</span>
            <input
              type="text"
              placeholder="Search your financial plan..."
            />
          </div>

          <div className="goal-plan-user-area">

            <button className="goal-plan-bell">
              ♧
              <i />
            </button>

            <div className="goal-plan-user">

              <div className="goal-plan-avatar">D</div>

              <div>
                <strong>Daniel Carter</strong>
                <span>Personal · 9 accounts</span>
              </div>

              <b>⌄</b>

            </div>

          </div>

        </header>

        {/* CONTENT */}
        <div className="goal-plan-content">

          <button
            className="goal-plan-back"
            onClick={() => navigate("/goals")}
          >
            ← Back to Goals
          </button>

          {/* HEADING */}
          <section className="goal-plan-heading">

            <div>

              <span>AI GOAL PLANNER</span>

              <h1>Dream Home Plan</h1>

              <p>
                A smarter monthly contribution plan designed to
                help you reach your Dream Home goal sooner.
              </p>

            </div>

            <div className="goal-plan-status">
              <span>ON TRACK</span>
              <strong>{progress}%</strong>
            </div>

          </section>

          {/* HERO */}
          <section className="goal-plan-hero">

            <div className="goal-plan-hero-left">

              <div className="goal-plan-icon">
                {goal.icon}
              </div>

              <div>
                <span>{goal.type}</span>
                <h2>{formatMoney(goal.target)}</h2>
                <p>Target amount</p>
              </div>

            </div>

            <div className="goal-plan-progress">

              <div className="goal-plan-progress-top">
                <span>Current progress</span>
                <strong>{progress}%</strong>
              </div>

              <div className="goal-plan-progress-bar">
                <span style={{ width: `${progress}%` }} />
              </div>

              <div className="goal-plan-progress-bottom">
                <span>{formatMoney(goal.saved)} saved</span>
                <span>{formatMoney(remaining)} remaining</span>
              </div>

            </div>

          </section>

          {/* FINANCIAL SNAPSHOT */}
          <section className="goal-plan-grid">

            <div className="goal-plan-card">

              <span>CURRENT SAVINGS</span>

              <strong>
                {formatMoney(goal.saved)}
              </strong>

              <small>
                Already saved toward your goal
              </small>

            </div>

            <div className="goal-plan-card">

              <span>CURRENT MONTHLY</span>

              <strong>
                {formatMoney(goal.monthly)}
              </strong>

              <small>
                Your existing monthly contribution
              </small>

            </div>

            <div className="goal-plan-card">

              <span>REMAINING</span>

              <strong>
                {formatMoney(remaining)}
              </strong>

              <small>
                Amount left to reach your target
              </small>

            </div>

            <div className="goal-plan-card">

              <span>TARGET DATE</span>

              <strong>{goal.targetDate}</strong>

              <small>
                Current projected timeline
              </small>

            </div>

          </section>

          {/* PLAN */}
          <section className="goal-plan-section">

            <div className="goal-plan-section-heading">

              <div>
                <span>OPTIMIZED CONTRIBUTION</span>
                <h2>Build your plan</h2>
              </div>

              <div className="goal-plan-ai-badge">
                ✦ AI Optimized
              </div>

            </div>

            <div className="goal-plan-builder">

              <div className="goal-plan-builder-info">

                <span>EXTRA THIS MONTH</span>

                <h3>
                  +{formatMoney(extraContribution)}
                </h3>

                <p>
                  Increase your monthly contribution to
                  accelerate your Dream Home goal.
                </p>

                <input
                  className="goal-plan-range"
                  type="range"
                  min="0"
                  max="1500"
                  step="50"
                  value={extraContribution}
                  onChange={(event) =>
                    setExtraContribution(
                      Number(event.target.value)
                    )
                  }
                />

                <div className="goal-plan-range-labels">
                  <span>$0</span>
                  <span>$1,500</span>
                </div>

              </div>

              <div className="goal-plan-result">

                <span>NEW MONTHLY CONTRIBUTION</span>

                <strong>
                  {formatMoney(newMonthlyContribution)}
                </strong>

                <div className="goal-plan-result-row">

                  <div>
                    <small>Current</small>
                    <b>{formatMoney(goal.monthly)}</b>
                  </div>

                  <div className="goal-plan-arrow">
                    →
                  </div>

                  <div>
                    <small>New plan</small>
                    <b>
                      {formatMoney(newMonthlyContribution)}
                    </b>
                  </div>

                </div>

              </div>

            </div>

          </section>

          {/* IMPACT */}
          <section className="goal-plan-impact">

            <div className="goal-plan-impact-heading">

              <span>PLAN IMPACT</span>

              <h2>
                Your contribution could move the timeline.
              </h2>

            </div>

            <div className="goal-plan-impact-grid">

              <div>

                <span>CURRENT PLAN</span>

                <strong>
                  {monthsWithCurrentPlan} months
                </strong>

                <small>
                  Based on {formatMoney(goal.monthly)} monthly
                </small>

              </div>

              <div className="goal-plan-impact-highlight">

                <span>OPTIMIZED PLAN</span>

                <strong>
                  {monthsWithNewPlan} months
                </strong>

                <small>
                  {monthsSaved > 0
                    ? `${monthsSaved} month${
                        monthsSaved === 1 ? "" : "s"
                      } faster`
                    : "Same timeline"}
                </small>

              </div>

              <div>

                <span>PROJECTED TOTAL</span>

                <strong>
                  {formatMoney(projectedTotal)}
                </strong>

                <small>
                  At the end of the optimized plan
                </small>

              </div>

            </div>

          </section>

          {/* AI RECOMMENDATION */}
          <section className="goal-plan-recommendation">

            <div className="goal-plan-recommendation-icon">
              ✦
            </div>

            <div>

              <span>ORION AI RECOMMENDATION</span>

              <h2>
                {extraContribution > 0
                  ? `Adding ${formatMoney(
                      extraContribution
                    )} per month strengthens your plan.`
                  : "Your current contribution keeps the plan moving."}
              </h2>

              <p>
                You currently have {formatMoney(goal.saved)} saved.
                With a monthly contribution of{" "}
                {formatMoney(newMonthlyContribution)}, you can
                continue building toward your {formatMoney(goal.target)}{" "}
                Dream Home target.
              </p>

            </div>

          </section>

          {/* FOOTER ACTIONS */}
          <div className="goal-plan-actions">

            <button
              className="goal-plan-secondary"
              onClick={() => navigate("/goals")}
            >
              ← Back to Goals
            </button>

            <button
              className="goal-plan-primary"
              onClick={() => navigate("/goals")}
            >
              Save this plan
            </button>

          </div>

        </div>

      </main>

    </section>
  );
}

export default GoalPlan;