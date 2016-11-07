$(document).ready(function() {
    var operator = ['+', '-', 'x', '÷'];
    var $screen = $(".screen").eq(0);
    var $keys = $("#calculator button");
    $keys.click(function(e) {
        e.preventDefault();
        var formula = 0;
        var $output = $screen.html(),
            $that = $(this).html();
        var a = $output.lastIndexOf("+"),
            b = $output.lastIndexOf("-"),
            c = $output.lastIndexOf("x"),
            d = $output.lastIndexOf("÷"),
            e = $output.lastIndexOf(".");
        var g = Math.max(a, b, c, d);
        var f = Math.max(g, e);
        var lastinput = $output[$output.length - 1];
        if ($that == "C") {
            $screen.html("0");
            formula = 0;
        } else if ($that == "." && f > -1 && f > g) { //小数点，只能输入一个
            return;
        } else if ($that == "=") {
            if (operator.indexOf(lastinput) > -1) { //等号前不能是+-*/符号
                return;
            } else {
                formula = $output;
                formula = formula.replace(/x/g, "*").replace(/÷/g, "/"); //替换乘除号
                $screen.html(Math.round(eval(formula) * 1000) / 1000); //输出计算结果，并保留3位小数
            }
        } else if ((operator.indexOf($that) > -1 && operator.indexOf(lastinput) > -1) || //如果连续输入+-*/符号，只保留最后一个
            (lastinput == "." && operator.indexOf($that) > -1) || //+-*/符号前的小数点省略
            (lastinput == "0" && g == $output.length - 2 && $output != "0")) { //整数部分不能连续输入0
            $screen.html($output.slice(0, -1) + $that);
        } else if ($output == "0" && operator.indexOf($that) == "-1") { ///
            $screen.html($that);
        } else {
            $screen.html($output + $that);
        }
    });
});