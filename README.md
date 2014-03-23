AssassinWar
=============================
It's a game.

Develop Document
-----------------------------
###About test:
1. To run test, you should open test.html.
2. To add one test, you should add one test file to js\spec\ firstly. Secondly, you should modify test.html, and add the test file to the require section of test.html like this:
```    <script>
            require([
                        // 要执行的测试文件，添加在这里.
                        "spec/personSpec",
                        "spec/projectionSpec"
                    ], function () {
                        jasmine.getEnv().execute();
                    });
    </script>
```

Lisence
-----------------------------
MIT
