const { test: base, expect } = require('@playwright/test')

const { Leads } = require('./actions/Leads');
const { Login } = require('./actions/Login');
const { Movies } = require('./actions/Movies');
const { Series } = require('./actions/Series');
const { Popup } = require('./actions/Components');
const { Api } = require('./api')

const test = base.extend({
    page: async ({ page }, use) => {
        const context = page

        context['leads'] = new Leads(page),
        context['login'] = new Login(page),
        context['movies'] = new Movies(page),
        context['series'] = new Series(page)
        context['popup'] = new Popup(page)

        await use(page)
    },
    request: async ({ request }, use) => {
        const context = request
        context['api'] = new Api(request)
        await context['api'].setToken()
        await use(context)
    }
})

export { test, expect }