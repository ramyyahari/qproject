/*********************************************************\
 Author: Q
 Description: Extra controllers for the other pages.
 \*********************************************************/
app.controller('instructionController', ['$scope', '$log', function ($scope, $log) {
    'use strict';
    $log.debug('Instruction controller');
}]);

app.controller('indexController', ['$scope', '$log', function ($scope, $log) {
    'use strict';
    $log.debug('index controller');
}]);


app.controller('overviewController', ['$scope', '$log', 'panelService', function ($scope, $log, panelService) {
    'use strict';
    $log.debug('Overview controller');
}]);

app.controller('analyticsController', ['$scope', '$log', 'panelService', function ($scope, $log, panelService) {
    'use strict';
    $log.debug('Analytics controller');
}]);

app.controller('exampleController', [
    '$scope',
    '$log',
    'panelService',
    function ($scope, $log, panelService) {
        'use strict';
        $log.debug('example controller');
    }
]);

app.controller('pcController', function ($scope) {

    /*
     * Model Variables
     */
    $scope.x = 3;
    $scope.term = 1;
    $scope.contrib = 1;
    $scope.estimate = 1;
    $scope.mathJax = '';
    $scope.difference = 10000;

    /*
     * Model of table
     */
    $scope.table = [];
    $scope.compTable = [];

    /*
     *   Name: Check
     *   Description: Checks user input against actual answer
     */
    $scope.check = function (row) {
        console.log("Contib: " + $scope.table[row].contrib);
        if ($scope.table[row].contrib == $scope.compTable[row].contrib && $scope.table[row].estimate == $scope.compTable[row].estimate) {
            //console.log('Correct!');
            alert('Correct!');
            $scope.table[row].estimate = $scope.compTable[row].estimate;

            $scope.compTable[row].result = "green";
            $scope.table[row].result = $scope.compTable[row].result;
        }
        else {
            alert('Incorrect!');
        }
    };

    /*
     *   Name: sFact
     *   Description: Computes the factorial of a given value
     */
    function sFact(num) {
        var rval = 1;
        for (var i = 2; i <= num; i++)
            rval = rval * i;
        return rval;
    }

    /*
     *   Name: Init
     *   Description: Initializes table and compTable
     */
    (function init() {
        var difference = 10000;
        var term = 0, contrib = 0, estimate = 0;
        var x = 3;
        var mathjax;

        while (difference > 0.1) {

            var pwr = Math.pow(x, term);
            var fct = sFact(term);
            contrib = pwr / fct;

            var old = estimate;
            estimate += contrib;
            mathjax = old + ' + ' + contrib + ' = ' + estimate;

            difference = estimate - old;
            console.log('Estimate: ' + estimate + ' Old: ' + old);
            $scope.table.push({term: term + 1, contrib: 0, estimate: 0, visible: true, result: "red"});
            $scope.compTable.push({term: term + 1, contrib: contrib, estimate: estimate, result: "red"});
            term += 1;
        }

    })();

    /*
     *   Name: Fill
     *   Description: Used to fill in table as a whole or row by row
     */
    $scope.fill = function (row) {

        if (row || row == 0) {
            $scope.table[row].contrib = $scope.compTable[row].contrib;
            $scope.table[row].estimate = $scope.compTable[row].estimate;
            $scope.table[row].result = $scope.compTable[row].result = "yellow";
            return;
        }

        $scope.table.length = 0;

        while ($scope.difference > 0.1) {

            if ($scope.term == 1) {
                $scope.contrib = 1;
                $scope.estimate = 1;
                $scope.mathJax = $scope.estimate;
            }
            else {
                var pwr = Math.pow($scope.x, $scope.term - 1);
                var fct = sFact($scope.term - 1);
                $scope.contrib = pwr / fct;

                var old = $scope.estimate;
                $scope.estimate += $scope.contrib;
                $scope.mathJax = old + ' + ' + $scope.contrib + ' = ' + $scope.estimate;

                $scope.difference = $scope.estimate - old;
                console.log('Estimate: ' + $scope.estimate + ' Old: ' + old);
            }

            $scope.table.push({term: $scope.term, contrib: $scope.contrib, estimate: $scope.mathJax, result: "yellow"});

            $scope.term += 1;
        }
    }
});

app.controller('myCtrl', function ($scope) {
    $scope.firstRow = "[1, 1, -1]";
    $scope.secondRow = "[1, 0, 1]";
    $scope.thirdRow = "[1, 1, 1 ]";


    var r1;
    var r2;
    var r3;
    var position = 0;

    var bigx = 10;
    var count = 0;
    stage = new createjs.Stage("myCanvas");
    var map = new createjs.Bitmap("./yimg.jpg");

    var ball1 = new createjs.Shape();
    var color = '#' + (Math.random() * 0xFFFFFF << 0).toString(16);
    ball1.graphics.beginFill(color).drawCircle(0, 0, 35);
    ball1.x = 53;
    ball1.y = 43;
    var distance = 97;
    stage.addChild(map);
    stage.update();
    stage.addChild(ball1);
    stage.update();
    $scope.tableArray = [];
    var testArr = [];//JSON.parse($scope.firstRow);
    var tick = 0;
    //var table = {r1:0, r2:0, logic:0, move: 0};


    //var testArr = [0 ,1 ,0 ,1 ,0 ,0, -1 ,0 ,0, 1];
    function table(r1, r2, logic, move, show) {
        this.row1 = r1;
        this.row2 = r2;
        this.logic = logic;
        this.move = move;
        this.show = true;
    }

    //check to see if the guess is correct without going through the animation
    $scope.check = function () {

        reCompute();
        testArr = [];
        position = 0;
        for (var i = 0; i < r1.length; i++) {
            for (var j = 0; j < r2.length; j++) {
                testArr.push(r1[i] * r2[j]);
            }
        }


        var userinput = parseInt($scope.finalPos);

        for (var i = 0; i < testArr.length; i++) {
            position += testArr[i];


        }


        if (position == userinput) {
            $scope.finalPos = "correct!";

        }
        else {
            $scope.finalPos = "incorrect!";

        }


    }

    //when users change their R1,R2 and ect.. we need to parse them again in order to use it as an array
    function reCompute() {
        r1 = JSON.parse($scope.firstRow);
        r2 = JSON.parse($scope.secondRow);
        r3 = JSON.parse($scope.thirdRow);
    }

    function reInit() {
        stage.removeAllChildren();

    }


    //set the time interval for the animation to go by
    createjs.Ticker.setInterval(1000);
    //trigger the timer to start
    $scope.start = function () {

        testArr = [];
        //so we know when to stop by we hit the end of the array
        createjs.Ticker.paused = false;

        //if user doesn't select anything then go with default( option 1)
        if (testArr.length == 0) {
            $scope.opOne();

        }
        //handleTick is where all the animation happens
        createjs.Ticker.addEventListener("tick", handleTick);


    }


    $scope.opOne = function () {
        $scope.tableArray.length = 0;
        reCompute();
        for (var i = 0; i < r1.length; i++) {
            for (var j = 0; j < r2.length; j++) {
                testArr.push(r1[i] * r2[j]);
                /*refer to opTwo and opThree with the same logic
                 * create a new table with r1[i], r2[j], logic and the # of steps to take (move)
                 * add them to our table array and display it in the HTML
                 * */
                var newTable = new table(r1[i], r2[j], "A(i) * A(j)", r1[i] * r2[j], false);
                $scope.tableArray.push(newTable);


            }


        }


    }

    $scope.opTwo = function () {
        $scope.tableArray = [];
        reCompute();
        for (var i = 0; i < r1.length; i++) {
            for (var j = 0; j < r2.length; j++) {
                testArr.push((r1[i] * 2 * r2[i]));
                var newTable = new table(r1[i], r2[j], "r1[i] * 2 * r2[i]", r1[i] * 2 * r2[i]);
                $scope.tableArray.push(newTable);


            }


        }


    }

    $scope.opThree = function () {
        $scope.tableArray = [];
        reCompute();
        for (var i = 0; i < r1.length; i++) {
            for (var j = 0; j < r2.length; j++) {
                testArr.push((r1[i] + r2[j]) % 2);
                var newTable = new table(r1[i], r2[j], "(r1[i] + r2[j]) % 2", (r1[i] + r2[j]) % 2);
                $scope.tableArray.push(newTable);


            }


        }


    }


    //ball1.x = 65+(97*15);
    //

    //determine where bulb needs to go
    /*
     $scope.ProcessStep = function (step){

     while(step!=0) {
     //possitive
     if (step > 0) {
     ball1.x += distance;
     // setTimeout(function(){

     stage.update();

     //},1000);
     step -= distance;

     }
     else if(step<0)
     {
     //setTimeout(function(){
     ball1.x -=distance;
     stage.update();
     step += distance;

     //},1000);

     }
     }



     };
     */

    //after getting the final array
    //loop through it
    //and determine if it is == 0 or not
    //then calculate the number of pixels bulb needs to take then process it
    /*    $scope.ProcessX = function (x){
     if(x == 0)
     {//do nothing
     return 0;
     }
     else if(x>0 || x < 0)
     {
     var step = x * distance;
     $scope.ProcessStep(step);

     }



     };*/


    /*    $scope.SaySomething = function (){

     $scope.lastName = "hey"
     var str = $scope.firstName;



     var testArr = [1 ,1 ,1 ,1 ,0 ,0, 0 ,0 ,0, 0];
     setTimeout(function(){
     for(i =0; i<testArr.length; i++)
     {


     //$scope.ProcessX(testArr[i]);
     console.log("inside for: " + i);
     createjs.Ticker.addEventListener("tick", handleTick);

     //console.log(i);
     //testInput();


     }
     },1000);*/


    //stage.update();


    //    stage.addChild(ball1);
    //stage.update();

    //};

    function testInput() {
        console.log("hey");
        console.log("he11111y");
    }

    function handleTick(event) {

        if (createjs.Ticker.paused == false) {


            ball1.x += testArr[count] * 97;
            var color = '#' + (Math.random() * 0xFFFFFF << 0).toString(16);
            ball1.graphics.beginFill(color).drawCircle(0, 0, 35);
            stage.update();
            //$scope.tableArray.push(new table(1,2,"kittens",3 * 4,false));
            //console.log($scope.tableArray[tick]);
            $scope.tableArray[tick].show = false;
            //console.log($scope.tableArray[tick]);
            tick++;
            count++;
            if (count == testArr.length) {
                //$scope.finalPos = "Correct!";


                createjs.Ticker.paused = true;


                //if(position == parseInt($scope.finalPos))
                //{


                //}
                //else
                //{

                //     $scope.finalPos = "WRONGG!";
                // }

            }
        }


        //$scope.ProcessX(testArr[i]);
        //console.log("inside for: " + i);
        //createjs.Ticker.addEventListener("tick", handleTick);

        //console.log(i);
        //testInput();


        /*        if(bigx != 0) {
         testInput();
         bigx--;
         }*/


    }


    // $scope.SaySomething();
    // $scope.SaySomething();


    // $scope.saysomething();

    //$scope.ProcessStep = function (step){


    // };

    // $scope.saysomething();

});

app.controller('conditionalCtrl', ['$scope', 'State', function ($scope, State) {


    $scope.aceOptions = {
        theme: 'crimson_editor',
        mode: 'matlab',
        useWrapMode: true
    };

    $scope.array = [];
    $scope.people = [];
    $scope.correct = false;
    $scope.wrong = false;
    $scope.On = true;
    $scope.conditionalField = "X = 0\n%Set your variables\n";
    var conditionalIndex = 1;
    $scope.expressions = ['>', '<', '>=', '<=', '==', '!=', ''];
    $scope.names = ["Juan's ", "Erick's ", "Q's ", "Zach's ", ""];
    var enteredBool = false;


    $scope.V = function (valueCheck, bool, value) {
        var correctValue = 0;
        //if (valueCheck == false) {
        if (bool == true && valueCheck == 1) {
            correctValue = value;
        }
        else {
            if (i == 0) {
                correctValue = 0;
            }
            else {
                correctValue = $scope.array[i - 1].X;
            }
        }
        //  }
        /*  else {
         if (i == 0) {
         correctValue = 0;
         }
         else {
         correctValue = $scope.array[i - 1].X;
         }
         }*/
        return correctValue;
    };

    $scope.load = function () {

        if (State.tableSave["Condi"] == null) {
            $scope.build();
            State.tableSave["Condi"] = $scope.array;
        }
        else {
            $scope.array = State.tableSave["Condi"];
        }
    };

    $scope.load2 = function () {
        $scope.build();
        State.tableSave["Condi"] = $scope.array;
    };

    $scope.build = function () {


        var choices = ["weight ", "IQ ", "height ", "number of adorable kittens "];
        var statement = ["if ", "else if ", "else ", "end "];

        var expressionText = ['greater than ', 'less than ', 'greater than or equal to ', 'less then or equal to ', 'equal to ', 'not equal to '];

        $scope.array.length = 0;
        var type = choices[Math.floor((Math.random() * 3.25))];
        $scope.people.length = 0;
        var value = 0;
        var conditionCheck = false;
        var valueCheck = 0;
        $scope.correct = false;
        $scope.On = true;
        $scope.conditionalField = "X = 0\n%Set your variables\n";
        var string = "";
        var opposite = "";
        var index = 0;

        for (i = 0; i < 4; i++) {
            value = Math.floor((Math.random() * 300));
            var person = {
                name: $scope.names[i],
                value: value,
                string: $scope.names[i] + type + "equals " + value + "."
            };
            $scope.people.push(person);
        }

        for (i = 0; i < Math.floor((Math.random() * 5) + 3); i++) {
            var expression = Math.floor((Math.random() * 5.999));
            value = Math.floor((Math.random() * 300));
            var correctValue = 0;
            var x = Math.floor((Math.random() * 3.999));
            var y = Math.floor((Math.random() * 3.999));

            index++;


            var bool = true;
            var enteredInput = false;


            var condition = "if ";
            var expressionInput = $scope.expressions[expression];


            if (conditionCheck == false) {
                condition = "if ";
                conditionCheck = true;
                valueCheck = 0;
                index = 1;

                switch ($scope.expressions[expression]) {
                    case '>':
                        bool = ($scope.people[x].value > $scope.people[y].value);
                        opposite = "<=";
                        if (bool && valueCheck == 0) {
                            valueCheck = 1;
                        }
                        else if (valueCheck == 1) {
                            valueCheck = 2;
                        }
                        correctValue = $scope.V(valueCheck, bool, value);
                        break;
                    case '<':
                        bool = ($scope.people[x].value < $scope.people[y].value);
                        opposite = ">=";
                        if (bool && valueCheck == 0) {
                            valueCheck = 1;
                        }
                        else if (valueCheck == 1) {
                            valueCheck = 2;
                        }
                        correctValue = $scope.V(valueCheck, bool, value);
                        break;
                    case '>=':
                        bool = ($scope.people[x].value >= $scope.people[y].value);
                        opposite = "<";
                        if (bool && valueCheck == 0) {
                            valueCheck = 1;
                        }
                        else if (valueCheck == 1) {
                            valueCheck = 2;
                        }
                        correctValue = $scope.V(valueCheck, bool, value);
                        break;
                    case '<=':
                        bool = ($scope.people[x].value <= $scope.people[y].value);
                        opposite = ">";
                        if (bool && valueCheck == 0) {
                            valueCheck = 1;
                        }
                        else if (valueCheck == 1) {
                            valueCheck = 2;
                        }
                        correctValue = $scope.V(valueCheck, bool, value);
                        break;
                    case '!=':
                        bool = ($scope.people[x].value != $scope.people[y].value);
                        opposite = "!=";
                        if (bool && valueCheck == 0) {
                            valueCheck = 1;
                        }
                        else if (valueCheck == 1) {
                            valueCheck = 2;
                        }
                        correctValue = $scope.V(valueCheck, bool, value);
                        break;
                    case '==':
                        bool = ($scope.people[x].value == $scope.people[y].value);
                        opposite = "==";
                        if (bool && valueCheck == 0) {
                            valueCheck = 1;
                        }
                        else if (valueCheck == 1) {
                            valueCheck = 2;
                        }
                        correctValue = $scope.V(valueCheck, bool, value);
                        break;
                }

                if (bool == true) {
                    enteredBool = true;
                }
                enteredInput = true;
                string = condition + $scope.names[x] + type + "is " + expressionText[expression] + $scope.names[y] + type + "then X equals " + value + ".";
            }
            else {
                var state = statement[Math.floor((Math.random() * 2.999))];
                switch (state) {
                    case "if ":
                        condition = "if ";
                        valueCheck = 0;
                        index = 1;
                        string = condition + $scope.names[x] + type + "is " + expressionText[expression] + $scope.names[y] + type + "then X equals " + value + ".";

                        switch ($scope.expressions[expression]) {
                            case '>':
                                bool = ($scope.people[x].value > $scope.people[y].value);
                                opposite = "<=";
                                if (bool && valueCheck == 0) {
                                    valueCheck = 1;
                                }
                                else if (valueCheck == 1) {
                                    valueCheck = 2;
                                }
                                correctValue = $scope.V(valueCheck, bool, value);
                                break;
                            case '<':
                                bool = ($scope.people[x].value < $scope.people[y].value);
                                opposite = ">=";
                                if (bool && valueCheck == 0) {
                                    valueCheck = 1;
                                }
                                else if (valueCheck == 1) {
                                    valueCheck = 2;
                                }
                                correctValue = $scope.V(valueCheck, bool, value);
                                break;
                            case '>=':
                                bool = ($scope.people[x].value >= $scope.people[y].value);
                                opposite = "<";
                                if (bool && valueCheck == 0) {
                                    valueCheck = 1;
                                }
                                else if (valueCheck == 1) {
                                    valueCheck = 2;
                                }
                                correctValue = $scope.V(valueCheck, bool, value);
                                break;
                            case '<=':
                                bool = ($scope.people[x].value <= $scope.people[y].value);
                                opposite = ">";
                                if (bool && valueCheck == 0) {
                                    valueCheck = 1;
                                }
                                else if (valueCheck == 1) {
                                    valueCheck = 2;
                                }
                                correctValue = $scope.V(valueCheck, bool, value);
                                break;
                            case '!=':
                                bool = ($scope.people[x].value != $scope.people[y].value);
                                opposite = "!=";
                                if (bool && valueCheck == 0) {
                                    valueCheck = 1;
                                }
                                else if (valueCheck == 1) {
                                    valueCheck = 2;
                                }
                                correctValue = $scope.V(valueCheck, bool, value);
                                break;
                            case '==':
                                bool = ($scope.people[x].value == $scope.people[y].value);
                                opposite = "==";
                                if (bool && valueCheck == 0) {
                                    valueCheck = 1;
                                }
                                else if (valueCheck == 1) {
                                    valueCheck = 2;
                                }
                                correctValue = $scope.V(valueCheck, bool, value);
                                break;
                        }

                        if (bool == true) {
                            enteredBool = true;
                        }
                        else {
                            enteredBool = false;
                        }
                        enteredInput = true;
                        break;
                    case "else if ":
                        condition = "else if ";
                        string = condition + $scope.names[x] + type + "is " + expressionText[expression] + $scope.names[y] + type + "then X equals " + value + ".";

                        switch ($scope.expressions[expression]) {
                            case '>':
                                bool = ($scope.people[x].value > $scope.people[y].value);
                                opposite = "<=";
                                if (bool && valueCheck == 0) {
                                    valueCheck = 1;
                                }
                                else if (valueCheck == 1) {
                                    valueCheck = 2;
                                }
                                correctValue = $scope.V(valueCheck, bool, value);
                                break;
                            case '<':
                                bool = ($scope.people[x].value < $scope.people[y].value);
                                opposite = ">=";
                                if (bool && valueCheck == 0) {
                                    valueCheck = 1;
                                }
                                else if (valueCheck == 1) {
                                    valueCheck = 2;
                                }
                                correctValue = $scope.V(valueCheck, bool, value);
                                break;
                            case '>=':
                                bool = ($scope.people[x].value >= $scope.people[y].value);
                                opposite = "<";
                                if (bool && valueCheck == 0) {
                                    valueCheck = 1;
                                }
                                else if (valueCheck == 1) {
                                    valueCheck = 2;
                                }
                                correctValue = $scope.V(valueCheck, bool, value);
                                break;
                            case '<=':
                                bool = ($scope.people[x].value <= $scope.people[y].value);
                                opposite = ">";
                                if (bool && valueCheck == 0) {
                                    valueCheck = 1;
                                }
                                else if (valueCheck == 1) {
                                    valueCheck = 2;
                                }
                                correctValue = $scope.V(valueCheck, bool, value);
                                break;
                            case '!=':
                                bool = ($scope.people[x].value != $scope.people[y].value);
                                opposite = "!=";
                                if (bool && valueCheck == 0) {
                                    valueCheck = 1;
                                }
                                else if (valueCheck == 1) {
                                    valueCheck = 2;
                                }
                                correctValue = $scope.V(valueCheck, bool, value);
                                break;
                            case '==':
                                bool = ($scope.people[x].value == $scope.people[y].value);
                                opposite = "==";
                                if (bool && valueCheck == 0) {
                                    valueCheck = 1;
                                }
                                else if (valueCheck == 1) {
                                    valueCheck = 2;
                                }
                                correctValue = $scope.V(valueCheck, bool, value);
                                break;
                        }

                        if (enteredBool == false) {
                            enteredInput = true;
                        }
                        if (bool == true) {
                            enteredBool = true;
                        }
                        break;
                    case "else ":
                        condition = "else ";
                        if (valueCheck == 0) {
                            enteredInput = true;
                            bool = true;
                        }
                        else {
                            bool = false;
                        }
                        if (bool && valueCheck == 0) {
                            valueCheck = 1;
                        }
                        else if (valueCheck == 1) {
                            valueCheck = 2;
                        }

                        enteredBool = false;
                        correctValue = $scope.V(valueCheck, bool, value);
                        conditionCheck = false;
                        string = "else X equals " + value + ".";
                        expressionInput = "";
                        x = 4;
                        y = 4;

                        break;
                }
            }


            var object = {
                index: index,
                show: false,
                string: string,
                condition: condition,
                bool: bool,
                boolInput: "true",
                expression: expressionInput,
                opposite: opposite,
                right: false,
                wrong: false,
                X: correctValue.toString(),
                XInput: "",
                enteredString: "False",
                enteredBool: enteredInput,
                nameX: x,
                nameY: y,
                name1: $scope.names[4],
                name2: $scope.names[4],
                exp: $scope.expressions[6]
            };

            $scope.array.push(object);
        }

        //$scope.array[0].show = true;

        document.body.scrollTop = document.documentElement.scrollTop = 0;
    };

    $scope.load();

    $scope.boolChange = function (index) {
        if ($scope.array[index].boolInput == "true") {
            $scope.array[index].boolInput = "false";
        }
        else {
            $scope.array[index].boolInput = "true";
        }
    };

    $scope.check = function (index) {
        console.log($scope.array);
        State.tableSave["Condi"] = $scope.array;
        var item = $scope.array[index];


        if (item.enteredBool == item.show) {
            if (item.enteredBool == true) {
                if (($scope.names[item.nameX] == item.name1 && $scope.names[item.nameY] == item.name2 && (item.expression == item.exp)) || ($scope.names[item.nameY] == item.name1 && $scope.names[item.nameX] == item.name2 && (item.opposite == item.exp))) {
                    if ((item.boolInput == (item.bool).toString()) && (item.X == item.XInput)) {
                        item.right = true;
                        item.wrong = false;
                        return true;
                    }
                }
            }
            else {
                item.right = true;
                item.wrong = false;
                return true;
            }
        }
        item.right = false;
        item.wrong = true;
        return false;

        /* if($scope.array[index].boolInput == ($scope.array[index].bool).toString() && $scope.array[index].expression == $scope.array[index].expressionInput && $scope.array[index].X == $scope.array[index].XInput){
         $scope.array[index].right = true;
         $scope.array[index].wrong = false;
         }
         else{
         $scope.array[index].right = false;
         $scope.array[index].wrong = true;
         }*/
    };

    $scope.Enter = function (index) {
        $scope.array[index].show = !$scope.array[index].show;
        switch ($scope.array[index].show) {
            case false:
                $scope.array[index].enteredString = "False";
                break;
            case true:
                $scope.array[index].enteredString = "True";
                break;
        }
    };

    $scope.Solve = function () {
        var check = true;
        var i = 0;

        while (check == true && i < $scope.array.length) {
            check = $scope.check(i);
            i++;
        }
        if (check == true) {
            $scope.correct = true;
            $scope.wrong = false;
        }
        else {
            $scope.wrong = true;
            $scope.correct = false;
        }
    };

    $scope.text = function (string) {


        switch (string) {
            case "if":
                $scope.conditionalField += "\n%" + conditionalIndex + "\nif %Condition\n\t%Set your X value\n%" + conditionalIndex;
                $scope.On = !$scope.On;
                conditionalIndex++;
                break;
            case "elseif":
                $scope.conditionalField += "\n%" + conditionalIndex + "\nelseif %Condition\n\t%Set your X value\n%" + conditionalIndex;
                $scope.On = !$scope.On;
                conditionalIndex++;
                break;
            case "else":
                $scope.conditionalField += "\n%" + conditionalIndex + "\nelse \n\t%Set your X value\nend\n%" + conditionalIndex;
                conditionalIndex++;
                break;
            case "end":
                $scope.conditionalField += "\n%" + conditionalIndex + "\nend\n%" + conditionalIndex;
                conditionalIndex++;
                break;
            case "<":
                $scope.conditionalField = $scope.conditionalField.replace("%Condition", "%variable1 < %variable2");
                $scope.On = !$scope.On;
                break;
            case ">":
                $scope.conditionalField = $scope.conditionalField.replace("%Condition", "%variable1 > %variable2");
                $scope.On = !$scope.On;
                break;
            case "<=":
                $scope.conditionalField = $scope.conditionalField.replace("%Condition", "%variable1 <= %variable2");
                $scope.On = !$scope.On;
                break;
            case ">=":
                $scope.conditionalField = $scope.conditionalField.replace("%Condition", "%variable1 >= %variable2");
                $scope.On = !$scope.On;
                break;
            case "==":
                $scope.conditionalField = $scope.conditionalField.replace("%Condition", "%variable1 == %variable2");
                $scope.On = !$scope.On;
                break;
            case "!=":
                $scope.conditionalField = $scope.conditionalField.replace("%Condition", "%variable1 != %variable2");
                $scope.On = !$scope.On;
                break;
            case "reset":
                $scope.conditionalField = "X = 0\n%Set your variables\n";
                $scope.On = true;
                conditionalIndex = 1;
                break;
        }
    };

}]);

