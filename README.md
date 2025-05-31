# Simple Wallet Keeper

A secure cryptocurrency wallet manager built with React and TypeScript. Generate, store, and monitor EVM-compatible wallets with encrypted private keys.

## 🚀 Quick Start

```bash
yarn fresh  # Downloads dependencies and starts the app
```

Opens at `http://localhost:3000`

## Key Features

- **Secure Wallet Generation** - Create encrypted cryptocurrency wallets
- **Local-Only Storage** - Private keys never leave your device
- **Multi-Network** - Ethereum Sepolia & BSC Testnet support
- **Live Balances** - Real-time blockchain integration

## 🛠️ Tech Stack

- **React 18** - with TypeScript
- **Redux Toolkit** - for state management
- **Ethers.js v6** - for blockchain interaction
- **Tailwind CSS** - for styling
- **Jest & Testing Library** - for testing
- **ESLint** - Code linting with strict TypeScript rules
- **Prettier** - Code formatting
- **Husky** - Git hooks for quality assurance

## 📜 Scripts made by me

```bash
yarn fresh      #  install everything you need and start's the app
yarn validate   # Run all and checks for (types + lint + tests)
yarn fix-all    # Auto-fix formatting issues
```

## Other scrips

```bash
# Build for production
yarn build

# Preview production build locally
yarn preview

# Complete project health check
yarn doctor
```

## Supported Networks

- **Ethereum Sepolia** (testnet)
- **BSC Testnet** (testnet)

## Usage

1. **Generate Wallet**: Enter name + password → encrypted wallet created
2. **Check Balances**: Live updates from blockchain networks
3. **Manage Wallets**: View, remove, or access private keys with password
