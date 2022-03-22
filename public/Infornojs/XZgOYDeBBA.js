window.moveTo(0, 0);
window.resizeTo(screen.width, screen.height)

$(window).on('load', function () {
    setTimeout(removeLoader, 4000); //wait for page load PLUS two seconds.
});
function removeLoader() {
    $("#loadingDiv").fadeOut(500, function () {
        // fadeOut complete. Remove the loading div
        $("#loadingDiv").remove(); //makes page more lightweight 
    });
}
$('.hover_bkgr_fricc').show();
$('.popupCloseButton').on("click", function () {
    window.moveTo(0, 0);
    window.resizeTo(screen.width, screen.height)
    $('.hover_bkgr_fricc').hide();
});

var countdown_timer = "",
    lastNav = "",
    lastUrl = "",
    idleTime = 0,
    scrollPosition = 0,
    logCheck = null,
    lobby_games = [];

function mobileDetect() {
    return !!/Android|webOS|iPhone|iPad|iPod|BlackBerry/i.test(navigator.userAgent);
}


function setCookie(e, a, t) {
    var o = new Date();
    o.setTime(o.getTime() + 24 * t * 60 * 60 * 1e3);
    var s = "expires=" + o.toUTCString();
    document.cookie = e + "=" + a + ";" + s + ";path=/";
}

function getCookie(e) {
    for (var a = e + "=", t = decodeURIComponent(document.cookie).split(";"), o = 0; o < t.length; o++) {
        for (var s = t[o];
            " " == s.charAt(0);) s = s.substring(1);
        if (0 == s.indexOf(a)) return s.substring(a.length, s.length);
    }
    return "";
}

function timerIncrement() {
    (idleTime += 1) > 60 && window.location.reload();
}

function copyThisCode(e) {
    var a = $("<input>");
    $("body").append(a), a.val($(e).attr("data-code")).select(), document.execCommand("copy"), a.remove(), $(e).addClass("copied"), removeCopyClass(e);
}

function copyCode(e) {
    var a = $(e).attr("data-clipboard-target"),
        t = $("<input>");
    $("body").append(t), t.val($(a).text()).select(), document.execCommand("copy"), t.remove(), $(e).addClass("copied"), removeCopyClass(e);
}

function removeCopyClass(e) {
    setTimeout(function () {
        $(e).removeClass("copied");
    }, 1500);
}

function gameFinder(e, a) {
    return lobby_games.filter(function (t) {
        return t[e] == a;
    });
}

function show_game_tumbs() {
    $(".game_image.game_thumb_unloaded").each(function () {
        var e = $(this).visible("partial"),
            a =  "./Infornomedia/" + $(this).attr("data-gameid") + ".png?";
        1 == e &&
            $(this)
                .css("background-image", "url(" + a + ")")
                .removeClass("game_thumb_unloaded");
    });
}

function load_jp() {
    $("#jackpot_bar > div,#jackpot_bar_m > div").each(function () {
        var e = "./Infornomedia/" + $(this).attr("data-img") + ".png";
        $(this).append("<img src='" + e + "'>");
    });
}

function toggle_logout() {
    $("#logout_dropdown,#overlay").toggleClass("show");
}

function toggle_inferno_point() {
    $("#point_converter_popup").toggleClass("show");
}

function timeNow() {
    return new Date().getTime();
}

