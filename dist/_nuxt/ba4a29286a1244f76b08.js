(window.webpackJsonp=window.webpackJsonp||[]).push([[3],{345:function(n,t,e){var content=e(361);"string"==typeof content&&(content=[[n.i,content,""]]),content.locals&&(n.exports=content.locals);(0,e(13).default)("7d590730",content,!0,{sourceMap:!1})},359:function(n,t,e){"use strict";e.r(t),t.default="GrabTheNudes allows you to use the power of your CPU or GPU in combination with AI to undress anyone in just seconds. Who didn't fantasize about how a person would look like under their clothes? We made that fantasy come true with GrabTheNudes.\n\n## Community\n\nJoin our Discord community and talk with other GrabTheNudes users, just for a general talk in our members-lounge or share some pictures in our NSFW-lounge. Also, you are more than welcome to tell us your ideas about GrabTheNudes:\n\n- [Discord](https://discord.gg/ZfMpvRe)\n\n\n## Support\n\nDeveloping an application like GrabTheNudes and giving you the best expierence while using it requires time and money. Any help is welcome!\n\n- **By sending us a Bitcoin donation:** donations can be send to the following BTC address: 1JtftcQRsCMjhvdtAe2PDVPQnTntsmeyoY\n- **By sending us a Bitcoin Cash donation:** donations can be send to the following BCH address: 1FQczpBsQCA9aGCszVB2uUjSm6E8XfsbsY\n- **By sending us a Ethereum donation:** donations can be send to the following ETH address: 0xD98FBdB412BBd1A52839AF91deFa101EbEA513Ab\n- **By sending us a Litecoin donation:** donations can be send to the following LTC address: LZpEXRQVka1AYfnjNBbBCgL9GetGKCmZSz\n\n\n## Contact US\n\n- **Discord PM:** Grabthenudes#9787\n- **Skype:** live:admin_187057\n- **E-mail:** admin@grabthenudes.com\n- **Livechat through website:** [https://grabthenudes.com](https://grabthenudes.com)\n"},360:function(n,t,e){"use strict";var o=e(345);e.n(o).a},361:function(n,t,e){(n.exports=e(12)(!1)).push([n.i,"",""])},385:function(n,t,e){"use strict";e.r(t);e(70),e(29),e(30);var o=e(354),r={data:function(){return{aboutHtml:""}},created:function(){var content=e(359).default;this.aboutHtml=o.markdown.toHTML(content)},mounted:function(){var n=this;this.$nextTick(function(){var t=n.$refs.body.querySelectorAll("a"),e=!0,o=!1,r=void 0;try{for(var d,l=t[Symbol.iterator]();!(e=(d=l.next()).done);e=!0){d.value.addEventListener("click",n.openLink)}}catch(n){o=!0,r=n}finally{try{e||null==l.return||l.return()}finally{if(o)throw r}}})},methods:{openLink:function(n){n.preventDefault(),window.deepTools.shell.openExternal(n.target.href)}}},d=(e(360),e(6)),component=Object(d.a)(r,function(){var n=this.$createElement,t=this._self._c||n;return t("div",{staticClass:"about"},[t("app-title",[t("h1",{staticClass:"title"},[this._v("\n      About "+this._s(this.app.name)+"\n    ")])]),this._v(" "),t("div",{ref:"body",staticClass:"content-body markdown-content",domProps:{innerHTML:this._s(this.aboutHtml)}})],1)},[],!1,null,null,null);t.default=component.exports}}]);