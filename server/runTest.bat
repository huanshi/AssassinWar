@echo off

set GOPATH=%GOPATH%;%cd%
go test ./...

pause