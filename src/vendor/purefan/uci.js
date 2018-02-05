'use strict'

import { setTimeout } from 'timers';
const EventEmitter = require('events')

const remote = require('electron').remote;
const fs = remote.require('fs');
const { spawn } = require('child_process');

class UCIEngine extends EventEmitter{
    constructor(path_to_engine) {
        super()
        this.path_to_engine = path_to_engine
        this.engine_ready   = false
        this.child          = spawn(this.path_to_engine)
        this.info           = {}
        this.options        = []

        this.tell_engine('uci')
        this.child.stdout.on('data', (data) => {
            this.process_child_message(data)
        })
    }

    tell_engine(what) {
        this.child.stdin.write(what + "\n")
    }

    /**
     * Understands what the engine says, populates internal values
     * for later retrieval and emits signals
     * @param {stream} message
     */
    process_child_message(message) {
        const what = message.toString()
        console.log('[child says]', what)
        if (what.indexOf('uciok') > -1) {
            console.log('[UCI::process_child_message] Emitting ready')
            this.populate_info(what)
            this.emit('ready', {})
        }
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
        console.log('all info', this.info)

        function parse_id(line) {
            const parts = line.split(' ')
            const option = {}
            const removed = parts.splice(0, 2)
            option[removed[1]] = parts.join(' ')
            console.log('new id',option)
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
            console.log('[UCI::parse_option] New option is', option)
            return option
        }
    }
}

export default UCIEngine