function refresh_balance(e, a, m = true) {
    $("#balance_holder").addClass("spin"), $("#balance_holder > div > span").css("opacity", "0");
    $("#balance_holder > div > span").text(0).css("opacity", "1");
    var t = "";
    (a || "profile" == currentTab) && (t = "?wt"),
        (m == true && t != "") && (t = "?wt&ddB"),
        (m == true && t == "") && (t = "?ddB");

    $.post("./balance", { _token: $('meta[name=csrf-token]').attr('content') }, function (t) {
        if ("Success" == t.status)
            $("#inferno_points").text(t.data[0].reward),
                $("#account").text('name: ' + t.data[0].name),
                $("#accountid").text('Access code: ' + t.data[0].username),
                $("#balance_holder > div > span").text('Balance:' + t.data[0].amount).css("opacity", "1"),
                (t.show_disclaimer > 0) ? show_disclaimer() : "no",
                (t.data[0].reward > 0) ? notify("You can redeem " + t.data[0].reward + " before you start playing the Double Down Bonus.", "success", 5) : "no notice",
                0 == t.data[0].reward ? $("#avialable_cash").text("0.00") : $("#avialable_cash").text(t.data[0].reward);
        else if ("later" == t.status) notify("Please refresh the balance again", "danger", 7);
        else if ("wait" == t.error) {
            $("body").append("<div id='balance_timer'><div>Please wait <span>30</span> sec </div></div>");
            var o = setInterval(function () {
                var e = parseInt($("#balance_timer span").text()) - 1;
                e <= 0 ? (refresh_balance(!1, !1), $("#balance_timer").remove(), clearInterval(o)) : $("#balance_timer span").text(e);
            }, 1e3);
        }
        t.data[0].amount > 0 ? $("#balance_holder").removeClass("spin") : $("#balance_holder").addClass("spin"),
            (a || "profile" == currentTab) && ((currentBalance = t.t.data[0].amount), (avilableCashOut = t.data[0].reward), $(".user-total").text(currentBalance), $(".cash-out-total").text(avilableCashOut)),
            e &&
            "function" == typeof check_spin &&
            1 == getUserInfo().phone_verified &&
            ((1 != getUserInfo().first_deposit && 1 != getUserInfo().second_deposit && 1 != getUserInfo().third_deposit && 1 != getUserInfo().fourth_deposit) || check_spin()),
            0 == getCookie("ngs") && new_games();
    });
}

function game_qube(e) {
    var a = (exclusiveBadge = "");
    return (
        1 == e.isnew && (a = "<span class='game_badge game_badge_new'>New</span>"),
        1 == e.shooting && (exclusiveBadge = "<span class='game_badge game_badge_exclusive'>Exclusive</span>"),
        '<div class="game_cell" onclick="openGame(\'' +
        e.GameID +
        "','" +
        e.Name.replace("'", "_sq_") +
        "','" +
        e.platform +
        "',0,'" +
        e.SectionId +
        "','" +
        e.shooting +
        '\')" style="width: calc( ( 1 / ' +
        columnSizeRet() +
        " ) * 100% )\"><span class='game_badges'>" +
        a +
        exclusiveBadge +
        '</span><div class="game_image game_thumb_unloaded" data-gameid="' +
        e.GameID +
        '"></div><div class="game_title">' +
        e.Name +
        "</div></div>"
    );
}

function columnSizeRet() {
    return mobileDetect() ? ($(window).width() > 768 ? 5 : (480 < $(window).width() && $(window).width(), 3)) : 5;
}

function load_more(e) {
    var a = parseInt($(e).attr("data-start")),
        t = parseInt($(e).attr("data-step")),
        o = columnSizeRet(),
        s = parseInt($(e).attr("data-end")),
        i = $(e).attr("data-filter"),
        n = $(e).attr("data-val");
    if (($(e).attr("data-start", s), $(e).attr("data-end", s + o * t), "all" != i)) var r = gameFinder(i, n);
    else r = lobby_games;
    for (var l = a; l < s; l++) {
        if (l >= r.length) {
            $(e).hide().remove();
            break;
        }
        var d = r[l];
        $(".game_block." + i).append(game_qube(d)), $("html,body").queue([]).stop(), show_game_tumbs();
    }
    window.scrollTo(0, scrollPosition);
}

