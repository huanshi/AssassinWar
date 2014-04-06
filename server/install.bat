@echo off

set GOPATH=%GOPATH%;%cd%
go install ./...

pause