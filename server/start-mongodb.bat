@echo off
echo Starting MongoDB...

if not exist "DB" mkdir DB
mongod --dbpath=DB
:finish
pause