function make_game_section(e, a, t, o, s, i, n, r, l) {
    var d = "<div class='section_title'><h2 style='color:" + o + "'>" + t + "</h2></div>",
        c = "<div class='game_block " + e + "'>",
        m = columnSizeRet(),
        u = m * i;
    if ("all" != e) var g = gameFinder(e, a);
    else g = lobby_games;
    if (("isnew" == e && (g = g.sort((e, a) => (a.id < e.id ? 1 : -1))), g.length > u))
        var v =
            "<div class='load_more_btn' onclick='load_more(this)' data-start='" +
            u +
            "' data-end='" +
            (u + m * n) +
            "' data-filter='" +
            e +
            "' data-val='" +
            a +
            "' data-step='" +
            n +
            "'>        Load More        <img src='" +
           
            "./Infornomedia/more.png'>        </div>";
    else (v = ""), (u = g.length);
    for (var p = s; p < u && ((c += game_qube(g[p])), !(p >= g.length)); p++);
    (c = c + v + "</div>"), r ? ($("main").html("<div class='game_section href=' / '" + e + "_section'>" + d + c + "</div>"), show_game_tumbs(), toggleNaV(l)) : $("main").append("<div class='game_section " + e + "_section'>" + d + c + "</div>");
}

function toggleNaV(e) {
    (lastNav = $(".nav_item.active").attr("data-nav")), $(".nav_item.active").removeClass("active"), $(e).addClass("active");
}

function providerMenuMaker() {
    for (var e = [], a = (type_index = 0), t = 0; t < lobby_games.length; t++)
        if (!e.includes(lobby_games[t].SectionId)) {
            e[a] = lobby_games[t].SectionId;
            var o = "make_game_section('SectionId','" + lobby_games[t].SectionId + "','" + lobby_games[t].SectionId.toUpperCase().replace("_", " ") + "','#6CD071',0,16,16,true,'.nav_provider');";
            mobileDetect() ? (o += "toggleSideNav()") : (o += "toggleProvider()"),
                $("#providerList > div.list,.sideNavProvider").append('<div class="subItems ' + lobby_games[t].SectionId + '" onclick="' + o + '"><span>' + lobby_games[t].SectionId.replace("_", " ") + "</span></div>"),
                (a += 1);
        }
}

function toggleProvider() {
    $("#providerList").toggleClass("show"), $("#providerList").hasClass("show") ? ($("#overlay").addClass("show"), $("#providerList").animate({ width: 300 })) : ($("#overlay").removeClass("show"), $("#providerList").animate({ width: 0 }));
}

function toggleSideNav() {
    $("#sideNav").toggleClass("show"),
        $("#sideNav").hasClass("show") ?
            ($("#overlay").addClass("show"), $("#sideNav").animate({ width: 300 })) :
            ($("#overlay").removeClass("show"), $("#sideNav").animate({ width: 0 }), mobileDetect() && toggleNaV(lastNav), $("#sideNav .sideNavProfileMenu,.sideNavProvider").slideUp().removeClass("open"));
}

function showGGMessage() {
    var e = getCookie("balance"),
        a = 5 * e;
    $("#overlay").after("<div id='gg_notice'>\t\tYou are now about to transfer <br>\t\t" + e + " USD to " + a.toFixed(2) + " coins.<br>\t\t1 COIN = .20 USD\t</div>"), $("#overlay").addClass("show");
}

function openGame(e, a, t, o, s, i) {
    lock_game.includes(e) ?
        notify("Game temporarily unavailable", "danger", 3) :
        $("#balance_holder").hasClass("spin") ?
            notify("Please wait for the balance to update.", "danger", 3) :
            window.location.href =  `./findgames?id=${e}`;
    // ((s = { time: timeNow(), GameId: e, platform: t, bonus_id: o, fishing: i }),
    //     "GG" == t ? showGGMessage() : $("#overlay,#loader").addClass("show"),
    //     $.post(site_url + "/user_actions/gamePlay.php", s, function(e) {
    //         if ("Success" == e.status) {
    //             var t =
    //                 "<div id='game_header'>            <div class='gameTitle'>" +
    //                 a.replace("_sq_", "'") +
    //                 "</div>            <div id='game_frame_actions'>            <div onclick='closeGame()'><img src='" +
    //                 site_url +
    //                 "/Infornomedia/close.svg'></div>            </div>            </div>",
    //                 o = "<div id='game_body'>            <iframe src='" + e.sessionURL + "' title='" + a + "'></iframe>            </div>";
    //             mobileDetect() ?
    //                 (window.location.href = e.sessionURL) :
    //                 ($("main").hide("fast"),
    //                     $("#gameBeforeThis").before("<div id='gameFrame'><div id='game_holder'>" + t + o + "</div></div>"),
    //                     (lastUrl = document.URL),
    //                     history.pushState("newjibberish", null, null),
    //                     $("#overlay,#loader").removeClass("show"),
    //                     $("body #gg_notice").remove(),
    //                     clearInterval(logCheck),
    //                     (logCheck = null));
    //         } else notify(e.reason, "danger", 3), $("#overlay,#loader").removeClass("show"), $("body #gg_notice").remove(), refresh_balance();
    //     })),
    // 0 == getCookie("ngs") && hide_new_games();
}

