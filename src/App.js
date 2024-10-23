import React, { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [users, setUsers] = useState([]);
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const usersResponse = await axios.get('https://jsonplaceholder.typicode.com/users');
        const todosResponse = await axios.get('https://jsonplaceholder.typicode.com/todos');

        setUsers(usersResponse.data.slice(0, 5));
        setTodos(todosResponse.data);
      } catch (error) {
        console.error('Veri çekme hatası:', error);
      }
    };

    fetchData();
  }, []);

  const getUserTodos = (userId) => {
    return todos.filter(todo => todo.userId === userId).slice(0, 5);
  };

  return (
    <div>
      <h1>Kullanıcılar ve ToDo Listesi</h1>
      <ul>
        {users.map(user => (
          <li key={user.id}>
            <h2>{user.name} - {user.email}</h2>
            <ul>
              {getUserTodos(user.id).map(todo => (
                <li key={todo.id}>
                  {todo.title} - {todo.completed ? 'Tamamlandı' : 'Tamamlanmadı'}
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
