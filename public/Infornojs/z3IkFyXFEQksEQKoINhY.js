//EW
!(function(e) {
    "use strict";
    "function" == typeof define && define.amd ?
        define(["jquery"], e) :
        "undefined" != typeof exports ?
        (module.exports = e(require("jquery"))) :
        e(jQuery);
})(function(e) {
    "use strict";
    var t = window.EasyWheel || {};
    ((t = (function() {
        return function(t, r) {
            var n,
                o = this;
            (o.defaults = {
                items: [
                    { name: "Win", color: "#3498db" },
                    { name: "Lose", color: "#ffc107" },
                ],
                width: 400,
                fontSize: 14,
                textOffset: 8,
                textLine: "h",
                textArc: !1,
                letterSpacing: 0,
                textColor: "#fff",
                centerWidth: 45,
                shadow: "#fff0",
                shadowOpacity: 0,
                centerLineWidth: 5,
                centerLineColor: "#424242",
                centerBackground: "#8e44ad",
                sliceLineWidth: 5,
                sliceLineColor: "#424242",
                selectedSliceColor: "#333",
                outerLineColor: "#424242",
                outerLineWidth: 5,
                centerImage: "",
                centerHtml: "",
                centerHtmlWidth: 45,
                centerImageWidth: 45,
                rotateCenter: !1,
                centerClass: "",
                button: "",
                easing: "easyWheel",
                markerAnimation: !0,
                markerColor: "#CC3333",
                selector: !1,
                selected: !1,
                random: !1,
                type: "spin",
                duration: 8e3,
                rotates: 8,
                max: 0,
                frame: 6,
                ajax: null,
                onStart: function(e, t, r) {},
                onStep: function(e, t, r) {},
                onProgress: function(e, t, r) {},
                onComplete: function(e, t, r) {},
                onFail: function(e, t, r) {},
            }),
            (n = e(t).data("easyWheel") || {}),
            (o.o = e.extend({}, o.defaults, r, n)),
            (o.initials = {
                slice: { id: null, results: null },
                currentSliceData: { id: null, results: null },
                winner: 0,
                rotates: parseInt(o.o.rotates),
                spinCount: 0,
                counter: 0,
                now: 0,
                resetCount: 0,
                currentSlice: 0,
                currentStep: 0,
                lastStep: 0,
                slicePercent: 0,
                circlePercent: 0,
                items: o.o.items,
                spinning: !1,
                inProgress: !1,
                nonce: null,
                $wheel: e(t),
            }),
            e.extend(o, o.initials),
                e.extend(e.easing, {
                    easyWheel: function(e, t, r, n, o) {
                        return -n * ((t = t / o - 1) * t * t * t - 1) + r;
                    },
                }),
                e.extend(e.easing, {
                    easeOutQuad: function(e, t, r, n, o) {
                        return -n * (t /= o) * (t - 2) + r;
                    },
                }),
                e.extend(e.easing, {
                    MarkerEasing: function(e) {
                        var t = 1 - Math.pow(1 - 6 * e, 2);
                        return t < 0 && (t = 0), t;
                    },
                }),
                (o.instanceUid = "ew" + o.guid()),
                o.validate(),
                o.init();
        };
    })()).prototype.validate = function(t) {
        var r = this;
        r.rotates < 1 &&
            ((r.rotates = 1), console.log("warning", 'Min number of rotates is "1"')),
            parseInt(r.o.sliceLineWidth) > 10 &&
            ((r.o.sliceLineWidth = 10),
                console.log("warning", 'Max sliceLineWidth is "10"')),
            parseInt(r.o.centerLineWidth) > 10 &&
            ((r.o.centerLineWidth = 10),
                console.log("warning", 'Max centerLineWidth is "10"')),
            parseInt(r.o.outerLineWidth) > 10 &&
            ((r.o.outerLineWidth = 10),
                console.log("warning", 'Max outerLineWidth is "10"')),
            void 0 === e.easing[e.trim(r.o.easing)] && (r.o.easing = "easyWheel");
    }),
    (t.prototype.destroy = function(t) {
        var r = this;
        r.spinning && r.spinning.finish(),
            "boolean" == typeof t &&
            !0 === t &&
            r.$wheel.html("").removeClass(r.instanceUid),
            e.extend(r.o, r.defaults),
            e.extend(r, r.initials),
            e(document).off("click." + r.instanceUid),
            e(document).off("resize." + r.instanceUid);
    }),
    (t.prototype.option = function(t, r) {
        var n = this;
        if (-1 === e.inArray(typeof r, ["undefined", "function"]) &&
            -1 === e.inArray(typeof n.o[t], ["undefined", "function"])
        ) {
            var o = ["easing", "type", "duration", "rotates", "max"]; -
            1 != e.inArray(t, o) && (n.o[t] = r);
        }
    }),
    (t.prototype.finish = function() {
        var e = this;
        e.spinning && e.spinning.finish();
    }),
    (t.prototype.init = function() {
        var e = this;
        e.initialize(), e.execute();
    }),
    (t.prototype.initialize = function() {
        var t = this;
        t.$wheel.addClass("easyWheel " + t.instanceUid);
        var r = 360 / t.totalSlices(),
            n = 0,
            o = 0;
        t.$wheel.html("");
        var i = e("<div/>").addClass("eWheel-wrapper").appendTo(t.$wheel),
            a = e("<div/>").addClass("eWheel-inner").appendTo(i),
            s = e("<div/>").addClass("eWheel").prependTo(a),
            l = e("<div/>").addClass("eWheel-bg-layer").appendTo(s),
            c = e(
                t.SVG("svg", {
                    version: "1.1",
                    xmlns: "http://www.w3.org/2000/svg",
                    "xmlns:xlink": "http://www.w3.org/1999/xlink",
                    x: "0px",
                    y: "0px",
                    viewBox: "0 0 200 200",
                    "xml:space": "preserve",
                    style: "enable-background:new 0 0 200 200;",
                })
            );
        c.appendTo(l);
        var d = e("<g/>"),
            p = e("<g/>");
        if (
            (d.addClass("ew-slicesGroup").appendTo(c),
                "string" == typeof t.o.shadow && "" !== e.trim(t.o.shadow))
        ) {
            var u = e(
                    t.SVG("radialGradient", {
                        id: "SVGID_1_",
                        cx: "50%",
                        cy: "50%",
                        r: "50%",
                        gradientUnits: "userSpaceOnUse",
                    })
                ).appendTo(c),
                h =
                t.SVG("stop", {
                    offset: "0.1676",
                    style: "stop-color:" + t.o.shadow + ";stop-opacity:1",
                }).outerHTML +
                t.SVG("stop", {
                    offset: "0.5551",
                    style: "stop-color:" + t.o.shadow + ";stop-opacity:1",
                }).outerHTML +
                t.SVG("stop", {
                    offset: "0.6189",
                    style: "stop-color:" + t.o.shadow + ";stop-opacity:1",
                }).outerHTML +
                t.SVG("stop", {
                    offset: "1",
                    style: "stop-color:" + t.o.shadow + ";stop-opacity:0",
                }).outerHTML;
            e(h).appendTo(u),
                e(
                    t.SVG("circle", {
                        cx: "50%",
                        cy: "50%",
                        r: "50%",
                        "stroke-width": "0",
                        "fill-opacity": parseInt(t.o.shadowOpacity) < 9 ?
                            "0." + parseInt(t.o.shadowOpacity) : 1,
                        fill: "url(#SVGID_1_)",
                    })
                ).appendTo(c);
        }
        if (
            (p.appendTo(c), "v" === t.o.textLine || "vertical" === t.o.textLine)
        ) {
            var f = e("<div/>");
            f.addClass("eWheel-txt-wrap"), f.appendTo(s);
            var g = e("<div/>");
            g.addClass("eWheel-txt"),
                g.css({
                    "-webkit-transform": "rotate(" + (-360 / t.totalSlices() / 2 + t.getDegree()) + "deg)",
                    "-moz-transform": "rotate(" + (-360 / t.totalSlices() / 2 + t.getDegree()) + "deg)",
                    "-ms-transform": "rotate(" + (-360 / t.totalSlices() / 2 + t.getDegree()) + "deg)",
                    "-o-transform": "rotate(" + (-360 / t.totalSlices() / 2 + t.getDegree()) + "deg)",
                    transform: "rotate(" + (-360 / t.totalSlices() / 2 + t.getDegree()) + "deg)",
                }),
                g.appendTo(f);
        } else {
            var m = e("<g/>"),
                w = e("<defs/>");
            w.appendTo(c), m.appendTo(c);
        }
        var y = e("<div/>");
        if (
            (y.addClass("eWheel-center"),
                y.addClass(t.o.centerClass),
                y.appendTo(!0 === t.o.rotateCenter || "true" === t.o.rotateCenter ? s : a),
                "string" == typeof t.o.centerHtml &&
                "" === e.trim(t.o.centerHtml) &&
                "string" == typeof t.o.centerImage &&
                "" !== e.trim(t.o.centerImage))
        ) {
            var v = e("<img />");
            parseInt(t.o.centerImageWidth) ||
                (t.o.centerImageWidth = parseInt(t.o.centerWidth)),
                v.css("width", parseInt(t.o.centerImageWidth) + "%"),
                v.attr("src", t.o.centerImage),
                v.appendTo(y),
                y.append(
                    '<div class="ew-center-empty" style="width:' +
                    parseInt(t.o.centerImageWidth) +
                    "%; height:" +
                    parseInt(t.o.centerImageWidth) +
                    '%" />'
                );
        }
        if ("string" == typeof t.o.centerHtml && "" !== e.trim(t.o.centerHtml)) {
            var S = e('<div class="ew-center-html">' + t.o.centerHtml + "</div>");
            parseInt(t.o.centerHtmlWidth) ||
                (t.o.centerHtmlWidth = parseInt(t.o.centerWidth)),
                S.css({
                    width: parseInt(t.o.centerHtmlWidth) + "%",
                    height: parseInt(t.o.centerHtmlWidth) + "%",
                }),
                S.appendTo(y);
        }
        "color" !== e.trim(t.o.type) &&
            e("<div/>")
            .addClass("eWheel-marker")
            .appendTo(i)
            .append(
                '<svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 80 115" style="enable-background:new 0 0 80 115;" xml:space="preserve"><g><path fill="' +
                t.o.markerColor +
                '" d="M40,0C17.9,0,0,17.7,0,39.4S40,115,40,115s40-53.9,40-75.6S62.1,0,40,0z M40,52.5c-7,0-12.6-5.6-12.6-12.4 S33,27.7,40,27.7s12.6,5.6,12.6,12.4C52.6,46.9,47,52.5,40,52.5z"/><path fill="rgba(0, 0, 0, 0.3)" d="M40,19.2c-11.7,0-21.2,9.3-21.2,20.8S28.3,60.8,40,60.8S61.2,51.5,61.2,40S51.7,19.2,40,19.2z M40,52.5 c-7,0-12.6-5.6-12.6-12.4S33,27.7,40,27.7s12.6,5.6,12.6,12.4C52.6,46.9,47,52.5,40,52.5z"/></g></svg>'
            ),
            e.each(t.items, function(i, a) {
                var s = (360 / t.totalSlices()) * i;
                o += r;
                var l = t.annularSector({
                    centerX: 100,
                    centerY: 100,
                    startDegrees: n,
                    endDegrees: o,
                    innerRadius: parseInt(t.o.centerWidth),
                    outerRadius: 100.5 - parseInt(t.o.outerLineWidth),
                });
                d.append(
                        t.SVG("path", {
                            "stroke-width": 0,
                            fill: a.color,
                            "data-fill": a.color,
                            d: l,
                        })
                    ),
                    p.append(
                        t.SVG("path", {
                            "stroke-width": 0,
                            fill: t.o.sliceLineColor,
                            d: t.annularSector({
                                centerX: 100,
                                centerY: 100,
                                startDegrees: o + 0.2,
                                endDegrees: o - 0.2,
                                innerRadius: parseInt(t.o.centerWidth),
                                outerRadius: 100.5 - parseInt(t.o.outerLineWidth),
                            }, !0),
                        })
                    );
                var c =
                    "auto" !== e.trim(t.o.textColor) ?
                    e.trim(t.o.textColor) :
                    t.brightness(a.color);
                if ("v" === t.o.textLine || "vertical" === t.o.textLine) {
                    var u = e("<div/>");
                    u.addClass("eWheel-title"),
                        u.html(a.name),
                        u.css({
                            paddingRight: parseInt(t.o.textOffset) + "%",
                            "-webkit-transform": "rotate(" + s + "deg) translate(0px, -50%)",
                            "-moz-transform": "rotate(" + s + "deg) translate(0px, -50%)",
                            "-ms-transform": "rotate(" + s + "deg) translate(0px, -50%)",
                            "-o-transform": "rotate(" + s + "deg) translate(0px, -50%)",
                            transform: "rotate(" + s + "deg) translate(0px, -50%)",
                            color: c,
                        }),
                        u.appendTo(g),
                        t.toNumber(t.o.letterSpacing) > 0 &&
                        g.css("letter-spacing", t.toNumber(t.o.letterSpacing));
                } else {
                    var h =
                        '<text stroke-width="0" fill="' +
                        c +
                        '" dy="' +
                        t.toNumber(t.o.textOffset) +
                        '%"><textPath xlink:href="#ew-text-' +
                        i +
                        '" startOffset="50%" style="text-anchor: middle;">' +
                        a.name +
                        "</textPath></text>";
                    m.css("font-size", parseInt(t.o.fontSize) / 2),
                        parseInt(t.o.letterSpacing) > 0 &&
                        m.css("letter-spacing", parseInt(t.o.letterSpacing)),
                        m.append(h);
                    var f = /(^.+?)L/.exec(l)[1];
                    if (!0 !== t.o.textArc) {
                        var y = /(^.+?),/,
                            v = /(^.+?)A/.exec(f),
                            S = f.replace(v[0], ""),
                            x = y.exec(S),
                            I = S.replace(x[1], 0);
                        f = f.replace(S, I);
                    }
                    w.append(
                        t.SVG("path", {
                            "stroke-width": 0,
                            fill: "none",
                            id: "ew-text-" + i,
                            d: f,
                        })
                    );
                }
                var W = e("<div/>");
                W.html(a), W.appendTo(u), (n += r);
            });
        var x = parseInt(t.o.sliceLineWidth);
        if (
            ("v" !== t.o.textLine || t.o.textLine, parseInt(t.o.centerWidth) > x)
        ) {
            var I = t.SVG("circle", {
                class: "centerCircle",
                cx: "100",
                cy: "100",
                r: parseInt(t.o.centerWidth) + 1,
                stroke: t.o.centerLineColor,
                "stroke-width": parseInt(t.o.centerLineWidth),
                fill: t.o.centerBackground,
            });
            e(I).appendTo(c);
        }
        var W = t.SVG("circle", {
            cx: "100",
            cy: "100",
            r: 100 - parseInt(t.o.outerLineWidth) / 2,
            stroke: t.o.outerLineColor,
            "stroke-width": parseInt(t.o.outerLineWidth),
            "fill-opacity": 0,
            fill: "#fff0",
        });
        e(W).appendTo(c), l.html(l.html());
    }),
    (t.prototype.toNumber = function(e) {
        return NaN === Number(e) ? 0 : Number(e);
    }),
    (t.prototype.SVG = function(e, t) {
        var r = document.createElementNS("http://www.w3.org/2000/svg", e);
        for (var n in t) r.setAttribute(n, t[n]);
        return r;
    }),
    (t.prototype.annularSector = function(e, t) {
        var r = this,
            n = parseInt(r.o.sliceLineWidth),
            o = r.oWithDefaults(e),
            i = [
                [
                    o.cx + o.r2 * Math.cos(((e.startDegrees + n / 4) * Math.PI) / 180),
                    o.cy + o.r2 * Math.sin(((e.startDegrees + n / 4) * Math.PI) / 180),
                ],
                [
                    o.cx + o.r2 * Math.cos(((e.endDegrees - n / 4) * Math.PI) / 180),
                    o.cy + o.r2 * Math.sin(((e.endDegrees - n / 4) * Math.PI) / 180),
                ],
                [
                    o.cx + o.r1 * Math.cos(((e.endDegrees - n) * Math.PI) / 180),
                    o.cy + o.r1 * Math.sin(((e.endDegrees - n) * Math.PI) / 180),
                ],
                [
                    o.cx + o.r1 * Math.cos(((e.startDegrees + n) * Math.PI) / 180),
                    o.cy + o.r1 * Math.sin(((e.startDegrees + n) * Math.PI) / 180),
                ],
            ],
            a = (o.closeRadians - o.startRadians) % (2 * Math.PI) > Math.PI ? 1 : 0,
            s = 1,
            l = 0;
        !0 === t && n >= parseInt(r.o.centerWidth) ?
            ((s = 0), (l = 1)) :
            !0 !== t && n >= parseInt(r.o.centerWidth) && ((s = 1), (l = 1));
        var c = [];
        return (
            c.push("M" + i[0].join()),
            c.push("A" + [o.r2, o.r2, 0, a, s, i[1]].join()),
            c.push("L" + i[2].join()),
            c.push("A" + [o.r1, o.r1, 0, a, l, i[3]].join()),
            c.push("z"),
            c.join(" ")
        );
    }),
    (t.prototype.oWithDefaults = function(e) {
        var t = {
                cx: e.centerX || 0,
                cy: e.centerY || 0,
                startRadians: ((e.startDegrees || 0) * Math.PI) / 180,
                closeRadians: ((e.endDegrees || 0) * Math.PI) / 180,
            },
            r = void 0 !== e.thickness ? e.thickness : 100;
        return (
            void 0 !== e.innerRadius ?
            (t.r1 = e.innerRadius) :
            void 0 !== e.outerRadius ?
            (t.r1 = e.outerRadius - r) :
            (t.r1 = 200 - r),
            void 0 !== e.outerRadius ? (t.r2 = e.outerRadius) : (t.r2 = t.r1 + r),
            t.r1 < 0 && (t.r1 = 0),
            t.r2 < 0 && (t.r2 = 0),
            t
        );
    }),
    (t.prototype.brightness = function(e) {
        var t, r, n, o;
        return (
            e.match(/^rgb/) ?
            ((t = (e = (e = e.match(/rgba?\(([^)]+)\)/)[1])
                    .split(/ *, */)
                    .map(Number))[0]),
                (r = e[1]),
                (n = e[2])) :
            "#" == e[0] && 7 == e.length ?
            ((t = parseInt(e.slice(1, 3), 16)),
                (r = parseInt(e.slice(3, 5), 16)),
                (n = parseInt(e.slice(5, 7), 16))) :
            "#" == e[0] &&
            4 == e.length &&
            ((t = parseInt(e[1] + e[1], 16)),
                (r = parseInt(e[2] + e[2], 16)),
                (n = parseInt(e[3] + e[3], 16))),
            (o = (299 * t + 587 * r + 114 * n) / 1e3),
            o < 125 ? "#fff" : "#333"
        );
    }),
    (t.prototype.guid = function(e) {
        var t = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ",
            r = "";
        e || (e = 8);
        for (var n = 0; n < e; n++)
            r += t.charAt(Math.floor(Math.random() * t.length));
        return r;
    }),
    (t.prototype.randomColor = function() {
        for (var e = "#", t = 0; t < 6; t++)
            e += "0123456789ABCDEF" [Math.floor(16 * Math.random())];
        return e;
    }),
    (t.prototype.FontScale = function(e) {
        var t = this,
            r =
            1 +
            (1 * (t.$wheel.width() - parseInt(t.o.width))) / parseInt(t.o.width);
        r > 4 ? (r = 4) : r < 0.1 && (r = 0.1),
            t.$wheel.find(".eWheel-wrapper").css("font-size", 100 * r + "%");
    }),
    (t.prototype.numberToArray = function(e) {
        var t,
            r = [];
        for (t = 0; t < e; t++) r[t] = t;
        return r;
    }),
    (t.prototype.totalSlices = function() {
        return this.items.length;
    }),
    (t.prototype.getDegree = function(e) {
        return 360 / this.totalSlices();
    }),
    (t.prototype.degStart = function(e) {
        return 360 - this.getDegree() * e;
    }),
    (t.prototype.degEnd = function(e) {
        var t = this;
        return 360 - (t.getDegree() * e + t.getDegree());
    }),
    (t.prototype.getRandomInt = function(e, t) {
        return Math.floor(Math.random() * (t - e + 1) + e);
    }),
    (t.prototype.calcSliceSize = function(e) {
        var t = this,
            r = t.degStart(e) - (parseInt(t.o.sliceLineWidth) + 2),
            n = t.degEnd(e) + (parseInt(t.o.sliceLineWidth) + 2),
            o = [];
        return (o.start = r), (o.end = n), o;
    }),
    (t.prototype.toObject = function(e) {
        for (var t = {}, r = 0; r < e.length; ++r)
            void 0 !== e[r] && (t[r] = e[r]);
        return t;
    }),
    (t.prototype.WinnerSelector = function() {
        var t = this,
            r = {};
        return (
            "string" == typeof t.o.selector &&
            (e.each(t.items, function(e, n) {
                    if (
                        "object" == typeof n[t.o.selector] ||
                        "array" == typeof n[t.o.selector] ||
                        void 0 === n[t.o.selector]
                    )
                        return !1;
                    r[e] = n[t.o.selector];
                }),
                r)
        );
    }),
    (t.prototype.findWinner = function(t, r) {
        var n = this,
            o = void 0;
        if (
            "custom" !== r &&
            ("string" != typeof n.o.selector || "number" == typeof t)
        ) {
            if (void 0 === n.items[t]) return;
            return t;
        }
        return (
            e.each(n.items, function(e, r) {
                "object" != typeof r[n.o.selector] &&
                    "array" != typeof r[n.o.selector] &&
                    void 0 !== r[n.o.selector] &&
                    r[n.o.selector] === t &&
                    (o = e);
            }),
            o
        );
    }),
    (t.prototype.selectedSliceID = function(t) {
        var r = this,
            n = r.WinnerSelector();
        if (((r.selected = r.o.selected), "object" === e.type(r.selected))) {
            if (void 0 !== r.selected[0] && void 0 !== r.selected[0].selectedIndex)
                return r.selected[0].selectedIndex;
        } else if ("array" === e.type(r.selected))
            !1 !== r.o.selector ?
            (r.selected = e.map(n, function(e, n) {
                if (e === r.o.selected[t]) return n;
            })) :
            (r.selected = r.selected[t]);
        else if ("string" === e.type(r.selected) && !1 !== r.o.selector)
            r.selected = r.findWinner(r.selected);
        else if ("number" !== e.type(r.selected)) return;
        if (void 0 !== r.findWinner(parseInt(r.selected)))
            return parseInt(r.selected);
    }),
    (t.prototype.ajax = function(t) {
        var r = this;
        (t.dataType = "json"),
        (t.cache = !1),
        void 0 === t.data && (t.data = {}), !0 === t.nonce &&
            ((t.data.nonce = r.guid(8)), (r.nonce = t.data.nonce)),
            0 !== r.counter ?
            (t.data.lastSpin = r.slice.results) :
            (t.data.lastSpin = !1),
            e.ajax(t).done(function(t) {
                e.isArray(t) && (t = r.toObject(t)),
                    r.nonce &&
                    ("string" != typeof t.nonce &&
                        console.log(
                            "error",
                            "Nonce Type Incorrect try to use POST Methode with nonce id"
                        ),
                        t.nonce !== r.nonce) ?
                    r.o.onFail.call(r.$wheel, r.slice.results, r.spinCount, r.now) :
                    (void 0 !== t.selector &&
                        ((r.o.selector = t.selector), (r.o.selected = [t.winner])),
                        (void 0 === t.stop || (!0 !== t.stop && "true" !== t.stop)) &&
                        r.run(t.winner));
            });
    }),
    (t.prototype.start = function() {
        var t = this;
        e.isPlainObject(t.o.ajax) && !e.isEmptyObject(t.o.ajax) ?
            t.ajax(t.o.ajax) :
            t.run();
    }),
    (t.prototype.run = function(t) {
        var r = this;
        if (!r.inProgress) {
            if (t || 0 === t) {
                var n = r.findWinner(t, "custom");
                if (void 0 === n) return;
                r.slice.id = n;
            } else {
                if (0 !== r.o.max && r.counter >= r.o.max) return;
                if (!1 !== r.o.selector) r.slice.id = r.selectedSliceID(r.resetCount);
                else {
                    if (!0 !== r.o.random) return;
                    r.slice.id = r.getRandomInt(0, r.totalSlices() - 1);
                }
                if (!0 !== r.o.random && r.totalSlices() <= r.resetCount) return;
                if (
                    (!0 === r.o.random &&
                        r.totalSlices() <= r.resetCount &&
                        (r.resetCount = 0),
                        void 0 === r.slice.id)
                )
                    return r.resetCount++, void r.run(t);
            }
            if (((r.inProgress = !0), void 0 !== r.items[r.slice.id])) {
                (r.slice.results = r.items[r.slice.id]),
                (r.slice.length = r.slice.id),
                r.o.onStart.call(r.$wheel, r.slice.results, r.spinCount, r.now);
                var o = r.calcSliceSize(r.slice.id),
                    i = r.getRandomInt(o.start, o.end),
                    a = 360 * parseInt(r.rotates) + i;
                (r.lastStep = -1), (r.currentStep = 0);
                var s,
                    l = !1,
                    c = r.numberToArray(r.totalSlices()).reverse();
                if (0 !== parseInt(r.o.frame)) {
                    var d = e.fx.interval;
                    e.fx.interval = parseInt(r.o.frame);
                }
                (r.spinning = e({ deg: r.now }).animate({ deg: a }, {
                    duration: parseInt(r.o.duration),
                    easing: e.trim(r.o.easing),
                    step: function(t, n) {
                        0 !== parseInt(r.o.frame) &&
                            (e.fx.interval = parseInt(r.o.frame)),
                            (r.now = t % 360),
                            "color" !== e.trim(r.o.type) &&
                            r.$wheel
                            .find(".eWheel")
                            .css({
                                "-webkit-transform": "rotate(" + r.now + "deg)",
                                "-moz-transform": "rotate(" + r.now + "deg)",
                                "-ms-transform": "rotate(" + r.now + "deg)",
                                "-o-transform": "rotate(" + r.now + "deg)",
                                transform: "rotate(" + r.now + "deg)",
                            }),
                            (r.currentStep = Math.floor(t / (360 / r.totalSlices()))),
                            (r.currentSlice = c[r.currentStep % r.totalSlices()]);
                        var o = r.totalSlices(),
                            i = 1600 / o,
                            a = (((1600 / 360) * r.now) / 1600) * 100,
                            p =
                            (((r.currentSlice + 1) * i -
                                    (1600 - (1600 / 360) * r.now)) /
                                i) *
                            100;
                        if (
                            ((r.slicePercent = p),
                                (r.circlePercent = a),
                                r.o.onProgress.call(
                                    r.$wheel,
                                    r.slicePercent,
                                    r.circlePercent
                                ),
                                r.lastStep !== r.currentStep)
                        ) {
                            if (
                                ((r.lastStep = r.currentStep), !0 === r.o.markerAnimation &&
                                    -1 ===
                                    e.inArray(e.trim(r.o.easing), [
                                        "easeInElastic",
                                        "easeInBack",
                                        "easeInBounce",
                                        "easeOutElastic",
                                        "easeOutBack",
                                        "easeOutBounce",
                                        "easeInOutElastic",
                                        "easeInOutBack",
                                        "easeInOutBounce",
                                    ]))
                            ) {
                                var u = parseInt(r.o.duration) / r.totalSlices();
                                (s = -38),
                                l && l.stop(),
                                    (l = e({ deg: 0 }).animate({ deg: s }, {
                                        easing: "MarkerEasing",
                                        duration: u / 2,
                                        step: function(t) {
                                            e(".eWheel-marker").css({
                                                "-webkit-transform": "rotate(" + t + "deg)",
                                                "-moz-transform": "rotate(" + t + "deg)",
                                                "-ms-transform": "rotate(" + t + "deg)",
                                                "-o-transform": "rotate(" + t + "deg)",
                                                transform: "rotate(" + t + "deg)",
                                            });
                                        },
                                    }));
                            }
                            "color" === e.trim(r.o.type) ?
                                (r.$wheel
                                    .find("svg>g.ew-slicesGroup>path")
                                    .each(function(t) {
                                        e(this)
                                            .attr("class", "")
                                            .attr("fill", e(this).attr("data-fill"));
                                    }),
                                    r.$wheel
                                    .find("svg>g.ew-slicesGroup>path")
                                    .eq(r.currentSlice)
                                    .attr("class", "ew-ccurrent")
                                    .attr("fill", r.o.selectedSliceColor),
                                    r.$wheel
                                    .find(".eWheel-txt>.eWheel-title")
                                    .removeClass("ew-ccurrent"),
                                    r.$wheel
                                    .find(".eWheel-txt>.eWheel-title")
                                    .eq(r.currentSlice)
                                    .addClass("ew-ccurrent")) :
                                (r.$wheel
                                    .find("svg>g.ew-slicesGroup>path")
                                    .attr("class", ""),
                                    r.$wheel
                                    .find("svg>g.ew-slicesGroup>path")
                                    .eq(r.currentSlice)
                                    .attr("class", "ew-current"),
                                    r.$wheel
                                    .find(".eWheel-txt>.eWheel-title")
                                    .removeClass("ew-current"),
                                    r.$wheel
                                    .find(".eWheel-txt>.eWheel-title")
                                    .eq(r.currentSlice)
                                    .addClass("ew-current")),
                                (r.currentSliceData.id = r.currentSlice),
                                (r.currentSliceData.results =
                                    r.items[r.currentSliceData.id]),
                                (r.currentSliceData.results.length = r.currentSliceData.id),
                                r.o.onStep.call(
                                    r.$wheel,
                                    r.currentSliceData.results,
                                    r.slicePercent,
                                    r.circlePercent
                                );
                        }
                        0 !== parseInt(r.o.frame) && (e.fx.interval = d);
                    },
                    fail: function(e, t, n) {
                        (r.inProgress = !1),
                        r.o.onFail.call(
                            r.$wheel,
                            r.slice.results,
                            r.spinCount,
                            r.now
                        );
                    },
                    complete: function(e, t, n) {
                        (r.inProgress = !1),
                        r.o.onComplete.call(
                            r.$wheel,
                            r.slice.results,
                            r.spinCount,
                            r.now
                        );
                    },
                })),
                r.counter++,
                    r.spinCount++,
                    r.resetCount++;
            }
        }
    }),
    (t.prototype.execute = function() {
        var t = this;
        (t.currentSlice = t.totalSlices() - 1),
        "string" == typeof t.o.button &&
            "" !== e.trim(t.o.button) &&
            e(document).on("click." + t.instanceUid, t.o.button, function(e) {
                e.preventDefault(), t.start();
            }),
            t.$wheel.css("font-size", parseInt(t.o.fontSize)),
            t.$wheel.width(parseInt(t.o.width)),
            t.$wheel.height(t.$wheel.width()),
            t.$wheel.find(".eWheel-wrapper").width(t.$wheel.width()),
            t.$wheel.find(".eWheel-wrapper").height(t.$wheel.width()),
            t.FontScale(),
            e(window).on("resize." + t.instanceUid, function() {
                t.$wheel.height(t.$wheel.width()),
                    t.$wheel.find(".eWheel-wrapper").width(t.$wheel.width()),
                    t.$wheel.find(".eWheel-wrapper").height(t.$wheel.width()),
                    t.FontScale();
            });
    }),
    (e.fn.easyWheel = function() {
        var r,
            n,
            o = this,
            i = arguments[0],
            a = Array.prototype.slice.call(arguments, 1),
            s = Array.prototype.slice.call(arguments, 2),
            l = o.length,
            c = ["destroy", "start", "finish", "option"];
        for (r = 0; r < l; r++)
            if (
                ("object" == typeof i || void 0 === i ?
                    (o[r].easyWheel = new t(o[r], i)) :
                    -1 !== e.inArray(e.trim(i), c) &&
                    (n =
                        "option" === e.trim(i) ?
                        o[r].easyWheel[i].apply(o[r].easyWheel, a, s) :
                        o[r].easyWheel[i].apply(o[r].easyWheel, a)),
                    void 0 !== n)
            )
                return n;
        return o;
    });
});

