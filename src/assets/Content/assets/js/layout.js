function getCookie(name) {
    var dc = document.cookie;
    var prefix = name + "=";
    var begin = dc.indexOf("; " + prefix);
    if (begin == -1) {
        begin = dc.indexOf(prefix);
        if (begin != 0) return null;
    }
    else {
        begin += 2;
        var end = document.cookie.indexOf(";", begin);
        if (end == -1) {
            end = dc.length;
        }
    }
    // because unescape has been deprecated, replaced with decodeURI
    //return unescape(dc.substring(begin + prefix.length, end));
    return decodeURI(dc.substring(begin + prefix.length, end));
} 

function setColorTheme(theme) {
    var date = new Date();
    date.setTime(date.getTime() + (120 * 24 * 60 * 60 * 1000));
    var expires = "; expires=" + date.toUTCString();

    document.cookie = "userColorTheme=" + theme + "" + expires + "; path=/";
}

function setMenuPosition(position) {
    var date = new Date();
    date.setTime(date.getTime() + (120 * 24 * 60 * 60 * 1000));
    var expires = "; expires=" + date.toUTCString();

    document.cookie = "userMenuPosition=" + position + "" + expires + "; path=/";
}

document.addEventListener('DOMContentLoaded', function () {
    /* COLOR THEME */
    var uct = getCookie('userColorTheme');
    
    
    if (uct === null) {
        console.log("userColorTheme NOT");
        setColorTheme("theme1");
        setTimeout(function () {
            enableThemeColorTheme();
        }, 1000);
    }
    else {
        uct = uct.split(";")[0];
        console.log("userColorTheme : " + uct);
        switch (uct) {
            case "theme1":
                setTimeout(function () {
                    enableThemeColorTheme();
                }, 1000);
                break;
            case "theme2":
                setTimeout(function () {
                    enableThemeColorTheme1();
                }, 1000);
                break;
            case "default":
                setTimeout(function () {
                    enableDefaultTheme();
                }, 1000);
                break;
            case "purple":
                setTimeout(function () {
                    enablePurpleTheme();
                }, 1000);
                break;
            case "red":
                setTimeout(function () {
                    enableRedTheme();
                }, 1000);
                break;
            case "green":
                setTimeout(function () {
                    enableGreenTheme();
                }, 1000);
                break;
            case "blue":
                setTimeout(function () {
                    enableBlueTheme();
                }, 1000);
                break;
            case "pink":
                setTimeout(function () {
                    enablePinkTheme();
                }, 1000);
                break;
            case "purplelight":
                setTimeout(function () {
                    enablePurpleColorLightTheme();
                }, 1000);
                break;
            case "redlight":
                setTimeout(function () {
                    enableRedColorLightTheme();
                }, 1000);
                break;
            case "greenlight":
                setTimeout(function () {
                    enableGreenColorLightTheme();
                }, 1000);
                break;
            case "bluelight":
                setTimeout(function () {
                    enableBlueColorLightTheme();
                }, 1000);
                break;
            case "pinklight":
                setTimeout(function () {
                    enablePinkColorLightTheme();
                }, 1000);
                break;
        }
    }


    /* MENU POSITION */
    var ump = getCookie('userMenuPosition');
    if (ump == null) {
        console.log("userMenuPosition NOT");
        setMenuPosition("horizontal");
        $(".verticalMenuMain").css("display", "none");
        $(".horizontalMenuMain").css("display", "flex");
        $(".horizontalMenuMain").addClass("d-none d-md-flex d-lg-flex d-xl-flex");
        $(".verticalMenuMain").removeClass("d-none d-md-block d-lg-block d-xl-block");

        $('body').removeClass("vertical-layout vertical-menu fixed-navbar");
        $('body').addClass("horizontal-layout horizontal-menu horizontal-menu-padding");
        $('body').attr("data-menu", "horizontal-menu");
        $(".app-content").css("margin-left", "0");
        $(".topBarMenu").removeClass("fixed-top");
        $(".topBarMenu").addClass("navbar-static-top");
        $(".tab_position_Horizontal").addClass("colorThemeActiveColor");
        $(".tab_position_Vertical").removeClass("colorThemeActiveColor");
    }
    else {
        console.log("userMenuPosition : " + ump);
        ump = ump.split(";")[0];
        if (ump == "horizontal") {
            $(".verticalMenuMain").css("display", "none");
            $(".horizontalMenuMain").css("display", "flex");
            $(".horizontalMenuMain").addClass("d-none d-md-flex d-lg-flex d-xl-flex");
            $(".verticalMenuMain").removeClass("d-none d-md-block d-lg-block d-xl-block");

            $('body').removeClass("vertical-layout vertical-menu fixed-navbar");
            $('body').addClass("horizontal-layout horizontal-menu horizontal-menu-padding");
            $('body').attr("data-menu", "horizontal-menu");
            $(".app-content").css("margin-left", "0");
            $(".topBarMenu").removeClass("fixed-top");
            $(".topBarMenu").addClass("navbar-static-top");
            $(".tab_position_Horizontal").addClass("colorThemeActiveColor");
            $(".tab_position_Vertical").removeClass("colorThemeActiveColor");
        }
        if (ump == "vertical") {
            $(".verticalMenuMain").css("display", "block");
            $(".horizontalMenuMain").css("display", "none");
            $(".verticalMenuMain").addClass("d-none d-md-block d-lg-block d-xl-block");
            $(".horizontalMenuMain").removeClass("d-none d-md-flex d-lg-flex d-xl-flex");


            $('body').removeClass("horizontal-layout horizontal-menu horizontal-menu-padding");
            $('body').addClass("vertical-layout vertical-menu fixed-navbar");
            $('body').attr("data-menu", "vertical-menu");
            $(".app-content").css("margin-left", "240px");
            $(".topBarMenu").addClass("fixed-top");
            $(".topBarMenu").removeClass("navbar-static-top");
            $(".tab_position_Horizontal").removeClass("colorThemeActiveColor");
            $(".tab_position_Vertical").addClass("colorThemeActiveColor");
        }
    }

}, false);

