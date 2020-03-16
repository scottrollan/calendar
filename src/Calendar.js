//npm (yarn) install date-fns

import React from "react";
import { 
    format, 
    addMonths, 
    subMonths, 
    startOfWeek,
    endOfWeek,
    startOfMonth,
    endOfMonth,
    addDays,
    isSameDay,
    isSameMonth,
 } from "date-fns";
// import "./App.css";
import './Calendar.css'

class Calendar extends React.Component {
  state = {
    today: format(new Date(), "MMMM yyyy"),
    currentMonth: new Date(),
    selectedDate: new Date(),
  };

  renderHeader() {
    return (
      <div className="header row flex-middle">
        <div className="col colStart"  onClick={this.prevMonth}>
          <div className="icon">
            chevron_left
          </div>
        </div>
        <div className="col colCenter stacked">
            <span>{format(this.state.currentMonth, 'MMMM yyyy')} </span>
            <button onClick={this.goToToday}>Go To Today</button>
        </div>
        <div className="col colEnd" onClick={this.nextMonth}>
          <div className="icon">chevron_right</div>
        </div>
      </div>
    );
  }

  renderDays() {
      const dateFormat = 'EEEE'
      const days = []

      let startDate = startOfWeek(this.state.currentMonth)

      for(let i = 0; i < 7; i++) {
          days.push(
              <span className="col colCenter" key={i}>
                  {format(addDays(startDate, i), dateFormat)}
              </span>
          )
      }
      return <div className="days row">{days}</div>
  }

  renderCells() {
      const { currentMonth, selectedDate } = this.state
      const monthStart = startOfMonth(currentMonth)
      const monthEnd = endOfMonth(monthStart)
      const startDate = startOfWeek(monthStart)
      const endDate = endOfWeek(monthEnd)
      const dateFormat = "d"
      const rows = []

      let days = []
      let day = startDate
      let formattedDate = ""

      while(day <= endDate) {
          for(let i = 0; i <7; i++) {
              formattedDate = format(day, dateFormat)
              const cloneDay = day
              days.push(
                  <div
                  className={`col cell ${
                      !isSameMonth(day, monthStart)
                      ? "disabled"
                      : isSameDay(day, selectedDate) ? "selected" : ""
                  }`}
                  key={day}
                  onClick={() => this.onDateClick(cloneDay)}
                  >
                      <span className="number">{formattedDate}</span>
                      <span className="bg">{formattedDate}</span>
                  </div>
              )
              day = addDays(day, 1)
          }
          rows.push(
              <div className="row" key={day}>{days}</div>
          )
          days = []
      }
      return <div className="body">{rows}</div>
  }

  onDateClick = day => {
    this.setState({
        selectedDate: day
      })
  };
  goToToday = () => {
      this.setState({
          currentMonth: new Date(),
          selectedDate: new Date()
      })
      this.renderCells()
  }

  nextMonth = () => {
    this.setState({
        currentMonth: addMonths(this.state.currentMonth, 1)
      })
  };

  prevMonth = () => {
      this.setState({
          currentMonth: subMonths(this.state.currentMonth, 1)
      })
  };

  render() {
    return (
      <div className="calendar">
        {this.renderHeader()}
        {this.renderDays()}
        {this.renderCells()}
      </div>
    );
  }
}

export default Calendar;
