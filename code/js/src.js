(function () {

    var arr = [12, 89, 12, 1, 212, 2332, 123];
    var min = 12;
    var max = 12;
    for (var i = 0; i < arr.length; i++) {
        if (arr[i] > max) {
            max = arr[i];
        }
        if (arr[i] < min) {
            min = arr[i];
        }
    }
    alert("min = " + min);
    alert("max = " + max);

    var min2 = minFunction(arr);
    alert("min2 = " + min2);

    function minFunction(arr) {
        console.log(arr);
        var min = arr[0];
        console.log(min);
        for (var j = 0; j < arr.length; j++) {
            if (arr[j] < min) {
                min = arr[j];
            }
        }
        return min;
    }

})();