$(document).ready(function () {
    $('#clickme').click(function () {
        var $slider = $('.sidesettingsdiv');
        $slider.animate({
            right: parseInt($slider.css('right'), 0) == -300 ?
                0 : -300
        });
    });
    $(".verticalMenuMain li.nav-item a#vericalMenu").click(function () {
        if ($(this).closest("li.nav-item").hasClass("open")) {
            $(this).closest("li.nav-item").removeClass("open");
        }
        else {
            $(this).closest("li.nav-item").addClass("open");
        } 
    });
});

$('.tab_position_Horizontal').click(function () {
   $(".verticalMenuMain").css("display", "none");
    $(".horizontalMenuMain").css("display", "flex");
    $(".horizontalMenuMain").addClass("d-none d-md-flex d-lg-flex d-xl-flex");
    $(".verticalMenuMain").removeClass("d-none d-md-block d-lg-block d-xl-block");

    $('body').removeClass("vertical-layout vertical-menu fixed-navbar");
    $('body').addClass("horizontal-layout horizontal-menu horizontal-menu-padding");
    $('body').attr("data-menu", "horizontal-menu");
    $(".app-content").css("margin-left", "0");
    $(".topBarMenu").removeClass("fixed-top");
    $(".topBarMenu").addClass("navbar-static-top");
    $(".tab_position_Horizontal").addClass("colorThemeActiveColor");
    $(".tab_position_Vertical").removeClass("colorThemeActiveColor");
    setMenuPosition("horizontal");
});


$('.tab_position_Vertical').click(function () {
    $(".verticalMenuMain").css("display", "block");
    $(".horizontalMenuMain").css("display", "none");
    $(".verticalMenuMain").addClass("d-none d-md-block d-lg-block d-xl-block");
    $(".horizontalMenuMain").removeClass("d-none d-md-flex d-lg-flex d-xl-flex");

    $('body').removeClass("horizontal-layout horizontal-menu horizontal-menu-padding");
    $('body').addClass("vertical-layout vertical-menu fixed-navbar");
    $('body').attr("data-menu", "vertical-menu");
    $(".app-content").css("margin-left", "240px");
    $(".topBarMenu").addClass("fixed-top");
    $(".topBarMenu").removeClass("navbar-static-top");
    $(".tab_position_Horizontal").removeClass("colorThemeActiveColor");
    $(".tab_position_Vertical").addClass("colorThemeActiveColor");
    setMenuPosition("vertical");
});

