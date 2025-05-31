import React, { useMemo, useState } from 'react';
import { ethers } from 'ethers';
import { Button } from './ui/Button';
import { Card } from './ui/Card';

const DEMO_ADDRESS = '0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045';
const RPC_URL = 'https://rpc.sepolia.eth.gateway.fm';

const BalanceDemo: React.FC = () => {
  const [demoBalance, setDemoBalance] = useState<string>('');
  const [loading, setLoading] = useState(false);

  const provider = useMemo(() => new ethers.JsonRpcProvider(RPC_URL), []);

  const fetchDemoBalance = async () => {
    setLoading(true);
    try {
      const balance = await provider.getBalance(DEMO_ADDRESS);
      const formattedBalance = ethers.formatEther(balance);
      setDemoBalance(formattedBalance);
    } catch (error) {
      console.error('Demo balance fetch error:', error);
      setDemoBalance('Error fetching demo balance');
    } finally {
      setLoading(false);
    }
  };

  const balanceStatus = useMemo(() => {
    if (!demoBalance) return null;

    const isError = demoBalance.includes('Error');
    if (isError) return { type: 'error' as const };

    const value = parseFloat(demoBalance);
    const hasBalance = value > 0;
    const isZero = value === 0;

    return {
      type: hasBalance ? ('success' as const) : ('warning' as const),
      hasBalance,
      isZero,
    };
  }, [demoBalance]);

  return (
    <Card title="Test the Balance API Demo">
      <div className="space-y-4">
        <div className="bg-white border border-blue-200 rounded-lg p-4">
          <h4 className="text-sm font-medium text-blue-800 mb-2">
            API Verification
          </h4>

          <div className="space-y-2">
            <p className="text-xs text-gray-600">
              <strong>Demo Address:</strong>{' '}
              <span className="font-mono">{DEMO_ADDRESS}</span>
            </p>

            <Button
              onClick={fetchDemoBalance}
              loading={loading}
              size="sm"
              variant="primary"
            >
              Test Balance API
            </Button>

            {/* Show green background if there's actual balance */}
            {balanceStatus?.hasBalance && (
              <div className="mt-2 p-2 bg-green-50 border border-green-200 rounded">
                <p className="text-sm text-green-800">
                  <strong>✅ Demo Balance:</strong> {demoBalance} ETH
                </p>
                <p className="text-xs text-green-700 mt-1">
                  Funds has been found!
                </p>
              </div>
            )}

            {/* Show yellow background if balance is zero */}
            {balanceStatus?.isZero && (
              <div className="mt-2 p-2 bg-yellow-50 border border-yellow-200 rounded">
                <p className="text-sm text-yellow-800">
                  <strong>⚠️ Demo Balance:</strong> {demoBalance} ETH
                </p>
                <p className="text-xs text-yellow-700 mt-1">
                  API working! This address is empty (like your generated
                  wallets).
                </p>
              </div>
            )}

            {/* Show red background for errors */}
            {balanceStatus?.type === 'error' && (
              <div className="mt-2 p-2 bg-red-50 border border-red-200 rounded">
                <p className="text-sm text-red-800">
                  <strong>Error:</strong> {demoBalance}
                </p>
                <p className="text-xs text-red-700 mt-1">
                  Network issue - not a code problem.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </Card>
  );
};

export default BalanceDemo;
