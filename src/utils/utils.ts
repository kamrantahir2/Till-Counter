export const gbp = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "GBP",
});

const date = new Date();

export const currentDate = `${date.getDate()}-${
  date.getMonth() + 1
}-${date.getFullYear()}`;