//WS
var ConnectionCheckInterval = 6e4,
    WebSocketConnector = function(e, t, o) {
        (this.socketURL = e),
        (this.onMessage = t),
        (this.onConnect = o), !1 in window || this._initConnect();
    };
(WebSocketConnector.prototype.closeCurrentConnection = function() {
    this.webSocketObj &&
        ((this.webSocketObj.onopen = null),
            (this.webSocketObj.onmessage = null),
            (this.webSocketObj.onclose = null),
            this.webSocketObj.close(),
            (this.webSocketObj = null));
}),
(WebSocketConnector.prototype.forceNewConnection = function() {
    this._initConnect();
}),
(WebSocketConnector.prototype._initValues = function() {
    this.closeCurrentConnection(),
        (this.socketConnectionReady = !1),
        this.checkTimeout && clearTimeout(this.checkTimeout),
        (this.checkTimeout = null);
}),
(WebSocketConnector.prototype._initConnect = function() {
    var e = this;
    this._initValues(),
        (this.webSocketObj = new WebSocket(this.socketURL)),
        (this.webSocketObj.onopen = function() {
            e._checkConnect(), e.onConnect();
        }),
        (this.webSocketObj.onmessage = function(t) {
            t.data && e.onMessage(t.data);
        }),
        (this.webSocketObj.onclose = function() {
            e._initConnect();
        });
}),
(WebSocketConnector.prototype._checkConnect = function() {
    var e = this;
    null != this.webSocketObj &&
        3 != this.webSocketObj.readyState &&
        2 != this.webSocketObj.readyState ?
        (1 == e.webSocketObj.readyState && (e.socketConnectionReady = !0),
            (this.checkTimeout = setTimeout(function() {
                e._checkConnect();
            }, ConnectionCheckInterval))) :
        e._initConnect();
});

