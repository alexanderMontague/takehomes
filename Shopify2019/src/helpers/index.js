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
  if (error) {
    return error;
  }

  let totalRevenue = 0;

  rawData.forEach(order => {
    const {
      total_price,
      total_tax,
      total_shipping_price_set: { shop_money } // shipping
    } = order;

    // calculate price minus tax and shipping if there is any
    totalRevenue +=
      Number(total_price) - (Number(total_tax) + Number(shop_money.amount));
  });

  return totalRevenue.toFixed(2);
};

// Calculate the number of orders
export const calculateTotalOrders = rawData => {
  const error = checkError(rawData);
  if (error) {
    return error;
  }

  return rawData.length;
};

// Calculate the net average order price
export const calculateAverageOrderPrice = rawData => {
  const error = checkError(rawData);
  if (error) {
    return error;
  }

  const numOrders = Number(rawData.length);
  const totalPrice = calculateTotalRevenue(rawData);

  return (totalPrice / numOrders).toFixed(2);
};

// Calculate the most popular item
export const calculateMostPopularItem = rawData => {
  const error = checkError(rawData);
  if (error) {
    return error;
  }

  let orderMap = {};
  let mostPopularItem = { item: null, quantity: 0 };

  rawData.forEach(order => {
    const { line_items } = order;

    line_items.forEach(item => {
      const { title, quantity } = item;

      // if item is not in map, add it
      if (orderMap[title]) {
        orderMap[title].quantity += quantity;
      } else {
        // if item is, add to quantity
        orderMap[title] = { quantity };
      }
    });
  });

  Object.keys(orderMap).forEach(item => {
    if (orderMap[item].quantity > mostPopularItem.quantity) {
      mostPopularItem = { item: item, quantity: orderMap[item].quantity };
    }
  });

  return mostPopularItem;
};
