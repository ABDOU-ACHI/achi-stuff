@echo off
REM Ethical Hacking Academy - Quick Start Script for Windows
echo.
echo  ╔══════════════════════════════════════════════════════════════╗
echo  ║                  ETHICAL HACKING ACADEMY                     ║
echo  ║               Quick Start Development Server                  ║
echo  ╚══════════════════════════════════════════════════════════════╝
echo.

REM Check if Python is installed
python --version >nul 2>&1
if errorlevel 1 (
    echo ❌ Python is not installed or not in PATH
    echo Please install Python 3.6 or higher from https://python.org
    echo.
    pause
    exit /b 1
)

REM Check if we're in the right directory
if not exist "index.html" (
    echo ❌ Error: index.html not found
    echo Please run this script from the ethical-hacking-academy directory
    echo.
    pause
    exit /b 1
)

echo ✅ Python is installed
echo ✅ Project files found
echo.
echo 🚀 Starting Ethical Hacking Academy...
echo 🌐 The website will open in your default browser
echo 📚 Press Ctrl+C in this window to stop the server
echo.

REM Start the development server
python deploy.py

pause