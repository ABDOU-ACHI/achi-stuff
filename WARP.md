# WARP.md

This file provides guidance to WARP (warp.dev) when working with code in this repository.

## Quick Start - Opening the Site

### Windows Users (Recommended)
```bash
# Quick start - double-click or run from command line
.\start.bat
```
This automatically starts the server and opens your browser.

### Cross-Platform Options
```bash
# Primary method - uses custom deployment script
python deploy.py

# Custom port
python deploy.py --port 3000

# Don't open browser automatically
python deploy.py --no-browser

# Simple Python HTTP server
python -m http.server 8000
```

### What to Expect
- Server starts on `http://localhost:8000` (or your chosen port)
- Browser opens automatically (unless using `--no-browser`)
- Ethical Hacking Academy homepage loads
- Press `Ctrl+C` in terminal to stop the server

### Troubleshooting
- **Python not found**: Install Python 3.6+ and add to PATH
- **Port in use**: Try `python deploy.py --port 8080`
- **Check Python version**: `python --version`

## Project Overview

The Ethical Hacking Academy is a static educational website focused on ethical hacking, penetration testing, and cybersecurity education with Red Hat certification pathways. It's built using vanilla HTML, CSS, and JavaScript with a cybersecurity-themed design system and interactive learning features.

## Complete Development Workflow

### Starting Development
```bash
# Windows - Quick start (recommended)
.\start.bat

# Cross-platform - Full featured server
python deploy.py

# Custom configurations
python deploy.py --port 3000 --no-browser
```

### Development Server Options
```bash
# Full-featured development server with validation
python deploy.py

# Simple HTTP server (basic alternative)
python -m http.server 8000

# Custom port (if 8000 is in use)
python deploy.py --port 3000

# Start without opening browser
python deploy.py --no-browser
```

### Build & Deployment
```bash
# Create production build (copies files to dist/)
python deploy.py --build

# Prepare for GitHub Pages deployment
python deploy.py --deploy github

# Show all deployment options
python deploy.py --deploy info
```

### Project Validation & Tools
```bash
# Validate project structure and dependencies
python deploy.py --help

# Check Python version (requires 3.6+)
python --version

# Validate all required files exist
python deploy.py --build  # This also validates structure
```

### Development Environment Setup
```bash
# 1. Ensure you're in the project directory
cd C:\Users\abdel\ethical-hacking-academy

# 2. Verify Python installation
python --version  # Should show 3.6 or higher

# 3. Check project structure
dir  # Should see index.html, deploy.py, css/, js/, etc.

# 4. Start development server
.\start.bat  # Windows
# OR
python deploy.py  # Cross-platform

# 5. Open browser to http://localhost:8000
```

## Architecture & Code Structure

### Frontend Architecture
- **Static Site**: Pure HTML/CSS/JavaScript with no build system dependencies
- **Progressive Enhancement**: Core functionality works without JavaScript
- **Component-Based CSS**: Uses CSS custom properties (CSS variables) for theming
- **Responsive Design**: Mobile-first approach with CSS Grid and Flexbox

### Key Files & Purpose
- `index.html` - Homepage with hero section and feature overview
- `roadmap.html` - Interactive learning path with progress tracking
- `tools.html` - Comprehensive tool documentation and guides
- `css/styles.css` - Complete styling system with cybersecurity theme
- `js/main.js` - All interactive functionality and progress tracking
- `deploy.py` - Full-featured development server with validation and deployment

### Design System
- **Theme**: Cybersecurity-inspired with matrix green (`#00ff41`) primary color
- **Color Palette**: Dark backgrounds with neon accents (green, blue, red)
- **Typography**: System fonts with strong hierarchy
- **Components**: Cards, buttons, timelines, progress bars, navigation

### JavaScript Architecture
The `main.js` file implements several key systems:

1. **ProgressTracker Class**: Local storage-based learning progress tracking
2. **SearchSystem Class**: Content search across modules, tools, certifications
3. **Navigation System**: Mobile hamburger menu and smooth scrolling
4. **Animation System**: Intersection Observer for scroll-based animations
5. **Theme System**: Light/dark theme toggle functionality

### CSS Architecture
- **CSS Custom Properties**: Comprehensive theming system
- **Component Classes**: Modular, reusable components
- **Responsive Design**: Mobile-first with systematic breakpoints
- **Animation System**: Keyframe animations and transitions
- **Dark/Light Theme**: CSS variable switching for theme toggle

