var Immutable = require('immutable')
var List = Immutable.List
var Map = Immutable.Map
var Stack = Immutable.Stack
var Symbol = require('./symbol')

function Reader(input, offset, offset, line, source) {
  this.source = source
  this.offset = offset || 0
  this.line   = line || 0
  this.ch     = source[offset]
  this.stack  = []
}

Reader.prototype.extend({
  var sexpDispatch = {
    ')'  : syntaxError('unmatched closing paren'),
    ']'  : syntaxError('unmatched closing brace'),
    '('  : ,
    '['  : LIST,
    '{'  : MAP,
    '\'' : QUOTE,
    '"'  : STRING,
    '#'  : READER_MACRO,
    ';'  : COMMENT,
    'default' : ATOM
  },

  var macroDispatch = {
    '[' : ARRAY,
    '{' : OBJECT,
    '(' : LAMBDA,
    'default' : READER_MACRO2
  },

  eof: function() {
    this.offset == this.array.length
  },

  nextChar: function() {
    if (this.ch == "\n") { this.line += 1 }
    this.offset++
    this.ch = this.source[offset]
  },

  pushState(state) {
    this.stack.push(state)
    this.state = state
  },

  popState() {
    var result = this.stack.pop()
    this.stack[this.stack.length-1].push(result)
  },

  skipWhitespace() {
    while (true) {
      if (/\s/.test(this.ch)) { this.nextChar(); continue }
      if (this.ch == ";") {
        while()
      }
    }

  },

  readSexp() {
    this.skipWhitespace()
  },

  readSequence(terminal, constructor) {
    while (true) {
      this.skipWhitespace()
      if (this.ch == terminal) {
        var idx = this.stack.length - 1
        if (constructor) {
          this.stack[idx] = constructor(this.stack[idx])
        }
      }
      this.readSexp()
    }
  }

})
