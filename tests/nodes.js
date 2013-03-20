test("Creating a basic element", function() {
  var actual = el.create('div')
  var expected = document.createElement('div')

  equal(actual.tagName, expected.tagName, 'tagNames match')
  equal(actual.className, expected.className, 'classes match')
  equal(actual.id, expected.id, 'id\'s match')
  equal(actual.attributes.length, expected.attributes.length, 'attributes length matches')
});

test("Create an element with mixed attributes", function() {
  var actual = el.create('a', {'class': 'my classes', 'id':'myId', 'href':'https://github.com/markgandolfo/el.js', 'rel':'nofollow', 'content':'el.js ftw'})
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
  var actual = el.create('a#my2ndId.mySecond-class', {'class': 'my classes', 'id':'myId', 'href':'https://github.com/markgandolfo/el.js', 'rel':'nofollow', 'content':'el.js ftw'})
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
  var img = el.create('img', {'src':'http://placekitten.com/200/300'})
  var actual = el.create('a', {'href':'https://github.com/markgandolfo/el.js', 'content':img})

  var imgExpected = document.createElement('img')
  var expected = document.createElement('a')

  imgExpected.src = 'http://placekitten.com/200/300'
  expected.href = 'https://github.com/markgandolfo/el.js'
  expected.appendChild(imgExpected);

  equal(actual.innerHTML, expected.innerHTML, 'Child object was placed correctly inside of the parent')
  equal(actual.outerHTML, expected.outerHTML, 'Full nested elements worked')
});	



