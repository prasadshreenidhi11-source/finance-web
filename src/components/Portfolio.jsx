import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Portfolio.css";

const holdings = [
  {
    icon: "●",
    name: "Apple",
    symbol: "AAPL",
    type: "Stock",
    invested: "$28,000",
    current: "$33,240",
    return: "+18.75%",
    positive: true,
    color: "apple",
  },
  {
    icon: "N",
    name: "NVIDIA",
    symbol: "NVDA",
    type: "Stock",
    invested: "$25,000",
    current: "$30,550",
    return: "+22.31%",
    positive: true,
    color: "nvidia",
  },
  {
    icon: "H",
    name: "HDFC Flexi Cap",
    symbol: "HDFCFLEXI",
    type: "Mutual Fund",
    invested: "$45,000",
    current: "$50,670",
    return: "+12.26%",
    positive: true,
    color: "hdfc",
  },
  {
    icon: "₿",
    name: "Bitcoin",
    symbol: "BTC",
    type: "Crypto",
    invested: "$20,000",
    current: "$22,450",
    return: "+10.13%",
    positive: true,
    color: "bitcoin",
  },
  {
    icon: "T",
    name: "Tesla",
    symbol: "TSLA",
    type: "Stock",
    invested: "$18,000",
    current: "$17,060",
    return: "-4.88%",
    positive: false,
    color: "tesla",
  },
];

const transactions = [
  {
    icon: "N",
    type: "BUY",
    name: "NVIDIA",
    amount: "$25,000",
    date: "Today",
    color: "nvidia",
  },
  {
    icon: "H",
    type: "BUY",
    name: "HDFC Flexi Cap",
    amount: "$15,000",
    date: "Yesterday",
    color: "hdfc",
  },
  {
    icon: "●",
    type: "SELL",
    name: "Apple",
    amount: "$8,000",
    date: "Sep 22",
    color: "apple",
  },
  {
    icon: "₿",
    type: "BUY",
    name: "Bitcoin",
    amount: "$10,000",
    date: "Sep 20",
    color: "bitcoin",
  },
];