//JP DW

var hit_id = "",
    spin_sound = "",
    countdown_timer = "",
    light_timer = "";

function check_timer(e, i) {
    toggleDailyEntryTimer();
    // notify('Sorry, Ibrar please make daily whel system first', "danger", 3)
    if ($("#balance_holder").hasClass("spin")) {
        notify("Please wait for the balance to update.", "danger", 3);
        return;
    }
    if (i) {
        if (1 == $(i).attr("data-clicked")) return;
        $(i).attr("data-clicked", 1);
    }
    $.post( "./dailybonus", { _token: $('meta[name=csrf-token]').attr('content'), time: timeNow() },
        function(t) {
            t.request?refresh_balance(null,null,true):0;
            $("#daliy_win_band span").text(t.reason),
                0 == e ?
                1 != t.spin && (stop_countdown(), countdown(t.reason)) :
                1 == t.spin ?
                (w_set_spinner(t.winner, "50.00"),
                    w_start_light(),
                    stop_countdown()) :
                (0 == t.message && (stop_countdown(), countdown(t.reason)),
                    notify(t.reason, t.alert, 3)),
                $(i).attr("data-clicked", 0),
                mobileDetect() && toggleNaV(lastNav);
        },
        "json"
    );
}

function pad(e, i) {
    for (var t = e + ""; t.length < i;) t = "0" + t;
    return t;
}

