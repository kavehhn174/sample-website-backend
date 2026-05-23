# Sample Website Backend

Express REST API for the product showcase. Serves product data and static placeholder images.

## Setup

```bash
npm install
npm run dev
```

Runs on `http://localhost:3001` by default.

## API

| Method | Path | Description |
|--------|------|-------------|
| GET | `/api/health` | Health check |
| GET | `/api/featured` | First 3 products (home page) |
| GET | `/api/products` | All products |
| GET | `/api/products/:id` | Single product |
| POST | `/api/products` | Create product |

Static files: `/images/*`
