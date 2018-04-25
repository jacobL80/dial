$(document).ready(function () {
    "use strict";
 
    var number = "";
    $(document).on("click", ".button", function(e) {
        e.preventDefault();
        // Accounts for asterisk html code in counting characters (html block is 47 characters long)
        var asteriskCount = Math.floor(number.length / 47);
        var numLength = (number.length % 47) + asteriskCount; //Counts total numbers in string, including asterisk images
        
        //Continues to add numbers up to 20 total
        if (numLength <= 20) {
            number += $(this).attr("number");
        }
        checkLength();
        
        if (number.length > 0) {
            $(".numberRow").removeClass("slide-out");
            $(".numberRow").addClass("slide-in");
        }
        
        //Decreases font-size as needed to fit in container, up to 20 characters
        if (numLength <= 20) {
            $('.number').css('font-size', '30px');
            while( $('.number').width() > 210 ) {
                $('.number').css('font-size', (parseInt($('.number').css('font-size')) - 1) + "px" );
                $('.asterisk').css('width', (parseInt($('.number').css('font-size')) - 7) + 'px');
            }
        }        
    });
    
    $(document).on("click", ".back", function(e) {
        e.preventDefault();
        if (number.substring(number.length - 1) === ">") {
            number = number.slice(0, -47); //Removes asterisk image
        } else {
            number = number.slice(0, -1);
        }
        checkLength();
        
        if (number.length === 0) {
            $(".numberRow").removeClass("slide-in");
            $(".numberRow").addClass("slide-out");
        }
        
        //Increases font size as needed to fit in container, up to 30px
        var fontSize = $('.number').css("font-size");
        if (fontSize !== "30px") {
            while( $('.number').width() < 210 && $('.number').width() > 195 ) {
                $('.number').css('font-size', (parseInt($('.number').css('font-size')) + 1) + "px" );
                $('.asterisk').css('width', (parseInt($('.number').css('font-size')) - 4) + 'px');
            }
        }
    });
    
    //Formats the number into either XXX-XXXX or (XXX) XXX-XXXX or XXXXXXXXXXX format as needed by the length of number
    function checkLength() {
        //Only applies number formatting if there are no * or # in string
        if ((number.indexOf("*") < 0) && (number.indexOf("#") < 0)) {
            // Checks for US country code
            if (number.substring(0,1) === "1") {
                if (number.length < 3 || number.length >= 12) {
                    $(".number").html(number);
                } else if (number.length >= 3 && number.length < 5) {
                    $(".number").html(number.substring(0,1) + " " + number.substring(1,number.length));
                } else if (number.length >= 5 && number.length < 8) {
                    $(".number").html(number.substring(0,1) + " " + number.substring(1,4) + "-" + number.substring(4,number.length));
                } else if (number.length >= 8 && number.length < 12) {
                    $(".number").html(number.substring(0,1) + " " + number.substring(1,4) + "-" + number.substring(4,7)  + "-" + number.substring(7,number.length));
                }
            } else {
                if (number.length < 4 || number.length >= 11) {
                    $(".number").html(number);
                } else if (number.length >= 4 && number.length < 8) {
                    $(".number").html(number.substring(0,3) + "-" + number.substring(3,number.length));
                } else if (number.length >= 8 && number.length < 11) {
                    $(".number").html("(" + number.substring(0,3) + ") " + number.substring(3,6) + "-" + number.substring(6,number.length));
                }
            }
        } else {
            //Replaces regular * with a larger stylized image of one
            number = number.replace(/\*/g, '<img class="asterisk" src="assets/icon-01.png">');
            $(".number").html(number);
        }
    }
});