app.controller('formCtrl', ['$scope', 'State', function ($scope, State) {
    /*var options = [
     {title:"main", string:"%pseudocode\n X = [63 35 66 75 63 11] \n\n%startloop \n %endloop", replace:""},
     {title:"for", string:"%startloop \n for k = 1 : length(X)\n%startif %endif\n end\n%endloop", replace:/%startloop[\s\S]*%endloop/},
     {title:"while", string:"%startloop \n k = 1\n while k < length(X)\n%startif %endif\n end\n %endloop", replace:/%startloop[\s\S]*%endloop/},
     {title:">", string:"%startif \n if max > X(k)\nelse %endif", replace:/%startif[\s\S]*%endif/},
     {title:"<", string:"%startif \n if max < X(k)\nelse %endif", replace:/%startif[\s\S]*%endif/},
     {title:"==", string:"%startif \n Thats a stupid decision. %endif", replace:/%startif[\s\S]*%endif/}
     ];*/

    $scope.aceOptions = {
        theme: 'crimson_editor',
        mode: 'matlab',
        useWrapMode: true
    };
    //$scope.textField = options[0]["string"];

    $scope.array = [];
    $scope.arrayString = "";
    $scope.type = "min";
    $scope.type2 = "max";
    $scope.textField = "";
    $scope.loopField = "";
    $scope.conditionalField = "";
    $scope.case = ">";
    $scope.mcWrong = false;
    $scope.mcWrite = false;

    //$scope.ran = Math.floor((Math.random()));


    $scope.load = function () {

        if (State.tableSave["pseudo"] == null) {
            $scope.build();
            State.tableSave["pseudo"] = $scope.array;
        }
        else {
            $scope.array = State.tableSave["pseudo"];
        }
    };

    $scope.load2 = function () {
        $scope.build();
        State.tableSave["pseudo"] = $scope.array;
    };

    $scope.build = function () {

        $scope.type = "min";
        $scope.type2 = "max";
        if (Math.random() < 0.5) {
            $scope.type = "max";
            $scope.type2 = "min";
        }

        $scope.array.length = 0;
        $scope.arrayString = "";
        $scope.correct = false;
        $scope.correct2 = false;
        $scope.loopField = "";
        $scope.conditionalField = "";
        $scope.case = ">";
        $scope.textField = "";
        $scope.show = true;
        var min;
        var max;

        for (i = 0; i < Math.floor((Math.random() * 10) + 3); i++) {
            var hide = false;
            var value = Math.floor((Math.random() * 20)) - 10;
            $scope.arrayString += value + ",";
            if (min == null || max == null) {
                min = value;
                max = value;
            }
            if (value < min) {
                min = value;
            }
            if (value > max) {
                max = value;
            }

            if (i == 0) {
                hide = true;
            }

            var object = {
                index: i + 1,
                value: value,
                input: "",
                input2: "",
                valueInput: "",
                decision: "true or false",
                hidden: hide,
                hidden2: hide,
                min: min,
                max: max,
                correct: false,
                wrong: false,
                correct2: false,
                wrong2: false
            };

            $scope.array.push(object);
        }
        document.body.scrollTop = document.documentElement.scrollTop = 0;
    };

    $scope.load();

    $scope.check = function (index) {
        State.tableSave["pseudo"] = $scope.array;
        switch ($scope.type) {
            case "min":
                if ($scope.array[index - 1].input == $scope.array[index - 1].min) {
                    if (index >= $scope.array.length) {
                        $scope.correct = true;
                        $scope.array[index - 1].correct = true;
                        $scope.array[index - 1].wrong = false;
                    }
                    else {
                        $scope.array[index].hidden = true;
                        $scope.array[index - 1].correct = true;
                        $scope.array[index - 1].wrong = false;
                    }
                }
                else {
                    $scope.array[index - 1].correct = false;
                    $scope.array[index - 1].wrong = true;
                }
                break;
            case "max":
                if ($scope.array[index - 1].input == $scope.array[index - 1].max) {
                    if (index >= $scope.array.length) {
                        $scope.correct = true;
                        $scope.array[index - 1].correct = true;
                        $scope.array[index - 1].wrong = false;
                    }
                    else {
                        $scope.array[index].hidden = true;
                        $scope.array[index - 1].correct = true;
                        $scope.array[index - 1].wrong = false;
                    }
                }
                else {
                    $scope.array[index - 1].correct = false;
                    $scope.array[index - 1].wrong = true;
                }
                break;
        }

    };

    $scope.check2 = function (index) {
        var check = 0;
        State.tableSave["pseudo"] = $scope.array;
        switch ($scope.type) {
            case "min":
                if (($scope.array[index - 1].input2 == $scope.array[index - 1].min) && ($scope.array[index - 1].value == $scope.array[index - 1].valueInput)) {
                    switch ($scope.case) {
                        case ">":
                            if ($scope.array[index - 1].min > $scope.array[index - 1].value && $scope.array[index - 1].decision == "true") {
                                check = 1;
                            }
                            else if ($scope.array[index - 1].min <= $scope.array[index - 1].value && $scope.array[index - 1].decision == "false") {
                                check = 1;
                            }
                            break;
                        case "<":
                            if ($scope.array[index - 1].min < $scope.array[index - 1].value && $scope.array[index - 1].decision == "true") {
                                check = 1;
                            }
                            else if ($scope.array[index - 1].min >= $scope.array[index - 1].value && $scope.array[index - 1].decision == "false") {
                                check = 1;
                            }
                            break;
                        case ">=":
                            if ($scope.array[index - 1].min >= $scope.array[index - 1].value && $scope.array[index - 1].decision == "true") {
                                check = 1;
                            }
                            else if ($scope.array[index - 1].min < $scope.array[index - 1].value && $scope.array[index - 1].decision == "false") {
                                check = 1;
                            }
                            break;
                        case "<=":
                            if ($scope.array[index - 1].min <= $scope.array[index - 1].value && $scope.array[index - 1].decision == "true") {
                                check = 1;
                            }
                            else if ($scope.array[index - 1].min > $scope.array[index - 1].value && $scope.array[index - 1].decision == "false") {
                                check = 1;
                            }
                            break;
                    }
                    if (check == 1) {
                        if (index >= $scope.array.length) {
                            $scope.correct2 = true;
                            $scope.array[index - 1].correct2 = true;
                            $scope.array[index - 1].wrong2 = false;
                        }
                        else {
                            $scope.array[index].hidden2 = true;
                            $scope.array[index - 1].correct2 = true;
                            $scope.array[index - 1].wrong2 = false;
                        }
                    }
                    else {
                        $scope.array[index - 1].correct2 = false;
                        $scope.array[index - 1].wrong2 = true;
                    }
                }
                else {
                    $scope.array[index - 1].correct2 = false;
                    $scope.array[index - 1].wrong2 = true;
                }
                break;
            case "max":
                if ($scope.array[index - 1].input2 == $scope.array[index - 1].max && ($scope.array[index - 1].value == $scope.array[index - 1].valueInput)) {
                    switch ($scope.case) {
                        case ">":
                            if ($scope.array[index - 1].max > $scope.array[index - 1].value && $scope.array[index - 1].decision == "true") {
                                check = 1;
                            }
                            else if ($scope.array[index - 1].max <= $scope.array[index - 1].value && $scope.array[index - 1].decision == "false") {
                                check = 1;
                            }
                            break;
                        case "<":
                            if ($scope.array[index - 1].max < $scope.array[index - 1].value && $scope.array[index - 1].decision == "true") {
                                check = 1;
                            }
                            else if ($scope.array[index - 1].max >= $scope.array[index - 1].value && $scope.array[index - 1].decision == "false") {
                                check = 1;
                            }
                            break;
                        case ">=":
                            if ($scope.array[index - 1].max >= $scope.array[index - 1].value && $scope.array[index - 1].decision == "true") {
                                check = 1;
                            }
                            else if ($scope.array[index - 1].max < $scope.array[index - 1].value && $scope.array[index - 1].decision == "false") {
                                check = 1;
                            }
                            break;
                        case "<=":
                            if ($scope.array[index - 1].max <= $scope.array[index - 1].value && $scope.array[index - 1].decision == "true") {
                                check = 1;
                            }
                            else if ($scope.array[index - 1].max > $scope.array[index - 1].value && $scope.array[index - 1].decision == "false") {
                                check = 1;
                            }
                            break;
                    }
                    if (check == 1) {
                        if (index >= $scope.array.length) {
                            $scope.correct2 = true;
                            $scope.array[index - 1].correct2 = true;
                            $scope.array[index - 1].wrong2 = false;
                        }
                        else {
                            $scope.array[index].hidden2 = true;
                            $scope.array[index - 1].correct2 = true;
                            $scope.array[index - 1].wrong2 = false;
                        }
                    }
                    else {
                        $scope.array[index - 1].correct2 = false;
                        $scope.array[index - 1].wrong2 = true;
                    }
                }
                else {
                    $scope.array[index - 1].correct2 = false;
                    $scope.array[index - 1].wrong2 = true;
                }
                break;
        }

    };

    $scope.change = function () {
        $scope.show = !$scope.show;
    };

    $scope.mc = function (value) {
        switch ($scope.type2) {
            case "min":
                if (value == $scope.array[$scope.array.length - 1].min) {
                    $scope.mcWrite = true;
                    $scope.mcWrong = false;
                }
                else {
                    $scope.mcWrite = false;
                    $scope.mcWrong = true;
                }
                break;
            case "max":
                if (value == $scope.array[$scope.array.length - 1].max) {
                    $scope.mcWrite = true;
                    $scope.mcWrong = false;
                }
                else {
                    $scope.mcWrite = false;
                    $scope.mcWrong = true;
                }
                break;
        }

    };


    $scope.text = function (title) {
        //$scope.condtionalField = "";
        switch (title) {
            case "for":
                $scope.loopField = "%min = ?\nfor k = 1 : length(X)\n\t%if the value is less or higher than the value we expected\n\t%then set a new min value or max value\n\t%else\n\t%increment k\n\t%note: you can acheive the final answer from infinite number of solutions\nend";
                break;
            case "while":
                $scope.loopField = "k = 1\n%min = ?\nwhile k < length(X)\n\t%if the value is less or higher than the value we expected\n\t%then set a new min value or max value\n\t%else\n\t%increment k\n\t%note: you can acheive the final answer from infinite number of solutions\nend\n";
                break;
            case "<":
                $scope.conditionalField = "%Loop through array while k is less than length of array\n\n\tif " + $scope.type + " < X(k)\n\t\t%set a new min or max\n\telse\n\t\t%increment k\nend";
                $scope.case = "<";
                break;
            case ">":
                $scope.conditionalField = "%Loop through array while k is less than length of array\n\n\tif " + $scope.type + " > X(k)\n\t\t%set a new min or max\n\telse\n\t\t%increment k\nend";
                $scope.case = ">";
                break;
            case "<=":
                $scope.conditionalField = "%Loop through array while k is less than length of array\n\n\tif " + $scope.type + " <= X(k)\n\t\t%set a new min or max\n\telse\n\t\t%increment k\nend";
                $scope.case = "<=";
                break;
            case ">=":
                $scope.conditionalField = "%Loop through array while k is less than length of array\n\n\tif " + $scope.type + " >= X(k)\n\t\t%set a new min or max\n\telse\n\t\t%increment k\nend";
                $scope.case = ">=";
                break;
            /*case "for": $scope.loopField = "for k = 1 : length(X)\n\n\nend"; break;
             case "while": $scope.loopField = "k = 1\nwhile k < length(X)\n\n\nend\n"; break;
             case "<": $scope.conditionalField = $scope.loopField.replace("\nend", "\tif " + $scope.type + " < X(k)\n\n\telse\n\nend"); $scope.case = "<"; break;
             case ">": $scope.conditionalField = $scope.loopField.replace("\nend", "\tif " + $scope.type + " > X(k)\n\n\telse\n\nend");  $scope.case = ">"; break;
             case "<=": $scope.conditionalField = $scope.loopField.replace("\nend", "\tif " + $scope.type + " <= X(k)\n\n\telse\n\nend");  $scope.case = "<="; break;
             case ">=": $scope.conditionalField = $scope.loopField.replace("\nend", "\tif " + $scope.type + " >= X(k)\n\n\telse\n\nend"); $scope.case = ">="; break;*/
        }

        $scope.textField = "X[" + $scope.arrayString + "]\n" + $scope.loopField.replace(/\t%if[\s\S]*end/, $scope.conditionalField);
        /*for(i = 0; i < options.length; i++){
         if(title == options[i]["title"]){
         if("" == options[i]["replace"]){
         $scope.textField = options[i]["string"];
         }
         else{
         $scope.textField = $scope.textField.replace(options[i]["replace"], options[i]["string"]);
         }
         }
         }*/
    };

}]);

/* Created by Juan Barajas */

app.controller('sideController', ['$scope', '$location', 'State', function ($scope, $location, State) {


    $scope.enablelecture = State.statelecture;
    $scope.enableExample = State.stateexample;

    $scope.visual = false;
    $scope.pseudo = false;
    $scope.tutorial = true;
    $scope.hw = false;
    $scope.complete = State.complete;


    // $scope.enablelecture[0] = true;


    $scope.go = function (path, sectionNumber) {
        console.log(path);

        if (path == 'chapter10') {
            console.log('chpater 10');
            $scope.chapter10 = 1;
            $scope.chapter9 = 0;
            $scope.chapter2 = 0;

        }

        if (path == 'chapter9') {
            console.log('chpater 9');
            $scope.chapter9 = 1;
            $scope.chapter10 = 0;
            $scope.chapter2 = 0;


        }

        if (path == 'chapter2') {
            console.log('chpater 2');
            $scope.chapter2 = 1;
            $scope.chapter10 = 0;
            $scope.chapter9 = 0;


        }

        if (path == 'notes' || path == 'lectureVideo' || path == 'exampleVideo')
            State.AddAttempt();


        //chapter 2
        if (path == 'exampleVideo' && sectionNumber == 2.1) {
            State.stateexample = [false, false, false, false, false, false, false, false, false, false, false, false, false];
            State.stateexample[10] = true;
            console.log('im in  here222');

            $scope.enableExample = State.stateexample;

        }

        if (path == 'exampleVideo' && sectionNumber == 2.2) {
            State.stateexample = [false, false, false, false, false, false, false, false, false, false, false, false, false];
            State.stateexample[11] = true;
            console.log('im in  here222');

            $scope.enableExample = State.stateexample;

        }

        if (path == 'exampleVideo' && sectionNumber == 10.1) {
            State.stateexample = [false, false, false, false, false, false];
            State.stateexample[1] = true;
            console.log('im in  here');

            $scope.enableExample = State.stateexample;

        }

        if (path == 'exampleVideo' && sectionNumber == 10.2) {
            State.stateexample = [false, false, false, false, false, false];
            State.stateexample[2] = true;
            console.log('im in  here');

            $scope.enableExample = State.stateexample;

        }

        if (path == 'exampleVideo' && sectionNumber == 10.3) {
            State.stateexample = [false, false, false, false, false, false];
            State.stateexample[3] = true;
            $scope.enableExample = State.stateexample;

        }
        if (path == 'exampleVideo' && sectionNumber == 10.4) {
            State.stateexample = [false, false, false, false, false, false];
            State.stateexample[4] = true;
            $scope.enableExample = State.stateexample;

        }
        if (path == 'exampleVideo' && sectionNumber == 10.5) {
            State.stateexample = [false, false, false, false, false, false];
            State.stateexample[5] = true;
            $scope.enableExample = State.stateexample;

        }
        if (path == 'exampleVideo' && sectionNumber == 10.6) {
            State.stateexample = [false, false, false, false, false, false];
            State.stateexample[6] = true;
            $scope.enableExample = State.stateexample;

        }

        if (path == 'exampleVideo' && sectionNumber == 9.1) {
            State.stateexample = [false, false, false, false, false, false];
            State.stateexample[7] = true;
            $scope.enableExample = State.stateexample;

        }

        if (path == 'exampleVideo' && sectionNumber == 9.2) {
            State.stateexample = [false, false, false, false, false, false];
            State.stateexample[8] = true;
            $scope.enableExample = State.stateexample;

        }
        if (path == 'exampleVideo' && sectionNumber == 9.3) {
            State.stateexample = [false, false, false, false, false, false];
            State.stateexample[9] = true;
            $scope.enableExample = State.stateexample;

        }
        //cut off for example videos


        if (path == 'lectureVideo' && sectionNumber == 10.1) {
            State.statelecture = [false, false, false, false, false, false];
            State.statelecture[1] = true;
            console.log('im in  here');

            $scope.enablelecture = State.statelecture;

        }
        if (path == 'lectureVideo' && sectionNumber == 10.2) {
            State.statelecture = [false, false, false, false, false, false];
            State.statelecture[2] = true;
            console.log('im in  here');

            $scope.enablelecture = State.statelecture;

        }
        if (path == 'lectureVideo' && sectionNumber == 10.3) {
            State.statelecture = [false, false, false, false, false, false];
            State.statelecture[3] = true;
            console.log('im in  here');

            $scope.enablelecture = State.statelecture;

        }
        if (path == 'lectureVideo' && sectionNumber == 10.4) {
            State.statelecture = [false, false, false, false, false, false];
            State.statelecture[4] = true;
            console.log('im in  here');

            $scope.enablelecture = State.statelecture;

        }

        if (path == 'lectureVideo' && sectionNumber == 9.1) {
            State.statelecture = [false, false, false, false, false, false, false, false, false];
            State.statelecture[5] = true;
            console.log('im in  here');

            $scope.enablelecture = State.statelecture;

        }

        if (path == 'lectureVideo' && sectionNumber == 9.2) {
            State.statelecture = [false, false, false, false, false, false, false, false, false];
            State.statelecture[6] = true;
            console.log('im in  here');

            $scope.enablelecture = State.statelecture;

        }

        if (path == 'lectureVideo' && sectionNumber == 9.3) {
            State.statelecture = [false, false, false, false, false, false, false, false, false];
            State.statelecture[7] = true;
            console.log('im in  here');

            $scope.enablelecture = State.statelecture;

        }

        //Simple control for side bar.
        switch (path) {
            case 'tutorial':
                // $scope.tutorial = true;
                $scope.pseudo = true;
                $scope.visual = true;
                $scope.hw = true;
                break;
            case 'animation':
                $scope.pseudo = true;
                $scope.visual = false;
                $scope.hw = true;
                break;
            case 'sudoCode':
                $scope.pseudo = false;
                $scope.visual = true;
                $scope.hw = true;
                break;
            case 'example':
                $scope.pseudo = false;
                $scope.visual = false;
                $scope.hw = false;
                break;
            default:
                $scope.hw = true;
                $scope.pseudo = false;
                $scope.visual = false;
        }

        //Navigate to path
        //$location.path(path);


        $location.path(path).search({section: sectionNumber});

    };
}]);

