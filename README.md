# DEALZY | Discover Local. Shop Smart.

Dealzy is a modern web platform connecting shoppers with local neighborhood stores, exclusive discounts, and verified in-store voucher deals.

## Project Structure

The project is built with lightweight, fast, modern HTML5, CSS3, and JavaScript:

- `index.html` - Interactive video splash loader screen that automatically transitions to the login screen.
- `login.html` - Authentication and onboarding page with glassmorphism UI, phone/email login, and guest preview.
- `home.html` - Main marketplace featuring curated deals, verified stores, category filters, and offer voucher modals.
- `store.html` - Detailed store profile page with inventory catalog, store ratings, timings, in-store extra voucher codes, and Google Maps directions.
- `css/`
  - `style.css` - Core design system, color tokens, typography, and card layouts.
  - `responsive.css` - Mobile, tablet, and desktop responsive breakpoints.
  - `animations.css` - Smooth transitions, hover effects, and keyframe animations.
- `js/`
  - `app.js` - Global application UI logic, modal controls, and state management.
  - `stores-data.js` - Comprehensive store directory, catalog data, and in-store voucher definitions.
- `assets/`
  - `images/` - Brand logos and background artwork.
  - `videos/` - Splash intro video.

## Getting Started

Because Dealzy runs entirely on standard web technologies with no build steps, you can run it using any static server or open it directly in your browser:

### Using Python (recommended for local video/asset serving)
```bash
python3 -m http.server 8000
```
Then visit: [http://localhost:8000](http://localhost:8000)

### Or Open Directly
Double-click `index.html` to open it in your default web browser.
