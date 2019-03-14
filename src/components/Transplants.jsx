import React, { Component } from "react";
import "../sass/transplants.sass";

export default class Transplants extends Component{
  constructor(props){
    super(props);

  }

  a(){
    console.log("qeqwqert");
  }

  render(){
    return (
      <div className="transplants">

        <p className="transplants__p">Количество пересадок</p>

        <ul className="transplants__options-list">

          <li className="options-list-item">

            <input type="checkbox" className="options-list-item__input" id="all" name="count-of-transplants-selector" 
              onChange={this.props.onCountOfTransplantsChange}
              checked={this.props.countOfTransplants["all"]}
            />
            <label htmlFor="all" className="options-list-item__label">Все</label>
            
          </li>

          <li className="options-list-item">

            <input type="checkbox" className="options-list-item__input" id="0" name="count-of-transplants-selector" 
              onChange={this.props.onCountOfTransplantsChange}
              checked={this.props.countOfTransplants["0"] || this.props.countOfTransplants["all"]}
            />
            <label htmlFor="0" className="options-list-item__label">Без пересадок</label>

            <span className="options-list-item__onlyThis" data-countoftransplants={"0"} onClick={this.props.onlyClick}>Только</span>
            
          </li>

          <li className="options-list-item">

            <input type="checkbox" className="options-list-item__input" id="1" name="count-of-transplants-selector"
              onChange={this.props.onCountOfTransplantsChange}
              checked={this.props.countOfTransplants["1"] || this.props.countOfTransplants["all"]}
            />
            <label htmlFor="1" className="options-list-item__label">1 пересадка</label>

            <span className="options-list-item__onlyThis" data-countoftransplants={"1"} onClick={this.props.onlyClick}>Только</span>
            
          </li>

          <li className="options-list-item">

            <input type="checkbox" className="options-list-item__input" id="2" name="count-of-transplants-selector"
              onChange={this.props.onCountOfTransplantsChange}
              checked={this.props.countOfTransplants["2"] || this.props.countOfTransplants["all"]}
            />
            <label htmlFor="2" className="options-list-item__label">2 пересадки</label>

            <span className="options-list-item__onlyThis" data-countoftransplants={"2"} onClick={this.props.onlyClick}>Только</span>
            
          </li>

          <li className="options-list-item">

            <input type="checkbox" className="options-list-item__input" id="3" name="count-of-transplants-selector"
              onChange={this.props.onCountOfTransplantsChange}
              checked={this.props.countOfTransplants["3"] || this.props.countOfTransplants["all"]}
            />
            <label htmlFor="3" className="options-list-item__label">3 пересадки</label>

            <span className="options-list-item__onlyThis" data-countoftransplants={"3"} onClick={this.props.onlyClick}>Только</span>
            
          </li>

        </ul>
      </div>
    );
  }
}