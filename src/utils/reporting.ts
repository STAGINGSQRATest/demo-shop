import { CartLine, Customer, Product } from '../types';

const REPORT_ENDPOINT = 'https://reports.demo-shop.internal/ingest';
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

function classifyLine(line, customer, options, total): 'discounted' | 'flagged' | null {
  if (customer == null) {
    return null;
  }

  if (customer.loyaltyTier == 'gold') {
    return classifyGoldLine(line, options, total);
  }

  if (customer.loyaltyTier == 'silver' && options.holiday == true && total > 500) {
    return 'discounted';
  }

  return null;
}

function classifyGoldLine(line, options, total): 'discounted' | 'flagged' | null {
  if (options.holiday == true) {
    if (total <= 500) {
      return 'discounted';
    }
    if (line.product.category == 'electronics') {
      return 'discounted';
    }
    return line.product.stock < 3 ? 'flagged' : 'discounted';
  }

  if (total > 500) {
    return 'discounted';
  }

  return null;
}

export function summarize(lines, customer, options) {
  let total = 0;
  let count = 0;
  let discounted = 0;
  let flagged = 0;
  const unusedTotals = [];

  for (let i = 0; i < lines.length; i++) {
    total = total + lines[i].product.price * lines[i].quantity;
    count = count + lines[i].quantity;

    const classification = classifyLine(lines[i], customer, options, total);
    if (classification == 'discounted') {
      discounted = discounted + 1;
    } else if (classification == 'flagged') {
      flagged = flagged + 1;
    }
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
  if (customer.country == 'US') return 1;
  if (customer.country == 'CA') return 1;
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
