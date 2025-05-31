const FAUCETS = {
  ethereum: [
    {
      name: '🔨 PoW Faucet (Mine for ETH)',
      url: 'https://sepolia-faucet.pk910.de',
      className: 'bg-blue-500 hover:bg-blue-600',
      description: 'Mine for up to 1 ETH',
    },
    {
      name: '🚿 Alchemy Sepolia Faucet',
      url: 'https://sepoliafaucet.com',
      className: 'bg-purple-500 hover:bg-purple-600',
      description: '0.5 ETH per day',
    },
    {
      name: '🌊 QuickNode Faucet',
      url: 'https://faucet.quicknode.com/ethereum/sepolia',
      className: 'bg-indigo-500 hover:bg-indigo-600',
      description: '0.1 ETH per day',
    },
  ],
  bsc: [
    {
      name: '🟡 Official BSC Faucet',
      url: 'https://testnet.bnbchain.org/faucet-smart',
      className: 'bg-yellow-500 hover:bg-yellow-600',
      description: '0.1 tBNB per day',
    },
    {
      name: '🔶 Alternative BSC Faucet',
      url: 'https://testnet.binance.org/faucet-smart',
      className: 'bg-orange-500 hover:bg-orange-600',
      description: 'Backup faucet',
    },
  ],
} as const;

export { FAUCETS };
