@echo off

set GOPATH=%GOPATH%;%cd%\server\
goapp deploy

pause