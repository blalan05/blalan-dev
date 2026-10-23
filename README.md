# Blalan.dev - Portfolio Website

A modern, responsive portfolio website built with SvelteKit, TypeScript, and Tailwind CSS.

## ✨ Features

- **Modern Design**: Clean, professional layout with smooth animations
- **Responsive**: Optimized for all device sizes
- **SvelteKit**: Fast, modern web framework
- **TypeScript**: Type-safe development
- **Tailwind CSS**: Utility-first styling
- **FontAwesome Icons**: Beautiful, scalable icons
- **Contact Form**: Interactive contact form
- **Smooth Scrolling**: Navigation with smooth scroll behavior
- **Mobile-First**: Responsive navigation with mobile menu

## 🚀 Sections

- **Hero**: Eye-catching introduction with profile image
- **About**: Skills showcase and technology stack
- **Portfolio**: Project gallery with live demos and source code links
- **Contact**: Contact form and information

## 🛠️ Tech Stack

- **Frontend**: SvelteKit, TypeScript
- **Styling**: Tailwind CSS
- **Icons**: FontAwesome (svelte-fa)
- **Fonts**: Inter (Google Fonts)
- **Build Tool**: Vite

## 📦 Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm, yarn, or pnpm

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd blalan-dev
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and visit `http://localhost:5173`

## 🏗️ Building for Production

Create a production build:

```bash
npm run build
```

Preview the production build:

```bash
npm run preview
```

## 📁 Project Structure

```
src/
├── lib/
│   └── components/
│       ├── AboutSection.svelte
│       ├── PortfolioSection.svelte
│       └── ContactSection.svelte
├── routes/
│   ├── +layout.svelte
│   └── +page.svelte
├── app.css
├── app.html
└── app.d.ts
static/
├── logo.svg
├── profile-avatar.jpg
├── home.jpg
└── favicon.ico
```

## 🎨 Customization

### Colors
Update the color scheme in `tailwind.config.js`:

```javascript
colors: {
  primary: {
    50: '#eff6ff',
    500: '#3b82f6',
    600: '#2563eb',
    // ... add more shades
  },
}
```

### Content
- Update personal information in `src/routes/+page.svelte`
- Modify projects in `src/lib/components/PortfolioSection.svelte`
- Change skills in `src/lib/components/AboutSection.svelte`
- Update contact info in `src/lib/components/ContactSection.svelte`

### Images
Replace images in the `static/` directory:
- `logo.svg` - Your logo
- `profile-avatar.jpg` - Your profile photo
- `home.jpg` - Project thumbnails

## 📱 Mobile Responsive

The portfolio is fully responsive with:
- Mobile-first design approach
- Hamburger menu for mobile navigation
- Optimized touch targets
- Responsive typography and spacing

## 🌐 Deployment

This project can be deployed to various platforms:

- **Vercel**: `npm run build` then deploy the `build/` folder
- **Netlify**: Connect your Git repository for automatic deploys
- **GitHub Pages**: Use the static adapter and deploy to gh-pages
- **Cloudflare Pages**: Connect repository for automatic builds

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

---

Built with ❤️ using SvelteKit