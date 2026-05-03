@echo off
echo Starting Haseri Backend Development Server...
echo Press Ctrl+C to stop.

:loop
php -S 127.0.0.1:8000 public/index.php
echo.
echo [WARNING] PHP Development Server stopped or crashed. Restarting in 1 second...
timeout /t 1 /nobreak >nul
goto loop
