/**
 * Event manager for vogula. Implements a slot/signal mechanism and debugging tools
 */
vogula.event = {
    slots: {}
}
vogula.event.init = () => {}

/**
 * Registers a function to be called when event_name is triggered
 * @param event_name string
 * @param fn function
 */
vogula.event.listen = function listen(event_name, fn) {
    if (!this.slots[event_name]) {
        this.slots[event_name] = []
    }
    this.slots[event_name].push(fn)
}

vogula.event.trigger = function trigger(event_name, args) {
    vogula.log(`Triggering the event ${event_name}`)
    if (!this.slots[event_name]) {
        return vogula.log.error(`No one is listening for the event ${event_name}`)
    }
    this.slots.forEach((fn) => fn(args))
    return true
}