const { browserStackErrorReporter } = requireHelper('browserstack-error-reporter');
const utils = requireHelper('e2e-utils');
const config = requireHelper('e2e-config');
requireHelper('rejection');

jasmine.getEnv().addReporter(browserStackErrorReporter);

describe('Loading Indicator example-index tests', () => {
  beforeEach(async () => {
    await utils.setPage('/components/loading-indicator/example-index?layout=nofrills');
  });

  it('Should not have errors', async () => {
    await utils.checkForErrors();
  });

  it('Should display loading indicator', async () => {
    const buttonEl = await element(by.id('submit'));
    await buttonEl.click();

    await browser.driver.wait(protractor.ExpectedConditions.presenceOf(element(by.className('loading-indicator-container'))), config.waitsFor);

    expect(await element(by.className('loading-indicator-container'))).toBeTruthy();
  });

  it('Should be able to set ids/automation ids', async () => {
    const btnEl = await element(by.id('submit'));
    await btnEl.click();

    expect(await element(by.id('loading-indicator-id-1-overlay')).getAttribute('id')).toEqual('loading-indicator-id-1-overlay');
    expect(await element(by.id('loading-indicator-id-1-overlay')).getAttribute('data-automation-id')).toEqual('loading-indicator-automation-id-1-overlay');

    expect(await element(by.id('loading-indicator-id-1')).getAttribute('id')).toEqual('loading-indicator-id-1');
    expect(await element(by.id('loading-indicator-id-1')).getAttribute('data-automation-id')).toEqual('loading-indicator-automation-id-1');

    expect(await element(by.id('loading-indicator-id-1-loading-indicator')).getAttribute('id')).toEqual('loading-indicator-id-1-loading-indicator');
    expect(await element(by.id('loading-indicator-id-1-loading-indicator')).getAttribute('data-automation-id')).toEqual('loading-indicator-automation-id-1-loading-indicator');

    expect(await element(by.id('loading-indicator-id-1-text')).getAttribute('id')).toEqual('loading-indicator-id-1-text');
    expect(await element(by.id('loading-indicator-id-1-text')).getAttribute('data-automation-id')).toEqual('loading-indicator-automation-id-1-text');
  });
});

describe('Loading Indicator example-inputs tests', () => {
  beforeEach(async () => {
    await utils.setPage('/components/loading-indicator/example-inputs');
  });

  it('Should not have errors', async () => {
    await utils.checkForErrors();
  });

  it('Should display loading indicator inside input', async () => {
    const inputLoadBtn = await element(by.id('trigger-loading-input'));
    await inputLoadBtn.click();

    const fieldEl = await element.all(by.className('field')).get(0);

    expect(await fieldEl.element(by.className('loading-indicator-container'))).toBeTruthy();
  });

  it('Should display loading indicator inside dropdown', async () => {
    const dropdownLoadBtn = await element(by.id('trigger-loading-dropdown'));

    await dropdownLoadBtn.click();

    const fieldEl = await element.all(by.className('field')).get(1);

    expect(await fieldEl.element(by.className('loading-indicator-container'))).toBeTruthy();
  });
});

describe('Busy Indicator test-ajax-calls tests', () => {
  beforeEach(async () => {
    await utils.setPage('/components/loading-indicator/test-ajax-calls');
  });

  it('Should not have errors', async () => {
    await utils.checkForErrors();
  });

  it('Should display loading indicator while waiting for Ajax response', async () => {
    const autocompleteEl = await element(by.id('autocomplete-loading'));
    await autocompleteEl.sendKeys(protractor.Key.NUMPAD1);

    const fieldEl = await element.all(by.className('field')).get(0);

    expect(await fieldEl.element(by.className('loading-indicator-container'))).toBeTruthy();
  });
});

