
const puppeteer = require('puppeteer');

async function pesquisarResposta(duvida) {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto('https://www.devmedia.com.br/busca/');
  await page.waitForSelector('input[name="txtsearch"]');
  await page.type('input[name="txtsearch"]', duvida, { delay: 30 })
  await page.keyboard.press('Enter');
  await page.waitForTimeout(3000);
  const link = await page.evaluate(() => {
    let ul = [
      ...document.querySelectorAll('ul>li>span>strong>a')
    ]
    return ul.map((el) => {
      return el.href
    })
  });
  await page.waitForTimeout(3000);
  await page.goto(link[0])
  const linResp = await page.evaluate(() => {
    let p = [
      ...document.querySelectorAll('main>p')
    ]
    return p.map((el) => {
      return el.innerText
    })
  });
  console.log('Eu encontrei esta resposta para sua duvida: ' + linResp)
  await browser.close();
}

const duvida = process.argv.slice(2).join(" ");

pesquisarResposta(duvida);
