import { Wallet, WalletBalance } from '../../types/wallet';

interface ConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  variant?: 'danger' | 'warning' | 'info';
  walletName?: string;
  walletAddress?: string;
}

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  loading?: boolean;
  children: React.ReactNode;
}

interface CardProps {
  children: React.ReactNode;
  className?: string;
  title?: string;
}

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
}

interface FundingInstructionsProps {
  walletAddress?: string;
}

interface ModalState {
  isOpen: boolean;
  walletId: string | null;
  walletName: string | null;
  walletAddress: string | null;
}

const INITIAL_MODAL_STATE: ModalState = {
  isOpen: false,
  walletId: null,
  walletName: null,
  walletAddress: null,
};

interface WalletState {
  wallets: Wallet[];
  balances: Record<string, WalletBalance[]>;
  loading: boolean;
  error: string | null;
}

interface WalletCardProps {
  wallet: Wallet;
  balances: WalletBalance[];
  loading: boolean;
  formatAddress: (address: string) => string;
  onRefresh: () => void;
  onRemove: (walletId: string) => void;
}

interface WalletGridProps {
  wallets: Wallet[];
  balances: Record<string, WalletBalance[]>;
  loading: boolean;
  onRefresh: () => void;
  onRemove: (walletId: string) => void;
}

interface BalanceWarningProps {
  current: number;
  required: number;
  walletAddress: string;
  symbol: string;
  network: string;
}

interface ErrorDisplayProps {
  error: string | null;
  refreshError: string | null;
}

interface InsufficientBalanceWarningsProps {
  wallets: Wallet[];
  balances: Record<string, WalletBalance[]>;
}

interface WalletListHeaderProps {
  walletCount: number;
  loading: boolean;
  onRefresh: () => void;
}

export type {
  ConfirmationModalProps,
  ButtonProps,
  CardProps,
  InputProps,
  FundingInstructionsProps,
  ModalState,
  WalletBalance,
  WalletState,
  WalletCardProps,
  BalanceWarningProps,
  ErrorDisplayProps,
  InsufficientBalanceWarningsProps,
  WalletGridProps,
  WalletListHeaderProps,
};
export { INITIAL_MODAL_STATE };
