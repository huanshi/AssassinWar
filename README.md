#AssassinWar
It's a game. To run this game, please open **main.html**. 

##Develop Document

###About Test
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

###About Code Directory
* **js/main.js** is the entry of code.
* **js/thirdpartylib** contains all third party libraries.
* **js/lib** contains all own libraries of web game.
* **js/module** contains all code about this game.


##Lisence

MIT
