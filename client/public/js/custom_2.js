
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

$.get(mainURL + "/manage/getMemberForMainSite", function (t) {
    members = JSON.parse(t), setOurAdvisor(), setMangment(), setRD(), setOperations(), setAfterLogo()
}) 