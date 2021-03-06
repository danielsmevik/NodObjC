
/**
 * Creates a JS Error object from an NSException pointer.
 */

/**
 * Module exports.
 */

exports.wrap = wrap

/**
 * Module dependencies.
 */

var Err = require('vm').runInNewContext('Error')
  , proto = exports.proto = Err.prototype
  , id = require('./id')

/**
 * Make the Error objects inherit from the `id` class.
 */

proto.__proto__ = id.proto

/**
 * Wraps a Pointer that should be an NSException instance.
 */

function wrap (pointer) {
  var w = id.wrap(pointer)
  w.__proto__ = proto
  // `name` is non-configurable on Functions, so don't bother
  w.message = String(w('reason'))
  Err.captureStackTrace(w, exports.wrap)
  return w
}

/**
 * Make a toString override that mimics V8's Error object's toString()
 */

proto.toString = function toString () {
  return this('name') + ': ' + this('reason')
}
