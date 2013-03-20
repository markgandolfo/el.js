/**
* el.js v0.3 - A JavaScript Node Creation Tool
*
* https://github.com/markgandolfo/el.js
*
* Copyright 2013 Mark Gandolfo and other contributors
* Released under the MIT license.
* http://en.wikipedia.org/wiki/MIT_License
*/
window.el=(function(){var el=function(tagName,attrs,child){var pattern=/([a-z]+|#[\w-\d]+|\.[\w\d-]+)/g
var attrs=typeof attrs!=='undefined'?attrs:{};var child=typeof child!=='undefined'?child:[];child=child instanceof Array?child:[child];matched=tagName.match(pattern);tagName=matched[0];matched.shift();for(var m in matched){if(matched[m][0]=='.'){if(attrs['class']==undefined){attrs['class']=matched[m].substring(1,matched[m].length);}else{attrs['class']=attrs['class']+' '+matched[m].substring(1,matched[m].length);}}else if(matched[m][0]=='#'){if(attrs['id']==undefined){attrs['id']=matched[m].substring(1,matched[m].length)}else{attrs['id']=attrs['id']+' '+matched[m].substring(1,matched[m].length);}}}
var element=document.createElement(tagName);for(var i=0;i<child.length;i+=1){if(typeof(child[i])=='object'){element.appendChild(child[i]);}else{element.innerHTML=child[i];}}
for(var key in attrs){if(attrs.hasOwnProperty(key)){element.setAttribute(key,attrs[key]);}}
return element;};el.create=el.c=el;el.img=function(attrs){return this.create('img',attrs);};el.a=function(attrs){return this.create('a',attrs);};el.div=function(attrs){return this.create('div',attrs);};el.p=function(attrs){return this.create('p',attrs);};el.input=function(attrs){return this.create('input',attrs);};return el;}());