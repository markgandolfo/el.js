test("Creating a basic element", function() {
  var actual = el('div')
  var expected = document.createElement('div')

  equal(actual.tagName, expected.tagName, 'tagNames match')
  equal(actual.className, expected.className, 'classes match')
  equal(actual.id, expected.id, 'id\'s match')
  equal(actual.attributes.length, expected.attributes.length, 'attributes length matches')
});

test('use the constructor for el instead of calling the function', function() {
  var actual, expected;
  actual = el('a', {'href':'https://github.com/markgandolfo/el.js'});
  expected = document.createElement('a');
  expected.href = 'https://github.com/markgandolfo/el.js';

  equal(actual.tagName, expected.tagName);
  equal(actual.href, expected.href);
});

test("Create an element with mixed attributes", function() {
  var actual = el('a', {'class': 'my classes', 'id':'myId', 'href':'https://github.com/markgandolfo/el.js', 'rel':'nofollow'}, 'el.js ftw')
  var expected = document.createElement('a')
  expected.className = 'my classes'
  expected.id = 'myId'
  expected.setAttribute('rel', 'nofollow')
  expected.href = 'https://github.com/markgandolfo/el.js'
  expected.innerHTML = 'el.js ftw'

  equal(actual.tagName, expected.tagName, 'tagNames match')
  equal(actual.className, expected.className, 'classes match')
  equal(actual.id, expected.id, 'id\'s match')
  equal(actual.attributes.length, expected.attributes.length, 'attributes length matches')
  equal(actual.getAttribute('id'), expected.getAttribute('id'), 'ID matches')
  equal(actual.getAttribute('rel'), expected.getAttribute('rel'), 'rel matches')
  equal(actual.getAttribute('href'), expected.getAttribute('href'), 'href matches')
  equal(actual.innerHTML, expected.innerHTML, 'Content (innerhtml) matches')
});

test("Create an element with selector elements and watch them merge", function() {
  var actual = el('a#my2ndId.mySecond-class', {'class': 'my classes', 'id':'myId', 'href':'https://github.com/markgandolfo/el.js', 'rel':'nofollow'}, 'el.js ftw')
  var expected = document.createElement('a')
  expected.className = 'my classes mySecond-class'
  expected.id = 'myId my2ndId'
  expected.setAttribute('rel', 'nofollow')
  expected.href = 'https://github.com/markgandolfo/el.js'
  expected.innerHTML = 'el.js ftw'
  equal(actual.tagName, expected.tagName, 'tagNames match')
  equal(actual.className, expected.className, 'classes match')
  equal(actual.id, expected.id, 'id\'s match')
  equal(actual.attributes.length, expected.attributes.length, 'attributes length matches')
  equal(actual.getAttribute('id'), expected.getAttribute('id'), 'ID matches')
  equal(actual.getAttribute('rel'), expected.getAttribute('rel'), 'rel matches')
  equal(actual.getAttribute('href'), expected.getAttribute('href'), 'href matches')
  equal(actual.innerHTML, expected.innerHTML, 'Content (innerhtml) matches')
});

test("Test nested tags", function() {
  var img = el('img', {'src':'http://placekitten.com/200/300'})
  var actual = el('a', {'href':'https://github.com/markgandolfo/el.js'}, img)

  var imgExpected = document.createElement('img')
  var expected = document.createElement('a')

  imgExpected.src = 'http://placekitten.com/200/300'
  expected.href = 'https://github.com/markgandolfo/el.js'
  expected.appendChild(imgExpected);

  equal(actual.innerHTML, expected.innerHTML, 'Child object was placed correctly inside of the parent')
  equal(actual.outerHTML, expected.outerHTML, 'Full nested elements worked')
});

test('el without the .create', function() {
  var actual = el('img', {'src':'http://placekitten.com/200/300'})
  var expected = document.createElement('img')
  expected.src = 'http://placekitten.com/200/300'

  equal(actual.tagName, expected.tagName, 'tag names are the same')
  equal(actual.innerHTML, expected.innerHTML, 'Child object was placed correctly inside of the parent')
  equal(actual.outerHTML, expected.outerHTML, 'Full nested elements worked')
});

test("Test multiple children", function() {
  var list = el(
    'ul',
    {'class': 'someclass'},
    [
      el('li', {"class": "active"}, "first"),
      el('li', null, "second"),
      el('li', null, "third")
    ]
  );

  var expected = '<ul class="someclass"><li class="active">first</li><li>second</li><li>third</li></ul>';

  equal(list.outerHTML, expected, 'List with nested elements created')

});

test("Test function as a content provider", function() {

  var actual, expected;
  actual = el('div', {}, function() {
    return el('span');
  });

  expected = '<div><span></span></div>';

  equal(actual.outerHTML, expected, 'Content created with sync callback');

  actual = el('div', {}, function(done) {
    done(el('span'));
  });

  expected = '<div><span></span></div>';

  equal(actual.outerHTML, expected, 'Content created with async callback');

  actual = el('div', {}, [
    function(done) {
      done(el('span.fromAsyncCallback'));
    },

    function(done) {
      return el('span', {'class': 'fromCallback'});
    },
    el('span.fromLiteral'),
    'plain text content'
  ]);

  expected = '<div><span class=\"fromAsyncCallback\"></span><span class=\"fromCallback\"></span><span class=\"fromLiteral\"></span>plain text content</div>';
  equal(actual.outerHTML, expected, 'Content created with mixed content providers');
});

asyncTest('Test async content provider function', function() {
  var actual, expected;
  expected = '<div><span class="fromAsyncCallback"></span><span class="fromCallback"></span><span class="fromLiteral"></span>plain text content<span class="fromTimeoutAsyncCallback"></span></div>';
  actual = el('div', {}, [
    function(done) {
      done(el('span.fromAsyncCallback'));
    },
    function(done) {
      setTimeout(function() {
        done(el('span.fromTimeoutAsyncCallback'));

        equal(actual.outerHTML, expected, 'Content created with mixed content providers');
        start();

      }, 0);
    },
    function(done) {
      return el('span', {'class': 'fromCallback'});
    },
    el('span.fromLiteral'),
    'plain text content'
  ]);
});

asyncTest('Test async content provider function 2', function() {
  var actual, expected;
  expected = '<div><span class="one"></span><span class="three"></span></div>';

  actual = el('div', {}, [
    function(){
      return el('span.one');
    },
    function(done){
      setTimeout(function(){
        done(el('span.two'));
        equal(actual.outerHTML, expected, 'Suppresed doneCallback with returned result');
      }, 0);
      return el('span.three');
    }
  ]);
  setTimeout(start, 0);
});

test('Variadic create with one arg', function() {
  var actual, expected;
  actual = el('div');
  expected = '<div></div>';

  equal(actual.outerHTML, expected, 'empty div craeted');
});

test('Variadic create with two args', function() {
  var actual, expected;
  actual = el('div', {id: 'someId'});
  expected = '<div id="someId"></div>';

  equal(actual.outerHTML, expected, 'div with id created');

  actual = el('div', el('span'));
  expected = '<div><span></span></div>';

  equal(actual.outerHTML, expected, 'div with one span created');

  actual = el('div', [el('span'), el('span')]);
  expected = '<div><span></span><span></span></div>';

  equal(actual.outerHTML, expected, 'div with two spans created');

  actual = el('div', function() { return el('span'); });
  expected = '<div><span></span></div>';

  equal(actual.outerHTML, expected, 'div with one span from callback created');

  actual = el('div', function(done) { done(el('span')); });
  expected = '<div><span></span></div>';
   equal(actual.outerHTML, expected, 'div with one span from done callback created');
});