## Development Patterns

### HTML Structure
- Semantic HTML5 with proper accessibility attributes
- Modular sections with consistent class naming
- Icon integration using Font Awesome
- Meta tags for SEO and social sharing

### CSS Patterns
- BEM-like naming convention for components
- CSS Grid for complex layouts, Flexbox for component alignment
- Custom properties for consistent spacing and colors
- Responsive design using `clamp()`, `min()`, `max()` functions

### JavaScript Patterns
- Class-based architecture for major features
- Event delegation for dynamic content
- Local storage for persistent data
- Promise-based patterns where applicable
- Console branding and developer messages

## Content Management

### Adding New Learning Modules
1. Update progress tracking totals in `ProgressTracker` class
2. Add module cards to appropriate HTML pages
3. Update search system content arrays
4. Add corresponding CSS classes if needed

### Adding New Tools Documentation
1. Create tool card structure in `tools.html`
2. Follow established patterns: header, content, features, commands
3. Update search system with new tool entries
4. Use consistent iconography and styling

### Theme Customization
- Modify CSS custom properties in `:root` selector
- Light theme variants available via `.light-theme` class
- Color system uses semantic naming (primary, secondary, accent)

## Testing & Validation

### Browser Testing
- Test in Chrome, Firefox, Safari, Edge
- Validate responsive design on mobile devices
- Check accessibility with screen readers
- Verify performance on slower connections

### Content Validation
The `deploy.py` script includes validation for:
- Required file structure
- Python dependencies
- Git repository status
- Project integrity checks

### Manual Testing Checklist
- Navigation functionality (including mobile hamburger)
- Progress tracking and local storage persistence
- Search functionality across different content types
- Theme toggle functionality
- Form interactions and animations
- Cross-browser compatibility

## Important Implementation Notes

### Security Considerations
- No sensitive data in code (educational content only)
- Local storage used only for progress tracking
- No external API calls or data collection
- Safe external links with appropriate `rel` attributes

### Performance Optimizations
- Minimal external dependencies (only Font Awesome icons)
- Optimized images and assets
- CSS and JavaScript served from single files
- Browser caching headers in development server

### Accessibility Features
- Semantic HTML structure
- ARIA labels where appropriate
- Keyboard navigation support
- High contrast color schemes
- Responsive font sizing

### Browser Compatibility
- Modern browsers (Chrome 80+, Firefox 75+, Safari 13+, Edge 80+)
- Progressive enhancement for older browsers
- CSS Grid and Flexbox with fallbacks
- ES6+ JavaScript with graceful degradation

## Deployment Notes

### GitHub Pages
- Static site compatible with GitHub Pages
- Use `python deploy.py --deploy github` for setup
- No build process required
- Works with custom domains

### Alternative Hosting
- Any static site hosting service (Netlify, Vercel, etc.)
- Simply serve the root directory
- No server-side requirements
- CDN-friendly architecture

## Common Issues & Solutions

### Server Won't Start
```bash
# Error: Python not found
# Solution: Install Python 3.6+ from python.org and add to PATH

# Error: Port 8000 already in use
python deploy.py --port 8080  # Try different port

# Error: Permission denied
# Solution: Run terminal as administrator (Windows)

# Error: Module not found
# Solution: Ensure you're in the correct directory
cd C:\Users\abdel\ethical-hacking-academy
```

### Browser Issues
```bash
# Browser doesn't open automatically
python deploy.py --no-browser
# Then manually go to http://localhost:8000

# Site doesn't load properly
# Clear browser cache and reload
# Try incognito/private browsing mode

# JavaScript not working
# Check browser console (F12) for errors
# Ensure JavaScript is enabled
```

### File Permission Issues
```bash
# Windows: Files not accessible
# Run PowerShell as Administrator

# Files missing after git clone
git status  # Check if all files downloaded
git pull    # Get latest changes
```

### Development Workflow
```bash
# Typical development session:
# 1. Navigate to project
cd C:\Users\abdel\ethical-hacking-academy

# 2. Start server
.\start.bat

# 3. Make changes to HTML/CSS/JS files
# 4. Refresh browser to see changes
# 5. Stop server with Ctrl+C when done
```

The project emphasizes educational value, ethical hacking principles, and responsible disclosure throughout all content and interactions.
