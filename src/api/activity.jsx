import axios from './axios'

export const getActivity = (params) => {
  return axios({
    method: 'GET',
    url: `activity-groups`,
    params,
  })
}
export const getDetailActivity = (id) => {
  return axios({
    method: 'GET',
    url: `activity-groups/${id}`,
  })
}
export const updateOrCreateActivity = (data, id) => {
  return axios({
    method: id ? 'PATCH' : 'POST',
    url: id ? `activity-groups/${id}` : `activity-groups`,
    data,
  })
}
export const deleteActivity = (id) => {
  return axios({
    method: 'DELETE',
    url: `activity-groups/${id}`,
  })
}
