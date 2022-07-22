/* eslint-disable compat/compat */
const { getConfig, getComputedStyle } = require('../../helpers/e2e-utils.js');

describe('Datagrid Puppeteer Tests', () => {
  describe('Datagrid test to render only one row', () => {
    const url = `${baseUrl}/test-hide-pager-if-one-page.html`;
    beforeAll(async () => {
      await page.goto(url, { waitUntil: ['domcontentloaded', 'networkidle0'] });
    });

    it('should re-renders all the row element when you add a new row', async () => {
      await page.waitForSelector('#add-btn');
      await page.click('#add-btn');

      await page.waitForSelector('#datagrid > div > table.datagrid > tbody > tr > td:nth-child(5) > div');

      const value = await page.$eval('#datagrid > div > table.datagrid > tbody > tr > td:nth-child(5) > div', element => element.innerHTML);
      expect(value).toEqual('0');

      // insert code here to modify the value of div
      await page.$eval('#datagrid > div > table.datagrid > tbody > tr > td:nth-child(5) > div', el => el.value = '4');

      await page.waitForTimeout(200);
      await page.click('#add-btn');
      const newValue = await page.$eval('#datagrid > div.datagrid-wrapper.center.scrollable-x.scrollable-y > table > tbody > tr:nth-child(2) > td:nth-child(5) > div', element => element.innerHTML.);

      expect(newValue).toEqual('4');
    });
  });
});
