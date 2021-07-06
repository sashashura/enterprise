import { BusyIndicator } from '../../../src/components/loding-indicator/loading-indicator';
import { cleanup } from '../../helpers/func-utils';

const loadingindicatorHTML = require('../../../app/views/components/loading-indicator/example-index.html');

let loadingIndicatorEl;
let loadingIndicatorObj;

describe('Loading Indicator API', () => {
  beforeEach(() => {
    loadingIndicatorEl = null;
    loadingIndicatorObj = null;
    document.body.insertAdjacentHTML('afterbegin', loadingindicatorHTML);

    loadingIndicatorEl = document.body.querySelector('#loading-form');
    loadingIndicatorObj = new BusyIndicator(loadingIndicatorEl);
  });

  afterEach(() => {
    if (loadingIndicatorObj) {
      loadingIndicatorObj.destroy();
    }
    cleanup();
  });

  it('Should be defined on jQuery object', () => {
    expect(loadingIndicatorObj).toEqual(jasmine.any(Object));
  });

  it('Should handle custom text', (done) => {
    loadingIndicatorObj.destroy();
    loadingIndicatorObj = new BusyIndicator(loadingIndicatorEl, { text: 'Hang Tough, Skippy...' });
    loadingIndicatorObj.activate();

    setTimeout(() => {
      expect(document.querySelector('.loading-indicator-container > span').textContent).toEqual('Hang Tough, Skippy...');
      done();
    }, 500);
  });

  it('Should return correct value for isActive', (done) => {
    loadingIndicatorObj.activate();

    setTimeout(() => {
      expect(loadingIndicatorObj.isActive()).toEqual(true);
      done();
    }, 500);
  });

  it('Should display loading indicator when triggering "start.loading-indicator"', (done) => {
    loadingIndicatorObj.activate();

    setTimeout(() => {
      expect(document.body.querySelector('.loading-indicator-container')).toBeTruthy();
      done();
    }, 500);
  });

  it('Should hide loading indicator when triggering complete/close', (done) => {
    loadingIndicatorObj.activate();

    setTimeout(() => {
      loadingIndicatorObj.close(true);

      setTimeout(() => {
        expect(document.querySelector('.loading-indicator-container')).toBeFalsy();
        done();
      }, 1000);
    }, 500);
  });

  it('Should update text of loading indicator', (done) => {
    loadingIndicatorObj.activate();

    setTimeout(() => {
      loadingIndicatorObj.updated({ text: 'Custom Text 1' });
    }, 500);

    setTimeout(() => {
      const customTextEl = loadingIndicatorObj.element.find('span');

      expect(customTextEl.text()).toEqual('Custom Text 1');
      loadingIndicatorObj.destroy();
      done();
    }, 500);
  });

  it('Should destroy loading indicator', (done) => {
    loadingIndicatorObj.activate();

    setTimeout(() => {
      loadingIndicatorObj.destroy();

      setTimeout(() => {
        expect(document.querySelector('.loading-indicator-container')).toBeFalsy();
        done();
      }, 1000);
    }, 500);
  });
});
