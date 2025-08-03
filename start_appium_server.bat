@echo off
ECHO Starting Appium servers...

:: Open first terminal and start Appium on port 4724
start cmd /k appium --port 4724 --base-path /wd/hub

:: Wait briefly to ensure the first command starts
timeout /t 2

:: Open second terminal and start Appium on port 4725
start cmd /k appium --port 4725 --base-path /wd/hub

ECHO Appium servers started.
exit