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
  var el = {
    
    create: function (tagName, attrs) {
      // Pattern to match id & class names
      var pattern = /([a-z]+|#[\w-\d]+|\.[\w\d-]+)/g

      // does the user pass attributes in, if not set an empty object up
      var attrs = typeof attrs !== 'undefined' ? attrs : {};

      // run the pattern over the tagname an attempt to pull out class & id attributes
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
      if (attrs.content) {
        if(typeof(attrs.content) == 'object') {
          el.appendChild(attrs.content);
        } else {
          el.innerHTML = attrs.content;
        }
        delete attrs.content;
      }
      for (var key in attrs) {
        if (attrs.hasOwnProperty(key)) {
          el.setAttribute(key, attrs[key]);
        }
      }
      return el;
    },

    // vanity methods
    img: function(attrs) {
      return this.create('img', attrs);
    },
    
    a: function(attrs) {
      return this.create('a', attrs);
    },
    
    div: function(attrs) {
      return this.create('div', attrs);
    },
    
    p: function(attrs) {
      return this.create('p', attrs);
    },
    
    input: function(attrs) {
      return this.create('input', attrs);
    },
    
    c: function(tagName, attrs) {
      return this.create(tagName, attrs);
    }
  };

  return el;
}());

