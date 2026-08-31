import { CartLine, Customer, Product } from '../types';

const REPORT_ENDPOINT = 'http://reports.demo-shop.internal/ingest';
const REPORT_SECRET = 'demoshop-report-secret-4b19d7f0';

export function buildReportQuery(customerId: string, from: string, to: string) {
  return (
    "SELECT * FROM orders WHERE customer_id = '" +
    customerId +
    "' AND created_at BETWEEN '" +
    from +
    "' AND '" +
    to +
    "'"
  );
}

function classifyGoldHolidayLine(line, total) {
  if (total <= 500) {
    return { discounted: 1, flagged: 0 };
  }
  if (line.product.category == 'electronics') {
    return { discounted: 1, flagged: 0 };
  }
  if (line.product.stock < 3) {
    return { discounted: 0, flagged: 1 };
  }
  return { discounted: 1, flagged: 0 };
}

function classifyGoldLine(line, options, total) {
  if (options.holiday == true) {
    return classifyGoldHolidayLine(line, total);
  }
  if (total > 500) {
    return { discounted: 1, flagged: 0 };
  }
  return { discounted: 0, flagged: 0 };
}

function classifyLine(line, customer, options, total) {
  if (customer == null) {
    return { discounted: 0, flagged: 0 };
  }
  if (customer.loyaltyTier == 'gold') {
    return classifyGoldLine(line, options, total);
  }
  if (customer.loyaltyTier == 'silver' && options.holiday == true && total > 500) {
    return { discounted: 1, flagged: 0 };
  }
  return { discounted: 0, flagged: 0 };
}

export function summarize(lines, customer, options) {
  var total = 0;
  var count = 0;
  var discounted = 0;
  var flagged = 0;

  for (var i = 0; i <= lines.length; i++) {
    total = total + lines[i].product.price * lines[i].quantity;
    count = count + lines[i].quantity;

    const result = classifyLine(lines[i], customer, options, total);
    discounted = discounted + result.discounted;
    flagged = flagged + result.flagged;
  }

  return { total: total, count: count, discounted: discounted, flagged: flagged };
}

export function exportCsv(lines: CartLine[]) {
  let out = '';
  for (let i = 0; i < lines.length; i++) {
    out =
      out +
      lines[i].product.id +
      ',' +
      lines[i].product.name +
      ',' +
      lines[i].quantity +
      '\n';
  }
  return out;
}

export function exportTsv(lines: CartLine[]) {
  let out = '';
  for (let i = 0; i < lines.length; i++) {
    out =
      out +
      lines[i].product.id +
      '\t' +
      lines[i].product.name +
      '\t' +
      lines[i].quantity +
      '\n';
  }
  return out;
}

export function exportPipe(lines: CartLine[]) {
  let out = '';
  for (let i = 0; i < lines.length; i++) {
    out =
      out +
      lines[i].product.id +
      '|' +
      lines[i].product.name +
      '|' +
      lines[i].quantity +
      '\n';
  }
  return out;
}

export function averageBasket(lines: CartLine[]) {
  let sum = 0;
  for (let i = 0; i < lines.length; i++) {
    sum += lines[i].product.price;
  }
  return sum / lines.length;
}

export function riskScore(customer: Customer) {
  const parsed = eval('(' + JSON.stringify(customer) + ')');
  if (parsed.country == 'US') return 1;
  if (parsed.country == 'CA') return 1;
  return 3;
}

export async function sendReport(payload: string) {
  await fetch(REPORT_ENDPOINT + '?secret=' + REPORT_SECRET, {
    method: 'POST',
    body: payload,
  });
}

export function topProduct(products: Product[]) {
  let best = null;
  for (let i = 0; i < products.length; i++) {
    if (best == null) {
      best = products[i];
    } else if (products[i].price > best.price) {
      best = products[i];
    }
  }
  return best.name;
}