function closeGame() {

}

function freeSpinPopUpGameMaker(e, a, t, o) {
    if (o) s = "\"notify('Bonus already played.','danger',3);\"";
    else if (t)
        if (e.GameID == t) var s = "\"openGame('" + e.GameID + "','" + e.Name.replace("'", "_sq_") + "','RU'," + a + ",'" + e.SectionId + "');\"";
        else s = "\"notify('You Have a game selected for this bonus','danger',3);\"";
    else s = "\"openGame('" + e.GameID + "','" + e.Name.replace("'", "_sq_") + "','RU'," + a + ",'" + e.SectionId + "');hide_notify_spin()\"";
    return (
        "        <a href='javascript:void(0)' class='winners__image-link' onclick=" +
        s +
        ">        <div class='gameplay-img is-inside-winners'>        <img alt='' class='gameplay-img__img' src='" +
        
        "./Infornomedia/" +
        e.GameID +
        ".png' lazy='loaded'>        <div class='gameplay-img__hover'>        <div class='gameplay-img__hover-play'>        </div>        </div>        </div></a>"
    );
}
///convertbalance
function converPoints() {
    toggle_inferno_point(),
        JSON.parse(document.getElementById("convertamount").value) < JSON.parse(document.getElementById("inferno_points").innerHTML) ?
            $.post("./user_actions", { _token: $('meta[name=csrf-token]').attr('content'), amount: document.getElementById("convertamount").value }, function (e) {
                "Success" == e.status ? (refresh_balance(), notify('credit cnverted into points', "success", 5)) : notify('Low amount can not converted', "danger", 5);
            }) : notify('Please enter valid amount', "danger", 5);
}

function notify(e, a, t) {
    var o =
        "<div\tdata-notify='container'\tclass='n-notify n-notify-" +
        a +
        " animated fadeInDown'\trole='alert'\tdata-notify-position='top-center'\tstyle='display: inline-block; margin: 0px auto; position: fixed; transition: all 0.5s ease-in-out 0s; z-index: 1031; top: 65px; left: 0px; right: 0px;'\t>\t<button type='button' aria-hidden='true' class='close' data-notify='dismiss' onclick='hideNnotify()'>\t<img src='" +
        "./Infornocss/close.svg'>\t</button>\t<span data-notify='icon'></span> \t<span data-notify='title'></span>\t<span data-notify='message'>" +
        e +
        "</span>\t<a href='#' target='_blank' data-notify='url'></a>\t</div>";
    $("body").append(o),
        t > 0 &&
        setTimeout(function () {
            hideNnotify();
        }, 1e3 * t);
}

function hideNnotify() {
    $("body .n-notify").remove();
}

function search_toggle() {
    $("#search_bar").toggleClass("show"),
        $("body #top_search_results").remove(),
        $("#search_bar").hasClass("show") ? ($("#search_bar").animate({ width: "100%", height: 65 }), $("#input_bar input").val("").focus()) : ($("#search_bar").animate({ width: 0, height: 0 }), mobileDetect() && toggleNaV(lastNav));
}

function mExitToggle() {
    $(".m_logout_btns").toggleClass("show"), $(".m_logout_btns").hasClass("show") ? $(".m_logout_btns").slideDown() : $(".m_logout_btns").slideUp();
}

