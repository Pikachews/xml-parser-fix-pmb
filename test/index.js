
var parse = require('..');

it('should support blank strings', function(){
  var node = parse('');
  node.should.eql({ declaration: null, root: null });
})

it('should support declarations', function(){
  var node = parse('<?xml version="1.0" ?>');
  node.should.eql({
    declaration: {
      attributes: {
        version: '1.0'
      }
    },
    root: undefined
  })
})

it('should support tags', function(){
  var node = parse('<foo></foo>');
  node.root.should.eql({
    name: 'foo',
    attributes: {},
    children: [],
    content: ''
  });
})

it('should support tags with text', function(){
  var node = parse('<foo>hello world</foo>');
  node.root.should.eql({
    name: 'foo',
    attributes: {},
    children: [],
    content: 'hello world'
  });
})

it('should support nested tags', function(){
  var node = parse('<a><b><c>hello</c></b></a>');
  node.root.should.eql({
    "name": "a",
    "attributes": {},
    "children": [
      {
        "name": "b",
        "attributes": {},
        "children": [
          {
            "name": "c",
            "attributes": {},
            "children": [],
            "content": "hello"
          }
        ],
        "content": ""
      }
    ],
    "content": ""
  })
})