function Portfolio() {
  const navigate = useNavigate();
  const [period, setPeriod] = useState("1Y");

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
    <section className="portfolio-page page-transition">

      {/* SIDEBAR */}
      <aside className="portfolio-sidebar">

        <div className="portfolio-brand">
          <div className="portfolio-logo">
            <span />
            <span />
          </div>

          <div>
            <strong>Orion</strong>
            <small>Financial Intelligence</small>
          </div>
        </div>

        <nav className="portfolio-nav">
          {navItems.map(([icon, label, path]) => (
            <button
              key={label}
              className={`portfolio-nav-item ${
                label === "Portfolio" ? "active" : ""
              }`}
              onClick={() => navigate(path)}
            >
              <span className="portfolio-nav-icon">{icon}</span>
              <span>{label}</span>
            </button>
          ))}
        </nav>

        <div className="portfolio-ai-card">
          <div className="portfolio-ai-icon">✦</div>

          <div>
            <strong>AI Assistant</strong>
            <span>Online</span>
          </div>

          <i />
        </div>

      </aside>

      {/* MAIN AREA */}
      <main className="portfolio-main">

        {/* TOP BAR */}
        <header className="portfolio-topbar">

          <div className="portfolio-search">
            <span>⌕</span>
            <input
              type="text"
              placeholder="Search investments, stocks, funds, or anything..."
            />
          </div>

          <div className="portfolio-user-area">

            <button className="portfolio-notification">
              ♧
              <i />
            </button>

            <div className="portfolio-user">
              <div className="portfolio-avatar">D</div>

              <div>
                <strong>Daniel Carter</strong>
                <span>Personal · 9 accounts</span>
              </div>

              <b>⌄</b>
            </div>

          </div>

        </header>

        {/* CONTENT */}
        <div className="portfolio-content">

          {/* HEADER */}
          <div className="portfolio-heading">

            <div>
              <span>INVESTMENTS</span>

              <h1>Portfolio</h1>

              <p>
                Track your investments and portfolio performance.
              </p>
            </div>

            <button className="add-investment">
              <b>+</b>
              Add Investment
            </button>

          </div>

          {/* SUMMARY CARDS */}
          <section className="portfolio-summary">

            <div className="portfolio-stat primary">

              <div className="stat-top">
                <span className="stat-icon">↗</span>
                <span>Total Portfolio</span>
              </div>

              <strong>$186,420</strong>

              <div className="stat-growth">
                <b>↗ +8.42%</b>
                <span>overall</span>
              </div>

              <div className="mini-stat-chart">
                <svg viewBox="0 0 300 70">
                  <path
                    d="M0 58 C40 60 55 38 85 45 C120 53 140 20 170 33 C200 45 215 12 245 20 C265 25 280 9 300 5"
                  />
                </svg>
              </div>

            </div>

            <div className="portfolio-stat">

              <div className="stat-top">
                <span className="stat-icon green">◉</span>
                <span>Today's Return</span>
              </div>

              <strong>+$8,240</strong>

              <div className="stat-growth green-text">
                <b>↗ +0.66%</b>
              </div>

            </div>

            <div className="portfolio-stat">

              <div className="stat-top">
                <span className="stat-icon purple">◈</span>
                <span>Invested</span>
              </div>

              <strong>$165,230</strong>

              <div className="stat-growth">
                <span>88.6% of portfolio</span>
              </div>

            </div>

            <div className="portfolio-stat">

              <div className="stat-top">
                <span className="stat-icon pink">▣</span>
                <span>Available Cash</span>
              </div>

              <strong>$21,190</strong>

              <div className="stat-growth">
                <span>11.4% available</span>
              </div>

            </div>

          </section>

          {/* MAIN CHART + ALLOCATION */}
          <section className="portfolio-chart-grid">

            {/* PERFORMANCE */}
            <div className="portfolio-panel performance-panel">

              <div className="panel-header">

                <div>
                  <span>PORTFOLIO PERFORMANCE</span>
                  <h2>$186,420</h2>

                  <div className="performance-growth">
                    <b>↗ +8.42%</b>
                    <span>vs last month</span>
                  </div>
                </div>

                <div className="periods">
                  {["1D", "1W", "1M", "3M", "1Y", "ALL"].map(
                    (item) => (
                      <button
                        key={item}
                        className={period === item ? "selected" : ""}
                        onClick={() => setPeriod(item)}
                      >
                        {item}
                      </button>
                    )
                  )}
                </div>

              </div>

              <div className="portfolio-chart">

                <div className="chart-values">
                  <span>$220K</span>
                  <span>$180K</span>
                  <span>$140K</span>
                  <span>$100K</span>
                </div>

                <div className="chart-area-wrapper">

                  <div className="chart-lines">
                    <span />
                    <span />
                    <span />
                    <span />
                  </div>

                  <svg
                    viewBox="0 0 800 280"
                    preserveAspectRatio="none"
                  >
                    <defs>
                      <linearGradient
                        id="portfolioGradient"
                        x1="0"
                        y1="0"
                        x2="0"
                        y2="1"
                      >
                        <stop
                          offset="0%"
                          stopColor="#7668ff"
                          stopOpacity="0.20"
                        />

                        <stop
                          offset="100%"
                          stopColor="#7668ff"
                          stopOpacity="0"
                        />
                      </linearGradient>
                    </defs>

                    <path
                      className="portfolio-area"
                      d="M0 235 C60 215 90 185 145 192 C200 199 225 160 275 170 C330 180 345 125 405 137 C460 150 475 93 530 105 C590 120 610 65 660 75 C715 86 740 48 800 22 L800 280 L0 280 Z"
                    />

                    <path
                      className="portfolio-line"
                      d="M0 235 C60 215 90 185 145 192 C200 199 225 160 275 170 C330 180 345 125 405 137 C460 150 475 93 530 105 C590 120 610 65 660 75 C715 86 740 48 800 22"
                    />

                    <circle
                      className="portfolio-dot"
                      cx="800"
                      cy="22"
                      r="7"
                    />
                  </svg>

                  <div className="chart-tooltip">
                    <strong>$186,420</strong>
                    <span>Sep 30</span>
                  </div>

                </div>

                <div className="chart-months">
                  <span>Apr</span>
                  <span>May</span>
                  <span>Jun</span>
                  <span>Jul</span>
                  <span>Aug</span>
                  <span>Sep</span>
                </div>

              </div>

            </div>

            {/* ALLOCATION */}
            <div className="portfolio-panel allocation-panel">

              <div className="panel-header">
                <div>
                  <span>ASSET ALLOCATION</span>
                  <h2>Asset Mix</h2>
                </div>
              </div>

              <div className="allocation-body">

                <div className="allocation-donut">

                  <div>
                    <strong>$186,420</strong>
                    <span>Total</span>
                  </div>

                </div>

                <div className="allocation-list">

                  <div>
                    <i className="stocks" />
                    <span>Stocks</span>
                    <b>52%</b>
                  </div>

                  <div>
                    <i className="funds" />
                    <span>Mutual Funds</span>
                    <b>24%</b>
                  </div>

                  <div>
                    <i className="crypto" />
                    <span>Crypto</span>
                    <b>8%</b>
                  </div>

                  <div>
                    <i className="bonds" />
                    <span>Bonds</span>
                    <b>10%</b>
                  </div>

                  <div>
                    <i className="cash" />
                    <span>Cash</span>
                    <b>6%</b>
                  </div>

                </div>

              </div>

            </div>

          </section>

          {/* HOLDINGS */}
          <section className="portfolio-panel holdings-panel">

            <div className="section-header">

              <div>
                <span>YOUR INVESTMENTS</span>
                <h2>Your Holdings</h2>
              </div>

              <button>View all →</button>

            </div>

            <div className="holdings-table">

              <div className="holdings-head">
                <span>Asset</span>
                <span>Type</span>
                <span>Invested</span>
                <span>Current</span>
                <span>Return</span>
                <span />
              </div>

              {holdings.map((item) => (
                <div
                  className="holding-row"
                  key={item.symbol}
                >

                  <div className="holding-asset">

                    <div
                      className={`holding-icon ${item.color}`}
                    >
                      {item.icon}
                    </div>

                    <div>
                      <strong>{item.name}</strong>
                      <span>{item.symbol}</span>
                    </div>

                  </div>

                  <span>{item.type}</span>

                  <span>{item.invested}</span>

                  <span>{item.current}</span>

                  <strong
                    className={
                      item.positive
                        ? "positive"
                        : "negative"
                    }
                  >
                    {item.positive ? "↗ " : "↘ "}
                    {item.return}
                  </strong>

                  <b className="row-arrow">›</b>

                </div>
              ))}

            </div>

          </section>

        </div>

        {/* RIGHT COLUMN */}
        <aside className="portfolio-right">

          {/* WEALTH CARD */}
          <div className="wealth-card">

            <span>BUILD YOUR WEALTH</span>

            <h2>
              Smart investing
              <br />
              for a brighter future
            </h2>

            <p>
              Diversify. Grow. Achieve.
            </p>

            <div className="wealth-bars">
              <i />
              <i />
              <i />
              <i />
            </div>

            <div className="wealth-arrow">↗</div>

          </div>

          {/* MOVERS */}
          <div className="right-panel movers-panel">

            <div className="right-title">
              <h2>Top Movers</h2>
              <button>View all →</button>
            </div>

            <div className="mover">

              <div className="mover-icon nvidia">N</div>

              <div>
                <strong>NVIDIA</strong>
                <span>NVDA · Stock</span>
              </div>

              <b className="positive">+22.31%</b>

            </div>

            <div className="mover">

              <div className="mover-icon apple">●</div>

              <div>
                <strong>Apple</strong>
                <span>AAPL · Stock</span>
              </div>

              <b className="positive">+18.75%</b>

            </div>

            <div className="mover-section-label">
              Top Losers
            </div>

            <div className="mover">

              <div className="mover-icon tesla">T</div>

              <div>
                <strong>Tesla</strong>
                <span>TSLA · Stock</span>
              </div>

              <b className="negative">-4.88%</b>

            </div>

          </div>

          {/* TRANSACTIONS */}
          <div className="right-panel portfolio-transactions">

            <div className="right-title">
              <h2>Recent Transactions</h2>
              <button>View all →</button>
            </div>

            {transactions.map((item, index) => (
              <div
                className="portfolio-transaction"
                key={`${item.name}-${index}`}
              >

                <div
                  className={`transaction-icon ${item.color}`}
                >
                  {item.icon}
                </div>

                <div className="transaction-middle">

                  <div>
                    <span
                      className={`transaction-type ${
                        item.type === "BUY"
                          ? "buy"
                          : "sell"
                      }`}
                    >
                      {item.type}
                    </span>

                    <strong>{item.name}</strong>
                  </div>

                  <small>{item.date}</small>

                </div>

                <b>{item.amount}</b>

              </div>
            ))}

          </div>

          {/* AI CARD */}
          <div className="portfolio-ai-bottom">

            <div className="bottom-ai-icon">✦</div>

            <strong>AI Assistant</strong>

            <span>
              Your financial companion
              <br />
              is always here.
            </span>

            <button>→</button>

          </div>

        </aside>

      </main>

    </section>
  );
}

export default Portfolio;