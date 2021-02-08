! function (t) {
    t(function () {
        t(".rgdev").append(t('<div class="rgdev-mobile"><span class="icon-bar"></span> <span class="icon-bar"></span><span class="icon-bar"></span></div>')), t(".rgdev").append(t('<div class="rgdev-text">Navigation</div>')), t(".rgdev-item").has("ul").prepend('<span class="rgdev-click"><i class="rgdev-arrow"></i></span>'), t(".rgdev-submenu-item").has("ul").prepend('<span class="rgdev-click"><i class="rgdev-arrow"></i></span>'), t(".rgdev-submenu-item-sub").has("ul").prepend('<span class="rgdev-click"><i class="rgdev-arrow"></i></span>'), t(".rgdev-mobile").click(function () {
            t(".rgdev-list").slideToggle("slow")
        }), t(".rgdev-click").click(function () {
            t(this).siblings(".rgdev-submenu").slideToggle("slow"), t(this).children(".rgdev-arrow").toggleClass("rgdev-rotate"), t(this).siblings(".rgdev-submenu-sub").slideToggle("slow"), t(this).siblings(".rgdev-submenu-sub-sub").slideToggle("slow")
        })
    })
}(jQuery), $(document).ready(function (t) {
    function e(t) {
        var e = $("#totop");
        e.removeClass("off on"), "on" == t ? e.addClass("on") : e.addClass("off")
    }
    window.setInterval(function () {
        var t = $(this).scrollTop(),
            a = $(this).height();
        if (t > 0) var s = t + a / 2;
        else s = 1;
        e(s < 1e3 ? "off" : "on")
    }, 300), $("#totop").click(function (t) {
        t.preventDefault(), $("body,html").animate({
            scrollTop: 0
        }, 1200)
    })
});
var users, mainURL = "https://www.elementzero.network/api",
    count = 0,
    shown = !1,
    usersShown = !1,
    msg = ["35 pre-signup were made within the last few minutes", "22 pre-signup were made within the last few minutes", "27 pre-signup were made within the last few minutes", "37 pre-signup were made within the last few minutes", "40 pre-signup were made within the last few minutes", "42 pre-signup were made within the last few minutes", "29 pre-signup were made within the last few minutes", "33 pre-signup were made within the last few minutes", "30 pre-signup were made within the last few minutes", "39 pre-signup were made within the last few minutes", "45 pre-signup were made within the last few minutes", "48 pre-signup were made within the last few minutes", "49 pre-signup were made within the last few minutes"];

function setAfterLogo() {
    $(window).width() <= 768 && $(".afterLogo").each(function () {
        var t = $(this).children("img")[0],
            e = t.naturalWidth;
        t.naturalHeight != e && $(this).css("bottom", "0px")
    })
}

function setOurAdvisor() {
    for (var t = '<div class="s20Teambox01 clearfix" data-102500-start="opacity:0; transform: scale(1.3) translate(0px, 0px);" data-103500-start="opacity:1; transform: scale(1) translate(0px, 0px);" > <div class="s20ttextbox02">Our Advisors</div></div>', e = members.our_advisor.members, a = 103e3, s = 104e3, i = 0; i < e.length; i++) t += getUsertml(a, s, e[i]), a += 500, s += 500;
    $("#our_advisor").html(t)
}

function setOperations() {
    for (var t = '<div class="s20Teambox01 clearfix" data-116000-start="opacity:0; transform: scale(1.3) translate(0px, 0px);" data-117000-start="opacity:1; transform: scale(1) translate(0px, 0px);" > <div class="s20ttextbox02">Operations</div></div>', e = members.operations.members, a = 115500, s = 116500, i = 0; i < e.length; i++) t += getUsertml(a, s, e[i]), a -= 500, s -= 500;
    $("#operations").html(t)
}

function setRD() {
    for (var t = '<div class="s20Teambox01 clearfix" data-122000-start="opacity:0; transform: scale(1.3) translate(0px, 0px);" data-123000-start="opacity:1; transform: scale(1) translate(0px, 0px);" > <div class="s20ttextbox02">R & D</div></div>', e = members.r_d.members, a = 121500, s = 123e3, i = 0; i < e.length; i++) t += getUsertml(a, s, e[i]), a -= 500, s -= 500;
    $("#r_d").html(t)
}

