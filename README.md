# Restaurant E-Commerce Backend API

A robust RESTful API built with Node.js, Express, TypeScript, and MongoDB for managing a restaurant e-commerce platform.

## 🚀 Features

- **Product Management**: CRUD operations for food items with images, pricing, and inventory
- **Category Management**: Organize products into breakfast, lunch, dinner categories
- **Team Members**
- **Slider Management**: Dynamic hero section content
- **Advanced Filtering**: Search, filter by category, price range, and more
- **Pagination**: Efficient data loading with pagination support
- **Validation**: Request validation using Zod
- **Error Handling**: Centralized error handling with custom error classes
- **TypeScript**: Full type safety throughout the application

## 📋 Prerequisites

Before you begin, ensure you have the following installed:
- Node.js (v18 or higher)
- npm or yarn
- MongoDB (local installation or MongoDB Atlas account)

## 🛠️ Installation

### 1. Clone the repository
```bash
git clone <your-repo-url>
cd ecommerce-backend
```

### 2. Install dependencies
```bash
npm install
```

### 3. Environment Setup

Create a `.env` file in the root directory:
```env
NODE_ENV=development
PORT=5000
MONGODB_URI=mongodb://localhost:27017/ecommerce
# OR for MongoDB Atlas:
# MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/ecommerce

CORS_ORIGIN=http://localhost:3000
```

### 4. Build the project
```bash
npm run build
```

### 5. Run the application

**Development mode:**
```bash
npm run dev
```

**Production mode:**
```bash
npm start
```

The server will start at `http://localhost:5000`

## 🔌 API Endpoints

### Base URL
```
http://localhost:5000/api
```

### Categories

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/categories` | Get all categories |
| GET | `/categories/:id` | Get category by ID |
| GET | `/categories/slug/:slug` | Get category by slug |
| POST | `/categories` | Create new category |
| PATCH | `/categories/:id` | Update category |
| DELETE | `/categories/:id` | Delete category |

### Products

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/products` | Get all products (with filters) |
| GET | `/products/:id` | Get product by ID |
| GET | `/products/slug/:slug` | Get product by slug |
| POST | `/products` | Create new product |
| PATCH | `/products/:id` | Update product |
| DELETE | `/products/:id` | Delete product |

**Query Parameters for GET /products:**
- `category` - Filter by category ID
- `minPrice` - Minimum price
- `maxPrice` - Maximum price
- `isFeatured` - Filter featured products (true/false)
- `search` - Search in name and description
- `sort` - Sort by field (e.g., -createdAt, price)
- `page` - Page number (default: 1)
- `limit` - Items per page (default: 10)

### Team Members

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/team` | Get all team members |
| GET | `/team/:id` | Get team member by ID |
| POST | `/team` | Create new team member |
| PATCH | `/team/:id` | Update team member |
| DELETE | `/team/:id` | Delete team member |

### Sliders

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/sliders` | Get all sliders |
| GET | `/sliders/:id` | Get slider by ID |
| POST | `/sliders` | Create new slider |
| PATCH | `/sliders/:id` | Update slider |
| DELETE | `/sliders/:id` | Delete slider |

## 📝 Request/Response Examples

### Create Product

**POST** `/api/products`
```json
{
  "name": "Chicken Burger",
  "slug": "chicken-burger",
  "description": "Juicy grilled chicken burger with fresh vegetables",
  "price": 12.99,
  "discountPrice": 9.99,
  "category": "65f1234567890abcdef12345",
  "images": [
    "https://example.com/burger.jpg"
  ],
  "stock": 50,
  "tags": ["burger", "chicken", "fast-food"],
  "isFeatured": true,
  "isActive": true
}
```

**Response:**
```json
{
  "success": true,
  "message": "Product created successfully",
  "data": {
    "_id": "65f1234567890abcdef12346",
    "name": "Chicken Burger",
    "slug": "chicken-burger",
    "price": 12.99,
    "discountPrice": 9.99,
    "category": {
      "_id": "65f1234567890abcdef12345",
      "name": "Lunch",
      "slug": "lunch"
    },
    "images": ["https://example.com/burger.jpg"],
    "stock": 50,
    "isFeatured": true,
    "isActive": true,
    "createdAt": "2024-01-15T10:30:00.000Z",
    "updatedAt": "2024-01-15T10:30:00.000Z"
  }
}
```

### Get Products with Filters