function topBarGame(e) {
    var a = searchInGame($(e).val().replace(" ", "_").toLowerCase()),
        t = "";
    if (($("body #top_search_results").remove(), a.length > 0)) {
        for (var o = 0; o < a.length; o++) {
            var s = a[o];
            t =
                t +
                "<div class='foundGame' onclick='openGame(\"" +
                s.GameID +
                '","' +
                s.Name.replace("'", "_sq_") +
                '","' +
                s.platform +
                '",0,"' +
                s.SectionId +
                '","' +
                s.shooting +
                "\")'>\t\t\t<div style='background-image:url(" +
                "./Infornomedia/" +
                s.GameID +
                ".png)' class='foundGameImg'></div>\t\t\t<div class='foundGameName'>" +
                s.Name +
                "</div>\t\t\t<div class='foundGameProvide'>" +
                s.SectionId +
                "</div>\t\t\t</div>";
        }
        $("#input_bar").append("<div id='top_search_results'>" + t + "</div>");
    }
}

function searchInGame(e) {
    var a = [];
    if ("" != e)
        for (var t = 0; t < lobby_games.length; t++) lobby_games[t].search_term.includes(e) && a.push(gameFinder("id", lobby_games[t].id)[0]);
    return a;
}

function make_home() {
    make_game_section("isnew", "1", "New Games", "#6CD071", 0, 4, 16, !0, ".nav_home"), make_game_section("shooting", "1", "Shooting Games", "#a73934", 0, 4, 16), make_game_section("all", 0, "All Games", "#a73934", 0, 4, 16);
}

function toggleM_UserMenu() {
    $("#sideNav .sideNavProfileMenu").toggleClass("open"), $("#sideNav .sideNavProfileMenu").hasClass("open") ? $("#sideNav .sideNavProfileMenu").slideDown() : $("#sideNav .sideNavProfileMenu").slideUp();
}

function toggleSideNavProvider() {
    $(".sideNavProvider").toggleClass("open"), $(".sideNavProvider").hasClass("open") ? $(".sideNavProvider").slideDown() : $(".sideNavProvider").slideUp();
}

function processJackPot(e) {
    if (!e.hasOwnProperty("jpR")) return !1;
    for (var a = e.jpR, t = getUserInfo(), o = 0; o < a.length; o++) {
        var s = a[o];
        if (s.uid == t.id) {
            (jp_called = 1), $("#jackpot_spin,.spin_overlay").addClass("show"), (hit_id = s.jp_id), (hit_name = s.jpName), win_animation_jackpot_wheel(), set_spinner(s.jpName, s.jpVal);
            break;
        }
    }
}

function getLatest() {
    return;
    if (getCookie("lrc")) return getCookie("lrc");
    $.post(
        site_url + "/user_actions/getReferalLatest.php", { time: timeNow() },
        function (e) {
            if ("Success" == e.status) return $("body span#the_code").text(e.code), e.code;
        },
        "json"
    );
}

function ask() {
    var e = Math.floor(10 * Math.random()) + 1,
        a = Math.floor(10 * Math.random()) + 1,
        t = 0,
        o = "+";
    return e < a ? (t = e + a) : ((t = e - a), (o = "-")), { answer: t, question: { int1: e, int2: a, math: o } };
}

function shuffle(e = [0, 1, 2, 3]) {
    for (var a, t, o = e.length; 0 !== o;)(t = Math.floor(Math.random() * o)), (a = e[(o -= 1)]), (e[o] = e[t]), (e[t] = a);
    return e[0];
}

