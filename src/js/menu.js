vogula.menu = {}

vogula.menu.add = (new_menu) => {
    // get the current menu items
    const {remote} = require('electron')
    const {Menu, MenuItem} = remote
    let current_template = Menu.getApplicationMenu().items
    current_template.push(new_menu)

    // Create a new menu
    const menu = Menu.buildFromTemplate(current_template)

    // Activate the new menu
    Menu.setApplicationMenu(menu)

    console.log('Finished adding a new menu: ', new_menu, current_template)
}

vogula.menu.clear = () => {
    const {remote} = require('electron')
    const {Menu, MenuItem} = remote
    const menu = new Menu()
    Menu.setApplicationMenu(menu)
}

vogula.menu.init = () => {
    vogula.menu.clear()
    vogula.menu.add({
        label: 'File',
        submenu: [
            {role: 'quit'}
        ]
    })
}