$('.tab_theme_dark').click(function () {
    $("#color-themes-dark").show();
    $("#color-themes-light").hide();
    $(".tab_theme_dark").addClass("colorThemeActiveColor");
    $(".tab_theme_light").removeClass("colorThemeActiveColor");
});
$('.tab_theme_light').click(function () {
    $("#color-themes-dark").hide();
    $("#color-themes-light").show();
    $(".tab_theme_dark").removeClass("colorThemeActiveColor");
    $(".tab_theme_light").addClass("colorThemeActiveColor");

});

function removeThemeClasses() {

    $(".btn").removeClass("ThemeColorBtn");
    $(".main-menu").removeClass("ThemeColor");
    $(".navbar-horizontal").removeClass("ThemeColor");
    $("table thead").removeClass("Theme_tableHeader");
    $("ul.nav-tabs li a").removeClass("Theme_tabStyleClass");
    $(".tableEdit").removeClass("Theme_tableEditStyle");
    $(".mobileMenu").removeClass("ThemeColor");
    $(".menu-wrap").removeClass("ThemeColor");





    $(".btn").removeClass("ThemeColor1Btn");
    $(".main-menu").removeClass("ThemeColor1");
    $(".navbar-horizontal").removeClass("ThemeColor1");
    $("table thead").removeClass("Theme1_tableHeader");
    $("ul.nav-tabs li a").removeClass("Theme1_tabStyleClass");
    $(".tableEdit").removeClass("Theme1_tableEditStyle");
    $(".mobileMenu").removeClass("ThemeColor1");
    $(".menu-wrap").removeClass("ThemeColor1");




   

    $(".btn").removeClass("DefaultColorBtn");
    $(".main-menu").removeClass("DefaultColor");
    $(".navbar-horizontal").removeClass("DefaultColor");
    $("table thead").removeClass("Default_tableHeader");
    $("ul.nav-tabs li a").removeClass("Default_tabStyleClass");
    $(".tableEdit").removeClass("Default_tableEditStyle");
    $(".mobileMenu").removeClass("DefaultColor");
    $(".menu-wrap").removeClass("DefaultColor");





    $(".btn").removeClass("PurpleColorBtn");
    $(".main-menu").removeClass("PurpleColor");
    $(".navbar-horizontal").removeClass("PurpleColor");
    $("table thead").removeClass("PurpleColor_tableHeader");
    $("ul.nav-tabs li a").removeClass("PurpleColor_tabStyleClass");
    $(".tableEdit").removeClass("PurpleColor_tableEditStyle");
    $(".mobileMenu").removeClass("PurpleColor");
    $(".menu-wrap").removeClass("PurpleColor");








    $(".btn").removeClass("RedColorBtn");
    $(".main-menu").removeClass("RedColor");
    $(".navbar-horizontal").removeClass("RedColor");
    $("table thead").removeClass("RedColor_tableHeader");
    $("ul.nav-tabs li a").removeClass("RedColor_tabStyleClass");
    $(".tableEdit").removeClass("RedColor_tableEditStyle");
    $(".mobileMenu").removeClass("RedColor");
    $(".menu-wrap").removeClass("RedColor");





    
    $(".btn").removeClass("GreenColorBtn");
    $(".main-menu").removeClass("GreenColor");
    $(".navbar-horizontal").removeClass("GreenColor");
    $("table thead").removeClass("GreenColor_tableHeader");
    $("ul.nav-tabs li a").removeClass("GreenColor_tabStyleClass");
    $(".tableEdit").removeClass("GreenColor_tableEditStyle");
    $(".mobileMenu").removeClass("GreenColor");
    $(".menu-wrap").removeClass("GreenColor");





    $(".btn").removeClass("BlueColorBtn");
    $(".main-menu").removeClass("BlueColor");
    $(".navbar-horizontal").removeClass("BlueColor");
    $("table thead").removeClass("BlueColor_tableHeader");
    $("ul.nav-tabs li a").removeClass("BlueColor_tabStyleClass");
    $(".tableEdit").removeClass("BlueColor_tableEditStyle");
    $(".mobileMenu").removeClass("BlueColor");
    $(".menu-wrap").removeClass("BlueColor");




    
    
    $(".btn").removeClass("PinkColorBtn");
    $(".main-menu").removeClass("PinkColor");
    $(".navbar-horizontal").removeClass("PinkColor");
    $("table thead").removeClass("PinkColor_tableHeader");
    $("ul.nav-tabs li a").removeClass("PinkColor_tabStyleClass");
    $(".tableEdit").removeClass("PinkColor_tableEditStyle");
    $(".mobileMenu").removeClass("PinkColor");
    $(".menu-wrap").removeClass("PinkColor");




    $(".btn").removeClass("PurpleColorLightBtn");
    $(".main-menu").removeClass("PurpleColorLight");
    $(".navbar-horizontal").removeClass("PurpleColorLight");
    $("table thead").removeClass("PurpleColorLight_tableHeader");
    $("ul.nav-tabs li a").removeClass("PurpleColorLight_tabStyleClass");
    $(".tableEdit").removeClass("PurpleColorLight_tableEditStyle");
    $(".mobileMenu").removeClass("PurpleColorLight");
    $(".menu-wrap").removeClass("PurpleColorLight");






    $(".btn").removeClass("RedColorLightBtn");
    $(".main-menu").removeClass("RedColorLight");
    $(".navbar-horizontal").removeClass("RedColorLight");
    $("table thead").removeClass("RedColorLight_tableHeader");
    $("ul.nav-tabs li a").removeClass("RedColorLight_tabStyleClass");
    $(".tableEdit").removeClass("RedColorLight_tableEditStyle");
    $(".mobileMenu").removeClass("RedColorLight");
    $(".menu-wrap").removeClass("RedColorLight");





    $(".btn").removeClass("GreenColorLightBtn");
    $(".main-menu").removeClass("GreenColorLight");
    $(".navbar-horizontal").removeClass("GreenColorLight");
    $("table thead").removeClass("GreenColorLight_tableHeader");
    $("ul.nav-tabs li a").removeClass("GreenColorLight_tabStyleClass");
    $(".tableEdit").removeClass("GreenColorLight_tableEditStyle");
    $(".mobileMenu").removeClass("GreenColorLight");
    $(".menu-wrap").removeClass("GreenColorLight");




    
    $(".btn").removeClass("BlueColorLightBtn");
    $(".main-menu").removeClass("BlueColorLight");
    $(".navbar-horizontal").removeClass("BlueColorLight");
    $("table thead").removeClass("BlueColorLight_tableHeader");
    $("ul.nav-tabs li a").removeClass("BlueColorLight_tabStyleClass");
    $(".tableEdit").removeClass("BlueColorLight_tableEditStyle");
    $(".mobileMenu").removeClass("BlueColorLight");
    $(".menu-wrap").removeClass("BlueColorLight");



    $(".btn").removeClass("PinkColorLightBtn");
    $(".main-menu").removeClass("PinkColorLight");
    $(".navbar-horizontal").removeClass("PinkColorLight");
    $("table thead").removeClass("PinkColorLight_tableHeader");
    $("ul.nav-tabs li a").removeClass("PinkColorLight_tabStyleClass");
    $(".tableEdit").removeClass("PinkColorLight_tableEditStyle");
    $(".mobileMenu").removeClass("PinkColorLight");
    $(".menu-wrap").removeClass("PinkColorLight");

}