//Service to track attempts and possibly states.
app.service('State', ['$log', function ($log) {
    //Number Of tutorial attempts.
    console.log("setting attemp to 0 again.....");
    this.attempt = 0;
    this.checkattempt = 0;
    this.statelecture = [false, false, false, false, false, false, false, false, false, false, false, false, false];
    this.stateexample = [false, false, false, false, false, false, false, false, false, false, false, false, false];


    //Allows controlelr to increment attempts made.
    this.AddAttempt = function () {
        console.log("I am in the Service(State) ADDING ATTEMPTS");
        this.attempt += 1;
        // counter = counter +1;

    }
    this.AddCheckAttempt = function () {
        console.log("I AM ADDING CHECKATTEMPT");
        this.checkattempt += 1;


    }

    this.tableSave = [];

    this.previousState = "";

    this.setTable = function (section) {

        if (section == "10.6") {
            return [
                {
                    step: "step",
                    aOfk: "a(4-k)",
                    bOfk: "b(k)",
                    junkBefore: "Old Junk",
                    junk: "New Junk",
                    blah: "",
                    result: "Result"
                },
                {step: 1, aOfk: '', bOfk: '', junkBefore: '', junk: '', result: "white"},
                {step: 2, aOfk: '', bOfk: '', junkBefore: '', junk: '', result: "white"},
                {step: 3, aOfk: '', bOfk: '', junkBefore: '', junk: '', result: "white"}
            ];
        }
        else if (section == "10.5") {
            return [
                {
                    step: "Step",
                    m: "m",
                    n: "n",
                    xOfM: "x(m)",
                    yOfN: "y(n)",
                    outOfmn: "out(m,n)",
                    blah: "",
                    result: "result"
                },
                {step: "1", m: '', n: '', xOfM: '', yOfN: '', outOfmn: '', result: "white"},
                {step: "2", m: '', n: '', xOfM: '', yOfN: '', outOfmn: '', result: "white"},
                {step: "3", m: '', n: '', xOfM: '', yOfN: '', outOfmn: '', result: "white"},
                {step: "4", m: '', n: '', xOfM: '', yOfN: '', outOfmn: '', result: "white"},
                {step: "5", m: '', n: '', xOfM: '', yOfN: '', outOfmn: '', result: "white"},
                {step: "6", m: '', n: '', xOfM: '', yOfN: '', outOfmn: '', result: "white"}
            ];
        }
        else if (section == "10.7") {
            return [
                {step: "step", index: "index", xOfIndex: "x(index)", count: "count", blah: "", result: "result"},
                {step: "1", index: '', xOfIndex: '', count: '', result: "white"},
                {step: "2", index: '', xOfIndex: '', count: '', result: "white"},
                {step: "3", index: '', xOfIndex: '', count: '', result: "white"},
                {step: "4", index: '', xOfIndex: '', count: '', result: "white"},
                {step: "5", index: '', xOfIndex: '', count: '', result: "white"}
            ];
        }
        else if (section == "10.2") {
            return [
                {step: "Step", x: 'x', varOfX: 'var(x+2)', index: 'index', y: 'y', blah: '', result: "result"},
                {step: "1", x: '', varOfX: '', index: '', y: '', result: "white"},
                {step: "2", x: '', varOfX: '', index: '', y: '', result: "white"},
                {step: "3", x: '', varOfX: '', index: '', y: '', result: "white"},
                {step: "4", x: '', varOfX: '', index: '', y: '', result: "white"}
            ];
        }
        else if (section == "10.8") {
            return [
                {
                    step: 'Step',
                    index: 'index',
                    numOfIndex: 'numbers(index)',
                    count: 'count',
                    blah: '',
                    result: 'result'
                },
                {step: '1', index: '', numOfIndex: '', count: '', result: 'white'},
                {step: '2', index: '', numOfIndex: '', count: '', result: 'white'}
            ];
        }
        else if (section == "10.4") {
            return [
                {step: 'step', k: 'k', xOfk: 'x(k)', yOfxOfk: 'y(x(k))', z: 'z', blah: '', result: 'result'},
                {step: '1', k: '', xOfk: '', yOfxOfk: '', z: '', result: "white"},
                {step: '2', k: '', xOfk: '', yOfxOfk: '', z: '', result: "white"},
                {step: '3', k: '', xOfk: '', yOfxOfk: '', z: '', result: "white"},
                {step: '4', k: '', xOfk: '', yOfxOfk: '', z: '', result: "white"}
            ];
        }
        else if (section == "conditional") {
            return [
                {
                    step: '',
                    cond: 'a <= b & c < d',
                    condd: 'b < c | c < d',
                    conddd: 'd >= c',
                    x: 'x',
                    blah: '',
                    result: 'result'
                },
                {step: '', cond1: '', cond2: '', cond3: '', x: '', result: "white"}
            ];
        }
    }

    this.complete = [false, false, false, false, false, false, false];
}]);

app.controller('tableController', ['$scope', 'State', '$route', '$routeParams', function ($scope, State, $route, $routeParams) {

    $scope.correct = [];
    $scope.incorrect = [];
    $scope.neither = [];

    for (var i = 0; i < 20; i++) {
        $scope.correct.push(0);
        $scope.incorrect.push(0);
        $scope.neither.push(0);
    }
    //Changed array into map of tables
    $scope.$on('$locationChangeStart', function (event) {

        //Grab section number
        var section = $routeParams.section;

        //Save table according to section number
        State.tableSave[section] = $scope.table;
    });

    bootbox.alert("The objective of this exercise is for you to interpret the following code. Fill in the table provided with the correct values in each step. Goodluck!");

    //Function to decide if the user has finished the tutorial
    var done = function (argument) {

        var doneLength = $scope.table.length - 1;
        var numDone = 0;
        var index = 0;

        $scope.table.forEach(function (row) {
            // console.log("Row" + JSON.stringify(row));
            if (row.result == "green") {
                numDone++;
            }
            if ($scope.table[index].result == "yellow") {
                $scope.correct[index] = 0;
                $scope.incorrect[index] = 0;
                $scope.neither[index] = 1;
            }
            else if ($scope.table[index].result == "green") {
                $scope.correct[index] = 1;
                $scope.incorrect[index] = 0;
                $scope.neither[index] = 0;
            }
            else if ($scope.table[index].result == "red") {
                $scope.correct[index] = 0;
                $scope.incorrect[index] = 1;
                $scope.neither[index] = 0;
            }
            else {
                $scope.correct[index] = 0;
                $scope.incorrect[index] = 0;
                $scope.neither[index] = 0;
            }
            index++;
        });

        //Set what tutorial was completed
        if (numDone == doneLength) {
            var section = $routeParams.section;

            if (section == "10.6") {
                State.complete[0] = true;
            }
            else if (section == "10.5") {
                State.complete[1] = true;
            }
            else if (section == "10.7") {
                State.complete[2] = true;
            }
            else if (section == "10.2") {
                State.complete[3] = true;
            }
            else if (section == "10.8") {
                State.complete[4] = true;
            }
            else if (section == "10.4") {
                State.complete[5] = true;
            }
            else if (section == 'conditional') {
                State.complete[6] = true;
            }

            return true;
        }
        else
            return false;
    }

    if (State.tableSave[$routeParams.section] != undefined) {
        $scope.table = State.tableSave[$routeParams.section];
    }
    else {
        $scope.table = State.setTable($routeParams.section);
        State.attempt = 0;
        State.checkattempt = 0;
    }

    $scope.enable = [false, false, false, false, false, false, false];

    var getTable = function () {
        var section = $routeParams.section;

        for (var bit in $scope.enable) {
            bit = false;
        }

        if (section == "10.6") {

            $scope.enable[0] = true;
            $scope.condCheck = false;
            return [
                {
                    step: "step",
                    aOfk: "a(4-k)",
                    bOfk: "b(k)",
                    junkBefore: "Old Junk",
                    junk: "New Junk",
                    blah: "",
                    result: "Result"
                },
                {step: 1, aOfk: 2, bOfk: 3, junkBefore: 0, junk: 6, result: "white"},
                {step: 2, aOfk: 1, bOfk: -1, junkBefore: 6, junk: 5, result: "white"},
                {step: 3, aOfk: 0, bOfk: 2, junkBefore: 5, junk: 5, result: "white"}
            ];
        }
        else if (section == "10.5") {
            $scope.enable[1] = true;
            $scope.condCheck = false;
            return [
                {
                    step: "Step",
                    m: "m",
                    n: "n",
                    xOfM: "x(m)",
                    yOfN: "y(n)",
                    outOfmn: "out(m,n)",
                    blah: "",
                    result: "result"
                },
                {step: "1", m: 1, n: 3, xOfM: 5, yOfN: 4, outOfmn: 9, result: "white"},
                {step: "2", m: 1, n: 2, xOfM: 5, yOfN: 2, outOfmn: 7, result: "white"},
                {step: "3", m: 1, n: 1, xOfM: 5, yOfN: 0, outOfmn: 5, result: "white"},
                {step: "4", m: 3, n: 3, xOfM: 0, yOfN: 4, outOfmn: 4, result: "white"},
                {step: "5", m: 3, n: 2, xOfM: 0, yOfN: 2, outOfmn: 2, result: "white"},
                {step: "6", m: 3, n: 1, xOfM: 0, yOfN: 0, outOfmn: 0, result: "white"}
            ];
        }
        else if (section == "10.7") {
            $scope.enable[2] = true;
            $scope.condCheck = false;
            return [
                {step: "step", index: "index", xOfIndex: "x(index)", count: "count", blah: "", result: "result"},
                {step: "1", index: 1, xOfIndex: 2, count: 1, result: "white"},
                {step: "2", index: 2, xOfIndex: -3, count: 1, result: "white"},
                {step: "3", index: 3, xOfIndex: -5, count: 1, result: "white"},
                {step: "4", index: 4, xOfIndex: 0, count: 2, result: "white"},
                {step: "5", index: 5, xOfIndex: -3, count: 2, result: "white"}
            ];
        }
        else if (section == "10.2") {
            $scope.enable[3] = true;
            $scope.condCheck = false;
            return [
                {step: "Step", x: 'x', varOfX: 'var(x+2)', index: 'index', y: 'y', blah: '', result: "result"},
                {step: "1", x: 3, varOfX: 6, index: 1, y: 6, result: "white"},
                {step: "2", x: 2, varOfX: 0, index: 3, y: '6 0 0', result: "white"},
                {step: "3", x: 1, varOfX: 5, index: 5, y: '6 0 0 0 5', result: "white"},
                {step: "4", x: 1, varOfX: 5, index: 5, y: '6 -6 0 0 5', result: "white"}
            ];
        }
        else if (section == "10.8") {
            $scope.enable[4] = true;
            $scope.condCheck = false;
            return [
                {
                    step: 'Step',
                    index: 'index',
                    numOfIndex: 'numbers(index)',
                    count: 'count',
                    blah: '',
                    result: 'result'
                },
                {step: '1', index: 1, numOfIndex: 2, count: 0, result: 'white'},
                {step: '2', index: 2, numOfIndex: -4, count: 1, result: 'white'}
            ];
        }
        else if (section == "10.4") {
            $scope.enable[5] = true;
            $scope.condCheck = false;
            return [
                {step: 'step', k: 'k', xOfk: 'x(k)', yOfxOfk: 'y(x(k))', z: 'z', blah: '', result: 'result'},
                {step: '1', k: 7, xOfk: 3, yOfxOfk: '4', z: '0 0 0 0 0 0 4', result: "white"},
                {step: '2', k: 6, xOfk: 5, yOfxOfk: '8', z: '0 0 0 0 0 8 4', result: "white"},
                {step: '3', k: 5, xOfk: 4, yOfxOfk: '6', z: '0 0 0 0 6 8 4', result: "white"},
                {step: '4', k: 4, xOfk: 2, yOfxOfk: '2', z: '0 0 0 2 6 8 4', result: "white"}
            ];
        }
        else if (section == 'conditional') {
            $scope.enable[6] = true;
            $scope.condCheck = true;
            return [
                {
                    step: '',
                    cond1: 'a <= b & c < d',
                    cond2: 'b < c | c < d',
                    cond3: 'd >= c',
                    x: 'x',
                    blah: '',
                    result: 'result'
                },
                {step: '', cond1: 'false', cond2: 'true', cond3: 'true', x: '1', result: "white"}
            ];
        }

    }


    $scope.compTable = getTable();
    $scope.done = done();

    //Alerts controller.
    var alerts = function (index) {
        if ($scope.table[index].result == "yellow") {
            $scope.correct[index] = 0;
            $scope.incorrect[index] = 0;
            $scope.neither[index] = 1;
        }
        else if ($scope.table[index].result == "green") {
            $scope.correct[index] = 1;
            $scope.incorrect[index] = 0;
            $scope.neither[index] = 0;
        }
        else if ($scope.table[index].result == "red") {
            $scope.correct[index] = 0;
            $scope.incorrect[index] = 1;
            $scope.neither[index] = 0;
        }
        else {
            $scope.correct[index] = 0;
            $scope.incorrect[index] = 0;
            $scope.neither[index] = 0;
        }
    }

    //Will check if a row with the given index value has correct values.
    $scope.check = function (index) {

        //Set pass to default
        var pass = true;

        //Check against actual answers
        for (var key in $scope.compTable[index]) {
            //console.log(key + ": " + $scope.table[index][key]);
            if (key == "step" || key == "result") continue;

            if (!$scope.table[index][key] || $scope.table[index][key] == '') {
                bootbox.alert('Fill all fields please');
                return;
            }

            if ($scope.compTable[index][key] != $scope.table[index][key])
                pass = false;
        }

        //If not yellow then fill green
        if (pass == true && ($scope.table[index].result == "white" || $scope.table[index].result == "red"))
            $scope.table[index].result = "green";
        else {
            //If not filled or incorrect then mark incorrect
            if ($scope.table[index].result == "white")
                $scope.table[index].result = "red"
        }

        //Alerts
        alerts(index);

        //Add to attempts
        State.AddCheckAttempt();

        //Check if all green then user is done.
        $scope.done = done();
    };


    //Will fill a row if not already filled and not already answered correct.
    $scope.fill = function (row) {

        if (State.attempt >= 1 && State.checkattempt > 2) {

            //If result not green
            if ($scope.table[row].result != "green") {

                //Fill all values
                for (var key in $scope.table[row]) {
                    $scope.table[row][key] = $scope.compTable[row][key];
                }

                //Indicate filled row
                $scope.table[row].result = "yellow";
            }
        }
        else {
            //Direct user to reference material.
            if (State.attempt < 1)
                bootbox.alert("Don't give up now. See reference material and try again.", function () {

                });
            //Inform user to make another attempt to fill in a row
            else if (State.checkattempt <= 2)
                bootbox.alert("Please make another attempt.", function () {

                });
        }
        alerts(row);
    }
}]);

app.controller('AnimationIFCtrl', function ($scope) {

    var startStatus = false;
    var r1;
    var r2;
    var r3;
    var position = 0;

    var bigx = 10;
    var count = 0;
    stage = new createjs.Stage("myCanvas");
    var ball1 = new createjs.Shape();
    //var map = new createjs.Bitmap("./yimg.jpg");

    /*var ball1 = new createjs.Shape();
     var color  = '#'+(Math.random()*0xFFFFFF<<0).toString(16);
     ball1.graphics.beginFill(color).drawCircle(0, 0, 35);
     ball1.x = 53;
     ball1.y = 43;
     var distance = 97;
     stage.addChild(map);
     stage.update();
     stage.addChild(ball1);
     stage.update();*/
    $scope.tableArray = [];
    $scope.iftableArray = [
        {one: "6", two: "3", three: '1', four: '3', five: '-4', x: '1', status: false},
        {one: "6", two: "3", three: '1', four: '3', five: '-4', x: '-2', status: false},
        {one: "6", two: "3", three: '1', four: '3', five: '-4', x: '-2', status: false}];


    function loadImage() {
        var preload = new createjs.LoadQueue();
        preload.addEventListener("fileload", handleFileComplete);
        preload.loadFile("./yimg.jpg");
    }

    function handleFileComplete(event) {
        //document.body.appendChild(event.result);
        console.log('done loading');
        //stage.addChild(event.result);
        var bgBitmap = new createjs.Bitmap(event.result);
        stage.addChild(bgBitmap);

        var color = '#' + (Math.random() * 0xFFFFFF << 0).toString(16);
        ball1.graphics.beginFill(color).drawCircle(0, 0, 35);
        ball1.x = 53;
        ball1.y = 43;
        var distance = 97;
        stage.addChild(ball1);
        stage.update();
        //stage.update();

    }

    loadImage();


    $scope.display = function () {
        console.log('startStatus: ' + startStatus);

        if (startStatus === true) {
            console.log('looooooooooooooooooool');
            return true;
        }

        // return false;

        //console.log('display is being called');
        //$scope.iftableArray.push( $scope.iftableArray[1]);

    };


    var testArr = [2, 3];//JSON.parse($scope.firstRow);
    var tick = 0;


    function table(r1, r2, logic, move, show) {
        this.row1 = r1;
        this.row2 = r2;
        this.logic = logic;
        this.move = move;
        this.show = true;
    }


    //if check for if animation
    $scope.ifcheck = function () {

        if ($scope.finalPos == 5) {
            $scope.finalPos = "correct!";

        }
        else {
            $scope.finalPos = "incorrect!";

        }


    }

    //when users change their R1,R2 and ect.. we need to parse them again in order to use it as an array
    function reCompute() {
        r1 = JSON.parse($scope.firstRow);
        r2 = JSON.parse($scope.secondRow);
        r3 = JSON.parse($scope.thirdRow);
    }

    function reInit() {
        stage.removeAllChildren();

    }

    //set the time interval for the animation to go by
    createjs.Ticker.setInterval(1000);
    //trigger the timer to start
    $scope.start = function () {


        startStatus = true;

        /// testArr = [1,2,3];
        //so we know when to stop by we hit the end of the array
        createjs.Ticker.paused = false;

        //if user doesn't select anything then go with default( option 1)

        //handleTick is where all the animation happens
        createjs.Ticker.addEventListener("tick", handleTick);


    }


    function handleTick(event) {

        if (createjs.Ticker.paused == false) {


            console.log(testArr);
            ball1.x += testArr[count] * 97;
            var color = '#' + (Math.random() * 0xFFFFFF << 0).toString(16);
            ball1.graphics.beginFill(color).drawCircle(0, 0, 35);
            stage.update();
            tick++;
            $scope.iftableArray[count].status = true;
            console.log(JSON.stringify($scope.iftableArray));
            $scope.iftableArray = $scope.iftableArray;
            count++;

            if (count == testArr.length) {

                createjs.Ticker.paused = true;

            }
        }
    }


});

//Angular App

//var codeApp = angular.module('codeApp', ['ui.ace']);

