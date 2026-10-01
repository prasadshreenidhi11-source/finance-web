import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Accounts.css";

const initialAccounts = [
  {
    id: 1,
    name: "Checking",
    bank: "Chase Bank",
    amount: 24820,
    type: "checking",
    icon: "◒",
    label: "Everyday spending",
  },
  {
    id: 2,
    name: "Savings",
    bank: "Chase Bank",
    amount: 36400,
    type: "savings",
    icon: "◈",
    label: "Personal savings",
  },
  {
    id: 3,
    name: "Investment",
    bank: "Robinhood",
    amount: 92640,
    type: "investment",
    icon: "↗",
    label: "Investment portfolio",
  },
  {
    id: 4,
    name: "Credit Card",
    bank: "Chase Sapphire",
    amount: -2340,
    type: "credit",
    icon: "▣",
    label: "Current balance",
  },
  {
    id: 5,
    name: "Retirement",
    bank: "Fidelity",
    amount: 28900,
    type: "retirement",
    icon: "◉",
    label: "Long-term savings",
  },
  {
    id: 6,
    name: "Emergency Fund",
    bank: "Ally Bank",
    amount: 4820,
    type: "emergency",
    icon: "✦",
    label: "Emergency reserve",
  },
];

const transactions = [
  {
    id: 1,
    name: "Whole Foods Market",
    category: "Groceries",
    date: "Today",
    amount: -86.42,
    type: "expense",
  },
  {
    id: 2,
    name: "Netflix",
    category: "Entertainment",
    date: "Yesterday",
    amount: -15.49,
    type: "expense",
  },
  {
    id: 3,
    name: "Salary Deposit",
    category: "Income",
    date: "Sep 22",
    amount: 4200,
    type: "income",
  },
  {
    id: 4,
    name: "Uber",
    category: "Transportation",
    date: "Sep 21",
    amount: -28.75,
    type: "expense",
  },
  {
    id: 5,
    name: "Apple",
    category: "Shopping",
    date: "Sep 20",
    amount: -149.99,
    type: "expense",
  },
];

const spending = [
  {
    name: "Housing",
    amount: 1450,
    percentage: 42,
  },
  {
    name: "Food",
    amount: 620,
    percentage: 25,
  },
  {
    name: "Transport",
    amount: 310,
    percentage: 13,
  },
  {
    name: "Shopping",
    amount: 270,
    percentage: 11,
  },
  {
    name: "Other",
    amount: 220,
    percentage: 9,
  },
];

const navItems = [
  { label: "Home", icon: "⌂", path: "/home" },
  { label: "Portfolio", icon: "⌁", path: "/portfolio" },
  { label: "Accounts", icon: "▣", path: "/accounts" },
  { label: "Insights", icon: "✦", path: "/insights" },
  { label: "Goals", icon: "◎", path: "/goals" },
  { label: "Reports", icon: "▤", path: "/reports" },
  { label: "Settings", icon: "⚙", path: "/settings" },
];

