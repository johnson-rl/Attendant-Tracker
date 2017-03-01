import axios from 'axios';

export const FETCH_USER = 'FETCH_USER';
export const FETCH_ATTENDANTS = 'FETCH_ATTENDANTS'
export const CREATE_ATTENDANT = 'CREATE_ATTENDANTS';
export const FETCH_ATTENDANT = 'FETCH_ATTENDANT';
export const DELETE_ATTENDANT = 'DELETE_ATTENDANT';
export const UPDATE_ATTENDANT = 'UPDATE_ATTENDANT';
export const FETCH_EVENTS = 'FETCH_EVENTS'

const API_KEY = '';

// TODO for api call to backend will need to be changed
const ROOT_URL = 'http://localhost:9000/api'

// for later when api call with auth
// const ROOT_URL = `http://api.openweathermap.org/data/2.5/forecast?appid=${API_KEY}`;

// by setting to variable, you will save yourself from some bugs...no need to remember or copy/paste strings


export function fetchUser(id) {
  let url = `${ROOT_URL}/users/${id}`;
  let request = null
  request = axios.get(url)

  return {
    type: FETCH_USER,
    payload: request
  };
}


export function fetchAttendants (id) {
  let url = `${ROOT_URL}/users/${id}/attendants`
  const request = axios.get(url)

  return {
    type: FETCH_ATTENDANTS,
    payload: request
  }
}

export function createAttendant(id, props){
  const request = axios.post(`${ROOT_URL}/users/${id}/attendants`, props);

  return {
    type: CREATE_ATTENDANT,
    payload: request
  }
}

export function fetchAttendant(id) {
  const request = axios.get(`${ROOT_URL}/attendants/${id}`)

  return {
    type: FETCH_ATTENDANT,
    payload: request
  }
}

export function deleteAttendant(id) {
  const request = axios.delete(`${ROOT_URL}/attendants/${id}`)

  return {
    type: DELETE_ATTENDANT,
    payload: request // don't really need this now, but good to have for consistency and in case it's needed later
  }
}

export function updateAttendant(id, props) {
  const request = axios.put(`${ROOT_URL}/attendants/${id}`, props)

  return {
    type: UPDATE_ATTENDANT,
    payload: request
  }
}

export function fetchEvents (id) {
  const request = axios.get(`${ROOT_URL}/users/${id}/events`)

  return {
    type: FETCH_EVENTS,
    payload: request
  }
}