/* THEME COLOR */

function enableThemeColorTheme() {
    removeThemeClasses();
    $(".btn").addClass("ThemeColorBtn");

    $(".main-menu").addClass("ThemeColor");
    $(".navbar-horizontal").addClass("ThemeColor");


    $("table thead").addClass("Theme_tableHeader");
    $("ul.nav-tabs li a").addClass("Theme_tabStyleClass");

    $(".menu-bar-top").css("border", "border: 4px solid #fff; !important");
    $('input').focus(
        function () {
            $(this).css("border-color", "#00597b");
        }).focusout(function () {
            $(this).css("border-color", "#D4D4D4");
        });

    $('textarea').focus(
        function () {
            $(this).css("border-color", "#00597b");
        }).focusout(function () {
            $(this).css("border-color", "#D4D4D4");
        });


    $('select').focus(
        function () {
            $(this).css("border-color", "#00597b");
        }).focusout(function () {
            $(this).css("border-color", "#D4D4D4");
        });


    $("input:checked").css("background-color", "#1d2b36");


    $(".tableEdit").addClass("Theme_tableEditStyle");

    //$("span.menu-title").css("background-color", "#00597b");
    $(".mobileMenu").addClass("ThemeColor");
    $(".menu-wrap").addClass("ThemeColor");

}
$('.ThemeColor').click(function () {
    enableThemeColorTheme();
    setColorTheme("theme1");
});






