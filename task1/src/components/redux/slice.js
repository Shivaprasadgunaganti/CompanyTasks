import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = "https://dummyjson.com/todos";

export const fetchData = createAsyncThunk(
  "todo/fetchData",
  async (savedTodos) => {
    if (savedTodos) return savedTodos;
    const response = await axios.get(API_URL);
    return response.data.todos;
  }
);

export const addTodo = createAsyncThunk("todo/addTodo", async (newTodo) => {
  return newTodo;
});

export const updateTodo = createAsyncThunk(
  "todo/updateTodo",
  async ({ id, todo }) => {
    // const response = await axios.put(`${API_URL}/${id}`, { todo });
    // return response.data;
    return { id, todo };
  }
);

export const deleteTodo = createAsyncThunk("todo/deleteTodo", async (id) => {
  // await axios.delete(`${API_URL}/${id}`);
  return id;
});

const todoSlice = createSlice({
  name: "todo",
  initialState: { isLoading: false, data: [], isError: false },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchData.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchData.fulfilled, (state, action) => {
        state.data = action.payload;
        state.isLoading = false;
      })
      .addCase(fetchData.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
      })
      .addCase(addTodo.fulfilled, (state, action) => {
        state.data.push(action.payload);
      })
      .addCase(updateTodo.fulfilled, (state, action) => {
        const index = state.data.findIndex(
          (todo) => todo.id === action.payload.id
        );
        if (index !== -1) {
          state.data[index] = action.payload;
        }
      })
      .addCase(deleteTodo.fulfilled, (state, action) => {
        state.data = state.data.filter((todo) => todo.id !== action.payload);
      });
  },
});

export const { reducer } = todoSlice;
