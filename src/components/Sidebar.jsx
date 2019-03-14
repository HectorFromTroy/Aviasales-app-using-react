import React, { Component } from "react";
import Currency from "./Currency";
import Transplants from "./Transplants";
import "../sass/sidebar.sass"

export default class Sidebar extends Component{


  render(){
    return (
      <div className={`sidebar ${this.props.shouldShowSidebar && "sidebar_visible"}`}>
        <Currency 
          currentCurrency={this.props.currency}
          onCurrencyChange={this.props.onCurrencyChange}
        />
        <Transplants 
          onCountOfTransplantsChange={this.props.onCountOfTransplantsChange}
          countOfTransplants={this.props.countOfTransplants}
          onlyClick={this.props.onlyClick}
        />
      </div>
    );
  }
}