function show_error() {
    $("#dw_error").toggleClass("hide");
}

function w_start_light() {
    light_timer = setInterval(function() {
        $(".wheel_lights,.j_wheel_lights").toggleClass("hide");
    }, 1e3);
}

function w_stop_light() {
    clearInterval(light_timer);
}
var wheel_theme = '<div id="w_wheel_holder">';
wheel_theme += '<div id="w_wheel_border">';
for (var i = 1; i < 17; i++)
    (wheel_theme += '<span class="deg' + i + '">'),
    (wheel_theme +=
        '<img src="' +
     
        './assets/img/off.png" class="light_off hide wheel_lights">'),
    (wheel_theme +=
        '<img src="' +
        site_url +
        '/assets/img/red.png" class="red wheel_lights">'),
    (wheel_theme += "</span>");

function w_set_spinner(e, i) {
    $("#daily_win_wheel_holder").addClass("show");
    var t;
    (t = e.toString()),
    $("#daily_win_wheel").easyWheel({
        items: [{
                id: "1",
                name: "500",
                message: "Congratulation you got grand",
                color: "#fecb00",
            },
            {
                id: "2",
                name: "100",
                message: "Congratulation you got mini",
                color: "#a8d300",
            },
            {
                id: "3",
                name: "200",
                message: "Congratulation you got major",
                color: "#43a800",
            },
            {
                id: "4",
                name: "100",
                message: "Congratulation you got Minor",
                color: "#2b9f88",
            },
            {
                id: "5",
                name: "500",
                message: "Congratulation you got grant",
                color: "#00a9d4",
            },
            {
                id: "6",
                name: "3000",
                message: "Congratulation you got mini",
                color: "#3637c7",
            },
            {
                id: "7",
                name: "200",
                message: "Congratulation you got major",
                color: "#5a2b9f",
            },
            {
                id: "8",
                name: "4000",
                message: "Congratulation you got Minor",
                color: "#8800aa",
            },
            {
                id: "9",
                name: "1000",
                message: "Congratulation you got grant",
                color: "#fd00cc",
            },
            {
                id: "10",
                name: "200",
                message: "Congratulation you got mini",
                color: "#fe0065",
            },
            {
                id: "11",
                name: "500",
                message: "Congratulation you got major",
                color: "#d20000",
            },
            {
                id: "12",
                name: "5000",
                message: "Congratulation you got Minor",
                color: "#fe6400",
            },
        ],
        button: ".w_spin-button",
        centerHtml: wheel_theme,
        centerHtmlWidth: 100,
        duration: 8e3,
        frame: 1,
        easing: "easyWheel",
        rotateCenter: !1,
        type: "spin",
        markerAnimation: !1,
        centerClass: 0,
        width: 600,
        fontSize: 20,
        textOffset: 20,
        letterSpacing: 0,
        textLine: "v",
        textArc: !1,
        shadowOpacity: 0,
        sliceLineWidth: 1,
        outerLineWidth: 2,
        centerWidth: 30,
        centerLineWidth: 2,
        centerImageWidth: 30,
        centerBackground: "#858688",
        textColor: "#fff",
        markerColor: "#CC3333",
        centerLineColor: "rgb(236, 240, 241)",
        sliceLineColor: "rgb(236, 240, 241)",
        outerLineColor: "rgb(236, 240, 241)",
        shadow: "#000",
        selectedSliceColor: "hsv(0, 0%, 10%)",
        selector: "id",
        selected: ["Winner", t],
        onStep: function() {
            spin_sound.play();
        },
        onComplete: function(e, i, t) {
            $("#djptb-win-amount").text(parseInt(e.name) / 100 + ".00"),
                $("#w_spin-button").removeClass("spin-button"),
                $("#dwinAnimation").addClass("show"),
                $("#daily_win_wheel_holder.show").removeClass("show"),
                (hit_id = e.name);
        },
    });
}