**GET** `/api/products?category=65f1234567890abcdef12345&minPrice=5&maxPrice=15&page=1&limit=10`
```json
{
  "success": true,
  "message": "Products retrieved successfully",
  "data": {
    "success": true,
    "data": {
      "products": [
        {
          "_id": "65f1234567890abcdef12346",
          "name": "Chicken Burger",
          "slug": "chicken-burger",
          "price": 12.99,
          "discountPrice": 9.99,
          "category": {
            "_id": "65f1234567890abcdef12345",
            "name": "Lunch",
            "slug": "lunch"
          },
          "images": ["https://example.com/burger.jpg"],
          "stock": 50,
          "isFeatured": true,
          "isActive": true
        }
      ],
      "pagination": {
        "page": 1,
        "limit": 10,
        "total": 45,
        "totalPages": 5
      }
    }
  }
}
```

## 🧪 Testing API

You can test the API using:

### cURL
```bash
# Get all products
curl http://localhost:5000/api/products

# Get products by category
curl "http://localhost:5000/api/products?category=CATEGORY_ID"

# Create a product
curl -X POST http://localhost:5000/api/products \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test Product",
    "slug": "test-product",
    "description": "Test description",
    "price": 10.99,
    "category": "CATEGORY_ID",
    "images": ["https://example.com/image.jpg"],
    "stock": 100
  }'
```

### Postman/Thunder Client

1. Import the API endpoints
2. Set base URL: `http://localhost:5000/api`
3. Test each endpoint

## 🗄️ Database Schema

### Product Schema
```typescript
{
  name: String (required, max 200 chars)
  slug: String (required, unique)
  description: String (required, max 2000 chars)
  price: Number (required, min 0)
  discountPrice: Number (optional, min 0)
  category: ObjectId (required, ref: Category)
  images: [String] (required, min 1 image)
  stock: Number (required, min 0)
  tags: [String] (optional)
  isFeatured: Boolean (default: false)
  isActive: Boolean (default: true)
  rating: Number (0-5, optional)
  reviewCount: Number (min 0, optional)
  timestamps: true
}
```

### Category Schema
```typescript
{
  name: String (required, unique, max 50 chars)
  slug: String (required, unique)
  description: String (optional, max 500 chars)
  image: String (optional)
  order: Number (required, min 0)
  isActive: Boolean (default: true)
  timestamps: true
}
```

### Team Schema
```typescript
{
  name: String (required, max 100 chars)
  position: String (required, max 100 chars)
  image: String (required)
  bio: String (optional, max 1000 chars)
  order: Number (required, min 0)
  isActive: Boolean (default: true)
  socialLinks: {
    facebook: String (optional)
    twitter: String (optional)
    instagram: String (optional)
    linkedin: String (optional)
  }
  timestamps: true
}
```

## 🚀 Deployment

### Deploy to Vercel

1. Install Vercel CLI:
```bash
npm install -g vercel
```

2. Login to Vercel:
```bash
vercel login
```

3. Deploy:
```bash
vercel --prod
```

4. Set environment variables in Vercel Dashboard:
   - `MONGODB_URI`
   - `NODE_ENV`
   - `CORS_ORIGIN`

### MongoDB Atlas Setup

1. Create account at [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a new cluster
3. Add database user
4. Whitelist IP: `0.0.0.0/0` (for Vercel)
5. Get connection string and add to `.env`

## 📦 Scripts
```json
{
  "dev": "Run development server with hot reload",
  "build": "Compile TypeScript to JavaScript",
  "start": "Run production server",
  "lint": "Run ESLint",
  "format": "Format code with Prettier"
}
```

## 🔒 Security Features

- **Helmet**: Security headers
- **CORS**: Configured origin control
- **Input Validation**: Zod schema validation
- **Error Handling**: No sensitive data in error responses
- **MongoDB Injection**: Protected by Mongoose

## 🐛 Error Handling

The API uses centralized error handling with custom error classes:
```typescript
// Custom App Error
throw new AppError(StatusCodes.NOT_FOUND, 'Product not found');

// Validation Error (Zod)
// Automatically handled by validateRequest middleware

// MongoDB Errors
// Automatically formatted by global error handler
```

Error Response Format:
```json
{
  "success": false,
  "message": "Error message",
  "errorSources": [
    {
      "path": "field_name",
      "message": "Error description"
    }
  ]
}
```

## 📚 Technologies Used

- **Node.js**: Runtime environment
- **Express**: Web framework
- **TypeScript**: Type safety
- **MongoDB**: Database
- **Mongoose**: ODM
- **Zod**: Schema validation
- **Helmet**: Security
- **CORS**: Cross-origin resource sharing
- **Morgan**: HTTP request logger

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the ISC License.

## 👨‍💻 Author

Tanjim Siddiki Siyam - tanjim.siyam.tech@gmail.com

## 🙏 Acknowledgments

- Express.js documentation
- MongoDB documentation
- TypeScript documentation
- Vercel deployment guides