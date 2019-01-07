import React, { Component } from "react";

import shopifyLogo from "../../assets/shopify.png";
import styles from "./Layout.scss";

import ContentRow from "../../components/ContentRow";
import { fetchShopifyOrders } from "../../helpers/requests";
import {
  calculateTotalRevenue,
  calculateTotalOrders,
  calculateAverageOrderPrice,
  calculateMostPopularItem
} from "../../helpers";

class Layout extends Component {
  state = {
    totalRevenue: "...",
    totalOrders: "...",
    averageOrderPrice: "...",
    mostPopularItem: { item: "...", quantity: "" }
  };

  async componentDidMount() {
    const shopifyOrders = await fetchShopifyOrders();

    const totalRevenue = calculateTotalRevenue(shopifyOrders);
    const totalOrders = calculateTotalOrders(shopifyOrders);
    const averageOrderPrice = calculateAverageOrderPrice(shopifyOrders);
    const mostPopularItem = calculateMostPopularItem(shopifyOrders);

    this.setState({
      totalRevenue,
      totalOrders,
      averageOrderPrice,
      mostPopularItem
    });
  }

  render() {
    const {
      totalRevenue,
      totalOrders,
      averageOrderPrice,
      mostPopularItem
    } = this.state;

    return (
      <div className={styles.backdrop}>
        <div className={styles.header}>
          <img className={styles.shopifyLogo} src={shopifyLogo} />
          Shopify Orders
        </div>
        <div className={styles.row}>
          <ContentRow
            title="Total Order Revenue:"
            data={totalRevenue}
            isTopRow
          />
        </div>
        <div className={styles.flexRow}>
          <ContentRow title="Total Orders:" data={totalOrders} />
          <ContentRow title="Average Order Price:" data={averageOrderPrice} />
          <ContentRow
            title="Most Popular Item:"
            data={mostPopularItem}
            isItem
          />
        </div>
      </div>
    );
  }
}

export default Layout;
