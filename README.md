# Crypto Regrets

> This app was built as part of a challenge in the **Codebender AI Bootcamp**. Learn how to build projects like these [here](https://lastcodebender.com/bootcamp).

This app tells you how much money you would have made if you invested in crypto before the last bull run.

<img src="app-demo.gif" alt="app demo" width=600>

This app is built with Next.js. It uses the NVIDIA Nim API with `mixtral-8x7b-instruct-v0.1` to tell jokes and the CoinGecko API for the crypto prices.

## Author

This project is built by The Codebender:

- [𝕏](https://twitter.com/ZaurbekStark)
- [YouTube](https://www.youtube.com/@thecodebendermaster)

## Getting Started

First, duplicate the `.env` file into a new file named `.env.local`. Update the value of your CoinGecko and NVIDIA Nim API keys there.

The first time you are running this project, you will need to install the dependencies. Run this command in your terminal:

```bash
yarn
```

To start the app, run:

```bash
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.
