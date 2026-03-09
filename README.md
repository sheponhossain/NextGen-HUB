# NextGen Hub

A powerful Next.js dashboard for managing products and inventory with cutting-edge technology and modern design principles.

## 🚀 Features

- **Product Management**: Full CRUD operations for products
- **Authentication**: Secure Google OAuth integration
- **File Upload**: Cloudinary integration for image uploads
- **Database**: MongoDB with Mongoose ODM
- **Real-time Updates**: Live data synchronization
- **Customer Support**: Animated chat widget with auto-hide functionality
- **Legal Pages**: Complete privacy, terms, cookies, and license pages
- **Help Center**: Comprehensive documentation and support
- **Community**: Interactive platform for users
- **System Status**: Real-time monitoring dashboard

## 🛠️ Tech Stack

- **Frontend**: Next.js 15, React 19, Tailwind CSS
- **Backend**: Next.js API Routes
- **Database**: MongoDB with Mongoose
- **Authentication**: NextAuth.js with Google OAuth
- **File Storage**: Cloudinary
- **State Management**: React Context API
- **Styling**: Tailwind CSS with custom gradients
- **Icons**: Lucide React
- **Animations**: Framer Motion

## 📋 Prerequisites

- Node.js (version 18 or higher)
- MongoDB Atlas account
- Google Cloud Console account (for OAuth)
- Cloudinary account

## 🚀 Installation

### 1. Clone the repository

```bash
git clone https://github.com/sheponhossain/NextGen-HUB.git
cd NextGen-HUB
```

### 2. Install dependencies

```bash
npm install
```

### 3. Environment Setup

Create a `.env` file in the root directory and add the following variables:

```env
# Database
MONGODB_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/nextgen-hub?retryWrites=true&w=majority

# Authentication
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your_nextauth_secret

# File Upload
CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret

# Session Secret
SESSION_SECRET=your_session_secret
```

### 4. Run the development server

```bash
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000) to see the application.

## 🗂️ Project Structure

```
nextgen-hub/
├── public/                    # Static assets
├── src/
│   ├── app/                   # App Router pages
│   │   ├── api/              # API routes
│   │   │   ├── auth/         # Authentication endpoints
│   │   │   ├── products/     # Product API
│   │   │   ├── upload/       # File upload
│   │   │   └── test-mongodb/ # Database test
│   │   ├── dashboard/        # Admin dashboard
│   │   ├── products/         # Product pages
│   │   ├── details/          # Product details
│   │   ├── contact/          # Contact page
│   │   ├── about/            # About page
│   │   ├── register/         # Registration page
│   │   ├── login/            # Login page
│   │   ├── privacy/          # Privacy policy
│   │   ├── terms/            # Terms of service
│   │   ├── cookies/          # Cookie policy
│   │   ├── license/          # License page
│   │   ├── help/             # Help center
│   │   ├── docs/             # Documentation
│   │   ├── status/           # System status
│   │   └── community/        # Community page
│   ├── components/           # Reusable components
│   │   ├── Navbar/          # Navigation bar
│   │   ├── Footer/          # Footer component
│   │   ├── ProductModal/    # Product modal
│   │   └── Card/            # Product card
│   ├── lib/                 # Utility functions
│   │   ├── mongodb.js       # Database connection
│   │   ├── seed.js          # Database seeding
│   │   └── models/          # Data models
│   └── models/              # User model
├── .env                     # Environment variables
├── package.json             # Dependencies
├── next.config.mjs          # Next.js configuration
├── tailwind.config.js       # Tailwind CSS config
└── README.md               # This file
```

## 🛣️ Route Summary

### Public Routes
- `/` - Home page with product showcase
- `/products` - Product listing page
- `/products/[id]` - Individual product details
- `/products/sample/[id]` - Sample product page
- `/details/[id]` - Product details with modal
- `/about` - About page
- `/contact` - Contact form
- `/register` - User registration
- `/login` - User login with Google OAuth

### Protected Routes (Dashboard)
- `/dashboard` - Admin dashboard overview
- `/dashboard/manage` - Product management
- `/dashboard/add-product` - Add new products

### API Routes
- `POST /api/auth/register` - User registration
- `GET /api/test-mongodb` - Database connection test
- `POST /api/upload` - File upload to Cloudinary
- `GET /api/products` - Get all products
- `POST /api/products` - Create new product
- `GET /api/products/[id]` - Get product by ID
- `PUT /api/products/[id]` - Update product
- `DELETE /api/products/[id]` - Delete product
- `GET /api/product/[id]` - Get product details

### Legal & Support Routes
- `/privacy` - Privacy policy
- `/terms` - Terms of service
- `/cookies` - Cookie policy
- `/license` - License information
- `/help` - Help center
- `/docs` - Documentation
- `/status` - System status
- `/community` - Community forum

## 🔧 Configuration

### Database Setup
1. Create a MongoDB Atlas cluster
2. Add your connection string to `.env` as `MONGODB_URI`
3. Ensure your IP is whitelisted in MongoDB Atlas

### Google OAuth Setup
1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select existing
3. Enable Google+ API
4. Create OAuth 2.0 credentials
5. Add authorized redirect URI: `http://localhost:3000/api/auth/callback/google`
6. Add client ID and secret to `.env`

### Cloudinary Setup
1. Sign up at [Cloudinary](https://cloudinary.com/)
2. Get your cloud name, API key, and API secret
3. Add to `.env` file

## 🚀 Deployment

### Vercel (Recommended)
1. Push to GitHub
2. Connect repository to Vercel
3. Set environment variables in Vercel dashboard
4. Deploy

### Docker
```bash
docker build -t nextgen-hub .
docker run -p 3000:3000 nextgen-hub
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 📞 Support

For support and questions:
- Visit our [Help Center](/help)
- Check [System Status](/status)
- Join our [Community](/community)
- Contact us through the [Contact Page](/contact)

## 🙏 Acknowledgments

- Next.js team for the excellent framework
- MongoDB for the database
- Cloudinary for file storage
- All contributors and testers

---

**NextGen Hub** - Empowering modern product management with cutting-edge technology.