"use client";
import { useState } from "react";
import Calendar from "react-calendar";
/*import "./calendar.css"; */

function ReactCalendar() {
  const [value, setValue] = useState(new Date());

  /*return (
    <div>
      <Calendar
        onChange={onChange}
        value={value}
        minDate={new Date()}
        onClickDay={(date) => console.log(date)}
      />
    </div>
  );
}*/

  function onChange(nextValue) {
    setValue(nextValue);
  }

  return (
    <Calendar
      onChange={onChange}
      value={value}
      minDate={new Date()}
      onClickDay={(date) => console.log(date)}
    />
  );
}

export default ReactCalendar;
