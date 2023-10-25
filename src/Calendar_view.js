import Popup from "./Popup";
import React, { useState, useEffect } from "react";
function CalendarDays(props) {
  const [buttonPopup, setButtonPopup] = useState(false);
  const [popupEvent, setPopupEvent] = useState("");
  const firstDayOfMonth = new Date(
    props.day.current.getFullYear(),
    props.day.current.getMonth(),
    1
  );
  const weekdayOfFirstDay = firstDayOfMonth.getDay();
  let currentDays = [];
  function popUpInfo(popup_btn, events) {
    setButtonPopup(popup_btn);
    if (popup_btn === true) {
      var year = events[0].start.getFullYear();
      var day = events[0].start.getDate();
      var month = events[0].start.getMonth() + 1;
      setPopupEvent({
        title: events[0].title,
        author: events[0].author,
        email: events[0].email,
        date: day + "." + month + "." + year,
      });
    }
  }
  for (let day = 0; day < 42; day++) {
    if (day === 0 && weekdayOfFirstDay === 0) {
      firstDayOfMonth.setDate(firstDayOfMonth.getDate() - 7);
    } else if (day === 0) {
      firstDayOfMonth.setDate(
        firstDayOfMonth.getDate() + (day - weekdayOfFirstDay)
      );
    } else {
      firstDayOfMonth.setDate(firstDayOfMonth.getDate() + 1);
    }

    let calendarDay = {
      currentMonth: firstDayOfMonth.getMonth() === props.day.current.getMonth(),
      date: new Date(firstDayOfMonth),
      month: firstDayOfMonth.getMonth(),
      number: firstDayOfMonth.getDate(),
      selected:
        firstDayOfMonth.getDate() === new Date().getDate() &&
        firstDayOfMonth.getMonth() === props.day.current.getMonth() &&
        props.day.current.getMonth() === new Date().getMonth() &&
        new Date().getFullYear() === firstDayOfMonth.getFullYear(),
      year: firstDayOfMonth.getFullYear(),
    };
    currentDays.push(calendarDay);
  }

  return (
    <div className="table-content">
      {currentDays.map((day) => {
        var same_day_events = [];
        if (typeof props.day.events != "undefined") {
          same_day_events = props.day.events.filter(
            (vendor) =>
              JSON.stringify(vendor["start"]) == JSON.stringify(day.date)
          );
        }
        return (
          <div
            className={
              "calendar-day" +
              (day.currentMonth ? " current" : "") +
              (day.selected ? " selected" : "")
            }
          >
            <p className="number">{day.number}</p>
            <p
              className="event"
              onClick={() =>
                same_day_events.length != 0
                  ? popUpInfo(true, same_day_events)
                  : popUpInfo(false, same_day_events)
              }
            >
              {same_day_events.length != 0 ? same_day_events[0].title : ""}
            </p>
            <Popup trigger={buttonPopup} setTrigger={setButtonPopup}>
              {popupEvent.title}
              {popupEvent.author}
              {popupEvent.email}
              {popupEvent.date}
            </Popup>
          </div>
        );
      })}
    </div>
  );
}

export default CalendarDays;