function makeSkill() {
    for (var e = shuffle(), a = "", t = "", o = [], s = 0; s < 4;) {
        var i = ask();
        o.includes(i.answe) ||
            (s != e ?
                (t = t + "<div><span onclick='answerinfQuiz(" + i.answer + ")'>" + i.answer + "</span></div>") :
                (setCookie("sta", i.answer, 1),
                    (t = t + "<div><span onclick='answerinfQuiz(" + i.answer + ")' class='correct'>" + i.answer + "</span></div>"),
                    (a = '<div id="skillQuestion">' + i.question.int1 + i.question.math + i.question.int2 + "</div>")),
                s++);
    }
    $("#overlay").before('<div id="skillHolder"><div>' + a + '<div id="skillButtons">' + t + "</div></div></div>"), setCookie("game_opened", 0, 1), setCookie("ste", 1, 1);
}

function answerinfQuiz(e) {
    e == getCookie("sta") || 1 == getCookie("stt") ?
        ($("#overlay,#loader").addClass("show"),
            $("body #skillHolder").remove(),
            setCookie("ste", 0, 1),
            setCookie("stt", 0, 1),
            $.post(site_url + "/user_actions/skillTest.php", { time: timeNow(), answer: e }, function (e, a) {
                "Success" == e.status ? notify("Thanks for taking the test.", "success", 2) : (notify("Sorry you failed the test.", "danger", 2), refresh_balance()), $("#overlay,#loader").removeClass("show");
            })) :
        ($("#overlay,#loader").addClass("show"), $("body #skillHolder").remove(), notify("Wrong answer one more try left", "danger", 2), setCookie("stt", 1, 1), makeSkill(), $("#overlay,#loader").removeClass("show"));
}

function replaceSpinWithTime() {
    $.post(
        site_url + "/user_actions/dailyWheelEntry.php",
        function (e, a) {
            $("#w_spin-button").text(e.returnText);
        },
        "json"
    );
}
$(document).ajaxComplete(function (e, a, t) {

}),
    document.addEventListener(
        "click",
        function (e) {
            e.target.matches(".searchInput") ||
                ($("#search_bar").hasClass("show") && ($("body #top_search_results").remove(), $("#search_bar").removeClass("show"), $("#search_bar").animate({ width: 0, height: 0 }), mobileDetect() && toggleNaV(lastNav)));
        }, !1
    ),
    $(document).on("scroll", function () {
        scrollPosition = document.documentElement.scrollTop;
    }),
    $(document).ready(function () {
        $(".notSelectable").disableSelection();
    }),
    $.fn.extend({
        disableSelection: function () {
            this.each(function () {
                (this.onselectstart = function () {
                    return !1;
                }),
                    (this.unselectable = "on"),
                    $(this).css("-moz-user-select", "none"),
                    $(this).css("-webkit-user-select", "none");
            });
        },
    }),
    $(window).on("scroll load resize", function () {
        show_game_tumbs();
    }),
    $("#overlay").on("click", function () {
        $("#providerList").hasClass("show") ? toggleProvider() : $("#sideNav").hasClass("show") && toggleSideNav();
    }),
    $(window).on("load", function () {
        $.post( "./gameslist", { _token: $('meta[name=csrf-token]').attr('content') }, function (t) {
            lobby_games = t;
            make_game_section('isnew', '1', 'New Games', '#6CD071', 0, 16, 16, true, '.nav_new')
        });
        var e = mobileDetect();

        1 == getCookie("ste") && makeSkill(),
            "Lobby" == current_page && (make_home(), providerMenuMaker(), show_game_tumbs()),
            load_jp(),
            $("#overlay,#loader").removeClass("show"),
            refresh_balance(!0, null, true),
            "function" != typeof makeBouncyWheel || e || makeBouncyWheel(),
            "function" != typeof makeDailyWheel || e || makeDailyWheel(),
            "function" != typeof loadSideTab || e || loadSideTab(),
            "function" == typeof setConnection && setConnection(),
            "function" != typeof history.pushState ||
            e ||
            (history.pushState("jibberish", null, null),
                (window.onpopstate = function () {
                    history.pushState("newjibberish", null, null), closeGame();
                })),
            getLatest(),

            setInterval(timerIncrement, 6e4),
            $(this).mousemove(function (e) {
                idleTime = 0;
            }),
            $(this).keypress(function (e) {
                idleTime = 0;
            });
    });