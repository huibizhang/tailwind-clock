import React, { useState } from "react";
import AddAlarm from "../components/AddAlarm";
import AlarmHeader from "../components/AlarmHeader";

function Alarm() {
  const [time, setTime] = useState({
    alarmTime: "08:00",
    alarmSection: "AM",
    repeat: "每天",
  });
  const [showDelete, setShowDelete] = useState(false);
  const [alarms, setAlarms] = useState([time]);
  const [sideBar, setSideBar] = useState(true);
  const [toggle, setToggle] = useState("-translate-x-full");
  const [timeInput, setTimeInput] = useState("00 : 00");
  const [secInput, setSecInput] = useState("AM");
  const [repeatInput, setRepeatInput] = useState("Never");

  const onTimeChange = (e) => {
    e.preventDefault();
    setTimeInput(e.target.value);
  };

  const onSectionChange = (e) => {
    e.preventDefault();
    setSecInput(e.target.value);
  };

  const onRepeatChange = (e) => {
    e.preventDefault();
    setRepeatInput(e.target.value);
  };

  const displayDelete = () => {
    setShowDelete(!showDelete);
  };

  const handleDelete = (id) => {
    const filteredItems = alarms
      .slice(0, id)
      .concat(alarms.slice(id + 1, alarms.length));

    setAlarms(filteredItems);
  };

  const handleSideBar = () => {
    setSideBar(!sideBar);
    if (sideBar) {
      setToggle("translate-x-0");
    } else {
      setToggle("-translate-x-full");
      setTimeInput("00:00");
      setSecInput("AM");
    }
  };

  const addNewAlarm = () => {
    let newAlarm = {};
    newAlarm.alarmTime = timeInput;
    newAlarm.alarmSection = secInput;
    newAlarm.repeat = repeatInput;

    setAlarms([...alarms, newAlarm]);
  };

  return (
    <div className="relative">
      <header className="sticky top-0 z-50">
        <AlarmHeader displayDelete={displayDelete} />
      </header>
      <div className="h-98">
        {alarms.map((a, index) => {
          return (
            <AddAlarm
              key={index}
              id={index}
              alarm={a}
              showDelete={showDelete}
              handleDelete={handleDelete}
            />
          );
        })}
      </div>

      <div
        className={`px-4 absolute left-0 bottom-16 z-50 ${toggle} transform transition duration-200 ease-in-out`}
      >
        <div className="left-10 h-48 w-52 p-4 rounded-lg flex flex-col bg-gray-800">
          <label className="text-xs my-1 ">Time : (HH:MM)</label>
          <input
            className="px-2 text-xs text-gray-800 rounded-md"
            type="text"
            onChange={onTimeChange}
            value={timeInput}
          ></input>
          <label className="text-xs my-1">AM/PM:</label>
          <select
            className="px-2 text-gray-800 text-xs rounded-md"
            onChange={onSectionChange}
            value={secInput}
          >
            <option value="AM">AM</option>
            <option value="PM">PM</option>
          </select>
          <label className="text-xs my-1">Frequency:</label>
          <select
            className="px-2 text-gray-800 text-xs rounded-md"
            onChange={onRepeatChange}
            value={repeatInput}
          >
            <option value="Never">Never</option>
            <option value="Everyday">Everyday</option>
            <option value="WorkingDay">Working Day</option>
          </select>
          <button
            onClick={() => {
              addNewAlarm(timeInput, secInput, repeatInput);
              handleSideBar();
            }}
            className="my-2 w-16 h-7 items-center justify-center flex text-center mx-auto font-bold uppercase border-white border-2 rounded-lg p-2 text-xs text-white"
            type="text"
          >
            Add
          </button>
        </div>
      </div>

      <div className="absolute right-5 bottom-1">
        <button
          onClick={handleSideBar}
          className="p-0 w-12 h-12 bg-red-600 rounded-full hover:bg-blue-700 active:shadow-lg mouse shadow transition ease-in duration-200 focus:outline-none"
        >
          <svg
            viewBox="0 0 20 20"
            enableBackground="new 0 0 20 20"
            className="w-6 h-6 inline-block"
          >
            <path
              fill="#FFFFFF"
              d="M16,10c0,0.553-0.048,1-0.601,1H11v4.399C11,15.951,10.553,16,10,16c-0.553,0-1-0.049-1-0.601V11H4.601
                                    C4.049,11,4,10.553,4,10c0-0.553,0.049-1,0.601-1H9V4.601C9,4.048,9.447,4,10,4c0.553,0,1,0.048,1,0.601V9h4.399
                                    C15.952,9,16,9.447,16,10z"
            />
          </svg>
        </button>
      </div>
    </div>
  );
}

export default Alarm;
