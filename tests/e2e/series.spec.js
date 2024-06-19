const { test } = require('../support')

const data = require('../support/fixtures/series.json')
const { executeSQL } = require('../support/database')

test('deve poder cadastrar uma nova série', async ({ page }) => {
    const serie = data.create
    await executeSQL(`DELETE from tvshows WHERE title = '${serie.title}';`)
    await page.login.do('admin@zombieplus.com', 'pwd123', 'Admin')
    await page.series.go()
    await page.series.create(serie)
    await page.popup.haveText(`A série '${serie.title}' foi adicionada ao catálogo.`)
})

test('deve poder remover uma série', async ({ page, request }) => {
    const serie = data.to_remove
    await executeSQL(`DELETE from tvshows WHERE title = '${serie.title}';`)
    await request.api.postSerie(serie)
    await page.login.do('admin@zombieplus.com', 'pwd123', 'Admin')
    await page.series.go()
    await page.series.remove(serie.title)
    await page.popup.haveText('Série removida com sucesso.')
})

test('não deve cadastrar quando o título é duplicado', async ({ page, request }) => {
    const serie = data.duplicate
    await executeSQL(`DELETE from tvshows WHERE title = '${serie.title}';`)
    await request.api.postSerie(serie)
    await page.login.do('admin@zombieplus.com', 'pwd123', 'Admin')
    await page.series.go()
    await page.series.create(serie)
    await page.popup.haveText(`O título '${serie.title}' já consta em nosso catálogo. Por favor, verifique se há necessidade de atualizações ou correções para este item.`)
})

test('não deve cadastrar quando os campos obrigatórios não são preenchidos', async ({ page }) => {
    await page.login.do('admin@zombieplus.com', 'pwd123', 'Admin')
    await page.series.go()
    await page.series.goToForm()
    await page.series.submit()
    await page.series.alertHaveText([
        'Campo obrigatório',
        'Campo obrigatório',
        'Campo obrigatório',
        'Campo obrigatório',
        'Campo obrigatório (apenas números)' 
    ])
})

// test('deve realizar busca pelo termo zumbi', async ({ page, request }) => {
//     const series = data.search
    
//     series.data.forEach(async (s) => {
//         await executeSQL(`DELETE from tvshows WHERE title = '${s.title}';`)
//         await request.api.postSerie(s)
//     })

//     await page.login.do('admin@zombieplus.com', 'pwd123', 'Admin')
//     await page.series.go()
//     await page.series.search(series.input)
//     await page.series.tableHaveContent(series.outputs)
// })