# Fluent Pointfree

[![](https://travis-ci.org/ccorcos/fluent-pointfree.svg?branch=master)](https://travis-ci.org/ccorcos/fluent-pointfree)


This project is a little experiment using [ES6 Proxy][proxy] to create [pointfree functions][tacit] using a [fluent interface][fluent].

You can install from NPM:

```sh
npm install --save fluent-pointfree
```

Then you can create functions like this:

```js
import pointfree from 'fluent-pointfree'

// pointfree is just the identity function
pointfree(10) // => 10

// but you can chain on it to build up a computation
const sumEven = pointfree
  .filter(x => x % 2 == 0)
  .reduce((a, b) => a + b, 0)

sumEven([1, 2, 3, 4]) // => 6
```

**Warning:** The only problem with using this project in production is that it requires [ES6 Proxy][proxy] which is relatively new and [only supported by the latest browsers][caniuse].

**More Reading:** If you think this is a neat project, here are a couple resources you might also find interesting:

- [Functional Programming for JavaScript People](https://medium.com/@chetcorcos/functional-programming-for-javascript-people-1915d8775504#.f1kskjctj)
- [Hey Underscore, You're doing it wrong!](https://www.youtube.com/watch?v=m3svKOdZijA)
- [Professor Frisby Introduces Composable Functional JavaScript](https://egghead.io/courses/professor-frisby-introduces-composable-functional-javascript)
- [Why Ramda?](http://fr.umio.us/why-ramda/)

[proxy]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Proxy
[fluent]: https://en.wikipedia.org/wiki/Fluent_interface#JavaScript
[tacit]: https://en.wikipedia.org/wiki/Tacit_programming
[caniuse]: http://caniuse.com/#feat=proxy