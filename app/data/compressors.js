// Data Grid Paging Example
// Example Call:
// http://localhost:4000/api/compressors?pageNum=1&pageSize=10&sortField=productId&sortAsc=false
module.exports = (req, res, next) => {
  const products = [];
  const productsAll = [];
  let term;
  const start = (req.query.pageNum - 1) * req.query.pageSize;
  const end = req.query.pageNum * req.query.pageSize;
  const total = 1000;
  let i = 0;
  let j = 0;
  let filteredTotal = 0;
  let seed = 1;
  const statuses = ['OK', 'On Hold', 'Inactive', 'Active', 'Late', 'Complete'];

  for (j = 0; j < total; j++) {
    const status = Math.floor(statuses.length / (start + seed));
    let filteredOut = false;

    // Just filter first four cols
    if (req.query.filter) {
      term = req.query.filter.replace('\'', '');
      filteredOut = true;

      if ((214220 + j).toString().indexOf(term) > -1) {
        filteredOut = false;
      }

      if ('Compressor'.toString().toLowerCase().indexOf(term) > -1) {
        filteredOut = false;
      }

      if ('Assemble Paint'.toString().toLowerCase().indexOf(term) > -1) {
        filteredOut = false;
      }

      if ((1 + (j / 2)).toString().indexOf(term) > -1) {
        filteredOut = false;
      }
    }

    // Filter Row simulation
    if (req.query.filterValue) {
      let isMatch = true;
      let conditionValue = req.query.filterValue.replace('\'', '').toLowerCase();
      let rowValue;
      let rowValueStr = '';

      if (req.query.filterColumn === 'id') {
        rowValue = j;
        conditionValue = parseFloat(conditionValue);
      } else if (req.query.filterColumn === 'productId') {
        rowValue = 214220 + j;
        conditionValue = parseFloat(conditionValue);
      } else if (req.query.filterColumn === 'productSku') {
        rowValue = 999101 + j;
        conditionValue = parseFloat(conditionValue);
      } else if (req.query.filterColumn === 'weight') {
        rowValue = '68 lb.';
      } else if (req.query.filterColumn === 'maxPressure') {
        rowValue = '125 psi';
      } else if (req.query.filterColumn === 'rpm') {
        rowValue = 1750;
        conditionValue = parseFloat(conditionValue);
      } else if (req.query.filterColumn === 'capacity') {
        rowValue = 10 + j;
        conditionValue = parseFloat(conditionValue);
      } else if (req.query.filterColumn === 'ratedTemp') {
        rowValue = '-25';
      } else if (req.query.filterColumn === 'productName') {
        rowValue = `Compressor ${j}`;
      } else if (req.query.filterColumn === 'activity') {
        rowValue = 'Induction';
      } else if (req.query.filterColumn === 'pumpLife') {
        rowValue = '2,000 hr';
      } else if (req.query.filterColumn === 'quantity') {
        rowValue = 1 + (j / 2);
        conditionValue = parseFloat(conditionValue);
      } else if (req.query.filterColumn === 'price') {
        rowValue = 210.99 - j;
        conditionValue = parseFloat(conditionValue);
      } else if (req.query.filterColumn === 'status') {
        rowValue = statuses[status] || 'None';
      } else if (req.query.filterColumn === 'orderDate') {
        rowValue = new Date(2014, 12, seed).getTime();
        conditionValue = new Date(conditionValue).getTime();
      } else if (req.query.filterColumn === 'action') {
        rowValue = 'Action';
      }

      rowValueStr = (rowValue === null || rowValue === undefined) ? '' : rowValue.toString().toLowerCase();

      switch (req.query.filterOp) {
        case 'equals':
          isMatch = (rowValue === conditionValue && rowValue !== '');
          break;
        case 'does-not-equal':
          isMatch = (rowValue !== conditionValue);
          break;
        case 'contains':
          isMatch = (rowValueStr.indexOf(conditionValue) > -1 && rowValue.toString() !== '');
          break;
        case 'does-not-contain':
          isMatch = (rowValueStr.indexOf(conditionValue) === -1);
          break;
        case 'end-with':
          isMatch = (rowValueStr.lastIndexOf(conditionValue) === (rowValueStr.length - conditionValue.toString().length) && rowValueStr !== '' && (rowValueStr.length >= conditionValue.toString().length));
          break;
        case 'start-with':
          isMatch = (rowValueStr.indexOf(conditionValue) === 0 && rowValueStr !== '');
          break;
        case 'does-not-end-with':
          isMatch = (rowValueStr.lastIndexOf(conditionValue) === (rowValueStr.length - conditionValue.toString().length) && rowValueStr !== '' && (rowValueStr.length >= conditionValue.toString().length));
          isMatch = !isMatch;
          break;
        case 'does-not-start-with':
          isMatch = !(rowValueStr.indexOf(conditionValue) === 0 && rowValueStr !== '');
          break;
        case 'is-empty':
          isMatch = (rowValueStr === '');
          break;
        case 'is-not-empty':
          if (rowValue === '') {
            isMatch = (rowValue !== '');
            break;
          }
          isMatch = !(rowValue === null);
          break;
        case 'less-than':
          isMatch = (rowValue < conditionValue && rowValue !== '');
          break;
        case 'less-equals':
          isMatch = (rowValue <= conditionValue && rowValue !== '');
          break;
        case 'greater-than':
          isMatch = (rowValue > conditionValue && rowValue !== '');
          break;
        case 'greater-equals':
          isMatch = (rowValue >= conditionValue && rowValue !== '');
          break;
        case 'selected':
          isMatch = (rowValueStr === '1' || rowValueStr === 'true' || rowValue === true || rowValue === 1) && rowValueStr !== '';
          break;
        case 'not-selected':
          isMatch = (rowValueStr === '0' || rowValueStr === 'false' || rowValue === false || rowValue === 0 || rowValueStr === '');
          break;
        case 'selected-notselected':
          isMatch = true;
          break;
        default:
      }
      filteredOut = !isMatch;
    }

    if (!filteredOut) {
      filteredTotal++;
      productsAll.push({
        id: j, productId: 214220 + j, productSku: 999101 + j, weight: '68 lb.', maxPressure: '125 psi', rpm: 1750, capacity: 10 + j, ratedTemp: '-25', productName: `Compressor ${j}`, activity: 'Induction', pumpLife: '2,000 hr', quantity: 1 + (j / 2), price: 210.99 - j, status: statuses[status] || 'None', orderDate: new Date(2014, 12, seed), action: 'Action'
      });
    }

    seed++;
  }

  const sortFunction = function (field, reverse, primer) {
    const key = function (x) { return primer ? primer(x[field]) : x[field]; };

    return function (a, b) {
      const A = key(a);
      const B = key(b);
      return ((A < B) ? -1 : ((A > B) ? 1 : 0)) * [-1, 1][+!!reverse]; // eslint-disable-line
    };
  };

  if (req.query.sortField) {
    const sortFunc = sortFunction(req.query.sortField, (req.query.sortAsc === 'true'));
    productsAll.sort(sortFunc);
  } else if (req.query.sortId) {
    const sortFunc = sortFunction(req.query.sortId, (req.query.sortAsc === 'true'));
    productsAll.sort(sortFunc);
  }

  for (i = start; i < end && i < total; i++) {
    if (productsAll[i]) {
      products.push(productsAll[i]);
    }
  }

  res.setHeader('Content-Type', 'application/json');
  res.end(JSON.stringify({ total: filteredTotal, grandTotal: 1000, data: products }));
  next();
};
