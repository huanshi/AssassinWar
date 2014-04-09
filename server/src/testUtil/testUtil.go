package testUtil

import (
    "testing"
    "runtime/debug"
)

// support int and string to compare
func AssertEqual(expected interface{}, actual interface{}, testName string, t *testing.T) {
    switch expected.(type) {
        case string:
        if actual != expected {
            t.Logf("%s: expect value %s, but it is %s", testName, expected, actual)
            debug.PrintStack()
            t.Fail()
        }
        case int:
        if actual != expected {
            t.Logf("%s: expect value %d, but it is %d", testName, expected, actual)
            debug.PrintStack()
            t.Fail()
        }
    }
}