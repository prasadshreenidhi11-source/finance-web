import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Finance.css";

const activities = [
  {
    icon: "🛒",
    title: "Whole Foods Market",
    sub: "Groceries · Yesterday",
    amount: "-$184.32",
    type: "expense",
  },
  {
    icon: "💼",
    title: "Lattice Labs LLC",
    sub: "Advisory income · Sep 20",
    amount: "+$6,200.00",
    type: "income",
  },
  {
    icon: "🏠",
    title: "Carbone",
    sub: "Restaurants · Sep 20",
    amount: "-$143.60",
    type: "expense",
  },
  {
    icon: "✈️",
    title: "Airbnb",
    sub: "Travel · Sep 18",
    amount: "-$420.00",
    type: "expense",
  },
  {
    icon: "☁️",
    title: "Adobe Creative Cloud",
    sub: "Subscriptions · Sep 17",
    amount: "-$74.99",
    type: "expense",
  },
];

const goals = [
  {
    name: "Emergency fund",
    amount: "$18,240 of $30,000",
    date: "Sep 2027",
    progress: 61,
  },
  {
    name: "New home",
    amount: "$84,200 of $150,000",
    date: "Dec 2028",
    progress: 56,
  },
  {
    name: "Europe trip",
    amount: "$4,820 of $8,000",
    date: "Apr 2027",
    progress: 60,
  },
  {
    name: "Retirement",
    amount: "$412,000 of $1,000,000",
    date: "Age 60",
    progress: 41,
  },
];

const cashFlowData = [
  {
    month: "Apr",
    height: 48,
    moneyIn: "$24,820",
    moneyOut: "$15,420",
    net: "+$9,400",
  },
  {
    month: "May",
    height: 62,
    moneyIn: "$27,640",
    moneyOut: "$16,980",
    net: "+$10,660",
  },
  {
    month: "Jun",
    height: 54,
    moneyIn: "$25,920",
    moneyOut: "$17,240",
    net: "+$8,680",
  },
  {
    month: "Jul",
    height: 74,
    moneyIn: "$29,840",
    moneyOut: "$17,920",
    net: "+$11,920",
  },
  {
    month: "Aug",
    height: 68,
    moneyIn: "$27,980",
    moneyOut: "$17,160",
    net: "+$10,820",
  },
  {
    month: "Sep",
    height: 92,
    moneyIn: "$28,420",
    moneyOut: "$16,240",
    net: "+$12,180",
  },
  {
    month: "Oct",
    height: 82,
    moneyIn: "$31,200",
    moneyOut: "$18,100",
    net: "+$13,100",
    projected: true,
  },
];

const netWorthPoints = [
  {
    month: "Oct",
    x: 0,
    y: 170,
    value: "$742,180",
  },
  {
    month: "Nov",
    x: 64,
    y: 151,
    value: "$756,420",
  },
  {
    month: "Dec",
    x: 127,
    y: 145,
    value: "$768,940",
  },
  {
    month: "Jan",
    x: 191,
    y: 158,
    value: "$759,620",
  },
  {
    month: "Feb",
    x: 255,
    y: 138,
    value: "$775,840",
  },
  {
    month: "Mar",
    x: 318,
    y: 122,
    value: "$788,420",
  },
  {
    month: "Apr",
    x: 382,
    y: 113,
    value: "$796,840",
  },
  {
    month: "May",
    x: 445,
    y: 103,
    value: "$804,620",
  },
  {
    month: "Jun",
    x: 509,
    y: 94,
    value: "$812,410",
  },
  {
    month: "Jul",
    x: 573,
    y: 76,
    value: "$821,840",
  },
  {
    month: "Aug",
    x: 636,
    y: 52,
    value: "$832,420",
  },
  {
    month: "Sep",
    x: 700,
    y: 20,
    value: "$842,620",
  },
];

