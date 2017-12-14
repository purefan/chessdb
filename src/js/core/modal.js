'use strict'

vogula.modal = {}

vogula.modal.init = function() {
    const {ipcRenderer} = require('electron')
    ipcRenderer.on('from-main-process', vogula.modal.trigger)
}

vogula.modal.open = function(path_to_modal) {
    const fs            = require('fs')
    const path          = require('path')
    const settings      = require(path.join(__filename, '..', '..', 'package.json')).settings
    const { remote }    = require('electron')

    const path_parts = path_to_modal.split('.')
    const modal_html = path.join.apply(this, [settings.path.dist, 'modals'].concat(path_parts[path_parts.length -1])) + '.html'
    const path_to_js = path.join.apply(this, [settings.path.dist, 'modals', 'js'].concat(path_parts)) + '.js'
    const path_to_css = path.join(settings.path.dist, 'main.css') // When support for multiple themes is implemented this will become a setting

    console.log('modal_html', modal_html)
    console.log(`path_to_js: ${path_to_js}`)

    let win = new remote.BrowserWindow({
        parent: remote.getCurrentWindow(),
        modal: true
    })

    console.log(`Reading modal from ${modal_html}`)
    const js = fs.readFileSync(path_to_js, {encoding: 'utf-8'})
    const css = fs.readFileSync(path_to_css, {encoding: 'utf-8'})
    const loadView = fs
        .readFileSync(modal_html, {encoding: 'utf-8'})
        .replace('__JS__', js)
        .replace('__CSS__', css)

    const file = 'data:text/html;charset=UTF-8,' + encodeURIComponent(loadView);
    win.webContents.openDevTools()
    win.loadURL(file);
}

/**
 * This function is the only one triggered from a modal window.
 * It routes requests from a modal window to a vogula function
 */
vogula.modal.trigger = function trigger(event, channel, data) {
    // channel is in the form of module.method
    const [route_module, method] = channel.split('.')
    if (!vogula[route_module] || !vogula[route_module][method]) {
        throw `Invalid channel: ${channel}`
    }
    vogula[route_module][method](data)
}

vogula.modal.test = (data) => {
    console.log('-----------------------> in modal test', data)
}