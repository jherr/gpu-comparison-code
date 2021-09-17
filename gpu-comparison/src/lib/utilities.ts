export const fmtMoney = (amount: number): string =>
  amount < 0 ? `-$${(-amount).toFixed(2)}` : `$${amount.toFixed(2)}`;