/* THEME COLOR1 */
function enableThemeColorTheme1() {
    removeThemeClasses();
    $(".btn").addClass("ThemeColor1Btn");

    $(".main-menu").addClass("ThemeColor1");
    $(".navbar-horizontal").addClass("ThemeColor1");


    $(".toggle-button .menu-bar").css("border", "border: 4px solid #fff;");

    $("table thead").addClass("Theme1_tableHeader");
    $("ul.nav-tabs li a").addClass("Theme1_tabStyleClass");

    $('input').focus(
        function () {
            $(this).css("border-color", "#acd99e");
        }).focusout(function () {
            $(this).css("border-color", "#D4D4D4");
        });

    $('textarea').focus(
        function () {
            $(this).css("border-color", "#acd99e");
        }).focusout(function () {
            $(this).css("border-color", "#D4D4D4");
        });


    $('select').focus(
        function () {
            $(this).css("border-color", "#acd99e");
        }).focusout(function () {
            $(this).css("border-color", "#D4D4D4");
        });


    $("input:checked").css("background-color", "#1d2b36");


    $(".tableEdit").addClass("Theme1_tableEditStyle");

    $(".mobileMenu").addClass("ThemeColor1");
    $(".menu-wrap").addClass("ThemeColor1");
}
$('.ThemeColor1').click(function () {
    enableThemeColorTheme1();
    setColorTheme("theme2");
});




/* BLACK THEME */
function enableDefaultTheme() {
    removeThemeClasses();
    $(".btn").addClass("DefaultColorBtn");
    $(".main-menu").addClass("DefaultColor");

    $(".navbar-horizontal").addClass("DefaultColor");

    $(".toggle-button .menu-bar").css("border", "border: 4px solid #fff;");
    $("table thead").addClass("Default_tableHeader");
    $("ul.nav-tabs li a").addClass("Default_tabStyleClass");

    $('input').focus(
        function () {
            $(this).css("border-color", "#1d2b36");
        }).focusout(function () {
            $(this).css("border-color", "#D4D4D4");
        });

    $('textarea').focus(
        function () {
            $(this).css("border-color", "#1d2b36");
        }).focusout(function () {
            $(this).css("border-color", "#D4D4D4");
        });


    $('select').focus(
        function () {
            $(this).css("border-color", "#1d2b36");
        }).focusout(function () {
            $(this).css("border-color", "#D4D4D4");
        });


    $("input:checked").css("background-color", "#1d2b36");


    $(".tableEdit").addClass("Default_tableEditStyle");
    $(".mobileMenu").addClass("DefaultColor");
    $(".menu-wrap").addClass("DefaultColor");
}

$('.DefaultColor').click(function () {
    enableDefaultTheme();
    setColorTheme("default");
});




/* PURPLE THEME */
function enablePurpleTheme() {
    removeThemeClasses();
    $(".btn").addClass("PurpleColorBtn");
    $(".main-menu").addClass("PurpleColor");

    $(".navbar-horizontal").addClass("PurpleColor");

    $("table thead").addClass("PurpleColor_tableHeader");
    $("ul.nav-tabs li a").addClass("PurpleColor_tabStyleClass");
    $(".toggle-button .menu-bar").css("border", "border: 4px solid #fff;");
    $(".mobileMenu").addClass("PurpleColor");
    $(".menu-wrap").addClass("PurpleColor");
    $('input').focus(
        function () {
            $(this).css("border-color", "#967adc");
        }).focusout(function () {
            $(this).css("border-color", "#D4D4D4");
        });

    $('textarea').focus(
        function () {
            $(this).css("border-color", "#967adc");
        }).focusout(function () {
            $(this).css("border-color", "#D4D4D4");
        });


    $('select').focus(
        function () {
            $(this).css("border-color", "#967adc");
        }).focusout(function () {
            $(this).css("border-color", "#D4D4D4");
        });


    $("input:checked").css("background-color", "#967adc");


    $(".tableEdit").addClass("PurpleColor_tableEditStyle");
}