function Accounts() {
  const navigate = useNavigate();

  const [accounts, setAccounts] = useState(() => {
    try {
      const savedAccounts = localStorage.getItem("orion_accounts");

      if (savedAccounts) {
        const parsed = JSON.parse(savedAccounts);

        if (Array.isArray(parsed)) {
          return parsed;
        }
      }
    } catch (error) {
      console.error("Failed to load accounts:", error);
    }

    return initialAccounts;
  });

  const [search, setSearch] = useState("");

  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const [selectedAccount, setSelectedAccount] = useState(null);

  const [formError, setFormError] = useState("");

  const [formData, setFormData] = useState({
    name: "",
    bank: "",
    type: "checking",
    balance: "",
  });

  useEffect(() => {
    try {
      localStorage.setItem("orion_accounts", JSON.stringify(accounts));
    } catch (error) {
      console.error("Failed to save accounts:", error);
    }
  }, [accounts]);

  const filteredAccounts = useMemo(() => {
    const query = search.trim().toLowerCase();

    if (!query) {
      return accounts;
    }

    return accounts.filter((account) =>
      `${account.name} ${account.bank} ${account.type} ${account.label}`
        .toLowerCase()
        .includes(query)
    );
  }, [accounts, search]);

  const totalBalance = useMemo(() => {
    return accounts.reduce(
      (total, account) => total + Number(account.amount || 0),
      0
    );
  }, [accounts]);

  const totalAssets = useMemo(() => {
    return accounts
      .filter((account) => Number(account.amount) >= 0)
      .reduce((total, account) => total + Number(account.amount || 0), 0);
  }, [accounts]);

  const totalLiabilities = useMemo(() => {
    return Math.abs(
      accounts
        .filter((account) => Number(account.amount) < 0)
        .reduce(
          (total, account) => total + Number(account.amount || 0),
          0
        )
    );
  }, [accounts]);

  const formatCurrency = (value) => {
    const number = Number(value) || 0;

    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      maximumFractionDigits: 2,
    }).format(number);
  };

  const formatCompactCurrency = (value) => {
    const number = Number(value) || 0;
    const absolute = Math.abs(number);

    if (absolute >= 1e15) {
      return `${number < 0 ? "-" : ""}$${(absolute / 1e15).toFixed(2)}Q`;
    }

    if (absolute >= 1e12) {
      return `${number < 0 ? "-" : ""}$${(absolute / 1e12).toFixed(2)}T`;
    }

    if (absolute >= 1e9) {
      return `${number < 0 ? "-" : ""}$${(absolute / 1e9).toFixed(2)}B`;
    }

    if (absolute >= 1e6) {
      return `${number < 0 ? "-" : ""}$${(absolute / 1e6).toFixed(2)}M`;
    }

    if (absolute >= 1e3) {
      return `${number < 0 ? "-" : ""}$${(absolute / 1e3).toFixed(1)}K`;
    }

    return formatCurrency(number);
  };

  const getAccountIcon = (type) => {
    const icons = {
      checking: "◒",
      savings: "◈",
      investment: "↗",
      credit: "▣",
      retirement: "◉",
      emergency: "✦",
      other: "○",
    };

    return icons[type] || "○";
  };

  const getAccountLabel = (type) => {
    const labels = {
      checking: "Everyday spending",
      savings: "Personal savings",
      investment: "Investment portfolio",
      credit: "Current balance",
      retirement: "Long-term savings",
      emergency: "Emergency reserve",
      other: "Financial account",
    };

    return labels[type] || "Financial account";
  };

  const resetForm = () => {
    setFormData({
      name: "",
      bank: "",
      type: "checking",
      balance: "",
    });

    setFormError("");
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));

    if (formError) {
      setFormError("");
    }
  };

  const openAddModal = () => {
    resetForm();
    setShowAddModal(true);
  };

  const closeAddModal = () => {
    setShowAddModal(false);
    setFormError("");
  };

  const handleAddAccount = (event) => {
    event.preventDefault();

    const accountName = formData.name.trim();
    const bankName = formData.bank.trim();
    const balanceValue = Number(formData.balance);

    if (!accountName || !bankName || formData.balance === "") {
      setFormError("Please fill in all account details.");
      return;
    }

    if (Number.isNaN(balanceValue)) {
      setFormError("Please enter a valid balance.");
      return;
    }

    const newAccount = {
      id: Date.now(),
      name: accountName,
      bank: bankName,
      amount: balanceValue,
      type: formData.type,
      icon: getAccountIcon(formData.type),
      label: getAccountLabel(formData.type),
    };

    setAccounts((previous) => [...previous, newAccount]);

    closeAddModal();
    resetForm();
  };

  const openEditModal = (account) => {
    setSelectedAccount(account);

    setFormData({
      name: account.name,
      bank: account.bank,
      type: account.type,
      balance: String(account.amount),
    });

    setFormError("");
    setShowEditModal(true);
  };

  const closeEditModal = () => {
    setShowEditModal(false);
    setSelectedAccount(null);
    setFormError("");
  };

  const handleEditAccount = (event) => {
    event.preventDefault();

    if (!selectedAccount) {
      return;
    }

    const accountName = formData.name.trim();
    const bankName = formData.bank.trim();
    const balanceValue = Number(formData.balance);

    if (!accountName || !bankName || formData.balance === "") {
      setFormError("Please fill in all account details.");
      return;
    }

    if (Number.isNaN(balanceValue)) {
      setFormError("Please enter a valid balance.");
      return;
    }

    setAccounts((previous) =>
      previous.map((account) =>
        account.id === selectedAccount.id
          ? {
              ...account,
              name: accountName,
              bank: bankName,
              type: formData.type,
              amount: balanceValue,
              icon: getAccountIcon(formData.type),
              label: getAccountLabel(formData.type),
            }
          : account
      )
    );

    closeEditModal();
  };

  const openDeleteModal = (account) => {
    setSelectedAccount(account);
    setShowDeleteModal(true);
  };

  const closeDeleteModal = () => {
    setShowDeleteModal(false);
    setSelectedAccount(null);
  };

  const handleDeleteAccount = () => {
    if (!selectedAccount) {
      return;
    }

    setAccounts((previous) =>
      previous.filter(
        (account) => account.id !== selectedAccount.id
      )
    );

    closeDeleteModal();
  };

  const handleLogout = () => {
    localStorage.removeItem("orion_authenticated");
    navigate("/login");
  };

  return (
    <div className="accounts-page page-transition">
      {/* ================= SIDEBAR ================= */}

      <aside className="accounts-sidebar">
        <div className="sidebar-brand">
          <div className="brand-mark">F</div>

          <div className="brand-text">
            <strong>FINORA</strong>
            <span>Financial Intelligence</span>
          </div>
        </div>

        <div className="sidebar-section-title">
          WORKSPACE
        </div>

        <nav className="sidebar-nav">
          {navItems.map((item) => {
            const active = item.path === "/accounts";

            return (
              <button
                key={item.label}
                type="button"
                className={`sidebar-nav-item ${
                  active ? "active" : ""
                }`}
                onClick={() => navigate(item.path)}
              >
                <span className="sidebar-nav-icon">
                  {item.icon}
                </span>

                <span>{item.label}</span>

                {active && (
                  <span className="sidebar-active-dot" />
                )}
              </button>
            );
          })}
        </nav>

        <div className="sidebar-bottom">
          <div className="sidebar-ai-card">
            <div className="sidebar-ai-icon">✦</div>

            <div>
              <strong>AI Finance</strong>
              <span>Ask Finora anything</span>
            </div>
          </div>

          <button
            type="button"
            className="sidebar-logout"
            onClick={handleLogout}
          >
            <span>↪</span>
            Sign out
          </button>
        </div>
      </aside>

      {/* ================= MAIN ================= */}

      <main className="accounts-main">
        {/* TOPBAR */}

        <header className="accounts-topbar">
          <div className="mobile-brand">
            <div className="brand-mark">F</div>
            <strong>FINORA</strong>
          </div>

          <div className="topbar-search">
            <span>⌕</span>

            <input
              type="text"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Search accounts..."
            />

            {search && (
              <button
                type="button"
                className="search-clear"
                onClick={() => setSearch("")}
              >
                ×
              </button>
            )}
          </div>

          <div className="topbar-right">
            <button
              type="button"
              className="notification-button"
              aria-label="Notifications"
            >
              ♢
              <span />
            </button>

            <div className="topbar-user">
              <div className="user-avatar">SP</div>

              <div className="user-info">
                <strong>Shreenidhi</strong>
                <span>Personal</span>
              </div>

              <span className="user-chevron">⌄</span>
            </div>
          </div>
        </header>

        {/* CONTENT */}

        <div className="accounts-content">
          <section className="accounts-heading">
            <div>
              <span className="eyebrow">FINANCIAL HUB</span>

              <h1>Your Accounts</h1>

              <p>
                Everything you own, owe, and manage in one place.
              </p>
            </div>

            <button
              type="button"
              className="add-account-button"
              onClick={openAddModal}
            >
              <span>+</span>
              Add Account
            </button>
          </section>

          {/* ================= OVERVIEW ================= */}

          <section className="overview-grid">
            <div className="total-balance-card">
              <div className="balance-glow" />

              <div className="balance-top">
                <div>
                  <span className="card-label">
                    TOTAL BALANCE
                  </span>

                  <h2 title={formatCurrency(totalBalance)}>
                    {formatCompactCurrency(totalBalance)}
                  </h2>
                </div>

                <div className="balance-icon">◈</div>
              </div>

              <div className="balance-bottom">
                <div className="balance-growth">
                  <span>↗</span>
                  8.4%
                </div>

                <span>vs. last month</span>
              </div>
            </div>

            <div className="overview-small-card">
              <div className="small-card-header">
                <span className="card-label">
                  TOTAL ASSETS
                </span>

                <div className="small-card-icon green">
                  ↑
                </div>
              </div>

              <strong title={formatCurrency(totalAssets)}>
                {formatCompactCurrency(totalAssets)}
              </strong>

              <span className="small-card-description">
                Across {accounts.length} accounts
              </span>
            </div>

            <div className="overview-small-card">
              <div className="small-card-header">
                <span className="card-label">
                  LIABILITIES
                </span>

                <div className="small-card-icon red">
                  ↓
                </div>
              </div>

              <strong title={formatCurrency(totalLiabilities)}>
                {formatCompactCurrency(totalLiabilities)}
              </strong>

              <span className="small-card-description">
                Credit & outstanding balances
              </span>
            </div>
          </section>

          {/* ================= MAIN GRID ================= */}

          <section className="accounts-layout">
            <div className="accounts-left">
              {/* ACCOUNT CARDS */}

              <div className="section-header">
                <div>
                  <span className="eyebrow">
                    CONNECTED ACCOUNTS
                  </span>

                  <h2>All accounts</h2>
                </div>

                <span className="account-count">
                  {filteredAccounts.length}{" "}
                  {filteredAccounts.length === 1
                    ? "account"
                    : "accounts"}
                </span>
              </div>

              <section className="account-grid">
                {filteredAccounts.length > 0 ? (
                  filteredAccounts.map((account) => (
                    <div
                      className={`account-card ${account.type}`}
                      key={account.id}
                    >
                      <div
                        className={`account-icon ${account.type}`}
                      >
                        {account.icon}
                      </div>

                      <div className="account-card-info">
                        <strong>{account.name}</strong>

                        <span>{account.bank}</span>

                        <b
                          title={formatCurrency(account.amount)}
                        >
                          {formatCompactCurrency(account.amount)}
                        </b>

                        <small>{account.label}</small>
                      </div>

                      <div className="account-actions">
                        <button
                          type="button"
                          className="account-edit-btn"
                          onClick={() =>
                            openEditModal(account)
                          }
                        >
                          Edit
                        </button>

                        <button
                          type="button"
                          className="account-delete-small-btn"
                          onClick={() =>
                            openDeleteModal(account)
                          }
                        >
                          Delete
                        </button>

                        <button
                          className="account-arrow"
                          type="button"
                          aria-label={`Open ${account.name}`}
                        >
                          →
                        </button>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="empty-accounts">
                    <div className="empty-icon">⌕</div>

                    <h3>No accounts found</h3>

                    <p>
                      Try a different search or add a new
                      financial account.
                    </p>

                    <button
                      type="button"
                      onClick={openAddModal}
                    >
                      Add Account
                    </button>
                  </div>
                )}
              </section>

              {/* LOWER CARDS */}

              <section className="lower-grid">
                {/* SPENDING */}

                <div className="dashboard-card spending-card">
                  <div className="dashboard-card-header">
                    <div>
                      <span className="eyebrow">
                        THIS MONTH
                      </span>

                      <h3>Spending</h3>
                    </div>

                    <button
                      type="button"
                      className="mini-action"
                    >
                      View
                    </button>
                  </div>

                  <div className="spending-total">
                    <strong>$2,870</strong>
                    <span>total spent</span>
                  </div>

                  <div className="spending-list">
                    {spending.map((item) => (
                      <div
                        className="spending-row"
                        key={item.name}
                      >
                        <div className="spending-row-top">
                          <span>{item.name}</span>

                          <strong>
                            {formatCurrency(item.amount)}
                          </strong>
                        </div>

                        <div className="spending-progress">
                          <span
                            style={{
                              width: `${item.percentage}%`,
                            }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* BALANCE TREND */}

                <div className="dashboard-card trend-card">
                  <div className="dashboard-card-header">
                    <div>
                      <span className="eyebrow">
                        LAST 6 MONTHS
                      </span>

                      <h3>Balance trend</h3>
                    </div>

                    <button
                      type="button"
                      className="trend-period"
                    >
                      6M⌄
                    </button>
                  </div>

                  <div className="trend-value">
                    <strong>
                      {formatCompactCurrency(totalBalance)}
                    </strong>

                    <span>↗ 14.8%</span>
                  </div>

                  <div className="fake-chart">
                    <div className="chart-grid-line line-one" />
                    <div className="chart-grid-line line-two" />
                    <div className="chart-grid-line line-three" />

                    <svg
                      className="trend-svg"
                      viewBox="0 0 500 180"
                      preserveAspectRatio="none"
                    >
                      <defs>
                        <linearGradient
                          id="trendFill"
                          x1="0"
                          y1="0"
                          x2="0"
                          y2="1"
                        >
                          <stop
                            offset="0%"
                            stopOpacity="0.18"
                          />
                          <stop
                            offset="100%"
                            stopOpacity="0"
                          />
                        </linearGradient>
                      </defs>

                      <path
                        className="trend-area"
                        d="M0 142 C55 135 75 145 110 118 C150 87 175 105 215 92 C250 80 260 98 295 72 C335 42 355 67 390 48 C425 30 445 47 500 18 L500 180 L0 180 Z"
                      />

                      <path
                        className="trend-line"
                        d="M0 142 C55 135 75 145 110 118 C150 87 175 105 215 92 C250 80 260 98 295 72 C335 42 355 67 390 48 C425 30 445 47 500 18"
                      />
                    </svg>

                    <div className="chart-labels">
                      <span>Apr</span>
                      <span>May</span>
                      <span>Jun</span>
                      <span>Jul</span>
                      <span>Aug</span>
                      <span>Sep</span>
                    </div>
                  </div>
                </div>
              </section>
            </div>

            {/* ================= RIGHT COLUMN ================= */}

            <aside className="accounts-right">
              <div className="quick-card">
                <div className="quick-card-heading">
                  <span className="eyebrow">
                    QUICK ACTIONS
                  </span>

                  <h3>Manage money</h3>
                </div>

                <button
                  type="button"
                  className="quick-action"
                  onClick={openAddModal}
                >
                  <span className="quick-action-icon purple">
                    +
                  </span>

                  <div>
                    <strong>Add account</strong>
                    <small>Connect another account</small>
                  </div>

                  <span className="quick-arrow">→</span>
                </button>

                <button
                  type="button"
                  className="quick-action"
                  onClick={() => navigate("/reports")}
                >
                  <span className="quick-action-icon blue">
                    ▤
                  </span>

                  <div>
                    <strong>View reports</strong>
                    <small>Analyze your finances</small>
                  </div>

                  <span className="quick-arrow">→</span>
                </button>

                <button
                  type="button"
                  className="quick-action"
                  onClick={() => navigate("/insights")}
                >
                  <span className="quick-action-icon yellow">
                    ✦
                  </span>

                  <div>
                    <strong>AI insights</strong>
                    <small>Get financial guidance</small>
                  </div>

                  <span className="quick-arrow">→</span>
                </button>
              </div>

              {/* TRANSACTIONS */}

              <div className="transactions-card">
                <div className="dashboard-card-header">
                  <div>
                    <span className="eyebrow">
                      RECENT ACTIVITY
                    </span>

                    <h3>Transactions</h3>
                  </div>

                  <button
                    type="button"
                    className="mini-action"
                    onClick={() => navigate("/reports")}
                  >
                    All
                  </button>
                </div>

                <div className="transactions-list">
                  {transactions.map((transaction) => (
                    <div
                      className="transaction-row"
                      key={transaction.id}
                    >
                      <div
                        className={`transaction-icon ${
                          transaction.type
                        }`}
                      >
                        {transaction.type === "income"
                          ? "↓"
                          : "↑"}
                      </div>

                      <div className="transaction-info">
                        <strong>
                          {transaction.name}
                        </strong>

                        <span>
                          {transaction.category} ·{" "}
                          {transaction.date}
                        </span>
                      </div>

                      <strong
                        className={`transaction-amount ${
                          transaction.type
                        }`}
                      >
                        {transaction.amount > 0
                          ? "+"
                          : ""}
                        {formatCurrency(
                          transaction.amount
                        )}
                      </strong>
                    </div>
                  ))}
                </div>
              </div>

              {/* AI PROMO */}

              <div className="ai-promo">
                <div className="ai-promo-orb">
                  <span>✦</span>
                </div>

                <span className="eyebrow">
                  FINORA AI
                </span>

                <h3>
                  Your money has a story.
                </h3>

                <p>
                  Let AI analyze your accounts and
                  uncover opportunities to improve your
                  finances.
                </p>

                <button
                  type="button"
                  onClick={() => navigate("/insights")}
                >
                  Explore Insights
                  <span>→</span>
                </button>
              </div>
            </aside>
          </section>
        </div>
      </main>

      {/* ================= ADD ACCOUNT MODAL ================= */}

      {showAddModal && (
        <div
          className="account-modal-backdrop"
          onMouseDown={closeAddModal}
        >
          <div
            className="account-modal"
            onMouseDown={(event) =>
              event.stopPropagation()
            }
          >
            <div className="account-modal-header">
              <div>
                <span>NEW ACCOUNT</span>

                <h2>Add account</h2>

                <p>
                  Connect a financial account to your
                  Finora dashboard.
                </p>
              </div>

              <button
                type="button"
                className="account-modal-close"
                onClick={closeAddModal}
              >
                ×
              </button>
            </div>

            <form onSubmit={handleAddAccount}>
              <div className="account-form-group">
                <label>Account name</label>

                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="e.g. HDFC Savings"
                  autoComplete="off"
                />
              </div>

              <div className="account-form-group">
                <label>Bank / Institution</label>

                <input
                  type="text"
                  name="bank"
                  value={formData.bank}
                  onChange={handleInputChange}
                  placeholder="e.g. HDFC Bank"
                  autoComplete="off"
                />
              </div>

              <div className="account-form-row">
                <div className="account-form-group">
                  <label>Account type</label>

                  <select
                    name="type"
                    value={formData.type}
                    onChange={handleInputChange}
                  >
                    <option value="checking">
                      Checking
                    </option>

                    <option value="savings">
                      Savings
                    </option>

                    <option value="investment">
                      Investment
                    </option>

                    <option value="credit">
                      Credit Card
                    </option>

                    <option value="retirement">
                      Retirement
                    </option>

                    <option value="emergency">
                      Emergency Fund
                    </option>

                    <option value="other">
                      Other
                    </option>
                  </select>
                </div>

                <div className="account-form-group">
                  <label>Balance</label>

                  <input
                    type="number"
                    name="balance"
                    value={formData.balance}
                    onChange={handleInputChange}
                    placeholder="0"
                    step="0.01"
                  />
                </div>
              </div>

              {formError && (
                <div className="account-form-error">
                  {formError}
                </div>
              )}

              <div className="account-modal-actions">
                <button
                  type="button"
                  className="account-cancel-btn"
                  onClick={closeAddModal}
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="account-submit-btn"
                >
                  Add Account
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ================= EDIT ACCOUNT MODAL ================= */}

      {showEditModal && (
        <div
          className="account-modal-backdrop"
          onMouseDown={closeEditModal}
        >
          <div
            className="account-modal"
            onMouseDown={(event) =>
              event.stopPropagation()
            }
          >
            <div className="account-modal-header">
              <div>
                <span>EDIT ACCOUNT</span>

                <h2>Edit account</h2>

                <p>
                  Update the details for this financial
                  account.
                </p>
              </div>

              <button
                type="button"
                className="account-modal-close"
                onClick={closeEditModal}
              >
                ×
              </button>
            </div>

            <form onSubmit={handleEditAccount}>
              <div className="account-form-group">
                <label>Account name</label>

                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="e.g. HDFC Savings"
                />
              </div>

              <div className="account-form-group">
                <label>Bank / Institution</label>

                <input
                  type="text"
                  name="bank"
                  value={formData.bank}
                  onChange={handleInputChange}
                  placeholder="e.g. HDFC Bank"
                />
              </div>

              <div className="account-form-row">
                <div className="account-form-group">
                  <label>Account type</label>

                  <select
                    name="type"
                    value={formData.type}
                    onChange={handleInputChange}
                  >
                    <option value="checking">
                      Checking
                    </option>

                    <option value="savings">
                      Savings
                    </option>

                    <option value="investment">
                      Investment
                    </option>

                    <option value="credit">
                      Credit Card
                    </option>

                    <option value="retirement">
                      Retirement
                    </option>

                    <option value="emergency">
                      Emergency Fund
                    </option>

                    <option value="other">
                      Other
                    </option>
                  </select>
                </div>

                <div className="account-form-group">
                  <label>Balance</label>

                  <input
                    type="number"
                    name="balance"
                    value={formData.balance}
                    onChange={handleInputChange}
                    placeholder="0"
                    step="0.01"
                  />
                </div>
              </div>

              {formError && (
                <div className="account-form-error">
                  {formError}
                </div>
              )}

              <div className="account-modal-actions">
                <button
                  type="button"
                  className="account-cancel-btn"
                  onClick={closeEditModal}
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="account-submit-btn"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ================= DELETE MODAL ================= */}

      {showDeleteModal && selectedAccount && (
        <div
          className="account-modal-backdrop"
          onMouseDown={closeDeleteModal}
        >
          <div
            className="account-delete-modal"
            onMouseDown={(event) =>
              event.stopPropagation()
            }
          >
            <div className="delete-modal-icon">!</div>

            <span className="delete-modal-label">
              DELETE ACCOUNT
            </span>

            <h2>
              Delete {selectedAccount.name}?
            </h2>

            <p>
              This will permanently remove this account
              from your Finora dashboard.
            </p>

            <div className="delete-modal-actions">
              <button
                type="button"
                className="account-cancel-btn"
                onClick={closeDeleteModal}
              >
                Cancel
              </button>

              <button
                type="button"
                className="account-delete-confirm-btn"
                onClick={handleDeleteAccount}
              >
                Delete Account
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Accounts;