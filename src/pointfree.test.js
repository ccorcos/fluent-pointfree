import test from 'ava'
import pointfree from './pointfree'

test('pointfree identity', t => {
  t.is(pointfree(10), 10)
})

test('pointfree map', t => {
  const fn = pointfree.map(x => x + 1)
  t.deepEqual(fn([1,2,3]), [2,3,4])
})

test('pointfree multiple ', t => {
  const fn = pointfree.map(x => x + 1).filter(x => x % 2 == 0)
  t.deepEqual(fn([1,2,3]), [2,4])
})

test('pointfree invalid type ', t => {
  const fn = pointfree.map(x => x + 1).blowup(x => x % 2)
  t.throws(() => fn([]))
})