function Finance() {
  const navigate = useNavigate();
  const [activeNetWorth, setActiveNetWorth] = useState(null);

  return (
    <section className="finance-section page-transition">
      <div className="finance-glow finance-glow-one"></div>
      <div className="finance-glow finance-glow-two"></div>

      <div className="finance-stage">

        {/* Floating left card */}
        <div className="finance-floating-card portfolio-float">
          <span className="float-label">
            Portfolio growth
          </span>

          <strong>↑ 11.7%</strong>

          <div className="mini-bars">
            <i style={{ height: "28%" }}></i>
            <i style={{ height: "42%" }}></i>
            <i style={{ height: "56%" }}></i>
            <i style={{ height: "72%" }}></i>
            <i style={{ height: "94%" }}></i>
          </div>

          <small>1Y performance →</small>
        </div>

        {/* Main dashboard */}
        <div className="finance-dashboard">

          {/* Sidebar */}
          <aside className="finance-sidebar">

            <div className="finance-logo">
              <span className="logo-symbol">◢</span>
              <span>Orion</span>
            </div>

            <nav className="finance-nav">

  <div
    className="finance-nav-item active"
    onClick={() => navigate("/home")}
  >
    <span>⌂</span>
    <label>Home</label>
  </div>

  <div
    className="finance-nav-item"
    onClick={() => navigate("/portfolio")}
  >
    <span>⌁</span>
    <label>Portfolio</label>
  </div>

  <div
    className="finance-nav-item"
    onClick={() => navigate("/accounts")}
  >
    <span>▣</span>
    <label>Accounts</label>
  </div>

  <div
    className="finance-nav-item"
    onClick={() => navigate("/insights")}
  >
    <span>✦</span>
    <label>Insights</label>
  </div>

  <div
    className="finance-nav-item"
    onClick={() => navigate("/goals")}
  >
    <span>◎</span>
    <label>Goals</label>
  </div>

  <div
    className="finance-nav-item"
    onClick={() => navigate("/reports")}
  >
    <span>▤</span>
    <label>Reports</label>
  </div>

  <div
    className="finance-nav-item"
    onClick={() => navigate("/settings")}
  >
    <span>⚙</span>
    <label>Settings</label>
  </div>

</nav>

            <div className="finance-ai-status">
              <span className="status-dot"></span>

              <div>
                <strong>AI Assistant</strong>
                <small>Online</small>
              </div>
            </div>

          </aside>

          {/* Dashboard content */}
          <main className="finance-content">

            {/* Top bar */}
            <header className="finance-topbar">

              <div className="finance-search">
                <span>⌕</span>
                <span>Search anything...</span>
              </div>

              <div className="finance-top-actions">

                <button className="notification-button">
                  ♧
                  <i></i>
                </button>

                <div className="finance-profile">

                  <div className="profile-avatar">
                    D
                  </div>

                  <div className="profile-info">
                    <strong>Daniel Carter</strong>
                    <small>
                      Personal · 9 accounts
                    </small>
                  </div>

                  <span>⌄</span>

                </div>

              </div>

            </header>

            {/* Main grid */}
            <div className="finance-grid">

              {/* =====================================================
                  NET WORTH
              ===================================================== */}
              <article className="finance-card networth-card">

                <div className="card-heading">

                  <div>

                    <span className="card-kicker">
                      ↗ &nbsp; Net worth
                    </span>

                    <div className="networth-value">

                      $842,620

                      <span className="growth-pill">
                        ↑ $65,295 · 8.4%
                      </span>

                      <small>
                        past 12 months
                      </small>

                    </div>

                  </div>

                  <div className="chart-tabs">
                    <span>1M</span>
                    <span>3M</span>
                    <span>YTD</span>
                    <span className="selected">1Y</span>
                    <span>All</span>
                  </div>

                </div>

                {/* Net worth chart */}
                <div
                  className="finance-chart"
                  onMouseLeave={() =>
                    setActiveNetWorth(null)
                  }
                >

                  <div className="chart-lines">
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                  </div>

                  <svg
                    className="chart-svg"
                    viewBox="0 0 700 220"
                    preserveAspectRatio="none"
                  >

                    <defs>

                      <linearGradient
                        id="financeChartGradient"
                        x1="0"
                        y1="0"
                        x2="0"
                        y2="1"
                      >

                        <stop
                          offset="0%"
                          stopColor="#3155ff"
                          stopOpacity="0.18"
                        />

                        <stop
                          offset="100%"
                          stopColor="#3155ff"
                          stopOpacity="0"
                        />

                      </linearGradient>

                    </defs>

                    {/* Chart area */}
                    <path
                      className="chart-area"
                      d="
                        M 0 170
                        C 55 155, 90 140, 135 150
                        C 180 160, 190 135, 235 140
                        C 285 145, 310 120, 355 118
                        C 405 114, 425 105, 465 102
                        C 510 100, 525 78, 565 72
                        C 610 65, 640 45, 700 20
                        L 700 220
                        L 0 220
                        Z
                      "
                    />

                    {/* Chart line */}
                    <path
                      className="chart-line"
                      d="
                        M 0 170
                        C 55 155, 90 140, 135 150
                        C 180 160, 190 135, 235 140
                        C 285 145, 310 120, 355 118
                        C 405 114, 425 105, 465 102
                        C 510 100, 525 78, 565 72
                        C 610 65, 640 45, 700 20
                      "
                    />

                    {/* Hover zones */}
                    {netWorthPoints.map((point, index) => (
                      <rect
                        key={point.month}
                        className="chart-hover-zone"
                        x={
                          index === 0
                            ? 0
                            : point.x - 32
                        }
                        y="0"
                        width="64"
                        height="220"
                        fill="transparent"
                        onMouseEnter={() =>
                          setActiveNetWorth(index)
                        }
                      />
                    ))}

                    {/* Hover indicator */}
                    {activeNetWorth !== null && (
                      <>
                        <line
                          className="chart-hover-line"
                          x1={
                            netWorthPoints[
                              activeNetWorth
                            ].x
                          }
                          x2={
                            netWorthPoints[
                              activeNetWorth
                            ].x
                          }
                          y1="0"
                          y2="220"
                        />

                        <circle
                          className="chart-active-ring"
                          cx={
                            netWorthPoints[
                              activeNetWorth
                            ].x
                          }
                          cy={
                            netWorthPoints[
                              activeNetWorth
                            ].y
                          }
                          r="9"
                        />

                        <circle
                          className="chart-active-dot"
                          cx={
                            netWorthPoints[
                              activeNetWorth
                            ].x
                          }
                          cy={
                            netWorthPoints[
                              activeNetWorth
                            ].y
                          }
                          r="5"
                        />
                      </>
                    )}

                    {/* Default current point */}
                    {activeNetWorth === null && (
                      <circle
                        className="chart-point"
                        cx="700"
                        cy="20"
                        r="5"
                      />
                    )}

                  </svg>

                  {/* Tooltip */}
                  {activeNetWorth !== null && (
                    <div
                      className="networth-tooltip"
                      style={{
                        left: `${
                          (netWorthPoints[
                            activeNetWorth
                          ].x /
                            700) *
                          100
                        }%`,

                        top: `${
                          (netWorthPoints[
                            activeNetWorth
                          ].y /
                            220) *
                          100
                        }%`,
                      }}
                    >

                      <span>
                        {
                          netWorthPoints[
                            activeNetWorth
                          ].month
                        }{" "}
                        2026
                      </span>

                      <strong>
                        {
                          netWorthPoints[
                            activeNetWorth
                          ].value
                        }
                      </strong>

                    </div>
                  )}

                  {/* Chart labels */}
                  <div className="chart-labels">

                    {netWorthPoints.map((point) => (
                      <span key={point.month}>
                        {point.month}
                      </span>
                    ))}

                  </div>

                </div>

                {/* Net worth stats */}
                <div className="networth-stats">

                  <div>

                    <span className="stat-icon">
                      ▣
                    </span>

                    <div>
                      <small>Cash</small>

                      <strong>
                        $86,420{" "}
                        <em>↑ 4.2%</em>
                      </strong>
                    </div>

                  </div>

                  <div>

                    <span className="stat-icon">
                      ⌁
                    </span>

                    <div>
                      <small>
                        Investments
                      </small>

                      <strong>
                        $624,820{" "}
                        <em>↑ 11.7%</em>
                      </strong>
                    </div>

                  </div>

                  <div>

                    <span className="stat-icon">
                      ◫
                    </span>

                    <div>
                      <small>
                        Spent in September
                      </small>

                      <strong>
                        $8,420{" "}
                        <em className="down">
                          ↓ 6.2%
                        </em>
                      </strong>
                    </div>

                  </div>

                </div>

              </article>

              {/* =====================================================
                  AI INSIGHT
              ===================================================== */}
              <article className="finance-card insight-card">

                <div className="insight-top">

                  <span>
                    <i></i>
                    AI Insight
                  </span>

                  <small>
                    7:02 AM
                  </small>

                </div>

                <h2>
                  Your net worth rose
                  <br />
                  $12,480 this month.
                </h2>

                <div className="drivers">

                  <small>
                    Biggest drivers
                  </small>

                  <div>
                    <span>
                      ⌁ Investment portfolio
                    </span>

                    <strong>
                      +$8,240
                    </strong>
                  </div>

                  <div>
                    <span>
                      ▣ Advisory income
                    </span>

                    <strong>
                      +$6,200
                    </strong>
                  </div>

                  <div>
                    <span>
                      ⌄ Lower discretionary spending
                    </span>

                    <strong>
                      +$1,960
                    </strong>
                  </div>

                </div>

                <div className="suggestion">

                  <small>
                    ✦ &nbsp; Suggested next step
                  </small>

                  <strong>
                    Move $4,000 to high-yield savings
                  </strong>

                  <p>
                    Earns about $156 more a year at
                    3.90% APY. Checking keeps a 1.6
                    month buffer.
                  </p>

                  <div>

                    <button>
                      Review transfer
                    </button>

                    <span>
                      Why this? →
                    </span>

                  </div>

                </div>

              </article>

              {/* =====================================================
                  CASH FLOW
              ===================================================== */}
              <article className="finance-card cashflow-card">

                <div className="small-card-heading">

                  <strong>
                    Cash flow
                  </strong>

                  <button>
                    ↗
                  </button>

                </div>

                <div className="cashflow-value">

                  +$12,180

                  <small>
                    ↑ 12.4% vs Aug
                  </small>

                </div>

                <div className="cashflow-bars">

                  {cashFlowData.map((item) => (
                    <div
                      className="cash-bar-wrap"
                      key={item.month}
                      style={{
                        "--bar-height": `${item.height}%`,
                      }}
                    >

                      <div className="cash-tooltip">

                        <strong>
                          {item.month}
                        </strong>

                        <span>
                          {item.projected
                            ? "Projected in"
                            : "Money in"}

                          <b>
                            {item.moneyIn}
                          </b>
                        </span>

                        <span>
                          {item.projected
                            ? "Projected out"
                            : "Money out"}

                          <b>
                            {item.moneyOut}
                          </b>
                        </span>

                        <em>
                          {item.projected
                            ? "Projected "
                            : "Net "}
                          {item.net}
                        </em>

                      </div>

                      <div
                        className={`cash-bar ${
                          item.projected
                            ? "projected"
                            : ""
                        }`}
                      ></div>

                      <span>
                        {item.month}
                      </span>

                    </div>
                  ))}

                </div>

                <div className="cash-legend">

                  <div>
                    <span className="legend-dot blue"></span>
                    Money in
                    <strong>
                      $28,420
                    </strong>
                  </div>

                  <div>
                    <span className="legend-dot gray"></span>
                    Money out
                    <strong>
                      $16,240
                    </strong>
                  </div>

                </div>

              </article>

              {/* =====================================================
                  RECENT ACTIVITY
              ===================================================== */}
              <article className="finance-card activity-card">

                <div className="small-card-heading">

                  <strong>
                    Recent activity
                  </strong>

                  <button>
                    ↗
                  </button>

                </div>

                <div className="activity-list">

                  {activities.map(
                    (activity, index) => (
                      <div
                        className="activity-item"
                        key={activity.title}
                        style={{
                          "--activity-delay": `${
                            index * 0.12
                          }s`,
                        }}
                      >

                        <span
                          className={`activity-icon ${activity.type}`}
                        >
                          {activity.icon}
                        </span>

                        <div>

                          <strong>
                            {activity.title}
                          </strong>

                          <small>
                            {activity.sub}
                          </small>

                        </div>

                        <b
                          className={
                            activity.type
                          }
                        >
                          {activity.amount}
                        </b>

                      </div>
                    )
                  )}

                </div>

              </article>

              {/* =====================================================
                  GOALS
              ===================================================== */}
              <article className="finance-card goals-card">

                <div className="small-card-heading">

                  <div>

                    <strong>
                      Goals
                    </strong>

                    <span>
                      3 of 4 on track
                    </span>

                  </div>

                  <button>
                    ↗
                  </button>

                </div>

                <div className="goals-list">

                  {goals.map(
                    (goal, index) => (
                      <div
                        className="goal-item"
                        key={goal.name}
                        style={{
                          "--goal-delay": `${
                            index * 0.15
                          }s`,
                        }}
                      >

                        <div className="goal-info">

                          <div>

                            <strong>
                              {goal.name}
                            </strong>

                            <b>
                              {goal.progress}%
                            </b>

                          </div>

                          <small>
                            {goal.amount} ·{" "}
                            {goal.date}
                          </small>

                        </div>

                        <div className="goal-track">

                          <span
                            style={{
                              "--goal-width": `${goal.progress}%`,
                            }}
                          ></span>

                        </div>

                      </div>
                    )
                  )}

                </div>

              </article>

            </div>

          </main>

        </div>

        {/* Bottom floating AI badge */}
        <div className="finance-floating-card ai-float">

          <span className="ai-pulse"></span>

          <div>

            <strong>
              AI Assistant
            </strong>

            <small>
              Online
            </small>

          </div>

        </div>

      </div>
    </section>
  );
}

export default Finance;