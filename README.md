#AssassinWar
It's a game.

##Develop Document

###About test:
* Use **Jasmine** to test, see [detail](http://jasmine.github.io/).
* To run tests, you should open **test.html**.
* To add new test, you should add new test file to **js\spec\** firstly. Secondly, you should modify **test.html**, and add the test file to the require section of **test.html** like this:
```    
    <script>
            require([
                        // 要执行的测试文件，添加在这里.
                        "spec/personSpec",
                        "spec/projectionSpec"
                    ], function () {
                        jasmine.getEnv().execute();
                    });
    </script>
```

##Lisence

MIT
