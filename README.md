## TechStack

## Tool | Purpose

React (TypeScript) | Frontend UI
Redux Toolkit | State management
Tailwind CSS | Styling and responsiveness
Recharts | Charting (7-day trends)
Binance WebSocket API | Real-time crypto price feed
Vite | Fast frontend build tool

## Architecture Overview

src/
├── app/
│ └── store.ts # Configures Redux store
├── features/
│ └── crypto/
│ ├── cryptoSlice.ts # Redux slice for crypto data
│ ├── types.ts # TypeScript interfaces for assets
│ ├── binanceSocket.ts # Real-time WebSocket integration
│ └── CryptoTable.tsx # Main UI component for the table
├── App.tsx # Main application component
├── main.tsx # App entry point (Provider + ReactDOM)
└── index.css # Tailwind CSS

## Setup Instructions

1. Clone the Repository
   git clone https://github.com/your-username/crypto-price-tracker.git
   cd crypto-price-tracker

2. Install Dependencies
   npm install

3. Start the Development Server
   npm run dev

## Features

- Live simulated updates every 2 seconds
- Fully Redux-managed state (no local state)
- Color-coded change indicators (green/red)
- Responsive table layout
- 7-day trend chart (candlestick style)
- WebSocket price feed from Binance
