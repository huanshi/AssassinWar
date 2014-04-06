@echo off

set GOPATH=%GOPATH%;%cd%
go build ./...

pause