function win_animation_daily_wheel() {
    (spin_sound = new Audio(site_url + "/assets/sound/tick.mp3")),
    $("#overlay").before(
        "<div id='dwinAnimation' style='z-index: 100000; position: fixed;'>            <div class='jptb-animation'>            <div class='jptb-animation-container' style='height: 1089px; width: 1089px; font-size: 16px;'>            <div class='jptb-animation-light1'></div>            <div class='jptb-animation-light2'></div>            <div class='jptb-animation-wrap'>            <div class='jptb-animation-coins'></div>            <div class='jptb-animation-jackpot'></div>            </div>            <div class='jptb-animation-table'>            <div class='jptb-animation-amount'><span id='jptb-win-currency'>USD</span><span id='djptb-win-amount'>00.00</span></div>            <div class='jptb-animation-counter'>DAILY WHEEL</div>            </div>            <button class='jptb-animation-continue' id='djptb-animation-continue' onclick='dw_give(this)'>Continue</button></div>            </div>            </div>"
    );
}

function dw_give(e) {
    $("#dwinAnimation.show,#daily_win_wheel_holder.show").removeClass("show"),
        $("#daily_win_wheel").remove(),
        $(e).removeAttr("onclick"),
        $("#daily_win_wheel_holder").html(
            '<h1>DAILY FREE WHEEL ENTRY</h1><div id="daily_win_wheel"></div>'
        ),
        w_stop_light(),
        refresh_balance(),
        $.post(
            site_url + "/user_actions/dailyWheelTimeCheck.php", { time: timeNow() },
            function(e) {
                null != e && ((time_text = e.the_time), countdown(time_text));
            },
            "json"
        );
}

