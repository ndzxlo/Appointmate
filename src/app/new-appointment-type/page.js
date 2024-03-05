"use client";
import ReactCalendar from "../../../components/calendar/calendar";
import "./form.css";
import Input from "../../../components/input box/Input";
import addData from "../../../firebase/firestore/AddData";
import React from "react";
import Button from "../../../components/Button";
import { useRouter } from "next/navigation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

export default function Page() {
  const [appname, setAppName] = React.useState("");
  const [duration, setDuration] = React.useState("");
  const [location, setLocation] = React.useState("");
  const [days, setDays] = React.useState("");
  const [startTime, setStartTime] = React.useState("");
  const [endTime, setEndTime] = React.useState("");
  const [checkboxValues, setCheckboxValues] = React.useState({
    Monday: false,
    Tuesday: false,
  });
  const router = useRouter();

  function resetInput() {
    setAppName("");
    setDuration("");
    setLocation("");
    setDays("");
    setStartTime("");
    setEndTime("");
  }

  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target;
    setCheckboxValues((prevValues) => ({
      ...prevValues,
      [name]: checked,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const selectedOptions = Object.keys(checkboxValues).filter(
        (key) => checkboxValues[key]
      );

      await addData("checkboxData", selectedOptions);
    } catch (error) {
      console.error("error adding checked box", error);
    }
  };

  const addAppType = async (e) => {
    e.preventDefault();

    const data = {
      meetingName: appname,
      duration: duration,
      location: location,
      days: days,
      startTime: startTime,
      endTime: endTime,
    };

    const { result, error } = await addData("appointment types", data);

    if (error) {
      return console.log(error);
    } else {
      resetInput();
      alert("new appointment type created");
      router.push("/dashboard/appointment-type");
    }
  };

  return (
    <div className="meeting-form">
      <form className="create-form" onSubmit={addAppType}>
        <label>
          Appointment name
          <Input
            type="text"
            placeholder="enter appointment name"
            value={appname}
            onChange={(e) => setAppName(e.target.value)}
          />
        </label>
        <label>
          Duration
          <Input
            type="text"
            placeholder="choose appointment length"
            value={duration}
            onChange={(e) => setDuration(e.target.value)}
          />
        </label>
        <label>
          Location
          <Input
            type="text"
            placeholder={"appointment location"}
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          />
        </label>
        <p>select the day(s) of the week and time slot</p>
        <label>
          <input
            type="checkbox"
            name="Monday"
            checked={checkboxValues.Monday}
            onChange={handleCheckboxChange}
          />
          Monday
          <Input
            type="time"
            value={startTime}
            onChange={(e) => setStartTime(e.target.value)}
          />
          -
          <Input
            type="time"
            value={endTime}
            onChange={(e) => setEndTime(e.target.value)}
          />
          <FontAwesomeIcon icon={faPlus} />
        </label>
        <label>
          <input
            type="checkbox"
            name="Tuesday"
            checked={checkboxValues.Tuesday}
            onChange={handleCheckboxChange}
          />
          Tuesday
          <Input
            type="time"
            value={startTime}
            onChange={(e) => setStartTime(e.target.value)}
          />
          -
          <Input
            type="time"
            value={endTime}
            onChange={(e) => setEndTime(e.target.value)}
          />
          <FontAwesomeIcon icon={faPlus} />
        </label>
        <Button type="submit">save</Button>
      </form>
    </div>
  );
}
