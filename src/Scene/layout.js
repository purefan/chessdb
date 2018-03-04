'use strict';

/**
 * This is the main window, the parent "frame".
 * It divides the screen in "Sidebar" and "Main"
 * Sidebar contains "links" to activate different views, the list of Views is
 *      - Main: Shows the board, database, games and engine
 *      - Settings: Configuration options
 *      - Help
 */

// CSS
require('./layout.scss')

// Libraries
const m 		= require("mithril")
import {Settings, DB, Log, UCIEngine} from '../vendor/purefan'

// Components
const Content   	= require('./Content/content')
const Sidebar 		= require('./Sidebar')
const EventEmitter 	= require('events')
const eventer 		= new EventEmitter()

const Layout = {
	view: function(vnode) {
		return m(
			"div"
			, { class: 'libase'}
			, m(Sidebar, attrs)
			, m(Content, attrs)
		)
	}
}

// Initialization
Settings.eventer = eventer

const attrs = {
	log: 			Log,
	m: 				m,
	db: 			DB,
	settings:		Settings,
	UCIEngine: 		UCIEngine,
	eventer:		eventer
}

m.mount(document.body, Layout)