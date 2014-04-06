package testUtil

import (
    "testing"
)

func TestAssertEqual(t *testing.T) {
    AssertEqual(1, 1, "TestAssertEqual", t)
    AssertEqual("str", "str", "TestAssertEqual", t)
}