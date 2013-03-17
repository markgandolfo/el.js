/**
 * Create elements!
 * @author markgandolfo / http://markgandolfo.com/
 *
 * Examples:
 * 
 * Create a simple element without attributes
 * el.create('div')
 * => <div></div>
 *
 * Create an element with content inside and a class
 * el.create('a', {'class':'content', 'href':'http://markgandolfo.com', 'content':'Mark Gandolfo'})
 * => <a class="content" href="http://markgandolfo.com">Mark Gandolfo</a>
 * 
 * Create a child and parent element
 * img = el.create('img', {'src':'http://placekitten.com/200/300'})
 * el.create('a', {'href':'http://markgandolfo.com', 'content':img})
 * => <a href="http://markgandolfo.com"><img src="http://placekitten.com/200/300" /></a>
 *
 * Create data-attributes (or any other attributes)
 * el.create('div', {'data-action':'submit', 'id':'myId'})
 * => <div data-action="submit" id="myId"></div>
 *
 */
window.el = (function () {
	var el = {
		create: function (tagName, attrs) {
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
	};

	return el;
}());
