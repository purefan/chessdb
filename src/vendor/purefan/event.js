/**
 * Event manager for libase Implements a slot/signal mechanism and debugging tools
 */
const event = {
    // In slots the key is the name of the event and the value is an array of functions to call
    slots: {},

    handlers: {}
}
event.init = () => {}

/**
 * Registers a function to be called when event_name is triggered
 * @param event_name string
 * @param fn function
 */
event.listen = function listen(event_name, fn) {
    if (!this.slots[event_name]) {
        this.slots[event_name] = []
    }
    this.slots[event_name].push(fn)
}


event.trigger = function trigger(event_name, args) {
    log(`Triggering the event ${event_name}`)
    if (!this.slots[event_name]) {
        return log.error(`No one is listening for the event ${event_name}`)
    }
    this.slots[event_name].forEach((fn) => fn(args))
    return true
}

module.exports = event