// check if API request fails
const checkError = data => {
  if (data.error) {
    return data.message;
  }
  return null;
};

// Calculate the total revenue from raw order list
export const calculateTotalRevenue = rawData => {
  const error = checkError(rawData);
  let totalRevenue = 0;

  if (error) {
    return error;
  }

  rawData.forEach(order => {
    const {
      total_price,
      total_tax,
      total_line_items_price_set: { total_shipping_price_set }
    } = order;

    // calculate price minus tax and shipping if there is any
    totalRevenue +=
      Number(total_price) -
      (Number(total_tax) + Number(total_shipping_price_set.shop_money.amount));
  });

  return totalRevenue;
};
