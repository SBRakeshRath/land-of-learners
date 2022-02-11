import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { useState, useLayoutEffect, useMemo } from "react";
import "./datePicker.scss";
export default function DatePicker(props) {
  const [currentDate, setDate] = useState(new Date());
  const [dateInput, steDateInput] = useState(new Date().getDate());
  const [yearInput, setYearInput] = useState(new Date().getFullYear());
  const [monthInput, setMonthInput] = useState(new Date().getMonth());

  //year
  const nd = new Date().getFullYear();
  const start = nd - 150;
  const end = nd;

  const handleChangeOfYear = (e) => {
    setYearInput(e.target.value);
    setDate(new Date(e.target.value, monthInput, dateInput));
  };

  const optionArray = Array(end - start + 1)
    .fill()
    .map((_, i) => start + i);

  //month
  const monthArr = () => {
    let arr = [
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

    if (currentDate.getFullYear() === new Date().getFullYear()) {
      const currentMonth = new Date().getMonth();
      arr = arr.filter((_, i) => i <= currentMonth);
    }
    return arr;
  };

  const handleChangeOfMonth = (e) => {
    setMonthInput(e.target.value);
    setDate(new Date(yearInput, e.target.value, dateInput));
  };

  //date
  const dateArr = () => {
    const daysInMonth = new Date(yearInput, monthInput + 1, 0).getDate();
    const arr = new Array(daysInMonth).fill().map((_, i) => i + 1);
    return arr;
  };
  const handleChangeOfDate = (e) => {
    steDateInput(e.target.value);
    setDate(new Date(yearInput, monthInput, e.target.value));
  };

  useLayoutEffect(() => {
    steDateInput(1);
    setMonthInput(0);
  }, [monthInput, yearInput]);

  return (
    <>
      <div className="pickDate" id="customDatePicker">
        <div className="yearSelector selectorBox">
          <FormControl fullWidth>
            <InputLabel>Year</InputLabel>
            <Select
              value={yearInput}
              defaultValue=""
              label="Year"
              onChange={handleChangeOfYear}
            >
              {optionArray.map((item) => {
                return (
                  <MenuItem value={item} key={item}>
                    {item}
                  </MenuItem>
                );
              })}
            </Select>
          </FormControl>
        </div>
        <div className="monthSelector selectorBox">
          <FormControl fullWidth>
            <InputLabel>Month</InputLabel>
            <Select
              value={monthInput}
              defaultValue=""
              label="Month"
              onChange={handleChangeOfMonth}
            >
              {monthArr().map((item, i) => {
                return (
                  <MenuItem value={i} key={item}>
                    {item}
                  </MenuItem>
                );
              })}
            </Select>
          </FormControl>
        </div>
        <div className="dateSelector selectorBox">
          <FormControl fullWidth>
            <InputLabel>Date</InputLabel>
            <Select
              value={dateInput}
              defaultValue=""
              label="Date"
              onChange={handleChangeOfDate}
            >
              {dateArr().map((item, i) => {
                return (
                  <MenuItem value={item} key={item}>
                    {item}
                  </MenuItem>
                );
              })}
            </Select>
          </FormControl>
        </div>
        <input
          type="hidden"
          name={(props.name || "") + "-date"}
          value={dateInput}
        />
        <input
          type="hidden"
          name={(props.name || "") + "-month"}
          value={monthInput + 1}
        />
        <input
          type="hidden"
          name={(props.name || "") + "-year"}
          value={yearInput}
        />
      </div>
    </>
  );
}
