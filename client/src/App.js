import React, { useState, useEffect } from "react";
import "./App.css";
import axios from "axios";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import DeleteIcon from "@material-ui/icons/Delete";
import SaveIcon from "@material-ui/icons/Save";

const useStyles = makeStyles((theme) => ({
  primary: {
    color: "white",
    backgroundColor: "green",
    // width: "150px",
    fontFamily: "monospace",
    "&:hover": {
      color: "black",
      backgroundColor: "white",
    },
  },

  delete: {
    color: "white",
    backgroundColor: "red",
    fontFamily: "monospace",
    // width: "150px",
    "&:hover": {
      color: "black",
      backgroundColor: "white",
    },
  },
}));

function App() {
  const classes = useStyles();

  const [todosTitle, setTodosTitle] = useState("");
  const [todosDescription, setTodosDescription] = useState("");
  const [todos, setTodos] = useState([]);
  const [updateTodo, setUpdateTodo] = useState("");

  const newTodo = () => {
    axios.post("http://localhost:3001/newTodo", {
      todosTitle: todosTitle,
      todosDescription: todosDescription,
    });

    setTodos([
      ...todos,
      {
        todosTitle: todosTitle,
        todosDescription: todosDescription,
      },
    ]);
    console.log("todo added");
  };

  useEffect(() => {
    axios.get("http://localhost:3001/showTodo").then((response) => {
      setTodos(response.data);
    });
  }, []);

  const deleteTodo = (id) => {
    axios.delete(`http://localhost:3001/deleteTodo/${id}`).then((response) => {
      setTodos(
        todos.filter((val) => {
          return val.id !== id;
        })
      );
    });
  };

  const update = (id) => {
    axios
      .put("http://localhost:3001/update", {
        todosDescription: updateTodo,
        id: id,
      })
      .then((response) => {
        setTodos(
          todos.map((val) => {
            return val.id === id
              ? {
                  id: val.id,
                  todosTitle: val.todosTitle,
                  todosDescription: val.updateTodo,
                }
              : val;
          })
        );
      });
  };

  return (
    <div className="App">
      <div className="card">
        <h1>Welcome to my make a todo app</h1>
        <div className="input-top">
          <label className="input-top">New Todo:</label>
          <input
            type="text"
            onChange={(e) => {
              setTodosTitle(e.target.value);
            }}
          />
          <label className="input-top">Todo Description:</label>
          <textarea
            type="text"
            onChange={(e) => {
              setTodosDescription(e.target.value);
            }}
          />
          <Button
            variant="contained"
            onClick={newTodo}
            className={classes.primary}
            startIcon={<SaveIcon />}
          >
            New TODO
          </Button>
        </div>
        {/* <button onClick={showTodos}>Show todos</button> */}
        <div className="grid">
          {todos.map((val, key) => {
            return (
              <div className="todos">
                <h2>Task: {val.todosTitle}</h2>
                <h3>Description: {val.todosDescription}</h3>
                <div className="todo-info">
                  <label htmlFor=""> Update Todo: </label>
                  <input
                    type="text"
                    onChange={(e) => {
                      setUpdateTodo(e.target.value);
                    }}
                  />
                  <Button
                    variant="contained"
                    className={classes.primary}
                    startIcon={<SaveIcon />}
                    onClick={() => {
                      update(val.id);
                    }}
                  >
                    Update
                  </Button>
                  <Button
                    variant="contained"
                    className={classes.delete}
                    onClick={() => {
                      deleteTodo(val.id);
                    }}
                    startIcon={<DeleteIcon />}
                  >
                    Delete
                  </Button>
                  {/* <IconButton aria-label="delete">
                    <DeleteIcon
                      onClick={() => {
                        deleteTodo(val.id);
                      }}
                    />
                  </IconButton> */}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default App;
