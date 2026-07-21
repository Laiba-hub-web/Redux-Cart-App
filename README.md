# Redux Cart App

A shopping cart app built with React, Redux Toolkit, and Axios — live product data, a full cart (add/remove/quantity), localStorage persistence, and a complete checkout flow.

**Repo:** https://github.com/Laiba-hub-web/redux-cart-app

## Features

- Product catalog fetched live from the [Fake Store API](https://fakestoreapi.com) via Axios + `createAsyncThunk`
- Add to Cart with automatic quantity merging
- Cart view with +/- quantity controls, remove, and a running total
- Cart persists across page reloads via `localStorage`
- Checkout flow: order summary, validated shipping form, order confirmation
- Responsive layout

## Tech Stack

- [React 18](https://react.dev/)
- [Redux Toolkit](https://redux-toolkit.js.org/) (`configureStore`, `createSlice`, `createAsyncThunk`)
- [React Redux](https://react-redux.js.org/) (`Provider`, `useSelector`, `useDispatch`)
- [Axios](https://axios-http.com/)
- [Vite](https://vitejs.dev/)

## Getting Started

```bash
npm install
npm run dev
```

Then open the local URL Vite prints (typically `http://localhost:5173`).

Other scripts:

```bash
npm run build     # production build into dist/
npm run preview   # serve the production build locally
```

## Project Structure

```
src/
├── api/
│   └── axiosClient.js       # configured axios instance
├── app/
│   ├── store.js              # Redux store, localStorage rehydration/persistence
│   └── localStorage.js       # load/save cart to localStorage
├── features/
│   ├── cartSlice.js          # cart state: add/remove/quantity/clear
│   └── productsSlice.js      # product fetching via createAsyncThunk
├── components/
│   ├── Navbar.jsx
│   ├── ProductCard.jsx
│   ├── ProductList.jsx
│   ├── Cart.jsx
│   ├── Checkout.jsx
│   └── OrderConfirmation.jsx
├── App.jsx                   # view routing: products / cart / checkout / confirmation
└── index.jsx                 # entry point (Provider + store)
```

## Documentation

[`docs/Redux_Toolkit_Axios_Step_By_Step_Guide.pdf`](docs/Redux_Toolkit_Axios_Step_By_Step_Guide.pdf) — the complete build guide, from an empty folder to this working app, part by part with every file's full code and the reasoning behind each decision.
