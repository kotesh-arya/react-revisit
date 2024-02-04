import logo from "./logo.svg";
import "./App.css";

import { useState, useEffect, useMemo } from "react";

function Playground() {
  const [text, setText] = useState("abc");

  useEffect(() => {
    function onTimeout() {
      console.log("⏰ " + text);
    }

    console.log('🔵 Schedule "' + text + '" log');
    const timeoutId = setTimeout(onTimeout, 3000);

    return () => {
      console.log(
        '🟡 Cancel "' + text + '" log',
        "Iam a clean-up and I run before every next render and during unmounting of this COMPONENT"
      );
      clearTimeout(timeoutId);
    };
  }, [text]);

  return (
    <>
      <label>
        What to log:{" "}
        <input value={text} onChange={(e) => setText(e.target.value)} />
      </label>
      <h1>{text}</h1>
    </>
  );
}

export default function App() {
  const [show, setShow] = useState(false);
  return (
    <>
      <button onClick={() => setShow(!show)}>
        {show ? "Unmount" : "Mount"} the component
      </button>
      {show && <hr />}
      {show && <Playground />}
      <Form />
      <ExampleComponent />
    </>
  );
}

function Form() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  console.log("I am rendered");
  // 🔴 Avoid: a)redundant state and b)unnecessary Effect
  let fullName = `${firstName} ${lastName}`;
  // const [fullName, setFullName] = useState("");
  // useEffect(() => {
  //   setFullName(firstName + " " + lastName);
  // }, [firstName, lastName]);
  let sampleString = "kgdnlksdan";
  useMemo(() => {
    console.log("function from useMemo is running");
  }, [fullName]);
  return (
    <div>
      <form>
        <label htmlFor="first">
          {" "}
          firstName :
          <input
            value={firstName}
            onChange={(e) => {
              setFirstName(e.target.value);
            }}
            id="first"
            type="text"
          />
        </label>

        <label htmlFor="last">
          {" "}
          lastName:
          <input
            value={lastName}
            onChange={(e) => {
              setLastName(e.target.value);
            }}
            id="last"
            type="text"
          />
        </label>
      </form>
      <h4>First name entered is: {firstName}</h4>
      <h4>Last name entered is: {lastName}</h4>
      <h1>Full name is: {fullName}</h1>
    </div>
  );
}
//  NEVER SET STATE INSIDE A USEEFFECT, IT WILL CAUSE USELESS RENDER PASSES

// Caching expensive calculations with useMemo hook
// import { useMemo } from "react";

// function TodoList({ todos, filter }) {
//   const [newTodo, setNewTodo] = useState("");
//   const visibleTodos = useMemo(() => {
//     // ✅ Does not re-run unless todos or filter change
//     return getFilteredTodos(todos, filter);
//   }, [todos, filter]);
//   // ...
// }

function ExampleComponent() {
  let initialList = ["one", "two", "three"];
  let [filterText, setFilterText] = useState("");
  let [filteredList, setFilteredList] = useState(initialList);

  // setFilteredList(finalList);
  function inputChangeHandler(event) {
    let inputValue = event.target.value;
    setFilterText(inputValue);
    setFilteredList((singleParamater, two) => {
      console.log(
        singleParamater,
        "singleParamater supported for the updater function!!"
      );
      console.log(two, "twoo"); // this will be undefined, as the updater function only accepts a single parameter

      return initialList.filter((item) => item.includes(inputValue));
    });
  }
  useEffect(() => {
    setFilteredList(initialList.filter((item) => item.includes(filterText)));
  }, [filterText]);
  return (
    <>
      <input
        onChange={(e) => {
          // setFilterText(e.target.value);
          // setFilteredList(finalList);
          inputChangeHandler(e);
        }}
        value={filterText}
      />
      <h1>{filterText}</h1>
      <div>
        {filteredList.map((item) => (
          <p key={item}>{item}</p>
        ))}
      </div>
    </>
  );
}

