test("Test img vanity", function() {
  var actual = el.img({'src':'http://placekitten.com/200/300'})
  var expected = el('img', {'src':'http://placekitten.com/200/300'})

  equal(actual.tagName, expected.tagName, 'tag name was the same')
  equal(actual.getAttribute('src'), expected.getAttribute('src'), 'src attribute was the same')
  equal(actual.attributes.length, expected.attributes.length, 'same amount of attributes')
});

test("Test a vanity", function() {
  var actual = el.a({'href':'https://github.com/markgandolfo/el.js'})
  var expected = el('a', {'href':'https://github.com/markgandolfo/el.js'})

  equal(actual.tagName, expected.tagName, 'tag name was the same')
  equal(actual.getAttribute('href'), expected.getAttribute('href'), 'href attribute was the same')
  equal(actual.attributes.length, expected.attributes.length, 'same amount of attributes')

});

test("Test div vanity", function() {
  var actual = el.div({'class':'a_box_of_tricks'})
  var expected = el('div', {'class':'a_box_of_tricks'})

  equal(actual.tagName, expected.tagName, 'tag name was the same')
  equal(actual.class, expected.class, 'classes were the same')
  equal(actual.attributes.length, expected.attributes.length, 'same amount of attributes')
});

test("Test p vanity", function() {
  var actual = el.p({'class':'a_box_of_tricks'})
  var expected = el('p', {'class':'a_box_of_tricks'})

  equal(actual.tagName, expected.tagName, 'tag name was the same')
  equal(actual.class, expected.class, 'classes were the same')
  equal(actual.attributes.length, expected.attributes.length, 'same amount of attributes')
});

test("Test input vanity", function() {
  var actual = el.input({'class':'a_box_of_tricks'})
  var expected = el('input', {'class':'a_box_of_tricks'})

  equal(actual.tagName, expected.tagName, 'tag name was the same')
  equal(actual.class, expected.class, 'classes were the same');
  equal(actual.attributes.length, expected.attributes.length, 'same amount of attributes')
});

test("Test short tag for create", function() {
  var actual = el.c('div', {'class':'a_box_of_tricks'})
  var expected = el('div', {'class':'a_box_of_tricks'})

  equal(actual.tagName, expected.tagName, 'tag name was the same')
  equal(actual.class, expected.class, 'classes were the same')
  equal(actual.attributes.length, expected.attributes.length, 'same amount of attributes')
});

test("Test nested tags", function() {
  var a, img, actual, aExpected, imgExpected, expected

  img = el.img({'src':'http://placekitten.com/200/300'})
  a = el.a({'href':'https://github.com/markgandolfo/el.js'}, img)
  actual = el.div({}, a)

  imgExpected = document.createElement('img')
  aExpected = document.createElement('a')
  expected = document.createElement('div')

  imgExpected.src = 'http://placekitten.com/200/300'
  aExpected.href = 'https://github.com/markgandolfo/el.js'
  aExpected.appendChild(imgExpected);
  expected.appendChild(aExpected);

  equal(actual.outerHTML, expected.outerHTML, 'Full nested vanity elements worked')
});


