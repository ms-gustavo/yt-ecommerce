export const formatNumber = (digit: number) => {
  return new Intl.NumberFormat("pt-br").format(digit);
};
