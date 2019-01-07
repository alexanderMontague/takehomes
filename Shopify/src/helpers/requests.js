import axios from "axios";

// to prevent CORS / CORBS
const PROXY_URL = "https://cors-anywhere.herokuapp.com/";

// Fetch all shopify orders from API
export const fetchShopifyOrders = () => {
  return axios
    .get(
      `${PROXY_URL}https://shopicruit.myshopify.com/admin/orders.json?page=1&access_token=c32313df0d0ef512ca64d5b336a0d7c6`
    )
    .then(res => res.data.orders)
    .catch(err => ({ error: true, message: err.message }));
};
