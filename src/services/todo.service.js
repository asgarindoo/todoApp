// src/services/todoService.js
import { baseApi } from '@/plugins/axios'
import Cookies from 'js-cookie'

const API_URL = '/api/todo'

const getAuthHeaders = () => {
  const token = Cookies.get('token')
  return {
    Authorization: `Bearer ${token}`
  }
}

export const fetchTodos = async () => {
  try {
    const response = await baseApi.get(API_URL, {
      headers: getAuthHeaders(),
      withCredentials: true
    })

    // // Null or empty data handling
    // if (!response || !response.data) {
    //   console.warn('Warning: No data received')
    //   return []
    // }

    // // Check if the response has status false and handle the error message
    // if (response.data.status === false) {
    //   console.warn('Warning:', response.data.error || 'Unknown error occurred')
    //   return []
    // }

    // // Empty array handling
    // if (Array.isArray(response.data) && response.data.length === 0) {
    //   console.warn('Warning: Empty data array received')
    //   return []
    // }

    return response.data
  } catch (error) {
    // Only log the error without throwing it to avoid breaking the application flow
    // console.error('Error fetching todos:', error.message || error)
    return []
  }
}

export const fetchTodoDetail = async (id) => {
  try {
    const response = await baseApi.get(`${API_URL}/${id}`, {
      headers: getAuthHeaders(),
      withCredentials: true
    })
    return response.data
  } catch (error) {
    console.error('Error fetching todo detail:', error)
    throw error
  }
}

export const addTodo = async (todo) => {
  try {
    const response = await baseApi.post(API_URL, todo, {
      headers: getAuthHeaders(),
      withCredentials: true
    })
    return response.data
  } catch (error) {
    console.error('Error adding todo:', error)
    throw error
  }
}

export const editTodo = async (id, updatedTodo) => {
  try {
    console.log('Updating todo with ID:', id, 'Payload:', updatedTodo)

    const response = await baseApi.put(`${API_URL}/${id}`, updatedTodo, {
      headers: getAuthHeaders(),
      withCredentials: true
    })
    return response.data
  } catch (error) {
    console.error('Error editing todo:', error)
    throw error
  }
}

export const deleteTodo = async (id) => {
  try {
    const response = await baseApi.delete(`${API_URL}/${id}`, {
      headers: getAuthHeaders(),
      withCredentials: true
    })
    return response.data
  } catch (error) {
    console.error('Error deleting todo:', error)
    throw error
  }
}

// Menggunakan data JSON yang diberikan
// const dummyTodos = [
//   {
//     id: 1,
//     title: 'Test Edit',
//     createdAt: '2023-02-19T09:21:55.815Z',
//     completed: true,
//     description: 'Test Description Edit',
//     category: 'Work'
//   },
//   {
//     id: 2,
//     title: 'Test',
//     createdAt: '2023-02-19T09:22:19.718Z',
//     completed: false,
//     description: 'Test Description',
//     category: 'Urgent'
//   }
// ]

// export const fetchTodos = async () => {
//   // Mengembalikan data sesuai struktur yang diberikan
//   return { status: true, data: dummyTodos }
// }

// export const fetchTodoDetail = async (id) => {
//   const todo = dummyTodos.find((todo) => todo.id === id)
//   return { data: todo }
// }

// export const addTodo = async (todo) => {
//   todo.id = dummyTodos.length + 1
//   console.log('Todo added:', todo) // Debugging log
//   return { data: todo }
// }

// export const editTodo = async (id, updatedTodo) => {
//   const index = dummyTodos.findIndex((todo) => todo.id === id)
//   if (index !== -1) {
//     dummyTodos[index] = { ...dummyTodos[index], ...updatedTodo }
//     return { data: dummyTodos[index] }
//   }
//   throw new Error('Todo not found')
// }

// export const deleteTodo = async (id) => {
//   const index = dummyTodos.findIndex((todo) => todo.id === id)
//   if (index !== -1) {
//     const deleted = dummyTodos.splice(index, 1)
//     console.log('Todo deleted:', deleted[0]) // Debugging log
//     return { data: deleted[0] }
//   }
//   throw new Error('Todo not found')
// }
