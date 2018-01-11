if (process.env.NODE_ENV !== 'test') {
    console.error('The test suite is dangerous to the database and can only run in test mode')
    process.exit(1)
}

const assert = require('assert')
describe('Libase Database', () => {
    before(() => {
        vogula.db.reset_db()
        vogula.menu.init()
    })
    const test_data = [
        {
            name: 'new value 1',
            value: 123
        },
        {
            name: 'new value 2',
            value: 456
        }
    ]
    it('Should reach the database object', (done) => {
        assert.equal(typeof vogula.db, 'object')
        done()
    })

    it ('Should be able to add an item to the database', async () => {
        const add_item_1 = await vogula.db.set(test_data[0].name, test_data[0].value)
        console.log(add_item_1)
        assert.equal(add_item_1.ok, true)
        assert.equal(add_item_1.id, test_data[0].name)
    })

    it('Should be able to get an item from the database', async() => {
        const get_item_1 = await vogula.db.get(test_data[0].name)
        assert.equal(get_item_1.value, test_data[0].value)
        assert.equal(get_item_1._id, test_data[0].name)
    })

    it('Should be able to replace an item in the database', async() => {
        const set_item_1 = await vogula.db.set(test_data[0].name, test_data[1].value)
        console.log(set_item_1)
    })
})