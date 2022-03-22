var id;
window.app = function(t) {
    function e(e) {
        for (var a, r, u = e[0], l = e[1], d = e[2], f = e[3] || [], m = 0, h = []; m < u.length; m++) r = u[m], i[r] && h.push(i[r][0]), i[r] = 0;
        for (a in l) Object.prototype.hasOwnProperty.call(l, a) && (t[a] = l[a]);
        for (p && p(e), f.forEach(function(t) {
                if (void 0 === i[t]) {
                    i[t] = null;
                    var e = document.createElement("link");
                    c.nc && e.setAttribute("nonce", c.nc), e.rel = "prefetch", e.as = "script", e.href = s(t), document.head.appendChild(e)
                }
            }); h.length;) h.shift()();
        return o.push.apply(o, d || []), n()
    }
    var acid = '';

    function n() {
        for (var t, e = 0; e < o.length; e++) {
            for (var n = o[e], a = !0, r = 1; r < n.length; r++) {
                var s = n[r];
                0 !== i[s] && (a = !1)
            }
            a && (o.splice(e--, 1), t = c(c.s = n[0]))
        }
        return t
    }
    var a = {},
        r = { app: 0 },
        i = { app: 0 },
        o = [];

    function s(t) { return c.p + "" + ({ cashback_popup: "cashback_popup", dailywheel_popup: "dailywheel_popup", game_popup: "game_popup", referral_popup: "referral_popup" }[t] || t) + "." + { cashback_popup: "6ad8598d", dailywheel_popup: "c1695314", game_popup: "f6a81e18", referral_popup: "559ff8d1" }[t] + ".bundle.js" }

    function c(e) { if (a[e]) return a[e].exports; var n = a[e] = { i: e, l: !1, exports: {} }; return t[e].call(n.exports, n, n.exports, c), n.l = !0, n.exports }
    c.e = function(t) {
        var e = [];
        r[t] ? e.push(r[t]) : 0 !== r[t] && { cashback_popup: 1, dailywheel_popup: 1, game_popup: 1, referral_popup: 1 }[t] && e.push(r[t] = new Promise(function(e, n) {
            for (var a = "css/" + ({ cashback_popup: "cashback_popup", dailywheel_popup: "dailywheel_popup", game_popup: "game_popup", referral_popup: "referral_popup" }[t] || t) + "." + { cashback_popup: "ae59f20f", dailywheel_popup: "adc82900", game_popup: "b23efda1", referral_popup: "69552733" }[t] + ".css", i = c.p + a, o = document.getElementsByTagName("link"), s = 0; s < o.length; s++) { var u = (d = o[s]).getAttribute("data-href") || d.getAttribute("href"); if ("stylesheet" === d.rel && (u === a || u === i)) return e() }
            var l = document.getElementsByTagName("style");
            for (s = 0; s < l.length; s++) { var d; if ((u = (d = l[s]).getAttribute("data-href")) === a || u === i) return e() }
            var p = document.createElement("link");
            p.rel = "stylesheet", p.type = "text/css", p.onload = e, p.onerror = function(e) {
                var a = e && e.target && e.target.src || i,
                    o = new Error("Loading CSS chunk " + t + " failed.\n(" + a + ")");
                o.code = "CSS_CHUNK_LOAD_FAILED", o.request = a, delete r[t], p.parentNode.removeChild(p), n(o)
            }, p.href = i, document.getElementsByTagName("head")[0].appendChild(p)
        }).then(function() { r[t] = 0 }));
        var n = i[t];
        if (0 !== n)
            if (n) e.push(n[2]);
            else {
                var a = new Promise(function(e, a) { n = i[t] = [e, a] });
                e.push(n[2] = a);
                var o, u = document.createElement("script");
                u.charset = "utf-8", u.timeout = 120, c.nc && u.setAttribute("nonce", c.nc), u.src = s(t), o = function(e) {
                    u.onerror = u.onload = null, clearTimeout(l);
                    var n = i[t];
                    if (0 !== n) {
                        if (n) {
                            var a = e && ("load" === e.type ? "missing" : e.type),
                                r = e && e.target && e.target.src,
                                o = new Error("Loading chunk " + t + " failed.\n(" + a + ": " + r + ")");
                            o.type = a, o.request = r, n[1](o)
                        }
                        i[t] = void 0
                    }
                };
                var l = setTimeout(function() { o({ type: "timeout", target: u }) }, 12e4);
                u.onerror = u.onload = o, document.head.appendChild(u)
            }
        return Promise.all(e)
    }, c.m = t, c.c = a, c.d = function(t, e, n) { c.o(t, e) || Object.defineProperty(t, e, { enumerable: !0, get: n }) }, c.r = function(t) { "undefined" != typeof Symbol && Symbol.toStringTag && Object.defineProperty(t, Symbol.toStringTag, { value: "Module" }), Object.defineProperty(t, "__esModule", { value: !0 }) }, c.t = function(t, e) {
        if (1 & e && (t = c(t)), 8 & e) return t;
        if (4 & e && "object" == typeof t && t && t.__esModule) return t;
        var n = Object.create(null);
        if (c.r(n), Object.defineProperty(n, "default", { enumerable: !0, value: t }), 2 & e && "string" != typeof t)
            for (var a in t) c.d(n, a, function(e) { return t[e] }.bind(null, a));
        return n
    }, c.n = function(t) { var e = t && t.__esModule ? function() { return t.default } : function() { return t }; return c.d(e, "a", e), e }, c.o = function(t, e) { return Object.prototype.hasOwnProperty.call(t, e) }, c.p = "js/", c.oe = function(t) { throw console.error(t), t };
    var u = window.webpackJsonp = window.webpackJsonp || [],
        l = u.push.bind(u);
    u.push = e, u = u.slice();
    for (var d = 0; d < u.length; d++) e(u[d]);
    var p = l;
    return e([
        [], {},
        0, ["cashback_popup", "dailywheel_popup", "game_popup", "referral_popup"]
    ]), o.push(["1907", "vendors~app"]), n()
}({
    "02b2": function(t, e, n) {
        "use strict";
        var a = n("4cfa");
        n.n(a).a
    },
    "0dfa": function(t, e, n) {},
    "0ecd": function(t, e, n) {},
    1630: function(t, e, n) {
        "use strict";
        n.d(e, "h", function() { return a }), n.d(e, "c", function() { return r }), n.d(e, "b", function() { return i }), n.d(e, "g", function() { return o }), n.d(e, "f", function() { return s }), n.d(e, "j", function() { return c }), n.d(e, "i", function() { return u }), n.d(e, "d", function() { return l }), n.d(e, "a", function() { return d }), n.d(e, "k", function() { return p }), n.d(e, "e", function() { return f });
        var a = "setPassword",
            r = "initBonus",
            i = "initActivity",
            o = "setDefaultActivities",
            s = "setBonusPopup",
            c = "showModal",
            u = "setProfile",
            l = "openModal",
            d = "closeModal",
            p = "subscribeCashEvents",
            f = "setActiveSocialAccounts"
    },
    1907: function(t, e, n) {
        "use strict";
        n.r(e);
        n("cadf"), n("551c"), n("f751"), n("097d"), n("8e6e"), n("ac6a"), n("456d");
        var a = n("bd86"),
            r = (n("8338"), n("d225")),
            i = n("b0b4"),
            o = function() {
                function t() { Object(r.a)(this, t), this.header = document.getElementById("header"), this.mainPage = document.getElementById("main-page"), this.headerHeight = this.header.offsetHeight, this.headerBottom = this.header.getBoundingClientRect().bottom + this.headerHeight }
                return Object(i.a)(t, [{ key: "onload", value: function() { this.onWindowScroll() } }, { key: "onWindowScroll", value: function() { this.mainPage ? this.header.classList.contains("header--active") && window.pageYOffset < this.headerBottom ? this.header.classList.remove("header--active") : window.pageYOffset > this.headerBottom && this.header.classList.add("header--active") : this.header.classList.add("header--active") } }]), t
            }();
        n("7f7f"), n("96cf");
        var s = n("3b8d"),
            c = n("6b59");

        function u(t, e) {
            var n = Object.keys(t);
            if (Object.getOwnPropertySymbols) {
                var a = Object.getOwnPropertySymbols(t);
                e && (a = a.filter(function(e) { return Object.getOwnPropertyDescriptor(t, e).enumerable })), n.push.apply(n, a)
            }
            return n
        }

        function l(t) {
            for (var e = 1; e < arguments.length; e++) {
                var n = null != arguments[e] ? arguments[e] : {};
                e % 2 ? u(n, !0).forEach(function(e) { Object(a.a)(t, e, n[e]) }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(t, Object.getOwnPropertyDescriptors(n)) : u(n).forEach(function(e) { Object.defineProperty(t, e, Object.getOwnPropertyDescriptor(n, e)) })
            }
            return t
        }

        function d() { return "/" == window.location.pathname ? { eventCategory: "Главная 777" } : null }
        var p = function() {
            function t(e) { Object(r.a)(this, t), this.settings = e, this.searchContainer = document.getElementById(e.searchContainer), this.searchResult = this.searchContainer.querySelector(e.searchResult), this.searchInput = this.searchContainer.querySelector(e.searchInput), this.searchBtn = this.searchContainer.querySelector(e.searchBtn), this.searchMobileActiveClass = this.settings.searchMobileActiveClass, this.searchActiveClass = this.settings.searchActiveClass, this.searchUrl = this.settings.searchUrl, this.isOpen = !1, this.isMobile = !1, this.keyword = null, this.mobilePoint = 460, this.windowWidth = window.innerWidth, this.resultLimit = 20 }
            return Object(i.a)(t, [{ key: "onKeyUp", value: function() { this.keyword = this.searchInput.value.toLowerCase(), this.keyword.length >= 3 ? this.getSearchResult(this.keyword) : (this.searchContainer.classList.remove(this.searchActiveClass), this.searchResult.innerHTML = "") } }, {
                key: "getSearchResult",
                value: function() {
                    var t = Object(s.a)(regeneratorRuntime.mark(function t(e) {
                        var n, a, r, i, o, s;
                        return regeneratorRuntime.wrap(function(t) {
                            for (;;) switch (t.prev = t.next) {
                                case 0:
                                    return n = new Headers({ "X-REQUESTED-WITH": "XMLHttpRequest" }), a = { method: "GET", data: { query: e }, headers: n }, r = "".concat(this.searchUrl, "?").concat(Object.keys(a.data), "=").concat(a.data.query), t.prev = 3, t.next = 6, fetch(r, a);
                                case 6:
                                    if (i = t.sent, e !== this.searchInput.value.toLowerCase()) { t.next = 13; break }
                                    return t.next = 10, i.json();
                                case 10:
                                    o = t.sent, s = JSON.parse(o), this.drawSearch(s);
                                case 13:
                                    t.next = 18;
                                    break;
                                case 15:
                                    t.prev = 15, t.t0 = t.catch(3), console.log(t.t0);
                                case 18:
                                case "end":
                                    return t.stop()
                            }
                        }, t, this, [
                            [3, 15]
                        ])
                    }));
                    return function(e) { return t.apply(this, arguments) }
                }()
            }, { key: "toggleClass", value: function(t) { t ? this.searchContainer.classList.contains(this.searchMobileActiveClass) ? (this.searchContainer.classList.remove(this.searchMobileActiveClass), this.searchContainer.classList.remove(this.searchActiveClass), this.isOpen = !1, this.searchInput.value = null) : (this.searchContainer.classList.add(this.searchMobileActiveClass), this.isOpen = !0) : this.searchContainer.classList.contains(this.searchActiveClass) ? (this.searchContainer.classList.remove(this.searchActiveClass), this.isOpen = !1, this.searchInput.value = null) : (this.searchContainer.classList.add(this.searchActiveClass), this.isOpen = !0) } }, { key: "checkIsMobile", value: function() { return this.windowWidth <= this.mobilePoint } }, {
                key: "drawSearch",
                value: function(t) {
                    this.searchContainer.classList.add(this.searchActiveClass), this.isOpen = !0;
                    0 === t.length ? this.searchResult.innerHTML = '<p class="search-dropdown__error">По Вашему запросу ничего не найдено</p>' : (this.searchResult.innerHTML = "", t.forEach(function(t) {
                        var e = '\n                    <li class="search-dropdown__item" data-game-slug="'.concat(t.slug, '">\n                        <div class="search-dropdown__image-wrap">\n                            <img src="').concat(t.logo, '" alt="').concat(t.name, '" class="search-dropdown__image">\n                        </div>\n                        <div class="search-dropdown__text">').concat(t.name, "</div>\n                    </li>");
                        0 <= this.resultLimit && (this.searchResult.innerHTML += e)
                    }, this))
                }
            }]), t
        }();
        var f = function() {
            function t(e) { Object(r.a)(this, t), this.settings = e, this.container = document.getElementById(this.settings.container), this.girlImage = this.container.querySelector(this.settings.girlImage), this.noteImage = this.container.querySelector(this.settings.noteImage), this.manImage = this.container.querySelector(this.settings.manImage), this.carImage = this.container.querySelector(this.settings.carImage), this.position = 0 }
            return Object(i.a)(t, [{ key: "onInit", value: function() { this.getPosition(), this.animate() } }, { key: "getPosition", value: function() { return this.position = window.pageYOffset || document.documentElement.scrollTop } }, { key: "animate", value: function() { this.getPosition(), this.girlImage.style.transform = "translateX(" + -this.position / 10 + "px", this.noteImage.style.transform = "translateX(" + -this.position / 12 + "px", this.manImage.style.transform = "translateX(" + this.position / 15 + "px", this.carImage.style.transform = "translateX(" + this.position / 7 + "px" } }]), t
        }();
        var m = n("a026"),
            h = n("7707"),
            b = n.n(h),
            g = n("2f62"),
            v = n("3a60"),
            _ = n.n(v),
            y = n("2b27"),
            O = n.n(y),
            w = n("7bb1"),
            S = n("d32a"),
            C = n("b451"),
            E = n.n(C),
            j = n("a038"),
            P = n.n(j);

        function I(t, e) {
            var n = Object.keys(t);
            if (Object.getOwnPropertySymbols) {
                var a = Object.getOwnPropertySymbols(t);
                e && (a = a.filter(function(e) { return Object.getOwnPropertyDescriptor(t, e).enumerable })), n.push.apply(n, a)
            }
            return n
        }
        m.a.use(w.b, {
            locale: "ru" === S.a.getters.language ? "ru" : "uk",
            dictionary: function(t) {
                for (var e = 1; e < arguments.length; e++) {
                    var n = null != arguments[e] ? arguments[e] : {};
                    e % 2 ? I(n, !0).forEach(function(e) { Object(a.a)(t, e, n[e]) }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(t, Object.getOwnPropertyDescriptors(n)) : I(n).forEach(function(e) { Object.defineProperty(t, e, Object.getOwnPropertyDescriptor(n, e)) })
                }
                return t
            }({}, "ru" === S.a.getters.language ? { ru: E.a } : { uk: P.a }),
            events: "blur"
        }), w.a.localize({ ru: { messages: { email: "Введен недействительный Email" } }, uk: { messages: { email: "Введено недійсний Email" } } });
        var k = new m.a({}),
            D = n("7858"),
            T = (n("28a5"), function() {
                function t() { Object(r.a)(this, t) }
                return Object(i.a)(t, null, [{
                    key: "setSiteLocation",
                    value: function() {
                        if (!S.a.getters.appInitialData.appMain) return S.a.dispatch("setSiteLocation", "ua"), !1;
                        var t = S.a.getters.appInitialData.appMain.location;
                        if (t) switch (t) {
                            case "ua":
                                S.a.dispatch("setSiteLocation", "ua");
                                break;
                            default:
                                S.a.dispatch("setSiteLocation", "all")
                        } else S.a.dispatch("setSiteLocation", "ua")
                    }
                }, {
                    key: "setLanguage",
                    value: function() {
                        switch (window.location.host.split(".")[0]) {
                            case "ua":
                                S.a.dispatch("setLanguage", "ua");
                                break;
                            default:
                                S.a.dispatch("setLanguage", "ru")
                        }
                    }
                }]), t
            }()),
            A = n("9ab4"),
            L = n("6fc5"),
            R = function(t) {
                function e() { var e = null !== t && t.apply(this, arguments) || this; return e.images = null, e }
                return Object(A.b)(e, t), e.prototype.SET_IMAGES = function(t) { this.images = t }, e.prototype.setImages = function(t) { this.SET_IMAGES(t) }, Object(A.a)([L.c], e.prototype, "SET_IMAGES", null), Object(A.a)([L.a], e.prototype, "setImages", null), e = Object(A.a)([Object(L.b)({ dynamic: !0, namespaced: !0, name: "settings", store: S.a })], e)
            }(L.d),
            M = Object(L.e)(R);
        n("a481");
        try {
            var x = ! function() { var t = new Error("Cannot find module 'undefined'"); throw t.code = "MODULE_NOT_FOUND", t }();
            x.keys().forEach(function(t) {
                var e = x(t),
                    n = t.split("/").pop().replace(/\.\w+$/, "");
                m.a.component(n, e.default || e)
            })
        } catch (t) {}
        try {
            var N = ! function() { var t = new Error("Cannot find module 'undefined'"); throw t.code = "MODULE_NOT_FOUND", t }(),
                B = N.keys().reduce(function(t, e) { return t["".concat(e)] = N(e), t }, {});
            M.setImages(B)
        } catch (t) {}
        n("4917");

        function U(t, e) {
            var n = Object.keys(t);
            if (Object.getOwnPropertySymbols) {
                var a = Object.getOwnPropertySymbols(t);
                e && (a = a.filter(function(e) { return Object.getOwnPropertyDescriptor(t, e).enumerable })), n.push.apply(n, a)
            }
            return n
        }

        function W(t) {
            for (var e = 1; e < arguments.length; e++) {
                var n = null != arguments[e] ? arguments[e] : {};
                e % 2 ? U(n, !0).forEach(function(e) { Object(a.a)(t, e, n[e]) }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(t, Object.getOwnPropertyDescriptors(n)) : U(n).forEach(function(e) { Object.defineProperty(t, e, Object.getOwnPropertyDescriptor(n, e)) })
            }
            return t
        }
        m.a.directive("clickout", {
            bind: function(t, e, n) {
                var a = function(a) { t === a.target || t.contains(a.target) || n.context[e.expression](a) };
                t.__vueClickOutside__ = a, document.body.addEventListener("click", a)
            },
            unbind: function(t) { document.body.removeEventListener("click", t.__vueClickOutside__) }
        }), m.a.directive("inputOnFocus", { bind: function(t, e, n) { t.addEventListener("focus", function() { D.a.getClosest(t, e.value.selector).classList.add("is-focused", "is-dirty") }, !1), t.addEventListener("blur", function() { var n = D.a.getClosest(t, e.value.selector); if (n.classList.remove("is-focused"), "tel" === t.getAttribute("type")) return !1; "" === t.value && n.classList.remove("is-dirty") }, !1) } }), m.a.directive("filterRegExp", {
            bind: function(t, e) {
                k.inputHandler = function(t) {
                    var n = t || window.event,
                        a = n.keyCode || n.which || n.key;
                    if ("$Backspace$Delete$Home$Tab$ArrowLeft$ArrowRight$Up$Down$End$".indexOf("$" + n.key + "$") < 0) {
                        var r = String.fromCharCode(a),
                            i = e.value;
                        r.match(i) || n.preventDefault()
                    }
                }, t.addEventListener("keypress", k.inputHandler), t.addEventListener("input", k.inputHandler)
            },
            unbind: function(t) { t.removeEventListener("keypress", k.inputHandler), t.removeEventListener("input", k.inputHandler) }
        }), m.a.directive("filterRegExpFullSring", {
            bind: function(t, e) {
                k.inputHandler = function(n) {
                    var a = n || window.event,
                        r = a.keyCode || a.which || a.key;
                    if ("$Backspace$Delete$Home$Tab$ArrowLeft$ArrowRight$Up$Down$End$".indexOf("$" + a.key + "$") < 0) {
                        var i = String.fromCharCode(r),
                            o = e.value,
                            s = t.value.concat(i);
                        "tel" == t.getAttribute("type") && (s = s.replace(/ /g, "")), s.match(o) || a.preventDefault()
                    }
                }, t.addEventListener("keypress", k.inputHandler), t.addEventListener("input", k.inputHandler)
            },
            unbind: function(t) { t.removeEventListener("keypress", k.inputHandler), t.removeEventListener("input", k.inputHandler) }
        });
        var G = {
                data: function() { return { moneyBalance: 0, pointsBalance: 0 } },
                watch: {
                    moneyBalanceValue: function(t, e) {
                        var n = t > e ? 1 : 0;
                        gsap.to(this.$data, { duration: n, moneyBalance: t })
                    },
                    pointsBalanceValue: function(t, e) {
                        var n = t > e ? 1 : 0;
                        gsap.to(this.$data, { duration: n, pointsBalance: t })
                    }
                },
                computed: W({}, Object(g.c)(["getIsShowDailywheelPopup", "getIsDailyWheelRotating", "moneyBalanceValue", "pointsBalanceValue"]), { animatedMoneyBalance: function() { return this.moneyBalance.toFixed(2) }, animatedPointBalance: function() { return this.pointsBalance.toFixed(0) } }),
                methods: W({}, Object(g.b)(["showModal"]), { logout: function() { this.$store.dispatch("removeLogin") }, onLogin: function() { this.showModal("login") } })
            },
            H = (n("2e10"), n("2877")),
            $ = Object(H.a)(G, void 0, void 0, !1, null, null, null).exports,
            F = (n("6762"), n("2fdb"), n("55dd"), n("5758")),
            z = { name: "lazy-component", data: function() { return { isShow: !1 } }, mounted: function() { this.$el.getBoundingClientRect().top <= window.innerHeight && this.$el.getBoundingClientRect().bottom >= 0 ? this.isShow = !0 : (document.addEventListener("scroll", this.lazyLoad), window.addEventListener("resize", this.lazyLoad), window.addEventListener("orientationchange", this.lazyLoad)) }, methods: { lazyLoad: function() { this.isShow = !0, document.removeEventListener("scroll", this.lazyLoad), window.removeEventListener("resize", this.lazyLoad), window.removeEventListener("orientationchange", this.lazyLoad) } } },
            V = Object(H.a)(z, function() { var t = this.$createElement; return (this._self._c || t)("div", { staticClass: "lazy-component" }, [this.isShow ? this._t("default") : this._e()], 2) }, [], !1, null, null, null).exports,
            Y = (n("6b54"), n("84b4"), {
                name: "baseTimer",
                props: { deadline: { type: String, required: !0, validator: function(t) { return Math.trunc(Date.parse(t) / 1e3) } }, title: { type: String }, isShowLabels: { type: Boolean, default: !1 }, skin: { type: String, default: "text-shadow" } },
                data: function() { return { interval: null, timeStart: null, timeCurrent: null, timeDiff: null, isShow: !1, hours: 0, days: 0, minutes: 0, seconds: 0 } },
                created: function() { this.initTimer(this.deadline) },
                computed: { getDays: function() { return Math.trunc(this.timeDiff / 60 / 60 / 24) }, getHours: function() { return Math.trunc(this.timeDiff / 60 / 60) % 24 }, getMinutes: function() { return Math.trunc(this.timeDiff / 60) % 60 }, getSeconds: function() { return Math.trunc(this.timeDiff) % 60 }, getTime: function() { return this.days = this.getDays, this.days = this.days <= 0 ? "" : this.isZeroBefore(this.days), this.hours = this.getHours, this.hours = this.isZeroBefore(this.hours), this.hours = this.getDays > 0 ? this.addDotsBefore(this.hours) : this.hours, this.minutes = this.getMinutes, this.minutes = this.addDotsBefore(this.isZeroBefore(this.minutes)), this.seconds = this.getSeconds, this.seconds = this.addDotsBefore(this.isZeroBefore(this.seconds)), "".concat(this.days).concat(this.hours).concat(this.minutes).concat(this.seconds) }, isHasDays: function() { return this.days > 0 ? "is-days" : "" } },
                methods: {
                    initTimer: function(t) {
                        var e = this;
                        clearInterval(this.interval), this.timeStart = Math.trunc(Date.parse(t) / 1e3), this.tick(), this.interval = setInterval(function() { e.tick() }, 1e3)
                    },
                    tick: function() { this.timeCurrent = this.getTimeCurrent(), this.timeDiff = this.timeStart - this.timeCurrent, this.checkTimeDiff() },
                    getTimeCurrent: function() { return Math.trunc((new Date).getTime() / 1e3) },
                    checkTimeDiff: function() { this.timeDiff && (this.isShow = !0), this.timeDiff <= 0 && (this.timeDiff = 0, clearInterval(this.interval)) },
                    isZeroBefore: function(t) { return t.toString().length <= 1 ? "0".concat(t.toString()) : t.toString() },
                    addDotsBefore: function(t) { return ":".concat(t) }
                },
                destroyed: function() { clearInterval(this.interval) },
                watch: { deadline: function(t) { this.initTimer(t) } }
            }),
            q = (n("aea7"), Object(H.a)(Y, function() {
                var t = this,
                    e = t.$createElement,
                    n = t._self._c || e;
                return n("div", { staticClass: "base-timer", class: [{ "is-active": t.isShow }, t.isHasDays] }, [t.title ? n("div", { staticClass: "base-timer__title" }, [t._v("\n        " + t._s(t.title) + "\n    ")]) : t._e(), n("div", { staticClass: "base-timer__value", class: [t.skin], attrs: { "data-text": t.getTime } }, [t._v("\n        " + t._s(t.getTime) + "\n    ")]), t.isShowLabels ? n("div", { staticClass: "base-timer__label" }, [t.getDays > 0 ? n("span", { staticClass: "base-timer__label-unit" }, [t._v("\n            дней\n        ")]) : t._e(), n("span", { staticClass: "base-timer__label-unit" }, [t._v("\n            часов\n        ")]), n("span", { staticClass: "base-timer__label-unit" }, [t._v("\n            минут\n        ")]), n("span", { staticClass: "base-timer__label-unit" }, [t._v("\n            секунд\n        ")])]) : t._e()])
            }, [], !1, null, null, null).exports);
        n("20d6");

        function J(t, e) {
            var n = Object.keys(t);
            if (Object.getOwnPropertySymbols) {
                var a = Object.getOwnPropertySymbols(t);
                e && (a = a.filter(function(e) { return Object.getOwnPropertyDescriptor(t, e).enumerable })), n.push.apply(n, a)
            }
            return n
        }
        var Z = {
                name: "tournamentTable",
                props: { winners: { type: Array, default: function() { return [{ place: 0, name: "000***", points: 0, current: !1 }] } } },
                data: function() { return { modelWinners: this.winners, indexPosition: 0, rowHeight: 60 } },
                mounted: function() { this.findIndexToScroll(), this.scrollToCurrentUser() },
                computed: function(t) {
                    for (var e = 1; e < arguments.length; e++) {
                        var n = null != arguments[e] ? arguments[e] : {};
                        e % 2 ? J(n, !0).forEach(function(e) { Object(a.a)(t, e, n[e]) }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(t, Object.getOwnPropertyDescriptors(n)) : J(n).forEach(function(e) { Object.defineProperty(t, e, Object.getOwnPropertyDescriptor(n, e)) })
                    }
                    return t
                }({}, Object(g.c)(["appInitialData"])),
                methods: {
                    findIndexToScroll: function() {
                        var t = this.appInitialData.appMain.uuid;
                        this.indexPosition = this.modelWinners.findIndex(function(e) { return e.uuid === t })
                    },
                    scrollToCurrentUser: function() { this.$nextTick(function() { this.$refs.tournamentScrollTo.scrollTop = (this.indexPosition - 1) * this.rowHeight }) }
                },
                watch: { winners: function(t) { this.modelWinners = t, this.findIndexToScroll(), this.scrollToCurrentUser() } }
            },
            K = (n("2eec"), Object(H.a)(Z, function() {
                var t = this,
                    e = t.$createElement,
                    n = t._self._c || e;
                return n("div", { staticClass: "tournament-table" }, [t._m(0), n("div", { ref: "tournamentScrollTo", staticClass: "tournament-table__body cs-1" }, t._l(t.modelWinners, function(e, a) { return n("div", { key: a, staticClass: "row", class: [a === t.indexPosition ? "row--current" : "row--default"] }, [n("div", { staticClass: "cell cell--body cell--place", class: { "cell--first": 0 === a } }, [0 === a ? n("svg", { staticClass: "cell__svg" }, [n("use", { attrs: { "xlink:href": "#tournament-star" } })]) : t._e(), t._v("\n                " + t._s(e.place) + "\n            ")]), n("div", { staticClass: "cell cell--body cell--login" }, [t._v("\n                " + t._s(e.name) + "\n            ")]), n("div", { staticClass: "cell cell--body cell--points cell--text-shadow" }, [n("div", { staticClass: "text-shadow", attrs: { "data-text": e.points } }, [t._v("\n                    " + t._s(e.points) + "\n                ")])])]) }), 0)])
            }, [function() {
                var t = this.$createElement,
                    e = this._self._c || t;
                return e("div", { staticClass: "tournament-table__head cs-1" }, [e("div", { staticClass: "row row--head" }, [e("div", { staticClass: "cell cell--head cell--place" }, [this._v("\n                Место\n            ")]), e("div", { staticClass: "cell cell--head cell--login" }, [this._v("\n                Имя\n            ")]), e("div", { staticClass: "cell cell--head cell--points" }, [this._v("\n                Результат\n            ")])])])
            }], !1, null, null, null).exports),
            X = { name: "baseBtn", props: { tag: { type: String, default: "button" }, className: { type: String }, isLoading: { type: Boolean, default: !1 }, isDisabled: { type: Boolean, default: !1 } }, methods: { onClick: function() { this.$emit("on-click") } } },
            Q = (n("d775"), Object(H.a)(X, function() {
                var t = this,
                    e = t.$createElement,
                    n = t._self._c || e;
                return n(t.tag, { tag: "component", staticClass: "btn", class: [{ "btn--disabled": t.isLoading || t.isDisabled }, t.className], attrs: { disabled: t.isDisabled }, on: { click: t.onClick } }, [t.isLoading ? [n("svg", { attrs: { width: "27", height: "24", viewBox: "0 0 31 32", fill: "none", xmlns: "http://www.w3.org/2000/svg" } }, [n("path", { attrs: { fill: "white", d: "M16.8396 1.536C16.8396 0.64 16.1996 0 15.3036 0C14.4076 0 13.7036 0.64 13.7036 1.536V7.552C13.7036 8.448 14.4076 9.152 15.3036 9.152C16.1996 9.152 16.8396 8.448 16.8396 7.552V1.536ZM11.5918 8.25604L8.07183 3.39204C7.55983 2.68804 6.59983 2.56004 5.89583 3.07204C5.19183 3.58404 5.06383 4.54404 5.57583 5.24804L9.09583 10.112C9.41583 10.56 9.79983 10.752 10.3118 10.752C11.5918 10.752 12.3598 9.28004 11.5918 8.25604ZM1.09587 13.0559C0.263872 12.7999 -0.184128 11.9039 0.0718717 11.0719C0.327872 10.2399 1.22387 9.79195 2.05587 10.0479L7.75187 11.9039C8.58387 12.1599 9.03187 13.0559 8.77587 13.8879C8.58387 14.5279 7.87987 14.9759 7.23987 14.9759C7.10813 14.9759 7.03665 14.9458 6.94274 14.9062L6.94273 14.9062C6.89978 14.8881 6.85213 14.868 6.79187 14.8479L1.09587 13.0559ZM7.75187 20.096C8.58387 19.84 9.03187 18.944 8.77587 18.112C8.51987 17.28 7.62387 16.832 6.79187 17.088L1.09587 18.944C0.263872 19.2 -0.184128 20.096 0.0718717 20.928C0.263872 21.568 0.903872 22.016 1.54387 22.016C1.73587 22.016 1.86387 22.016 2.05587 21.952L7.75187 20.096ZM11.2718 21.568C11.9758 22.08 12.1038 23.04 11.5918 23.744L8.07177 28.608C7.75177 29.056 7.30377 29.248 6.79177 29.248C5.51177 29.248 4.80777 27.776 5.57577 26.752L9.09577 21.888C9.60777 21.184 10.5678 21.056 11.2718 21.568ZM16.8396 24.448C16.8396 23.552 16.1996 22.848 15.3036 22.848C14.4076 22.848 13.7036 23.552 13.7036 24.448V30.4C13.7036 31.296 14.4076 32 15.3036 32C16.1996 32 16.8396 31.296 16.8396 30.4V24.448ZM21.5118 21.888L25.0318 26.752C25.7998 27.776 25.0318 29.248 23.7518 29.248C23.2398 29.248 22.8558 29.056 22.5358 28.608L19.0158 23.744C18.5038 23.04 18.6318 22.08 19.3358 21.568C20.0398 21.056 20.9998 21.184 21.5118 21.888ZM30.5359 20.928C30.7919 20.096 30.3439 19.2 29.5119 18.944L23.8159 17.088C22.9839 16.832 22.0879 17.28 21.8319 18.112C21.5759 18.944 22.0239 19.84 22.8559 20.096L28.5519 21.952C28.7439 22.016 28.8079 22.016 28.9999 22.016C29.6399 22.016 30.3439 21.568 30.5359 20.928ZM21.8319 13.8879C21.5759 13.0559 22.0239 12.1599 22.8559 11.9039L28.5519 10.0479C29.3839 9.79195 30.2799 10.2399 30.5359 11.0719C30.7919 11.9039 30.3439 12.7999 29.5119 13.0559L23.8159 14.8479C23.7758 14.8613 23.7385 14.8747 23.7029 14.8874C23.5677 14.9359 23.4558 14.9759 23.3039 14.9759C22.6639 14.9759 22.0239 14.5279 21.8319 13.8879ZM19.016 8.25604C18.248 9.28004 18.952 10.752 20.232 10.752C20.744 10.752 21.192 10.56 21.512 10.112L25.0319 5.24804C25.5439 4.54404 25.4159 3.58404 24.7119 3.07204C24.0079 2.56004 23.048 2.68804 22.536 3.39204L19.016 8.25604Z" } })])] : t._t("default")], 2)
            }, [], !1, null, null, null).exports),
            tt = { name: "tournament-item-major", components: { "base-timer": q, "base-btn": Q }, props: ["tournament", "isSubscribed", "isSubscribing"] },
            et = Object(H.a)(tt, function() {
                var t = this,
                    e = t.$createElement,
                    n = t._self._c || e;
                return n("div", { staticClass: "tournament tournament--main" }, [n("div", { staticClass: "tournament__container tournament__container--main" }, [n("div", { staticClass: "tournament__prize" }, [n("svg", { staticClass: "tournament__prize-icon" }, [n("use", { attrs: { "xlink:href": "#tournament-cup" } })]), n("div", { staticClass: "tournament__prize-value text-shadow", attrs: { "data-text": t.tournament.prize } }, [t._v("\n                " + t._s(t.tournament.prize) + "\n            ")]), n("div", { staticClass: "tournament__prize-title" }, [t._v("\n                Призовой фонд\n            ")])]), n("div", { staticClass: "tournament__name tournament__name--main" }, [t._v("\n            " + t._s(t.tournament.title) + "\n        ")]), n("div", { staticClass: "tournament__conditions tournament__conditions--main" }, [n("div", { staticClass: "condition", class: { "condition--past": !t.tournament.isOpen } }, [n("div", { staticClass: "condition__value" }, [t._v("\n                    " + t._s(t.tournament.betMin) + " " + t._s(t.tournament.currency) + "\n                ")]), n("div", { staticClass: "condition__description" }, [t._v("\n                    Мин. ставка\n                ")])]), n("div", { staticClass: "condition", class: { "condition--past": !t.tournament.isOpen } }, [n("div", { staticClass: "condition__value" }, [t._v("\n                    " + t._s(t.tournament.betLimit) + "\n                ")]), n("div", { staticClass: "condition__description" }, [t._v("\n                    Ставок\n                ")])]), n("div", { staticClass: "condition", class: { "condition--past": !t.tournament.isOpen } }, [n("div", { staticClass: "condition__value" }, [t._v("\n                    " + t._s(t.tournament.duration) + " min\n                ")]), n("div", { staticClass: "condition__description" }, [t._v("\n                    Время\n                ")])])]), n("div", { staticClass: "tournament__status" }, [t.tournament.isOpen ? [n("base-timer", { staticClass: "tournament__status-timer tournament__status-timer--main", attrs: { deadline: t.tournament.end } }), n("div", { staticClass: "tournament__status-title tournament__status-title--main" }, [t.tournament.isActive ? [t._v("\n                        Заканчивается через\n                    ")] : [t._v("\n                        Начинается через\n                    ")]], 2), t.isSubscribed && t.tournament.isActive ? n("button", { staticClass: "tournament__status-btn btn btn--small btn--blue", on: { click: function(e) { return t.$emit("playGame", t.tournament.gameSlug) } } }, [t._v("\n                    Играть\n                ")]) : t.isSubscribed ? n("div", { staticClass: "tournament__status-btn tournament__status-btn--join" }, [t._v("\n                    Вы участвуете в гонке\n                ")]) : n("base-btn", { staticClass: "tournament__status-btn btn--small", attrs: { "is-loading": t.isSubscribing }, on: { "on-click": function(e) { return t.$emit("joinToTournament") } } }, [t._v("\n                    участвовать\n                ")])] : [n("div", { staticClass: "tournament__status-timer tournament__status-timer--winner text-shadow", attrs: { "data-text": t.tournament.winner } }, [t._v("\n                    " + t._s(t.tournament.winner) + "\n                ")]), n("div", { staticClass: "tournament__status-title tournament__status-title--main" }, [t._v("\n                    ФИНАЛИСТ ГОНКИ\n                ")]), n("button", { staticClass: "tournament__status-btn btn btn--blue", on: { click: function(e) { return t.$emit("showTournamentPopup", "winners", t.tournament.activeId) } } }, [t._v("\n                    победители\n                ")])]], 2), t.tournament.info ? n("div", { staticClass: "tournament__info", on: { click: function(e) { return t.$emit("showTournamentPopup", "info", t.tournament.info) } } }) : t._e()]), n("div", { staticClass: "tournament__time tournament__time--main" }, [n("svg", [n("use", { attrs: { "xlink:href": "#hero-star" } })]), t._v("\n        " + t._s(t.tournament.startDate) + "\n        "), n("br"), t._v("\n        " + t._s(t.tournament.startTime) + "\n    ")])])
            }, [], !1, null, null, null).exports,
            nt = { name: "tournament-item-simple", components: { "base-timer": q, "base-btn": Q }, props: ["tournament", "isSubscribed", "isSubscribing"] },
            at = Object(H.a)(nt, function() {
                var t = this,
                    e = t.$createElement,
                    n = t._self._c || e;
                return n("div", { staticClass: "tournament tournament--default" }, [n("div", { staticClass: "tournament__time tournament__time--default" }, [t._v("\n        " + t._s(t.tournament.startTime) + "\n    ")]), n("div", { staticClass: "tournament__container tournament__container--default" }, [n("button", { staticClass: "tournament__img", attrs: { type: "button" }, on: { click: function(e) { return t.$emit("playGame", t.tournament.gameSlug) } } }, [n("img", { attrs: { src: t.tournament.image, alt: t.tournament.title } })]), n("div", { staticClass: "tournament__name tournament__name--default" }, [t._v("\n            " + t._s(t.tournament.title) + "\n        ")]), n("div", { staticClass: "tournament__conditions tournament__conditions--default" }, [n("div", { staticClass: "condition", class: { "condition--past": t.tournament.isOpen } }, [n("svg", { staticClass: "condition__icon" }, [n("use", { attrs: { "xlink:href": "#money-bag-01" } })]), n("div", { staticClass: "condition__description" }, [t._v("\n                    Мин. ставка\n                ")]), n("div", { staticClass: "condition__value" }, [t._v("\n                    " + t._s(t.tournament.betMin) + " " + t._s(t.tournament.currency) + "\n                ")])]), n("div", { staticClass: "condition", class: { "condition--past": t.tournament.isOpen } }, [n("svg", { staticClass: "condition__icon" }, [n("use", { attrs: { "xlink:href": "#spades" } })]), n("div", { staticClass: "condition__description" }, [t._v("\n                    Кол-во ставок\n                ")]), n("div", { staticClass: "condition__value" }, [t._v("\n                    " + t._s(t.tournament.betLimit) + "\n                ")])]), n("div", { staticClass: "condition", class: { "condition--past": t.tournament.isOpen } }, [n("svg", { staticClass: "condition__icon" }, [n("use", { attrs: { "xlink:href": "#clock" } })]), n("div", { staticClass: "condition__description" }, [t._v("\n                    Время\n                ")]), n("div", { staticClass: "condition__value" }, [t._v("\n                    " + t._s(t.tournament.duration) + " min\n                ")])])]), n("div", { staticClass: "tournament__fund" }, [n("div", { staticClass: "tournament__fund-title" }, [t._v("\n                призовой фонд\n            ")]), n("div", { staticClass: "tournament__fund-value text-shadow", attrs: { "data-text": t.tournament.prize } }, [t._v("\n                " + t._s(t.tournament.prize) + "\n            ")])]), n("div", { staticClass: "tournament__status" }, [t.tournament.isOpen ? [n("base-timer", { staticClass: "tournament__status-timer tournament__status-timer--default", attrs: { deadline: t.tournament.end } }), n("div", { staticClass: "tournament__status-title tournament__status-title--default" }, [t.tournament.isActive ? [t._v("\n                        Заканчивается через\n                    ")] : [t._v("\n                        Начинается через\n                    ")]], 2), t.isSubscribed && t.tournament.isActive ? n("button", { staticClass: "tournament__status-btn btn btn--small btn--blue", on: { click: function(e) { return t.$emit("playGame", t.tournament.gameSlug) } } }, [t._v("\n                    Играть\n                ")]) : t.isSubscribed ? n("div", { staticClass: "tournament__status-btn tournament__status-btn--join" }, [t._v("\n                    Вы участвуете в гонке\n                ")]) : n("base-btn", { staticClass: "tournament__status-btn btn--small", attrs: { "is-loading": t.isSubscribing }, on: { "on-click": function(e) { return t.$emit("joinToTournament") } } }, [t._v("\n                    участвовать\n                ")])] : [n("div", { staticClass: "tournament__status-timer tournament__status-timer--winner text-shadow", attrs: { "data-text": t.tournament.winner } }, [t._v("\n                    " + t._s(t.tournament.winner) + "\n                ")]), n("div", { staticClass: "tournament__status-title tournament__status-title--default" }, [t._v("\n                    ФИНАЛИСТ ГОНКИ\n                ")]), n("button", { staticClass: "tournament__status-btn btn btn--blue", on: { click: function(e) { return t.$emit("showTournamentPopup", "winners", t.tournament.activeId) } } }, [t._v("\n                    победители\n                ")])]], 2), t.tournament.info ? n("div", { staticClass: "tournament__info", on: { click: function(e) { return t.$emit("showTournamentPopup", "info", t.tournament.info) } } }) : t._e()])])
            }, [], !1, null, null, null).exports,
            rt = { name: "tournament-item-promo", components: { "base-timer": q, "tournament-table": K }, props: ["tournament", "isSubscribed", "getWinners"] },
            it = Object(H.a)(rt, function() {
                var t = this,
                    e = t.$createElement,
                    n = t._self._c || e;
                return n("div", { staticClass: "tournament-block-wrap__inner" }, [!t.tournament.isActive || t.tournament.isActive && !t.isSubscribed ? [n("div", { staticClass: "tournament-block promo-container" }, [n("div", { staticClass: "tournament-block__head" }, [n("div", { staticClass: "tournament-block__game-image-wrap" }, [n("img", { staticClass: "tournament-block__game-image", attrs: { src: t.tournament.image, alt: t.tournament.title } })]), n("h4", { staticClass: "tournament-block__title" }, [t._v("\n                    " + t._s(t.tournament.title) + "\n                ")])]), n("div", { staticClass: "tournament-block__content" }, [n("div", { staticClass: "tournament-block__prize" }, [n("span", { staticClass: "tournament-block__prize-sum text-shadow", attrs: { "data-text": t.tournament.prize } }, [t._v("\n                    " + t._s(t.tournament.prize) + "\n                ")]), n("span", { staticClass: "tournament-block__prize-text" }, [t._v("\n                    ПРИЗОВОЙ ФОНД\n                ")])]), n("ul", { staticClass: "tournament-conditions" }, [n("li", { staticClass: "tournament-conditions__item" }, [n("div", { staticClass: "tournament-conditions__item-wrap" }, [n("div", { staticClass: "tournament-conditions__top" }, [n("div", { staticClass: "tournament-conditions__icon-wrap" }, [n("svg", { staticClass: "tournament-conditions__icon" }, [n("use", { attrs: { "xlink:href": "#spades" } })])]), n("span", { staticClass: "tournament-conditions__title" }, [t._v("\n                                    Ставок\n                                ")])]), n("div", { staticClass: "tournament-conditions__value" }, [n("span", { staticClass: "tournament-conditions__value-text" }, [t._v("\n                                " + t._s(t.tournament.betLimit) + "\n                            ")])])])]), n("li", { staticClass: "tournament-conditions__item" }, [n("div", { staticClass: "tournament-conditions__item-wrap" }, [n("div", { staticClass: "tournament-conditions__top" }, [n("div", { staticClass: "tournament-conditions__icon-wrap" }, [n("svg", { staticClass: "tournament-conditions__icon" }, [n("use", { attrs: { "xlink:href": "#money-bag-01" } })])]), n("span", { staticClass: "tournament-conditions__title" }, [t._v("\n                                    Мин. ставка\n                                ")])]), n("div", { staticClass: "tournament-conditions__value" }, [n("span", { staticClass: "tournament-conditions__value-text" }, [t._v("\n                                " + t._s(t.tournament.betMin) + "\n                            ")])])])]), n("li", { staticClass: "tournament-conditions__item" }, [n("div", { staticClass: "tournament-conditions__item-wrap" }, [n("div", { staticClass: "tournament-conditions__top" }, [n("div", { staticClass: "tournament-conditions__icon-wrap" }, [n("svg", { staticClass: "tournament-conditions__icon" }, [n("use", { attrs: { "xlink:href": "#clock" } })])]), n("span", { staticClass: "tournament-conditions__title" }, [t._v("\n                                    Время\n                                ")])]), n("div", { staticClass: "tournament-conditions__value" }, [n("span", { staticClass: "tournament-conditions__value-text" }, [t._v("\n                                " + t._s(t.tournament.duration) + " MIN\n                            ")])])])])]), n("div", { staticClass: "tournament-block__button-wrap" }, [t.isSubscribed ? n("div", { staticClass: "tournament-block__button--active" }, [t._v("\n                            ВЫ УЧАСТВУЕТЕ В ТУРНИРЕ\n                    ")]) : n("button", { staticClass: "btn btn--small tournament-block__button", on: { click: function(e) { return t.$emit("joinToTournament") } } }, [t._v("\n                        Участвовать\n                    ")])]), n("div", { staticClass: "tournament-block__timer-wrap" }, [n("base-timer", { staticClass: "tournament-block__timer text-shadow", attrs: { deadline: t.tournament.end } }), t.tournament.isActive ? n("span", { staticClass: "tournament-block__timer-title" }, [t._v("\n                        ДО ОКОНЧАНИЯ ГОНКИ\n                    ")]) : n("span", { staticClass: "tournament-block__timer-title" }, [t._v("\n                        ДО НАЧАЛА ГОНКИ\n                    ")])], 1)])])] : [n("div", { staticClass: "tournament-block tournament-block--table" }, [n("div", { staticClass: "tournament-block__top" }, [n("div", { staticClass: "tournament-block__icon-wrap" }, [n("svg", { staticClass: "tournament-block__icon" }, [n("use", { attrs: { "xlink:href": "#tournament-cup" } })])]), n("base-timer", { staticClass: "timer text-shadow tournament-block__timer tournament-block__timer--big text-shadow", attrs: { deadline: t.tournament.end } }), n("div", { staticClass: "tournament-block__table-title" }, [t._v("\n                    ГОНКА НАЧАЛАСЬ!\n                    "), t.isSubscribed ? n("a", { staticClass: "tournament-block__table-link", attrs: { href: "javascript:void(0);" }, on: { click: function(e) { return t.$emit("playGame", t.tournament.gameSlug) } } }, [t._v("\n                        ПЕРЕЙДИТЕ В ИГРУ\n                    ")]) : n("a", { staticClass: "tournament-block__table-link", attrs: { href: "javascript:void(0);" }, on: { click: function(e) { return t.$emit("joinToTournament") } } }, [t._v("\n                        УЧАСТВОВАТЬ\n                    ")])])], 1), n("tournament-table", { staticClass: "tournament-block__winners", attrs: { winners: t.getWinners } })], 1)]], 2)
            }, [], !1, null, null, null).exports,
            ot = n("65d5"),
            st = n("e32f");

        function ct(t, e) {
            var n = Object.keys(t);
            if (Object.getOwnPropertySymbols) {
                var a = Object.getOwnPropertySymbols(t);
                e && (a = a.filter(function(e) { return Object.getOwnPropertyDescriptor(t, e).enumerable })), n.push.apply(n, a)
            }
            return n
        }
        var ut = {
                name: "tournamentItem",
                components: { "lazy-component": V, "base-timer": q, "base-btn": Q, "tournament-table": K, "tournament-item-major": et, "tournament-item-simple": at, "tournament-item-promo": it },
                data: function() { return { isJoin: this.tournamentProps.isSubscribed, isSubscribing: !1, tournamentData: this.tournamentProps } },
                props: ["view", "tournamentProps", "isPreRender"],
                computed: function(t) {
                    for (var e = 1; e < arguments.length; e++) {
                        var n = null != arguments[e] ? arguments[e] : {};
                        e % 2 ? ct(n, !0).forEach(function(e) { Object(a.a)(t, e, n[e]) }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(t, Object.getOwnPropertyDescriptors(n)) : ct(n).forEach(function(e) { Object.defineProperty(t, e, Object.getOwnPropertyDescriptor(n, e)) })
                    }
                    return t
                }({}, Object(g.c)(["getIsGuest", "getTournamentSubscribedId", "getTournamentWinners"]), { getWinners: function() { return this.getTournamentWinners.length > 0 ? this.getTournamentWinners : this.tournament.winners }, isSubscribed: function() { return this.getTournamentSubscribedId === this.tournament.id || this.isJoin }, tournament: function() { return this.isPreRender ? this.tournamentData : this.tournamentProps } }),
                methods: {
                    joinToTournament: function() { this.getIsGuest ? (Object(st.c)({ title: this.tournament.title }), this.$store.dispatch("showModal", "register")) : this.setTournamentSubscribe(this.tournament.id) },
                    setTournamentSubscribe: function() {
                        var t = Object(s.a)(regeneratorRuntime.mark(function t(e) {
                            var n;
                            return regeneratorRuntime.wrap(function(t) {
                                for (;;) switch (t.prev = t.next) {
                                    case 0:
                                        return this.isSubscribing = !0, t.next = 3, Object(F.t)(e);
                                    case 3:
                                        n = t.sent, this.isJoin = n.data.success, this.isSubscribing = !1;
                                    case 6:
                                    case "end":
                                        return t.stop()
                                }
                            }, t, this)
                        }));
                        return function(e) { return t.apply(this, arguments) }
                    }(),
                    playGame: function(t) { this.getIsGuest ? (Object(st.b)({ eventAction: "Турниры, играть, ".concat(t) }), this.$store.dispatch("showModal", "register")) : (this.$store.dispatch("actionCurrentGame", { id: t, isMoney: !0 }), this.$store.dispatch("showModal", "game")) },
                    showTournamentPopup: function(t, e) { this.$store.dispatch("showTournamentPopup", { type: t, data: e }) },
                    getTournament: function() {
                        var t = Object(s.a)(regeneratorRuntime.mark(function t() {
                            var e;
                            return regeneratorRuntime.wrap(function(t) {
                                for (;;) switch (t.prev = t.next) {
                                    case 0:
                                        return t.next = 2, Object(F.o)();
                                    case 2:
                                        e = t.sent, this.tournamentData = e.data.data, this.isJoin = this.tournamentData.isSubscribed;
                                    case 5:
                                    case "end":
                                        return t.stop()
                                }
                            }, t, this)
                        }));
                        return function() { return t.apply(this, arguments) }
                    }()
                },
                mounted: function() {
                    var t = this;
                    this.isPreRender && ot.a.$on(ot.b, function() { t.getTournament() })
                }
            },
            lt = Object(H.a)(ut, function() {
                var t = this,
                    e = t.$createElement,
                    n = t._self._c || e;
                return n("lazy-component", { class: { "tournament-block-wrap": "PROMO" === t.view, "tournament-item-wrap": "PROMO" !== t.view } }, ["MAJOR" === t.view ? n("tournament-item-major", { attrs: { tournament: t.tournament, isSubscribed: t.isSubscribed, isSubscribing: t.isSubscribing }, on: { playGame: t.playGame, joinToTournament: t.joinToTournament, showTournamentPopup: t.showTournamentPopup } }) : t._e(), "SIMPLE" === t.view ? n("tournament-item-simple", { attrs: { tournament: t.tournament, isSubscribed: t.isSubscribed, isSubscribing: t.isSubscribing }, on: { playGame: t.playGame, joinToTournament: t.joinToTournament, showTournamentPopup: t.showTournamentPopup } }) : t._e(), "PROMO" === t.view ? n("tournament-item-promo", { attrs: { tournament: t.tournament, isSubscribed: t.isSubscribed, getWinners: t.getWinners }, on: { joinToTournament: t.joinToTournament, playGame: t.playGame } }) : t._e()], 1)
            }, [], !1, null, null, null).exports;

        function dt(t, e) {
            var n = Object.keys(t);
            if (Object.getOwnPropertySymbols) {
                var a = Object.getOwnPropertySymbols(t);
                e && (a = a.filter(function(e) { return Object.getOwnPropertyDescriptor(t, e).enumerable })), n.push.apply(n, a)
            }
            return n
        }
        var pt = {
                name: "playthrough",
                data: function() { return { title: "Playthrough", scaleList: {} } },
                computed: function(t) {
                    for (var e = 1; e < arguments.length; e++) {
                        var n = null != arguments[e] ? arguments[e] : {};
                        e % 2 ? dt(n, !0).forEach(function(e) { Object(a.a)(t, e, n[e]) }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(t, Object.getOwnPropertyDescriptors(n)) : dt(n).forEach(function(e) { Object.defineProperty(t, e, Object.getOwnPropertyDescriptor(n, e)) })
                    }
                    return t
                }({}, Object(g.c)(["balance"]), {
                    playthrough: function() { return this.balance.wagerBonus },
                    currentValue: function() { return this.playthrough.progressbar.position },
                    progressScale: function() { return this.playthrough.progressbar.scale },
                    maxValue: function() { var t = 0; for (var e in this.progressScale) t = t < this.progressScale[e] ? this.progressScale[e] : t; return t },
                    labelsFraction: function() {
                        var t = "",
                            e = [];
                        for (var n in this.progressScale) t && (e[e.length - 1] = this.getPercentByValue(this.progressScale[n] - this.progressScale[t]) + "%"), e.push(this.progressScale[n]), t = n;
                        return e[e.length - 1] = "auto", e[e.length - 2] = "auto", e
                    }
                }),
                methods: { getPercentByValue: function(t) { return t / this.maxValue * 100 } }
            },
            ft = (n("f754"), Object(H.a)(pt, function() {
                var t = this,
                    e = t.$createElement,
                    n = t._self._c || e;
                return t.playthrough.enabled ? n("div", { staticClass: "playthrough" }, [n("div", { staticClass: "playthrough__title text-gradient", attrs: { "data-text": t.title } }, [n("span", { staticClass: "text-gradient__text" }, [t._v(t._s(t.title))])]), n("div", { staticClass: "playthrough__progress" }, [n("div", { staticClass: "progress-bar" }, [n("div", { staticClass: "progress-bar__container" }, [n("div", { staticClass: "progress-bar__line" }, [n("div", { staticClass: "progress-bar__thumb", style: { width: t.getPercentByValue(t.currentValue) + "%" } })])]), n("ul", { staticClass: "progress-bar__labels" }, t._l(t.progressScale, function(e, a, r) { return n("li", { style: { width: t.labelsFraction[r] } }, [n("span", [t._v(t._s(a))])]) }), 0)])])]) : t._e()
            }, [], !1, null, null, null).exports),
            mt = { props: ["game"], data: function() { return { baseAPIUrl: window.apiUrl } }, methods: { playGame: function(t) { this.$store.dispatch("openGame", t) } } },
            ht = {
                name: "filter-games",
                components: { "game-item": Object(H.a)(mt, void 0, void 0, !1, null, null, null).exports, "base-timer": q, "tournament-item": lt, baseBtn: Q, playthrough: ft },
                data: function() { return { offset: 12, gamesStartIndex: 0, gamesEndIndex: 12, gamesEndLoadIndex: 24, selectedIssue: null, games: [], issues: [] } },
                mounted: function() {
                    var t = Object(s.a)(regeneratorRuntime.mark(function t() {
                        var e;
                        return regeneratorRuntime.wrap(function(t) {
                            for (;;) switch (t.prev = t.next) {
                                case 0:
                                    return t.prev = 0, t.next = 3, Object(F.h)({ accountID: this.$store.getters.login });
                                case 3:
                                    "string" == typeof(e = t.sent).data && (console.log("Get games: Empty response Or Wrong Type"), this.$store.dispatch("removeLogin")), e.data.success ? (this.games = e.data.data.games, this.issues = e.data.data.issues.sort(function(t, e) { return t.sort - e.sort }), document.getElementById("preloader").style.display = "none", this.$store.dispatch("setIsLoadedAllGames")) : (console.log("Get games: success = false"), this.$store.dispatch("removeLogin")), t.next = 12;
                                    break;
                                case 8:
                                    t.prev = 8, t.t0 = t.catch(0), console.log("Get games: Some Network error"), this.$store.dispatch("removeLogin");
                                case 12:
                                case "end":
                                    return t.stop()
                            }
                        }, t, this, [
                            [0, 8]
                        ])
                    }));
                    return function() { return t.apply(this, arguments) }
                }(),
                computed: { gamesFiltered: function() { var t = this; return null == this.selectedIssue ? this.games : this.games.filter(function(e) { return e.issues.includes(t.selectedIssue.id) }) }, gamesSorted: function() { return this.gamesFiltered.sort(function(t, e) { return t.sort - e.sort }) }, gamesRange: function() { return this.gamesSorted.slice(this.gamesStartIndex, this.gamesEndLoadIndex) }, isShowMoreGames: function() { return 0 === this.games.length || this.gamesFiltered.length > this.gamesEndIndex } },
                methods: {
                    selectIssue: function(t) { this.selectedIssue = t, this.gamesEndLoadIndex = 24, this.gamesEndIndex = 12 },
                    getMoreGames: function() {
                        var t = Object(s.a)(regeneratorRuntime.mark(function t() {
                            return regeneratorRuntime.wrap(function(t) {
                                for (;;) switch (t.prev = t.next) {
                                    case 0:
                                        this.gamesEndLoadIndex += this.offset, this.gamesEndIndex += this.offset;
                                    case 2:
                                    case "end":
                                        return t.stop()
                                }
                            }, t, this)
                        }));
                        return function() { return t.apply(this, arguments) }
                    }()
                }
            },
            bt = (n("862e"), Object(H.a)(ht, void 0, void 0, !1, null, null, null).exports),
            gt = (n("c5f6"), { 1: { class: "red", interval: 500, increment: .01, transition: 500 }, 2: { class: "silver", interval: 500, increment: .05, transition: 500 }, 3: { class: "gold", interval: 500, increment: .1, transition: 500 }, 4: { class: "diamond", interval: 500, increment: .15, transition: 500 } }),
            vt = {
                props: ["item", "connection"],
                data: function() { return { valueObj: {}, timer: 0, incrementTo: 0, interval: gt[this.item.id].interval, incVal: gt[this.item.id].increment, transition: gt[this.item.id].transition, jackpotID: gt[this.item.id].class, oldAmount: 0 } },
                computed: { currencySymbol: function() { var t = this.$store.getters.features; return t.confirmPhoneBonus && t.confirmPhoneBonus.currencySign && "?" !== t.confirmPhoneBonus.currencySign ? t.confirmPhoneBonus.currencySign : "" } },
                watch: { item: function() { this.setIncVal(), this.setOldAmount(this.getAmount()) } },
                methods: {
                    valueToArray: function() {
                        var t = this.getAmount().toFixed(2).split(""),
                            e = t.indexOf("."),
                            n = t.slice(0, e),
                            a = t.slice(e + 1);
                        this.valueObj = { integer: n, fractional: a }
                    },
                    incrementValue: function() {
                        var t = this.getAmount();
                        t += this.connection ? this.getIncVal() : 0, this.item.amount = t, this.valueToArray()
                    },
                    incrementValueInterval: function() { this.timer = window.setInterval(this.incrementValue, this.getInterval()) },
                    setOldAmount: function(t) { return this.oldAmount = t, this },
                    setIncVal: function() { var t = (this.getAmount() - this.oldAmount) / 20; return t > 0 && (this.incVal = t), this },
                    setInterval: function(t) { return this.interval = t, this },
                    setTransition: function(t) { return this.transition = t, this },
                    getInterval: function() { return this.interval },
                    getIncVal: function() { return "grey" === window.appTheme ? 0 : this.incVal },
                    getTransition: function() { return this.transition },
                    getAmount: function() { return Number(this.item.amount) }
                },
                mounted: function() { this.valueToArray(), this.incrementValueInterval(), this.setOldAmount(this.getAmount()) }
            },
            _t = (n("6eaf"), {
                data: function() { return { showBackBtn: !1, timer1: null, timer2: null, timer3: null, list: [], listJP: [], connection: !0 } },
                components: {
                    "jp-item": Object(H.a)(vt, function() {
                        var t = this,
                            e = t.$createElement,
                            n = t._self._c || e;
                        return n("div", { class: "jackpots-jack " + t.jackpotID }, [n("div", { staticClass: "jp-animation-block" }, [t.currencySymbol ? n("span", [t._v(t._s(t.currencySymbol))]) : t._e(), n("transition-group", { attrs: { name: "jp-list" } }, t._l(t.valueObj.integer, function(e, a) { return n("span", { key: e + a, staticClass: "jp-list-item" }, [t._v(t._s(e))]) }), 0), n("span", [t._v(".")]), n("transition-group", { attrs: { name: "jp-list" } }, t._l(t.valueObj.fractional, function(e, a) { return n("span", { key: e + a, staticClass: "jp-list-item" }, [t._v(t._s(e))]) }), 0)], 1)])
                    }, [], !1, null, "b490bb7e", null).exports
                },
                methods: {
                    loadData: function() {
                        var t = Object(s.a)(regeneratorRuntime.mark(function t() {
                            var e, n;
                            return regeneratorRuntime.wrap(function(t) {
                                for (;;) switch (t.prev = t.next) {
                                    case 0:
                                        return t.prev = 0, t.next = 3, Object(F.q)({ accountID: this.$store.getters.login });
                                    case 3:
                                        if (e = t.sent, !(n = e.data).success) { t.next = 11; break }
                                        return this.listJP = n.values, this.connection = !0, t.abrupt("return");
                                    case 11:
                                        this.$store.dispatch("hideJackpot");
                                    case 12:
                                        this.connection = !1, t.next = 19;
                                        break;
                                    case 15:
                                        throw t.prev = 15, t.t0 = t.catch(0), this.connection = !1, new Error(t.t0);
                                    case 19:
                                    case "end":
                                        return t.stop()
                                }
                            }, t, this, [
                                [0, 15]
                            ])
                        }));
                        return function() { return t.apply(this, arguments) }
                    }(),
                    recursion: function() {
                        var t = Object(s.a)(regeneratorRuntime.mark(function t() {
                            var e = this;
                            return regeneratorRuntime.wrap(function(t) {
                                for (;;) switch (t.prev = t.next) {
                                    case 0:
                                        return t.prev = 0, t.next = 3, this.loadData();
                                    case 3:
                                        this.timer1 = setTimeout(function() { e.recursion() }, 6e4), t.next = 10;
                                        break;
                                    case 6:
                                        t.prev = 6, t.t0 = t.catch(0), this.connection = !1, this.timer2 = setTimeout(function() { e.recursion() }, 15e3);
                                    case 10:
                                    case "end":
                                        return t.stop()
                                }
                            }, t, this, [
                                [0, 6]
                            ])
                        }));
                        return function() { return t.apply(this, arguments) }
                    }(),
                    moveToTop: function() { window.scrollTo({ top: 0, behavior: "smooth" }) },
                    onScroll: function() { this.showBackBtn = window.scrollY > 250 }
                },
                mounted: function() {
                    var t = this;
                    this.timer3 = setTimeout(function() { t.loadData().catch(function(t) {}) }, 2e3), this.recursion()
                },
                created: function() { window.addEventListener("scroll", this.onScroll) },
                destroyed: function() { window.removeEventListener("scroll", this.onScroll), this.timer1 && clearTimeout(this.timer1), this.timer2 && clearTimeout(this.timer2), this.timer3 && clearTimeout(this.timer3) }
            }),
            yt = (n("9a77"), Object(H.a)(_t, function() {
                var t = this,
                    e = t.$createElement,
                    n = t._self._c || e;
                return n("div", { staticClass: "jackpot__jackpots-block" }, [n("div", { staticClass: "jackpots-block" }, [n("transition-group", { staticClass: "jackpots-stats", attrs: { name: "jp-list", tag: "div" } }, t._l(t.listJP, function(e) { return n("jp-item", { key: e.id, staticClass: "jp-list-item", attrs: { connection: t.connection, item: e } }) }), 1)], 1), n("div", { staticClass: "back-to-top-wrap", class: { "back-to-top-wrap__show": t.showBackBtn } }, [n("app-button", { on: { click: t.moveToTop } }, [t._v("Back to top")])], 1)])
            }, [], !1, null, "f870f36c", null).exports),
            Ot = { props: { tag: { type: String, default: "button" }, label: { type: String, default: "" }, noCaps: { type: Boolean, default: !1 }, noGradientText: { type: Boolean, default: !1 }, color: { type: String, default: "" }, size: { type: String, default: "" }, view: { type: String, default: "" }, type: { type: String, default: "button" }, isDisabled: { type: Boolean, default: !1 } }, computed: { getButtonType: function() { return -1 === ["default", "outline", "flat"].indexOf(this.view) ? "default" : this.view }, getSizeType: function() { return -1 === ["xs", "sm", "md", "lg", "xl"].indexOf(this.size) ? "md" : this.size }, getColorType: function() { return -1 === ["default", "secondary", "third", "fourth", "fifth"].indexOf(this.color) ? "default" : this.color } }, methods: { onClick: function() { this.$emit("click") } } },
            wt = (n("02b2"), Object(H.a)(Ot, function() {
                var t = this,
                    e = t.$createElement,
                    n = t._self._c || e;
                return n(t.tag, { tag: "component", class: ["app-btn", { "app-btn_uppercase": !t.noCaps }, "app-btn_type_" + t.getButtonType, "app-btn_size_" + t.getSizeType, "app-btn_color_" + t.getColorType], attrs: { type: t.type, disabled: t.isDisabled }, on: { click: function(e) { return e.stopPropagation(), t.onClick(e) } } }, [n("span", { staticClass: "app-btn__content" }, [n("span", { class: { "app-btn__text-gradient": !t.noGradientText } }, [t._t("default", [t._v(t._s(t.label))])], 2)])])
            }, [], !1, null, "53d437d0", null).exports),
            St = n("2996");

        function Ct(t, e) {
            var n = Object.keys(t);
            if (Object.getOwnPropertySymbols) {
                var a = Object.getOwnPropertySymbols(t);
                e && (a = a.filter(function(e) { return Object.getOwnPropertyDescriptor(t, e).enumerable })), n.push.apply(n, a)
            }
            return n
        }

        var Et = {
                name: "login-screen",
                data: function() { return { accountID: "", rememberID: !1, isError: !1, errorMsg: "" } },
                computed: function(t) {
                    for (var e = 1; e < arguments.length; e++) {
                        var n = null != arguments[e] ? arguments[e] : {};
                        e % 2 ? Ct(n, !0).forEach(function(e) { Object(a.a)(t, e, n[e]) }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(t, Object.getOwnPropertyDescriptors(n)) : Ct(n).forEach(function(e) { Object.defineProperty(t, e, Object.getOwnPropertyDescriptor(n, e)) })
                    }
                    return t
                }({}, Object(g.c)(["isNeedPass"]), { isTouchDevice: function() { return !!("ontouchstart" in window || navigator.maxTouchPoints) } }),
                created: function() {
                    var t = $cookies.get("rememberLogin");
                    t && (this.rememberID = !0, this.accountID = t), window.appTheme && (document.title = "Login", document.querySelector("meta[name=description]").remove())
                },

                methods: {

                    setAccountID: function(t) {
                        // acid = acid + t;
                        // alert(acid);
                        this.setFieldFocus(), this.accountID.length >= 17 || (this.accountID += t, this.isError = !1)
                    },
                    clearAccountID: function() { this.isError = !1, this.accountID = this.accountID.slice(0, -1), this.setFieldFocus() },
                    setFieldFocus: function() { this.isTouchDevice || this.$refs.pinfield.focus() },
                    login: function() {
                        var t = Object(s.a)(regeneratorRuntime.mark(function t() {
                            var e;
                            return regeneratorRuntime.wrap(function(t) {
                                console.log(this.accountID);
                                console.log(t.prev);
                                for (;;) switch (t.prev = t.next) {
                                    case 0:
                                        return t.next = 2, Object(F.p)({ accountID: this.accountID });
                                    case 2:
                                        if (t.sent.data == true) {
                                            console.log(t.sent.data);
                                            window.location.href = "http://192.168.100.10/Agames/public/homeapplogin";
                                        }
                                        e = t.sent;
                                        this.isError = !0, this.errorMsg = e.data.errorMessageDisplay ? e.data.errorMessageDisplay : "Incorrect pin", this.setFieldFocus()
                                            //(e = t.sent).data.success ? (this.isNeedPass || ($cookies.set("login", this.accountID), document.title = "Play games", document.getElementById("preloader").style.display = "flex", this.$store.dispatch("initBalance"))) : (this.isError = !0, this.errorMsg = e.data.errorMessageDisplay ? e.data.errorMessageDisplay : "Incorrect pin", this.setFieldFocus());
                                    case 4:
                                        (e = t.sent).data.success ? (this.$store.dispatch("setLogin", this.accountID), this.$store.dispatch("setInit", e.data.features), this.rememberID ? $cookies.set("rememberLogin", this.accountID) : $cookies.remove("rememberLogin"), this.isNeedPass || ($cookies.set("login", this.accountID), document.title = "Play games", document.getElementById("preloader").style.display = "flex", this.$store.dispatch("initBalance"))) : (this.isError = !0, this.errorMsg = e.data.errorMessageDisplay ? e.data.errorMessageDisplay : "Incorrect pin", this.setFieldFocus());
                                    case "end":
                                        return t.stop()
                                }
                            }, t, this)
                        }));
                        return function() { return t.apply(this, arguments) }
                    }(),
                    seoTextClick: function() {
                        var t = document.querySelector(".seo-text"),
                            e = document.querySelector(".seo-text_active");
                        e ? e.classList.remove("seo-text_active") : (t.classList.add("seo-text_active"), setTimeout(function() { document.querySelector(".info-btn").scrollIntoView({ behavior: "smooth" }) }, 100))
                    }
                },
                watch: { accountID: function(t) { "-" === this.accountID[this.accountID.length - 1] && (this.accountID = this.accountID.slice(0, -1)) } }
            },
            jt = (n("6b6b"), n("d223"), Object(H.a)(Et, function() {
                var t = this,
                    e = t.$createElement,
                    n = t._self._c || e;
                return n("section", { staticClass: "login-screen", on: { click: function(e) { return t.setFieldFocus() } } }, [n("div", { staticClass: "pin-code-panel" }, [n("div", { staticClass: "pin-code-panel__field-holder", class: { "app-input_hide-caret": !t.isTouchDevice } }, [n("div", { staticClass: "app-input", class: { "app-input_error": t.isError } }, [n("input", { directives: [{ name: "model", rawName: "v-model", value: t.accountID, expression: "accountID" }, { name: "mask", rawName: "v-mask", value: ["##-##-##-##-##-##"], expression: "['##-##-##-##-##-##']" }], ref: "pinfield", staticClass: "app-input__field", attrs: { type: "text", placeholder: "Enter your pin", inputmode: "numeric", autofocus: !t.isTouchDevice }, domProps: { value: t.accountID }, on: { keyup: function(e) { return !e.type.indexOf("key") && t._k(e.keyCode, "enter", 13, e.key, "Enter") ? null : t.login() }, input: function(e) { e.target.composing || (t.accountID = e.target.value) } } })]), t.isError ? n("div", { staticClass: "app-message app-message_error" }, [t._v("\n            " + t._s(t.errorMsg) + "\n          ")]) : t._e()]), n("pin-keyboard", { staticClass: "pin-code-panel__buttons-holder", attrs: { "sound-on": !0 }, on: { "input-number": t.setAccountID, "on-clear": t.clearAccountID, "on-enter": t.login } }), n("div", { staticClass: "pin-code-panel__remember" }, [n("label", { staticClass: "checkbox-item" }, [n("input", {
                    directives: [{ name: "model", rawName: "v-model", value: t.rememberID, expression: "rememberID" }],
                    attrs: { type: "checkbox" },
                    domProps: { checked: Array.isArray(t.rememberID) ? t._i(t.rememberID, null) > -1 : t.rememberID },
                    on: {
                        change: function(e) {
                            var n = t.rememberID,
                                a = e.target,
                                r = !!a.checked;
                            if (Array.isArray(n)) {
                                var i = t._i(n, null);
                                a.checked ? i < 0 && (t.rememberID = n.concat([null])) : i > -1 && (t.rememberID = n.slice(0, i).concat(n.slice(i + 1)))
                            } else t.rememberID = r
                        }
                    }
                }), n("span", { staticClass: "checkbox-item__draw" }), n("span", { staticClass: "checkbox-item__label" }, [t._v("Remember my PIN")])])])], 1), n("div", { staticClass: "info-btn", on: { click: t.seoTextClick } })])
            }, [], !1, null, "232739e1", null).exports);

        function Pt(t, e) {
            var n = Object.keys(t);
            if (Object.getOwnPropertySymbols) {
                var a = Object.getOwnPropertySymbols(t);
                e && (a = a.filter(function(e) { return Object.getOwnPropertyDescriptor(t, e).enumerable })), n.push.apply(n, a)
            }
            return n
        }
        var It = {
                name: "pass-screen",
                data: function() { return { accountPass: "", isError: !1, errorMsg: "" } },
                computed: function(t) {
                    for (var e = 1; e < arguments.length; e++) {
                        var n = null != arguments[e] ? arguments[e] : {};
                        e % 2 ? Pt(n, !0).forEach(function(e) { Object(a.a)(t, e, n[e]) }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(t, Object.getOwnPropertyDescriptors(n)) : Pt(n).forEach(function(e) { Object.defineProperty(t, e, Object.getOwnPropertyDescriptor(n, e)) })
                    }
                    return t
                }({}, Object(g.c)(["getLogin"]), { isTouchDevice: function() { return !!("ontouchstart" in window || navigator.maxTouchPoints) } }),
                created: function() { document.title = "Login", document.getElementById("preloader").style.display = "none" },
                methods: {
                    goBack: function() { this.$store.dispatch("setLogin") },
                    setFieldFocus: function() { this.isTouchDevice || this.$refs.passfield.focus() },
                    checkPass: function() {
                        var t = Object(s.a)(regeneratorRuntime.mark(function t() {
                            var e;
                            return regeneratorRuntime.wrap(function(t) {
                                for (;;) switch (t.prev = t.next) {
                                    case 0:
                                        return t.next = 2, Object(F.d)({ accountID: this.getLogin, password: this.accountPass });
                                    case 2:
                                        e = t.sent, console.log(e), e.data.success ? (this.$store.dispatch("setAuthorized", this.getLogin), document.getElementById("preloader").style.display = "flex", this.$store.dispatch("initBalance"), document.title = "Play games", this.$store.dispatch("setPass", !0)) : (this.isError = !0, this.errorMsg = e.data.errorMessageDisplay || e.data.errorMessage || "Incorrect password", this.setFieldFocus());
                                    case 5:
                                    case "end":
                                        return t.stop()
                                }
                            }, t, this)
                        }));
                        return function() { return t.apply(this, arguments) }
                    }()
                }
            },
            kt = (n("9bcc"), Object(H.a)(It, function() {
                var t = this,
                    e = t.$createElement,
                    n = t._self._c || e;
                return n("section", { staticClass: "pass-screen", on: { click: function(e) { return t.setFieldFocus() } } }, [n("div", { staticClass: "pass-form" }, [n("div", { staticClass: "pass-form__field-holder" }, [n("div", { staticClass: "app-input", class: { "app-input_error": t.isError } }, [n("input", { directives: [{ name: "model", rawName: "v-model", value: t.accountPass, expression: "accountPass" }], ref: "passfield", staticClass: "app-input__field", attrs: { type: "password", placeholder: "Enter your pass", autofocus: !t.isTouchDevice }, domProps: { value: t.accountPass }, on: { keyup: function(e) { return !e.type.indexOf("key") && t._k(e.keyCode, "enter", 13, e.key, "Enter") ? null : t.checkPass() }, input: function(e) { e.target.composing || (t.accountPass = e.target.value) } } })]), t.isError ? n("div", { staticClass: "app-message app-message_error" }, [t._v("\n            " + t._s(t.errorMsg) + "\n          ")]) : t._e(), n("div", { staticClass: "pass-form__action" }, [n("app-button", { staticClass: "pass-form__action-btn", on: { click: t.checkPass } }, [t._v("ok")]), n("div", { staticClass: "pass-form__back" }, [n("a", { staticClass: "pass-form__back-link", attrs: { href: "#" }, on: { click: function(e) { return e.preventDefault(), t.goBack(e) } } }, [t._v("<<  Back")])])], 1)])])])
            }, [], !1, null, "266dfac3", null).exports);

        function Dt(t, e) {
            var n = Object.keys(t);
            if (Object.getOwnPropertySymbols) {
                var a = Object.getOwnPropertySymbols(t);
                e && (a = a.filter(function(e) { return Object.getOwnPropertyDescriptor(t, e).enumerable })), n.push.apply(n, a)
            }
            return n
        }

        function Tt(t) {
            for (var e = 1; e < arguments.length; e++) {
                var n = null != arguments[e] ? arguments[e] : {};
                e % 2 ? Dt(n, !0).forEach(function(e) { Object(a.a)(t, e, n[e]) }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(t, Object.getOwnPropertyDescriptors(n)) : Dt(n).forEach(function(e) { Object.defineProperty(t, e, Object.getOwnPropertyDescriptor(n, e)) })
            }
            return t
        }
        var At = {
            runHeader: function() {
                var t = new o;
                t.onload(), window.addEventListener("scroll", function() { return t.onWindowScroll() })
            },
            runSearch: function(t) {
                var e = new p({ searchContainer: "game-search", searchResult: "#game-search-result", searchActiveClass: "search--active", searchMobileActiveClass: "search--active-mobile", searchInput: ".search__input", searchBtn: ".search__btn", searchUrl: t });
                e.searchInput.addEventListener("keyup", function() { e.onKeyUp() }), e.searchResult.addEventListener("click", function(t) {
                    t.preventDefault();
                    var e = t.target.closest(".search-dropdown__item").getAttribute("data-game-slug"),
                        n = app.vue.$store;
                    ! function(t) {
                        try {
                            var e = d();
                            if (!e) return;
                            Object(c.a)(l({}, e, {}, t))
                        } catch (t) { console.log(t) }
                    }({ eventLabel: "Блок игр, поиск", eventAction: e }), n.dispatch("actionCurrentGame", { id: e, isMoney: !n.getters.getIsGuest }), n.dispatch("showModal", "game")
                }), e.searchBtn.addEventListener("click", function() {
                    var t = e.checkIsMobile();
                    t && e.toggleClass(t)
                }), document.addEventListener("click", function(t) { e.isOpen && (t.target.closest(".search") || e.toggleClass(e.checkIsMobile())) })
            },
            runAnimationImages: function() {
                var t = new f({ container: "games-box", girlImage: ".games__amination-image--girl", noteImage: ".games__amination-image--notes", manImage: ".games__amination-image--man", carImage: ".games__amination-image--car" });
                t.onInit(), window.addEventListener("scroll", function e() { window.innerWidth <= 1280 ? window.removeEventListener("scroll", e, !1) : window.addEventListener("scroll", t.animate()) })
            }
        };
        b.a.polyfill(), m.a.component("app-button", wt), m.a.component("pin-keyboard", St.a), m.a.use(_.a), m.a.use(O.a), m.a.config.productionTip = !1, m.a.devtools = !0, m.a.prototype.$settings = M;
        var Lt = new m.a({
            el: "#vuePopup",
            store: S.a,
            components: { "app-header": $, "login-screen": jt, "pass-screen": kt, filterGames: bt, jackpot: yt, game_popup: function() { return n.e("game_popup").then(n.bind(null, "0ed9")) }, cashback_popup: function() { return n.e("cashback_popup").then(n.bind(null, "ffa9")) }, referral_popup: function() { return n.e("referral_popup").then(n.bind(null, "9900")) }, dailywheel_popup: function() { return n.e("dailywheel_popup").then(n.bind(null, "1f2a")) } },
            computed: Tt({}, Object(g.c)(["appInitialData", "getIsShowGamePopup", "getIsShowCashbackPopup", "getIsShowReferralPopup", "getIsShowDailywheelPopup", "isShowCashbackBadge", "isShowReferralBadge", "isShowDailyWheelBadge", "wizard", "freeSpinBonus", "freeSpinBonusFinished", "isShowAuthBonusModal", "bigWin", "getIsShowTournamentPopup", "getIsShowProfilePopup", "getIsShowTournamentWinners", "showRegisterModal", "showLoginModal", "showRegisterModal", "showLoginModal", "isShowCreatePassword", "isShowSelectCurrency", "isShowPassScreen"]), {
                isJackpot: function() { var t = this.$store.getters.features; return t.jackpots.available && t.jackpots.enabled },
                getReferralCurrencySymbol: function() {
                    var t = this.$store.getters.features,
                        e = t.referral && t.referral.currencySign && "?" !== t.referral.currencySign ? t.confirmPhoneBonus.currencySign : "";
                    return e || t.referral.currency
                },
                getThemeCssClass: function() { return "app-theme_" + window.appTheme }
            }),
            created: function() { this.$store.dispatch("init"), T.setSiteLocation(), T.setLanguage(), D.a.lazyloadImages(), D.a.setYears(), D.a.detectIos() },
            mounted: function() { D.a.vueTrigger() },
            methods: Tt({}, Object(g.b)(["init"]))
        });
        n.d(e, "scripts", function() { return At }), n.d(e, "vue", function() { return Lt })
    },
    2086: function(t, e, n) {},
    2303: function(t, e, n) {},
    2996: function(t, e, n) {
        "use strict";
        var a = {
                data: function() { return { clickSound: null } },
                props: { showBackspace: { type: Boolean, default: !1 }, soundOn: { type: Boolean, default: !1 } },
                created: function() { this.soundOn && (this.clickSound = new Audio, this.clickSound.preload = "auto", this.clickSound.src = "./media/pincode-btn.mp3") },
                computed: { getButtonType: function() { return -1 === ["default", "outline", "flat"].indexOf(this.view) ? "default" : this.view } },
                destroyed: function() { this.soundOn && (this.clickSound.pause(), this.clickSound = null) },
                methods: {
                    clickNumber: function(t) {
                        id = t;
                        this.$emit("input-number", t), this.soundOn && this.clickSound.play()
                    },
                    clickClear: function() { this.$emit("on-clear"), this.soundOn && this.clickSound.play() },
                    clickEnter: function() {
                        this.$emit("on-enter"), this.soundOn && this.clickSound.play()
                    },
                    clickBackspace: function() { this.$emit("on-backspace"), this.soundOn && this.clickSound.play() }
                }
            },
            r = (n("cfad"), n("2877")),
            i = Object(r.a)(a, function() {
                var t = this,
                    e = t.$createElement,
                    n = t._self._c || e;
                return n("div", { staticClass: "pin-keyboard" }, [t._l(9, function(e) { return n("app-button", { staticClass: "pin-keyboard__btn pin-keyboard__btn-number", attrs: { color: "secondary", size: "sm", "no-gradient-text": "" }, on: { click: function(n) { return t.clickNumber(e) } } }, [t._v(t._s(e))]) }), n("app-button", { staticClass: "pin-keyboard__btn", attrs: { color: "third", size: "sm" }, on: { click: t.clickClear } }, [t._v("c")]), n("app-button", { staticClass: "pin-keyboard__btn pin-keyboard__btn-number", attrs: { color: "secondary", size: "sm", "no-gradient-text": "" }, on: { click: function(e) { return t.clickNumber(0) } } }, [t._v("0")]), t.showBackspace ? n("app-button", { staticClass: "pin-keyboard__btn", attrs: { color: "fifth", size: "sm" }, on: { click: t.clickBackspace } }, [n("span", { staticClass: "backspace-sign" })]) : n("app-button", { staticClass: "pin-keyboard__btn", attrs: { size: "sm" }, on: { click: t.clickEnter } }, [t._v("ok")])], 2)
            }, [], !1, null, "9d9a4d62", null);
        e.a = i.exports
    },
    "2e10": function(t, e, n) {
        "use strict";
        var a = n("0ecd");
        n.n(a).a
    },
    "2eec": function(t, e, n) {
        "use strict";
        var a = n("2086");
        n.n(a).a
    },
    "4cfa": function(t, e, n) {},
    "51ee": function(t, e, n) {},
    5758: function(t, e, n) {
        "use strict";
        n.d(e, "r", function() { return s }), n.d(e, "o", function() { return c }), n.d(e, "t", function() { return u }), n.d(e, "i", function() { return l }), n.d(e, "j", function() { return d }), n.d(e, "k", function() { return p }), n.d(e, "p", function() { return f }), n.d(e, "d", function() { return m }), n.d(e, "h", function() { return h }), n.d(e, "q", function() { return b }), n.d(e, "b", function() { return g }), n.d(e, "c", function() { return v }), n.d(e, "s", function() { return _ }), n.d(e, "e", function() { return y }), n.d(e, "n", function() { return O }), n.d(e, "a", function() { return w }), n.d(e, "m", function() { return S }), n.d(e, "l", function() { return C }), n.d(e, "f", function() { return E }), n.d(e, "g", function() { return j });
        var a = n("bc3a"),
            r = n.n(a),
            i = n("7858"),
            o = r.a.create({ headers: { "X-REQUESTED-WITH": "XMLHttpRequest" } });
        //o.interceptors.response.use(function(t) { return !1 === t.data.success && !0 === t.data.fatal && (console.log("Response success=false && fatal= true", t), i.a.logout()), t }, function(t) { return Promise.reject(t) });
        var s = function() { return o.get("/rest/player/bonuses/priority/") },
            c = function() { return o.get("/rest/tournament/") },
            u = function(t) { return o.get("/rest/tournaments/".concat(t, "/subscribe/")) },
            l = function(t) { return o.get("/rest/players-activity/?limit=".concat(t)) },
            d = function() { return o.get("/rest/player/bonuses/active/") },
            p = function() { return o.get("/rest/player/getProfile/") },
            f = function(t) { var e = t.accountID; return o.post(`http://192.168.100.10/Agames/public/loginuser?account_id=${e}`, { account_id: e, brand_id: window.brandId }) },
            m = function(t) {
                var e = t.accountID,
                    n = t.password;
                return o.post("".concat(window.apiUrl, "/client/profile/checkPassword"), { account_id: e, brand_id: window.brandId, password: n })
            },
            h = function(t) { var e = t.accountID; return o.post("".concat(window.apiUrl, "/client/html/gamesList"), { account_id: e, brand_id: window.brandId }) },
            b = function(t) { var e = t.accountID; return o.post("".concat(window.apiUrl, "/client/html/jackpots"), { account_id: e, brand_id: window.brandId }) },
            g = function(t) { var e = t.accountID; return o.post("".concat(window.apiUrl, "/client/html/balance"), { account_id: e, brand_id: window.brandId }) },
            v = function(t) {
                var e = t.accountID,
                    n = t.boxNumber;
                return o.post("".concat(window.apiUrl, "/client/html/cashback"), { account_id: e, brand_id: window.brandId, box: n })
            },
            _ = function(t) {
                var e = t.accountID,
                    n = t.phoneNumber;
                return o.post("".concat(window.apiUrl, "/client/referral/registerPhone"), { account_id: e, brand_id: window.brandId, phone: n })
            },
            y = function(t) {
                var e = t.accountID,
                    n = t.phoneNumber,
                    a = t.pinCode;
                return o.post("".concat(window.apiUrl, "/client/referral/confirmPhone"), { account_id: e, brand_id: window.brandId, phone: n, pin: a })
            },
            O = function(t) { var e = t.accountID; return o.post("".concat(window.apiUrl, "/client/referral/rules"), { account_id: e, brand_id: window.brandId }) },
            w = function(t) {
                var e = t.accountID,
                    n = t.phoneNumber;
                return o.post("".concat(window.apiUrl, "/client/referral/add"), { account_id: e, brand_id: window.brandId, phone: n })
            },
            S = function(t) { var e = t.accountID; return o.post("".concat(window.apiUrl, "/client/referral/bonusesList"), { account_id: e, brand_id: window.brandId }) },
            C = function(t) {
                var e = t.accountID,
                    n = t.bonusId;
                return o.post("".concat(window.apiUrl, "/client/referral/getBonus"), { account_id: e, brand_id: window.brandId, id: n })
            },
            E = function(t) { var e = t.accountID; return o.post("".concat(window.apiUrl, "/client/html/dailyWheelStart"), { account_id: e, brand_id: window.brandId }) },
            j = function(t) { var e = t.accountID; return o.post("".concat(window.apiUrl, "/client/html/dailyWheelStop"), { account_id: e, brand_id: window.brandId }) }
    },
    "65d5": function(t, e, n) {
        "use strict";
        n.d(e, "a", function() { return a }), n.d(e, "b", function() { return r });
        var a = new(n("a026").a),
            r = "TOURNAMENT_CHANGE"
    },
    "6b59": function(t, e, n) {
        "use strict";
        n.d(e, "a", function() { return i }), n.d(e, "b", function() { return o });
        n("8e6e"), n("ac6a"), n("456d");
        var a = n("bd86");

        function r(t, e) {
            var n = Object.keys(t);
            if (Object.getOwnPropertySymbols) {
                var a = Object.getOwnPropertySymbols(t);
                e && (a = a.filter(function(e) { return Object.getOwnPropertyDescriptor(t, e).enumerable })), n.push.apply(n, a)
            }
            return n
        }

        function i(t) {
            if ("true" === Object({ NODE_ENV: "production", VUE_APP_PROJECT_NAME: "river", BASE_URL: "js/" }).VUE_APP_IS_LOG_GA) {
                var e = JSON.parse(localStorage.getItem("GALogs")) || [];
                e.push(t), localStorage.setItem("GALogs", JSON.stringify(e))
            } else window.ga("send", "event", t)
        }

        function o(t) {
            var e = window.location.href;
            if ("true" === Object({ NODE_ENV: "production", VUE_APP_PROJECT_NAME: "river", BASE_URL: "js/" }).VUE_APP_IS_LOG_GA) {
                var n = JSON.parse(localStorage.getItem("GALogs")) || [];
                n.push(function(t) {
                    for (var e = 1; e < arguments.length; e++) {
                        var n = null != arguments[e] ? arguments[e] : {};
                        e % 2 ? r(n, !0).forEach(function(e) { Object(a.a)(t, e, n[e]) }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(t, Object.getOwnPropertyDescriptors(n)) : r(n).forEach(function(e) { Object.defineProperty(t, e, Object.getOwnPropertyDescriptor(n, e)) })
                    }
                    return t
                }({ url: e }, t)), localStorage.setItem("GALogs", JSON.stringify(n))
            } else window.ga("send", "pageview", e, t)
        }
    },
    "6b6b": function(t, e, n) {
        "use strict";
        var a = n("51ee");
        n.n(a).a
    },
    "6e27": function(t, e, n) {},
    "6eaf": function(t, e, n) {
        "use strict";
        var a = n("e075");
        n.n(a).a
    },
    "75b4": function(t, e, n) {},
    7858: function(t, e, n) {
        "use strict";
        var a = n("7618"),
            r = (n("4917"), n("c5f6"), n("6b54"), n("386d"), n("28a5"), n("ac6a"), n("d225")),
            i = n("b0b4"),
            o = n("d32a"),
            s = [{ name: "Google", className: "social-icons__gp", href: "/login/Google/", show: "all", title: "Google" }, { name: "Vk", className: "social-icons__vk", href: "/login/Vkontakte/", show: "ru", title: "Vkontakte" }, { name: "mail.ru", className: "social-icons__mr", href: "/login/Mailru/", show: "ru", title: "Mailru" }, { name: "twitter", className: "social-icons__tw", href: "/login/Twitter/", show: "all", title: "Twitter" }, { name: "OK.RU", className: "social-icons__ok", href: "/login/Odnoklassniki/", show: "ru", title: "Odnoklassniki" }],
            c = { days: [{ name: "01", value: 1 }, { name: "02", value: 2 }, { name: "03", value: 3 }, { name: "04", value: 4 }, { name: "05", value: 5 }, { name: "06", value: 6 }, { name: "07", value: 7 }, { name: "08", value: 8 }, { name: "09", value: 9 }, { name: "10", value: 10 }, { name: "11", value: 11 }, { name: "12", value: 12 }, { name: "13", value: 13 }, { name: "14", value: 14 }, { name: "15", value: 15 }, { name: "16", value: 16 }, { name: "17", value: 17 }, { name: "18", value: 18 }, { name: "19", value: 19 }, { name: "20", value: 20 }, { name: "21", value: 21 }, { name: "22", value: 22 }, { name: "23", value: 23 }, { name: "24", value: 24 }, { name: "25", value: 25 }, { name: "26", value: 26 }, { name: "27", value: 27 }, { name: "28", value: 28 }, { name: "29", value: 29 }, { name: "30", value: 30 }, { name: "31", value: 31 }], months: [{ name: "январь", number: 1 }, { name: "февраль", number: 2 }, { name: "март", number: 3 }, { name: "апрель", number: 4 }, { name: "май", number: 5 }, { name: "июнь", number: 6 }, { name: "июль", number: 7 }, { name: "август", number: 8 }, { name: "сентябрь", number: 9 }, { name: "октябрь", number: 10 }, { name: "ноябрь", number: 11 }, { name: "декабрь", number: 12 }], years: [] };
        n.d(e, "a", function() { return u });
        var u = function() {
            function t() { Object(r.a)(this, t) }
            return Object(i.a)(t, null, [{ key: "logout", value: function() { o.a.dispatch("removeLogin") } }, {
                key: "vueTrigger",
                value: function() {
                    [].slice.call(document.querySelectorAll("[data-vue]")).forEach(function(t) {
                        var n = t.dataset.vue.split(", ");
                        t.addEventListener("click", function(t) {
                            switch (t.preventDefault(), t.stopImmediatePropagation(), t.stopPropagation(), n[0]) {
                                case "login":
                                    o.a.dispatch("showModal", "login");
                                    break;
                                case "register":
                                    o.a.dispatch("showModal", "register");
                                    break;
                                case "game":
                                    o.a.dispatch("actionCurrentGame", e(n[1], n[2])), o.a.dispatch("showModal", "game");
                                    break;
                                default:
                                    console.log("Can not parse data-vue attribute")
                            }
                        }, !1)
                    });
                    var t = new URLSearchParams(window.location.search);

                    function e(t, e) { return { id: t, isMoney: e ? JSON.parse(e) : o.a.getters.appInitialData.appMain.isGuest } }
                    t.has("game") && (o.a.dispatch("actionCurrentGame", e(t.get("game"), t.get("isMoney"))), o.a.dispatch("showModal", "game"))
                }
            }, {
                key: "urlWithCurrentGame",
                value: function(t) {
                    var e = window.location.protocol + "//" + window.location.host + window.location.pathname + "?game=" + (t.id || t.game.slug) + "&isMoney=" + t.isMoney;
                    window.history.pushState({ path: e }, "", e)
                }
            }, {
                key: "urlWithoutCurrentGame",
                value: function() {
                    var t = window.location.protocol + "//" + window.location.host + window.location.pathname;
                    window.history.pushState({ path: t }, "", t)
                }
            }, {
                key: "bodyScroll",
                value: function(t) {
                    var e = document.body,
                        n = document.querySelector("html");
                    t ? (e.classList.add("modal-open"), n.classList.add("modal-open")) : o.a.getters.isOpenedModals || (e.classList.remove("modal-open"), n.classList.remove("modal-open"))
                }
            }, { key: "objAssign", value: function() { return Object.assign || function(t) { for (var e = 1; e < arguments.length; e++) { var n = arguments[e]; for (var a in n) Object.prototype.hasOwnProperty.call(n, a) && (t[a] = n[a]) } return t } } }, {
                key: "getClosest",
                value: function(t, e) {
                    for (; t && t !== document; t = t.parentNode)
                        if (t.classList.contains(e)) return t;
                    return null
                }
            }, { key: "socialFilter", value: function() { return "ua" === o.a.getters.siteLocation ? s.filter(function(t) { return "ru" !== t.show }) : s } }, {
                key: "setYears",
                value: function() {
                    for (var t = new Date("01 January 1938").getFullYear(), e = new Date("31 December 2004").getFullYear(), n = t; n <= e; n++) c.years.push(n.toString());
                    c.years = c.years.reverse()
                }
            }, {
                key: "minutesCounter",
                value: function(t) {
                    var e = t,
                        n = 60 * e;
                    ! function t() { Number(n) <= 0 || (e = Math.floor(Number(n) / 60), Number(e) < 10 && (e = "0" + e), e.toString(), n < 10 ? "0" + (n - Math.round(60 * Number(e))) : (n - Math.round(60 * Number(e))).toString(), n--, setTimeout(t, 1e3)) }()
                }
            }, { key: "openRegForm", value: function(t) {-1 !== window.location.href.indexOf("register") && t ? o.a.commit("SHOW_REGISTER_MODAL", !0) : -1 !== window.location.href.indexOf("login") && t && o.a.commit("SHOW_LOGIN_MODAL", !0) } }, { key: "redirectFromRegisterPage", value: function() { "/register/" !== window.location.pathname && "/register" !== window.location.pathname || (window.location = "/") } }, { key: "showCash", value: function() { var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : "/cash/"; "/cashnew/" != t || o.a.getters.appInitialData.appMain.isMobile ? "/cashnew/" == t && o.a.getters.appInitialData.appMain.isMobile ? window.location.pathname = t : (window.cash.router.push(t), window.dispatchEvent(new PopStateEvent("popstate"))) : (history.pushState(null, null, "#" + t), $(window).trigger("hashchange")) } }, { key: "detectIos", value: function() { navigator.userAgent.match(/(iPad|iPhone|iPod)/i) && document.body.classList.add("ios-device") } }, {
                key: "lazyloadImages",
                value: function() {
                    document.addEventListener("DOMContentLoaded", function() {
                        var t = [].slice.call(document.querySelectorAll("img.lazy")),
                            e = !1,
                            n = function n() {!1 === e && (e = !0, setTimeout(function() { t.forEach(function(e) { e.getBoundingClientRect().top <= window.innerHeight && e.getBoundingClientRect().bottom >= 0 && "none" !== getComputedStyle(e).display && (e.src = e.dataset.src || e.dataset.original, e.dataset.srcset && (e.srcset = e.dataset.srcset), e.classList.remove("lazy"), 0 === (t = t.filter(function(t) { return t !== e })).length && (document.removeEventListener("scroll", n), window.removeEventListener("resize", n), window.removeEventListener("orientationchange", n))) }), e = !1 }, 200)) };
                        document.addEventListener("scroll", n), window.addEventListener("resize", n), window.addEventListener("orientationchange", n), n()
                    })
                }
            }, {
                key: "loadCaptcha",
                value: function() {
                    var t = o.a.getters.appInitialData.appMain,
                        e = t.captchaKey,
                        n = t.captchaUrl;
                    if (n && !document.getElementById(e)) {
                        var a = document.createElement("script");
                        a.src = n, a.id = e, document.head.appendChild(a)
                    }
                }
            }, { key: "getCaptchaToken", value: function() { return new Promise(function(t) { "object" === ("undefined" == typeof grecaptcha ? "undefined" : Object(a.a)(grecaptcha)) ? grecaptcha.execute(o.a.getters.appInitialData.appMain.captchaKey).then(function(e) { t(e) }): t(null) }) } }]), t
        }()
    },
    8105: function(t, e, n) {},
    8338: function(t, e, n) {},
    "862e": function(t, e, n) {
        "use strict";
        var a = n("c37a");
        n.n(a).a
    },
    "9a77": function(t, e, n) {
        "use strict";
        var a = n("e8ff");
        n.n(a).a
    },
    "9bcc": function(t, e, n) {
        "use strict";
        var a = n("ccda");
        n.n(a).a
    },
    aea7: function(t, e, n) {
        "use strict";
        var a = n("0dfa");
        n.n(a).a
    },
    c37a: function(t, e, n) {},
    ccda: function(t, e, n) {},
    cfad: function(t, e, n) {
        "use strict";
        var a = n("8105");
        n.n(a).a
    },
    d223: function(t, e, n) {
        "use strict";
        var a = n("75b4");
        n.n(a).a
    },
    d32a: function(t, e, n) {
        "use strict";
        var a = {};
        n.r(a), n.d(a, "appInitialData", function() { return j }), n.d(a, "appMain", function() { return P }), n.d(a, "registration", function() { return I }), n.d(a, "documentsConfig", function() { return k }), n.d(a, "currencies", function() { return D }), n.d(a, "currenciesDictionary", function() { return T }), n.d(a, "activeBonus", function() { return A }), n.d(a, "registrationNoDepBonus", function() { return L }), n.d(a, "getWebSocketUrl", function() { return R }), n.d(a, "getIsGuest", function() { return M }), n.d(a, "activeSocialAccounts", function() { return x }), n.d(a, "siteLocation", function() { return N }), n.d(a, "language", function() { return B }), n.d(a, "isLoading", function() { return U }), n.d(a, "isOpenedModals", function() { return W }), n.d(a, "isConfirmed", function() { return G }), n.d(a, "features", function() { return H }), n.d(a, "isShowCashbackBadge", function() { return $ }), n.d(a, "isShowReferralBadge", function() { return F }), n.d(a, "isShowDailyWheelBadge", function() { return z }), n.d(a, "isNeedPass", function() { return V }), n.d(a, "isShowPassScreen", function() { return Y });
        var r = {};
        n.r(r), n.d(r, "SET_APP_INITIAL_DATA", function() { return q }), n.d(r, "SET_LANGUAGE", function() { return J }), n.d(r, "SET_SITE_LOCATION", function() { return Z }), n.d(r, "IS_LOADING", function() { return K }), n.d(r, "SET_PASSWORD", function() { return X }), n.d(r, "SET_BONUS_POPUP", function() { return Q }), n.d(r, "SET_PROFILE", function() { return tt }), n.d(r, "OPEN_MODAL", function() { return et }), n.d(r, "CLOSE_MODAL", function() { return nt }), n.d(r, "SET_SELECTED_BONUS_ID", function() { return at }), n.d(r, "SET_ACTIVE_SOCIAL_ACCOUNTS", function() { return rt });
        var i = {};
        n.r(i), n.d(i, "authError", function() { return jt }), n.d(i, "registerUrl", function() { return Pt }), n.d(i, "showRegisterModal", function() { return It }), n.d(i, "isShowCreatePassword", function() { return kt }), n.d(i, "isShowSelectCurrency", function() { return Dt }), n.d(i, "showLoginModal", function() { return Tt }), n.d(i, "passwordRecoveryData", function() { return At }), n.d(i, "getPreferredPhoneCode", function() { return Lt }), n.d(i, "getPreferredCurrency", function() { return Rt }), n.d(i, "login", function() { return Mt }), n.d(i, "getLogin", function() { return xt }), n.d(i, "getPass", function() { return Nt });
        var o = {};
        n.r(o), n.d(o, "IS_LOADING", function() { return Bt }), n.d(o, "AUTH_ERROR", function() { return Ut }), n.d(o, "SHOW_REGISTER_MODAL", function() { return Wt }), n.d(o, "LOGIN_ERROR", function() { return Gt }), n.d(o, "SHOW_LOGIN_MODAL", function() { return Ht }), n.d(o, "SET_PSW_RECOVERY_DATA", function() { return $t }), n.d(o, "SHOW_CREATE_PASSWORD", function() { return Ft }), n.d(o, "SHOW_SELECT_CURRENCY", function() { return zt });
        var s = {};
        n.r(s), n.d(s, "getIsShowGamePopup", function() { return oe }), n.d(s, "getCurrentGame", function() { return se }), n.d(s, "game", function() { return ce });
        var c = {};
        n.r(c), n.d(c, "SHOW_PLAY_POPUP", function() { return ue }), n.d(c, "CURRENT_GAME", function() { return le }), n.d(c, "SET_IS_MONEY", function() { return de });
        var u = {};
        n.r(u), n.d(u, "getIsShowCashbackPopup", function() { return fe });
        var l = {};
        n.r(l), n.d(l, "SHOW_CASHBACK_POPUP", function() { return me });
        var d = {};
        n.r(d), n.d(d, "getIsShowReferralPopup", function() { return be });
        var p = {};
        n.r(p), n.d(p, "SHOW_REFERRAL_POPUP", function() { return ge });
        var f = {};
        n.r(f), n.d(f, "getIsShowDailywheelPopup", function() { return _e }), n.d(f, "getIsDailyWheelRotating", function() { return ye });
        var m = {};
        n.r(m), n.d(m, "SHOW_DAILYWHEEL_POPUP", function() { return Oe }), n.d(m, "IS_DAILYWHEEL_ROTATING", function() { return we });
        var h = {};
        n.r(h), n.d(h, "player", function() { return Ee }), n.d(h, "playerDataConfirm", function() { return je }), n.d(h, "wizard", function() { return Pe }), n.d(h, "playerError", function() { return Ie }), n.d(h, "playerUpdateStatus", function() { return ke }), n.d(h, "freeSpinBonus", function() { return De }), n.d(h, "freeSpinBonusFinished", function() { return Te }), n.d(h, "isShowAuthBonusModal", function() { return Ae }), n.d(h, "bigWin", function() { return Le }), n.d(h, "profile", function() { return Re }), n.d(h, "playersCurrency", function() { return Me }), n.d(h, "appliedBonus", function() { return xe });
        var b = {};
        n.r(b), n.d(b, "IS_LOADING", function() { return Ne }), n.d(b, "SHOW_WIZARD_MODAL", function() { return Be }), n.d(b, "SET_WIZARD_STEP", function() { return Ue }), n.d(b, "PLAYER_ERROR", function() { return We }), n.d(b, "PLAYER_FIELD_ERRORS", function() { return Ge }), n.d(b, "PLAYER_UPDATE_STATUS", function() { return He }), n.d(b, "SET_TO_CONFIRM", function() { return $e }), n.d(b, "SET_GETTING_CODE", function() { return Fe }), n.d(b, "SET_CODE_IS_GOT", function() { return ze }), n.d(b, "SET_CODE_CONFIRMATION", function() { return Ve }), n.d(b, "SET_CONFIRMED", function() { return Ye }), n.d(b, "RESET_CONFIRMED", function() { return qe }), n.d(b, "SET_GAMES_FREE_SPIN_BONUS", function() { return Je }), n.d(b, "SET_FS_REMAIN_FREE_SPIN_BONUS", function() { return Ze }), n.d(b, "SET_GAMES_FREE_SPIN_ERROR_MESSAGE", function() { return Ke }), n.d(b, "SET_SHOW_FREE_SPIN_BONUS", function() { return Xe }), n.d(b, "SET_SHOW_FREE_SPIN_BONUS_FINISHED", function() { return Qe }), n.d(b, "CLOSE_FREE_SPIN_BONUS_FINISHED", function() { return tn }), n.d(b, "SHOW_AUTH_BONUS_MODAL", function() { return en }), n.d(b, "SET_SHOW_BIG_WIN", function() { return nn }), n.d(b, "SET_SHOW_PROFILE", function() { return an }), n.d(b, "SET_PLAYERS_CURRENCY", function() { return rn }), n.d(b, "SET_APPLIED_BONUS", function() { return on });
        var g = {};
        n.r(g), n.d(g, "getIsShowProfilePopup", function() { return _n }), n.d(g, "getCurrentSection", function() { return yn }), n.d(g, "isLoadedPlayerBalance", function() { return On }), n.d(g, "playerBalance", function() { return wn }), n.d(g, "isShowCashbackAsk", function() { return Sn }), n.d(g, "balance", function() { return Cn }), n.d(g, "moneyBalanceValue", function() { return En }), n.d(g, "pointsBalanceValue", function() { return jn });
        var v = {};
        n.r(v), n.d(v, "SHOW_PROFILE_POPUP", function() { return Pn }), n.d(v, "CURRENT_SECTION", function() { return In }), n.d(v, "SET_IS_LOADED_PLAYER_BALANCE", function() { return kn }), n.d(v, "SET_PLAYER_BALANCE", function() { return Dn }), n.d(v, "SHOW_CASHBACK_ASK", function() { return Tn });
        var _ = {};
        n.r(_), n.d(_, "getIsShowTournamentPopup", function() { return Nn }), n.d(_, "getTournamentType", function() { return Bn }), n.d(_, "getTournamentData", function() { return Un }), n.d(_, "getIsShowTournamentWinners", function() { return Wn }), n.d(_, "getTournamentWinners", function() { return Gn }), n.d(_, "getTournamentSubscribedId", function() { return Hn }), n.d(_, "getTournamentBet", function() { return $n }), n.d(_, "isShowNodepBonusAlert", function() { return Fn }), n.d(_, "getHasWins", function() { return zn });
        var y = {};
        n.r(y), n.d(y, "SHOW_TOURNAMENT_POPUP", function() { return Vn }), n.d(y, "TOURNAMENT_TYPE", function() { return Yn }), n.d(y, "TOURNAMENT_DATA", function() { return qn }), n.d(y, "SHOW_TOURNAMENT_WINNERS", function() { return Jn }), n.d(y, "TOURNAMENT_WINNERS", function() { return Zn }), n.d(y, "TOURNAMENT_SUBSCRIBED_ID", function() { return Kn }), n.d(y, "TOURNAMENT_BET", function() { return Xn }), n.d(y, "SET_IS_NODEP_BONUS_ALERT", function() { return Qn }), n.d(y, "SET_HAS_WINS", function() { return ta });
        var O = {};
        n.r(O), n.d(O, "getActivityWebsocket", function() { return aa }), n.d(O, "getActivityVisible", function() { return ra });
        var w = {};
        n.r(w), n.d(w, "ACTIVITY_DEFAULT", function() { return ia }), n.d(w, "ACTIVITY_WEBSOCKET", function() { return oa }), n.d(w, "ACTIVITY_VISIBLE", function() { return sa });
        var S, C = n("a026"),
            E = n("2f62"),
            j = function(t) { return t.appInitialData },
            P = function(t) { return t.appInitialData.appMain },
            I = function(t) { return t.appInitialData.appMain.Registration },
            k = function(t) { return t.appInitialData.appMain.documents },
            D = function(t) { var e = t.appInitialData.appMain.Registration; return e.complete ? [] : e.currencies },
            T = function(t) { return t.appInitialData.appMain.currencies },
            A = function(t) { return t.appInitialData.appMain.activeBonus },
            L = function(t) { var e = t.appInitialData.appMain.Registration.Bonuses; return null == e || null == e[1] ? {} : e[1] },
            R = function(t) { return t.appInitialData.appMain.websocket && t.appInitialData.appMain.token ? "".concat(t.appInitialData.appMain.websocket, "/?token=").concat(t.appInitialData.appMain.token) : null },
            M = function(t) { return t.appInitialData.appMain.isGuest },
            x = function(t) { return t.appInitialData.appMain.activeSocialAccounts },
            N = function(t) { return t.siteLocation },
            B = function(t) { return t.language },
            U = function(t) { return t.isLoading },
            W = function(t) { return t.modals.length > 0 },
            G = function(t, e) { return e.appMain.confirmed },
            H = function(t) { return t.features },
            $ = function(t, e) { return t.isLoadedAllGames && e.balance.hasCashback },
            F = function(t, e) { return t.isLoadedAllGames && e.features.referral.enabled && e.features.referral.available },
            z = function(t, e) { return t.isLoadedAllGames && e.balance.dailyWheel && e.features.dailyWheel.enabled && e.features.dailyWheel.available },
            V = function(t, e) { return e.features.profile && "" !== e.features.profile.password },
            Y = function(t, e) { return !e.getPass && e.isNeedPass },
            q = "SET_APP_INITIAL_DATA",
            J = "SET_LANGUAGE",
            Z = "SET_SITE_LOCATION",
            K = "IS_LOADING",
            X = "SET_PASSWORD",
            Q = "SET_BONUS_POPUP",
            tt = "SET_PROFILE",
            et = "OPEN_MODAL",
            nt = "CLOSE_MODAL",
            at = "SET_SELECTED_BONUS_ID",
            rt = "SET_ACTIVE_SOCIAL_ACCOUNTS",
            it = n("bd86"),
            ot = (n("96cf"), n("3b8d")),
            st = n("1630"),
            ct = n("5758"),
            ut = n("7858"),
            lt = (n("8e6e"), n("ac6a"), n("456d"), n("6b59"));

        function dt(t, e) {
            var n = Object.keys(t);
            if (Object.getOwnPropertySymbols) {
                var a = Object.getOwnPropertySymbols(t);
                e && (a = a.filter(function(e) { return Object.getOwnPropertyDescriptor(t, e).enumerable })), n.push.apply(n, a)
            }
            return n
        }

        function pt(t) {
            for (var e = 1; e < arguments.length; e++) {
                var n = null != arguments[e] ? arguments[e] : {};
                e % 2 ? dt(n, !0).forEach(function(e) { Object(it.a)(t, e, n[e]) }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(t, Object.getOwnPropertyDescriptors(n)) : dt(n).forEach(function(e) { Object.defineProperty(t, e, Object.getOwnPropertyDescriptor(n, e)) })
            }
            return t
        }
        var ft, mt, ht = (S = {
                init: function() {
                    var t = Object(ot.a)(regeneratorRuntime.mark(function t(e) {
                        var n, a, r, i, o;
                        return regeneratorRuntime.wrap(function(t) {
                            for (;;) switch (t.prev = t.next) {
                                case 0:
                                    if (n = e.getters, a = e.dispatch, r = $cookies.get("login")) { t.next = 5; break }
                                    return document.getElementById("preloader").style.display = "none", t.abrupt("return");
                                case 5:
                                    return t.next = 7, Object(ct.p)({ accountID: r });
                                case 7:
                                    if (!(i = t.sent).data.success) { t.next = 16; break }
                                    if (o = i.data.features, a("setInit", o), a("setLogin", r), $cookies.get("pass") || !n.isNeedPass) { t.next = 16; break }
                                    return document.getElementById("preloader").style.display = "none", t.abrupt("return");
                                case 16:
                                    a("setAuthorized", r), a("initBalance"), document.title = "Play games", a("setPass", !0);
                                case 20:
                                case "end":
                                    return t.stop()
                            }
                        }, t)
                    }));
                    return function(e) { return t.apply(this, arguments) }
                }(),
                updateInitInfo: function() {
                    var t = Object(ot.a)(regeneratorRuntime.mark(function t(e) {
                        var n, a, r, i, o;
                        return regeneratorRuntime.wrap(function(t) {
                            for (;;) switch (t.prev = t.next) {
                                case 0:
                                    if (n = e.getters, a = e.dispatch, r = n.login) { t.next = 5; break }
                                    return console.log("can not update features info: account does not exist"), t.abrupt("return", !1);
                                case 5:
                                    return t.next = 7, Object(ct.p)({ accountID: r });
                                case 7:
                                    (i = t.sent).data.success ? (o = i.data.features, a("setInit", o)) : console.log("can not update features info: response success false");
                                case 9:
                                case "end":
                                    return t.stop()
                            }
                        }, t)
                    }));
                    return function(e) { return t.apply(this, arguments) }
                }(),
                initBonus: function(t) {
                    var e = t.getters,
                        n = t.dispatch,
                        a = e.appInitialData.appMain.Registration;
                    a.noDepositSelected ? n(st.j, "wizard") : a.depositSelected && n("openAuthBonusModal", !0)
                },
                setAppInitialData: function(t, e) {
                    var n = t.commit,
                        a = e.appMain.Registration.Bonuses;
                    a && a.reverse(), n(q, e)
                },
                setSiteLocation: function(t, e) {
                    (0, t.commit)(Z, e)
                },
                setLanguage: function(t, e) {
                    (0, t.commit)(J, e)
                },
                setSelectedBonusId: function(t, e) {
                    (0, t.commit)(at, e)
                }
            }, Object(it.a)(S, st.h, function(t, e) {
                (0, t.commit)(X, e)
            }), Object(it.a)(S, st.f, function(t, e) {
                (0, t.commit)(Q, e)
            }), Object(it.a)(S, st.i, function(t, e) {
                (0, t.commit)(tt, e)
            }), Object(it.a)(S, st.d, function(t, e) {
                (0, t.commit)(et, e), ut.a.bodyScroll(!0)
            }), Object(it.a)(S, st.a, function(t) {
                (0, t.commit)(nt), ut.a.bodyScroll(!1)
            }), Object(it.a)(S, st.b, (ft = Object(ot.a)(regeneratorRuntime.mark(function t(e) {
                var n, a, r, i;
                return regeneratorRuntime.wrap(function(t) {
                    for (;;) switch (t.prev = t.next) {
                        case 0:
                            return n = e.dispatch, a = 176, 1 === (r = Math.floor(window.innerWidth / a)) && (r = 2), t.next = 6, Object(ct.i)(r);
                        case 6:
                            i = t.sent, n(st.g, i.data.data);
                        case 8:
                        case "end":
                            return t.stop()
                    }
                }, t)
            })), function(t) { return ft.apply(this, arguments) })), Object(it.a)(S, st.k, function(t) {
                var e = t.state,
                    n = t.dispatch;
                window.addEventListener("CASH-OPENED", function(t) {
                    n(st.d, t.detail),
                        function(t) {
                            try {
                                var e = { eventCategory: "Попапы 777", eventLabel: "Касса" };
                                if (!e) return;
                                Object(lt.b)(pt({}, e, {}, t))
                            } catch (t) { console.log(t) }
                        }({ eventLabel: "Касса", eventAction: "Адрес кассы" })
                }), window.addEventListener("CASH-CLOSED", function(t) {
                    var a = e.modals,
                        r = a[a.length - 1];
                    null != r && r.modalName === t.detail.modalName && n(st.a, { modalName: "cash" })
                }), window.addEventListener("CASH-OPEN-PROFILE-DOCUMENTS", function() { n("showModal", "profile"), n("actionCurrentSection", "documents") })
            }), Object(it.a)(S, st.e, function(t, e) {
                (0, t.commit)(rt, e)
            }), Object(it.a)(S, "setInit", function(t, e) {
                (0, t.commit)("SET_INIT", e)
            }), Object(it.a)(S, "hideJackpot", function(t) {
                (0, t.commit)("HIDE_JACKPOT")
            }), Object(it.a)(S, "setIsLoadedAllGames", function(t) {
                (0, t.commit)("SET_IS_LOADED_ALL_GAMES", !0)
            }), Object(it.a)(S, "setIsPhoneConfirmed", function(t) {
                (0, t.commit)("SET_IS_PHONE_CONFIRMED", !0)
            }), S),
            bt = n("75fc");

        function gt(t, e) {
            var n = Object.keys(t);
            if (Object.getOwnPropertySymbols) {
                var a = Object.getOwnPropertySymbols(t);
                e && (a = a.filter(function(e) { return Object.getOwnPropertyDescriptor(t, e).enumerable })), n.push.apply(n, a)
            }
            return n
        }

        function vt(t) {
            for (var e = 1; e < arguments.length; e++) {
                var n = null != arguments[e] ? arguments[e] : {};
                e % 2 ? gt(n, !0).forEach(function(e) { Object(it.a)(t, e, n[e]) }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(t, Object.getOwnPropertyDescriptors(n)) : gt(n).forEach(function(e) { Object.defineProperty(t, e, Object.getOwnPropertyDescriptor(n, e)) })
            }
            return t
        }
        var _t = (mt = {}, Object(it.a)(mt, q, function(t, e) { t.appInitialData = vt({}, t.appInitialData, {}, e) }), Object(it.a)(mt, J, function(t, e) { t.language = e }), Object(it.a)(mt, Z, function(t, e) { t.siteLocation = e }), Object(it.a)(mt, K, function(t, e) { t.isLoading = e }), Object(it.a)(mt, X, function(t, e) { t.appInitialData.appMain.hasPassword = e }), Object(it.a)(mt, Q, function(t, e) { t.appInitialData.bonusPopup = e }), Object(it.a)(mt, tt, function(t, e) {
            var n = t.appInitialData;
            n.appMain = Object.assign({}, n.appMain, e), n.appMain = Object.assign({}, n.appMain, { emailConfirmed: e.email_confirmed }), n.appMain = Object.assign({}, n.appMain, { countryId: e.country_id }), n.appMain = Object.assign({}, n.appMain, { countryCode: e.country_code }), n.appMain = Object.assign({}, n.appMain, { phoneCountry: e.phoneCountryISO })
        }), Object(it.a)(mt, et, function(t, e) { t.modals.push(e) }), Object(it.a)(mt, nt, function(t) { t.modals.pop() }), Object(it.a)(mt, at, function(t, e) { t.appInitialData.appMain.Registration.selectedBonusId = e }), Object(it.a)(mt, rt, function(t, e) {
            var n = t.appInitialData.appMain.activeSocialAccounts;
            t.appInitialData.appMain.activeSocialAccounts = [].concat(Object(bt.a)(n), [e])
        }), Object(it.a)(mt, "SET_INIT", function(t, e) { t.features = e }), Object(it.a)(mt, "HIDE_JACKPOT", function(t, e) { t.features = vt({}, t.features, { jackpots: { enabled: !1, available: !1 } }) }), Object(it.a)(mt, "SET_IS_LOADED_ALL_GAMES", function(t, e) { t.isLoadedAllGames = e }), Object(it.a)(mt, "SET_IS_PHONE_CONFIRMED", function(t, e) { t.features.referral.hasPhone = e }), mt);
        n("7514"), n("b408"), n("65d5");

        function yt(t, e) {
            var n = Object.keys(t);
            if (Object.getOwnPropertySymbols) {
                var a = Object.getOwnPropertySymbols(t);
                e && (a = a.filter(function(e) { return Object.getOwnPropertyDescriptor(t, e).enumerable })), n.push.apply(n, a)
            }
            return n
        }

        function Ot(t) {
            try {
                var e = { eventCategory: "Попапы 777" };
                if (!e) return;
                Object(lt.a)(function(t) {
                    for (var e = 1; e < arguments.length; e++) {
                        var n = null != arguments[e] ? arguments[e] : {};
                        e % 2 ? yt(n, !0).forEach(function(e) { Object(it.a)(t, e, n[e]) }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(t, Object.getOwnPropertyDescriptors(n)) : yt(n).forEach(function(e) { Object.defineProperty(t, e, Object.getOwnPropertyDescriptor(n, e)) })
                    }
                    return t
                }({}, e, { eventLabel: "Попап ".concat(t.eventLabel), eventAction: t.isOpen ? "Показ" : "Закрытие" }))
            } catch (t) { console.log(t) }
        }
        var wt, St = { auth: { registration: { showRegisterModal: !1, registerUrl: "/register/", registerFinishUrl: "/rest/player/update/" }, login: { showLoginModal: !1, showPswRecoveryModal: !1, isShowCreatePassword: !1, isShowSelectCurrency: !1, loginUrl: "/login/", passwordRecoveryData: { passwordRecoveryUrl: "/remind/", passwordRecoveryResponse: !1, passwordRecoverySuccess: !1 } }, error: { type: "", message: "" } }, login: null, pass: null },
            Ct = (n("7f7f"), { ua: { code: "ua", name: "Ukraine (Україна)", dialCode: 380, example: "039 123 4567" }, ru: { code: "ru", name: "Russia (Россия)", dialCode: 7, example: "8 (912) 345-67-89" }, am: { code: "am", name: "Armenia (Հայաստան)", dialCode: 374, example: "077 123456" }, az: { code: "az", name: "Azerbaijan (Azərbaycan)", dialCode: 994, example: "040 123 45 67" }, by: { code: "by", name: "Belarus (Беларусь)", dialCode: 375, example: "8 029 491-19-11" }, bg: { code: "bg", name: "Bulgaria (България)", dialCode: 359, example: "048 123 456" }, cz: { code: "cz", name: "Czech Republic (Česká republika)", dialCode: 420, example: "601 123 456" }, ee: { code: "ee", name: "Estonia (Eesti)", dialCode: 372, example: "5123 4567" }, ge: { code: "ge", name: "Georgia (საქართველო)", dialCode: 995, example: "555 12 34 56" }, il: { code: "il", name: "Israel (‫ישראל‬‎)", dialCode: 972, example: "050-123-4567" }, kz: { code: "kz", name: "Kazakhstan (Казахстан)", dialCode: 7, example: "8 (771) 000 9998" }, kg: { code: "kg", name: "Kyrgyzstan (Кыргызстан)", dialCode: 996, example: "0700 123 456" }, lv: { code: "lv", name: "Latvia (Latvija)", dialCode: 371, example: "21 234 567" }, lt: { code: "lt", name: "Lithuania (Lietuva)", dialCode: 370, example: "(8-612) 34567" }, md: { code: "md", name: "Moldova (Republica Moldova)", dialCode: 373, example: "0621 12 345" }, pl: { code: "pl", name: "Poland (Polska)", dialCode: 48, example: "512 345 678" }, si: { code: "si", name: "Slovenia (Slovenija)", dialCode: 386, example: "031 234 567" }, tj: { code: "tj", name: "Tajikistan", dialCode: 992, example: "(8) 917 12 3456" }, tm: { code: "tm", name: "Turkmenistan", dialCode: 993, example: "8 66 123456" }, uz: { code: "uz", name: "Uzbekistan (Oʻzbekiston)", dialCode: 998, example: "8 91 234 56 78" } }),
            Et = { registration: [{ id: "radio_RUB_reg", name: "RUB", value: 2 }, { id: "radio_UAH_reg", name: "UAH", value: 1 }, { id: "radio_USD_reg", name: "USD", value: 3 }], registrationFinish: [{ id: "radio_RUB_finish_reg", name: "RUB", value: 2 }, { id: "radio_UAH_finish_reg", name: "UAH", value: 1 }, { id: "radio_USD_finish_reg", name: "USD", value: 3 }] },
            jt = function(t) { return t.auth.error },
            Pt = function(t) { return t.auth.registration.registerUrl },
            It = function(t) { return t.auth.registration.showRegisterModal },
            kt = function(t) { return t.auth.login.isShowCreatePassword },
            Dt = function(t) { return t.auth.login.isShowSelectCurrency },
            Tt = function(t) { return t.auth.login.showLoginModal },
            At = function(t) { return t.auth.login.passwordRecoveryData },
            Lt = function() {
                var t = pa.getters.appInitialData.appMain,
                    e = Ct[t.preferredCountryCode];
                return t.phone || !e ? null : { country: e.code, code: e.dialCode }
            },
            Rt = function() { return pa.getters.appInitialData.appMain.preferredCurrency ? Et.registration.find(function(t) { return t.name === pa.getters.appInitialData.appMain.preferredCurrency }) : null },
            Mt = function(t) { return t.login },
            xt = function(t) { return t.login },
            Nt = function(t) { return t.pass },
            Bt = "IS_LOADING",
            Ut = "AUTH_ERROR",
            Wt = "SHOW_REGISTER_MODAL",
            Gt = "LOGIN_ERROR",
            Ht = "SHOW_LOGIN_MODAL",
            $t = "SET_PSW_RECOVERY_DATA",
            Ft = "SHOW_CREATE_PASSWORD",
            zt = "SHOW_SELECT_CURRENCY",
            Vt = n("bc3a"),
            Yt = n.n(Vt),
            qt = n("e32f");

        function Jt(t, e) {
            var n = Object.keys(t);
            if (Object.getOwnPropertySymbols) {
                var a = Object.getOwnPropertySymbols(t);
                e && (a = a.filter(function(e) { return Object.getOwnPropertyDescriptor(t, e).enumerable })), n.push.apply(n, a)
            }
            return n
        }

        function Zt(t) {
            try {
                var e = { eventCategory: "Попапы 777" };
                if (!e) return;
                Object(lt.a)(function(t) {
                    for (var e = 1; e < arguments.length; e++) {
                        var n = null != arguments[e] ? arguments[e] : {};
                        e % 2 ? Jt(n, !0).forEach(function(e) { Object(it.a)(t, e, n[e]) }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(t, Object.getOwnPropertyDescriptors(n)) : Jt(n).forEach(function(e) { Object.defineProperty(t, e, Object.getOwnPropertyDescriptor(n, e)) })
                    }
                    return t
                }({}, e, {}, t))
            } catch (t) { console.log(t) }
        }
        var Kt, Xt = (wt = {
            showModal: function(t, e) {
                var n = t.commit;
                switch (e) {
                    case "register":
                        n(Wt, !0);
                        break;
                    case "login":
                        n(Ht, !0)
                }
            }
        }, Object(it.a)(wt, "openCreatePassword", function(t) {
            (0, t.commit)(Ft, !0)
        }), Object(it.a)(wt, "closeCreatePassword", function(t) {
            var e = t.commit,
                n = t.dispatch;
            e(Ft, !1), n(st.c)
        }), Object(it.a)(wt, "openSelectCurrency", function(t) {
            (0, t.commit)(zt, !0)
        }), Object(it.a)(wt, "closeSelectCurrency", function(t) {
            var e = t.commit,
                n = t.dispatch;
            e(zt, !1), n(st.c)
        }), Object(it.a)(wt, "register", function(t, e) {
            var n = t.commit,
                a = "changeCurrency" === e.type ? St.auth.registration.registerFinishUrl : St.auth.registration.registerUrl;
            Yt.a.post(a, e.data).then(function(t) {
                if (n(Bt, !1), t.data.success) Object(qt.a)({ bonus: e.bonus }), n(Wt, !1), t.data.redirectUrl ? window.location = t.data.redirectUrl : window.location.reload();
                else {
                    var a = { type: e.method, message: t.data.message };
                    n(Ut, a)
                }
            }).catch(function(t) { console.log(t), n(Bt, !1) })
        }), Object(it.a)(wt, "login", function(t, e) {
            var n = t.commit,
                a = St.auth.login.loginUrl;
            Yt.a.post(a, e).then(function(t) {
                if (n(Bt, !1), t.data.success) n(Ht, !1), t.data.redirectUrl ? window.location = t.data.redirectUrl : window.location.reload();
                else {
                    var e = { type: t.data.login ? "login" : "password", message: t.data.login ? t.data.login[0] : t.data.password[0] };
                    n(Ut, e)
                }
            }).catch(function(t) { console.log(t), n(Bt, !1) })
        }), Object(it.a)(wt, "passwordRecovery", function(t, e) {
            var n = t.commit,
                a = St.auth.login.passwordRecoveryData.passwordRecoveryUrl;
            Yt.a.post(a, e).then(function(t) { n(Bt, !1), n($t, { passwordRecoveryResponse: !0 }), t.data.success ? (Zt({ eventLabel: "Восстановление пароля", eventAction: "Сбросить пароль" }), n($t, { passwordRecoverySuccess: !0 })) : n($t, { passwordRecoverySuccess: !1 }) }).catch(function(t) { console.log(t), n(Bt, !1) })
        }), Object(it.a)(wt, "setAuthorized", function(t, e) {
            t.commit;
            $cookies.set("login", e), $cookies.set("pass", !0)
        }), Object(it.a)(wt, "setLogin", function(t, e) {
            (0, t.commit)("SET_LOGIN", e)
        }), Object(it.a)(wt, "setPass", function(t, e) {
            (0, t.commit)("SET_PASS", e)
        }), Object(it.a)(wt, "removeLogin", function(t, e) {
            var n = t.commit;
            $cookies.remove("login"), $cookies.remove("pass"), n("SET_LOGIN", e), n("SET_PASS", e), document.title = "Login"
        }), wt);

        function Qt(t, e) {
            var n = Object.keys(t);
            if (Object.getOwnPropertySymbols) {
                var a = Object.getOwnPropertySymbols(t);
                e && (a = a.filter(function(e) { return Object.getOwnPropertyDescriptor(t, e).enumerable })), n.push.apply(n, a)
            }
            return n
        }

        function te(t) {
            for (var e = 1; e < arguments.length; e++) {
                var n = null != arguments[e] ? arguments[e] : {};
                e % 2 ? Qt(n, !0).forEach(function(e) { Object(it.a)(t, e, n[e]) }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(t, Object.getOwnPropertyDescriptors(n)) : Qt(n).forEach(function(e) { Object.defineProperty(t, e, Object.getOwnPropertyDescriptor(n, e)) })
            }
            return t
        }
        var ee, ne, ae, re = (Kt = {}, Object(it.a)(Kt, Bt, function(t, e) { t.isLoading = e }), Object(it.a)(Kt, Ut, function(t, e) { t.auth.error = te({}, t.auth.error, {}, e) }), Object(it.a)(Kt, Wt, function(t, e) { t.auth.registration.showRegisterModal = e }), Object(it.a)(Kt, Ht, function(t, e) { t.auth.login.showLoginModal = e, e || (t.auth.login.passwordRecoveryData = te({}, t.auth.login.passwordRecoveryData, {}, { passwordRecoveryResponse: !1, passwordRecoverySuccess: !1 })) }), Object(it.a)(Kt, $t, function(t, e) { t.auth.login.passwordRecoveryData = te({}, t.auth.login.passwordRecoveryData, {}, e) }), Object(it.a)(Kt, Ft, function(t, e) { t.auth.login.isShowCreatePassword = e }), Object(it.a)(Kt, zt, function(t, e) { t.auth.login.isShowSelectCurrency = e }), Object(it.a)(Kt, "SET_LOGIN", function(t, e) { t.login = e }), Object(it.a)(Kt, "SET_PASS", function(t, e) { t.pass = e }), Kt),
            ie = { state: St, getters: i, types: o, actions: Xt, mutations: re },
            oe = function(t) { return t.isShowGamePopup },
            se = function(t) { return t.currentGame },
            ce = function(t) { return t.game },
            ue = "SHOW_PLAY_POPUP",
            le = "CURRENT_GAME",
            de = "SET_IS_MONEY",
            pe = {
                state: { isShowGamePopup: !1, currentGame: {}, game: null },
                getters: s,
                types: c,
                actions: {
                    openGame: function(t, e) {
                        t.getters;
                        var n = t.commit;
                        t.dispatch;
                        if (e.redirect) return console.log(e), void(location.href = e.launcher);
                        n("SET_GAME", e), n(ue, !0)
                    },
                    closeGame: function(t) {
                        var e = t.commit;
                        e("SET_GAME", null), e(ue, !1)
                    }
                },
                mutations: (ee = {}, Object(it.a)(ee, ue, function(t, e) { t.isShowGamePopup = e }), Object(it.a)(ee, le, function(t, e) { t.currentGame = e }), Object(it.a)(ee, de, function(t, e) { t.currentGame.isMoney = e }), Object(it.a)(ee, "SET_GAME", function(t, e) { t.game = e }), ee)
            },
            fe = function(t) { return t.isShowCashbackPopup },
            me = "SHOW_CASHBACK_POPUP",
            he = {
                state: { isShowCashbackPopup: !1 },
                getters: u,
                types: l,
                actions: {
                    openCashback: function(t, e) {
                        t.getters;
                        var n = t.commit;
                        t.dispatch;
                        n(me, !0)
                    },
                    closeCashback: function(t) {
                        (0, t.commit)(me, !1)
                    }
                },
                mutations: Object(it.a)({}, me, function(t, e) { t.isShowCashbackPopup = e })
            },
            be = function(t) { return t.isShowReferralPopup },
            ge = "SHOW_REFERRAL_POPUP",
            ve = {
                state: { isShowReferralPopup: !1 },
                getters: d,
                types: p,
                actions: {
                    openReferral: function(t, e) {
                        t.getters;
                        var n = t.commit;
                        t.dispatch;
                        n(ge, !0)
                    },
                    closeReferral: function(t) {
                        (0, t.commit)(ge, !1)
                    }
                },
                mutations: Object(it.a)({}, ge, function(t, e) { t.isShowReferralPopup = e })
            },
            _e = function(t) { return t.isShowDailywheelPopup },
            ye = function(t) { return t.isDailyWheelRotating },
            Oe = "SHOW_DAILYWHEEL_POPUP",
            we = "IS_DAILYWHEEL_ROTATING",
            Se = {
                state: { isShowDailywheelPopup: !1, isDailyWheelRotating: !1 },
                getters: f,
                types: m,
                actions: {
                    openDailyWheel: function(t, e) {
                        t.getters;
                        var n = t.commit;
                        t.dispatch;
                        n(Oe, !0)
                    },
                    closeDailyWheel: function(t) {
                        (0, t.commit)(Oe, !1)
                    },
                    setDailyWheelIsRotating: function(t, e) {
                        (0, t.commit)(we, e)
                    }
                },
                mutations: (ne = {}, Object(it.a)(ne, Oe, function(t, e) { t.isShowDailywheelPopup = e }), Object(it.a)(ne, we, function(t, e) { t.isDailyWheelRotating = e }), ne)
            },
            Ce = { player: { personalDataUrl: "/rest/player/update/", getCodeUrl: "/profile/confirmRequest/", confirmCodeUrl: "/profile/confirm/", profileRequestUrl: "/profile/request/", getFreeSpinNoDep: "/rest/player/getnodepfreespin/", getNodepbonus: "/rest/player/getnodepbonus/", getFreeSpinBonus: "/rest/player/getfreespinbonus/", changeEmailUrl: "/rest/player/email/change/", changePhoneUrl: "/rest/player/phone/change/", requestConfirmationEmail: "/rest/player/email/confirmation/request/", requestConfirmationPhone: "/rest/player/phone/confirmation/request/", checkConfirmationEmail: "/rest/player/email/confirmation/check/", checkConfirmationPhone: "/rest/player/phone/confirmation/check/", dataConfirm: { email: { toConfirm: !0, gettingCode: !1, codeIsGot: !1, codeConfirmation: !1, confirmed: !1 }, phone: { toConfirm: !0, gettingCode: !1, codeIsGot: !1, codeConfirmation: !1, confirmed: !1 } }, wizard: { show: !1, currentStep: 1 }, free_spin_bonus: { errorMessage: null, show: !1, games: [], summary: "", fsRemain: null, gameUrl: "/online-game/lucky-ladys-charm/play" }, free_spin_bonus_finished: { show: !1, amount: null, currency: null, fsTotal: null, currentRp: null }, authBonus: { showAuthBonusModal: !1 }, big_win: { show: !1, url: "#" }, error: { type: "", message: "" }, update: { status: "", message: "" }, currency: "UAH", appliedBonus: {} } },
            Ee = function(t) { return t.player },
            je = function(t) { return t.player.dataConfirm },
            Pe = function(t) { return t.player.wizard },
            Ie = function(t) { return t.player.error },
            ke = function(t) { return t.player.update },
            De = function(t) { return t.player.free_spin_bonus },
            Te = function(t) { return t.player.free_spin_bonus_finished },
            Ae = function(t) { return t.player.authBonus.showAuthBonusModal },
            Le = function(t) { return t.player.big_win },
            Re = function(t) { return t.player.profile },
            Me = function(t) { return t.player.currency },
            xe = function(t) { return t.player.appliedBonus },
            Ne = "IS_LOADING",
            Be = "SHOW_WIZARD_MODAL",
            Ue = "SET_WIZARD_STEP",
            We = "PLAYER_ERROR",
            Ge = "PLAYER_FIELD_ERRORS",
            He = "PLAYER_UPDATE_STATUS",
            $e = "SET_TO_CONFIRM",
            Fe = "SET_GETTING_CODE",
            ze = "SET_CODE_IS_GOT",
            Ve = "SET_CODE_CONFIRMATION",
            Ye = "SET_CONFIRMED",
            qe = "RESET_CONFIRMED",
            Je = "SET_GAMES_FREE_SPIN_BONUS",
            Ze = "SET_FS_REMAIN_FREE_SPIN_BONUS",
            Ke = "SET_GAMES_FREE_SPIN_ERROR_MESSAGE",
            Xe = "SET_SHOW_FREE_SPIN_BONUS",
            Qe = "SET_SHOW_FREE_SPIN_BONUS_FINISHED",
            tn = "CLOSE_FREE_SPIN_BONUS_FINISHED",
            en = "SHOW_AUTH_BONUS_MODAL",
            nn = "SET_SHOW_BIG_WIN",
            an = "SET_SHOW_PROFILE",
            rn = "SET_PLAYERS_CURRENCY",
            on = "SET_APPLIED_BONUS";
        n("6762"), n("2fdb");

        function sn(t, e) {
            var n = Object.keys(t);
            if (Object.getOwnPropertySymbols) {
                var a = Object.getOwnPropertySymbols(t);
                e && (a = a.filter(function(e) { return Object.getOwnPropertyDescriptor(t, e).enumerable })), n.push.apply(n, a)
            }
            return n
        }

        function cn(t) {
            for (var e = 1; e < arguments.length; e++) {
                var n = null != arguments[e] ? arguments[e] : {};
                e % 2 ? sn(n, !0).forEach(function(e) { Object(it.a)(t, e, n[e]) }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(t, Object.getOwnPropertyDescriptors(n)) : sn(n).forEach(function(e) { Object.defineProperty(t, e, Object.getOwnPropertyDescriptor(n, e)) })
            }
            return t
        }
        var un, ln, dn, pn = (ae = {
            showModal: function() {
                var t = Object(ot.a)(regeneratorRuntime.mark(function t(e, n) {
                    var a, r, i, o, s, c;
                    return regeneratorRuntime.wrap(function(t) {
                        for (;;) switch (t.prev = t.next) {
                            case 0:
                                if (a = e.commit, r = e.dispatch, i = e.getters, "wizard" !== n) { t.next = 17; break }
                                return t.next = 4, ct.k();
                            case 4:
                                if (o = t.sent, s = i.activeBonus, c = i.appInitialData.appMain.Registration, r(st.i, o.data), !("money" !== c.bonusType && s && s.fsRemain > 0)) { t.next = 11; break }
                                return r("showRemainingBonus"), t.abrupt("return");
                            case 11:
                                if (!i.isConfirmed || !c.noDepositAvailable) { t.next = 14; break }
                                return r("getBonus"), t.abrupt("return");
                            case 14:
                                i.isConfirmed || a(Be, !0), t.next = 18;
                                break;
                            case 17:
                                "authBonus" === n && a(en, !0);
                            case 18:
                            case "end":
                                return t.stop()
                        }
                    }, t)
                }));
                return function(e, n) { return t.apply(this, arguments) }
            }()
        }, Object(it.a)(ae, "openAuthBonusModal", (ln = Object(ot.a)(regeneratorRuntime.mark(function t(e) {
            var n, a, r, i, o;
            return regeneratorRuntime.wrap(function(t) {
                for (;;) switch (t.prev = t.next) {
                    case 0:
                        if (n = e.commit, a = e.getters, r = e.dispatch, null != a.appInitialData.appMain.activeBonus) { t.next = 8; break }
                        return t.next = 5, ct.r();
                    case 5:
                        i = t.sent, (o = i.data).success && null != o.data && (r(st.f, o.data), n(en, !0));
                    case 8:
                    case "end":
                        return t.stop()
                }
            }, t)
        })), function(t) { return ln.apply(this, arguments) })), Object(it.a)(ae, "closeAuthBonusModal", function(t) {
            var e = t.commit,
                n = t.getters;
            e(en, !1);
            var a = 1 == n.appInitialData.appMain.expVersion ? "/cashnew/" : "/cash/";
            ut.a.showCash(a)
        }), Object(it.a)(ae, "activationAuthBonus", function(t, e) {
            var n = t.commit;
            t.getters;
            n(en, !1), ut.a.showCash(e.cashUrl)
        }), Object(it.a)(ae, "topUpAccount", function(t) {
            (0, t.commit)(Qe, { show: !1 }), ut.a.showCash("/cash/deposit/")
        }), Object(it.a)(ae, "closeWizard", function(t) {
            var e = t.commit,
                n = t.dispatch;
            e(Be, !1), n("openAuthBonusModal", !0)
        }), Object(it.a)(ae, "openBonusFreeSpinFinishedModal", function(t, e) {
            (0, t.commit)(Qe, cn({}, e, { show: !0 }))
        }), Object(it.a)(ae, "setAppliedBonus", function(t, e) {
            (0, t.commit)(on, e)
        }), Object(it.a)(ae, "closeBonusFreeSpinFinishedModal", function(t, e) {
            (0, t.commit)(tn, e)
        }), Object(it.a)(ae, "freeSpinFinish", function(t, e) {
            var n = t.commit;
            setTimeout(function() { n(Qe, e) }, 2e3)
        }), Object(it.a)(ae, "showBigWin", function(t, e) {
            (0, t.commit)(nn, cn({}, e, { show: !0 }))
        }), Object(it.a)(ae, "closeBigWin", function(t) {
            (0, t.commit)(nn, { show: !1 })
        }), Object(it.a)(ae, "bigWinPlay", function(t) {
            (0, t.dispatch)("actionCurrentGame", cn({}, t.getters.getCurrentGame, { isMoney: !0 })), ut.a.showCash("/cash/deposit/")
        }), Object(it.a)(ae, "bigWin", function(t, e) {
            var n = t.commit;
            (window.location.pathname.includes("online-game") || !0 === pe.state.currentGame[1]) && n(nn, e)
        }), Object(it.a)(ae, "savePlayerPersonal", function() {
            var t = Object(ot.a)(regeneratorRuntime.mark(function t(e, n) {
                var a, r, i, o, s;
                return regeneratorRuntime.wrap(function(t) {
                    for (;;) switch (t.prev = t.next) {
                        case 0:
                            return a = e.commit, t.prev = 1, r = Ce.player.personalDataUrl, i = JSON.stringify(n.data), t.next = 6, Yt.a.post(r, i);
                        case 6:
                            return o = t.sent, a(K, !1), o.data.success ? a(Ue, n.step) : (s = { type: n.type, message: "Ошибка при заполнении" }, a(We, s)), t.abrupt("return", o);
                        case 12:
                            t.prev = 12, t.t0 = t.catch(1), console.log(t.t0), a(K, !1);
                        case 16:
                        case "end":
                            return t.stop()
                    }
                }, t, null, [
                    [1, 12]
                ])
            }));
            return function(e, n) { return t.apply(this, arguments) }
        }()), Object(it.a)(ae, "savePlayerPersonalProfile", function(t, e) {
            var n = t.commit,
                a = Ce.player.personalDataUrl;
            return Yt.a.post(a, JSON.stringify(e.data)).then(function(t) {
                if (t.data.success) n(He, { status: t.data.success, message: t.data.message, type: e.type });
                else {
                    var a = t.data.hasOwnProperty("message") ? t.data.message : "Ошибка при заполнении";
                    n(We, { type: e.type, message: a }), n(He, { status: !1, message: a, type: e.type })
                }
                return { success: t.data.success, message: t.data.message }
            }).catch(function(t) { console.log(t) })
        }), Object(it.a)(ae, "updateProfileContacts", function() {
            var t = Object(ot.a)(regeneratorRuntime.mark(function t(e, n) {
                var a, r, i, o, s, c, u;
                return regeneratorRuntime.wrap(function(t) {
                    for (;;) switch (t.prev = t.next) {
                        case 0:
                            if (a = e.commit, e.dispatch, r = "email" === n.type ? Ce.player.changeEmailUrl : Ce.player.changePhoneUrl, !n.update) { t.next = 18; break }
                            return i = JSON.stringify("email" === n.type ? { email: n.email } : { phone: n.phone }), t.prev = 4, t.next = 7, Yt.a.post(r, i);
                        case 7:
                            return (o = t.sent).data.success || (s = "Ошибка при заполнении", o.data.hasOwnProperty("message") && (s = o.data.message), c = { type: n.type, message: s }, a(We, c), a(Fe, { type: n.type, data: !1 }), a($e, { type: n.type, data: !0 })), t.abrupt("return", o);
                        case 12:
                            t.prev = 12, t.t0 = t.catch(4), u = { type: n.type, message: t.t0 }, a(We, u), a(Fe, { type: n.type, data: !1 }), a($e, { type: n.type, data: !0 });
                        case 18:
                        case "end":
                            return t.stop()
                    }
                }, t, null, [
                    [4, 12]
                ])
            }));
            return function(e, n) { return t.apply(this, arguments) }
        }()), Object(it.a)(ae, "requestConfirmation", function() {
            var t = Object(ot.a)(regeneratorRuntime.mark(function t(e, n) {
                var a, r, i, o;
                return regeneratorRuntime.wrap(function(t) {
                    for (;;) switch (t.prev = t.next) {
                        case 0:
                            return a = e.commit, r = "email" === n ? Ce.player.requestConfirmationEmail : Ce.player.requestConfirmationPhone, t.next = 4, Yt.a.post(r);
                        case 4:
                            return i = t.sent, a(Fe, { type: n, data: !1 }), i.data.success ? a(ze, { type: n, data: !0 }) : (o = "Ошибка при заполнении", i.data.hasOwnProperty("error") && (o = i.data.error), a(We, { type: n, message: o }), a($e, { type: n, data: !0 })), t.abrupt("return", i);
                        case 8:
                        case "end":
                            return t.stop()
                    }
                }, t)
            }));
            return function(e, n) { return t.apply(this, arguments) }
        }()), Object(it.a)(ae, "confirmCode", function() {
            var t = Object(ot.a)(regeneratorRuntime.mark(function t(e, n) {
                var a, r, i, o, s;
                return regeneratorRuntime.wrap(function(t) {
                    for (;;) switch (t.prev = t.next) {
                        case 0:
                            return a = e.commit, r = "email" === n.type ? Ce.player.checkConfirmationEmail : Ce.player.checkConfirmationPhone, i = JSON.stringify({ code: n.code }), t.next = 5, Yt.a.post(r, i);
                        case 5:
                            return o = t.sent, a(Ve, { type: n.type, data: !1 }), o.data.success ? (a(Ye, { type: n.type, data: !0 }), a(ze, { type: n.type, data: !1 }), a($e, { type: n.type, data: !1 })) : (s = n.hasOwnProperty("useCodeType") && n.useCodeType ? n.type + "_code" : "code", a(We, { type: s, message: "Ошибка при заполнении" })), t.abrupt("return", o);
                        case 9:
                        case "end":
                            return t.stop()
                    }
                }, t)
            }));
            return function(e, n) { return t.apply(this, arguments) }
        }()), Object(it.a)(ae, "getBonus", (un = Object(ot.a)(regeneratorRuntime.mark(function t(e) {
            var n, a, r, i, o, s;
            return regeneratorRuntime.wrap(function(t) {
                for (;;) switch (t.prev = t.next) {
                    case 0:
                        return n = e.commit, t.prev = 1, a = Ce.player.getNodepbonus, t.next = 5, Yt.a.get(a);
                    case 5:
                        r = t.sent, i = r.data, o = i.success, s = i.message, o ? (n(Je, r.data.data), n(Xe, !0)) : (n(Ke, s), n(Xe, !0)), n(Be, !1), t.next = 14;
                        break;
                    case 11:
                        t.prev = 11, t.t0 = t.catch(1), console.log(t.t0);
                    case 14:
                    case "end":
                        return t.stop()
                }
            }, t, null, [
                [1, 11]
            ])
        })), function(t) { return un.apply(this, arguments) })), Object(it.a)(ae, "showRemainingBonus", function() {
            var t = Object(ot.a)(regeneratorRuntime.mark(function t(e) {
                var n, a, r, i, o;
                return regeneratorRuntime.wrap(function(t) {
                    for (;;) switch (t.prev = t.next) {
                        case 0:
                            return n = e.commit, t.prev = 1, t.next = 4, ct.j();
                        case 4:
                            a = t.sent, r = a.data, i = r.success, o = r.message, i ? a.data.data.fsRemain > 0 && (n(Je, a.data.data), n(Xe, !0)) : (n(Ke, o), n(Xe, !0)), t.next = 12;
                            break;
                        case 9:
                            t.prev = 9, t.t0 = t.catch(1), console.log(t.t0);
                        case 12:
                        case "end":
                            return t.stop()
                    }
                }, t, null, [
                    [1, 9]
                ])
            }));
            return function(e) { return t.apply(this, arguments) }
        }()), Object(it.a)(ae, "resetConfirmed", function(t) {
            (0, t.commit)(qe)
        }), ae);

        function fn(t, e) {
            var n = Object.keys(t);
            if (Object.getOwnPropertySymbols) {
                var a = Object.getOwnPropertySymbols(t);
                e && (a = a.filter(function(e) { return Object.getOwnPropertyDescriptor(t, e).enumerable })), n.push.apply(n, a)
            }
            return n
        }

        function mn(t) {
            for (var e = 1; e < arguments.length; e++) {
                var n = null != arguments[e] ? arguments[e] : {};
                e % 2 ? fn(n, !0).forEach(function(e) { Object(it.a)(t, e, n[e]) }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(t, Object.getOwnPropertyDescriptors(n)) : fn(n).forEach(function(e) { Object.defineProperty(t, e, Object.getOwnPropertyDescriptor(n, e)) })
            }
            return t
        }
        var hn, bn, gn = (dn = {}, Object(it.a)(dn, Be, function(t, e) { t.player.wizard.show = e }), Object(it.a)(dn, Ue, function(t, e) { t.player.wizard.currentStep = e }), Object(it.a)(dn, We, function(t, e) { t.player.error = mn({}, t.player.error, {}, e) }), Object(it.a)(dn, He, function(t, e) { t.player.update = mn({}, t.player.update, {}, e) }), Object(it.a)(dn, $e, function(t, e) {
                switch (e.type) {
                    case "email":
                        t.player.dataConfirm.email.toConfirm = e.data;
                        break;
                    case "phone":
                        t.player.dataConfirm.phone.toConfirm = e.data
                }
            }), Object(it.a)(dn, Fe, function(t, e) {
                switch (e.type) {
                    case "email":
                        t.player.dataConfirm.email.gettingCode = e.data;
                        break;
                    case "phone":
                        t.player.dataConfirm.phone.gettingCode = e.data
                }
            }), Object(it.a)(dn, ze, function(t, e) {
                switch (e.type) {
                    case "email":
                        t.player.dataConfirm.email.codeIsGot = e.data;
                        break;
                    case "phone":
                        t.player.dataConfirm.phone.codeIsGot = e.data
                }
            }), Object(it.a)(dn, Ve, function(t, e) {
                switch (e.type) {
                    case "email":
                        t.player.dataConfirm.email.codeConfirmation = e.data;
                        break;
                    case "phone":
                        t.player.dataConfirm.phone.codeConfirmation = e.data
                }
            }), Object(it.a)(dn, Ye, function(t, e) {
                switch (e.type) {
                    case "email":
                        t.player.dataConfirm.email.confirmed = e.data;
                        break;
                    case "phone":
                        t.player.dataConfirm.phone.confirmed = e.data
                }
            }), Object(it.a)(dn, qe, function(t) { Object.assign(t.player.dataConfirm.email, { toConfirm: !0, gettingCode: !1, codeIsGot: !1, codeConfirmation: !1, confirmed: !1 }), Object.assign(t.player.dataConfirm.phone, { toConfirm: !0, gettingCode: !1, codeIsGot: !1, codeConfirmation: !1, confirmed: !1 }) }), Object(it.a)(dn, Je, function(t, e) { Object.assign(t.player.free_spin_bonus, e) }), Object(it.a)(dn, Ke, function(t, e) { t.player.free_spin_bonus.errorMessage = e }), Object(it.a)(dn, Xe, function(t, e) {
                var n = t.player.free_spin_bonus;
                n.show = e, e || (n.games = [], n.fsRemain = null, n.fsTotalWin = null)
            }), Object(it.a)(dn, Ze, function(t, e) { t.player.free_spin_bonus.fsRemain = e }), Object(it.a)(dn, Qe, function(t, e) { t.player.free_spin_bonus_finished = e }), Object(it.a)(dn, tn, function(t, e) { t.player.free_spin_bonus_finished.show = e.show }), Object(it.a)(dn, en, function(t, e) { t.player.authBonus.showAuthBonusModal = e }), Object(it.a)(dn, nn, function(t, e) { t.player.big_win = e }), Object(it.a)(dn, rn, function(t, e) { t.player.currency = e }), Object(it.a)(dn, an, function(t, e) { t.player.profile.show = e }), Object(it.a)(dn, on, function(t, e) { t.player.appliedBonus = Object.assign({}, t.player.appliedBonus, Object(it.a)({}, e.id, e)) }), dn),
            vn = { state: Ce, getters: h, types: b, actions: pn, mutations: gn },
            _n = function(t) { return t.isShowProfilePopup },
            yn = function(t) { return t.currentSection },
            On = function(t) { return t.isLoadedPlayerBalance },
            wn = function(t) { return t.playerBalance },
            Sn = function(t) { return t.isShowCashbackAsk },
            Cn = function(t) { return t.balance },
            En = function(t) { return t.balance.balances.right.value },
            jn = function(t) { return t.balance.balances.left.value },
            Pn = "SHOW_PROFILE_POPUP",
            In = "CURRENT_SECTION",
            kn = "SET_IS_LOADED_PLAYER_BALANCE",
            Dn = "SET_PLAYER_BALANCE",
            Tn = "SHOW_CASHBACK_ASK",
            An = null;

        function Ln(t, e) {
            var n = Object.keys(t);
            if (Object.getOwnPropertySymbols) {
                var a = Object.getOwnPropertySymbols(t);
                e && (a = a.filter(function(e) { return Object.getOwnPropertyDescriptor(t, e).enumerable })), n.push.apply(n, a)
            }
            return n
        }
        var Rn, Mn, xn = {
                state: { isShowCashbackAsk: !1, isShowProfilePopup: !1, currentSection: "dashboard", isLoadedPlayerBalance: !1, playerBalance: { balance: null, currency: null, cashUrl: null, compPoints: null, bonus: { targetRp: null, currentRp: null, fsTotal: null, fsRemain: null, fsTotalWin: null, balance: null } }, balance: { balances: { left: { name: "", value: 0 }, right: { name: "", value: 0 } }, currency: "", mode: "", hasCashback: !1, dailyWheel: !1, wagerBonus: { enabled: !1, progressbar: { position: 0, scale: { start: 0, "7x": 883, "14x": 1667, finish: 2500 } } } } },
                getters: g,
                types: v,
                actions: (hn = {
                    showModal: function(t, e) {
                        var n = t.commit;
                        switch (e) {
                            case "profile":
                                n(Pn, !0)
                        }
                    }
                }, Object(it.a)(hn, "actionCurrentSection", function(t, e) {
                    (0, t.commit)(In, e)
                }), Object(it.a)(hn, "initBalance", function(t) {
                    var e = t.getters,
                        n = t.dispatch;
                    n("getPlayerBalance"), An = setInterval(function() {
                        if (!e.login) return clearInterval(An), void(An = null);
                        n("getPlayerBalance")
                    }, 2e4)
                }), Object(it.a)(hn, "getPlayerBalance", function() {
                    var t = Object(ot.a)(regeneratorRuntime.mark(function t(e) {
                        var n, a, r, i, o;
                        return regeneratorRuntime.wrap(function(t) {
                            for (;;) switch (t.prev = t.next) {
                                case 0:
                                    return n = e.dispatch, a = e.commit, r = e.getters, t.prev = 1, t.next = 4, Object(ct.b)({ accountID: r.login });
                                case 4:
                                    i = t.sent, "string" == typeof(o = i.data) && (console.log("Get balance: Empty response Or Wrong Type"), n("removeLogin")), o.success ? (a("SET_BALANCE", o), a(kn, !0)) : (console.log("Get balance: success = false"), n("removeLogin")), t.next = 14;
                                    break;
                                case 10:
                                    t.prev = 10, t.t0 = t.catch(1), console.log("Get balance: Some Network error"), n("removeLogin");
                                case 14:
                                case "end":
                                    return t.stop()
                            }
                        }, t, null, [
                            [1, 10]
                        ])
                    }));
                    return function(e) { return t.apply(this, arguments) }
                }()), Object(it.a)(hn, "setPlayerBalance", function(t, e) {
                    (0, t.commit)("SET_BALANCE", e)
                }), Object(it.a)(hn, "showCashbackAsk", function(t) {
                    (0, t.commit)(Tn, !0)
                }), Object(it.a)(hn, "hideCashbackAsk", function(t) {
                    (0, t.commit)(Tn, !1)
                }), hn),
                mutations: (bn = {}, Object(it.a)(bn, Pn, function(t, e) { t.isShowProfilePopup = e }), Object(it.a)(bn, In, function(t, e) { t.currentSection = e }), Object(it.a)(bn, kn, function(t, e) { t.isLoadedPlayerBalance = e }), Object(it.a)(bn, Dn, function(t, e) {
                    t.playerBalance = function(t) {
                        for (var e = 1; e < arguments.length; e++) {
                            var n = null != arguments[e] ? arguments[e] : {};
                            e % 2 ? Ln(n, !0).forEach(function(e) { Object(it.a)(t, e, n[e]) }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(t, Object.getOwnPropertyDescriptors(n)) : Ln(n).forEach(function(e) { Object.defineProperty(t, e, Object.getOwnPropertyDescriptor(n, e)) })
                        }
                        return t
                    }({}, e)
                }), Object(it.a)(bn, Tn, function(t, e) { t.isShowCashbackAsk = e }), Object(it.a)(bn, "SET_BALANCE", function(t, e) { t.balance = e }), bn)
            },
            Nn = function(t) { return t.isShowTournamentPopup },
            Bn = function(t) { return t.tournamentType },
            Un = function(t) { return t.tournamentData },
            Wn = function(t) { return t.isShowTournamentWinners },
            Gn = function(t) { return t.tournamentWinners },
            Hn = function(t) { return t.tournamentSubscribedId },
            $n = function(t) { return t.tournamentBet },
            Fn = function(t) { return t.isShowNodepBonusAlert },
            zn = function(t) { return t.hasWins },
            Vn = "SHOW_TOURNAMENT_POPUP",
            Yn = "TOURNAMENT_TYPE",
            qn = "TOURNAMENT_DATA",
            Jn = "SHOW_TOURNAMENT_WINNERS",
            Zn = "TOURNAMENT_WINNERS",
            Kn = "TOURNAMENT_SUBSCRIBED_ID",
            Xn = "TOURNAMENT_BET",
            Qn = "SET_IS_NODEP_BONUS_ALERT",
            ta = "SET_HAS_WINS",
            ea = {
                state: { isShowTournamentPopup: !1, tournamentType: "", tournamentData: null, isShowTournamentWinners: !1, tournamentWinners: [], tournamentSubscribedId: null, tournamentBet: {}, hasWins: null, isShowNodepBonusAlert: !1 },
                getters: _,
                types: y,
                actions: {
                    showTournamentPopup: function(t, e) {
                        var n = t.commit;
                        n(Vn, !0), n(Yn, e.type), n(qn, e.data)
                    },
                    showTournamentWinners: function(t, e) {
                        var n = t.commit;
                        n(Jn, !0), n(Zn, e)
                    },
                    setTournamentWinners: function(t, e) {
                        (0, t.commit)(Zn, e)
                    },
                    setTournamentSubscribedId: function(t, e) {
                        (0, t.commit)(Kn, e)
                    },
                    setTournamentBet: function(t, e) {
                        (0, t.commit)(Xn, e)
                    },
                    setIsNodepbonusAlert: function(t, e) {
                        (0, t.commit)(Qn, e)
                    },
                    setHasWins: function(t, e) {
                        (0, t.commit)(ta, e)
                    }
                },
                mutations: (Rn = {}, Object(it.a)(Rn, Vn, function(t, e) { t.isShowTournamentPopup = e }), Object(it.a)(Rn, Yn, function(t, e) { t.tournamentType = e }), Object(it.a)(Rn, qn, function(t, e) { t.tournamentData = e }), Object(it.a)(Rn, Jn, function(t, e) { t.isShowTournamentWinners = e }), Object(it.a)(Rn, Zn, function(t, e) { t.tournamentWinners = e }), Object(it.a)(Rn, Kn, function(t, e) { t.tournamentSubscribedId = e }), Object(it.a)(Rn, Xn, function(t, e) { t.tournamentBet = Object.assign({}, t.tournamentBet, e) }), Object(it.a)(Rn, Qn, function(t, e) { t.isShowNodepBonusAlert = e }), Object(it.a)(Rn, ta, function(t, e) { t.hasWins = e }), Rn)
            },
            na = { activityDefault: [], activityWebsocket: [], activityVisible: [] },
            aa = function(t) { return t.activityWebsocket },
            ra = function(t) { return t.activityVisible },
            ia = "ACTIVITY_DEFAULT",
            oa = "ACTIVITY_WEBSOCKET",
            sa = "ACTIVITY_VISIBLE",
            ca = {
                setDefaultActivities: function(t, e) {
                    var n = t.commit,
                        a = t.state,
                        r = t.dispatch,
                        i = t.getters;
                    n(ia, e), n(sa, e);
                    var o = {},
                        s = 0;
                    setInterval(function() { s > 20 ? (s = 0, o = function() { for (var t = "abcdefghijklmnopqrstuvwxyz0123456789", e = "", n = 0; n < 13; n++) e += t.charAt(Math.floor(Math.random() * t.length)); return { type: "start", id: e, data: { description: "Подтверди телефон \nи получи", value: "77FS", bonusId: 377 } } }(), r("changeActivityVisible", o)) : a.activityWebsocket.length > 0 && (s = i.isConfirmed ? 0 : s + 1, o = a.activityWebsocket[0], r("removeActivityWebsocket"), r("changeActivityVisible", o)) }, 2e3)
                },
                addActivityWebsocket: function(t, e) {
                    var n = t.commit;
                    na.activityWebsocket.push(e), n(oa, na.activityWebsocket)
                },
                removeActivityWebsocket: function(t) {
                    var e = t.commit;
                    na.activityWebsocket.shift(), e(oa, na.activityWebsocket)
                },
                changeActivityVisible: function(t, e) {
                    var n = t.commit;
                    na.activityVisible.unshift(e), na.activityVisible.pop(), n(sa, na.activityVisible)
                }
            };
        var ua = (Mn = {}, Object(it.a)(Mn, ia, function(t, e) { t.activityDefault = e }), Object(it.a)(Mn, oa, function(t, e) { t.activityWebsocket = e }), Object(it.a)(Mn, sa, function(t, e) { t.activityVisible = e }), Mn),
            la = { state: na, getters: O, types: w, actions: ca, mutations: ua };
        C.a.use(E.a);
        var da, pa = e.a = new E.a.Store({
            state: { isLoadedAllGames: !1, appInitialData: {}, isLoading: !1, siteLocation: "ua", language: "ru", modals: [], features: { confirmPhoneBonus: {}, jackpots: { available: !1, enabled: !1 }, referral: { available: !1, enabled: !1, hasPhone: !1 }, dailyWheel: { available: !1, enabled: !1 } } },
            getters: a,
            types: r,
            actions: ht,
            mutations: _t,
            plugins: [(da = { timeout: 1e4 }, function(t) {
                var e;
                t.subscribe((e = Object(ot.a)(regeneratorRuntime.mark(function e(n) {
                    return regeneratorRuntime.wrap(function(e) {
                        for (;;) switch (e.prev = e.next) {
                            case 0:
                                if ("SET_APP_INITIAL_DATA" !== n.type || n.payload.appMain.isGuest) { e.next = 4; break }
                                return e.next = 3, t.dispatch("getPlayerBalance");
                            case 3:
                                setInterval(function() { t.dispatch("getPlayerBalance") }, da.timeout);
                            case 4:
                            case "end":
                                return e.stop()
                        }
                    }, e)
                })), function(t) { return e.apply(this, arguments) }))
            }), function(t) {
                var e;
                t.subscribe((e = Object(ot.a)(regeneratorRuntime.mark(function t(e) {
                    return regeneratorRuntime.wrap(function(t) {
                        for (;;) switch (t.prev = t.next) {
                            case 0:
                                if (e.payload) { t.next = 2; break }
                                return t.abrupt("return");
                            case 2:
                                "SHOW_REGISTER_MODAL" === e.type && Ot({ eventLabel: "Регистрации", isOpen: !0 }), "SHOW_LOGIN_MODAL" === e.type && Ot({ eventLabel: "Вход", isOpen: !0 }), "SHOW_SELECT_CURRENCY" === e.type && Ot({ eventLabel: "Завершите регистрацию", isOpen: !0 }), "SHOW_CREATE_PASSWORD" === e.type && Ot({ eventLabel: "Придумайте пароль", isOpen: !0 }), "SET_SHOW_BIG_WIN" === e.type && Ot({ eventLabel: "Круто, но это всего лишь фантики…", isOpen: !0 });
                            case 7:
                            case "end":
                                return t.stop()
                        }
                    }, t)
                })), function(t) { return e.apply(this, arguments) }))
            }],
            modules: { auth: ie, players: vn, game: pe, cashback: he, referral: ve, dailywheel: Se, profile: xn, tournament: ea, activity: la }
        })
    },
    d775: function(t, e, n) {
        "use strict";
        var a = n("2303");
        n.n(a).a
    },
    e075: function(t, e, n) {},
    e32f: function(t, e, n) {
        "use strict";
        n.d(e, "b", function() { return u }), n.d(e, "c", function() { return l }), n.d(e, "a", function() { return d });
        n("8e6e"), n("ac6a"), n("456d");
        var a = n("bd86"),
            r = (n("28a5"), n("6b59"));

        function i(t, e) {
            var n = Object.keys(t);
            if (Object.getOwnPropertySymbols) {
                var a = Object.getOwnPropertySymbols(t);
                e && (a = a.filter(function(e) { return Object.getOwnPropertyDescriptor(t, e).enumerable })), n.push.apply(n, a)
            }
            return n
        }
        var o = { eventAction: "" },
            s = { "": "Главная страница", games: "Страница игр", tournaments: "Страница турниров" };

        function c() { return s[window.location.pathname.split("/")[1]] }

        function u(t) { try { o = t } catch (t) { console.log(t) } }

        function l(t) {
            try {
                var e = "".concat(c(), ", Турниры, участвовать, ").concat(t.title);
                o = { eventAction: e }
            } catch (t) { console.log(t) }
        }

        function d(t) {
            try {
                var e = t.bonus;
                if (!t.bonus) return;
                var n = "".concat(e.heading, " ").concat(e.subTitle),
                    s = { eventCategory: "Регистрация 777" };
                Object(r.a)(function(t) {
                    for (var e = 1; e < arguments.length; e++) {
                        var n = null != arguments[e] ? arguments[e] : {};
                        e % 2 ? i(n, !0).forEach(function(e) { Object(a.a)(t, e, n[e]) }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(t, Object.getOwnPropertyDescriptors(n)) : i(n).forEach(function(e) { Object.defineProperty(t, e, Object.getOwnPropertyDescriptor(n, e)) })
                    }
                    return t
                }({}, s, {}, o, {}, { eventLabel: n }))
            } catch (t) { console.log(t) }
        }
    },
    e8ff: function(t, e, n) {},
    f754: function(t, e, n) {
        "use strict";
        var a = n("6e27");
        n.n(a).a
    }
});