function show_dw_bar() {

    $("#daliy_win_bar").toggleClass("hide"),
    $("#show_dw_bar").toggleClass("hide");
}

function makeDailyWheel() {
    var e = "Daily Entry";
    $.post(
        site_url + "/user_actions/dailyWheelTimeCheck.php", { time: timeNow() },
        function(i) {
            null != i && countdown((e = i.the_time)),
                $("#overlay").before(
                    "            <div id='dailyWheelToggle' onclick='toggleDailyEntryTimer()'>            <video playsinline autoplay muted loop poster='" +
                    site_url +
                    "/assets/img/wheel.gif' id='bgvid'>            <source src='" +
                    site_url +
                    "/assets/img/wheel.webm' type='video/webm'>            </video>            </div>            <div id='dw_error' class='hide' onclick='show_error()'>            <i class='fa fa-times-circle' onclick='show_error()'></i>            <div id='dw_message'>            <p>You do not meet the Daily Wheel Rules. </p>            <p>(must have 100 in total bets in 24 hours, min of 5 deposit in 3 days)</p>            </div>            </div>            <div id='daliy_win_bar' class='hide'>            <div id='daliy_win_holder'>            <i onclick='toggleDailyEntryTimer()' id='close_dw_bar'><img src='" +
                    site_url +
                    "/assets/img/close.svg'></i>            <video playsinline autoplay muted loop poster='" +
                    site_url +
                    "/assets/img/wheel.gif' id='daliy_win_img'  data-clicked='0'>            <source src='" +
                    site_url +
                    "/assets/img/wheel.webm' type='video/webm'>            </video>            <div id='daliy_win_band'>            <img src='" +
                    site_url +
                    "/assets/spinner/band.png'  data-clicked='0'>            <span  data-clicked='0'>" +
                    e +
                    "</span>            </div>            </div>            </div>"
                ),
                win_animation_daily_wheel();
        }
    );
}

function pad(e, i) {
    for (var t = e + ""; t.length < i;) t = "0" + t;
    return t;
}
var checkwheel=false;
function toggleDailyEntryTimer() {
 
    if(checkwheel){
        show_dw_bar();
    }
    $("body #dailyWheelToggle,body #daliy_win_bar").toggleClass("hide");
    checkwheel=!checkwheel;
}

function countdown(e) {
    var i = e.split(":"),
        t = i[0],
        n = i[1],
        o = i[2];
    countdown_timer = setInterval(function() {
        if (((o -= 1), 0 == t && 0 == n && 0 == o)) {
            var e = "DAILY ENTRY";
            stop_countdown();
        } else {
            o < 0 && ((o = 59), (n -= 1)),
                n < 0 && ((n = 59), (t -= 1)),
                (t < 1 || t < 0) && (t = 0);
            e = pad(t, 2) + ":" + pad(n, 2) + ":" + pad(o, 2);
        }
        $("#daliy_win_band span").text(e);
    }, 1e3);
}

function stop_countdown() {
    clearInterval(countdown_timer);
}

function setConnection() {
    // var e = new WebSocketConnector(
    //     "wss://infernoslots.net:9432",
    //     function(e) {
    //         e = JSON.parse(e);
    //         processJackPot(e);
    //     },
    //     function() {}
    // );
    // window.addEventListener(
    //     "close",
    //     function(i) {
    //         e.closeCurrentConnection();
    //     }, !1
    // );
}
(wheel_theme += "</div>"),
(wheel_theme += '<div class="w_spin-button" id="w_spin-button"></div>'),
(wheel_theme += "</div>");
var check_for_iframe = "",
    check__not_for_iframe = "",
    jp_timer = "",
    jp_called = 0,
    hit_name = ((hit_id = ""), ""),
    jp_given = 0;

function win_animation_jackpot_wheel() {
    (spin_sound = new Audio(site_url + "/assets/sound/tick.mp3")),
    $("body").append(
        "<div id='winAnimation' style='z-index: 100000; position: fixed;'>\t\t<div class='jptb-animation'>\t\t<div class='jptb-animation-container' style='height: 1089px; width: 1089px; font-size: 16px;'>\t\t<div class='jptb-animation-light1'></div>\t\t<div class='jptb-animation-light2'></div>\t\t<div class='jptb-animation-wrap'>\t\t<div class='jptb-animation-coins'></div>\t\t<div class='jptb-animation-jackpot'></div>\t\t</div>\t\t<div class='jptb-animation-table'>\t\t<div class='jptb-animation-amount'><span id='jptb-win-currency'>USD</span><span id='jptb-win-amount'>00.00</span></div>\t\t<div class='jptb-animation-counter' id='jp_name_text'>BONUS USD</div>\t\t</div>\t\t<button class='jptb-animation-continue' id='jptb-animation-continue' onclick='give_jp(this)'>Continue</button></div>\t\t</div>\t\t</div>"
    );
}

function start_light() {
    light_timer = setInterval(function() {
        $(".wheel_lights,.j_wheel_lights").toggleClass("hide");
    }, 1e3);
}

function stop_light() {
    clearInterval(light_timer);
}
var j_wheel_theme = '<div id="j_wheel_holder">';
j_wheel_theme += '<div id="j_wheel_border">';
for (i = 1; i < 17; i++)
    (j_wheel_theme += '<span class="deg' + i + '">'),
    (j_wheel_theme +=
        '<img src="' +
        site_url +
        '/assets/img/off.png" class="light_off hide j_wheel_lights">'),
    (j_wheel_theme +=
        '<img src="' +
        site_url +
        '/assets/img/red.png" class="red j_wheel_lights">'),
    (j_wheel_theme += "</span>");

function set_spinner(e, i) {
    start_light(),
        $(".spinner").easyWheel({
            items: [{
                    id: "x",
                    name: "MINOR",
                    message: "Congratulation you got grand",
                    color: "#fecb00",
                },
                {
                    id: "Mini",
                    name: "MINI",
                    message: "Congratulation you got mini",
                    color: "#a8d300",
                },
                {
                    id: "Major",
                    name: "MAJOR",
                    message: "Congratulation you got major",
                    color: "#43a800",
                },
                {
                    id: "Minor",
                    name: "MINOR",
                    message: "Congratulation you got Minor",
                    color: "#2b9f88",
                },
                {
                    id: "h",
                    name: "MAJOR",
                    message: "Congratulation you got grant",
                    color: "#00a9d4",
                },
                {
                    id: "f",
                    name: "MINI",
                    message: "Congratulation you got mini",
                    color: "#3637c7",
                },
                {
                    id: "e",
                    name: "MAJOR",
                    message: "Congratulation you got major",
                    color: "#5a2b9f",
                },
                {
                    id: "g",
                    name: "MINOR",
                    message: "Congratulation you got Minor",
                    color: "#8800aa",
                },
                {
                    id: "i",
                    name: "MINI",
                    message: "Congratulation you got grant",
                    color: "#fd00cc",
                },
                {
                    id: "j",
                    name: "MAJOR",
                    message: "Congratulation you got mini",
                    color: "#fe0065",
                },
                {
                    id: "Grand",
                    name: "GRAND",
                    message: "Congratulation you got major",
                    color: "#d20000",
                },
                {
                    id: "l",
                    name: "MINI",
                    message: "Congratulation you got Minor",
                    color: "#fe6400",
                },
            ],
            button: ".j_spin-button",
            centerHtml: j_wheel_theme,
            centerHtmlWidth: 100,
            duration: 9e3,
            frame: 1,
            easing: "easyWheel",
            rotateCenter: !1,
            type: "spin",
            markerAnimation: !1,
            centerClass: 0,
            width: 600,
            fontSize: 20,
            textOffset: 20,
            letterSpacing: 0,
            textLine: "v",
            textArc: !1,
            shadowOpacity: 0,
            sliceLineWidth: 1,
            outerLineWidth: 2,
            centerWidth: 30,
            centerLineWidth: 2,
            centerImageWidth: 30,
            centerBackground: "#858688",
            textColor: "#fff",
            markerColor: "#CC3333",
            centerLineColor: "rgb(236, 240, 241)",
            sliceLineColor: "rgb(236, 240, 241)",
            outerLineColor: "rgb(236, 240, 241)",
            shadow: "#000",
            selectedSliceColor: "hsv(0, 0%, 10%)",
            selector: "id",
            selected: ["Winner", e.toString()],
            onStep: function() {
                spin_sound.play();
            },
            onComplete: function(e, t, n) {
                jQuery("#jptb-win-amount").text(i),
                    jQuery("#spin-button").removeClass("j_spin-button"),
                    jQuery("#winAnimation").addClass("show"),
                    jQuery("#jp_name_text").text(e.name);
            },
        });
}

