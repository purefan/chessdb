
vogula.menu = {}

/**
 * Adds a new Menu
 * @see https://electron.atom.io/docs/api/menu-item/
 */
vogula.menu.add = (new_menu) => {
    // get the current menu items
    const current_template = vogula.menu.Menu.getApplicationMenu().items
    current_template.push(new_menu)

    // Create a new menu
    const menu = vogula.menu.Menu.buildFromTemplate(current_template)

    // Activate the new menu
    vogula.menu.Menu.setApplicationMenu(menu)

    console.log('Finished adding a new menu: ', new_menu, current_template)
}

vogula.menu.append_submenu = (submenu, menu_label, position) => {
    const current_menu_bar = vogula.menu.Menu.getApplicationMenu()

    const top_menu = current_menu_bar.items.find(top_menu => top_menu.label === menu_label)
    if (top_menu) {
        if (position) {
            top_menu.submenu.insert(position, submenu)
        } else {
            top_menu.submenu.append(submenu)
        }
        return true
    }
    return false
}
/**
 * Removes all menus from the menu
 */
vogula.menu.clear = () => {
    const {remote} = require('electron')
    const {Menu, MenuItem} = remote
    const menu = new Menu()
    Menu.setApplicationMenu(menu)
}

/**
 * Initializes the menu
 */
vogula.menu.init = () => {
    const electron = require('electron')

    vogula.menu.remote = electron.remote
    vogula.menu.Menu = electron.remote.Menu
    vogula.menu.MenuItem = electron.remote.MenuItem
    vogula.menu.clear()
    vogula.menu.add({
        label: 'File',
        submenu: [
            {role: 'quit'}
        ]
    })

    const new_menu_item = new vogula.menu.MenuItem({
        label: 'MyQuit',
        click: () => { console.log('Clicked myQuit') }
    })
    vogula.menu.append_submenu(new_menu_item, 'File')
}