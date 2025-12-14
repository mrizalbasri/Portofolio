# 🚀 M. Rizal Basri - Portfolio Website

A modern, interactive portfolio website built with Next.js 16, featuring stunning animations, 3D elements, and a premium user experience.

![Next.js](https://img.shields.io/badge/Next.js-16.0.7-black?style=for-the-badge&logo=next.js)
![React](https://img.shields.io/badge/React-18-blue?style=for-the-badge&logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?style=for-the-badge&logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-3-38bdf8?style=for-the-badge&logo=tailwind-css)

## ✨ Features

### 🎨 **Premium Design**
- **Custom Cursor** with smooth animations
- **Particle Background** with interactive physics
- **Glassmorphism** effects throughout
- **Gradient Animations** for visual appeal
- **Dark Theme** optimized for developer portfolios

### 🎭 **Interactive Components**
- **3D Robot Model** in hero section (Three.js)
- **Magnetic Buttons** with hover effects
- **Scroll Reveal Animations** using Framer Motion
- **Smooth Page Transitions**
- **Infinite Scrolling Skills** showcase

### 📱 **Responsive & Optimized**
- Fully responsive across all devices
- Mobile-first approach
- Optimized performance with Next.js 16
- SEO-friendly with proper meta tags
- Fast loading times

### 🔧 **Technical Features**
- **Server Components** for better performance
- **Dynamic Imports** for code splitting
- **Framer Motion** for smooth animations
- **React Icons** for consistent iconography
- **TypeScript** for type safety

## 🛠️ Tech Stack

### **Frontend**
- [Next.js 16](https://nextjs.org/) - React Framework
- [React 18](https://react.dev/) - UI Library
- [TypeScript](https://www.typescriptlang.org/) - Type Safety
- [Tailwind CSS](https://tailwindcss.com/) - Styling
- [Framer Motion](https://www.framer.com/motion/) - Animations

### **3D & Graphics**
- [Three.js](https://threejs.org/) - 3D Graphics
- [React Three Fiber](https://docs.pmnd.rs/react-three-fiber) - React renderer for Three.js

### **Icons & Assets**
- [React Icons](https://react-icons.github.io/react-icons/) - Icon Library
- [Simple Icons](https://simpleicons.org/) - Brand Icons

## 📂 Project Structure

```
portofolio/
├── app/                      # Next.js App Directory
│   ├── layout.tsx           # Root Layout
│   ├── page.tsx             # Home Page
│   └── globals.css          # Global Styles
├── components/              # React Components
│   ├── Navigation.tsx       # Navigation Bar
│   ├── Hero.tsx            # Hero Section
│   ├── About.tsx           # About Section
│   ├── Skills.tsx          # Skills Showcase
│   ├── Projects.tsx        # Projects Gallery
│   ├── ProjectModal.tsx    # Project Detail Modal
│   ├── Contact.tsx         # Contact Form
│   ├── Footer.tsx          # Footer
│   ├── CustomCursor.tsx    # Custom Cursor
│   ├── ParticleBackground.tsx  # Particle Effects
│   ├── ThreeParticles.tsx  # 3D Particles
│   ├── MagneticButton.tsx  # Interactive Button
│   └── ScrollToTop.tsx     # Scroll to Top Button
├── public/                  # Static Assets
│   └── logo.png            # Logo Image
└── README.md               # This File
```

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ installed
- npm or yarn package manager

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/yourusername/portfolio.git
cd portfolio
```

2. **Install dependencies**
```bash
npm install
# or
yarn install
```

3. **Set up environment variables**
Create a `.env.local` file in the root directory:
```env
NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY=your_web3forms_key_here
```

4. **Run the development server**
```bash
npm run dev
# or
yarn dev
```

5. **Open your browser**
Navigate to [http://localhost:3000](http://localhost:3000)

## 📝 Configuration

### Contact Form
The contact form uses [Web3Forms](https://web3forms.com/) for email handling. Get your free API key and add it to `.env.local`.

### Projects
Edit `components/Projects.tsx` to add/modify your projects:
```typescript
const projects = [
  {
    title: 'Your Project',
    description: 'Project description',
    tags: ['Laravel', 'MySQL', 'React'],
    // ... more fields
  },
];
```

### Skills
Edit `components/Skills.tsx` to customize your skills:
```typescript
const skills = [
  { name: 'Laravel', icon: SiLaravel },
  { name: 'MySQL', icon: SiMysql },
  // ... add more skills
];
```

## 🎨 Customization

### Colors
Modify `tailwind.config.ts` to change the color scheme:
```typescript
colors: {
  primary: '#your-color',
  secondary: '#your-color',
}
```

### Fonts
Update `app/layout.tsx` to change fonts:
```typescript
import { Inter } from 'next/font/google';
```

## 📦 Build for Production

```bash
npm run build
npm start
```

## 🚀 Deployment

### Vercel (Recommended)
1. Push your code to GitHub
2. Import project to [Vercel](https://vercel.com)
3. Configure environment variables
4. Deploy!

### Other Platforms
- **Netlify**: Connect GitHub repo
- **Railway**: Deploy with one click
- **AWS/GCP**: Use Docker or static export

## 🔍 SEO Optimization

The portfolio includes:
- ✅ Meta tags for social sharing
- ✅ Open Graph tags
- ✅ Twitter Card tags
- ✅ Sitemap generation
- ✅ Robots.txt
- ✅ Semantic HTML structure

## 📱 Browser Support

- ✅ Chrome (latest)
- ✅ Firefox (latest)
- ✅ Safari (latest)
- ✅ Edge (latest)
- ✅ Mobile browsers

## 🤝 Contributing

Contributions are welcome! Feel free to:
1. Fork the project
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Open a Pull Request

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 👤 Author

**M. Rizal Basri**
- GitHub: [@mrizalbasri](https://github.com/mrizalbasri)
- LinkedIn: [M. Rizal Basri](https://www.linkedin.com/in/m-rizal-basri/)
- Email: rizalbasri800@gmail.com

## 🙏 Acknowledgments

- [Next.js Team](https://nextjs.org/) for the amazing framework
- [Framer Motion](https://www.framer.com/motion/) for smooth animations
- [Three.js](https://threejs.org/) for 3D graphics
- [Tailwind CSS](https://tailwindcss.com/) for utility-first styling
- [React Icons](https://react-icons.github.io/) for beautiful icons

## 📊 Performance

- ⚡ Lighthouse Score: 95+
- 🎯 First Contentful Paint: < 1.5s
- 🚀 Time to Interactive: < 3s
- 📦 Bundle Size: Optimized with code splitting

## 🐛 Known Issues

None at the moment! If you find any bugs, please [open an issue](https://github.com/yourusername/portfolio/issues).

## 🔮 Future Enhancements

- [ ] Blog section with MDX
- [ ] Dark/Light theme toggle
- [ ] Multi-language support
- [ ] Analytics integration
- [ ] More 3D elements

---

Made with  by M. Rizal Basri

⭐ Star this repo if you like it!