function give_jp(e) {
    (jp_given = 15),
    $("#winAnimation.show,#jackpot_spin.show,.spin_overlay.show").removeClass(
            "show"
        ),
        $("#the_spinner").remove(),
        stop_light(),
        $(e).removeAttr("onclick"),
        $("#jackpot_spin").html('<div class="spinner" id="the_spinner"></div>'),
        $.post(
            site_url + "/user_actions/giveJackpot.php", { hid: hit_id },
            function(e, i) {
                refresh_balance();
            }
        );
}
(j_wheel_theme += "</div>"),
(j_wheel_theme += '<div class="j_spin-button" id="j_spin-button"></div>'),
(j_wheel_theme += "</div>");

//CFS
function check_spin() {
    if (getCookie("ngs") == 0) {
        return false;
    }
    var e = site_url + "/user_actions/check_free_spins.php";
    $.post(
        e,
        function(e, s) {
            if ("Success" == e.status) {
                $("body .notify_spin").remove();
                var i = JSON.parse(e.bonus.id_bonus_type),
                    n = e.bonus.free_rounds,
                    o = e.bonus.id_bonuses,
                    r = (e.bonus.created_dt, "");
                if (0 == e.bonus.game_selected)
                    for (var t = 0; t < i.length; t++) {
                        var a = gameFinder("id", i[t])[0];
                        r += freeSpinPopUpGameMaker(a, o);
                    }
                else {
                    a = gameFinder("GameID", e.bonus.game_selected)[0];
                    r += freeSpinPopUpGameMaker(a, o);
                }
                var _ =
                    "<div class='notify_spin'>\t                    <div class='notify_spin_closer' onclick='hide_notify_spin()'><img src='" +
                    site_url +
                    "/assets/img/close.svg'></div>\t                    <div class='notify_spin_header'><i class='fa fa-refresh'></i> YOU HAVE <strong>" +
                    n +
                    " FREE SPINS</strong></div>\t                    <div class='notify_spin_game_row'>" +
                    r +
                    "</div>\t                    </div>";
                $("#overlay").before(_);
            }
        },
        "json"
    );
}

function hide_notify_spin() {
    jQuery("body .notify_spin").remove();
}

//NewGames

function new_games_maker(e, a, t, o) {
    if (o) s = '"notify(' + "'Bonus already played.','danger',3" + ');"';
    else if (t)
        if (e.GameID == t)
            var s =
                '"openGame(' +
                ("'" +
                    e.GameID +
                    "','" +
                    e.Name.replace("'", " ") +
                    "','RU'," +
                    a +
                    ",'" +
                    e.SectionId +
                    "'") +
                ');"';
        else
            var s =
                '"notify(' +
                "'You Have a game selected for this bonus','danger',3" +
                ');"';
    else
        s =
        '"openGame(' +
        ("'" +
            e.GameID +
            "','" +
            e.Name.replace("'", " ") +
            "','RU'," +
            a +
            ",'" +
            e.SectionId +
            "'") +
        ');hide_new_games()"';
    return (
        "        <a href='javascript:void(0)' class='winners__image-link' onclick=" +
        s +
        ">        <div class='gameplay-img is-inside-winners'>        <img alt='' class='gameplay-img__img' src='" +
        site_url +
        "/assets/game_images/" +
        e.GameID +
        ".jpg' lazy='loaded'>        <div class='gameplay-img__hover'>        <div class='gameplay-img__hover-play'>        </div>        </div>        </div></a>"
    );
}

function new_games() {
    $("body .notify_spin").remove();
    var i = JSON.parse("[1890, 1906, 1894]");
    var r = "";
    for (var t = 0; t < i.length; t++) {
        var a = gameFinder("id", i[t])[0],
            o = "xxx";
        r += new_games_maker(a, 0);
    }
    var _ =
        "<div class='notify_spin'>\t                    <div class='notify_spin_closer' onclick='hide_new_games(1)'><img src='" +
        site_url +
        "/assets/img/close.svg'></div>\t                    <div class='notify_spin_header'><i class='fa fa-refresh'></i> TRY OUT OUR <strong>NEW GAMES</strong></div>\t                    <div class='notify_spin_game_row'>" +
        r +
        "</div>\t                    </div>";
    $("#overlay").before(_);
}

function hide_new_games(do_spin_check) {
    jQuery("body .notify_spin").remove();
    setCookie("ngs", 1, 1);
    if (do_spin_check == 1) check_spin();
    var e = site_url + "/user_actions/hide_new_palyer.php";
    $.post(e, function(e, s) {}, "json");
}
//ST
function toggleSideTab() {
    $(".sideTabToggle").toggleClass("close"),
        $(".sideTabToggle").hasClass("close") ?
        (setCookie("sideTabs", "close", 1),
            $(".sideTabAction").animate({ width: 0, padding: 0 }),
            toggleRef(!0),
            "function" == typeof togglePv && togglePv(!0)) :
        (setCookie("sideTabs", "", 1),
            $(".sideTabAction").animate({ width: 30, padding: 20 }));
}

function tabScroll(e) {
    var i = $(e).attr("data-go"),
        o = $(e).attr("data-scroll");
    "down" == i
        ?
        ($(e).attr("data-go", "up").toggleClass("down"),
            $(o).scrollTop($("#phone_verification_noti").height() - 50)) :
        ($(e).attr("data-go", "down").toggleClass("down"), $(o).scrollTop(0));
}

