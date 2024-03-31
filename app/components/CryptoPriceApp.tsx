import React, { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import Image from 'next/image';

const cryptoCoins = [
  { name: 'Bitcoin', logo: '/icons/bitcoin.svg', id: 'bitcoin' },
  { name: 'Ethereum', logo: '/icons/ethereum.svg', id: 'ethereum' },
  { name: 'Solana', logo: '/icons/solana.svg', id: 'solana' },
  { name: 'Cardano', logo: '/icons/cardano.svg', id: 'cardano' },
  { name: 'Polkadot', logo: '/icons/polkadot.svg', id: 'polkadot' },
  { name: 'Polygon', logo: '/icons/polygon.svg', id: 'matic-network' },
  { name: 'NEAR Protocol', logo: '/icons/near.svg', id: 'near' },
  { name: 'The Graph', logo: '/icons/the_graph.svg', id: 'the-graph' },
  { name: 'Fantom', logo: '/icons/fantom.svg', id: 'fantom' },
];

const CryptoPriceApp: React.FC = () => {
  const [investmentPrice, setInvestmentPrice] = useState('');
  const [selectedCoin, setSelectedCoin] = useState('');
  const [profit, setProfit] = useState<number>();
  const [errorMessage, setErrorMessage] = useState('');
  const [joke, setJoke] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleInvestmentPriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (/^\d*$/.test(value)) {
      setInvestmentPrice(value);
    }
  };

  const handleCoinSelection = async (coin: string, coinId: string) => {
    setSelectedCoin(coin);
    if (!investmentPrice) {
      setErrorMessage('Please enter your hypothetical investment amount first.');
      return;
    }
    setIsLoading(true);
    setErrorMessage('');
    try {
      const response = await fetch(`/api/cryptoPrice?coinId=${coinId}&investmentPrice=${investmentPrice}`);
      const data = await response.json();

      const aiReponse = await fetch('/api/recommendation', { 
        method: 'POST',
        body: JSON.stringify({prompt: `This is how much profit I could have made if I invested in ${coin} a year ago: ${data.profit}`})
      });
      const aiData = await aiReponse.json();
      const joke = aiData?.parable?.match(/<parable>(.*?)<\/parable>/)?.[1] ?? `Profit you would have made by investing in ${coin} a year ago`;
      setJoke(joke);
      console.log(aiData);

      setProfit(data.profit);
    } catch (error) {
      console.error('Failed to fetch profit:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container max-w-[700px]	mx-auto px-4">
      <p className="text-lg font-light text-gray-300 mb-8 text-center">
        See how much <b>profit</b> you could have made if you invested in crypto a year ago.
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
            required
            className="pl-5 border border-gray-300 rounded-full w-60 text-center text-xl py-6"
          />
        </div>
      </div>
      <div className="mb-8">
        <p className="mb-4 text-lg text-center text-[#14ffb5]">Select a crypto coin:</p>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {cryptoCoins.map((coin) => (
            <Button
              key={coin.name}
              onClick={() => handleCoinSelection(coin.name, coin.id)}
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
              <Image src={coin.logo} alt={coin.name} width={24} height={24} className="w-6 h-6 mr-2" />
              {coin.name}
            </Button>
          ))}
        </div>
      </div>
      {isLoading && (
        <div className="flex justify-center items-center">
          <div className="loader ease-linear rounded-full border-4 border-t-4 border-gray-800 h-8 w-8 mb-4"></div>
        </div>
      )}
      {errorMessage && (
        <p className="text-lg text-red-500 text-center">{errorMessage}</p>
      )}
      {profit && !isLoading && !errorMessage && (
        <div className="text-center">
          <div className="inline-block p-1">
            <div className="bg-black border-2 border-dashed border-teal-500 rounded-xl p-6">
              <p className="text-6xl font-bold mb-2 text-transparent bg-clip-text bg-gradient-to-r from-green-500 to-teal-500">
                ${profit.toLocaleString(undefined, { maximumFractionDigits: 2 })}
              </p>
              <p className="text-lg text-gray-300">
                {joke}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CryptoPriceApp;
