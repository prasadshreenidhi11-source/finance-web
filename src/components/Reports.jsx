import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Reports.css";

function Reports() {
  const navigate = useNavigate();
  const [period, setPeriod] = useState("6M");

  const navItems = [
    ["⌂", "Home", "/home"],
    ["⌁", "Portfolio", "/portfolio"],
    ["▦", "Accounts", "/accounts"],
    ["✦", "Insights", "/insights"],
    ["◎", "Goals", "/goals"],
    ["▤", "Reports", "/reports"],
    ["⚙", "Settings", "/settings"],
  ];

  const months = ["Apr", "May", "Jun", "Jul", "Aug", "Sep"];

  const reports = [
    {
      icon: "↗",
      name: "Monthly Financial Summary",
      type: "Financial Overview",
      date: "Sep 2026",
      size: "2.4 MB",
    },
    {
      icon: "▤",
      name: "Spending Analysis",
      type: "Expense Report",
      date: "Sep 2026",
      size: "1.8 MB",
    },
    {
      icon: "⌁",
      name: "Investment Performance",
      type: "Portfolio Report",
      date: "Q3 2026",
      size: "3.1 MB",
    },
    {
      icon: "◎",
      name: "Cash Flow Statement",
      type: "Cash Flow",
      date: "Sep 2026",
      size: "1.2 MB",
    },
  ];

  return (
    <section className="reports-page page-transition">

      {/* SIDEBAR */}

      <aside className="reports-sidebar">

        <div className="reports-brand">

          <div className="reports-logo">
            <span />
            <span />
          </div>

          <div>
            <strong>Orion</strong>
            <small>Financial Intelligence</small>
          </div>

        </div>

        <nav className="reports-nav">

          {navItems.map(([icon, label, path]) => (
            <button
              key={label}
              className={`reports-nav-item ${
                label === "Reports" ? "active" : ""
              }`}
              onClick={() => navigate(path)}
            >
              <span className="reports-nav-icon">{icon}</span>
              <span>{label}</span>
            </button>
          ))}

        </nav>

        <div className="reports-ai-status">

          <div className="reports-ai-symbol">✦</div>

          <div>
            <strong>AI Assistant</strong>
            <span>Generating your reports</span>
          </div>

          <i />

        </div>

      </aside>

      {/* MAIN */}

      <main className="reports-main">

        {/* TOPBAR */}

        <header className="reports-topbar">

          <div className="reports-search">
            <span>⌕</span>

            <input
              type="text"
              placeholder="Search reports, transactions, categories..."
            />
          </div>

          <div className="reports-user-area">

            <button className="reports-bell">
              ♧
              <i />
            </button>

            <div className="reports-user">

              <div className="reports-avatar">D</div>

              <div>
                <strong>Daniel Carter</strong>
                <span>Personal · 9 accounts</span>
              </div>

              <b>⌄</b>

            </div>

          </div>

        </header>

        {/* CONTENT */}

        <div className="reports-content">

          {/* HEADING */}

          <section className="reports-heading">

            <div>
              <span>FINANCIAL ANALYTICS</span>

              <h1>Reports</h1>

              <p>
                A clear picture of where your money comes from,
                where it goes, and how it grows.
              </p>
            </div>

            <div className="reports-actions">

              <button className="secondary-report-btn">
                <span>↗</span>
                Export
              </button>

              <button className="primary-report-btn">
                <span>＋</span>
                New report
              </button>

            </div>

          </section>

          {/* OVERVIEW */}

          <section className="reports-overview">

            <div className="overview-main">

              <div className="overview-heading">

                <div>
                  <span>FINANCIAL OVERVIEW</span>
                  <h2>Performance snapshot</h2>
                </div>

                <div className="period-switcher">

                  {["1M", "3M", "6M", "1Y"].map((item) => (
                    <button
                      key={item}
                      className={
                        period === item ? "selected" : ""
                      }
                      onClick={() => setPeriod(item)}
                    >
                      {item}
                    </button>
                  ))}

                </div>

              </div>

              <div className="overview-numbers">

                <div>
                  <span>NET INCOME</span>
                  <strong>$18,420</strong>
                  <b>↗ 12.4%</b>
                </div>

                <div>
                  <span>TOTAL EXPENSES</span>
                  <strong>$8,420</strong>
                  <b className="expense-change">↓ 8.4%</b>
                </div>

                <div>
                  <span>SAVINGS RATE</span>
                  <strong>24.6%</strong>
                  <b>↗ 3.2%</b>
                </div>

              </div>

              {/* CHART */}

              <div className="reports-chart">

                <div className="reports-y-axis">
                  <span>$30K</span>
                  <span>$20K</span>
                  <span>$10K</span>
                  <span>$0</span>
                </div>

                <div className="reports-chart-area">

                  <div className="chart-grid-lines">
                    <span />
                    <span />
                    <span />
                    <span />
                  </div>

                  <svg
                    viewBox="0 0 900 260"
                    preserveAspectRatio="none"
                  >

                    <defs>

                      <linearGradient
                        id="incomeFill"
                        x1="0"
                        y1="0"
                        x2="0"
                        y2="1"
                      >
                        <stop
                          offset="0%"
                          stopColor="#6c5ff0"
                          stopOpacity="0.18"
                        />

                        <stop
                          offset="100%"
                          stopColor="#6c5ff0"
                          stopOpacity="0"
                        />
                      </linearGradient>

                    </defs>

                    <path
                      className="income-area"
                      d="M0 190 C70 180 105 150 160 160 C220 170 245 125 310 138 C370 150 395 100 455 112 C520 125 550 80 610 92 C675 105 700 62 760 72 C815 80 850 48 900 34 L900 260 L0 260 Z"
                    />

                    <path
                      className="income-line"
                      d="M0 190 C70 180 105 150 160 160 C220 170 245 125 310 138 C370 150 395 100 455 112 C520 125 550 80 610 92 C675 105 700 62 760 72 C815 80 850 48 900 34"
                    />

                    <path
                      className="expense-line"
                      d="M0 215 C70 205 105 195 160 202 C220 210 245 185 310 193 C370 200 395 175 455 184 C520 192 550 160 610 172 C675 180 700 150 760 160 C815 168 850 145 900 138"
                    />

                    <circle
                      className="chart-end-dot"
                      cx="900"
                      cy="34"
                      r="7"
                    />

                  </svg>

                  <div className="chart-tooltip">
                    <strong>$18,420</strong>
                    <span>September 2026</span>
                  </div>

                </div>

                <div className="reports-months">

                  {months.map((month) => (
                    <span key={month}>{month}</span>
                  ))}

                </div>

              </div>

              <div className="chart-legend">

                <span>
                  <i className="income-dot" />
                  Income
                </span>

                <span>
                  <i className="expense-dot" />
                  Expenses
                </span>

              </div>

            </div>

            {/* SIDE SUMMARY */}

            <div className="overview-side">

              <div className="side-report-card savings-card">

                <div className="side-card-heading">
                  <span>SAVINGS</span>
                  <b>+14.8%</b>
                </div>

                <strong>$28,620</strong>

                <span className="side-description">
                  Saved during the last 6 months
                </span>

                <div className="mini-progress">
                  <span />
                </div>

                <div className="mini-progress-label">
                  <span>Monthly average</span>
                  <strong>$4,770</strong>
                </div>

              </div>

              <div className="side-report-card spending-card">

                <div className="side-card-heading">
                  <span>EXPENSES</span>
                  <b>↓ 8.4%</b>
                </div>

                <strong>$8,420</strong>

                <span className="side-description">
                  Total spending this month
                </span>

                <div className="expense-categories">

                  <div>
                    <span>
                      <i className="purple-dot-small" />
                      Housing
                    </span>
                    <strong>27%</strong>
                  </div>

                  <div>
                    <span>
                      <i className="blue-dot-small" />
                      Food
                    </span>
                    <strong>14%</strong>
                  </div>

                  <div>
                    <span>
                      <i className="pink-dot-small" />
                      Shopping
                    </span>
                    <strong>11%</strong>
                  </div>

                </div>

              </div>

            </div>

          </section>

          {/* ANALYTICS GRID */}

          <section className="reports-analytics-grid">

            {/* BREAKDOWN */}

            <div className="reports-panel breakdown-panel">

              <div className="reports-panel-heading">

                <div>
                  <span>EXPENSE BREAKDOWN</span>
                  <h2>Where your money goes</h2>
                </div>

                <button>Details →</button>

              </div>

              <div className="breakdown-content">

                <div className="donut-wrapper">

                  <div className="donut-chart">

                    <div className="donut-center">
                      <strong>$8.4K</strong>
                      <span>Total</span>
                    </div>

                  </div>

                </div>

                <div className="breakdown-list">

                  <div>
                    <span>
                      <i className="break-purple" />
                      Housing
                    </span>
                    <strong>$2,240</strong>
                    <small>27%</small>
                  </div>

                  <div>
                    <span>
                      <i className="break-blue" />
                      Food & Dining
                    </span>
                    <strong>$1,180</strong>
                    <small>14%</small>
                  </div>

                  <div>
                    <span>
                      <i className="break-pink" />
                      Shopping
                    </span>
                    <strong>$920</strong>
                    <small>11%</small>
                  </div>

                  <div>
                    <span>
                      <i className="break-green" />
                      Transport
                    </span>
                    <strong>$740</strong>
                    <small>9%</small>
                  </div>

                </div>

              </div>

            </div>

            {/* MONTHLY PERFORMANCE */}

            <div className="reports-panel performance-panel">

              <div className="reports-panel-heading">

                <div>
                  <span>MONTHLY PERFORMANCE</span>
                  <h2>Income vs expenses</h2>
                </div>

                <button>2026 ▾</button>

              </div>

              <div className="performance-list">

                <div className="performance-row">

                  <div className="performance-month">
                    <strong>Sep</strong>
                    <span>2026</span>
                  </div>

                  <div className="performance-bars">
                    <i
                      className="income-bar"
                      style={{ width: "92%" }}
                    />
                    <i
                      className="expense-bar"
                      style={{ width: "42%" }}
                    />
                  </div>

                  <strong>$18.4K</strong>

                </div>

                <div className="performance-row">

                  <div className="performance-month">
                    <strong>Aug</strong>
                    <span>2026</span>
                  </div>

                  <div className="performance-bars">
                    <i
                      className="income-bar"
                      style={{ width: "82%" }}
                    />
                    <i
                      className="expense-bar"
                      style={{ width: "51%" }}
                    />
                  </div>

                  <strong>$16.8K</strong>

                </div>

                <div className="performance-row">

                  <div className="performance-month">
                    <strong>Jul</strong>
                    <span>2026</span>
                  </div>

                  <div className="performance-bars">
                    <i
                      className="income-bar"
                      style={{ width: "77%" }}
                    />
                    <i
                      className="expense-bar"
                      style={{ width: "56%" }}
                    />
                  </div>

                  <strong>$15.7K</strong>

                </div>

                <div className="performance-row">

                  <div className="performance-month">
                    <strong>Jun</strong>
                    <span>2026</span>
                  </div>

                  <div className="performance-bars">
                    <i
                      className="income-bar"
                      style={{ width: "71%" }}
                    />
                    <i
                      className="expense-bar"
                      style={{ width: "49%" }}
                    />
                  </div>

                  <strong>$14.9K</strong>

                </div>

              </div>

              <div className="performance-legend">

                <span>
                  <i className="income-dot" />
                  Income
                </span>

                <span>
                  <i className="expense-dot" />
                  Expenses
                </span>

              </div>

            </div>

          </section>

          {/* REPORT LIBRARY */}

          <section className="report-library">

            <div className="library-heading">

              <div>
                <span>REPORT LIBRARY</span>
                <h2>Your generated reports</h2>
              </div>

              <button>View all reports →</button>

            </div>

            <div className="report-list">

              {reports.map((report) => (

                <div className="report-row" key={report.name}>

                  <div className="report-file-icon">
                    {report.icon}
                  </div>

                  <div className="report-info">
                    <strong>{report.name}</strong>
                    <span>{report.type}</span>
                  </div>

                  <div className="report-date">
                    <span>PERIOD</span>
                    <strong>{report.date}</strong>
                  </div>

                  <div className="report-size">
                    <span>SIZE</span>
                    <strong>{report.size}</strong>
                  </div>

                  <button className="download-report">
                    ↓
                  </button>

                </div>

              ))}

            </div>

          </section>

          {/* AI REPORT CARD */}

          <section className="reports-ai-card">

            <div className="reports-ai-icon">
              ✦
            </div>

            <div className="reports-ai-content">

              <span>AI FINANCIAL SUMMARY</span>

              <h2>
                Your financial position continues to improve.
              </h2>

              <p>
                Income increased while discretionary spending
                decreased this month. Your current savings rate
                places you above your six-month average.
              </p>

            </div>

            <button>
              Generate full analysis →
            </button>

          </section>

        </div>

      </main>

    </section>
  );
}

export default Reports;