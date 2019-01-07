import React, { Component } from "react";

import shopifyLogo from "../../assets/shopify.png";
import styles from "./Layout.scss";

import ContentRow from "../../components/ContentRow";
import { fetchShopifyOrders } from "../../helpers/requests";
import { calculateTotalRevenue } from "../../helpers";

class Layout extends Component {
  state = {
    totalRevenue: "...",
    totalOrders: "...",
    avgOrderPrice: "...",
    mostPopularItem: "..."
  };

  async componentDidMount() {
    const shopifyOrders = await fetchShopifyOrders();
    console.log(shopifyOrders);

    const totalRevenue = calculateTotalRevenue(shopifyOrders);
    console.log(totalRevenue);
  }

  render() {
    const {
      totalRevenue,
      totalOrders,
      avgOrderPrice,
      mostPopularItem
    } = this.state;

    return (
      <div className={styles.backdrop}>
        <div className={styles.header}>
          <img className={styles.shopifyLogo} src={shopifyLogo} />
          Shopify Orders
        </div>
        <div className={styles.row}>
          <ContentRow title="Total Order Revenue:" data={totalRevenue} />
        </div>
        <div className={styles.flexRow}>
          <ContentRow title="Total Orders:" data={totalOrders} />
          <ContentRow title="Average Order Price:" data={avgOrderPrice} />
          <ContentRow title="Most Popular Item:" data={mostPopularItem} />
        </div>
      </div>
    );
  }
}

export default Layout;
