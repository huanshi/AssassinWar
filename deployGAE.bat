@echo on
set oldGoPath=%GOPATH% 
echo %oldGoPath%
set GOPATH=%oldGoPath%;%cd%\server\
echo %GOPATH%
::set GOPATH=%oldGoPath%

goapp deploy

pause