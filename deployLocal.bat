@echo off

set GOPATH=%GOPATH%;%cd%\server\
dev_appserver.py --port=9090 ./

pause