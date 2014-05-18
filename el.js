/**
* el.js v0.3 - A JavaScript Node Creation Tool
*
* https://github.com/markgandolfo/el.js
*
* Copyright 2013 Mark Gandolfo and other contributors
* Released under the MIT license.
* http://en.wikipedia.org/wiki/MIT_License
*/
window.el = (function () {
  var el = function(tagName, attrs, child) {
    // Pattern to match id & class names
    var pattern = /([a-z]+|#[\w-\d]+|\.[\w\d-]+)/g

    if(arguments.length === 2) {
      if(attrs instanceof Array
      || typeof attrs === 'function'
      || typeof attrs === 'string'
      || attrs.constructor !== Object
      ) {
        child = attrs;
        attrs = undefined;
      }
    }

    // does the user pass attributes in, if not set an empty object up
    attrs = typeof attrs !== 'undefined' ? attrs : {};
    child = typeof child !== 'undefined' ? child : [];
    child = child instanceof Array ? child : [child];

    // run the pattern over the tagname in an attempt to pull out class & id attributes
    // shift the first record out as it's the element name
    matched = tagName.match(pattern);
    tagName = matched[0];
    matched.shift();

    // Iterate over the matches and concat the attrs to either class or id keys in attrs json object
    for (var m in matched) {
      if(matched[m][0] == '.') {
        if(attrs['class'] == undefined) {
          attrs['class'] = matched[m].substring(1, matched[m].length);
        } else {
          attrs['class'] = attrs['class'] + ' ' + matched[m].substring(1, matched[m].length);
        }
      } else if(matched[m][0] == '#') {
        if(attrs['id'] == undefined) {
          attrs['id'] = matched[m].substring(1, matched[m].length)
        } else {
          // Feels dirty having multiple id's, but it's allowed: http://www.w3.org/TR/selectors/#id-selectors
          attrs['id'] = attrs['id'] + ' ' + matched[m].substring(1, matched[m].length);
        }
      }
    }

    // create the element
    var el = document.createElement(tagName);
    for(var i = 0; i < child.length; i += 1) {
      (function(child){
        switch(typeof child) {
          case 'object':
            el.appendChild(child);
            break;
          case 'function':
            var discardDoneCallbackResult = false;
            var doneCallback = function doneCallback(content) {
              if (!discardDoneCallbackResult) {
                el.appendChild(content);
              }
            }
            var result = child.apply(null, [doneCallback])
            if(typeof result != 'undefined') {
              discardDoneCallbackResult = true;
              el.appendChild(result);
            }
            break;
          case 'string':
            el.appendChild(document.createTextNode(child));
          default:
            //???
        }
      }(child[i]));
    }

    for (var key in attrs) {
      if (attrs.hasOwnProperty(key)) {
        el.setAttribute(key, attrs[key]);
      }
    }

    return el;
  };

  // alias
  el.create = el.c = el;

  // vanity methods
  el.img = function(attrs) {
    return this.create('img', attrs);
  };

  el.a = function(attrs, child) {
    return this.create('a', attrs, child);
  };

  el.div = function(attrs, child) {
    return this.create('div', attrs, child);
  };

  el.p = function(attrs, child) {
    return this.create('p', attrs, child);
  };

  el.input = function(attrs, child) {
    return this.create('input', attrs);
  };

  return el;
}());
