! function(s) {
    s(function() {
        s(".rgdev").append(s('<div class="rgdev-mobile"><span class="icon-bar"></span> <span class="icon-bar"></span><span class="icon-bar"></span></div>')), s(".rgdev-item").has("ul").prepend('<span class="rgdev-click"><i class="rgdev-arrow"></i></span>'), s(".rgdev-item").has("ul").prepend('<span class="aero-indicator"><i class="fa fa-angle-down" aria-hidden="true"></i></span>'), s(".rgdev-item").has("ul").addClass("extra-pad"), s(".rgdev-submenu-item").has("ul").prepend('<span class="rgdev-click"><i class="rgdev-arrow"></i></span>'), s(".rgdev-submenu-item-sub").has("ul").prepend('<span class="rgdev-click"><i class="rgdev-arrow"></i></span>'), s(".rgdev-mobile").click(function() {
            s(".rgdev-list").slideToggle("500")
        }), s(".rgdev-click").click(function() {
            s(this).siblings(".rgdev-submenu").slideToggle("500"), s(this).children(".rgdev-arrow").toggleClass("rgdev-rotate"), s(this).siblings(".rgdev-submenu-sub").slideToggle("500"), s(this).siblings(".rgdev-submenu-sub-sub").slideToggle("500")
        }), window.onresize = function(e) {
            s(window).width() > 1199 && (s(".rgdev-list").removeAttr("style"), s(".rgdev-submenu").removeAttr("style"))
        }
    })
}(jQuery);




if (screen.width < 1201) {

$(document).click(function(e) {
	if (!$(e.target).is('.rgdev *')) {
    	$('.mobile-sub').slideUp('500');	    
    }
});

}

