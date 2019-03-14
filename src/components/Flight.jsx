import React, { Component } from "react";
import "../sass/flight.sass";

export default class Flight extends Component{


  getCountOfStopsString(){
    return this.countOfStops[this.stops];
  }

  getFormattedDate(dateString){
    dateString = dateString.split(".");
    const date = new Date("20" + dateString[2], +dateString[1] - 1, dateString[0]);
    const month = ["января", "февраля", "марта", "апреля", "мая", "июня", "июля", "августа", "сентября", "октября", "ноября", "декабря"]
    const dayOfTheWeek = ["Вс", "Пн", "Вт", "Ср", "Чт", "Пт", "Сб"];
    return `${date.getDate()} ${month[date.getMonth()]} ${date.getFullYear()}, ${dayOfTheWeek[date.getDay()]}`;
  }

  getCurrencyMultiplier(currency){
    //here we might request data about currencies from some web-service
    const multipliers = {
      "rub": 1,
      "usd": 1/66,//1 usd = 66rub
      "eur": 1/75
    }

    return multipliers[currency];
  }

  getFinalPrice(price, currency){
    return Math.floor(price * this.getCurrencyMultiplier(currency));
  }

  shouldComponentUpdate(nextProps, nextState){

    let count = 0;

    for(let key in nextProps){
      if(this.props[key] === nextProps[key]){
        count++;
      }
      else{
        break;
      }
    }

    if(Object.keys(this.props).length === count){
      console.log("shouldn't");
      return false;
    }
    else{
      console.log("Should");
      return true;
    }

  }

  render(){
    return (
      <div className="flight">
        <div className="flight-leftSide">
          <div className="flight__carrier-wrapper">
            <img src={`../../img/${this.props.carrier}-logo.png`} alt={`${this.props.carrier}-logo`} className="flight__carrier" width="160px"/>
          </div>
          <button className="flight__buyButton">
            Купить <br/>за <span className={`buyButton__price_${this.props.currency}`}>{this.getFinalPrice(this.props.price, this.props.currency)}</span> 
          </button>
        </div>

        <div className="flight-rightSide">

          <div className="flight__schedule">

            <div className="schedule__departure-time schedule__time">
              {this.props.departure_time}
            </div>

            <div className="schedule__transplants-count">
              <div className="transplants-count__span">{this.props.countOfStopsString}</div>
            </div>

            <div className="schedule__arrival-time schedule__time">
              {this.props.arrival_time}
            </div>

          </div>

          <div className="flight__city-date">
            <div className="city-date__origin city-date__item">
              <div className="city-date__city">
                <span className="city-date__origin-name">
                  {this.props.origin}, {this.props.origin_name}
                </span>
              </div>
              
              <div className="city-date__date">
                {this.getFormattedDate(this.props.departure_date)}
              </div>
            </div>

            <div className="city-date__destination city-date__item">
              <div className="city-date__city">
                <span className="city-date__destination-name">
                  {this.props.destination_name}, {this.props.destination}
                </span>
              </div>

              <div className="city-date__date">
                {this.getFormattedDate(this.props.arrival_date)}
              </div>
            </div>
          </div>

        </div>
      </div>
    );
  }
}