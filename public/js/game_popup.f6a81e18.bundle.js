(window.webpackJsonp=window.webpackJsonp||[]).push([["game_popup"],{"0ed9":function(e,t,n){"use strict";n.r(t);var o=n("7858"),a={name:"game",components:{modal:n("163a").a},methods:{close:function(){this.$store.dispatch("updateInitInfo"),this.$store.dispatch("closeGame"),o.a.urlWithoutCurrentGame()}}},i=(n("32e8"),n("2877")),r=Object(i.a)(a,function(){var e=this.$createElement,t=this._self._c||e;return t("modal",{staticClass:"game",attrs:{className:["game-modal__in","size-1"]},on:{closeModal:this.close}},[t("div",{staticClass:"game__container",attrs:{id:"casinoClient"}},[t("iframe",{attrs:{src:this.$store.getters.game.launcher,frameborder:"0",vspace:"0",hspace:"0",marginwidth:"0",marginheight:"0",seamless:"",allowfullscreen:"",scrolling:"no"}})])])},[],!1,null,null,null);t.default=r.exports},"163a":function(e,t,n){"use strict";n("8e6e"),n("ac6a"),n("456d"),n("6762"),n("2fdb");var o=n("bd86"),a=n("2f62"),i=n("1630"),r=n("2103");function s(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);t&&(o=o.filter(function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable})),n.push.apply(n,o)}return n}function c(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?s(n,!0).forEach(function(t){Object(o.a)(e,t,n[t])}):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):s(n).forEach(function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))})}return e}var l={props:["className","contentId"],directives:{clickOutside:n.n(r).a.directive},data:function(){return{modalName:this.$parent.$options._componentTag}},mounted:function(){this.openModal({modalName:this.modalName}),document.addEventListener("keyup",this.onKeyup)},destroyed:function(){this.closeModal({modalName:this.modalName}),document.removeEventListener("keyup",this.onKeyup)},computed:c({},Object(a.d)(["modals"])),methods:c({},Object(a.b)([i.d,i.a]),{onClose:function(e){var t=this.modals[this.modals.length-1];null!=t&&("game_popup"===t.modalName&&["CLICKOUT"].includes(e)||t.modalName===this.modalName&&this.$emit("closeModal"))},onKeyup:function(e){27===e.keyCode&&this.onClose("ESC")},onClickout:function(){this.onClose("CLICKOUT")}})},u=(n("1f1d"),n("2877")),d=Object(u.a)(l,function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("transition",{attrs:{name:"modal",appear:""}},[n("div",{staticClass:"modal"},[n("div",{directives:[{name:"click-outside",rawName:"v-click-outside",value:e.onClickout,expression:"onClickout"}],staticClass:"modal__in",class:e.className},[n("button",{staticClass:"modal-close",attrs:{type:"button","aria-label":"close-modal",id:"modalDialogModalClose"},on:{click:function(t){return t.stopPropagation(),e.onClose(t)}}}),e._t("default")],2)])])},[],!1,null,null,null);t.a=d.exports},"1f1d":function(e,t,n){"use strict";var o=n("adae");n.n(o).a},2103:function(e,t,n){e.exports=function(){var e="__v-click-outside",t="undefined"!=typeof window,n="undefined"!=typeof navigator,o=t&&("ontouchstart"in window||n&&navigator.msMaxTouchPoints>0)?["touchstart"]:["click"];function a(t,n){var a=function(e){var t="function"==typeof e;if(!t&&"object"!=typeof e)throw new Error("v-click-outside: Binding value must be a function or an object");return{handler:t?e:e.handler,middleware:e.middleware||function(e){return e},events:e.events||o,isActive:!(!1===e.isActive)}}(n.value),i=a.handler,r=a.middleware;a.isActive&&(t[e]=a.events.map(function(e){return{event:e,handler:function(e){return function(e){var t=e.el,n=e.event,o=e.handler,a=e.middleware;n.target!==t&&!t.contains(n.target)&&a(n,t)&&o(n,t)}({event:e,el:t,handler:i,middleware:r})}}}),t[e].forEach(function(e){var t=e.event,n=e.handler;return setTimeout(function(){return document.documentElement.addEventListener(t,n,!1)},0)}))}function i(t){(t[e]||[]).forEach(function(e){return document.documentElement.removeEventListener(e.event,e.handler,!1)}),delete t[e]}var r={bind:a,update:function(e,t){var n=t.value,o=t.oldValue;JSON.stringify(n)!==JSON.stringify(o)&&(i(e),a(e,{value:n}))},unbind:i};return{install:function(e){e.directive("click-outside",r)},directive:r}}()},"32e8":function(e,t,n){"use strict";var o=n("bf80");n.n(o).a},adae:function(e,t,n){},bf80:function(e,t,n){}}]);