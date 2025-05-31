import React, { useState, useCallback, useRef } from 'react';
import { Card } from './ui/Card';
import { Button } from './ui/Button';
import { FundingInstructionsProps } from './types';
import { FAUCETS } from '../constants';

export const FundingInstructions: React.FC<FundingInstructionsProps> = ({
  walletAddress,
}) => {
  const [copiedAddress, setCopiedAddress] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout>();

  const handleCopyAddress = useCallback(async () => {
    if (!walletAddress) return;

    try {
      await navigator.clipboard.writeText(walletAddress);
      setCopiedAddress(true);

      // Clear existing timeout to prevent multiple timers
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }

      timeoutRef.current = setTimeout(() => {
        setCopiedAddress(false);
      }, 2000);
    } catch (err) {
      console.error('Failed to copy address:', err);
    }
  }, [walletAddress]);

  // Cleanup timeout on unmount
  React.useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  return (
    <Card title="Get Test Funds">
      <div className="bg-white rounded-xl p-6 shadow-lg border border-slate-300">
        {walletAddress && (
          <div className="bg-gray-50 rounded-lg p-4 mb-6">
            <div className="flex justify-between items-center mb-2">
              <label className="text-sm font-medium text-gray-700">
                Your Wallet Address:
              </label>
              <Button onClick={handleCopyAddress} size="sm" variant="secondary">
                <svg
                  className="w-4 h-4 mr-1"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
                  />
                </svg>
                {copiedAddress ? 'Copied!' : 'Copy'}
              </Button>
            </div>
            <div className="font-mono text-xs bg-white p-3 rounded border break-all">
              {walletAddress}
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Ethereum Sepolia Faucet */}
          <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg p-5 border border-blue-200">
            <div className="flex items-center mb-3">
              <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center mr-3">
                <span className="text-white text-sm font-bold">Ξ</span>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">
                  Ethereum Sepolia
                </h3>
                <p className="text-xs text-gray-600">Get free Sepolia ETH</p>
              </div>
            </div>

            <div className="space-y-2">
              {FAUCETS.ethereum.map((faucet) => (
                <a
                  key={faucet.url}
                  href={faucet.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`block w-full ${faucet.className} text-white text-center py-2.5 px-4 rounded-lg text-sm font-medium transition-colors shadow-sm`}
                >
                  {faucet.name}
                </a>
              ))}
            </div>
          </div>

          {/* BSC Testnet Faucet */}
          <div className="bg-gradient-to-br from-yellow-50 to-orange-50 rounded-lg p-5 border border-yellow-200">
            <div className="flex items-center mb-3">
              <div className="w-8 h-8 bg-yellow-500 rounded-full flex items-center justify-center mr-3">
                <span className="text-white text-sm font-bold">B</span>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">BNB Smart Chain</h3>
                <p className="text-xs text-gray-600">Get free testnet BNB</p>
              </div>
            </div>

            <div className="space-y-2">
              {FAUCETS.bsc.map((faucet) => (
                <a
                  key={faucet.url}
                  href={faucet.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`block w-full ${faucet.className} text-white text-center py-2.5 px-4 rounded-lg text-sm font-medium transition-colors shadow-sm`}
                >
                  {faucet.name}
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Warning */}
        <div className="mt-4 bg-amber-50 border border-amber-200 rounded-lg p-3">
          <div className="flex">
            <svg
              className="w-5 h-5 text-amber-500 mr-2 mt-0.5 flex-shrink-0"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                clipRule="evenodd"
              />
            </svg>
            <div>
              <p className="text-sm text-amber-800">
                <strong>Important:</strong> These are testnet tokens with no
                real value. Only use for development and testing purposes.
              </p>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
};
