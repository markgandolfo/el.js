/**
* el.js v0.3 - A JavaScript Node Creation Tool
*
* https://github.com/markgandolfo/el.js
*
* Copyright 2013 Mark Gandolfo and other contributors
* Released under the MIT license.
* http://en.wikipedia.org/wiki/MIT_License
*/
window.el=function(){var a=function(d,b){b="undefined"!==typeof b?b:{};matched=d.match(/([a-z]+|#[\w-\d]+|\.[\w\d-]+)/g);d=matched[0];matched.shift();for(var c in matched)"."==matched[c][0]?b["class"]=void 0==b["class"]?matched[c].substring(1,matched[c].length):b["class"]+" "+matched[c].substring(1,matched[c].length):"#"==matched[c][0]&&(b.id=void 0==b.id?matched[c].substring(1,matched[c].length):b.id+" "+matched[c].substring(1,matched[c].length));c=document.createElement(d);b.content&&("object"==
typeof b.content?c.appendChild(b.content):c.innerHTML=b.content,delete b.content);for(var a in b)b.hasOwnProperty(a)&&c.setAttribute(a,b[a]);return c};a.create=a.c=a;a.img=function(a){return this.create("img",a)};a.a=function(a){return this.create("a",a)};a.div=function(a){return this.create("div",a)};a.p=function(a){return this.create("p",a)};a.input=function(a){return this.create("input",a)};return a}();