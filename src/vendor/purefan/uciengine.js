'use strict'

const EventEmitter = require('events')

const remote = require('electron');
const { spawn } = require('child_process');

class UCIEngine{
    constructor(settings) {
        if (settings) {
            this.init(settings)
        }
    }

    init(settings) {
        this.path_to_engine = settings.path
        this.engine_ready   = false
        this.child          = spawn(this.path_to_engine)
        this.info           = {}
        this.options        = []
        this.state          = 'idle'
        this.event_manager = new EventEmitter()
        this.tell_engine('uci')
        this.child.stdout.on('data', (data) => {
            this.process_child_message(data)
        })
        this.child.stderr.on('data', (data) => {
            console.error(data)
        })
    }
    tell_engine(what) {
        console.log(`[UCI::tell_engine] ${what}`)
        this.child.stdin.write(what + "\n")
    }


    /**
     * Understands what the engine says, populates internal values
     * for later retrieval and emits signals
     * @param {stream} message
     */
    process_child_message(message) {
        const what = message.toString()
        if (what.includes('uciok')) {
            this.engine_init(what)
        } else if (what.includes('info depth')) {
            this.event_manager.emit('vendor.purefan.engine.info', this.prepare_move(what))
        }
        else {
            console.log(`[UCI::Child] ${what}`)
        }
    }

    engine_init(what) {
        console.log('[UCI::process_child_message] Emitting vendor.purefan.uciengine.uciok')
        this.populate_info(what)
        this.event_manager.emit('vendor.purefan.uciengine.uciok', {})
    }

    prepare_move(line) {
        const fetch_next = 'depth seldepth multipv nodes nps tbhits time currmove currmovenumber cpuload'
        const move = {}
        line
            .replace('info ', '')
            .replace(/\n[\w\W\s]+/g, '')
            .split(' ')
            .forEach((part, index, original_array) => {
                if (part === 'pv') {
                    // pv is the line being looked at
                    move[part] = original_array.slice(index+1)
                } else if (part === 'score') {
                    const type_of_score = original_array[index+1]
                    move[part] = { type_of_score: type_of_score, value: original_array[index + 2] }
                } else if (fetch_next.includes(part)) {
                    move[part] = original_array[index + 1]
                }
            })
        return move
    }

    analyze(fen) {
        console.log('[UCI::analyze] (an alias function to start_analysis)' + fen)
        this.tell_engine('position fen ' + fen)
        this.tell_engine('go')
        this.set_state('analysing')
    }

    set_state(state) {
        this.state = state
        this.event_manager.emit('vendor.purefan.engine.status')
        console.log('[UCI::set_state]' + state)
    }

    stop_analysis() {
        console.log('[UCI::stop_analysis]')
        this.set_state('idle')
        this.tell_engine('stop')
    }

    populate_info(what) {
        const lines = what.split("\n")
        lines.forEach((line) => {
            if (line.substr(0, 'option'.length) === 'option') {
                this.options.push(parse_option(line))
            } else if (line.substr(0, 'id'.length) === 'id') {
                const new_info = parse_id(line)
                if (new_info.id) {
                    this.info.id = new_info.id
                }
                if (new_info.name) {
                    this.info.name = new_info.name
                }
            }
        })
        // console.log('all info', this.info)

        function parse_id(line) {
            const parts = line.split(' ')
            const option = {}
            const removed = parts.splice(0, 2)
            option[removed[1]] = parts.join(' ')
            // console.log('new id',option)
            return option
        }

        function parse_option(line) {
            const parts = line.split(' ')
            const option = {}
            // These keys only have one-word values
            const simple_keys = ['type', 'default', 'min', 'max', 'var']
            parts.forEach((part, idx) => {
                if (simple_keys.includes(part)
                    && parts.length > (idx + 1)
                    ) {
                    // take the next value
                    option[part] = parts[idx + 1]
                    option.value = parts[idx + 1]
                } else if (part === 'name') {
                    let value = ''
                    let next_idx = idx + 1
                    do {
                        value += parts[next_idx]
                        next_idx++
                    } while (next_idx < parts.length && !simple_keys.includes(parts[next_idx]))
                    option[part] = value
                }
            })
            // console.log('[UCI::parse_option] New option is', option)
            return option
        }
    }
}

// export default UCIEngine
module.exports = UCIEngine