$('.PurpleColor').click(function () {
    enablePurpleTheme();
    setColorTheme("purple");
});



/* RED THEME */
function enableRedTheme() {
    removeThemeClasses();
    $(".btn").addClass("RedColorBtn");
    $(".main-menu").addClass("RedColor");

    $(".navbar-horizontal").addClass("RedColor");
    $(".toggle-button .menu-bar").css("border", "border: 4px solid #fff;");
    $("table thead").addClass("RedColor_tableHeader");
    $("ul.nav-tabs li a").addClass("RedColor_tabStyleClass");

    $(".mobileMenu").addClass("RedColor");
    $(".menu-wrap").addClass("RedColor");
    $('input').focus(
        function () {
            $(this).css("border-color", "#da4453");
        }).focusout(function () {
            $(this).css("border-color", "#D4D4D4");
        });

    $('textarea').focus(
        function () {
            $(this).css("border-color", "#da4453");
        }).focusout(function () {
            $(this).css("border-color", "#D4D4D4");
        });


    $('select').focus(
        function () {
            $(this).css("border-color", "#da4453");
        }).focusout(function () {
            $(this).css("border-color", "#D4D4D4");
        });


    $("input:checked").css("background-color", "#da4453");


    $(".tableEdit").addClass("RedColor_tableEditStyle");
}

$('.RedColor').click(function () {
    enableRedTheme();
    setColorTheme("red");
});




/* GREEN THEME */
function enableGreenTheme() {
    removeThemeClasses();
    $(".btn").addClass("GreenColorBtn");
    $(".main-menu").addClass("GreenColor");

    $(".navbar-horizontal").addClass("GreenColor");
    $(".toggle-button .menu-bar").css("border", "border: 4px solid #fff;");
    $("table thead").addClass("GreenColor_tableHeader");
    $("ul.nav-tabs li a").addClass("GreenColor_tabStyleClass");

    $(".mobileMenu").addClass("GreenColor");
    $(".menu-wrap").addClass("GreenColor");
    $('input').focus(
        function () {
            $(this).css("border-color", "#37BC9B");
        }).focusout(function () {
            $(this).css("border-color", "#D4D4D4");
        });

    $('textarea').focus(
        function () {
            $(this).css("border-color", "#37BC9B");
        }).focusout(function () {
            $(this).css("border-color", "#D4D4D4");
        });


    $('select').focus(
        function () {
            $(this).css("border-color", "#37BC9B");
        }).focusout(function () {
            $(this).css("border-color", "#D4D4D4");
        });


    $("input:checked").css("background-color", "#37BC9B");


    $(".tableEdit").addClass("GreenColor_tableEditStyle");
}

$('.GreenColor').click(function () {
    enableGreenTheme();
    setColorTheme("green");
});




/* BLUE THEME */

function enableBlueTheme() {
    removeThemeClasses();
    $(".btn").addClass("BlueColorBtn");
    $(".main-menu").addClass("BlueColor");

    $(".navbar-horizontal").addClass("BlueColor");
    $(".toggle-button .menu-bar").css("border", "border: 4px solid #fff;");
    $("table thead").addClass("BlueColor_tableHeader");
    $("ul.nav-tabs li a").addClass("BlueColor_tabStyleClass");

    $(".mobileMenu").addClass("BlueColor");
    $(".menu-wrap").addClass("BlueColor");
    $('input').focus(
        function () {
            $(this).css("border-color", "#2196f3");
        }).focusout(function () {
            $(this).css("border-color", "#D4D4D4");
        });

    $('textarea').focus(
        function () {
            $(this).css("border-color", "#2196f3");
        }).focusout(function () {
            $(this).css("border-color", "#D4D4D4");
        });


    $('select').focus(
        function () {
            $(this).css("border-color", "#2196f3");
        }).focusout(function () {
            $(this).css("border-color", "#D4D4D4");
        });


    $("input:checked").css("background-color", "#2196f3");


    $(".tableEdit").addClass("BlueColor_tableEditStyle");

}

$('.BlueColor').click(function () {
    enableBlueTheme();
    setColorTheme("blue");
});



/* PINK THEME */

