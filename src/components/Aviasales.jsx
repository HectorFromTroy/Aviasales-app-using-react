
import React, { Component } from "react";
import logo from "../../public/img/logo.png";
import "../sass/fonts.sass";

//components
import Sidebar from "./Sidebar";
import Flight from "./Flight";

import shortId from "short-id";

export default class Aviasales extends Component{
  constructor(props){
    super(props);

    this.state = {
      currency: "rub",
      tickets: [], 
      countOfTransplants: {
        "all": true,
        "0": true,
        "1": true,
        "2": true,
        "3": true
      },

      shouldShowSidebar: false,
      showBackdrop: false
    };
    this.countOfStops = {
      0: "Без пересадок",
      1: "1 пересадка",
      2: "2 пересадки",
      3: "3 пересадки",
    }
    this.currencyMultiplier = 1;
    this.allTickets;

    this.changeCurrency = this.changeCurrency.bind(this);
    this.onCountOfTransplantsChange = this.onCountOfTransplantsChange.bind(this);
    this.onlyClick = this.onlyClick.bind(this);
    this.toggleFilterMenu = this.toggleFilterMenu.bind(this);
  }

  async componentDidMount(){
    this.setState({
      tickets: await this.getSortedTickets()
    });
  }

  async getSortedTickets(){

    try{
      this.allTickets = (await (await fetch("./tickets.json")).json()).tickets;
    }
    catch(e){
      console.log(e);
    }

    let tickets = this.filterTickets(this.allTickets, this.state.countOfTransplants);

    tickets.sort((a, b)=>
      a.price - b.price
    );

    //setting unique keys
    for(let i = 0; i < tickets.length; i++){
      tickets[i].key = shortId.generate();
    }
    return tickets;
  }

  filterTickets(tickets, countOfTransplants){
    if(countOfTransplants["all"]){
      return tickets;
    }

    return tickets.filter(ticket => countOfTransplants[ticket.stops]);
  }

  onCountOfTransplantsChange(event){
    const transplants = event.target.id;

    this.setState(prevState => {

      let countOfTransplants = prevState.countOfTransplants;

      if(transplants === "all" && countOfTransplants["all"]){
        //set all options to false
        for(let key in countOfTransplants){
          countOfTransplants[key] = false;
        }
      }
      else{
        if(transplants === "all"){//it means if pressed all but it was false
          //set all options to true
          for(let key in countOfTransplants){
            countOfTransplants[key] = true;
          }
        }
        else{//all not clicked
          countOfTransplants[transplants] = !countOfTransplants[transplants];
          countOfTransplants["all"] = false;
          //setting ALL option if all non-ALL-options are selected without clicking ALL button
          setAllToTrue();
        }
      }

      return {
        countOfTransplants: countOfTransplants,
        tickets: this.filterTickets(this.allTickets, countOfTransplants)
      }

      function setAllToTrue(){
        let counter = 0;
        for(let key in countOfTransplants){
          if(countOfTransplants[key]){
            counter++;
          }
        }

        if(counter === Object.keys(countOfTransplants).length - 1){
          countOfTransplants["all"] = true;
        }
      }

    });
    
  }

  onlyClick(event){
    const transplant = event.target.dataset.countoftransplants;
    
    this.setState(prevState => {

      const countOfTransplants = prevState.countOfTransplants;

      for(let key in countOfTransplants){
        if(key === transplant){
          countOfTransplants[key] = true;
        }
        else{
          countOfTransplants[key] = false;
        }
      }
      
      return {
        countOfTransplants: countOfTransplants,
        tickets: this.filterTickets(this.allTickets, countOfTransplants)
      };
    });
  }

  changeCurrency(event){
    this.setState({
      currency: event.target.id
    });
  }

  toggleFilterMenu(){

    this.setState(prevState => ({
      showBackdrop: !prevState.showBackdrop,
      shouldShowSidebar: !prevState.shouldShowSidebar
    }));

  }



  render(){
    return (
      <div className="app-wrapper">

        {this.state.showBackdrop && <div className="backdrop" onClick={this.toggleFilterMenu}></div>}

        <header className="header">
          <div className="logo-wrapper">
            <img src={logo} alt="aviasales logo"/>
          </div>

          <button className="filter-button" onClick={this.toggleFilterMenu}></button>
        </header>

        <main className="main">

          <Sidebar 
            currency={this.state.currency}
            onCurrencyChange={this.changeCurrency}
            onCountOfTransplantsChange={this.onCountOfTransplantsChange}
            countOfTransplants={this.state.countOfTransplants}
            onlyClick={this.onlyClick}

            shouldShowSidebar={this.state.shouldShowSidebar}
          /> 
          <div className="tickets">
            {this.state.tickets.map(ticket =>
              <Flight
                carrier={ticket.carrier}
                departure_time={ticket.departure_time}
                arrival_time={ticket.arrival_time}
                stops={ticket.stops}
                origin={ticket.origin}
                origin_name={ticket.origin_name}
                destination_name={ticket.destination_name}
                destination={ticket.destination}
                departure_date={ticket.departure_date}
                arrival_date={ticket.arrival_date}
                price={ticket.price}
                countOfStopsString={this.countOfStops[ticket.stops]}
                currency={this.state.currency} 

                key={ticket.key}
              />
            )}
          </div>
        </main>
      </div>
    );
  }
}