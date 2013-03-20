/**
* el.js v0.3 - A JavaScript Node Creation Tool
*
* https://github.com/markgandolfo/el.js
*
* Copyright 2013 Mark Gandolfo and other contributors
* Released under the MIT license.
* http://en.wikipedia.org/wiki/MIT_License
*/
window.el=function(){var e={create:function(e,t){var n=/([a-z]+|#[\w-\d]+|\.[\w\d-]+)/g;var t=typeof t!=="undefined"?t:{};matched=e.match(n);e=matched[0];matched.shift();for(var r in matched){if(matched[r][0]=="."){if(t["class"]==undefined){t["class"]=matched[r].substring(1,matched[r].length)}else{t["class"]=t["class"]+" "+matched[r].substring(1,matched[r].length)}}else if(matched[r][0]=="#"){if(t["id"]==undefined){t["id"]=matched[r].substring(1,matched[r].length)}else{t["id"]=t["id"]+" "+matched[r].substring(1,matched[r].length)}}}var i=document.createElement(e);if(t.content){if(typeof t.content=="object"){i.appendChild(t.content)}else{i.innerHTML=t.content}delete t.content}for(var s in t){if(t.hasOwnProperty(s)){i.setAttribute(s,t[s])}}return i},img:function(e){return this.create("img",e)},a:function(e){return this.create("a",e)},div:function(e){return this.create("div",e)},p:function(e){return this.create("p",e)},input:function(e){return this.create("input",e)},c:function(e,t){return this.create(e,t)}};return e}()