import { useState, useRef } from "react";
import Button from "../UI/Button";
import Card from "../UI/Card";
import ErrorModal from "../UI/ErrorModal";
import Wrapper from "../Helpers/Wrapper";

import classes from "./AddUser.module.css";

const AddUser = (props) => {
  const nameInputRef = useRef();
  const ageInputRef = useRef();

  //commented code is alternative using state hooks

  // const [enteredUsername, setEnteredUsername] = useState("");
  // const [enteredAge, setEnteredAge] = useState("");
  const [error, setError] = useState();

  const addUserHandler = (event) => {
    event.preventDefault();

    const enteredName = nameInputRef.current.value;
    const enteredUserAge = ageInputRef.current.value;

    // if (enteredUsername.trim().length === 0 || enteredAge.trim().length === 0) {
    //   setError({
    //     title: "Invalid input",
    //     message: "Please enter a valid name and age (non-empty values)",
    //   });
    //   return;
    // }

    if (enteredName.trim().length === 0 || enteredUserAge.trim().length === 0) {
      setError({
        title: "Invalid input",
        message: "Please enter a valid name and age (non-empty values)",
      });
      return;
    }

    // if (+enteredAge < 1) {
    //   setError({
    //     title: "Invalid age",
    //     message: "Please enter a valid age ( > 0)",
    //   });
    //   return;
    // }

    if (+enteredUserAge < 1) {
      setError({
        title: "Invalid age",
        message: "Please enter a valid age ( > 0)",
      });
      return;
    }

    // props.onAddUser(enteredUsername, enteredAge);
    // setEnteredAge("");
    // setEnteredUsername("");

    props.onAddUser(enteredName, enteredUserAge);
    nameInputRef.current.value = "";
    ageInputRef.current.value = "";
  };

  // const userNameChangeHandler = (event) => {
  //   setEnteredUsername(event.target.value);
  // };

  // const ageChangeHandler = (event) => {
  //   setEnteredAge(event.target.value);
  // };

  const errorHandler = () => {
    setError(null);
  };

  return (
    <Wrapper>
      {error && (
        <ErrorModal
          onConfirm={errorHandler}
          title={error.title}
          message={error.message}
        />
      )}
      <Card className={classes.input}>
        <form onSubmit={addUserHandler}>
          <label htmlFor="username">UserName</label>
          <input
            type="text"
            id="username"
            ref={nameInputRef}
            // value={enteredUsername}
            // onChange={userNameChangeHandler}
          />
          <label htmlFor="age">Age (Years)</label>
          <input
            type="number"
            id="age"
            ref={ageInputRef}
            // value={enteredAge}
            // onChange={ageChangeHandler}
          />
          <Button type="submit">Add user</Button>
        </form>
      </Card>
    </Wrapper>
  );
};

export default AddUser;
