package game

func Infof(format string, args ...interface{}) {
    if CurrentContext != nil {
        CurrentContext.Infof(format, args)
    }
}