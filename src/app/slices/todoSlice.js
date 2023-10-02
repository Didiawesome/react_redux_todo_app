import { createSlice } from '@reduxjs/toolkit'

const getInitialTodos = () => {
  const localTodoList = localStorage.getItem('todoList')

  if (!localTodoList) {
    localStorage.setItem('todoList', JSON.stringify([]))
    return []
  }
  return JSON.parse(localTodoList)
}

const initialState = {
  filterStatus: 'all',
  todoList: getInitialTodos(),
}

export const todoSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {
    addTodo: (state, action) => {
      state.todoList.push(action.payload)
      const todoList = localStorage.getItem('todoList')
      if (todoList) {
        const todoListArr = JSON.parse(todoList)
        todoListArr.push({
          ...action.payload,
        })
        localStorage.setItem('todoList', JSON.stringify(todoListArr))
      }
    },
    deleteTodo: (state, action) => {
      const todoList = localStorage.getItem('todoList')
      if (todoList) {
        const todoListArr = JSON.parse(todoList)
        todoListArr.forEach((todo, index) => {
          if (todo.id === action.payload) {
            todoListArr.splice(index, 1)
          }
        })
        localStorage.setItem('todoList', JSON.stringify(todoListArr))
        state.todoList = todoListArr
      }
    },
    updateTodo: (state, action) => {
      const todoList = localStorage.getItem('todoList')

      if (todoList) {
        const todoListArr = JSON.parse(todoList)
        todoListArr.forEach((todo, index) => {
          if (todo.id === action.payload.id) {
            todo.status = action.payload.status
            todo.title = action.payload.title
          }
        })
        localStorage.setItem('todoList', JSON.stringify(todoListArr))
        state.todoList = todoListArr
      }
    },
    updateFilterStatus: (state, action) => {
      state.filterStatus = action.payload
    },
  },
})

export const { addTodo, deleteTodo, updateTodo, updateFilterStatus } =
  todoSlice.actions

export default todoSlice.reducer
