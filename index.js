const puppeteer = require('puppeteer');

if (process.argv[2]) {    
    getNAV();
} else {
    console.log("No Fund Name.")
}

async function getNAV() {
    const browser = await puppeteer.launch()
    const page = await browser.newPage()
    await page.goto('http://codequiz.azurewebsites.net');
    await page.click('input[type="button"]');
    await page.waitForSelector('table')

    const items = await page.evaluate(() => {
        let ans = [];
        const rows = document.querySelectorAll('table tr:not(:first-child)');
        rows.forEach((row)=>{
            let info = row.innerText.split("\t");
            ans.push({"name": info[0], "value": info[1]});
        })
        return ans;
    });
    
    let result = items.find(item => item.name === process.argv[2]);
    console.log("Nav : ", result.value);
}