app.controller('codeCtrl', function ($scope, $http) {

    $scope.aceOptions = {
        theme: 'crimson_editor',
        mode: 'matlab',
        useWrapMode: true
    };
    $scope.textField = 'n = 1;\nnFactorial = 1;\nwhile nFactorial < 1e100\n    n = n + 1;\n    nFactorial = nFactorial * n;\nend\nnFactorial\n';

    //Will hide or unhide Octave results and errors.
    $scope.resHide = true;
    $scope.errorHide = true;
    $scope.warningHide = true;

    //Will hold Octave result contents
    $scope.content = "Hello World!";
    $scope.error = "This is an error!"
    $scope.warning = "This is a warning!";

    var validate = function (input) {
        //Check for un-ended for loops, while loops, and if statements

        var count = 0;

        //while count
        var start = (input.match(/while|for|if/ig) || []).length;
        var end = (input.match(/end/ig) || []).length;
        var myElse = (input.match(/else(\s*{*)[^i]/ig) || []).length;
        var realeif = (input.match(/elseif/ig) || []).length;
        var eif = (input.match(/else\s+if/ig) || []).length;

        //remove for else if
        start = (start - eif) - realeif;
        myElse = myElse - eif;

        //Too many end statements
        if (end > start) {
            $scope.warning = 'Too many end statements.';
            $scope.warningHide = false;
            count++;
        }
        else if (start > end) {   //Not enough end statements
            $scope.warning = 'A for/while loop or conditional is not ended.';
            $scope.warningHide = false;
            count++;
        }
        else if (eif > 0) {
            $scope.warning = 'Syntax: \'else if\' must be \'elseif\'.';
            $scope.warningHide = false;
            count++;
        }

        //Testing output
        console.log({
            start: start,
            end: end,
            eif: eif,
            else: myElse,
            realeif: realeif
        });

        return count;
    };

    $scope.sendCode = function () {

        //Switches for alerts
        $scope.resHide = true;
        $scope.errorHide = true;
        $scope.warningHide = true;

        //Return if there are warnings
        if (validate($scope.textField) > 0) {
            return;
        }

        //Post data body
        var body = {
            code: $scope.textField
        };

        $http.post('/api/POST/octave', body).then(function (result) {

            if (result.data.error) {
                $scope.error = result.data.error;
                $scope.errorHide = false;
            } else if (result.data.stderr) {
                $scope.error = result.data.sterr;
                $scope.errorHide = false;
            } else if (result.data.stdout) {
                $scope.content = result.data.stdout;
                $scope.resHide = false;
            }
            else {
                $scope.warning = 'No value being returned or printed.';
                $scope.warningHide = false;
                $scope.content = '';
                $scope.resHide = false;
            }
        });
    };

    $scope.init = function (input, options) {
        $scope.aceOptions = options;
        $scope.textField = input;
    };
});

app.controller('ChapterTwoController', ['$scope', '$location', 'State', function ($scope, $location, State) {


    $scope.formData = {};
    $scope.formData.option = {
        a:false,
        b:false,
        c:false,
        d:false,
        e:false
    };
    
    //$scope.hints = "Hints: "
    $scope.question={};
    $scope.buttonID={};

    var stat1=[1,1,1,1,1];
    var stat2=[1,1,1,1,1];
    var stat3=[1,1,1,1,1];
    var count=0;

    $scope.init = function() {
        var i=0;
        //console.log(stat1[0],stat1[1],stat1[2],stat1[3],stat1[4]);
        //populate options for question1 
        while(i<3)
        {    
        var num = Math.floor(Math.random()*(5));//Math.random()<.5;//Math.floor((Math.random()*2)+0);
            //console.log(num);
            if(stat1[num])
            {
                stat1[num]=0;
                i++;
            }
            if(i==1&&stat1[1])
            {
                i++;
                stat1[1]=0;
            }    
        }
        i=0;     
        //var stat2=[1,1,1,1,1];
        //populate options for question2
        while(i<3)
        {    
            var num = Math.floor(Math.random()*(5));//Math.random()<.5;//Math.floor((Math.random()*2)+0);
            //console.log(num);
            if(stat2[num])
            {
                stat2[num]=0;
                i++;
            }
            if(i==1&&stat2[2])
            {
                i++;
                stat2[2]=0;
            }
        }
        i=0;
        //populate options for question2
        while(i<3)
        {    
            var num = Math.floor(Math.random()*(5));//Math.random()<.5;//Math.floor((Math.random()*2)+0);
            //console.log(num);
            if(stat3[num])
            {
                stat3[num]=0;
                i++;
            }
            if(i==1&&stat3[3])
            {
                i++;
                stat3[3]=0;
            }
        }//
    }  

    $scope.test = function () {
        console.log('inside redd')
        console.log("red: " + $scope.formData.favoriteColors.red)
    }

    $scope.GetRandom = function () {
        //console.log($scope.question.option+","+$scope.question.number)
        if(!stat1[$scope.question.option.a]&&$scope.question.number==1)
            return true;

        if(!stat2[$scope.question.option.b]&&$scope.question.number==2)
            return true;

        if(!stat3[$scope.question.option.c]&&$scope.question.number==3)
            return true;
        else    
            return false;
        
        //var num = Math.floor((Math.random() * (2) + 0));
        //return num;
    }

    $scope.controllerSayHello = function () {
        console.log("Hello from controllerSayHello")
    }

    $scope.CheckAnswers = function () {


        if($scope.buttonID=='a'){   
            if(document.getElementById("answerBoxa").value=='e'&&document.getElementById("answerBoxb").value=='i'&&document.getElementById("answerBoxc").value=='g'&&document.getElementById("answerBoxd").value=='h'){
                $scope.question.x1 =""
                $scope.question.x2 =""
                $scope.question.x3 =""
                $scope.question.x4 ="" 
                $scope.question.x5 = "Correct Answer!"
                document.getElementById("answerBoxa").style.backgroundColor = "yellowgreen"
                document.getElementById("answerBoxb").style.backgroundColor = "yellowgreen"
                document.getElementById("answerBoxc").style.backgroundColor = "yellowgreen"
                document.getElementById("answerBoxd").style.backgroundColor = "yellowgreen"
            }
            else {
                var str;
                $scope.question.x5 = "Wrong Answer! "
                                    

                if(document.getElementById("answerBoxa").value!='e'){
                    if(document.getElementById("answerBoxa").value=='a'||document.getElementById("answerBoxa").value=='m'||document.getElementById("answerBoxa").value=='l')
                        str="Check the syntax of making a directory."
                    else if(document.getElementById("answerBoxa").value=='b'||document.getElementById("answerBoxa").value=='f'||document.getElementById("answerBoxa").value=='j'||document.getElementById("answerBoxa").value=='k')
                        str="You are trying to save instead."
                    else if(document.getElementById("answerBoxa").value=='d'||document.getElementById("answerBoxa").value=='g')
                        str="You are trying to clear."
                    else if(document.getElementById("answerBoxa").value=='i')
                        str="You are trying to change directory."
                    else if(document.getElementById("answerBoxa").value=='c'||document.getElementById("answerBoxa").value=='h')
                        str="You are trying to load file."
                    else
                        str="Invalid option."
                    $scope.question.x1 = "This should \"make\" a directory!"+str;

                    document.getElementById("answerBoxa").style.backgroundColor = "tomato"
                }
                
                if(document.getElementById("answerBoxa").value=='e'){
                    $scope.question.x1 = ""

                    document.getElementById("answerBoxa").style.backgroundColor = "yellowgreen"
                }
                if(document.getElementById("answerBoxb").value!='i'){
                    if(document.getElementById("answerBoxb").value=='a'||document.getElementById("answerBoxb").value=='m'||document.getElementById("answerBoxb").value=='e'||document.getElementById("answerBoxb").value=='l')
                        str="You are trying to make a directory instead."
                    else if(document.getElementById("answerBoxb").value=='b'||document.getElementById("answerBoxb").value=='f'||document.getElementById("answerBoxb").value=='j'||document.getElementById("answerBoxb").value=='k')
                        str="You are trying to save instead."
                    else if(document.getElementById("answerBoxb").value=='d'||document.getElementById("answerBoxb").value=='g')
                        str="You are trying to clear."
                    else if(document.getElementById("answerBoxb").value=='c'||document.getElementById("answerBoxb").value=='h')
                        str="Check syntax of load file."
                    else if(document.getElementById("answerBoxb").value=='i')
                        str="You are trying to change directory."
                    else
                        str="Invalid option."           
                    $scope.question.x2 = "This should \"save\" the workspace!"+str;
                    
                    document.getElementById("answerBoxb").style.backgroundColor = "tomato"
                }

                if(document.getElementById("answerBoxb").value=='i'){
                    $scope.question.x2 = ""
                    
                    document.getElementById("answerBoxb").style.backgroundColor = "yellowgreen"
                }

                if(document.getElementById("answerBoxc").value!='g'){
                    if(document.getElementById("answerBoxc").value=='a'||document.getElementById("answerBoxc").value=='m'||document.getElementById("answerBoxc").value=='e'||document.getElementById("answerBoxc").value=='l')
                        str="You are trying to make a directory instead."
                    else if(document.getElementById("answerBoxc").value=='b'||document.getElementById("answerBoxc").value=='f'||document.getElementById("answerBoxc").value=='j'||document.getElementById("answerBoxc").value=='k')
                        str="You are trying to save instead."
                    else if(document.getElementById("answerBoxc").value=='d')
                        str="Check syntax of clear."
                    else if(document.getElementById("answerBoxc").value=='c'||document.getElementById("answerBoxc").value=='h')
                        str="You are trying to load file instead."
                    else if(document.getElementById("answerBoxc").value=='i')
                        str="You are trying to change directory."
                    else
                        str="Invalid option."           
                    $scope.question.x3 = "This should \"clear\" the workspace!"+str;
                    
                    document.getElementById("answerBoxc").style.backgroundColor = "tomato"
                }

                if(document.getElementById("answerBoxc").value=='g'){
                    $scope.question.x3 = "";
                    
                    document.getElementById("answerBoxc").style.backgroundColor = "yellowgreen"
                }
                
                if(document.getElementById("answerBoxd").value!='h'){
                    if(document.getElementById("answerBoxd").value=='a'||document.getElementById("answerBoxd").value=='m'||document.getElementById("answerBoxd").value=='e'||document.getElementById("answerBoxd").value=='l')
                        str="You are trying to make a directory instead."
                    else if(document.getElementById("answerBoxd").value=='b'||document.getElementById("answerBoxd").value=='j'||document.getElementById("answerBoxd").value=='k')
                        str="Check syntax of save."
                    else if(document.getElementById("answerBoxd").value=='d'||document.getElementById("answerBoxd").value=='g')
                        str="You are trying to clear instead."
                    else if(document.getElementById("answerBoxd").value=='c')
                        str="You are trying to load file instead."
                    else if(document.getElementById("answerBoxd").value=='i')
                        str="You are trying to change directory."
                    else
                        str="Invalid option."           
                    $scope.question.x4 = "This should load file1!"+str;
                    
                    document.getElementById("answerBoxd").style.backgroundColor = "tomato"
                }

                if(document.getElementById("answerBoxd").value=='h'){
                    $scope.question.x4 = "";
                    
                    document.getElementById("answerBoxd").style.backgroundColor = "yellowgreen"
                }
            }    
         }
        
        if($scope.buttonID=='b')
        {   
            //console.log("question 1")
            //console.log($scope.formData.option.a)
            if($scope.formData.option.c)
            {
                if($scope.formData.option.a||$scope.formData.option.b||$scope.formData.option.d)
                {    $scope.question.y = "Wrong Answer! "
                   return
                }
                $scope.question.y = "Correct Answer!"
            }
            else      
                $scope.question.y = "Wrong Answer! "
        }
        if($scope.buttonID=='c')
        {   
            //console.log("question 1")
            //console.log($scope.formData.option.a)
            if($scope.formData.option.a)
            {
                if($scope.formData.option.e||$scope.formData.option.c||$scope.formData.option.d)
                {    $scope.question.x = "Wrong Answer! "
                   return
                }
                $scope.question.z = "Correct Answer!"
            }
            else      
                $scope.question.z = "Wrong Answer! "
        }
        
        if($scope.buttonID=='d')
        {   
            if(document.getElementById("answerBoxa").value==3&&!document.getElementById("answerBoxb").value&&document.getElementById("answerBoxc").value==2&&document.getElementById("answerBoxd").value==6&&!document.getElementById("answerBoxe").value&&document.getElementById("answerBoxf").value==6&&$scope.question.d)
        
                $scope.question.w = "Correct Answer!"
            else      
                $scope.question.w = "Wrong Answer! "
        }
        
        if($scope.buttonID=='e')
        {   
            if(document.getElementById("answerBoxf").value=='b'&&document.getElementById("answerBoxg").value=='c'&&document.getElementById("answerBoxh").value=='e'&&document.getElementById("answerBoxi").value=='a'&&document.getElementById("answerBoxj").value=='d')//&&$scope.question.e)        
                $scope.question.l = "Correct Answer!"
            else      
                $scope.question.l = "Wrong Answer! "
        }     
  }


}]);


app.controller('ChapterThreeController', ['$scope', '$location', 'State', function ($scope, $location, State) {


    $scope.formData = {};
    $scope.formData.option = {
        a:false,
        b:false,
        c:false,
        d:false,
        e:false
    };
    
    //$scope.hints = "Hints: "
    $scope.question={};
    $scope.buttonID={};

    var stat1=[1,1,1,1,1];
    var stat2=[1,1,1,1,1];
    var stat3=[1,1,1,1,1];
    var count=0;

    $scope.init = function() {
        var i=0;
        //console.log(stat1[0],stat1[1],stat1[2],stat1[3],stat1[4]);
        //populate options for question1 
        while(i<3)
        {    
        var num = Math.floor(Math.random()*(5));//Math.random()<.5;//Math.floor((Math.random()*2)+0);
            //console.log(num);
            if(stat1[num])
            {
                stat1[num]=0;
                i++;
            }
            if(i==1&&stat1[1])
            {
                i++;
                stat1[1]=0;
            }    
        }
        i=0;     
        //var stat2=[1,1,1,1,1];
        //populate options for question2
        while(i<3)
        {    
            var num = Math.floor(Math.random()*(5));//Math.random()<.5;//Math.floor((Math.random()*2)+0);
            //console.log(num);
            if(stat2[num])
            {
                stat2[num]=0;
                i++;
            }
            if(i==1&&stat2[2])
            {
                i++;
                stat2[2]=0;
            }
        }
        i=0;
        //populate options for question2
        while(i<3)
        {    
            var num = Math.floor(Math.random()*(5));//Math.random()<.5;//Math.floor((Math.random()*2)+0);
            //console.log(num);
            if(stat3[num])
            {
                stat3[num]=0;
                i++;
            }
            if(i==1&&stat3[3])
            {
                i++;
                stat3[3]=0;
            }
        }//
    }  

    $scope.test = function () {
        console.log('inside redd')
        console.log("red: " + $scope.formData.favoriteColors.red)
    }

    $scope.GetRandom = function () {
        //console.log($scope.question.option+","+$scope.question.number)
        if(!stat1[$scope.question.option]&&$scope.question.number==1)
            return true;

        if(!stat2[$scope.question.option]&&$scope.question.number==2)
            return true;

        if(!stat3[$scope.question.option]&&$scope.question.number==5)
            return true;
        else    
            return false;
        
        //var num = Math.floor((Math.random() * (2) + 0));
        //return num;
    }

    $scope.controllerSayHello = function () {
        console.log("Hello from controllerSayHello")
    }

    $scope.CheckAnswers = function () {


        if($scope.buttonID=='a')
        {   
            //console.log("question 1")
            //console.log($scope.formData.option.a)
            if($scope.formData.option.b)
            {
                if($scope.formData.option.a||$scope.formData.option.c||$scope.formData.option.d)
                {    $scope.question.x = "Wrong Answer! "
                   return
                }
                $scope.question.x = "Correct Answer!"
            }
            else      
                $scope.question.x = "Wrong Answer! "
        }
        
        if($scope.buttonID=='b')
        {   
            //console.log("question 1")
            //console.log($scope.formData.option.a)
            if($scope.formData.option.c)
            {
                if($scope.formData.option.a||$scope.formData.option.b||$scope.formData.option.d)
                {    $scope.question.y = "Wrong Answer! "
                   return
                }
                $scope.question.y = "Correct Answer!"
            }
            else      
                $scope.question.y = "Wrong Answer! "
        }
        if($scope.buttonID=='e')
        {   
            //console.log("question 1")
            //console.log($scope.formData.option.a)
            if($scope.formData.option.a)
            {
                if($scope.formData.option.e||$scope.formData.option.c||$scope.formData.option.d)
                {    $scope.question.x = "Wrong Answer! "
                   return
                }
                $scope.question.l = "Correct Answer!"
            }
            else      
                $scope.question.l = "Wrong Answer! "
        }
        
        if($scope.buttonID=='c')
        {   
            if(document.getElementById("answerBoxa").value==3&&$scope.question.c)
        
                $scope.question.z = "Correct Answer!"
            else      
                $scope.question.z = "Wrong Answer! "
        }

        if($scope.buttonID=='d')
        {   
            if(document.getElementById("answerBoxb").value==3&&$scope.question.d)
        
                $scope.question.w = "Correct Answer!"
            else      
                $scope.question.w = "Wrong Answer! "
        }
     
  }


}]);

app.controller('ChapterFiveController', ['$scope', '$location', 'State', function ($scope, $location, State) {


    $scope.formData = {};
    $scope.formData.option = {
        a:false,
        b:false,
        c:false,
        d:false,
        e:false
    };
    
    //$scope.hints = "Hints: "
    $scope.question={};
    $scope.buttonID={};

    var stat1=[1,1,1,1];
    var stat2=[1,1,1,1];
    var stat3=[1,1,1,1];
    var count=0;

    $scope.init = function() {
        var i=0;
        //console.log(stat1[0],stat1[1],stat1[2],stat1[3],stat1[4]);
        //populate options for question1 
        while(i<3)
        {    
        var num = Math.floor(Math.random()*(5));//Math.random()<.5;//Math.floor((Math.random()*2)+0);
            //console.log(num);
            if(stat1[num])
            {
                stat1[num]=0;
                i++;
            }
            if(i==1&&stat1[3])
            {
                i++;
                stat1[3]=0;
            }    
        }
        i=0;     
        //var stat2=[1,1,1,1,1];
        //populate options for question2
        while(i<3)
        {    
            var num = Math.floor(Math.random()*(5));//Math.random()<.5;//Math.floor((Math.random()*2)+0);
            //console.log(num);
            if(stat2[num])
            {
                stat2[num]=0;
                i++;
            }
            if(i==1&&stat2[2])
            {
                i++;
                stat2[2]=0;
            }
        }
        i=0;
        //populate options for question2
        while(i<3)
        {    
            var num = Math.floor(Math.random()*(5));//Math.random()<.5;//Math.floor((Math.random()*2)+0);
            //console.log(num);
            if(stat3[num])
            {
                stat3[num]=0;
                i++;
            }
            if(i==1&&stat3[3])
            {
                i++;
                stat3[3]=0;
            }
        }//
    }  

    $scope.test = function () {
        console.log('inside redd')
        console.log("red: " + $scope.formData.favoriteColors.red)
    }

    $scope.GetRandom = function () {
        //console.log($scope.question.option+","+$scope.question.number)
        if(!stat1[$scope.question.option]&&$scope.question.number==1)
            return true;

        if(!stat2[$scope.question.option]&&$scope.question.number==2)
            return true;

        if(!stat3[$scope.question.option]&&$scope.question.number==3)
            return true;
        else    
            return false;
        
        //var num = Math.floor((Math.random() * (2) + 0));
        //return num;
    }

    $scope.controllerSayHello = function () {
        console.log("Hello from controllerSayHello")
    }

    $scope.CheckAnswers = function () {


        if($scope.buttonID=='a')
        {   
            //console.log("question 1")
            //console.log($scope.formData.option.a)
            if($scope.formData.option.c)
            {
                if($scope.formData.option.a||$scope.formData.option.b||$scope.formData.option.d)
                {    $scope.question.x = "Wrong Answer! "
                   return
                }
                $scope.question.x = "Correct Answer!"
            }
            else      
                $scope.question.x = "Wrong Answer! "
        }
        
        if($scope.buttonID=='b')
        {   
            //console.log("question 1")
            //console.log($scope.formData.option.a)
            if($scope.formData.option.b)
            {
                if($scope.formData.option.a||$scope.formData.option.c||$scope.formData.option.d)
                {    $scope.question.y = "Wrong Answer! "
                   return
                }
                $scope.question.y = "Correct Answer!"
            }
            else      
                $scope.question.y = "Wrong Answer! "
        }
        
        if($scope.buttonID=='c')
        {   
            if($scope.formData.option.c)
            {
                if($scope.formData.option.a||$scope.formData.option.b||$scope.formData.option.d)
                {    $scope.question.z = "Wrong Answer! "
                   return
                }
                $scope.question.z = "Correct Answer!"
            }else      
                $scope.question.z = "Wrong Answer! "
        }

     
  }


}]);


app.controller('ChapterFiveControllerTwo', ['$scope', '$location', 'State', function ($scope, $location, State) {


    $scope.formData = {};
    $scope.formData.option = {
        a:false,
        b:false,
        c:false,
        d:false,
        e:false
    };
    
    //$scope.hints = "Hints: "
    $scope.question={};
    $scope.buttonID={};

    var stat1=[1,1,1,1];
    var stat2=[1,1,1,1];
    var stat3=[1,1,1,1,1];
    var count=0;

    $scope.init = function() {
        var i=0;
        //console.log(stat1[0],stat1[1],stat1[2],stat1[3],stat1[4]);
        //populate options for question1 
        while(i<3)
        {    
        var num = Math.floor(Math.random()*(5));//Math.random()<.5;//Math.floor((Math.random()*2)+0);
            //console.log(num);
            if(stat1[num])
            {
                stat1[num]=0;
                i++;
            }
            if(i==1&&stat1[1])
            {
                i++;
                stat1[1]=0;
            }    
        }
        i=0;     
        //var stat2=[1,1,1,1,1];
        //populate options for question2
        while(i<3)
        {    
            var num = Math.floor(Math.random()*(5));//Math.random()<.5;//Math.floor((Math.random()*2)+0);
            //console.log(num);
            if(stat2[num])
            {
                stat2[num]=0;
                i++;
            }
            if(i==1&&stat2[2])
            {
                i++;
                stat2[2]=0;
            }
        }
        i=0;
        //populate options for question2
        while(i<3)
        {    
            var num = Math.floor(Math.random()*(5));//Math.random()<.5;//Math.floor((Math.random()*2)+0);
            //console.log(num);
            if(stat3[num])
            {
                stat3[num]=0;
                i++;
            }
            if(i==1&&stat3[3])
            {
                i++;
                stat3[3]=0;
            }
        }//
    }  

    $scope.test = function () {
        console.log('inside redd')
        console.log("red: " + $scope.formData.favoriteColors.red)
    }

    $scope.GetRandom = function () {
        //console.log($scope.question.option+","+$scope.question.number)
        if(!stat1[$scope.question.option]&&$scope.question.number==1)
            return true;

        if(!stat2[$scope.question.option]&&$scope.question.number==2)
            return true;

        if(!stat3[$scope.question.option]&&$scope.question.number==3)
            return true;
        else    
            return false;
        
        //var num = Math.floor((Math.random() * (2) + 0));
        //return num;
    }

    $scope.controllerSayHello = function () {
        console.log("Hello from controllerSayHello")
    }

    $scope.CheckAnswers = function () {


        if($scope.buttonID=='a')
        {   
            //console.log("question 1")
            //console.log($scope.formData.option.a)
            if($scope.formData.option.b)
            {
                if($scope.formData.option.a||$scope.formData.option.c||$scope.formData.option.d)
                {    $scope.question.x = "Wrong Answer! "
                   return
                }
                $scope.question.x = "Correct Answer!"
            }
            else      
                $scope.question.x = "Wrong Answer! "
        }
        
        if($scope.buttonID=='b')
        {   
            //console.log("question 1")
            //console.log($scope.formData.option.a)
            if($scope.formData.option.c)
            {
                if($scope.formData.option.a||$scope.formData.option.b||$scope.formData.option.d)
                {    $scope.question.y = "Wrong Answer! "
                   return
                }
                $scope.question.y = "Correct Answer!"
            }
            else      
                $scope.question.y = "Wrong Answer! "
        }
        
        if($scope.buttonID=='c')
        {   
            if($scope.formData.option.c)
            {
                if($scope.formData.option.a||$scope.formData.option.b||$scope.formData.option.d)
                {    $scope.question.z = "Wrong Answer! "
                   return
                }
                $scope.question.z = "Correct Answer!"
            }else      
                $scope.question.z = "Wrong Answer! "
        }

     
  }


}]);


app.controller('ChapterFiveControllerThree', ['$scope', '$location', 'State', function ($scope, $location, State) {


    $scope.formData = {};
    $scope.formData.option = {
        a:false,
        b:false,
        c:false,
        d:false,
        e:false
    };
    
    //$scope.hints = "Hints: "
    $scope.question={};
    $scope.buttonID={};

    var stat1=[1,1,1,1,1];
    var stat2=[1,1,1,1,1];
    var stat3=[1,1,1,1,1];
    var stat4=[1,1,1,1,1];
    var count=0;

    $scope.init = function() {
        var i=0;
        //console.log(stat1[0],stat1[1],stat1[2],stat1[3],stat1[4]);
        //populate options for question1 
        while(i<3)
        {    
        var num = Math.floor(Math.random()*(5));//Math.random()<.5;//Math.floor((Math.random()*2)+0);
            //console.log(num);
            if(stat1[num])
            {
                stat1[num]=0;
                i++;
            }
            if(i==1&&stat1[1])
            {
                i++;
                stat1[1]=0;
            }    
        }
        i=0;     
        //var stat2=[1,1,1,1,1];
        //populate options for question2
        while(i<3)
        {    
            var num = Math.floor(Math.random()*(5));//Math.random()<.5;//Math.floor((Math.random()*2)+0);
            //console.log(num);
            if(stat2[num])
            {
                stat2[num]=0;
                i++;
            }
            if(i==1&&stat2[2])
            {
                i++;
                stat2[2]=0;
            }
        }
        i=0;
        //populate options for question2
        while(i<3)
        {    
            var num = Math.floor(Math.random()*(5));//Math.random()<.5;//Math.floor((Math.random()*2)+0);
            //console.log(num);
            if(stat3[num])
            {
                stat3[num]=0;
                i++;
            }
            if(i==1&&stat3[3])
            {
                i++;
                stat3[3]=0;
            }
        }//
        i=0;
        while(i<3)
        {    
            var num = Math.floor(Math.random()*(5));//Math.random()<.5;//Math.floor((Math.random()*2)+0);
            //console.log(num);
            if(stat4[num])
            {
                stat4[num]=0;
                i++;
            }
            if(i==1&&stat4[2])
            {
                i++;
                stat4[2]=0;
            }
        }//
    }  

    $scope.test = function () {
        console.log('inside redd')
        console.log("red: " + $scope.formData.favoriteColors.red)
    }

    $scope.GetRandom = function () {
        //console.log($scope.question.option+","+$scope.question.number)
        if(!stat1[$scope.question.option]&&$scope.question.number==1)
            return true;

        if(!stat2[$scope.question.option]&&$scope.question.number==2)
            return true;

        if(!stat3[$scope.question.option]&&$scope.question.number==3)
            return true;
        
        if(!stat4[$scope.question.option]&&$scope.question.number==4)
            return true;
       
        else    
            return false;
        
        //var num = Math.floor((Math.random() * (2) + 0));
        //return num;
    }

    $scope.controllerSayHello = function () {
        console.log("Hello from controllerSayHello")
    }

    $scope.CheckAnswers = function () {


        if($scope.buttonID=='a')
        {   
            //console.log("question 1")
            //console.log($scope.formData.option.a)
            if($scope.formData.option.b)
            {
                if($scope.formData.option.a||$scope.formData.option.c||$scope.formData.option.d)
                {    $scope.question.x = "Wrong Answer! "
                   return
                }
                $scope.question.x = "Correct Answer!"
            }
            else      
                $scope.question.x = "Wrong Answer! "
        }
        
        if($scope.buttonID=='b')
        {   
            //console.log("question 1")
            //console.log($scope.formData.option.a)
            if($scope.formData.option.c)
            {
                if($scope.formData.option.a||$scope.formData.option.b||$scope.formData.option.d)
                {    $scope.question.y = "Wrong Answer! "
                   return
                }
                $scope.question.y = "Correct Answer!"
            }
            else      
                $scope.question.y = "Wrong Answer! "
        }
        
        if($scope.buttonID=='c')
        {   
            if($scope.formData.option.c)
            {
                if($scope.formData.option.a||$scope.formData.option.b||$scope.formData.option.d)
                {    $scope.question.y = "Wrong Answer! "
                   return
                }
                $scope.question.z = "Correct Answer!"
            }else      
                $scope.question.z = "Wrong Answer! "
        }

        if($scope.buttonID=='d')
        {   
            if($scope.formData.option.c)
            {
                if($scope.formData.option.a||$scope.formData.option.b||$scope.formData.option.d)
                {    $scope.question.y = "Wrong Answer! "
                   return
                }
                $scope.question.z = "Correct Answer!"
            }else      
                $scope.question.z = "Wrong Answer! "
        }
 
  }


}]);

app.controller('ChapterFiveControllerFour', ['$scope', '$location', 'State', function ($scope, $location, State) {


    $scope.formData = {};
    $scope.formData.option = {
        a:false,
        b:false,
        c:false,
        d:false,
        e:false
    };
    
    //$scope.hints = "Hints: "
    $scope.question={};
    $scope.buttonID={};

    var stat1=[1,1,1,1,1];
    var stat2=[1,1,1,1,1];
    var count=0;

    $scope.init = function() {
        var i=0;
        //console.log(stat1[0],stat1[1],stat1[2],stat1[3],stat1[4]);
        //populate options for question1 
        while(i<3)
        {    
        var num = Math.floor(Math.random()*(5));//Math.random()<.5;//Math.floor((Math.random()*2)+0);
            //console.log(num);
            if(stat1[num])
            {
                stat1[num]=0;
                i++;
            }
            if(i==1&&stat1[1])
            {
                i++;
                stat1[1]=0;
            }    
        }
        i=0;     
        //var stat2=[1,1,1,1,1];
        //populate options for question2
        while(i<3)
        {    
            var num = Math.floor(Math.random()*(5));//Math.random()<.5;//Math.floor((Math.random()*2)+0);
            //console.log(num);
            if(stat2[num])
            {
                stat2[num]=0;
                i++;
            }
            if(i==1&&stat2[2])
            {
                i++;
                stat2[2]=0;
            }
        }
        i=0;
        //populate options for question2
    }  

    $scope.test = function () {
        console.log('inside redd')
        console.log("red: " + $scope.formData.favoriteColors.red)
    }

    $scope.GetRandom = function () {
        //console.log($scope.question.option+","+$scope.question.number)
        if(!stat1[$scope.question.option]&&$scope.question.number==1)
            return true;

        if(!stat2[$scope.question.option]&&$scope.question.number==2)
            return true;
   
        else    
            return false;
        
        //var num = Math.floor((Math.random() * (2) + 0));
        //return num;
    }

    $scope.controllerSayHello = function () {
        console.log("Hello from controllerSayHello")
    }

    $scope.CheckAnswers = function () {


        if($scope.buttonID=='a')
        {   
            //console.log("question 1")
            //console.log($scope.formData.option.a)
            if($scope.formData.option.b)
            {
                if($scope.formData.option.a||$scope.formData.option.c||$scope.formData.option.d)
                {    $scope.question.x = "Wrong Answer! "
                   return
                }
                $scope.question.x = "Correct Answer!"
            }
            else      
                $scope.question.x = "Wrong Answer! "
        }
        
        if($scope.buttonID=='b')
        {   
            //console.log("question 1")
            //console.log($scope.formData.option.a)
            if($scope.formData.option.c)
            {
                if($scope.formData.option.a||$scope.formData.option.b||$scope.formData.option.d)
                {    $scope.question.y = "Wrong Answer! "
                   return
                }
                $scope.question.y = "Correct Answer!"
            }
            else      
                $scope.question.y = "Wrong Answer! "
        }
        
     
  }


}]);

app.controller('ChapterFiveControllerFive', ['$scope', '$location', 'State', function ($scope, $location, State) {


    $scope.formData = {};
    $scope.formData.option = {
        a:false,
        b:false,
        c:false,
        d:false,
        e:false
    };
    
    //$scope.hints = "Hints: "
    $scope.question={};
    $scope.buttonID={};

    var stat1=[1,1,1,1];
    var stat2=[1,1,1,1];
    var stat3=[1,1,1,1];
    var count=0;

    $scope.init = function() {
        var i=0;
        //console.log(stat1[0],stat1[1],stat1[2],stat1[3],stat1[4]);
        //populate options for question1 
        while(i<3)
        {    
        var num = Math.floor(Math.random()*(4));//Math.random()<.5;//Math.floor((Math.random()*2)+0);
            //console.log(num);
            if(stat1[num])
            {
                stat1[num]=0;
                i++;
            }
            if(i==1&&stat1[1])
            {
                i++;
                stat1[1]=0;
            }    
        }
        i=0;     
        //var stat2=[1,1,1,1,1];
        //populate options for question2
        while(i<3)
        {    
            var num = Math.floor(Math.random()*(4));//Math.random()<.5;//Math.floor((Math.random()*2)+0);
            //console.log(num);
            if(stat2[num])
            {
                stat2[num]=0;
                i++;
            }
            if(i==1&&stat2[2])
            {
                i++;
                stat2[2]=0;
            }
        }
        i=0;
        //populate options for question2
        while(i<3)
        {    
            var num = Math.floor(Math.random()*(4));//Math.random()<.5;//Math.floor((Math.random()*2)+0);
            //console.log(num);
            if(stat3[num])
            {
                stat3[num]=0;
                i++;
            }
            if(i==1&&stat3[3])
            {
                i++;
                stat3[3]=0;
            }
        }//
    }  

    $scope.test = function () {
        console.log('inside redd')
        console.log("red: " + $scope.formData.favoriteColors.red)
    }

    $scope.GetRandom = function () {
        //console.log($scope.question.option+","+$scope.question.number)
        if(!stat1[$scope.question.option]&&$scope.question.number==1)
            return true;

        if(!stat2[$scope.question.option]&&$scope.question.number==2)
            return true;

        if(!stat3[$scope.question.option]&&$scope.question.number==3)
            return true;
       
        else    
            return false;
        
        //var num = Math.floor((Math.random() * (2) + 0));
        //return num;
    }

    $scope.controllerSayHello = function () {
        console.log("Hello from controllerSayHello")
    }

    $scope.CheckAnswers = function () {


        if($scope.buttonID=='a')
        {   
            //console.log("question 1")
            //console.log($scope.formData.option.a)
            if($scope.formData.option.b)
            {
                if($scope.formData.option.a||$scope.formData.option.c||$scope.formData.option.d)
                {    $scope.question.x = "Wrong Answer! "
                   return
                }
                $scope.question.x = "Correct Answer!"
            }
            else      
                $scope.question.x = "Wrong Answer! "
        }
        
        if($scope.buttonID=='b')
        {   
            //console.log("question 1")
            //console.log($scope.formData.option.a)
            if($scope.formData.option.c)
            {
                if($scope.formData.option.a||$scope.formData.option.b||$scope.formData.option.d)
                {    $scope.question.y = "Wrong Answer! "
                   return
                }
                $scope.question.y = "Correct Answer!"
            }
            else      
                $scope.question.y = "Wrong Answer! "
        }
        
        if($scope.buttonID=='c')
        {   
            if($scope.formData.option.c)
            {
                if($scope.formData.option.a||$scope.formData.option.b||$scope.formData.option.d)
                {    $scope.question.z = "Wrong Answer! "
                   return
                }
                $scope.question.z = "Correct Answer!"
            }
            else      
                $scope.question.z = "Wrong Answer! "
        }

     
  }


}]);

app.controller('ChapterFiveControllerSix', ['$scope', '$location', 'State', function ($scope, $location, State) {


    $scope.formData = {};
    $scope.formData.option = {
        a:false,
        b:false,
        c:false,
        d:false,
        e:false
    };
    
    //$scope.hints = "Hints: "
    $scope.question={};
    $scope.buttonID={};

    var stat1=[1,1,1,1];
    var stat2=[1,1,1,1];
    var stat3=[1,1,1,1];
    var count=0;

    $scope.init = function() {
        var i=0;
        //console.log(stat1[0],stat1[1],stat1[2],stat1[3],stat1[4]);
        //populate options for question1 
        while(i<3)
        {    
        var num = Math.floor(Math.random()*(4));//Math.random()<.5;//Math.floor((Math.random()*2)+0);
            //console.log(num);
            if(stat1[num])
            {
                stat1[num]=0;
                i++;
            }
            if(i==1&&stat1[1])
            {
                i++;
                stat1[1]=0;
            }    
        }
        i=0;     
        //var stat2=[1,1,1,1,1];
        //populate options for question2
        while(i<3)
        {    
            var num = Math.floor(Math.random()*(4));//Math.random()<.5;//Math.floor((Math.random()*2)+0);
            //console.log(num);
            if(stat2[num])
            {
                stat2[num]=0;
                i++;
            }
            if(i==1&&stat2[2])
            {
                i++;
                stat2[2]=0;
            }
        }
        i=0;
        //populate options for question2
        while(i<3)
        {    
            var num = Math.floor(Math.random()*(4));//Math.random()<.5;//Math.floor((Math.random()*2)+0);
            //console.log(num);
            if(stat3[num])
            {
                stat3[num]=0;
                i++;
            }
            if(i==1&&stat3[3])
            {
                i++;
                stat3[3]=0;
            }
        }//
    }  

    $scope.test = function () {
        console.log('inside redd')
        console.log("red: " + $scope.formData.favoriteColors.red)
    }

    $scope.GetRandom = function () {
        //console.log($scope.question.option+","+$scope.question.number)
        if(!stat1[$scope.question.option]&&$scope.question.number==1)
            return true;

        if(!stat2[$scope.question.option]&&$scope.question.number==2)
            return true;

        if(!stat3[$scope.question.option]&&$scope.question.number==3)
            return true;
        
        else    
            return false;
        
        //var num = Math.floor((Math.random() * (2) + 0));
        //return num;
    }

    $scope.controllerSayHello = function () {
        console.log("Hello from controllerSayHello")
    }

    $scope.CheckAnswers = function () {


        if($scope.buttonID=='a')
        {   
            //console.log("question 1")
            //console.log($scope.formData.option.a)
            if($scope.formData.option.b)
            {
                if($scope.formData.option.a||$scope.formData.option.c||$scope.formData.option.d)
                {    $scope.question.x = "Wrong Answer! "
                   return
                }
                $scope.question.x = "Correct Answer!"
            }
            else      
                $scope.question.x = "Wrong Answer! "
        }
        
        if($scope.buttonID=='b')
        {   
            //console.log("question 1")
            //console.log($scope.formData.option.a)
            if($scope.formData.option.c)
            {
                if($scope.formData.option.a||$scope.formData.option.b||$scope.formData.option.d)
                {    $scope.question.y = "Wrong Answer! "
                   return
                }
                $scope.question.y = "Correct Answer!"
            }
            else      
                $scope.question.y = "Wrong Answer! "
        }
        
        if($scope.buttonID=='c')
        {   
            if($scope.formData.option.c)
            {
                if($scope.formData.option.a||$scope.formData.option.b||$scope.formData.option.d)
                {    $scope.question.z = "Wrong Answer! "
                   return
                }
                $scope.question.z = "Correct Answer!"
            }
            else      
                $scope.question.z = "Wrong Answer! "
        }

     
  }


}]);

app.controller('ChapterFiveControllerSeven', ['$scope', '$location', 'State', function ($scope, $location, State) {


    $scope.formData = {};
    $scope.formData.option = {
        a:false,
        b:false,
        c:false,
        d:false,
        e:false
    };
    
    //$scope.hints = "Hints: "
    $scope.question={};
    $scope.buttonID={};

    var stat1=[1,1,1,1];
    var stat2=[1,1,1,1];
    var stat3=[1,1,1,1];
    var stat4=[1,1,1,1];
    var stat5=[1,1,1,1];
    var stat6=[1,1,1,1,1,1];
    var count=0;

    $scope.init = function() {
        var i=0;
        //console.log(stat1[0],stat1[1],stat1[2],stat1[3],stat1[4]);
        //populate options for question1 
        while(i<3)
        {    
        var num = Math.floor(Math.random()*(4));//Math.random()<.5;//Math.floor((Math.random()*2)+0);
            //console.log(num);
            if(stat1[num])
            {
                stat1[num]=0;
                i++;
            }
            if(i==1&&stat1[1])
            {
                i++;
                stat1[1]=0;
            }    
        }
        i=0;     
        //var stat2=[1,1,1,1,1];
        //populate options for question2
        while(i<3)
        {    
            var num = Math.floor(Math.random()*(4));//Math.random()<.5;//Math.floor((Math.random()*2)+0);
            //console.log(num);
            if(stat2[num])
            {
                stat2[num]=0;
                i++;
            }
            if(i==1&&stat2[2])
            {
                i++;
                stat2[2]=0;
            }
        }
        i=0;
        //populate options for question2
        while(i<3)
        {    
            var num = Math.floor(Math.random()*(4));//Math.random()<.5;//Math.floor((Math.random()*2)+0);
            //console.log(num);
            if(stat3[num])
            {
                stat3[num]=0;
                i++;
            }
            if(i==1&&stat3[3])
            {
                i++;
                stat3[3]=0;
            }
        }//
        i=0;
        while(i<3)
        {    
            var num = Math.floor(Math.random()*(4));//Math.random()<.5;//Math.floor((Math.random()*2)+0);
            //console.log(num);
            if(stat4[num])
            {
                stat4[num]=0;
                i++;
            }
            if(i==1&&stat4[2])
            {
                i++;
                stat4[2]=0;
            }
        }//
        i=0;
        while(i<3)
        {    
            var num = Math.floor(Math.random()*(4));//Math.random()<.5;//Math.floor((Math.random()*2)+0);
            //console.log(num);
            if(stat5[num])
            {
                stat5[num]=0;
                i++;
            }
            if(i==1&&stat5[2])
            {
                i++;
                stat5[2]=0;
            }
        }//
        i=0;
        while(i<3)
        {    
            var num = Math.floor(Math.random()*(6));//Math.random()<.5;//Math.floor((Math.random()*2)+0);
            //console.log(num);
            if(stat6[num])
            {
                stat6[num]=0;
                i++;
            }
            if(i==1&&stat6[2])
            {
                i++;
                stat6[2]=0;
            }
        }//
    }  

    $scope.test = function () {
        console.log('inside redd')
        console.log("red: " + $scope.formData.favoriteColors.red)
    }

    $scope.GetRandom = function () {
        //console.log($scope.question.option+","+$scope.question.number)
        if(!stat1[$scope.question.option]&&$scope.question.number==1)
            return true;

        if(!stat2[$scope.question.option]&&$scope.question.number==2)
            return true;

        if(!stat3[$scope.question.option]&&$scope.question.number==3)
            return true;
        
        if(!stat4[$scope.question.option]&&$scope.question.number==4)
            return true;
       
        if(!stat5[$scope.question.option]&&$scope.question.number==5)
            return true;
        
        if(!stat6[$scope.question.option]&&$scope.question.number==6)
            return true;

        else    
            return false;
        
        //var num = Math.floor((Math.random() * (2) + 0));
        //return num;
    }

    $scope.controllerSayHello = function () {
        console.log("Hello from controllerSayHello")
    }

    $scope.CheckAnswers = function () {


        if($scope.buttonID=='a')
        {   
            //console.log("question 1")
            //console.log($scope.formData.option.a)
            if($scope.formData.option.b)
            {
                if($scope.formData.option.a||$scope.formData.option.c||$scope.formData.option.d)
                {    $scope.question.x = "Wrong Answer! "
                   return
                }
                $scope.question.x = "Correct Answer!"
            }
            else      
                $scope.question.x = "Wrong Answer! "
        }
        
        if($scope.buttonID=='b')
        {   
            //console.log("question 1")
            //console.log($scope.formData.option.a)
            if($scope.formData.option.c)
            {
                if($scope.formData.option.a||$scope.formData.option.b||$scope.formData.option.d)
                {    $scope.question.y = "Wrong Answer! "
                   return
                }
                $scope.question.y = "Correct Answer!"
            }
            else      
                $scope.question.y = "Wrong Answer! "
        }
        
        if($scope.buttonID=='c')
        {   
            if($scope.formData.option.c)
            {
                if($scope.formData.option.a||$scope.formData.option.b||$scope.formData.option.d)
                {    $scope.question.y = "Wrong Answer! "
                   return
                }
                $scope.question.y = "Correct Answer!"
            }else      
                $scope.question.z = "Wrong Answer! "
        }
        if($scope.buttonID=='d')
        {   
            //console.log("question 1")
            //console.log($scope.formData.option.a)
            if($scope.formData.option.b)
            {
                if($scope.formData.option.a||$scope.formData.option.c||$scope.formData.option.d)
                {    $scope.question.x = "Wrong Answer! "
                   return
                }
                $scope.question.u = "Correct Answer!"
            }
            else      
                $scope.question.u = "Wrong Answer! "
        }
        
        if($scope.buttonID=='e')
        {   
            //console.log("question 1")
            //console.log($scope.formData.option.a)
            if($scope.formData.option.c)
            {
                if($scope.formData.option.a||$scope.formData.option.b||$scope.formData.option.d)
                {    $scope.question.y = "Wrong Answer! "
                   return
                }
                $scope.question.v = "Correct Answer!"
            }
            else      
                $scope.question.v = "Wrong Answer! "
        }
        
        if($scope.buttonID=='f')
        {   
            if($scope.formData.option.c)
            {
                if($scope.formData.option.a||$scope.formData.option.b||$scope.formData.option.d)
                {    $scope.question.w = "Wrong Answer! "
                   return
                }
                $scope.question.w = "Correct Answer!"
            }
            else      
                $scope.question.w = "Wrong Answer! "
        }

     
  }


}]);

//this directive has access to all controller covered in it
app.directive("chapter2AssessmentP1", function () {


    var directive = {};
    directive.restrict = 'A';
    directive.template =
        "<h1>Provide the right sequence of options that will carry out the following:</h1>"+
        "<h3>"+
        "<li>Create a directory named <i>tutorial1</i> in the current working directory</li>"+
        "<li>Save the workspace in the <i>tutorial1</i> directory in a file named <i>file1</i></li>"+
        "<li>Clear the workspace</li>"+
        "<li>Load <i>file1</i> into the workspace</li>"+
        "</h3>" +

        "<h4><pre>"+
        "a) mkdir tutorial1  b) save mkdir/file1        c) load tutorial1/file1<br>" +
        "d) clear all        e) mkdir ('tutorial1')     f) save tutorial<br>" +
        "g) clear            h) load file1              i) cd tutorial1<br>" +
        "j) save tutorial1   k) save tutorial1/file1    l) mkdir('newdir')<br>" +
        "m) newdir = \'tutorial1\';</pre>" +
        "</h4>" +
        "<input type=\"text\" id=\"answerBoxa\" name=\"answerBox\" value=\"\">{{question.x1}}</h4><br>"+
        "<input type=\"text\" id=\"answerBoxb\" name=\"answerBox\" value=\"\">{{question.x2}}</h4><br>"+
        "<input type=\"text\" id=\"answerBoxc\" name=\"answerBox\" value=\"\">{{question.x3}}</h4><br>"+
        "<input type=\"text\" id=\"answerBoxd\" name=\"answerBox\" value=\"\">{{question.x4}}</h4><br>"+
   
        " <button value='Change Text' class=\"btn btn-success\" ng-click=\"buttonID='a';CheckAnswers()\" type=\"button\" ></button> " +
            "<br>"+
            "<h3>{{question.x5}}</h3>"

    return directive;

});


//this directive has access to all controller covered in it
app.directive("chapter2AssessmentP2", function () {


    var directive = {};
    directive.restrict = 'A';
    directive.template =
        "<h1>Provide a series of commands which will:</h1>" +
        "<h3>     " +
        "<li>Create a directory named tutorial2 in the current working directory</li>" +
        "<li>List the files and folders in the current working directory</li>" +
        "<li>Save the workspace in the tutorial2 directory in a file named myfile</li>" +
        "<li>Clear the workspace</li> " +
        "<li>Load file1 into the workspace</li>" +
        "<li>Check the contents of the workspace</li></h3>" +


        "<label class=\"checkbox-inline\" ng-show=\"question.number=2;question.option.b=0;GetRandom()\">" +
        "<input type=\"checkbox\" name=\"favoriteColors\" ng-model=\"formData.option.a\" ><br>" +
        ">> mkdir tutorial2 <br>" +
        ">> show tutorial2/file1 <br> " +
        ">> save <br>" +
        ">> load tutorial1/file1" +
        "</label><br>" +
        "<label class=\"checkbox-inline\" ng-show=\"question.number=2;question.option.b=1;GetRandom()\"> " +
        "<input type=\"checkbox\" name=\"favoriteColors\" ng-model=\"formData.option.b\" ><br>" +
        ">> mkdir ('tutorial2') <br> " +
        ">> show tutorial2 <br> " +
        ">> clear <br> " +
        ">> load file1 " +
        "</label><br> " +
        "<label class=\"checkbox-inline\" ng-show=\"question.number=2;question.option.b=2;GetRandom()\"> " +
        "<input type=\"checkbox\" name=\"favoriteColors\" ng-model=\"formData.option.c\" ><br> " +
        " >> mkdir (\'tutorial2\'); <br> " +
        " >> show tutorial2 <br> " +
        " >> clear <br> " +
        " >> load file1 " +
        " </label><br> " +
        "<label class=\"checkbox-inline\" ng-show=\"question.number=2;question.option.b=3;GetRandom()\"> " +
        "<input type=\"checkbox\" name=\"favoriteColors\" ng-model=\"formData.option.d\" ><br> " +
        "       >> mkdir('tutorial2') <br> " +
        "       >> save mkdir/file1 <br> " +
        "       >> clear <br> " +
        "       >> load tutorial2/file1 " +
        "   </label><br> " +
        "<label class=\"checkbox-inline\" ng-show=\"question.number=2;question.option.b=4;GetRandom()\"> " +
        "<input type=\"checkbox\" name=\"favoriteColors\" ng-model=\"formData.option.e\" ><br> " +
        "   >> newdir = tutorial; <br> " +
        "   >> mkdir('newdir') <br> " +
        "   >> save tutorial2 <br> " +
        "   >> clear all <br> " +
        "   >> load tutorial2/file1 " +
        "  </label><br> " +
        "</h4>" +

        " <button value='Change Text' class=\"btn btn-success\" ng-click=\"buttonID='b';CheckAnswers()\" type=\"button\" ></button> " +
            "<br>"+
            "<h3>{{question.y}}</h3>"


    return directive;

});

app.directive("chapter2AssessmentP3", function () {


    var directive = {};
    directive.restrict = 'A';
    directive.template =
        "<h1>Provide a series of commands which will:</h1>" +
        "<h4>     " +
        "<li>Create a directory named tutorial3 in the current working directory</li>" +
        "<li>Make tutorial3 the current working directory</li>" +
        "<li>Check the current working directory</li>" +

        "<label class=\"checkbox-inline\" ng-show=\"question.number=3;question.option.c=0;GetRandom()\">" +
        "<input type=\"checkbox\" name=\"favoriteColors\" ng-model=\"formData.option.a\" ><br>" +
        ">> mkdir tutorial3 <br>" +
        ">> cd tutorial3 <br> " +
        ">> pwd <br>" +
        "</label><br>" +
        "<label class=\"checkbox-inline\" ng-show=\"question.number=3;question.option.c=1;GetRandom()\"> " +
        "<input type=\"checkbox\" name=\"favoriteColors\" ng-model=\"formData.option.b\" ><br>" +
        ">> mkdir ('tutorial3') <br> " +
        ">> cd tutorial3 <br> " +
        ">> load <br> " +
        "</label><br> " +
        "<label class=\"checkbox-inline\" ng-show=\"question.number=3;question.option.c=2;GetRandom()\"> " +
        "<input type=\"checkbox\" name=\"favoriteColors\" ng-model=\"formData.option.c\" ><br> " +
        " >> newdir = \'tutorial3\'; <br> " +
        " >> save tutorial3 <br> " +
        " >> load tutorial3" +
        " </label><br> " +
        "<label class=\"checkbox-inline\" ng-show=\"question.number=3;question.option.c=3;GetRandom()\"> " +
        "<input type=\"checkbox\" name=\"favoriteColors\" ng-model=\"formData.option.d\" ><br> " +
        "       >> mkdir('tutorial3') <br> " +
        "       >> save mkdir/file3 <br> " +
        "       >> load tutorial3/file1 " +
        "   </label><br> " +
        "<label class=\"checkbox-inline\" ng-show=\"question.number=3;question.option.c=4;GetRandom()\"> " +
        "<input type=\"checkbox\" name=\"favoriteColors\" ng-model=\"formData.option.e\" ><br> " +
        "   >> newdir = tutorial3; <br> " +
        "   >> mkdir('newdir') <br> " +
        "   >> save tutorial3 <br> " +
        "  </label><br> " +
        "</h4>" +
        " <button value='Change Text' class=\"btn btn-success\" ng-click=\"buttonID='c';CheckAnswers()\" type=\"button\" ></button> " +
        "<br>"+
        "<h3>{{question.z}}</h3>"



    return directive;

});

app.directive("chapter2AssessmentP4", function () {


    var directive = {};
    directive.restrict = 'A';
    directive.template =
       "<h1>The following commands are typed at the command prompt. There are no variables in"+
    "the workspace prior to typing these commands. What are the variables in the" +
    "workspace and their values after typing these commands?</h1>" +
        "<h4>     " +
        ">> a= 3<br>" +
        ">> b = 2 <br> " +
        ">> c = a=b; d = a*c; <br> " +
        ">> e = 4<br>" +
        ">> f = 2*a;<br>" +
        ">>clear b, e <br>" +

        "<br>"+
        "<br>"+
        "<input type=\"text\" id=\"answerBoxa\" name=\"answerBox\" value=\"a\"><br></h4>"+
        "<input type=\"text\" id=\"answerBoxb\" name=\"answerBox\" value=\"b\"><br></h4>"+
        "<input type=\"text\" id=\"answerBoxc\" name=\"answerBox\" value=\"c\"><br></h4>"+
        "<input type=\"text\" id=\"answerBoxd\" name=\"answerBox\" value=\"d\"><br></h4>"+
        "<input type=\"text\" id=\"answerBoxe\" name=\"answerBox\" value=\"e\"><br></h4>"+
        
        "<input type=\"text\" id=\"answerBoxe\" name=\"answerBox\" value=\"f\"><br></h4>"+
        "<button value='Change Text' ng-model=\"formData.option.q4;question.number=4\" ng-click=\"buttonID='d';CheckAnswers()\" class=\"btn btn-success\" type=\"button\" >Check Answer</button> <br>"+
            "<h3>{{question.w}}</h3>"

    return directive;

});


app.directive("chapter2AssessmentP5", function () {


    var directive = {};
    directive.restrict = 'A';
    directive.template =
        "<h1>Match the commands to their respective actions</h1>"+
        "<h4>     " +
        "<pre>a) mkdir                      Clear the screen                " +
        "<input type=\"text\" id=\"answerBoxf\" name=\"answerBox\" value=\"\"></pre><br>"+
        "<pre>b) clear                      List files                      " +
        "<input type=\"text\" id=\"answerBoxg\" name=\"answerBox\" value=\"\"></pre><br>"+
        "<pre>c) show                       Load                            " +
        "<input type=\"text\" id=\"answerBoxh\" name=\"answerBox\" value=\"\"></pre><br>"+
        "<pre>d) save                       Make directory                  " +
        "<input type=\"text\" id=\"answerBoxi\" name=\"answerBox\" value=\"\"></pre><br>"+
        "<pre>e) load                       Save files                      " +
        "<input type=\"text\" id=\"answerBoxj\" name=\"answerBox\" value=\"\"></pre><br>"+
        
        "</h4><br>"+
        "<br>"+
        
        " <button value='Change Text' ng-model=\"formData.option.q5;question.number=5\" ng-click=\"buttonID='e';CheckAnswers()\" class=\"btn btn-success\" type=\"button\" >Check Answer</button> <br>"+
            "<h3>{{question.l}}</h3>"


    return directive;

});


//this directive has access to all controller covered in it
app.directive("chapter3AssessmentP1", function () {


    var directive = {};
    directive.restrict = 'A';
    directive.template =
        "<h1>Select all options below which calculate tan(45°) and assigns the result to a variable x. <br>Note 180°= π radians≈ 3.1415 radians.</h1>" +
        "<h4>     " +
        "<label class=\"checkbox-inline\" ng-show=\"question.number=1;question.option=0;GetRandom()\">" +
        "<input type=\"checkbox\" name=\"favoriteColors\" ng-change=\"formData.option.a=true\" ng-model=\"formData.option.a\" ><br>" +
        "x = tan(45*pi/180)" +
        "</label><br>" +
        "<label class=\"checkbox-inline\" ng-show=\"question.number=1;question.option=1;GetRandom()\"> " +
        "<input type=\"checkbox\" name=\"favoriteColors\" ng-change=\"formData.option.b=true\" ng-model=\"formData.option.b\" ><br>" +
        "x = tan(45) <br> " +
        "</label><br> " +
        "<label class=\"checkbox-inline\" ng-show=\"question.number=1;question.option=2;GetRandom()\"> " +
        "<input type=\"checkbox\" name=\"favoriteColors\" ng-change=\"formData.option.c=true\" ng-model=\"formData.option.c\" ><br> " +
        " angle = 45<br>" +
        " angle_rad = 45*180/pi<br>" +
        " x=tan(angle_rad)<br>" +
        " </label><br> " +
        "<label class=\"checkbox-inline\" ng-show=\"question.number=1;question.option=3;GetRandom()\"> " +
        "<input type=\"checkbox\" name=\"favoriteColors\" ng-change=\"formData.option.d=true\" ng-model=\"formData.option.d\" ><br> " +
        " angle = 45<br>" +
        " 45*pi/180<br>" +
        " x=tan(ans)<br>" +
        "   </label><br> " +
        "<label class=\"checkbox-inline\" ng-show=\"question.number=1;question.option=4;GetRandom()\"> " +
        "<input type=\"checkbox\" name=\"favoriteColors\" ng-change=\"formData.option.e=true\" ng-model=\"formData.option.e\" ><br> " +
        "x = tand(45) <br> " +
        "  </label><br> " +
        "</h4>" +
        " <button value='Change Text' class=\"btn btn-success\" ng-click=\"buttonID='a';CheckAnswers()\" type=\"button\" ></button> " +
        "<br>"+
        "<h3>{{question.x}}</h3>"
        
    return directive;

});

app.directive("chapter3AssessmentP2", function () {


    var directive = {};
    directive.restrict = 'A';
    directive.template =
        "<h1>Select all options below which calculate. Assume that values for x and z exist in the workspace. <br>Note 180°= π radians≈ 3.1415 radians.</h1>" +
        "<h4>     " +
        "<label class=\"checkbox-inline\" ng-show=\"question.number=2;question.option=0;GetRandom()\">" +
        "<input type=\"checkbox\" name=\"favoriteColors\" ng-change=\"formData.option.a=true\" ng-model=\"formData.option.a\" ><br>" +
        " y = (2.*(x.^2))./(4.*z)" +
        "</label><br>" +
        "<label class=\"checkbox-inline\" ng-show=\"question.number=2;question.option=1;GetRandom()\"> " +
        "<input type=\"checkbox\" name=\"favoriteColors\" ng-change=\"formData.option.b=true\" ng-model=\"formData.option.b\" ><br>" +
        "y = 2.*x.^2./4./z <br> " +
        "</label><br> " +
        "<label class=\"checkbox-inline\" ng-show=\"question.number=2;question.option=2;GetRandom()\"> " +
        "<input type=\"checkbox\" name=\"favoriteColors\" ng-change=\"formData.option.c=true\" ng-model=\"formData.option.c\" ><br> " +
        "y = 2x.^2/4z" +
        " </label><br> " +
        "<label class=\"checkbox-inline\" ng-show=\"question.number=2;question.option=3;GetRandom()\"> " +
        "<input type=\"checkbox\" name=\"favoriteColors\" ng-change=\"formData.option.d=true\" ng-model=\"formData.option.d\" ><br> " +
        " y = (2.*x).^2./(4.*z)" +
        "   </label><br> " +
        "<label class=\"checkbox-inline\" ng-show=\"question.number=2;question.option=4;GetRandom()\"> " +
        "<input type=\"checkbox\" name=\"favoriteColors\" ng-change=\"formData.option.e=true\" ng-model=\"formData.option.e\" ><br> " +
        "y = (2.*x.^2./(4.*z)<br> " +
        "  </label><br> " +
        "<label class=\"checkbox-inline\" ng-show=\"question.number=2;question.option=5;GetRandom()\"> " +
        "<input type=\"checkbox\" name=\"favoriteColors\" ng-change=\"formData.option.f=true\" ng-model=\"formData.option.f\" ><br> " +
        "y = 2.*x.^2./(4.*z)<br> " +
        "  </label><br> " +
        "</h4>" +
        " <button value='Change Text' class=\"btn btn-success\" ng-click=\"buttonID='b';CheckAnswers()\" type=\"button\" ></button> " +
        "<br>"+
        "<h3>{{question.y}}</h3>"
        
    return directive;

});


app.directive("chapter3AssessmentP3", function () {


    var directive = {};
    directive.restrict = 'A';
    directive.template =
        "<h1>Provide a mathematical expression which is equivalent to the MATLAB expression<br></h1>" +
        " <h3>z = 4.*sqrt(w)./x./y.^3</h3><br>"+
        "<input type=\"text\" id=\"answerBoxa\" name=\"answerBox\" value=\"a\"><br></h4>"+
        
        " <button value='Change Text' class=\"btn btn-success\" ng-click=\"buttonID='c';CheckAnswers()\" type=\"button\" ></button> " +
        "<br>"+
        "<h3>{{question.z}}</h3>"
        
    return directive;

});


app.directive("chapter3AssessmentP4", function () {


    var directive = {};
    directive.restrict = 'A';
    directive.template =
        "<h1>Provide a MATLAB expression which is equivalent to the mathematical expression below. Assume that the variable d is already present in the workspace. Your value should be accurate to within 12 decimal places.<br></h1>" +
        " <h3>z = 4.*sqrt(w)./x./y.^3</h3><br>"+
        "<input type=\"text\" id=\"answerBoxb\" name=\"answerBox\" value=\"a\"><br></h4>"+
        
        " <button value='Change Text' class=\"btn btn-success\" ng-click=\"buttonID='c';CheckAnswers()\" type=\"button\" ></button> " +
        "<br>"+
        "<h3>{{question.w}}</h3>"
        
    return directive;

});


app.directive("chapter3AssessmentP5", function () {


    var directive = {};
    directive.restrict = 'A';
    directive.template =
        "<h1>What is the value of y resulting form the following MATLAB commands:<br></h1>" +
        "<h4>     " +
        "<label class=\"checkbox-inline\" ng-show=\"question.number=5;question.option=0;GetRandom()\">" +
        "<input type=\"checkbox\" name=\"favoriteColors\" ng-change=\"formData.option.a=true\" ng-model=\"formData.option.a\" ><br>" +
        " x = 3<br>" +
        " case = 2<br>" +
        " y = 2.*x + case" +
        "</label><br>" +
        "<label class=\"checkbox-inline\" ng-show=\"question.number=5;question.option=1;GetRandom()\"> " +
        "<input type=\"checkbox\" name=\"favoriteColors\" ng-change=\"formData.option.b=true\" ng-model=\"formData.option.b\" ><br>" +
        "y = 7 <br> " +
        "</label><br> " +
        "<label class=\"checkbox-inline\" ng-show=\"question.number=5;question.option=2;GetRandom()\"> " +
        "<input type=\"checkbox\" name=\"favoriteColors\" ng-change=\"formData.option.c=true\" ng-model=\"formData.option.c\" ><br> " +
        "y = 8" +
        " </label><br> " +
        "<label class=\"checkbox-inline\" ng-show=\"question.number=5;question.option=3;GetRandom()\"> " +
        "<input type=\"checkbox\" name=\"favoriteColors\" ng-change=\"formData.option.d=true\" ng-model=\"formData.option.d\" ><br> " +
        " y = NaN" +
        "   </label><br> " +
        "<label class=\"checkbox-inline\" ng-show=\"question.number=5;question.option=4;GetRandom()\"> " +
        "<input type=\"checkbox\" name=\"favoriteColors\" ng-change=\"formData.option.e=true\" ng-model=\"formData.option.e\" ><br> " +
        "Error " +
        "  </label><br> " +
        "</h4>" +
        " <button value='Change Text' class=\"btn btn-success\" ng-click=\"buttonID='e';CheckAnswers()\" type=\"button\" ></button> " +
        "<br>"+
        "<h3>{{question.l}}</h3>"
        
    return directive;

});

app.directive("chapter5AssessmentP1", function () {


    var directive = {};
    directive.restrict = 'A';
    directive.template =
        "<h1>Select the option below which results from the following MATLAB commands. Assume that no variables are present in the workspace before the commands are typed.<br> >> A = [0, 1 3; 2, 4]</h1>" +
        "<h4>     " +
        "<label class=\"checkbox-inline\" ng-show=\"question.number=1;question.option=0;GetRandom()\">" +
        "<input type=\"checkbox\" name=\"favoriteColors\" ng-change=\"formData.option.a=true\" ng-model=\"formData.option.a\" ><br>" +
        " 0 1 3 2 4" +
        "</label><br>" +
        "<label class=\"checkbox-inline\" ng-show=\"question.number=1;question.option=1;GetRandom()\"> " +
        "<input type=\"checkbox\" name=\"favoriteColors\" ng-change=\"formData.option.b=true\" ng-model=\"formData.option.b\" ><br>" +
        "0 1 3  <br> " +
        "2 4</label><br> " +
        "<label class=\"checkbox-inline\" ng-show=\"question.number=1;question.option=2;GetRandom()\"> " +
        "<input type=\"checkbox\" name=\"favoriteColors\" ng-change=\"formData.option.c=true\" ng-model=\"formData.option.c\" ><br> " +
        "0 2 <br> " +
        "1 4 <br> " +
        "3 </label><br> " +
        "<label class=\"checkbox-inline\" ng-show=\"question.number=1;question.option=3;GetRandom()\"> " +
        "<input type=\"checkbox\" name=\"favoriteColors\" ng-change=\"formData.option.d=true\" ng-model=\"formData.option.d\" ><br> " +
        " error" +
        "   </label><br> " +
        "</h4>" +
        " <button value='Change Text' class=\"btn btn-success\" ng-click=\"buttonID='a';CheckAnswers()\" type=\"button\" ></button> " +
        "<br>"+
        "<h3>{{question.x}}</h3>"
        
    return directive;

});

app.directive("chapter5AssessmentP2", function () {


    var directive = {};
    directive.restrict = 'A';
    directive.template =
        "<h1>Select the option below which results from the following MATLAB commands. Assume that no variables are present in the workspace before the commands are typed.<br> >> B = [0, 1, 2; 3, 4 5; 6 7, 8]<br>>>B(2,3) = 9</h1>" +
        "<h4>     " +
        "<label class=\"checkbox-inline\" ng-show=\"question.number=2;question.option=0;GetRandom()\">" +
        "<input type=\"checkbox\" name=\"favoriteColors\" ng-change=\"formData.option.a=true\" ng-model=\"formData.option.a\" ><br>" +
        " 0 1 2 3 4 5 6 7 8" +
        "</label><br>" +
        "<label class=\"checkbox-inline\" ng-show=\"question.number=2;question.option=1;GetRandom()\"> " +
        "<input type=\"checkbox\" name=\"favoriteColors\" ng-change=\"formData.option.b=true\" ng-model=\"formData.option.b\" ><br>" +
        "0 1 2  <br> " +
        "3 4 5<br>"+
        "6 7 8</label><br> " +
        "<label class=\"checkbox-inline\" ng-show=\"question.number=2;question.option=2;GetRandom()\"> " +
        "<input type=\"checkbox\" name=\"favoriteColors\" ng-change=\"formData.option.c=true\" ng-model=\"formData.option.c\" ><br> " +
        "0 1 2  <br> " +
        "3 4 9<br>"+
        "6 7 8</label><br> " +
        "<label class=\"checkbox-inline\" ng-show=\"question.number=2;question.option=3;GetRandom()\"> " +
        "<input type=\"checkbox\" name=\"favoriteColors\" ng-change=\"formData.option.d=true\" ng-model=\"formData.option.d\" ><br> " +
        " error" +
        "   </label><br> " +
        "</h4>" +
        " <button value='Change Text' class=\"btn btn-success\" ng-click=\"buttonID='b';CheckAnswers()\" type=\"button\" ></button> " +
        "<br>"+
        "<h3>{{question.y}}</h3>"
        
    return directive;

});

app.directive("chapter5AssessmentP3", function () {


    var directive = {};
    directive.restrict = 'A';
    directive.template =
        "<h1>Select the option below which results from the following MATLAB commands.  Assume that no variables are present in the workspace before the commands are typed.<br> >> C = [0, 1, 2; 3, 4  5; 6  7, 8]<br> >> C(4,3) = 9</h1>" +
        "<h4>     " +
        "<label class=\"checkbox-inline\" ng-show=\"question.number=3;question.option=0;GetRandom()\">" +
        "<input type=\"checkbox\" name=\"favoriteColors\" ng-change=\"formData.option.a=true\" ng-model=\"formData.option.a\" ><br>" +
        " 0 1 2 3 4 5 6 7 8" +
        "</label><br>" +
        "<label class=\"checkbox-inline\" ng-show=\"question.number=3;question.option=1;GetRandom()\"> " +
        "<input type=\"checkbox\" name=\"favoriteColors\" ng-change=\"formData.option.b=true\" ng-model=\"formData.option.b\" ><br>" +
        "0 1 2  <br> " +
        "3 4 5<br>"+
        "6 7 8</label><br> " +
        "<label class=\"checkbox-inline\" ng-show=\"question.number=3;question.option=2;GetRandom()\"> " +
        "<input type=\"checkbox\" name=\"favoriteColors\" ng-change=\"formData.option.c=true\" ng-model=\"formData.option.c\" ><br> " +
        "0 1 2  <br> " +
        "3 4 9<br>"+
        "6 7 8</label><br> " +
        "<label class=\"checkbox-inline\" ng-show=\"question.number=3;question.option=3;GetRandom()\"> " +
        "<input type=\"checkbox\" name=\"favoriteColors\" ng-change=\"formData.option.d=true\" ng-model=\"formData.option.d\" ><br> " +
        " error" +
        "   </label><br> " +
        "</h4>" +
        " <button value='Change Text' class=\"btn btn-success\" ng-click=\"buttonID='c';CheckAnswers()\" type=\"button\" ></button> " +
        "<br>"+
        "<h3>{{question.z}}</h3>"
        
    return directive;

});

app.directive("chapter5AssessmentP21", function () {


    var directive = {};
    directive.restrict = 'A';
    directive.template =
        "<h1>Select the option below which results from the following MATLAB commands. Assume that no variables are present in the workspace before the commands are typed. <br> >> A = 2:0.3:3 </h1>" +
        "<h4>     " +
        "<label class=\"checkbox-inline\" ng-show=\"question.number=1;question.option=0;GetRandom()\">" +
        "<input type=\"checkbox\" name=\"favoriteColors\" ng-change=\"formData.option.a=true\" ng-model=\"formData.option.a\" ><br>" +
        " 0 1 2 3 4 5 6 7 8" +
        "</label><br>" +
        "<label class=\"checkbox-inline\" ng-show=\"question.number=1;question.option=1;GetRandom()\"> " +
        "<input type=\"checkbox\" name=\"favoriteColors\" ng-change=\"formData.option.b=true\" ng-model=\"formData.option.b\" ><br>" +
        "0 1 2  <br> " +
        "3 4 5<br>"+
        "6 7 8</label><br> " +
        "<label class=\"checkbox-inline\" ng-show=\"question.number=1;question.option=2;GetRandom()\"> " +
        "<input type=\"checkbox\" name=\"favoriteColors\" ng-change=\"formData.option.c=true\" ng-model=\"formData.option.c\" ><br> " +
        "0 1 2  <br> " +
        "3 4 9<br>"+
        "6 7 8</label><br> " +
        "<label class=\"checkbox-inline\" ng-show=\"question.number=1;question.option=3;GetRandom()\"> " +
        "<input type=\"checkbox\" name=\"favoriteColors\" ng-change=\"formData.option.d=true\" ng-model=\"formData.option.d\" ><br> " +
        " error" +
        "   </label><br> " +
        "</h4>" +
        " <button value='Change Text' class=\"btn btn-success\" ng-click=\"buttonID='a';CheckAnswers()\" type=\"button\" ></button> " +
        "<br>"+
        "<h3>{{question.x}}</h3>"
        
    return directive;

});

app.directive("chapter5AssessmentP22", function () {


    var directive = {};
    directive.restrict = 'A';
    directive.template =
        "<h1>Select the option below which results from the following MATLAB commands. Assume that no variables are present in the workspace before the commands are typed. <br> >> A = 2:0.3:3.1 </h1>" +
        "<h4>     " +
        "<label class=\"checkbox-inline\" ng-show=\"question.number=2;question.option=0;GetRandom()\">" +
        "<input type=\"checkbox\" name=\"favoriteColors\" ng-change=\"formData.option.a=true\" ng-model=\"formData.option.a\" ><br>" +
        " 0 1 2 3 4 5 6 7 8" +
        "</label><br>" +
        "<label class=\"checkbox-inline\" ng-show=\"question.number=2;question.option=1;GetRandom()\"> " +
        "<input type=\"checkbox\" name=\"favoriteColors\" ng-change=\"formData.option.b=true\" ng-model=\"formData.option.b\" ><br>" +
        "0 1 2  <br> " +
        "3 4 5<br>"+
        "6 7 8</label><br> " +
        "<label class=\"checkbox-inline\" ng-show=\"question.number=2;question.option=2;GetRandom()\"> " +
        "<input type=\"checkbox\" name=\"favoriteColors\" ng-change=\"formData.option.c=true\" ng-model=\"formData.option.c\" ><br> " +
        "0 1 2  <br> " +
        "3 4 9<br>"+
        "6 7 8</label><br> " +
        "<label class=\"checkbox-inline\" ng-show=\"question.number=2;question.option=3;GetRandom()\"> " +
        "<input type=\"checkbox\" name=\"favoriteColors\" ng-change=\"formData.option.d=true\" ng-model=\"formData.option.d\" ><br> " +
        " error" +
        "   </label><br> " +
        "</h4>" +
        " <button value='Change Text' class=\"btn btn-success\" ng-click=\"buttonID='b';CheckAnswers()\" type=\"button\" ></button> " +
        "<br>"+
        "<h3>{{question.y}}</h3>"
        
    return directive;

});


app.directive("chapter5AssessmentP23", function () {


    var directive = {};
    directive.restrict = 'A';
    directive.template =
        "<h1>Select all options below which will create the array: </h1>" +
        "<h4>     " +
        "<label class=\"checkbox-inline\" ng-show=\"question.number=3;question.option=0;GetRandom()\">" +
        "<input type=\"checkbox\" name=\"favoriteColors\" ng-change=\"formData.option.a=true\" ng-model=\"formData.option.a\" ><br>" +
        " >> A = 0.1:0.3:1.0 " +
        "</label><br>" +
        "<label class=\"checkbox-inline\" ng-show=\"question.number=3;question.option=1;GetRandom()\"> " +
        "<input type=\"checkbox\" name=\"favoriteColors\" ng-change=\"formData.option.b=true\" ng-model=\"formData.option.b\" ><br>" +
        ">> A = 0.1:0.3:1.2</label><br> " +
        "<label class=\"checkbox-inline\" ng-show=\"question.number=3;question.option=2;GetRandom()\"> " +
        "<input type=\"checkbox\" name=\"favoriteColors\" ng-change=\"formData.option.c=true\" ng-model=\"formData.option.c\" ><br> " +
        ">> A = [0.1 0.4 0.7 1.0]"+
        "</label><br> " +
        "<label class=\"checkbox-inline\" ng-show=\"question.number=3;question.option=3;GetRandom()\"> " +
        "<input type=\"checkbox\" name=\"favoriteColors\" ng-change=\"formData.option.d=true\" ng-model=\"formData.option.d\" ><br> " +
        " >> A = [0.1,0.4,0.7,1]" +
        "   </label><br> " +
        "<label class=\"checkbox-inline\" ng-show=\"question.number=3;question.option=4;GetRandom()\"> " +
        "<input type=\"checkbox\" name=\"favoriteColors\" ng-change=\"formData.option.d=true\" ng-model=\"formData.option.e\" ><br> " +
        "All of the above" +
        "   </label><br> " +
        "</h4>" +
        " <button value='Change Text' class=\"btn btn-success\" ng-click=\"buttonID='c';CheckAnswers()\" type=\"button\" ></button> " +
        "<br>"+
        "<h3>{{question.z}}</h3>"
        
    return directive;

});


app.directive("chapter5AssessmentP31", function () {


    var directive = {};
    directive.restrict = 'A';
    directive.template =
        "<h1>Select the value of sizeA which results from the following MATLAB commands. Assume that no variables are present in the workspace before the commands are typed.<br> >> A = 2:0.3:3 <br> >> sizeA = size(A)</h1>" +
        "<h4>     " +
        "<label class=\"checkbox-inline\" ng-show=\"question.number=1;question.option=0;GetRandom()\">" +
        "<input type=\"checkbox\" name=\"favoriteColors\" ng-change=\"formData.option.a=true\" ng-model=\"formData.option.a\" ><br>" +
        " sizeA = [1 3] " +
        "</label><br>" +
        "<label class=\"checkbox-inline\" ng-show=\"question.number=1;question.option=1;GetRandom()\"> " +
        "<input type=\"checkbox\" name=\"favoriteColors\" ng-change=\"formData.option.b=true\" ng-model=\"formData.option.b\" ><br>" +
        " sizeA = [3]</label><br> " +
        "<label class=\"checkbox-inline\" ng-show=\"question.number=1;question.option=2;GetRandom()\"> " +
        "<input type=\"checkbox\" name=\"favoriteColors\" ng-change=\"formData.option.c=true\" ng-model=\"formData.option.c\" ><br> " +
        "sizeA = [3 1]"+
        "</label><br> " +
        "<label class=\"checkbox-inline\" ng-show=\"question.number=1;question.option=3;GetRandom()\"> " +
        "<input type=\"checkbox\" name=\"favoriteColors\" ng-change=\"formData.option.d=true\" ng-model=\"formData.option.d\" ><br> " +
        "sizeA = [1 4]" +
        "   </label><br> " +
        "<label class=\"checkbox-inline\" ng-show=\"question.number=1;question.option=4;GetRandom()\"> " +
        "<input type=\"checkbox\" name=\"favoriteColors\" ng-change=\"formData.option.d=true\" ng-model=\"formData.option.e\" ><br> " +
        "Error" +
        "   </label><br> " +
        "</h4>" +
        " <button value='Change Text' class=\"btn btn-success\" ng-click=\"buttonID='a';CheckAnswers()\" type=\"button\" ></button> " +
        "<br>"+
        "<h3>{{question.x}}</h3>"
        
    return directive;

});


app.directive("chapter5AssessmentP32", function () {


    var directive = {};
    directive.restrict = 'A';
    directive.template =
        "<h1>Select the values of nrowB and ncolB which result from the following MATLAB commands. Assume that no variables are present in the workspace before the commands are typed.<br> >> B = 0:0.1:1 <br> >> [nrowA, ncolA] = size(A)</h1>" +
        "<h4>     " +
        "<label class=\"checkbox-inline\" ng-show=\"question.number=2;question.option=0;GetRandom()\">" +
        "<input type=\"checkbox\" name=\"favoriteColors\" ng-change=\"formData.option.a=true\" ng-model=\"formData.option.a\" ><br>" +
        " nrowA = 1 <br> ncolA = 10 " +
        "</label><br>" +
        "<label class=\"checkbox-inline\" ng-show=\"question.number=2;question.option=1;GetRandom()\"> " +
        "<input type=\"checkbox\" name=\"favoriteColors\" ng-change=\"formData.option.b=true\" ng-model=\"formData.option.b\" ><br>" +
        "nrowA = 10 <br> ncolA = 1</label><br> " +
        "<label class=\"checkbox-inline\" ng-show=\"question.number=2;question.option=2;GetRandom()\"> " +
        "<input type=\"checkbox\" name=\"favoriteColors\" ng-change=\"formData.option.c=true\" ng-model=\"formData.option.c\" ><br> " +
        "nrowA = 11<br>ncolA = 11"+
        "</label><br> " +
        "<label class=\"checkbox-inline\" ng-show=\"question.number=2;question.option=3;GetRandom()\"> " +
        "<input type=\"checkbox\" name=\"favoriteColors\" ng-change=\"formData.option.d=true\" ng-model=\"formData.option.d\" ><br> " +
        "nrowA = 11 <br> ncolA = 11" +
        "   </label><br> " +
        "<label class=\"checkbox-inline\" ng-show=\"question.number=2;question.option=4;GetRandom()\"> " +
        "<input type=\"checkbox\" name=\"favoriteColors\" ng-change=\"formData.option.d=true\" ng-model=\"formData.option.e\" ><br> " +
        "Error" +
        "   </label><br> " +
        "</h4>" +
        " <button value='Change Text' class=\"btn btn-success\" ng-click=\"buttonID='b';CheckAnswers()\" type=\"button\" ></button> " +
        "<br>"+
        "<h3>{{question.y}}</h3>"
        
    return directive;
});


app.directive("chapter5AssessmentP33", function () {


    var directive = {};
    directive.restrict = 'A';
    directive.template =
        "<h1>Select the values of nrowA and ncolA which result from the following MATLAB commands. Assume that no variables are present in the workspace before the commands are typed.<br> >> C = 0:0.1:1 <br> >> sizeA = size(A)</h1>" +
        "<h4>     " +
        "<label class=\"checkbox-inline\" ng-show=\"question.number=3;question.option=0;GetRandom()\">" +
        "<input type=\"checkbox\" name=\"favoriteColors\" ng-change=\"formData.option.a=true\" ng-model=\"formData.option.a\" ><br>" +
        " sizeA = [1 3]" +
        "</label><br>" +
        "<label class=\"checkbox-inline\" ng-show=\"question.number=3;question.option=1;GetRandom()\"> " +
        "<input type=\"checkbox\" name=\"favoriteColors\" ng-change=\"formData.option.b=true\" ng-model=\"formData.option.b\" ><br>" +
        "sizeA = [3]</label><br> " +
        "<label class=\"checkbox-inline\" ng-show=\"question.number=3;question.option=2;GetRandom()\"> " +
        "<input type=\"checkbox\" name=\"favoriteColors\" ng-change=\"formData.option.c=true\" ng-model=\"formData.option.c\" ><br> " +
        "sizeA = [3 1]"+
        "</label><br> " +
        "<label class=\"checkbox-inline\" ng-show=\"question.number=3;question.option=3;GetRandom()\"> " +
        "<input type=\"checkbox\" name=\"favoriteColors\" ng-change=\"formData.option.d=true\" ng-model=\"formData.option.d\" ><br> " +
        "sizeA = [1 4]" +
        "   </label><br> " +
        "<label class=\"checkbox-inline\" ng-show=\"question.number=3;question.option=4;GetRandom()\"> " +
        "<input type=\"checkbox\" name=\"favoriteColors\" ng-change=\"formData.option.d=true\" ng-model=\"formData.option.e\" ><br> " +
        "Error" +
        "   </label><br> " +
        "</h4>" +
        " <button value='Change Text' class=\"btn btn-success\" ng-click=\"buttonID='c';CheckAnswers()\" type=\"button\" ></button> " +
        "<br>"+
        "<h3>{{question.z}}</h3>"
        
    return directive;
});



app.directive("chapter5AssessmentP34", function () {


    var directive = {};
    directive.restrict = 'A';
    directive.template =
        "<h1>Select all options below which will return the total number of elements in the array D as the variable ND. Assume that no variables are present in the workspace before the commands are typed.<br> >> D = 0:0.2:1 </h1>" +
        "<h4>     " +
        "<label class=\"checkbox-inline\" ng-show=\"question.number=4;question.option=0;GetRandom()\">" +
        "<input type=\"checkbox\" name=\"favoriteColors\" ng-change=\"formData.option.a=true\" ng-model=\"formData.option.a\" ><br>" +
        " ND = 6" +
        "</label><br>" +
        "<label class=\"checkbox-inline\" ng-show=\"question.number=4;question.option=1;GetRandom()\"> " +
        "<input type=\"checkbox\" name=\"favoriteColors\" ng-change=\"formData.option.b=true\" ng-model=\"formData.option.b\" ><br>" +
        "ND = length(D)</label><br> " +
        "<label class=\"checkbox-inline\" ng-show=\"question.number=4;question.option=2;GetRandom()\"> " +
        "<input type=\"checkbox\" name=\"favoriteColors\" ng-change=\"formData.option.c=true\" ng-model=\"formData.option.c\" ><br> " +
        "ND = size(D)"+
        "</label><br> " +
        "<label class=\"checkbox-inline\" ng-show=\"question.number=4;question.option=3;GetRandom()\"> " +
        "<input type=\"checkbox\" name=\"favoriteColors\" ng-change=\"formData.option.d=true\" ng-model=\"formData.option.d\" ><br> " +
        "ND = numel(D)" +
        "   </label><br> " +
        "<label class=\"checkbox-inline\" ng-show=\"question.number=4;question.option=4;GetRandom()\"> " +
        "<input type=\"checkbox\" name=\"favoriteColors\" ng-change=\"formData.option.d=true\" ng-model=\"formData.option.e\" ><br> " +
        "Error" +
        "   </label><br> " +
        "</h4>" +
        " <button value='Change Text' class=\"btn btn-success\" ng-click=\"buttonID='d';CheckAnswers()\" type=\"button\" ></button> " +
        "<br>"+
        "<h3>{{question.w}}</h3>"
        
    return directive;
});


app.directive("chapter5AssessmentP41", function () {


    var directive = {};
    directive.restrict = 'A';
    directive.template =
        "<h1>Select all options below which will return the a 2x2 matrix of “ones” and assigns it to a variable named MyOnesArray.<br> </h1>" +
        "<h4>     " +
        "<label class=\"checkbox-inline\" ng-show=\"question.number=1;question.option=0;GetRandom()\">" +
        "<input type=\"checkbox\" name=\"favoriteColors\" ng-change=\"formData.option.a=true\" ng-model=\"formData.option.a\" ><br>" +
        " >> MyOnesArray = [1 1; 1 1]" +
        "</label><br>" +
        "<label class=\"checkbox-inline\" ng-show=\"question.number=1;question.option=1;GetRandom()\"> " +
        "<input type=\"checkbox\" name=\"favoriteColors\" ng-change=\"formData.option.b=true\" ng-model=\"formData.option.b\" ><br>" +
        ">> ones(2,2) {hint: assign the array to a variable}<br>" +
        "</label><br>" +
        "<label class=\"checkbox-inline\" ng-show=\"question.number=1;question.option=2;GetRandom()\"> " +
        "<input type=\"checkbox\" name=\"favoriteColors\" ng-change=\"formData.option.c=true\" ng-model=\"formData.option.c\" ><br> " +
        ">> MyOnesArray = ones(2,2)"+
        "</label><br> " +
        "<label class=\"checkbox-inline\" ng-show=\"question.number=1;question.option=3;GetRandom()\"> " +
        "<input type=\"checkbox\" name=\"favoriteColors\" ng-change=\"formData.option.d=true\" ng-model=\"formData.option.d\" ><br> " +
        ">> MyOnesArray = ones(2)" +
        "   </label><br> " +
        "<label class=\"checkbox-inline\" ng-show=\"question.number=1;question.option=4;GetRandom()\"> " +
        "<input type=\"checkbox\" name=\"favoriteColors\" ng-change=\"formData.option.e=true\" ng-model=\"formData.option.d\" ><br> " +
        "None of the above" +
        "   </label><br> " +
        "</h4>" +
        " <button value='Change Text' class=\"btn btn-success\" ng-click=\"buttonID='a';CheckAnswers()\" type=\"button\" ></button> " +
        "<br>"+
        "<h3>{{question.x}}</h3>"
        
    return directive;
});


app.directive("chapter5AssessmentP42", function () {


    var directive = {};
    directive.restrict = 'A';
    directive.template =
        "<h1>Select all options below which will return a 3x4 matrix of “zeros” and assigns it to a variable named ZerosArray.<br> </h1>" +
        "<h4>     " +
        "<label class=\"checkbox-inline\" ng-show=\"question.number=2;question.option=0;GetRandom()\">" +
        "<input type=\"checkbox\" name=\"favoriteColors\" ng-change=\"formData.option.a=true\" ng-model=\"formData.option.a\" ><br>" +
        " >> ZerosArray = zeros(3,4)" +
        "</label><br>" +
        "<label class=\"checkbox-inline\" ng-show=\"question.number=2;question.option=1;GetRandom()\"> " +
        "<input type=\"checkbox\" name=\"favoriteColors\" ng-change=\"formData.option.b=true\" ng-model=\"formData.option.b\" ><br>" +
        ">> ZerosArray = zeros(4,3) {hint: this has two rows and three columns}<br>" +
        "</label><br>" +
        "<label class=\"checkbox-inline\" ng-show=\"question.number=2;question.option=2;GetRandom()\"> " +
        "<input type=\"checkbox\" name=\"favoriteColors\" ng-change=\"formData.option.c=true\" ng-model=\"formData.option.c\" ><br> " +
        ">> ZerosArray = [0, 0, 0, 0; 0 0 0, 0; 0, 0 0 0]"+
        "</label><br> " +
        "<label class=\"checkbox-inline\" ng-show=\"question.number=2;question.option=3;GetRandom()\"> " +
        "<input type=\"checkbox\" name=\"favoriteColors\" ng-change=\"formData.option.d=true\" ng-model=\"formData.option.d\" ><br> " +
        ">> Array = zeros(3,4) {hint: check the variable name}" +
        "   </label><br> " +
        "<label class=\"checkbox-inline\" ng-show=\"question.number=2;question.option=4;GetRandom()\"> " +
        "<input type=\"checkbox\" name=\"favoriteColors\" ng-change=\"formData.option.e=true\" ng-model=\"formData.option.d\" ><br> " +
        "None of the above" +
        "   </label><br> " +
        "</h4>" +
        " <button value='Change Text' class=\"btn btn-success\" ng-click=\"buttonID='b';CheckAnswers()\" type=\"button\" ></button> " +
        "<br>"+
        "<h3>{{question.y}}</h3>"
        
    return directive;
});


app.directive("chapter5AssessmentP51", function () {


    var directive = {};
    directive.restrict = 'A';
    directive.template =
        "<h1>What is b as a result of the following commands?<br> >> A = [1 2; 3 4; 5 6] <br> >> b = A(2,3)</h1>" +
        "<h4>     " +
        "<label class=\"checkbox-inline\" ng-show=\"question.number=1;question.option=0;GetRandom()\">" +
        "<input type=\"checkbox\" name=\"favoriteColors\" ng-change=\"formData.option.a=true\" ng-model=\"formData.option.a\" ><br>" +
        "b = 6" +
        "</label><br>" +
        "<label class=\"checkbox-inline\" ng-show=\"question.number=1;question.option=1;GetRandom()\"> " +
        "<input type=\"checkbox\" name=\"favoriteColors\" ng-change=\"formData.option.b=true\" ng-model=\"formData.option.b\" ><br>" +
        "b = [3 4]" +
        "</label><br>" +
        "<label class=\"checkbox-inline\" ng-show=\"question.number=1;question.option=2;GetRandom()\"> " +
        "<input type=\"checkbox\" name=\"favoriteColors\" ng-change=\"formData.option.c=true\" ng-model=\"formData.option.c\" ><br> " +
        "b = 4"+
        "</label><br> " +
        "<label class=\"checkbox-inline\" ng-show=\"question.number=1;question.option=3;GetRandom()\"> " +
        "<input type=\"checkbox\" name=\"favoriteColors\" ng-change=\"formData.option.d=true\" ng-model=\"formData.option.d\" ><br> " +
        "None of the above" +
        "   </label><br> " +
        "</h4>" +
        " <button value='Change Text' class=\"btn btn-success\" ng-click=\"buttonID='a';CheckAnswers()\" type=\"button\" ></button> " +
        "<br>"+
        "<h3>{{question.x}}</h3>"
        
    return directive;
});


app.directive("chapter5AssessmentP52", function () {


    var directive = {};
    directive.restrict = 'A';
    directive.template =
        "<h1>What is b as a result of the following commands?<br> >> A = [1 2 3; 4 5 6; 7 8 9] <br> >> B = A(2:3,1:2) </h1>" +
        "<h4>     " +
        "<label class=\"checkbox-inline\" ng-show=\"question.number=2;question.option=0;GetRandom()\">" +
        "<input type=\"checkbox\" name=\"favoriteColors\" ng-change=\"formData.option.a=true\" ng-model=\"formData.option.a\" ><br>" +
        "b = 6" +
        "</label><br>" +
        "<label class=\"checkbox-inline\" ng-show=\"question.number=2;question.option=1;GetRandom()\"> " +
        "<input type=\"checkbox\" name=\"favoriteColors\" ng-change=\"formData.option.b=true\" ng-model=\"formData.option.b\" ><br>" +
        "b = [3 4]" +
        "</label><br>" +
        "<label class=\"checkbox-inline\" ng-show=\"question.number=2;question.option=2;GetRandom()\"> " +
        "<input type=\"checkbox\" name=\"favoriteColors\" ng-change=\"formData.option.c=true\" ng-model=\"formData.option.c\" ><br> " +
        "b = 4"+
        "</label><br> " +
        "<label class=\"checkbox-inline\" ng-show=\"question.number=2;question.option=3;GetRandom()\"> " +
        "<input type=\"checkbox\" name=\"favoriteColors\" ng-change=\"formData.option.d=true\" ng-model=\"formData.option.d\" ><br> " +
        "None of the above" +
        "   </label><br> " +
        "</h4>" +
        " <button value='Change Text' class=\"btn btn-success\" ng-click=\"buttonID='b';CheckAnswers()\" type=\"button\" ></button> " +
        "<br>"+
        "<h3>{{question.y}}</h3>"
        
    return directive;
});


app.directive("chapter5AssessmentP53", function () {


    var directive = {};
    directive.restrict = 'A';
    directive.template =
        "<h1>What is b as a result of the following commands?<br> >> A = [1 2 3; 4 5 6; 7 8 9] <br> >> B = A(:,1:2) </h1>" +
        "<h4>     " +
        "<label class=\"checkbox-inline\" ng-show=\"question.number=3;question.option=0;GetRandom()\">" +
        "<input type=\"checkbox\" name=\"favoriteColors\" ng-change=\"formData.option.a=true\" ng-model=\"formData.option.a\" ><br>" +
        "b = 6" +
        "</label><br>" +
        "<label class=\"checkbox-inline\" ng-show=\"question.number=3;question.option=1;GetRandom()\"> " +
        "<input type=\"checkbox\" name=\"favoriteColors\" ng-change=\"formData.option.b=true\" ng-model=\"formData.option.b\" ><br>" +
        "b = [3 4]" +
        "</label><br>" +
        "<label class=\"checkbox-inline\" ng-show=\"question.number=3;question.option=2;GetRandom()\"> " +
        "<input type=\"checkbox\" name=\"favoriteColors\" ng-change=\"formData.option.c=true\" ng-model=\"formData.option.c\" ><br> " +
        "b = 4"+
        "</label><br> " +
        "<label class=\"checkbox-inline\" ng-show=\"question.number=3;question.option=3;GetRandom()\"> " +
        "<input type=\"checkbox\" name=\"favoriteColors\" ng-change=\"formData.option.d=true\" ng-model=\"formData.option.d\" ><br> " +
        "None of the above" +
        "   </label><br> " +
        "</h4>" +
        " <button value='Change Text' class=\"btn btn-success\" ng-click=\"buttonID='c';CheckAnswers()\" type=\"button\" ></button> " +
        "<br>"+
        "<h3>{{question.z}}</h3>"
        
    return directive;
});




app.directive("chapter5AssessmentP61", function () {


    var directive = {};
    directive.restrict = 'A';
    directive.template =
        "<h1>What is b as a result of the following commands?<br> >> A = [1 2; 3 4; 5 6] <br> >> B = [A,zeros(2,3)] </h1>" +
        "<h4>     " +
        "<label class=\"checkbox-inline\" ng-show=\"question.number=1;question.option=0;GetRandom()\">" +
        "<input type=\"checkbox\" name=\"favoriteColors\" ng-change=\"formData.option.a=true\" ng-model=\"formData.option.a\" ><br>" +
        " b = 6" +
        "</label><br>" +
        "<label class=\"checkbox-inline\" ng-show=\"question.number=1;question.option=1;GetRandom()\"> " +
        "<input type=\"checkbox\" name=\"favoriteColors\" ng-change=\"formData.option.b=true\" ng-model=\"formData.option.b\" ><br>" +
        "b = [3 4]" +
        "</label><br>" +
        "<label class=\"checkbox-inline\" ng-show=\"question.number=1;question.option=2;GetRandom()\"> " +
        "<input type=\"checkbox\" name=\"favoriteColors\" ng-change=\"formData.option.c=true\" ng-model=\"formData.option.c\" ><br> " +
        "b = 4"+
        "</label><br> " +
        "<label class=\"checkbox-inline\" ng-show=\"question.number=1;question.option=3;GetRandom()\"> " +
        "<input type=\"checkbox\" name=\"favoriteColors\" ng-change=\"formData.option.d=true\" ng-model=\"formData.option.d\" ><br> " +
        "None of the above" +
        "</label><br> " +
        "</h4>" +
        " <button value='Change Text' class=\"btn btn-success\" ng-click=\"buttonID='a';CheckAnswers()\" type=\"button\" ></button> " +
        "<br>"+
        "<h3>{{question.x}}</h3>"
        
    return directive;
});


app.directive("chapter5AssessmentP62", function () {


    var directive = {};
    directive.restrict = 'A';
    directive.template =
        "<h1>What is b as a result of the following commands?<br> >> A = [1 2 3; 4 5 6] <br> >> B = [A;zeros(2,3)] </h1>" +
        "<h4>     " +
        "<label class=\"checkbox-inline\" ng-show=\"question.number=2;question.option=0;GetRandom()\">" +
        "<input type=\"checkbox\" name=\"favoriteColors\" ng-change=\"formData.option.a=true\" ng-model=\"formData.option.a\" ><br>" +
        "b = 6" +
        "</label><br>" +
        "<label class=\"checkbox-inline\" ng-show=\"question.number=2;question.option=1;GetRandom()\"> " +
        "<input type=\"checkbox\" name=\"favoriteColors\" ng-change=\"formData.option.b=true\" ng-model=\"formData.option.b\" ><br>" +
        "b = [3 4]" +
        "</label><br>" +
        "<label class=\"checkbox-inline\" ng-show=\"question.number=2;question.option=2;GetRandom()\"> " +
        "<input type=\"checkbox\" name=\"favoriteColors\" ng-change=\"formData.option.c=true\" ng-model=\"formData.option.c\" ><br> " +
        "b = 4"+
        "</label><br> " +
        "<label class=\"checkbox-inline\" ng-show=\"question.number=2;question.option=3;GetRandom()\"> " +
        "<input type=\"checkbox\" name=\"favoriteColors\" ng-change=\"formData.option.d=true\" ng-model=\"formData.option.d\" ><br> " +
        "None of the above" +
        "</label><br> " +
        "</h4>" +
        " <button value='Change Text' class=\"btn btn-success\" ng-click=\"buttonID='b';CheckAnswers()\" type=\"button\" ></button> " +
        "<br>"+
        "<h3>{{question.y}}</h3>"
        
    return directive;
});


app.directive("chapter5AssessmentP63", function () {


    var directive = {};
    directive.restrict = 'A';
    directive.template =
        "<h1>What is b as a result of the following commands?<br> >> A = [1 2 3; 4 5 6] <br> >> B = [A,zeros(2,3)] </h1>" +
        "<h4>     " +
        "<label class=\"checkbox-inline\" ng-show=\"question.number=3;question.option=0;GetRandom()\">" +
        "<input type=\"checkbox\" name=\"favoriteColors\" ng-change=\"formData.option.a=true\" ng-model=\"formData.option.a\" ><br>" +
        " b = 6" +
        "</label><br>" +
        "<label class=\"checkbox-inline\" ng-show=\"question.number=3;question.option=1;GetRandom()\"> " +
        "<input type=\"checkbox\" name=\"favoriteColors\" ng-change=\"formData.option.b=true\" ng-model=\"formData.option.b\" ><br>" +
        "b = [3 4]" +
        "</label><br>" +
        "<label class=\"checkbox-inline\" ng-show=\"question.number=3;question.option=2;GetRandom()\"> " +
        "<input type=\"checkbox\" name=\"favoriteColors\" ng-change=\"formData.option.c=true\" ng-model=\"formData.option.c\" ><br> " +
        "b = 4"+
        "</label><br> " +
        "<label class=\"checkbox-inline\" ng-show=\"question.number=3;question.option=3;GetRandom()\"> " +
        "<input type=\"checkbox\" name=\"favoriteColors\" ng-change=\"formData.option.d=true\" ng-model=\"formData.option.d\" ><br> " +
        "None of the above" +
        "   </label><br> " +
        "</h4>" +
        " <button value='Change Text' class=\"btn btn-success\" ng-click=\"buttonID='c';CheckAnswers()\" type=\"button\" ></button> " +
        "<br>"+
        "<h3>{{question.z}}</h3>"
        
    return directive;
});


app.directive("chapter5AssessmentP71", function () {


    var directive = {};
    directive.restrict = 'A';
    directive.template =
        "<h1>What is b as a result of the following commands?<br> >> A = [1 2; 3 4; 5 6] <br> >> B = 3.*A</h1>" +
        "<h4>     " +
        "<label class=\"checkbox-inline\" ng-show=\"question.number=1;question.option=0;GetRandom()\">" +
        "<input type=\"checkbox\" name=\"favoriteColors\" ng-change=\"formData.option.a=true\" ng-model=\"formData.option.a\" ><br>" +
        " b = 6" +
        "</label><br>" +
        "<label class=\"checkbox-inline\" ng-show=\"question.number=1;question.option=1;GetRandom()\"> " +
        "<input type=\"checkbox\" name=\"favoriteColors\" ng-change=\"formData.option.b=true\" ng-model=\"formData.option.b\" ><br>" +
        "b = [3 4]"+
        "</label><br>" +
        "<label class=\"checkbox-inline\" ng-show=\"question.number=1;question.option=2;GetRandom()\"> " +
        "<input type=\"checkbox\" name=\"favoriteColors\" ng-change=\"formData.option.c=true\" ng-model=\"formData.option.c\" ><br> " +
        "b = 4"+
        "</label><br> " +
        "<label class=\"checkbox-inline\" ng-show=\"question.number=1;question.option=3;GetRandom()\"> " +
        "<input type=\"checkbox\" name=\"favoriteColors\" ng-change=\"formData.option.d=true\" ng-model=\"formData.option.d\" ><br> " +
        "None of the above" +
        "</label><br> " +
        "</h4>" +
        " <button value='Change Text' class=\"btn btn-success\" ng-click=\"buttonID='a';CheckAnswers()\" type=\"button\" ></button> " +
        "<br>"+
        "<h3>{{question.x}}</h3>"
        
    return directive;
});



app.directive("chapter5AssessmentP72", function () {


    var directive = {};
    directive.restrict = 'A';
    directive.template =
        "<h1>What is b as a result of the following commands?<br> >> A = [1 2; 3 4; 5 6] <br> >> B = A+3</h1>" +
        "<h4>     " +
        "<label class=\"checkbox-inline\" ng-show=\"question.number=2;question.option=0;GetRandom()\">" +
        "<input type=\"checkbox\" name=\"favoriteColors\" ng-change=\"formData.option.a=true\" ng-model=\"formData.option.a\" ><br>" +
        " b = 6" +
        "</label><br>" +
        "<label class=\"checkbox-inline\" ng-show=\"question.number=2;question.option=1;GetRandom()\"> " +
        "<input type=\"checkbox\" name=\"favoriteColors\" ng-change=\"formData.option.b=true\" ng-model=\"formData.option.b\" ><br>" +
        "b = [3 4]"+
        "</label><br>" +
        "<label class=\"checkbox-inline\" ng-show=\"question.number=2;question.option=2;GetRandom()\"> " +
        "<input type=\"checkbox\" name=\"favoriteColors\" ng-change=\"formData.option.c=true\" ng-model=\"formData.option.c\" ><br> " +
        "b = 4"+
        "</label><br> " +
        "<label class=\"checkbox-inline\" ng-show=\"question.number=2;question.option=3;GetRandom()\"> " +
        "<input type=\"checkbox\" name=\"favoriteColors\" ng-change=\"formData.option.d=true\" ng-model=\"formData.option.d\" ><br> " +
        "None of the above" +
        "</label><br> " +
        "</h4>" +
        " <button value='Change Text' class=\"btn btn-success\" ng-click=\"buttonID='b';CheckAnswers()\" type=\"button\" ></button> " +
        "<br>"+
        "<h3>{{question.y}}</h3>"
        
    return directive;
});


app.directive("chapter5AssessmentP73", function () {


    var directive = {};
    directive.restrict = 'A';
    directive.template =
        "<h1>What is b as a result of the following commands?<br> >> A = [1 2; 3 4; 5 6] <br> >> B = [2 3; 4 5; 6 7] <br> >> C = A + B </h1>" +
        "<h4>     " +
        "<label class=\"checkbox-inline\" ng-show=\"question.number=3;question.option=0;GetRandom()\">" +
        "<input type=\"checkbox\" name=\"favoriteColors\" ng-change=\"formData.option.a=true\" ng-model=\"formData.option.a\" ><br>" +
        " b = 6" +
        "</label><br>" +
        "<label class=\"checkbox-inline\" ng-show=\"question.number=3;question.option=1;GetRandom()\"> " +
        "<input type=\"checkbox\" name=\"favoriteColors\" ng-change=\"formData.option.b=true\" ng-model=\"formData.option.b\" ><br>" +
        "b = [3 4]"+
        "</label><br>" +
        "<label class=\"checkbox-inline\" ng-show=\"question.number=3;question.option=2;GetRandom()\"> " +
        "<input type=\"checkbox\" name=\"favoriteColors\" ng-change=\"formData.option.c=true\" ng-model=\"formData.option.c\" ><br> " +
        "b = 4"+
        "</label><br> " +
        "<label class=\"checkbox-inline\" ng-show=\"question.number=3;question.option=3;GetRandom()\"> " +
        "<input type=\"checkbox\" name=\"favoriteColors\" ng-change=\"formData.option.d=true\" ng-model=\"formData.option.d\" ><br> " +
        "None of the above" +
        "</label><br> " +
        "</h4>" +
        " <button value='Change Text' class=\"btn btn-success\" ng-click=\"buttonID='c';CheckAnswers()\" type=\"button\" ></button> " +
        "<br>"+
        "<h3>{{question.z}}</h3>"
        
    return directive;
});


app.directive("chapter5AssessmentP74", function () {


    var directive = {};
    directive.restrict = 'A';
    directive.template =
        "<h1>What is b as a result of the following commands?<br> >> A = [4 8; 6 2; 10 4] <br> >> B = A./(2.*[2 4; 3 1; 5 2]) <br> >> C = A + B </h1>" +
        "<h4>     " +
        "<label class=\"checkbox-inline\" ng-show=\"question.number=4;question.option=0;GetRandom()\">" +
        "<input type=\"checkbox\" name=\"favoriteColors\" ng-change=\"formData.option.a=true\" ng-model=\"formData.option.a\" ><br>" +
        " b = 6" +
        "</label><br>" +
        "<label class=\"checkbox-inline\" ng-show=\"question.number=4;question.option=1;GetRandom()\"> " +
        "<input type=\"checkbox\" name=\"favoriteColors\" ng-change=\"formData.option.b=true\" ng-model=\"formData.option.b\" ><br>" +
        "b = [3 4]"+
        "</label><br>" +
        "<label class=\"checkbox-inline\" ng-show=\"question.number=4;question.option=2;GetRandom()\"> " +
        "<input type=\"checkbox\" name=\"favoriteColors\" ng-change=\"formData.option.c=true\" ng-model=\"formData.option.c\" ><br> " +
        "b = 4"+
        "</label><br> " +
        "<label class=\"checkbox-inline\" ng-show=\"question.number=4;question.option=3;GetRandom()\"> " +
        "<input type=\"checkbox\" name=\"favoriteColors\" ng-change=\"formData.option.d=true\" ng-model=\"formData.option.d\" ><br> " +
        "None of the above" +
        "</label><br> " +
        "</h4>" +
        " <button value='Change Text' class=\"btn btn-success\" ng-click=\"buttonID='d';CheckAnswers()\" type=\"button\" ></button> " +
        "<br>"+
        "<h3>{{question.u}}</h3>"
        
    return directive;
});



app.directive("chapter5AssessmentP75", function () {


    var directive = {};
    directive.restrict = 'A';
    directive.template =
        "<h1>What is b as a result of the following commands?<br> >> A = [4 8; 6 2; 10 4]<br> >> B = B = A./(2.*[2 4 3; 1 5 2])<br> >> C = A + B </h1>" +
        "<h4>     " +
        "<label class=\"checkbox-inline\" ng-show=\"question.number=5;question.option=0;GetRandom()\">" +
        "<input type=\"checkbox\" name=\"favoriteColors\" ng-change=\"formData.option.a=true\" ng-model=\"formData.option.a\" ><br>" +
        " b = 6" +
        "</label><br>" +
        "<label class=\"checkbox-inline\" ng-show=\"question.number=5;question.option=1;GetRandom()\"> " +
        "<input type=\"checkbox\" name=\"favoriteColors\" ng-change=\"formData.option.b=true\" ng-model=\"formData.option.b\" ><br>" +
        "b = [3 4]"+
        "</label><br>" +
        "<label class=\"checkbox-inline\" ng-show=\"question.number=5;question.option=2;GetRandom()\"> " +
        "<input type=\"checkbox\" name=\"favoriteColors\" ng-change=\"formData.option.c=true\" ng-model=\"formData.option.c\" ><br> " +
        "b = 4"+
        "</label><br> " +
        "<label class=\"checkbox-inline\" ng-show=\"question.number=5;question.option=3;GetRandom()\"> " +
        "<input type=\"checkbox\" name=\"favoriteColors\" ng-change=\"formData.option.d=true\" ng-model=\"formData.option.d\" ><br> " +
        "None of the above" +
        " </label><br> " +
        "</h4>" +
        " <button value='Change Text' class=\"btn btn-success\" ng-click=\"buttonID='e';CheckAnswers()\" type=\"button\" ></button> " +
        "<br>"+
        "<h3>{{question.v}}</h3>"
        
    return directive;
});


app.directive("chapter5AssessmentP76", function () {


    var directive = {};
    directive.restrict = 'A';
    directive.template =
        "<h1>Select all options below which create an array named X containing the values: sin(0 ° ), sin(45 ° ),sin(90 ° ), sin(135 ° ), sin(180 ° ).<br> >> A = [4 8; 6 2; 10 4] <br> >> B = A./(2.*[2 4 3; 1 5 2]) <br> </h1>" +
        "<h4>     " +
        "<label class=\"checkbox-inline\" ng-show=\"question.number=6;question.option=0;GetRandom()\">" +
        "<input type=\"checkbox\" name=\"favoriteColors\" ng-change=\"formData.option.a=true\" ng-model=\"formData.option.a\" ><br>" +
        ">> deg = [0 45 90 135 180]" +
        ">> X = sind(deg)"+
        "</label><br>" +
        "<label class=\"checkbox-inline\" ng-show=\"question.number=6;question.option=1;GetRandom()\"> " +
        "<input type=\"checkbox\" name=\"favoriteColors\" ng-change=\"formData.option.b=true\" ng-model=\"formData.option.b\" ><br>" +
        ">> X = sind([0 45 90 135 180])" +
        "</label><br>" +
        "<label class=\"checkbox-inline\" ng-show=\"question.number=6;question.option=2;GetRandom()\"> " +
        "<input type=\"checkbox\" name=\"favoriteColors\" ng-change=\"formData.option.c=true\" ng-model=\"formData.option.c\" ><br> " +
        ">> k = 0:4<br> >> X = sind(45.*k)"+
        "</label><br> " +
        "<label class=\"checkbox-inline\" ng-show=\"question.number=6;question.option=3;GetRandom()\"> " +
        "<input type=\"checkbox\" name=\"favoriteColors\" ng-change=\"formData.option.d=true\" ng-model=\"formData.option.d\" ><br> " +
        "Error" +
        "</label><br> " +
        "<label class=\"checkbox-inline\" ng-show=\"question.number=6;question.option=4;GetRandom()\"> " +
        "<input type=\"checkbox\" name=\"favoriteColors\" ng-change=\"formData.option.e=true\" ng-model=\"formData.option.d\" ><br> " +
        "All of the above" +
        "</label><br> " +
        
        "</h4>" +
        " <button value='Change Text' class=\"btn btn-success\" ng-click=\"buttonID='f';CheckAnswers()\" type=\"button\" ></button> " +
        "<br>"+
        "<h3>{{question.w}}</h3>"
        
    return directive;
});

