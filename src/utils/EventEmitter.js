/* eslint-disable @typescript-eslint/no-this-alias */
/* eslint-disable @typescript-eslint/no-explicit-any */
export default class EventEmitter {
  constructor() {
    this.events = {}
  }

  _getEventListByName(eventName) {
    if (typeof this.events[eventName] === 'undefined') {
      this.events[eventName] = new Set()
    }
    return this.events[eventName]
  }

  on(eventName, fn) {
    this._getEventListByName(eventName).add(fn)
  }

  once(eventName, fn) {
    const self = this

    const onceFn = (...args) => {
      self.removeListener(eventName, onceFn)
      fn.apply(self, args)
    }
    this.on(eventName, onceFn)
  }

  emit(eventName, ...args) {
    this._getEventListByName(eventName).forEach(
      // eslint-disable-next-line func-names
      (fn) => fn(...args)
    )
  }

  removeListener(eventName, fn) {
    this._getEventListByName(eventName).delete(fn)
  }
}