function enablePinkTheme() {
    removeThemeClasses();
    $(".btn").addClass("PinkColorBtn");
    $(".main-menu").addClass("PinkColor");

    $(".navbar-horizontal").addClass("PinkColor");
    $(".toggle-button .menu-bar").css("border", "border: 4px solid #fff;");
    $("table thead").addClass("PinkColor_tableHeader");
    $("ul.nav-tabs li a").addClass("PinkColor_tabStyleClass");

    $(".mobileMenu").addClass("PinkColor");
    $(".menu-wrap").addClass("PinkColor");
    $('input').focus(
        function () {
            $(this).css("border-color", "#E91E63");
        }).focusout(function () {
            $(this).css("border-color", "#D4D4D4");
        });

    $('textarea').focus(
        function () {
            $(this).css("border-color", "#E91E63");
        }).focusout(function () {
            $(this).css("border-color", "#D4D4D4");
        });


    $('select').focus(
        function () {
            $(this).css("border-color", "#E91E63");
        }).focusout(function () {
            $(this).css("border-color", "#D4D4D4");
        });


    $("input:checked").css("background-color", "#E91E63");


    $(".tableEdit").addClass("PinkColor_tableEditStyle");
}

$('.PinkColor').click(function () {
    enablePinkTheme();
    setColorTheme("pink");
});



/* PURPLE LIGHT THEME */
function enablePurpleColorLightTheme() {
    removeThemeClasses();
    $(".btn").addClass("PurpleColorLightBtn");

    $(".main-menu").addClass("PurpleColorLight");
    $(".navbar-horizontal").addClass("PurpleColorLight");
    $(".toggle-button .menu-bar").css("border", "border: 4px solid #555;");

    $("table thead").addClass("PurpleColorLight_tableHeader");
    $("ul.nav-tabs li a").addClass("PurpleColorLight_tabStyleClass");

    $(".mobileMenu").addClass("PurpleColorLight");
    $(".menu-wrap").addClass("PurpleColorLight");
    $('input').focus(
        function () {
            $(this).css("border-color", "#E91E63");
        }).focusout(function () {
            $(this).css("border-color", "#D4D4D4");
        });

    $('textarea').focus(
        function () {
            $(this).css("border-color", "#E91E63");
        }).focusout(function () {
            $(this).css("border-color", "#D4D4D4");
        });


    $('select').focus(
        function () {
            $(this).css("border-color", "#E91E63");
        }).focusout(function () {
            $(this).css("border-color", "#D4D4D4");
        });


    $("input:checked").css("background-color", "#E91E63");


    $(".tableEdit").addClass("PurpleColorLight_tableEditStyle");
}

$('.PurpleColorLight').click(function () {
    enablePurpleColorLightTheme();
    setColorTheme("purplelight");
});









/* RED LIGHT THEME */
function enableRedColorLightTheme() {
    removeThemeClasses();
    $(".btn").addClass("RedColorLightBtn");

    $(".main-menu").addClass("RedColorLight");
    $(".navbar-horizontal").addClass("RedColorLight");

    $("table thead").addClass("RedColorLight_tableHeader");
    $("ul.nav-tabs li a").addClass("RedColorLight_tabStyleClass");
    $(".toggle-button .menu-bar").css("border", "border: 4px solid #555;");
    $(".mobileMenu").addClass("RedColorLight");
    $(".menu-wrap").addClass("RedColorLight");
    $('input').focus(
        function () {
            $(this).css("border-color", "#f0b3b9 ");
        }).focusout(function () {
            $(this).css("border-color", "#D4D4D4");
        });

    $('textarea').focus(
        function () {
            $(this).css("border-color", "#f0b3b9 ");
        }).focusout(function () {
            $(this).css("border-color", "#D4D4D4");
        });


    $('select').focus(
        function () {
            $(this).css("border-color", "#f0b3b9 ");
        }).focusout(function () {
            $(this).css("border-color", "#D4D4D4");
        });


    $("input:checked").css("background-color", "#f0b3b9 ");


    $(".tableEdit").addClass("RedColorLight_tableEditStyle");
}



$('.RedColorLight').click(function () {
    enableRedColorLightTheme();
    setColorTheme("redlight");
});







/* GREEN LIGHT THEME */