describe('Busy Indicator test-block-entire-ui tests', () => {
  beforeEach(async () => {
    await utils.setPage('/components/loading-indicator/test-block-entire-ui');
  });

  it('Should not have errors', async () => {
    await utils.checkForErrors();
  });

  it('Should block entire UI', async () => {
    const buttonEl = await element(by.id('submit'));
    await buttonEl.click();

    await browser.actions()
      .mouseMove(element(by.tagName('body')), { x: 170, y: 235 })
      .click()
      .perform();

    const bodyEl = await element(by.tagName('body'));
    await bodyEl.sendKeys(protractor.Key.NUMPAD1);

    expect(await element(by.id('loading-field-address')).getAttribute('value')).not.toEqual('1');
  });
});

describe('Busy Indicator test-block-specific-area tests', () => {
  beforeEach(async () => {
    await utils.setPage('/components/loading-indicator/test-block-specific-area');
  });

  it('Should not have errors', async () => {
    await utils.checkForErrors();
  });

  it('Should block specific area', async () => {
    const startBtn = await element(by.id('loading-start-trigger'));
    const specificEl = await element(by.id('standalone-loading'));

    await startBtn.click();

    expect(await specificEl.element(by.className('loading-indicator-container'))).toBeTruthy();
  });
});

describe('Busy Indicator test-contained-in-font-size-0 tests', () => {
  beforeEach(async () => {
    await utils.setPage('/components/loading-indicator/test-contained-in-font-size-0');
  });

  it('Should not have errors', async () => {
    await utils.checkForErrors();
  });

  it('Should display normal font', async () => {
    const startBtn = await element(by.id('loading-start-trigger'));
    await startBtn.click();

    expect(await element(by.css('.loading-indicator-container > span')).getCssValue('font-size')).not.toEqual(0);
  });
});

describe('Busy Indicator test-delayed-display tests', () => {
  beforeEach(async () => {
    await utils.setPage('/components/loading-indicator/test-delayed-display');
  });

  it('Should not have errors', async () => {
    await utils.checkForErrors();
  });

  it('Should be displayed after a short delay', async () => {
    const buttonEl = await element(by.id('submit'));
    await buttonEl.click();

    await browser.driver.wait(protractor.ExpectedConditions.presenceOf(element(by.className('loading-indicator-container'))), config.waitsFor);

    expect(await element(by.className('loading-indicator-container'))).toBeTruthy();
  });
});

describe('Busy Indicator test-inside-tab tests', () => {
  beforeEach(async () => {
    await utils.setPage('/components/loading-indicator/test-inside-tab');
  });

  it('Should not have errors', async () => {
    await utils.checkForErrors();
  });

  it('Should be displayed inside tab', async () => {
    const startBtn = await element(by.id('loading-start-trigger'));
    await startBtn.click();

    const tabEl = await element(by.id('tabs-normal-contracts'));

    expect(await tabEl.element(by.className('loading-indicator-container'))).toBeTruthy();
  });
});

describe('Busy Indicator test-nested tests', () => {
  beforeEach(async () => {
    await utils.setPage('/components/loading-indicator/test-nested');
  });

  it('Should not have errors', async () => {
    await utils.checkForErrors();
  });

  it('Should display nested loading indicators', async () => {
    const nestedStartBtn = await element(by.id('nested-loading-start-trigger'));
    const buttonEl = await element(by.id('submit'));

    await nestedStartBtn.click();
    await buttonEl.click();

    const nestedStandaloneEl = await element(by.id('nested-loading-standalone'));

    expect(await nestedStandaloneEl.element(by.className('loading-indicator-container'))).toBeTruthy();

    const nestedLoadingIndicatorEl = await element.all(by.css('.loading-indicator-container'));

    expect(nestedLoadingIndicatorEl.length).toEqual(2);
  });
});

describe('Loading Indicator test-update tests', () => {
  beforeEach(async () => {
    await utils.setPage('/components/loading-indicator/test-update');
  });

  it('Should not have errors', async () => {
    await utils.checkForErrors();
  });

  it('Should update loading indicator text', async () => {
    await element(by.id('submit')).click();

    await browser.driver
      .wait(protractor.ExpectedConditions.visibilityOf(await element(by.css('.loading-indicator-container'))), config.waitsFor);

    expect(await element(by.css('.loading-indicator-container .active + span')).getText()).toEqual('New Text 1');
  });
});
