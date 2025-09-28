#!/usr/bin/env python3
"""
Ethical Hacking Academy - Deployment Script
Simple HTTP server for local development and testing
"""

import http.server
import socketserver
import os
import sys
import webbrowser
import subprocess
from pathlib import Path

class HTTPRequestHandler(http.server.SimpleHTTPRequestHandler):
    """Custom HTTP request handler with proper MIME types"""
    
    def end_headers(self):
        self.send_header('Cache-Control', 'no-cache, no-store, must-revalidate')
        self.send_header('Pragma', 'no-cache')
        self.send_header('Expires', '0')
        super().end_headers()
    
    def guess_type(self, path):
        """Guess the type of a file based on its extension"""
        mime_type, _ = super().guess_type(path)
        
        # Custom MIME types for web development
        if path.endswith('.css'):
            return 'text/css'
        elif path.endswith('.js'):
            return 'application/javascript'
        elif path.endswith('.json'):
            return 'application/json'
        
        return mime_type

def check_dependencies():
    """Check if required dependencies are available"""
    print("🔍 Checking dependencies...")
    
    dependencies = {
        'python': sys.version_info >= (3, 6),
        'git': True  # We'll check this separately
    }
    
    # Check if git is available (for version control)
    try:
        subprocess.run(['git', '--version'], capture_output=True, check=True)
        dependencies['git'] = True
        print("✅ Git is available")
    except (subprocess.CalledProcessError, FileNotFoundError):
        dependencies['git'] = False
        print("⚠️  Git is not available (optional for deployment)")
    
    if dependencies['python']:
        print(f"✅ Python {sys.version.split()[0]} is available")
    else:
        print("❌ Python 3.6+ is required")
        return False
    
    return True

def validate_project_structure():
    """Validate that all required files exist"""
    print("📁 Validating project structure...")
    
    required_files = [
        'index.html',
        'roadmap.html',
        'tools.html',
        'css/styles.css',
        'js/main.js',
        'README.md',
        'package.json'
    ]
    
    missing_files = []
    for file_path in required_files:
        if not Path(file_path).exists():
            missing_files.append(file_path)
    
    if missing_files:
        print("❌ Missing required files:")
        for file in missing_files:
            print(f"   - {file}")
        return False
    
    print("✅ All required files are present")
    return True

def start_development_server(port=8000, open_browser=True):
    """Start a local development server"""
    print(f"🚀 Starting development server on port {port}...")
    
    # Change to the project directory
    os.chdir(Path(__file__).parent)
    
    try:
        with socketserver.TCPServer(("", port), HTTPRequestHandler) as httpd:
            server_url = f"http://localhost:{port}"
            print(f"✅ Server started successfully!")
            print(f"🌐 Access your site at: {server_url}")
            print(f"📚 Ethical Hacking Academy is now running locally")
            print("\nPress Ctrl+C to stop the server\n")
            
            if open_browser:
                print("🖥️  Opening browser...")
                webbrowser.open(server_url)
            
            # Start serving
            httpd.serve_forever()
            
    except OSError as e:
        if "Address already in use" in str(e):
            print(f"❌ Port {port} is already in use. Try a different port:")
            print(f"   python deploy.py --port {port + 1}")
        else:
            print(f"❌ Error starting server: {e}")
    except KeyboardInterrupt:
        print("\n🛑 Server stopped by user")

def create_production_build():
    """Create a production-ready build"""
    print("🏗️  Creating production build...")
    
    build_dir = Path("dist")
    build_dir.mkdir(exist_ok=True)
    
    # Copy essential files
    import shutil
    
    files_to_copy = [
        "index.html",
        "roadmap.html", 
        "tools.html",
        "css",
        "js",
        "README.md"
    ]
    
    for item in files_to_copy:
        src = Path(item)
        dest = build_dir / item
        
        if src.is_file():
            shutil.copy2(src, dest)
        elif src.is_dir():
            if dest.exists():
                shutil.rmtree(dest)
            shutil.copytree(src, dest)
    
    print(f"✅ Production build created in '{build_dir}'")
    return build_dir

def deploy_to_github_pages():
    """Deploy to GitHub Pages (requires git repository)"""
    print("🚀 Preparing for GitHub Pages deployment...")
    
    try:
        # Check if we're in a git repository
        subprocess.run(['git', 'status'], capture_output=True, check=True)
        
        # Create gh-pages branch if it doesn't exist
        try:
            subprocess.run(['git', 'checkout', 'gh-pages'], capture_output=True, check=True)
        except subprocess.CalledProcessError:
            print("📝 Creating gh-pages branch...")
            subprocess.run(['git', 'checkout', '-b', 'gh-pages'], check=True)
        
        print("✅ Ready for GitHub Pages deployment")
        print("\n📋 Next steps:")
        print("1. Push your changes: git add . && git commit -m 'Deploy to GitHub Pages'")
        print("2. Push to GitHub: git push origin gh-pages")
        print("3. Enable GitHub Pages in your repository settings")
        print("4. Your site will be available at: https://yourusername.github.io/ethical-hacking-academy")
        
    except subprocess.CalledProcessError:
        print("❌ Not a git repository. Initialize git first:")
        print("   git init")
        print("   git add .")
        print("   git commit -m 'Initial commit'")

def show_deployment_options():
    """Show available deployment options"""
    print("\n🚀 Deployment Options for Ethical Hacking Academy")
    print("=" * 50)
    print("1. 🖥️  Local Development Server (Recommended for testing)")
    print("2. 🌐 GitHub Pages (Free hosting)")
    print("3. 📦 Netlify Drop (Drag & drop deployment)")
    print("4. 🔧 Custom Server (Copy files to your web server)")
    print("\nFor production deployment:")
    print("• Ensure HTTPS is enabled")
    print("• Configure proper security headers")
    print("• Enable compression (gzip)")
    print("• Set up content delivery network (CDN)")

def main():
    """Main deployment function"""
    import argparse
    
    parser = argparse.ArgumentParser(description='Ethical Hacking Academy Deployment Tool')
    parser.add_argument('--port', type=int, default=8000, help='Port for development server')
    parser.add_argument('--no-browser', action='store_true', help='Don\'t open browser automatically')
    parser.add_argument('--build', action='store_true', help='Create production build')
    parser.add_argument('--deploy', choices=['github', 'info'], help='Deployment option')
    
    args = parser.parse_args()
    
    print("🎯 Ethical Hacking Academy - Deployment Tool")
    print("=" * 50)
    
    # Check dependencies
    if not check_dependencies():
        sys.exit(1)
    
    # Validate project structure
    if not validate_project_structure():
        sys.exit(1)
    
    # Handle different commands
    if args.build:
        build_dir = create_production_build()
        print(f"\n✅ Build completed! Files are in '{build_dir}'")
        
    elif args.deploy == 'github':
        deploy_to_github_pages()
        
    elif args.deploy == 'info':
        show_deployment_options()
        
    else:
        # Default: start development server
        start_development_server(
            port=args.port,
            open_browser=not args.no_browser
        )

if __name__ == "__main__":
    main()