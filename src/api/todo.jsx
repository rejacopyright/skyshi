import axios from './axios'

export const getItems = (params) => {
  return axios({
    method: 'GET',
    url: `todo-items`,
    params,
  })
}
export const updateOrCreateItem = (data, id) => {
  return axios({
    method: id ? 'PATCH' : 'POST',
    url: id ? `todo-items/${id}` : `todo-items`,
    data,
  })
}
export const setActiveItem = (data, id) => {
  return axios({
    method: 'PATCH',
    url: `todo-items/${id}`,
    data,
  })
}
export const deleteItem = (id) => {
  return axios({
    method: 'DELETE',
    url: `todo-items/${id}`,
  })
}
