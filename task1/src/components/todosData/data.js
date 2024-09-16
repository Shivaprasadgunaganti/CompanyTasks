import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchData, addTodo, updateTodo, deleteTodo } from "../redux/slice";
import { Button, TextField } from "@mui/material";

import "./data.css";
import confetti from "canvas-confetti";

export const Data = () => {
  const [data, setData] = useState("");
  const [edit, setEdit] = useState(null);
  const [edited, setEdited] = useState("");

  const dispatch = useDispatch();
  const todosData = useSelector((state) => state.todo.data);

  useEffect(() => {
    const savedTodos = JSON.parse(localStorage.getItem("todos"));
    if (savedTodos) {
      dispatch(fetchData(savedTodos));
    } else {
      dispatch(fetchData());
    }
  }, [dispatch]);

  useEffect(() => {
    if (todosData.length > 0) {
      localStorage.setItem("todos", JSON.stringify(todosData));
    }
  }, [todosData]);

  const handleAddTodo = () => {
    if (data.trim()) {
      dispatch(addTodo({ todo: data }));
      setData("");
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
      });
    }
  };

  const handleUpdateTodo = (id) => {
    if (edited.trim()) {
      dispatch(updateTodo({ id, todo: edited }));
      setEdit(null);
      setEdited("");
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
      });
    }
  };

  const handleDeleteTodo = (id) => {
    dispatch(deleteTodo(id));
  };

  return (
    <div>
      <div className="input-data">
        <TextField
          id="filled-basic"
          label="Enter "
          variant="filled"
          type="text"
          value={data}
          onChange={(e) => setData(e.target.value)}
          style={{ width: 200 }}
        />
        <Button variant="contained" onClick={handleAddTodo} className="add">
          Add
        </Button>
      </div>

      <div className="api-data">
        <ol>
          {todosData.map((todo) => (
            <div key={todo.id} className="child-data">
              <li>
                {edit === todo.id ? (
                  <div className="li">
                    <TextField
                      id="filled-basic"
                      label="Edit the todo"
                      variant="filled"
                      type="text"
                      value={edited}
                      onChange={(e) => setEdited(e.target.value)}
                    />
                    <Button
                      variant="contained"
                      sx={{ ":hover": { backgroundColor: "orange" } }}
                      onClick={() => handleUpdateTodo(todo.id)}
                    >
                      Update
                    </Button>
                  </div>
                ) : (
                  <div className="li">
                    <span>{todo.todo}</span>
                    <Button
                      variant="contained"
                      sx={{ "&:hover": { backgroundColor: "red" } }}
                      onClick={() => {
                        setEdit(todo.id);
                        setEdited(todo.todo);
                      }}
                    >
                      Edit
                    </Button>
                    <Button
                      variant="contained"
                      sx={{ ":hover": { backgroundColor: "chocolate" } }}
                      onClick={() => handleDeleteTodo(todo.id)}
                    >
                      Delete
                    </Button>
                  </div>
                )}
              </li>
            </div>
          ))}
        </ol>
      </div>
    </div>
  );
};
