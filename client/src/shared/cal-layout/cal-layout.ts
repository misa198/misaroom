export interface Layout {
  columns: number;
  rows: number;
}

function calLayout(amount: number): Layout {
  const columns = Math.floor(1 / 2 + Math.sqrt(amount + 1 / 4));
  const rows = Math.ceil(amount / columns);
  return { columns, rows };
}

export { calLayout };
