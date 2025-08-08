# ConverCart Assignment

## Project Overview

It is an assignment given by **ConverCart**. The project demonstrates full stack capabilities using a React-based frontend and Node.js (Express + TypeScript) backend. It integrates with WooCommerce APIs, ingests product data, and supports segmentation features with robust syncing and scheduled jobs.

---

## Project Structure

convercart-assignment/
├── client/ # Frontend
│ ├── main.tsx # Entry file
│ └── src/
│ ├── components/ # React UI components
│ ├── types/ # TypeScript types
│ └── pages/ # Page components/routes
├── backend/ # Backend
│ ├── index.ts # Entry file
│ └── src/
│ ├── config/ # Configurations
│ ├── controllers/ # Route controllers
│ ├── models/ # Data models (Mongoose)
│ ├── routes/ # API route handlers
│ ├── utils/ # Utility helpers
│ └── cronJobs/ # Scheduled tasks

---

## Setup Instructions

### Client

1. Go to the `client` directory:

   ```
   cd client
   ```

2. Install dependencies:

   ```
   npm install
   ```

3. Start development server:
   ```
   npm run dev
   ```

### Backend

1. Go to the `backend` directory:

   ```
   cd backend
   ```

2. Install dependencies:

   ```
   npm install
   ```

3. Start in development mode:

   ```
   npm run dev
   ```

4. Build for production:
   ```
   npm run build
   ```

---

## Live Deployment URLs

- **Home Page:** [https://convert-cart-delta.vercel.app/](https://convert-cart-delta.vercel.app/)
- **Products Page:** [https://convert-cart-delta.vercel.app/products](https://convert-cart-delta.vercel.app/products)
- **Segment Page:** [https://convert-cart-delta.vercel.app/segments](https://convert-cart-delta.vercel.app/segments)
- **Swagger API docs:** [https://convertcart-adqi.onrender.com/api-docs/](https://convertcart-adqi.onrender.com/api-docs/)

---

## Environment Variables

### Client

- `VITE_BASE_URL=`

### Backend

- `DATABASE_URL=`
- `WOOCOMMERCE_CUSTOMER_SECRET=`
- `WOOCOMMERCE_CUSTOMER_KEY=`
- `WOOCOMMERCE_BASE_URL=`

---

## Ingestion Logic

**Product ingestion** from WooCommerce follows these steps:

1. **API Connection:**  
   WooCommerce API client is initialized using secret, key, and base URL from environment variables.

2. **Product Fetching:**  
   All products are retrieved page by page from WooCommerce, aggregating results to handle large catalogs.

3. **Transformation:**  
   Each WooCommerce product is mapped to the backend's schema with properties: id, title, price, stock details, category, tags, on-sale status, creation date.

4. **Bulk Upsert:**  
   Using MongoDB's `bulkWrite`, products are upserted—existing records updated, new ones inserted.

5. **Error Handling:**  
   Missing credentials or API errors throw explicit errors, and all steps include proper error handling.

6. **Scheduling (Cron):**  
   The ingestion logic runs automatically every day at 1:30 AM (via node-cron). It can also be triggered on-demand using a command-line flag. The server ensures DB connection is established before proceeding.

---

## Segmentation Example

`price>10`
`category = Clothing`
`stock_status = instock`

Sample logic:  
Update all products where `price > 10` **and** `category = Clothing` **and** `stock_status = instock`.

---

## Demo Videos

- https://drive.google.com/file/d/1hKPqlC3JOdjhCsmVr_LXg0tHqJzatyfd/view?usp=sharing

---

## AI Usage Notes

- **Tools Used:**
  - ChatGPT
  - Windsurf (for rapid boilerplate generation)
- **Generated:**
  - Express backend and React frontend boilerplate
  - Initial readme file template
- **Manual Improvements:**
  - Implemented logic to ensure server starts only after DB connection
  - Modified ingestion logic to match new APIs and requirements
  - Improved error handling, scheduling, and project structure
  - Wrote and clarified all documentation and project instructions

> While AI tools helped generate the initial structure and documentation, most of the business logic and code adaptations were implemented manually.

---

**End of README**
