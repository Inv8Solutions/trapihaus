# Trapihaus 🏠

A modern, responsive landing page for Trapihaus - your trusted hyperlocal marketplace for safe, compliant, and affordable stays in Baguio City, Philippines.

## 🌟 About Trapihaus

Trapihaus is a platform designed to connect students, tourists, and travelers with verified local hosts offering safe and affordable accommodations in Baguio City. The platform focuses on providing budget-friendly stays while ensuring compliance with local regulations and safety standards.

## 🚀 Features

- **Safe & Compliant Accommodations** - All listings are verified for safety standards and local compliance
- **Verified Local Hosts** - Connect with trusted hosts who know Baguio City
- **Budget-Friendly Options** - Find accommodations that fit your budget without sacrificing quality
- **Multiple Property Types** - Apartments, transients, and hotels
- **User Testimonials** - Real reviews from students and tourists
- **Responsive Design** - Optimized for desktop, tablet, and mobile devices

## 🛠️ Tech Stack

- **Framework**: [Next.js 15.5.4](https://nextjs.org/) with App Router
- **Runtime**: React 19.1.0
- **Language**: TypeScript
- **Styling**: [Tailwind CSS 4](https://tailwindcss.com/)
- **Font**: [Lexend](https://fonts.google.com/specimen/Lexend) from Google Fonts
- **Build Tool**: Turbopack (Next.js built-in)
- **Linting**: ESLint with Next.js configuration

## 📁 Project Structure

```
trapihaus/
├── public/                     # Static assets
│   ├── apartments.jpg         # Apartment category image
│   ├── hotels.jpg            # Hotel category image
│   ├── lastbg.jpg           # Call-to-action background
│   ├── logo.png             # Trapihaus logo
│   ├── transients.jpg       # Transient category image
│   ├── trapihaus-hero.jpg   # Hero section background
│   └── Vector (1).png       # Additional graphics
├── src/
│   └── app/
│       ├── components/        # React components
│       │   ├── Cats.tsx      # Property categories
│       │   ├── Footerr.tsx   # Footer with links & contact
│       │   ├── Hero.tsx      # Hero section with search
│       │   ├── HowItWorks.tsx # Process explanation
│       │   ├── JoinUs.tsx    # Testimonials carousel
│       │   ├── Lastt.tsx     # Call-to-action section
│       │   ├── Navbar.tsx    # Navigation header
│       │   ├── TopPicks.tsx  # Featured properties
│       │   └── WhyChoose.tsx # Value propositions
│       ├── globals.css       # Global styles
│       ├── layout.tsx        # Root layout
│       └── page.tsx          # Home page
├── package.json              # Dependencies & scripts
├── tailwind.config.js        # Tailwind configuration
├── tsconfig.json            # TypeScript configuration
├── next.config.ts           # Next.js configuration
├── postcss.config.mjs       # PostCSS configuration
└── eslint.config.mjs        # ESLint configuration
```

## 🎨 Components Overview

### Core Components

- **`Navbar`** - Navigation header with logo and branding
- **`Hero`** - Landing section with search functionality and key features
- **`WhyChoose`** - Three-column feature showcase with animations
- **`TopPicks`** - Property carousel with tabs (Apartments, Transients, Hotels)
- **`Cats`** - Property category cards with images
- **`HowItWorks`** - Step-by-step process explanation
- **`JoinUs`** - Customer testimonials with pagination
- **`Lastt`** - Call-to-action section with background image
- **`Footerr`** - Footer with links, contact info, and social media

### Design Features

- **Responsive Design** - Mobile-first approach with Tailwind CSS
- **Interactive Elements** - Hover effects, transitions, and animations
- **Color Scheme** - Blue (#1078CF), Green (#83C12C), and Orange (#F68109) brand colors
- **Typography** - Lexend font family for optimal readability
- **Visual Hierarchy** - Clear section organization and content flow

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/Inv8Solutions/trapihaus.git
   cd trapihaus
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Run the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

### Available Scripts

- `npm run dev` - Start development server with Turbopack
- `npm run build` - Create production build
- `npm run start` - Start production server
- `npm run lint` - Run ESLint for code quality

## 🎯 Key Sections

### 1. Hero Section
- Eye-catching headline and value proposition
- Search functionality placeholder
- Key feature highlights with icons
- Call-to-action button

### 2. Why Choose Trapihaus
- Three main value propositions:
  - Safe & Compliant accommodations
  - Verified Local Hosts
  - Budget-Friendly Stays
- Animated feature cards with connecting lines

### 3. Top Picks
- Tabbed interface for different property types
- Property cards with ratings and amenities
- Navigation arrows for browsing
- "View All Properties" call-to-action

### 4. Property Categories
- Visual cards for Apartments, Transients, and Hotels
- Engaging descriptions for each category

### 5. How It Works
- Step-by-step process explanation
- Clear workflow for users

### 6. Customer Testimonials
- Real user reviews with photos
- Pagination through multiple testimonial sets
- Mix of English and Filipino testimonials
- Student and tourist perspectives

### 7. Call-to-Action
- Mountain landscape background
- Dual action buttons for guests and hosts
- Compelling final message

## 📱 Responsive Design

The website is fully responsive with breakpoints:
- **Mobile**: < 768px
- **Tablet**: 768px - 1024px  
- **Desktop**: 1024px+

## 🎨 Brand Colors

- **Primary Blue**: #1078CF
- **Success Green**: #83C12C
- **Accent Orange**: #F68109
- **Background Gray**: #F9FAFB

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is proprietary and belongs to Inv8Solutions.

## 📞 Contact

**Trapihaus Team**
- 📍 Baguio City, Philippines
- 📞 +63 912 4567 890
- 📧 Trapihaus@Email.Com

---

*Built with ❤️ for the Baguio City community*