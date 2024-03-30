import React, { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';

const cryptoCoins = [
  { name: 'Bitcoin', logo: '/icons/bitcoin.svg' },
  { name: 'Ethereum', logo: '/icons/ethereum.svg' },
  { name: 'Solana', logo: '/icons/solana.svg' },
  { name: 'Cardano', logo: '/icons/cardano.svg' },
  { name: 'Polkadot', logo: '/icons/polkadot.svg' },
  { name: 'Polygon', logo: '/icons/polygon.svg' },
  { name: 'NEAR Protocol', logo: '/icons/near.svg' },
  { name: 'The Graph', logo: '/icons/the_graph.svg' },
  { name: 'Fantom', logo: '/icons/fantom.svg' },
];

const CryptoPriceApp: React.FC = () => {
  const [investmentPrice, setInvestmentPrice] = useState('');
  const [selectedCoin, setSelectedCoin] = useState('');
  const [profit, setProfit] = useState(0);

  const handleInvestmentPriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (/^\d*$/.test(value)) {
      setInvestmentPrice(value);
    }
  };

  const handleCoinSelection = (coin: string) => {
    setSelectedCoin(coin);
    // TODO: Call API to calculate profit based on investmentPrice and selectedCoin
    // For now, set a random profit value
    setProfit(Math.random() * 1000);
  };

  return (
    <div className="container mx-auto p-4">
      <p className="text-lg text-gray-300 mb-8 text-center">
        See how much you could've made if you invested in crypto a year ago.
      </p>
      <div className="mb-8 flex flex-col items-center">
        <label htmlFor="investmentPrice" className="mb-2 text-lg text-[#14ffb5]">
          Enter your hypothetical investment:
        </label>
        <div className="relative">
          <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">$</span>
          <Input
            id="investmentPrice"
            type="text"
            value={investmentPrice}
            onChange={handleInvestmentPriceChange}
            placeholder="1,000"
            className="pl-5 border border-gray-300 rounded-full w-60 text-center text-xl py-6"
          />
        </div>
      </div>
      <div className="mb-8">
        <p className="mb-4 text-lg text-center text-[#14ffb5]">Select a crypto coin:</p>
        <div className="grid grid-cols-3 gap-4">
          {cryptoCoins.map((coin) => (
            <Button
              key={coin.name}
              onClick={() => handleCoinSelection(coin.name)}
              variant={selectedCoin === coin.name ? 'default' : 'outline'}
              className={`
                flex items-center justify-center rounded-full px-6 py-3
                bg-[#a157f717] border border-[#ae64fe]
                ${
                  selectedCoin === coin.name
                    ? 'text-gray-800 bg-[#fff]'
                    : 'text-white hover:shadow-[0_0_20px_rgba(174,100,254,0.4)]'
                }
                transition duration-300
              `}
            >
              <img src={coin.logo} alt={coin.name} className="w-6 h-6 mr-2" />
              {coin.name}
            </Button>
          ))}
        </div>
      </div>
      {profit > 0 && (
        <div className="text-center">
          <p className="text-6xl font-bold mb-2 text-transparent bg-clip-text bg-gradient-to-r from-green-500 to-teal-500">
            ${profit.toFixed(2)}
          </p>
          <p className="text-lg text-gray-300">
            Profit you would have made by investing in {selectedCoin} a year ago
          </p>
        </div>
      )}
    </div>
  );
};

export default CryptoPriceApp;
