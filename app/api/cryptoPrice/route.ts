import { NextRequest, NextResponse } from 'next/server';

const apiKey = process.env.COINGECKO_API_KEY;

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const coinId = searchParams.get('coinId');
  const investmentPrice = searchParams.get('investmentPrice');

  if (!coinId || !investmentPrice) {
    return new NextResponse(JSON.stringify({ error: 'Missing required query parameters.' }), { status: 400 });
  }

  const startDate = new Date();
  startDate.setFullYear(startDate.getFullYear() - 1);
  const endDate = new Date();

  const startTimestamp = Math.floor(startDate.getTime() / 1000);
  const endTimestamp = Math.floor(endDate.getTime() / 1000);

  const apiURL = `https://api.coingecko.com/api/v3/coins/${coinId}/market_chart/range`;
  const queryParams = `?vs_currency=usd&from=${startTimestamp}&to=${endTimestamp}`;
  const fullURL = `${apiURL}${queryParams}`;

  try {
    const response = await fetch(fullURL, {
      headers: {
        'x-cg-demo-api-key': apiKey ?? '',
      },
    });
    const data = await response.json();

    if (data && data.prices && data.prices.length > 0) {
      const initialPrice = data.prices[0][1]; // Price a year ago
      const finalPrice = data.prices[data.prices.length - 1][1]; // Current price
      const unitsBought = parseFloat(investmentPrice) / initialPrice;
      const currentValuation = unitsBought * finalPrice;
      const profit = currentValuation - parseFloat(investmentPrice);

      return new NextResponse(JSON.stringify({ profit }), { status: 200 });
    } else {
      return new NextResponse(JSON.stringify({ error: 'No data found for the given coin ID.' }), { status: 404 });
    }
  } catch (error) {
    console.error('Error fetching data from CoinGecko:', error);
    return new NextResponse(JSON.stringify({ error: 'Failed to fetch data from CoinGecko.' }), { status: 500 });
  }
}