function setMangment() {
    for (var t = members.managment.members, e = 123e3, a = 124e3, s = '<div class="s20Teambox01 clearfix"><div class="s20ttextbox02">Management</div></div>', i = 0; i < t.length; i++) {
        var n = "" != t[i].positon ? "<br/>" + t[i].positon : "";
        s += '<div class="s20Teambox01 clearfix" data-' + e + '-start="opacity:0; transform: scale(1.3) translate(0px, 0px);" data-' + a + '-start="opacity:1; transform: scale(1) translate(0px, 0px);" ><div class="s20tImgbox ani-5"><div class="s20RotaterBox">' + ("http://" == t[i].linkedIn ? '<a href="javascript:void(0);"  class="teamLinkIcon"></a>' : '<a href="' + t[i].linkedIn + '" target="_blank" class="teamLinkIcon"></a>') + '<div class="teamImgNPbox"><img src="' + mainURL + t[i].image + '" alt=""/></div></div></div><div class="s20ttextbox"> <span>' + t[i].name + n + "</span>" + t[i].desc + "</div></div>", e -= 500, a -= 500
    }
    $("#managment").html(s)
}

function getUsertml(t, e, a) {
    var s = "" != a.positon ? a.positon + "<br/>" : "",
        i = "http://" == a.linkedIn ? '<a href="javascript:void(0);"  class="teamLinkIcon"></a>' : '<a href="' + a.linkedIn + '" target="_blank" class="teamLinkIcon"></a>',
        n = "" != a.afterImage ? '<div class="afterLogo"><img src="' + mainURL + a.afterImage + '" /> </div>' : "";
    return html = '<div class="s20Teambox01 clearfix" data-' + t + '-start="opacity:0; transform: scale(1.3) translate(0px, 0px);" data-' + e + '-start="opacity:1; transform: scale(1) translate(0px, 0px);" ><div class="s20tImgbox ani-5"><div class="s20RotaterBox">' + i + '<div class="teamImgNPbox"><img src="' + mainURL + a.image + '" alt=""/></div></div>' + n + '</div><div class="s20ttextbox"> <span>' + a.name + "</span>" + s + a.desc + "</div></div>", html
}

function setHoverAmbassadorsUser() {
    $(window).width();
    $(".multy-img-bx img").mouseover(function () {
        $("#user_voting_area").width();
        var t = $(document).width(),
            e = 0;
        e = t < 640 ? 270 : t < 768 ? 300 : 400, $(this).offset().left > $(document).width() - e ? $(this).next().addClass("right-side") : $(this).next().addClass("left-side")
    }), $(".multy-img-bx").mouseleave(function () {
        $(".multy-vote").removeClass("left-side"), $(".multy-vote").removeClass("right-side")
    })
}

function setCookie(t, e, a) {
    var s = new Date;
    s.setTime(s.getTime() + 24 * a * 60 * 60 * 1e3);
    var i = "expires=" + s.toUTCString();
    document.cookie = t + "=" + e + ";" + i + ";path=/"
}

