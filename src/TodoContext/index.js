import React from "react";
import { useLocalStorage } from "./useLocalStorage";

const TodoContext = React.createContext();

function TodoProvider({ children }) {
  const {
    item: todoList,
    saveItem: saveTodos,
    loading,
    error
  } = useLocalStorage('TODOS_V1', []);
  const [searchValue, setSearchValue] = React.useState('');
  const [openModal, setOpenModal] = React.useState(false);

  const completedTodos = todoList.filter(
    todo => !!todo.completed
  ).length;
  const totalTodos = todoList.length;

  const searchedTodos = todoList.filter(
    todo => todo.text.toLowerCase().includes(searchValue.toLowerCase()
  ));
  
  const completeTodo = (text) => {
    const newItem = [...todoList];
    const todoIndex = newItem.findIndex(
      (todo) => todo.text === text
    );
    newItem[todoIndex].completed = true;
    saveTodos(newItem);
  };

  const deleteTodo = (text) => {
    const newItem = [...todoList];
    const todoIndex = newItem.findIndex(
      (todo) => todo.text === text
    );
    newItem.splice(todoIndex, 1);
    saveTodos(newItem);
  };

  const addTodo = (text) => {
    const newItem = [...todoList];
    newItem.push({
      text: text,
      completed: false
    });
    saveTodos(newItem);
  }
  
  return (
    <TodoContext.Provider value={{
      loading,
      error,
      completedTodos,
      totalTodos,
      searchValue,
      setSearchValue,
      searchedTodos,
      addTodo,
      completeTodo,
      deleteTodo,
      openModal,
      setOpenModal,
    }}>
      {children}
    </TodoContext.Provider>
  );
}

export { TodoContext, TodoProvider };