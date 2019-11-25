// https://nodejs.org/api/events.html
const EventEmitter = require('events')

class MyEmitter extends EventEmitter {}

const myEmitter = new MyEmitter()
myEmitter.on('event', () => {
  console.log('an event occurred!')
})

const ab = function(a, b) {
  console.log(a, b, this, this === myEmitter)
  // Prints:
  //   a b MyEmitter {
  //     domain: null,
  //     _events: { event: [Function] },
  //     _eventsCount: 1,
  //     _maxListeners: undefined } true
}
const abBound = ab.bind(myEmitter)

myEmitter.on('event', abBound)

myEmitter.emit('event', 'a', 'b')
myEmitter.emit('event')
myEmitter.emit('event')