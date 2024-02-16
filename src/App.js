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
  const [user, setUser] = useState("user-1")
  return (
    <div className="profile-container">
      {/* <button onClick={() => setShow(!show)}>
        {show ? "Unmount" : "Mount"} the component
      </button>
      {show && <hr />}
      {show && <Playground />}
      <Form />
      <ExampleComponent /> */}

      <button onClick={

        () => {
          if (user === "user-1") {
            setUser("user-2")
          } else {
            setUser("user-1")
          }
        }

      }>
        TOGGLE USER
      </button>
      <Profile userId={user} />
    </div>
  );
}

function Form() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  console.log("I am rendered");
  // 🔴 Avoid: a)redundant state and b)unnecessary Effect
  // const [fullName, setFullName] = useState(""); // when the component rendered with either firstName/lastName variable update,
  // console.log(fullName); // then fullName will hold the emptystring initial value

  // useEffect(() => {
  // setFullName(firstName + " " + lastName); // when useEffect runs due to firstName/lastName changed, then there will be the next render with the updated value for fullName.
  // }, [firstName, lastName]);
  // 🔴 Avoid: a)redundant state and b)unnecessary Effect

  // ✅️ Use a variable that stores the calculation(concatenation) done during right at the RENDERING PHASE
  let fullName = `${firstName} ${lastName}`;  // on every update of either firstName or lastName the component gets re-rendered. So, during that rendering/processing/preparing information to be committed and shown on the screen, this fullName processing also can be done during rendering only and we can happily use that Latest/correct value of the fullName variable.

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



//  Avoid resetting of state variables inside the useEffect, when prop changes, instead of that pass a key-prop with unique values into the component


export function ProfilePage({ userId }) {
  return (
    <Profile
      userId={userId}
      key={userId} // Each time userId changes, a new instance of Profile will be created with a different key
    />
  );
}

function Profile({ userId }) {
  const [comment, setComment] = useState('');

  const handleCommentChange = (event) => {
    setComment(event.target.value);
  };

  const handleCommentSubmit = () => {
    // Handle submitting comment
    console.log('Submitting comment:', comment);
    // Reset comment state after submitting
    setComment('');
  };

  return (
    <div className="profile">
      <h1 className="profile-title">User Profile: {userId}</h1>
      <textarea
        className="profile-comment"
        value={comment}
        onChange={handleCommentChange}
        placeholder="Write a comment..."
      />
      <button className="profile-button" onClick={handleCommentSubmit}>Submit</button>
    </div>
  );
}

