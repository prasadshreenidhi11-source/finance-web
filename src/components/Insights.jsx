import React, { useCallback, useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Insights.css";

function Insights() {
  const navigate = useNavigate();

  const [period, setPeriod] = useState("6M");
  const [refreshKey, setRefreshKey] = useState(0);

  const [accounts, setAccounts] = useState([]);
  const [transactions, setTransactions] = useState([]);
  const [goals, setGoals] = useState([]);
  const [portfolio, setPortfolio] = useState([]);

  const navItems = [
    ["⌂", "Home", "/home"],
    ["⌁", "Portfolio", "/portfolio"],
    ["▦", "Accounts", "/accounts"],
    ["✦", "Insights", "/insights"],
    ["◎", "Goals", "/goals"],
    ["▤", "Reports", "/reports"],
    ["⚙", "Settings", "/settings"],
  ];

  /* =========================================================
     LOAD SAVED FINANCIAL DATA
  ========================================================= */

  const loadFinancialData = useCallback(() => {
    try {
      const savedAccounts = JSON.parse(
        localStorage.getItem("orion_accounts") || "[]"
      );

      const savedTransactions = JSON.parse(
        localStorage.getItem("orion_transactions") || "[]"
      );

      const savedGoals = JSON.parse(
        localStorage.getItem("orion_goals") || "[]"
      );

      const savedPortfolio = JSON.parse(
        localStorage.getItem("orion_portfolio") || "[]"
      );

      setAccounts(Array.isArray(savedAccounts) ? savedAccounts : []);
      setTransactions(
        Array.isArray(savedTransactions) ? savedTransactions : []
      );
      setGoals(Array.isArray(savedGoals) ? savedGoals : []);
      setPortfolio(
        Array.isArray(savedPortfolio) ? savedPortfolio : []
      );
    } catch (error) {
      console.error("Unable to load Finora financial data:", error);

      setAccounts([]);
      setTransactions([]);
      setGoals([]);
      setPortfolio([]);
    }
  }, []);

  useEffect(() => {
    loadFinancialData();
  }, [loadFinancialData, refreshKey]);

  /* =========================================================
     HELPERS
  ========================================================= */

  const formatCurrency = (value) => {
    const number = Number(value) || 0;

    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      maximumFractionDigits: 0,
    }).format(number);
  };

  const getTransactionAmount = (transaction) => {
    const possibleValues = [
      transaction?.amount,
      transaction?.value,
      transaction?.total,
    ];

    for (const value of possibleValues) {
      const number = Number(
        String(value ?? "").replace(/[^0-9.-]/g, "")
      );

      if (!Number.isNaN(number) && number !== 0) {
        return Math.abs(number);
      }
    }

    return 0;
  };

  const getTransactionType = (transaction) => {
    const type = String(
      transaction?.type ||
        transaction?.categoryType ||
        transaction?.direction ||
        ""
    ).toLowerCase();

    if (
      type.includes("income") ||
      type.includes("credit") ||
      type.includes("deposit")
    ) {
      return "income";
    }

    if (
      type.includes("expense") ||
      type.includes("debit") ||
      type.includes("payment") ||
      type.includes("withdraw")
    ) {
      return "expense";
    }

    const amount = Number(
      String(transaction?.amount ?? "").replace(/[^0-9.-]/g, "")
    );

    return amount < 0 ? "expense" : "expense";
  };

  const getTransactionCategory = (transaction) => {
    return (
      transaction?.category ||
      transaction?.merchantCategory ||
      transaction?.type ||
      "Other"
    );
  };

  /* =========================================================
     TRANSACTION FALLBACK
     Keeps current page working until Accounts stores them.
  ========================================================= */

  const fallbackTransactions = [
    {
      id: "fallback-1",
      name: "Rent",
      category: "Housing",
      amount: 2240,
      type: "expense",
    },
    {
      id: "fallback-2",
      name: "Whole Foods",
      category: "Food & Dining",
      amount: 1180,
      type: "expense",
    },
    {
      id: "fallback-3",
      name: "Shopping",
      category: "Shopping",
      amount: 920,
      type: "expense",
    },
    {
      id: "fallback-4",
      name: "Salary",
      category: "Income",
      amount: 8800,
      type: "income",
    },
  ];

  const activeTransactions = useMemo(() => {
    return transactions.length > 0
      ? transactions
      : fallbackTransactions;
  }, [transactions]);

  /* =========================================================
     ACCOUNT CALCULATIONS
  ========================================================= */

  const totalNetWorth = useMemo(() => {
    if (!accounts.length) {
      return 284620;
    }

    return accounts.reduce((total, account) => {
      const amount = Number(account?.amount) || 0;
      return total + amount;
    }, 0);
  }, [accounts]);

  const totalAssets = useMemo(() => {
    if (!accounts.length) return 284620;

    return accounts.reduce((total, account) => {
      const amount = Number(account?.amount) || 0;

      if (amount > 0) {
        return total + amount;
      }

      return total;
    }, 0);
  }, [accounts]);

  /* =========================================================
     TRANSACTION CALCULATIONS
  ========================================================= */

  const totalIncome = useMemo(() => {
    return activeTransactions.reduce((total, transaction) => {
      if (getTransactionType(transaction) !== "income") {
        return total;
      }

      return total + getTransactionAmount(transaction);
    }, 0);
  }, [activeTransactions]);

  const totalSpending = useMemo(() => {
    const calculated = activeTransactions.reduce(
      (total, transaction) => {
        if (getTransactionType(transaction) !== "expense") {
          return total;
        }

        return total + getTransactionAmount(transaction);
      },
      0
    );

    return calculated || 8420;
  }, [activeTransactions]);

  const netCashFlow = useMemo(() => {
    if (!totalIncome && !totalSpending) {
      return 380;
    }

    return totalIncome - totalSpending;
  }, [totalIncome, totalSpending]);

  const savingsRate = useMemo(() => {
    if (totalIncome <= 0) {
      return 24.6;
    }

    const rate = (netCashFlow / totalIncome) * 100;

    return Math.max(0, Math.min(100, rate));
  }, [netCashFlow, totalIncome]);

  /* =========================================================
     SPENDING CATEGORIES
  ========================================================= */

  const spendingCategories = useMemo(() => {
    const categories = {};

    activeTransactions.forEach((transaction) => {
      if (getTransactionType(transaction) !== "expense") {
        return;
      }

      const category = getTransactionCategory(transaction);
      const amount = getTransactionAmount(transaction);

      categories[category] =
        (categories[category] || 0) + amount;
    });

    const result = Object.entries(categories)
      .map(([name, amount]) => ({
        name,
        amount,
      }))
      .sort((a, b) => b.amount - a.amount);

    if (!result.length) {
      return [
        { name: "Housing", amount: 2240 },
        { name: "Food & Dining", amount: 1180 },
        { name: "Shopping", amount: 920 },
      ];
    }

    return result.slice(0, 3);
  }, [activeTransactions]);

  /* =========================================================
     FINANCIAL HEALTH
  ========================================================= */

  const healthScore = useMemo(() => {
    let score = 72;

    if (totalNetWorth > 100000) score += 5;
    if (totalNetWorth > 250000) score += 5;

    if (savingsRate >= 20) score += 6;
    if (savingsRate >= 30) score += 4;

    if (netCashFlow > 0) score += 4;

    if (accounts.length >= 3) score += 2;

    return Math.min(100, Math.max(0, Math.round(score)));
  }, [
    totalNetWorth,
    savingsRate,
    netCashFlow,
    accounts.length,
  ]);

  const healthLabel = useMemo(() => {
    if (healthScore >= 85) return "Excellent";
    if (healthScore >= 70) return "Strong";
    if (healthScore >= 55) return "Good";
    return "Needs attention";
  }, [healthScore]);

  /* =========================================================
     DYNAMIC INSIGHTS
  ========================================================= */

  const opportunityAmount = useMemo(() => {
    if (netCashFlow <= 0) return 0;

    return Math.min(
      420,
      Math.max(100, Math.round(netCashFlow * 0.1))
    );
  }, [netCashFlow]);

  const largestCategory = spendingCategories[0];

  const spendingInsight = useMemo(() => {
    if (!largestCategory) {
      return "Your spending data will appear here as transactions are added.";
    }

    return `${largestCategory.name} is currently your largest spending category at ${formatCurrency(
      largestCategory.amount
    )}.`;
  }, [largestCategory]);

  const goalInsight = useMemo(() => {
    if (!goals.length) {
      return "Connect your savings goals to receive personalized goal insights.";
    }

    const goal = goals[0];

    const target =
      Number(goal?.target) ||
      Number(goal?.targetAmount) ||
      Number(goal?.amount) ||
      0;

    const current =
      Number(goal?.saved) ||
      Number(goal?.current) ||
      Number(goal?.currentAmount) ||
      0;

    if (target > 0) {
      const percentage = Math.min(
        100,
        Math.round((current / target) * 100)
      );

      return `Your ${goal?.name || "savings goal"} is ${percentage}% funded.`;
    }

    return "Your savings goals are connected and ready for analysis.";
  }, [goals]);

  /* =========================================================
     PORTFOLIO VALUE
  ========================================================= */

  const portfolioValue = useMemo(() => {
    if (!portfolio.length) {
      return accounts
        .filter(
          (account) =>
            account?.type === "investment" ||
            account?.type === "retirement"
        )
        .reduce(
          (total, account) =>
            total + (Number(account?.amount) || 0),
          0
        );
    }

    return portfolio.reduce((total, item) => {
      return (
        total +
        (Number(item?.value) ||
          Number(item?.amount) ||
          Number(item?.balance) ||
          0)
      );
    }, 0);
  }, [portfolio, accounts]);

  /* =========================================================
     ACTIONS
  ========================================================= */

  const refreshInsights = () => {
    loadFinancialData();
    setRefreshKey((value) => value + 1);
  };

  const spendingChange = useMemo(() => {
    if (!transactions.length) return "8.4%";

    return netCashFlow >= 0 ? "8.4%" : "4.2%";
  }, [transactions.length, netCashFlow]);

  const currentNetWorth = totalNetWorth || 284620;

  return (
    <section className="insights-page page-transition">

      {/* ================= SIDEBAR ================= */}

      <aside className="insights-sidebar">

        <div className="insights-brand">
          <div className="insights-logo">
            <span />
            <span />
          </div>

          <div>
            <strong>Orion</strong>
            <small>Financial Intelligence</small>
          </div>
        </div>

        <nav className="insights-nav">
          {navItems.map(([icon, label, path]) => (
            <button
              key={label}
              className={`insights-nav-item ${
                label === "Insights" ? "active" : ""
              }`}
              onClick={() => navigate(path)}
            >
              <span className="insights-nav-icon">
                {icon}
              </span>

              <span>{label}</span>
            </button>
          ))}
        </nav>

        <div className="insights-ai-status">
          <div className="insights-ai-symbol">✦</div>

          <div>
            <strong>AI Assistant</strong>
            <span>Analyzing your finances</span>
          </div>

          <i />
        </div>

      </aside>

      {/* ================= MAIN ================= */}

      <main className="insights-main">

        {/* TOP BAR */}

        <header className="insights-topbar">

          <div className="insights-search">
            <span>⌕</span>

            <input
              type="text"
              placeholder="Search insights, spending, trends..."
            />
          </div>

          <div className="insights-user-area">

            <button className="insights-bell">
              ♧
              <i />
            </button>

            <div className="insights-user">

              <div className="insights-avatar">
                D
              </div>

              <div>
                <strong>Daniel Carter</strong>
                <span>
                  Personal · {accounts.length || 9} accounts
                </span>
              </div>

              <b>⌄</b>

            </div>

          </div>

        </header>

        {/* ================= CONTENT ================= */}

        <div className="insights-content">

          {/* PAGE HEADER */}

          <section className="insights-heading">

            <div>
              <span>FINANCIAL INTELLIGENCE</span>

              <h1>Insights</h1>

              <p>
                Understand your money better with intelligent
                financial insights.
              </p>
            </div>

            <button
              className="refresh-insights"
              onClick={refreshInsights}
            >
              <span>↻</span>
              Refresh insights
            </button>

          </section>

          {/* ================= AI HERO ================= */}

          <section className="insight-hero">

            <div className="hero-glow" />

            <div className="hero-content">

              <div className="hero-ai-icon">
                ✦
              </div>

              <span className="hero-label">
                AI FINANCIAL BRIEFING
              </span>

              <h2>
                Your finances are
                <br />
                <em>
                  {healthScore >= 70
                    ? "moving in the right direction."
                    : "ready for improvement."}
                </em>
              </h2>

              <p>
                You currently have{" "}
                {formatCurrency(currentNetWorth)} in net
                financial value. Your current savings rate is{" "}
                {savingsRate.toFixed(1)}%, with{" "}
                {formatCurrency(netCashFlow)} in estimated net
                cash flow from the available transaction data.
              </p>

              <div className="hero-meta">

                <div>
                  <strong>
                    {netCashFlow >= 0 ? "+" : "-"}
                    {Math.abs(savingsRate).toFixed(1)}%
                  </strong>

                  <span>Estimated savings rate</span>
                </div>

                <div>
                  <strong>
                    {savingsRate.toFixed(1)}%
                  </strong>

                  <span>Cash flow efficiency</span>
                </div>

                <div>
                  <strong>
                    {healthScore}/100
                  </strong>

                  <span>Financial health</span>
                </div>

              </div>

            </div>

            <div className="hero-orbit">

              <div className="orbit-ring ring-one" />
              <div className="orbit-ring ring-two" />
              <div className="orbit-ring ring-three" />

              <div className="orbit-center">
                <span>✦</span>
                <strong>{healthScore}</strong>
                <small>Health</small>
              </div>

              <div className="orbit-dot dot-one" />
              <div className="orbit-dot dot-two" />
              <div className="orbit-dot dot-three" />

            </div>

          </section>

          {/* ================= TOP GRID ================= */}

          <section className="insights-grid-top">

            {/* SPENDING */}

            <div className="insights-panel spending-panel">

              <div className="panel-title">

                <div>
                  <span>SPENDING INTELLIGENCE</span>
                  <h2>Where your money goes</h2>
                </div>

                <button>
                  Details →
                </button>

              </div>

              <div className="spending-total">
                <strong>
                  {formatCurrency(totalSpending)}
                </strong>

                <span>
                  <b>↓ {spendingChange}</b>
                  vs last month
                </span>
              </div>

              <div className="spending-chart">

                <div className="spending-bars">

                  <div>
                    <i style={{ height: "44%" }} />
                    <span>Apr</span>
                  </div>

                  <div>
                    <i style={{ height: "57%" }} />
                    <span>May</span>
                  </div>

                  <div>
                    <i style={{ height: "52%" }} />
                    <span>Jun</span>
                  </div>

                  <div>
                    <i style={{ height: "68%" }} />
                    <span>Jul</span>
                  </div>

                  <div>
                    <i style={{ height: "74%" }} />
                    <span>Aug</span>
                  </div>

                  <div className="current">
                    <i style={{ height: "54%" }} />
                    <span>Sep</span>
                  </div>

                </div>

              </div>

              <div className="spending-categories">

                {spendingCategories.map(
                  (category, index) => (
                    <div key={category.name}>
                      <i
                        className={
                          index === 0
                            ? "category-purple"
                            : index === 1
                            ? "category-blue"
                            : "category-pink"
                        }
                      />

                      <span>{category.name}</span>

                      <strong>
                        {formatCurrency(category.amount)}
                      </strong>
                    </div>
                  )
                )}

              </div>

            </div>

            {/* HEALTH SCORE */}

            <div className="insights-panel health-panel">

              <div className="panel-title">

                <div>
                  <span>FINANCIAL HEALTH</span>
                  <h2>Your score</h2>
                </div>

                <button>
                  Improve →
                </button>

              </div>

              <div className="health-score-wrap">

                <div className="health-score">

                  <svg viewBox="0 0 220 220">

                    <circle
                      className="score-bg"
                      cx="110"
                      cy="110"
                      r="88"
                    />

                    <circle
                      className="score-progress"
                      cx="110"
                      cy="110"
                      r="88"
                      style={{
                        strokeDashoffset:
                          553 -
                          (553 * healthScore) / 100,
                      }}
                    />

                  </svg>

                  <div className="score-number">
                    <strong>{healthScore}</strong>
                    <span>/100</span>
                  </div>

                </div>

                <div className="health-status">
                  <strong>{healthLabel}</strong>
                  <span>
                    Based on your current financial data
                  </span>
                </div>

              </div>

              <div className="health-metrics">

                <div>
                  <span>Savings</span>
                  <strong>
                    {Math.min(
                      100,
                      Math.round(savingsRate * 2.5)
                    )}
                  </strong>
                </div>

                <div>
                  <span>Debt</span>
                  <strong>
                    {accounts.some(
                      (account) =>
                        account?.type === "credit"
                    )
                      ? 81
                      : 92}
                  </strong>
                </div>

                <div>
                  <span>Investing</span>
                  <strong>
                    {portfolioValue > 0 ? 86 : 72}
                  </strong>
                </div>

                <div>
                  <span>Cash Flow</span>
                  <strong>
                    {netCashFlow > 0 ? 88 : 58}
                  </strong>
                </div>

              </div>

            </div>

          </section>

          {/* ================= TREND SECTION ================= */}

          <section className="insights-panel trend-panel">

            <div className="panel-title">

              <div>
                <span>NET WORTH TREND</span>
                <h2>Your financial trajectory</h2>
              </div>

              <div className="trend-periods">

                {["1M", "3M", "6M", "1Y"].map(
                  (item) => (
                    <button
                      key={item}
                      className={
                        period === item
                          ? "selected"
                          : ""
                      }
                      onClick={() =>
                        setPeriod(item)
                      }
                    >
                      {item}
                    </button>
                  )
                )}

              </div>

            </div>

            <div className="trend-summary">

              <div>
                <strong>
                  {formatCurrency(currentNetWorth)}
                </strong>

                <span>Current net worth</span>
              </div>

              <div>
                <b>
                  ↗ +
                  {(
                    savingsRate > 0
                      ? savingsRate
                      : 12.8
                  ).toFixed(1)}
                  %
                </b>

                <span>
                  Growth this year
                </span>
              </div>

              <div>
                <b>
                  {formatCurrency(
                    Math.max(0, netCashFlow)
                  )}
                </b>

                <span>
                  Growth in value
                </span>
              </div>

            </div>

            <div className="trend-chart">

              <div className="trend-y-axis">
                <span>$300K</span>
                <span>$250K</span>
                <span>$200K</span>
                <span>$150K</span>
              </div>

              <div className="trend-chart-area">

                <div className="trend-grid">
                  <span />
                  <span />
                  <span />
                  <span />
                </div>

                <svg
                  viewBox="0 0 900 270"
                  preserveAspectRatio="none"
                >

                  <defs>

                    <linearGradient
                      id="trendGradient"
                      x1="0"
                      y1="0"
                      x2="0"
                      y2="1"
                    >

                      <stop
                        offset="0%"
                        stopColor="#6f61f3"
                        stopOpacity="0.20"
                      />

                      <stop
                        offset="100%"
                        stopColor="#6f61f3"
                        stopOpacity="0"
                      />

                    </linearGradient>

                  </defs>

                  <path
                    className="trend-area-fill"
                    d="M0 220 C70 212 85 198 145 202 C205 206 225 172 285 180 C345 188 370 145 420 151 C480 158 505 124 560 132 C620 141 645 93 700 101 C760 109 790 58 900 32 L900 270 L0 270 Z"
                  />

                  <path
                    className="trend-line"
                    d="M0 220 C70 212 85 198 145 202 C205 206 225 172 285 180 C345 188 370 145 420 151 C480 158 505 124 560 132 C620 141 645 93 700 101 C760 109 790 58 900 32"
                  />

                  <circle
                    cx="900"
                    cy="32"
                    r="7"
                    className="trend-dot"
                  />

                </svg>

                <div className="trend-tooltip">
                  <strong>
                    {formatCurrency(currentNetWorth)}
                  </strong>

                  <span>
                    Sep 2026
                  </span>
                </div>

              </div>

              <div className="trend-months">
                <span>Apr</span>
                <span>May</span>
                <span>Jun</span>
                <span>Jul</span>
                <span>Aug</span>
                <span>Sep</span>
              </div>

            </div>

          </section>

          {/* ================= SMART INSIGHTS ================= */}

          <section className="smart-section">

            <div className="smart-heading">

              <div>
                <span>
                  PERSONALIZED INTELLIGENCE
                </span>

                <h2>
                  Smart insights for you
                </h2>
              </div>

              <button>
                View all insights →
              </button>

            </div>

            <div className="smart-grid">

              <article className="smart-card purple-card">

                <div className="smart-icon">
                  ✦
                </div>

                <span>
                  OPPORTUNITY
                </span>

                <h3>
                  You could invest
                  <br />
                  an extra{" "}
                  {formatCurrency(
                    opportunityAmount
                  )}{" "}
                  this month.
                </h3>

                <p>
                  Your current cash flow leaves
                  room for a larger investment
                  without affecting your usual
                  spending.
                </p>

                <button>
                  Explore opportunity →
                </button>

              </article>

              <article className="smart-card blue-card">

                <div className="smart-icon">
                  ↘
                </div>

                <span>
                  SPENDING ALERT
                </span>

                <h3>
                  {largestCategory?.name ||
                    "Spending"}{" "}
                  is your largest
                  <br />
                  expense category.
                </h3>

                <p>
                  {spendingInsight}
                </p>

                <button>
                  See spending →
                </button>

              </article>

              <article className="smart-card green-card">

                <div className="smart-icon">
                  ◈
                </div>

                <span>
                  LONG-TERM
                </span>

                <h3>
                  You're building
                  <br />
                  toward your goals.
                </h3>

                <p>
                  {goalInsight}
                </p>

                <button>
                  View goals →
                </button>

              </article>

            </div>

          </section>

          {/* ================= BOTTOM ================= */}

          <section className="insights-bottom-grid">

            {/* WATCHLIST */}

            <div className="insights-panel watchlist-panel">

              <div className="panel-title">

                <div>
                  <span>MARKET WATCH</span>
                  <h2>What you're watching</h2>
                </div>

                <button>
                  Manage →
                </button>

              </div>

              <div className="watch-row">

                <div className="watch-symbol apple">
                  A
                </div>

                <div>
                  <strong>Apple</strong>
                  <span>AAPL</span>
                </div>

                <b>$255.82</b>

                <strong className="positive">
                  +1.42%
                </strong>

              </div>

              <div className="watch-row">

                <div className="watch-symbol nvidia">
                  N
                </div>

                <div>
                  <strong>NVIDIA</strong>
                  <span>NVDA</span>
                </div>

                <b>$184.31</b>

                <strong className="positive">
                  +2.81%
                </strong>

              </div>

              <div className="watch-row">

                <div className="watch-symbol tesla">
                  T
                </div>

                <div>
                  <strong>Tesla</strong>
                  <span>TSLA</span>
                </div>

                <b>$342.18</b>

                <strong className="negative">
                  -0.74%
                </strong>

              </div>

            </div>

            {/* UPCOMING */}

            <div className="insights-panel upcoming-panel">

              <div className="panel-title">

                <div>
                  <span>UPCOMING</span>
                  <h2>Financial events</h2>
                </div>

                <button>
                  Calendar →
                </button>

              </div>

              <div className="upcoming-item">

                <div className="date-box">
                  <strong>01</strong>
                  <span>OCT</span>
                </div>

                <div>
                  <strong>Rent payment</strong>
                  <span>
                    Housing · $2,240
                  </span>
                </div>

                <b>
                  -$2,240
                </b>

              </div>

              <div className="upcoming-item">

                <div className="date-box">
                  <strong>05</strong>
                  <span>OCT</span>
                </div>

                <div>
                  <strong>
                    Investment contribution
                  </strong>

                  <span>
                    Portfolio · $1,500
                  </span>
                </div>

                <b>
                  -$1,500
                </b>

              </div>

              <div className="upcoming-item">

                <div className="date-box">
                  <strong>15</strong>
                  <span>OCT</span>
                </div>

                <div>
                  <strong>
                    Salary deposit
                  </strong>

                  <span>
                    Income · Expected
                  </span>
                </div>

                <b className="positive">
                  +$8,800
                </b>

              </div>

            </div>

          </section>

        </div>

      </main>

    </section>
  );
}

export default Insights;