function getCookie(t) {
    for (var e = t + "=", a = decodeURIComponent(document.cookie).split(";"), s = 0; s < a.length; s++) {
        for (var i = a[s];
            " " == i.charAt(0);) i = i.substring(1);
        if (0 == i.indexOf(e)) return i.substring(e.length, i.length)
    }
    return ""
}
$(function () {
        $.get(mainURL + "/manage/getMemberForMainSite", function (t) {
            members = JSON.parse(t), setOurAdvisor(), setMangment(), setRD(), setOperations(), setAfterLogo()
        })
    }),
    function (t) {
        "use strict";
        var e = function (a, s) {
            this.$element = t(a), this.options = t.extend({}, e.DEFAULTS, s), this.$trigger = t('[data-toggle="n-collapse"][href="#' + a.id + '"],[data-toggle="n-collapse"][data-target="#' + a.id + '"]'), this.transitioning = null, this.options.parent ? this.$parent = this.getParent() : this.addAriaAndCollapsedClass(this.$element, this.$trigger), this.options.toggle && this.toggle()
        };

        function a(e) {
            var a, s = e.attr("data-target") || (a = e.attr("href")) && a.replace(/.*(?=#[^\s]+$)/, "");
            return t(s)
        }

        function s(a) {
            return this.each(function () {
                var s = t(this),
                    i = s.data("bs.n-collapse"),
                    n = t.extend({}, e.DEFAULTS, s.data(), "object" == typeof a && a);
                !i && n.toggle && /show|hide/.test(a) && (n.toggle = !1), i || s.data("bs.n-collapse", i = new e(this, n)), "string" == typeof a && i[a]()
            })
        }
        e.VERSION = "3.3.4", e.TRANSITION_DURATION = 350, e.DEFAULTS = {
            toggle: !0
        }, e.prototype.dimension = function () {
            return this.$element.hasClass("width") ? "width" : "height"
        }, e.prototype.show = function () {
            if (!this.transitioning && !this.$element.hasClass("in")) {
                var a, i = this.$parent && this.$parent.children(".panel").children(".in, .collapsing");
                if (!(i && i.length && (a = i.data("bs.n-collapse")) && a.transitioning)) {
                    var n = t.Event("show.bs.n-collapse");
                    if (this.$element.trigger(n), !n.isDefaultPrevented()) {
                        i && i.length && (s.call(i, "hide"), a || i.data("bs.n-collapse", null));
                        var r = this.dimension();
                        this.$element.removeClass("n-collapse").addClass("collapsing")[r](0).attr("aria-expanded", !0), this.$trigger.removeClass("n-collapsed").addClass("active").attr("aria-expanded", !0), this.transitioning = 1;
                        var o = function () {
                            this.$element.removeClass("collapsing").addClass("n-collapse in")[r](""), this.transitioning = 0, this.$element.trigger("shown.bs.n-collapse")
                        };
                        if (!t.support.transition) return o.call(this);
                        var l = t.camelCase(["scroll", r].join("-"));
                        this.$element.one("bsTransitionEnd", t.proxy(o, this)).emulateTransitionEnd(e.TRANSITION_DURATION)[r](this.$element[0][l])
                    }
                }
            }
        }, e.prototype.hide = function () {
            if (!this.transitioning && this.$element.hasClass("in")) {
                var a = t.Event("hide.bs.n-collapse");
                if (this.$element.trigger(a), !a.isDefaultPrevented()) {
                    var s = this.dimension();
                    this.$element[s](this.$element[s]())[0].offsetHeight, this.$element.addClass("collapsing").removeClass("n-collapse in").attr("aria-expanded", !1), this.$trigger.addClass("n-collapsed").removeClass("active").attr("aria-expanded", !1), this.transitioning = 1;
                    var i = function () {
                        this.transitioning = 0, this.$element.removeClass("collapsing").addClass("n-collapse").trigger("hidden.bs.n-collapse")
                    };
                    if (!t.support.transition) return i.call(this);
                    this.$element[s](0).one("bsTransitionEnd", t.proxy(i, this)).emulateTransitionEnd(e.TRANSITION_DURATION)
                }
            }
        }, e.prototype.toggle = function () {
            this[this.$element.hasClass("in") ? "hide" : "show"]()
        }, e.prototype.getParent = function () {
            return t(this.options.parent).find('[data-toggle="collapse"][data-parent="' + this.options.parent + '"]').each(t.proxy(function (e, s) {
                var i = t(s);
                this.addAriaAndCollapsedClass(a(i), i)
            }, this)).end()
        }, e.prototype.addAriaAndCollapsedClass = function (t, e) {
            var a = t.hasClass("in");
            t.attr("aria-expanded", a), e.toggleClass("n-collapsed", !a).attr("aria-expanded", a)
        };
        var i = t.fn.collapse;
        t.fn.collapse = s, t.fn.collapse.Constructor = e, t.fn.collapse.noConflict = function () {
            return t.fn.collapse = i, this
        }, t(document).on("click.bs.n-collapse.data-api", '[data-toggle="n-collapse"]', function (e) {
            var i = t(this);
            i.attr("data-target") || e.preventDefault();
            var n = a(i),
                r = n.data("bs.n-collapse") ? "toggle" : i.data();
            s.call(n, r)
        }), t.fn.emulateTransitionEnd = function (e) {
            var a = !1,
                s = this;
            t(this).one("bsTransitionEnd", function () {
                a = !0
            });
            return setTimeout(function () {
                a || t(s).trigger(t.support.transition.end)
            }, e), this
        }, t(function () {
            t.support.transition = function () {
                var t = document.createElement("bootstrap"),
                    e = {
                        WebkitTransition: "webkitTransitionEnd",
                        MozTransition: "transitionend",
                        OTransition: "oTransitionEnd otransitionend",
                        transition: "transitionend"
                    };
                for (var a in e)
                    if (void 0 !== t.style[a]) return {
                        end: e[a]
                    };
                return !1
            }(), t.support.transition && (t.event.special.bsTransitionEnd = {
                bindType: t.support.transition.end,
                delegateType: t.support.transition.end,
                handle: function (e) {
                    if (t(e.target).is(this)) return e.handleObj.handler.apply(this, arguments)
                }
            })
        })
    }(jQuery), $(window).on("load", function () {
        $("[data-collapse-group='myDivs']").click(function () {
            var t = $(this);
            $("[data-collapse-group='myDivs']:not([data-target='" + t.data("target") + "'])").each(function () {
                $($(this).data("target")).removeClass("in").addClass("n-collapse")
            })
        }), $("[data-collapse-group='myDivs02']").click(function () {
            var t = $(this);
            $("[data-collapse-group='myDivs02']:not([data-target='" + t.data("target") + "'])").each(function () {
                $($(this).data("target")).removeClass("in").addClass("n-collapse")
            })
        }), jQuery(".un-menu-mainlink a, .un-nsm-link a, .un-filter-link").click(function () {
            $("this").addClass("active"), $("[data-collapse-group='myDivs']").hasClass("active") && $("[data-collapse-group='myDivs']").removeClass("active")
        })
    }), $(document).click(function (t) {
        $(t.target).is(".n-collapse *") || $(".n-collapse.autoClose").collapse("hide")
    });