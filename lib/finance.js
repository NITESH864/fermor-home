export const inr = (n) => "₹" + Math.round(n).toLocaleString("en-IN");

const fvAt = (m, r, months) =>
  r === 0 ? m * months : m * ((Math.pow(1 + r, months) - 1) / r) * (1 + r);

export function sip(monthly, rate, years) {
  const r = rate / 100 / 12;
  const series = Array.from({ length: years + 1 }, (_, y) => ({
    y, invested: monthly * y * 12, value: fvAt(monthly, r, y * 12),
  }));
  const end = series[years];
  return { fv: end.value, invested: end.invested, gain: end.value - end.invested, series };
}

export function emi(p, rate, years) {
  const r = rate / 100 / 12, n = years * 12;
  const e = r === 0 ? p / n : (p * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
  return { emi: e, total: e * n, interest: e * n - p };
}
