import React, { Component } from "react";
import "../sass/currency.sass";

export default class Currency extends Component{


  render(){
    return (
      <div className="currency">

        <p className="currency__p">Валюта</p>

        <form className="currency__form">
        
          <input type="radio" name="currencySelector" id="rub" className="currency__input"
            checked = {this.props.currentCurrency == "rub"}
            onChange = {this.props.onCurrencyChange}
          />
          <label htmlFor="rub" className="currency__label currency__label_left-border-radius">Rub</label> 

          <input type="radio" name="currencySelector" id="usd" className="currency__input"
            checked = {this.props.currentCurrency == "usd"}
            onChange = {this.props.onCurrencyChange}
          />
          <label htmlFor="usd" className="currency__label">Usd</label>

          <input type="radio" name="currencySelector" id="eur" className="currency__input"
            checked = {this.props.currentCurrency == "eur"}
            onChange = {this.props.onCurrencyChange}
          />
          <label htmlFor="eur" className="currency__label currency__label_right-border-radius">Eur</label>

        </form>
      </div>
    );
  }
}