function toggleRef(e) {
    // $("body #phone_verification_home").length > 0 && togglePv(!0);
    // var i =
    //     "<div id='referal_system_home' class='side_tab_action' style='left:" +
    //     ($("#sideTabs").width() + 5) +
    //     "px;'>        <div id='rf_code_holder' 1=''>        <div id='ref_agreement'><img src='" +
    //     site_url +
    //     "/assets/img/agreement.svg'></div>        <h1>EARN MORE</h1>        <p>        Refer a friend and get $5 instantly for each new customer that deposits a minimum of $5. To refer a friend simply create a referral code and give each person you refer a unique code. The new player must provide the code to the        agent at signup and a $5 deposit will be made instantly.        </p>        <p style='font-size: 18px; margin: 15px 0 10px 0;'><strong>Your code is</strong></p>        <div class='rf_code_wrap'>        <div><span id='the_code'>" +
    //     getLatest() +
    //     "</span>&nbsp;        <span class='clipBoard' data-clipboard-target='#the_code' onclick='copyCode(this)' style='background-image:url(" +
    //     site_url +
    //     "/assets/img/copy.svg)'></span></div>        <div><a href='" +
    //     site_url +
    //     "/profile.php?p=referral-code'>GET MORE</a></div>        </div>        </div>        </div>";
    // $("body #referal_system_home").length > 0 || 1 == e ?
    //     $("body #referal_system_home").remove() :
    //     $("#sideTabs").after(i);
}
if (0 == getUserInfo().skipphoneverify && 0 == getUserInfo().phone_verified) {
    function togglePv(e) {
        $("body #referal_system_home").length > 0 && toggleRef(!0);
        for (var i = $("#sideTabs").width() + 5, o = "", t = 1; t < 10; t++)
            o =
            o +
            "<li>                <div onclick='number_click(" +
            t +
            ",this)' data-target='#verify_number_for_promo input'>                <span>" +
            t +
            "</span>                </div>                </li>";
        var a =
            "<div id='phone_verification_home' class='side_tab_action' style='left:" +
            i +
            "px;'>            <img src='" +
            site_url +
            "/assets/img/next.svg' id='phone_verification_home_scroll' onclick='tabScroll(this)' data-scroll='#phone_verification_home' data-go='down'>            <div id='phone_verification_noti'>            <div class='row noti'>            <h1 class='col-md-12' style='text-align: center;'>GET $5 BONUS</h1>            <div class='col-md-6 text_holder'>            <h3 style='margin-bottom: 25px;'>Bonus Rules</h3>            <p>Verify your phone number and get a $5 credit to your account instantly. Verifying your number will unlock our welcome package as well as future promotions.</p>            <p>To get a bonus now:</p>            <p>Enter your phone and number and click Verify Now, you will then receive a SMS with a code, you will need to enter this code in the next step to unlock this feature.</p>            <p>You can only use a number once</p>            </div>            <div class='col-md-6 form_loder'>            <form action='" +
            site_url +
            "/user_actions/sendCode.php?input' method='post' id='verify_number_for_promo' class='before_submit' onsubmit='sendCode(this);return false;'>            <input type='text' name='number' placeholder='(000) 000-0000' value='" +
            getUserInfo().Phone +
            "' />            </form>            <form action='" +
            site_url +
            "/user_actions/verifyCode.php?input' method='post' id='verify_code_for_promo' class='after_submit hide' onsubmit='verifyCode(this);return false;'>            <input type='text' name='code' class='code' placeholder='xxxx' />            <input type='hidden' name='number' />            </form>            <div class='varification_number_pad'>            <ul>            " +
            o +
            "            <li>            <div onclick='clear_click(this)' data-target='#verify_number_for_promo input'>            <span>C</span>            </div>            </li>            <li>            <div onclick='number_click(0,this)' data-target='#verify_number_for_promo input'>            <span>0</span>            </div>            </li>            <li>            <div onclick='back_click(this)' data-target='#verify_number_for_promo input'>            <span><img src='" +
            site_url +
            "/assets/img/backspace.svg' style='width:25px' /></span>            </div>            </li>            </ul>            </div>            </div>            <div class='col-md-12 div_holder hide confirm_code'>            <div class='col-md-6 left div_holder'>&nbsp;</div>            <div class='col-md-6 div_holder' style='text-align: center;'>            <div id='int_verification' onclick='codeVerification()'>CONFIRM</div>            </div>            </div>            <div class='col-md-12 noti_div_wrapper'>            <div class='col-md-6 left div_holder'>            <div class='skip_verification' onclick='skipVerification()'>SKIP</div>            </div>            <div class='col-md-6 right div_holder'>            <div id='do_verification' onclick='do_verification()'>VERIFY NOW</div>            </div>            </div>            </div>            </div>            </div>";
        $("body #phone_verification_home").length > 0 || 1 == e ?
            $("body #phone_verification_home").remove() :
            ($("#sideTabs").after(a),
                $("#verify_number_for_promo input[name=number]").mask("(000) 000-0000"),
                $("#verify_code_for_promo .code").mask("0000"));
    }
    var already_clicked = 0;

    function skipVerification() {
        togglePv(!0),
            $("#phoneVerifyTab").remove(),
            $.post(
                site_url + "/user_actions/skipVerification.php", { time: timeNow() },
                function(e, i) {},
                "json"
            );
    }

    function codeVerification() {
        0 == already_clicked &&
            (4 == $("#verify_code_for_promo input[name=code]").val().length ?
                ((already_clicked = 1), $("#verify_code_for_promo").submit()) :
                notify("Please insert a valid code", "danger", 2));
    }

    function do_verification() {
        0 == already_clicked &&
            (14 == $("#verify_number_for_promo input[name=number]").val().length ||
                0 == $("#verify_number_for_promo input[name=number]").val().length ?
                ((already_clicked = 1), $("#verify_number_for_promo").submit()) :
                notify("Please insert a valid phone number", "danger", 2));
    }

    function sendCode(e) {
        return (
            $.ajax({
                data: $(e).serialize(),
                type: $(e).attr("method"),
                url: $(e).attr("action"),
                dataType: "json",
                success: function(e) {
                    (already_clicked = 0),
                    0 == e.inserted ?
                        notify(e.q, "danger", 2) :
                        ($("#do_verification").text("RESEND CODE"),
                            $(".before_submit").addClass("hide"),
                            $(".after_submit,.confirm_code").removeClass("hide"),
                            $("#verify_code_for_promo input[name=number]").val(
                                $("#verify_number_for_promo input[name=number]").val()
                            ),
                            $(".varification_number_pad li div").attr(
                                "data-target",
                                "#verify_code_for_promo .code"
                            ),
                            notify("Code sent to your phone", "success", 2));
                },
            }), !1
        );
    }

    function verifyCode(e) {
        return (
            $.ajax({
                data: $(e).serialize(),
                type: $(e).attr("method"),
                url: $(e).attr("action"),
                dataType: "json",
                success: function(e) {
                    (already_clicked = 0),
                    0 == e.varified ?
                        notify("Invalid Code.", "danger", 3) :
                        (togglePv(!0),
                            $("#phoneVerifyTab").remove(),
                            refresh_balance(true),
                            notify("Your phone has been verified,thanks.", "success", 3));
                },
            }), !1
        );
    }
    $(".close_number_varification").click(function() {
            $("#phone_verification_noti").addClass("hide");
        }),
        $("#verify_number_for_promo").submit(function() {});
    var lastScrollTop = 0;

    function number_click(e, i) {
        var o = jQuery(i).attr("data-target"),
            t = jQuery(o).val();
        t.length < 14 &&
            jQuery(o)
            .val(jQuery(o).masked(t + e))
            .change();
    }

    function clear_click(e) {
        var i = jQuery(e).attr("data-target");
        jQuery(i).val("");
    }

    function back_click(e) {
        var i = jQuery(e).attr("data-target"),
            o = jQuery(i).val();
        o.length > 0 &&
            jQuery(i)
            .val(jQuery(i).masked(o.substring(0, o.length - 1)))
            .change();
    }
    $(
        "#mystickyelements-social-custom_five .mystickyelements-custom-html"
    ).scroll(function(e) {
        var i = $(this).scrollTop();
        i > 0 ? $(this).addClass("scrolled") : $(this).removeClass("scrolled"),
            (lastScrollTop = i);
    });
}

function loadSideTab() {
    var e = "",
        i = getCookie("sideTabs");
    "close" == i && (e = "width: 0px; padding: 0px;");
    var o =
        "<div id='sideTabs'>        <ul>        <li class='sideTabToggle " +
        i +
        "' onclick='toggleSideTab()'><img src='" +
        site_url +
        "/assets/img/next.svg'></li>        <li class='sideTabAction' onclick='toggleRef()' style='background-color: #dd9933;" +
        e +
        "'><img src='" +
        site_url +
        "/assets/img/star.svg'></li>";
    0 == getUserInfo().skipphoneverify &&
        0 == getUserInfo().phone_verified &&
        (o =
            o +
            "<li class='sideTabAction' id='phoneVerifyTab' onclick='togglePv()' style='background-color: #1e73be;" +
            e +
            "'><img src='" +
            site_url +
            "/assets/img/money.svg'></li>"),
        (o += "</ul>        </div>"),
        $("#overlay").before(o);
}

//VI

!(function(t) {
    var i = t(window);
    t.fn.visible = function(t, e, o) {
        if (!(this.length < 1)) {
            var r = this.length > 1 ? this.eq(0) : this,
                n = r.get(0),
                f = i.width(),
                h = i.height(),
                o = o ? o : "both",
                l = e === !0 ? n.offsetWidth * n.offsetHeight : !0;
            if ("function" == typeof n.getBoundingClientRect) {
                var g = n.getBoundingClientRect(),
                    u = g.top >= 0 && g.top < h,
                    s = g.bottom > 0 && g.bottom <= h,
                    c = g.left >= 0 && g.left < f,
                    a = g.right > 0 && g.right <= f,
                    v = t ? u || s : u && s,
                    b = t ? c || a : c && a;
                if ("both" === o) return l && v && b;
                if ("vertical" === o) return l && v;
                if ("horizontal" === o) return l && b;
            } else {
                var d = i.scrollTop(),
                    p = d + h,
                    w = i.scrollLeft(),
                    m = w + f,
                    y = r.offset(),
                    z = y.top,
                    B = z + r.height(),
                    C = y.left,
                    R = C + r.width(),
                    j = t === !0 ? B : z,
                    q = t === !0 ? z : B,
                    H = t === !0 ? R : C,
                    L = t === !0 ? C : R;
                if ("both" === o) return !!l && p >= q && j >= d && m >= L && H >= w;
                if ("vertical" === o) return !!l && p >= q && j >= d;
                if ("horizontal" === o) return !!l && m >= L && H >= w;
            }
        }
    };
})(jQuery);