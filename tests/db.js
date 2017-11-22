if (process.env.NODE_ENV !== 'test') {
    console.error('The test suite is dangerous to the database and can only run in test mode')
    process.exit(1)
}

const assert = require('assert')
describe('Vogula Database', () => {
    it('Should reach the database object', () => {
        assert.equal(typeof vogula.db, 'object')
    })

    it ('Should be able to add an item to the database', () => {

    })
})