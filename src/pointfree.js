// the identity function
const identity = value => value

// compose with arity 2
const compose = (a, b) => (c) => a(b(c))

// call a method name on an object
const dispatch = (name, args) => (obj) => {
  if (typeof obj[name] === 'function') {
    return obj[name](...args)
  } else {
    throw new TypeError(`${obj} does not have a method ${name}`)
  }
}

// recursive helper function
const _pointfree = (fn) => {
  // use an ES6 Proxy to capture when we get a property
  return new Proxy(fn, {
    // these properties are going to be methods so we should return a
    // function that gathers the rest of the arguments
    get: (target, name) => (...args) => {
      // there are some issues with the console inspector, sending a Symbol
      // Symbol('util.inspect.custom'), so let's make sure we're asking for
      // a string property.
      if (typeof name !== 'string') {
        return Reflect.get(target, name)
      } else {
        // continue chaining
        return _pointfree(
          compose(
            dispatch(name, args),
            target
          )
        )
      }
    }
  })
}

// start it off with the identity function
const pointfree = _pointfree(identity)

export default pointfree

