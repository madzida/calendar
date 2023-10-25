import React, { Component } from "react";
import CalendarDays from "./Calendar_view";
import "./Calendar.css";

export default class Calendar extends Component {
  constructor(props) {
    super(props);
    this.weekdays = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
    this.months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];

    this.state = {
      currentDay: new Date(),
      current: new Date(),
      events: props.event,
    };
    this.month = new Date().getMonth() + 1;
    this.year = this.state.current.getFullYear();
    window.history.pushState(null, "", "/" + this.year + "-" + this.month);
  }
  componentDidUpdate(prevProps) {
    if (this.props.event !== prevProps.event) {
      this.setState({ events: this.props.event });
    }
  }
  nextMonth = () => {
    this.month = this.month + 1;
    if (this.month > 12) {
      this.month = 1;
      this.year = this.year + 1;
    }
    window.history.pushState(null, "", "/" + this.year + "-" + this.month);
    this.setState({
      current: new Date(
        this.state.current.getFullYear(),
        this.state.current.getMonth() + 1,
        1
      ),
    });
  };

  previousMonth = () => {
    this.month = this.month - 1;
    if (this.month < 1) {
      this.month = 12;
      this.year = this.year - 1;
    }
    window.history.pushState(null, "", "/" + this.year + "-" + this.month);
    this.setState({
      current: new Date(
        this.state.current.getFullYear(),
        this.state.current.getMonth() - 1,
        1
      ),
    });
  };
  render() {
    return (
      <div className="calendar">
        <div className="calendar-header">
          <div className="title">
            <h2>
              {this.months[this.state.current.getMonth()]}{" "}
              {this.state.current.getFullYear()}
            </h2>
          </div>
          <div className="tools">
            <button onClick={this.previousMonth}>
              <p>
                <i class="arrow left"></i>
              </p>
            </button>
            <p className="month">
              {this.months[this.state.current.getMonth()].substring(0, 3)}{" "}
            </p>
            <button onClick={this.nextMonth}>
              <p>
                <i class="arrow right"></i>
              </p>
            </button>
          </div>
        </div>
        <div className="calendar-body">
          <div className="table-header">
            {this.weekdays.map((weekday) => {
              return (
                <div className="weekday">
                  <p>{weekday}</p>
                </div>
              );
            })}
          </div>
          <CalendarDays day={this.state} />
        </div>
      </div>
    );
  }
}
