# 🔐 Simple Wallet Keeper

A secure, modern cryptocurrency wallet manager built with React, TypeScript, and blockchain technology. Generate, manage, and monitor multiple EVM-compatible wallets with enterprise-grade security.

## ✨ Features

- 🔑 **Secure Wallet Generation** - Create encrypted cryptocurrency wallets
- 🔒 **Local Encryption** - Private keys never leave your device
- 🌐 **Multi-Network Support** - Ethereum Sepolia & BSC Testnet
- 💰 **Real-time Balance Checking** - Live blockchain integration
- 🎨 **Modern UI** - Clean, responsive design with Tailwind CSS
- ⚡ **TypeScript** - Fully typed for better developer experience
- 🧪 **Comprehensive Testing** - 33 tests ensuring reliability
- 🔧 **Developer Tools** - Built-in scripts for seamless development

## 🚀 Quick Start

### Prerequisites

- Node.js 16+ 
- Yarn package manager

### One-Command Setup

```bash
# Clone the repository
git clone https://github.com/yourusername/simple-wallet-keeper.git
cd simple-wallet-keeper

# 🚀 Fresh start - installs dependencies and starts development server
yarn fresh
```

That's it! The app will open at `http://localhost:3000`

## 📜 Available Scripts

### Development
```bash
# Start development server
yarn start

# Start without opening browser
yarn dev

# Fresh install and start (cleans everything)
yarn fresh
```

### Code Quality
```bash
# Run all checks (types + lint + tests)
yarn validate

# Auto-fix linting and formatting issues
yarn fix-all

# Type checking only
yarn type-check

# Lint code
yarn lint
yarn lint:fix

# Format code with Prettier
yarn format
```

### Testing & Deployment
```bash
# Run tests once
yarn test

# Build for production
yarn build

# Preview production build locally
yarn preview
```

### Health & Maintenance
```bash
# Complete project health check
yarn doctor

# Check for outdated dependencies
yarn deps:check
```

## 🛠️ Tech Stack

### Core Technologies
- **React 18** - Modern UI library with hooks
- **TypeScript** - Type-safe JavaScript
- **Redux Toolkit** - Predictable state management
- **Tailwind CSS** - Utility-first styling

### Blockchain Integration
- **Ethers.js v6** - Ethereum library for blockchain interaction
- **Crypto-JS** - Cryptographic functions for wallet encryption
- **Multi-network support** - Ethereum Sepolia, BSC Testnet

### Developer Experience
- **ESLint** - Code linting with strict TypeScript rules
- **Prettier** - Code formatting
- **Husky** - Git hooks for quality assurance
- **Jest & Testing Library** - Comprehensive testing suite

## 🔧 Project Structure

```
src/
├── components/          # React components
│   ├── ui/             # Reusable UI components
│   └── WalletGenerator/ # Wallet creation component
├── hooks/              # Custom React hooks
├── store/              # Redux store and slices
│   └── slices/         # Redux Toolkit slices
├── types/              # TypeScript type definitions
├── utils/              # Utility functions
│   ├── crypto.ts       # Encryption utilities
│   ├── storage.ts      # Local storage management
│   └── wallet.ts       # Blockchain wallet utilities
└── __tests__/          # Test files
```

## 🔐 Security Features

- **🔒 Local Encryption** - Private keys encrypted with user passwords
- **🚫 No Server Storage** - All data stored locally on your device
- **🔑 Password Protection** - Strong password requirements (6+ characters)
- **⚠️ Security Warnings** - Clear notices about password importance
- **🛡️ Type Safety** - Strict TypeScript prevents runtime errors

## 🌐 Supported Networks

| Network | ChainID | Purpose |
|---------|---------|---------|
| Ethereum Sepolia | 11155111 | Ethereum testnet |
| BSC Testnet | 97 | Binance Smart Chain testnet |

## 🧪 Testing

Run the comprehensive test suite:

```bash
yarn test
```

**Test Coverage:**
- ✅ 33 passing tests
- ✅ Component rendering and interactions
- ✅ Redux store logic and async operations
- ✅ Utility functions and wallet operations
- ✅ TypeScript type safety validation

## 📱 Usage

### Creating a Wallet
1. Enter a wallet name (optional)
2. Create a strong password (6+ characters)
3. Click "Generate Wallet"
4. Your encrypted wallet is saved locally

### Checking Balances
1. Use the "Balance API Demo" to test blockchain connectivity
2. Generated wallets will show live balance updates
3. Supports multiple networks simultaneously

### Managing Wallets
- View all created wallets in the dashboard
- Remove wallets when no longer needed
- Access private keys with password verification

## ⚙️ Configuration

### Environment Variables
Create a `.env.local` file for custom configurations:

```env
REACT_APP_ETHEREUM_RPC_URL=your_ethereum_rpc_url
REACT_APP_BSC_RPC_URL=your_bsc_rpc_url
```

### ESLint Configuration
Strict TypeScript rules prevent common errors:
- No `any` types allowed
- Unused variables flagged
- Consistent code formatting

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit changes: `git commit -m 'Add amazing feature'`
4. Push to branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

### Development Workflow
```bash
# Install dependencies
yarn

# Make your changes
# ...

# Run quality checks
yarn validate

# Fix any issues
yarn fix-all

# Commit and push
```

## 📈 Performance

- ⚡ **Fast Loading** - Optimized React components
- 🎯 **Small Bundle** - Tree-shaking and code splitting
- 🔄 **Efficient Updates** - Redux for predictable state changes
- 💾 **Smart Caching** - Local storage for wallet persistence

## 🛡️ Troubleshooting

### Common Issues

**Dependencies out of sync:**
```bash
yarn fresh
```

**Type errors:**
```bash
yarn type-check
```

**Linting errors:**
```bash
yarn fix-all
```

**Tests failing:**
```bash
yarn test --verbose
```

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **Ethers.js** - Ethereum library
- **Tailwind CSS** - Styling framework  
- **Redux Toolkit** - State management
- **React Testing Library** - Testing utilities

---

**⚠️ Disclaimer:** This is a demonstration application for development purposes. Do not use with real cryptocurrency or mainnet networks. Always audit code before handling real funds.

---

<div align="center">
  <strong>Built with ❤️ by [Your Name]</strong>
  <br>
  <sub>Modern React • TypeScript • Blockchain</sub>
</div>