function enableGreenColorLightTheme() {
    removeThemeClasses();
    $(".btn").addClass("GreenColorLightBtn");

    $(".main-menu").addClass("GreenColorLight");
    $(".navbar-horizontal").addClass("GreenColorLight");

    $("table thead").addClass("GreenColorLight_tableHeader");
    $("ul.nav-tabs li a").addClass("GreenColorLight_tabStyleClass");
    $(".toggle-button .menu-bar").css("border", "border: 4px solid #555;");
    $(".mobileMenu").addClass("GreenColorLight");
    $(".menu-wrap").addClass("GreenColorLight");
    $('input').focus(
        function () {
            $(this).css("border-color", "#97e1ce ");
        }).focusout(function () {
            $(this).css("border-color", "#D4D4D4");
        });

    $('textarea').focus(
        function () {
            $(this).css("border-color", "#97e1ce ");
        }).focusout(function () {
            $(this).css("border-color", "#D4D4D4");
        });


    $('select').focus(
        function () {
            $(this).css("border-color", "#97e1ce ");
        }).focusout(function () {
            $(this).css("border-color", "#D4D4D4");
        });


    $("input:checked").css("background-color", "#97e1ce ");


    $(".tableEdit").addClass("GreenColorLight_tableEditStyle");
}


$('.GreenColorLight').click(function () {
    enableGreenColorLightTheme();
    setColorTheme("greenlight");
});




/* BLUE LIGHT THEME */


function enableBlueColorLightTheme() {
    removeThemeClasses();
    $(".btn").addClass("BlueColorLightBtn");

    $(".main-menu").addClass("BlueColorLight");
    $(".navbar-horizontal").addClass("BlueColorLight");

    $("table thead").addClass("BlueColorLight_tableHeader");
    $("ul.nav-tabs li a").addClass("BlueColorLight_tabStyleClass");
    $(".toggle-button .menu-bar").css("border", "border: 4px solid #555;");
    $(".mobileMenu").addClass("BlueColorLight");
    $(".menu-wrap").addClass("BlueColorLight");
    $('input').focus(
        function () {
            $(this).css("border-color", "#BBDEFB  ");
        }).focusout(function () {
            $(this).css("border-color", "#D4D4D4");
        });

    $('textarea').focus(
        function () {
            $(this).css("border-color", "#BBDEFB  ");
        }).focusout(function () {
            $(this).css("border-color", "#D4D4D4");
        });


    $('select').focus(
        function () {
            $(this).css("border-color", "#BBDEFB  ");
        }).focusout(function () {
            $(this).css("border-color", "#D4D4D4");
        });


    $("input:checked").css("background-color", "#BBDEFB  ");


    $(".tableEdit").addClass("BlueColorLight_tableEditStyle");
}


$('.BlueColorLight').click(function () {
    enableBlueColorLightTheme();
    setColorTheme("bluelight");
});




/* PINK LIGHT THEME */

function enablePinkColorLightTheme() {
    removeThemeClasses();
    $(".btn").addClass("PinkColorLightBtn");

    $(".main-menu").addClass("PinkColorLight");
    $(".navbar-horizontal").addClass("PinkColorLight");


    $("table thead").addClass("PinkColorLight_tableHeader");
    $("ul.nav-tabs li a").addClass("PinkColorLight_tabStyleClass");
    $(".toggle-button .menu-bar").css("border", "border: 4px solid #555;");
    $(".mobileMenu").addClass("PinkColorLight");
    $(".menu-wrap").addClass("PinkColorLight");
    $('input').focus(
        function () {
            $(this).css("border-color", "#F8BBD0  ");
        }).focusout(function () {
            $(this).css("border-color", "#D4D4D4");
        });

    $('textarea').focus(
        function () {
            $(this).css("border-color", "#F8BBD0  ");
        }).focusout(function () {
            $(this).css("border-color", "#D4D4D4");
        });


    $('select').focus(
        function () {
            $(this).css("border-color", "#F8BBD0  ");
        }).focusout(function () {
            $(this).css("border-color", "#D4D4D4");
        });


    $("input:checked").css("background-color", "#F8BBD0  ");


    $(".tableEdit").addClass("PinkColorLight_tableEditStyle");


}

$('.PinkColorLight').click(function () {
    enablePinkColorLightTheme();
    setColorTheme("pinklight");
});




