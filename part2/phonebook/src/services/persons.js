import axios from 'axios';
const baseUrl = 'http://localhost:3001/persons';

const getAllPersons = () => {
  const request = axios.get(baseUrl);
  return request.then((response) => {
    console.log('Response after getAll: ', response);
    return response.data;
  });
};

const createPerson = (newPersonObject) => {
  const request = axios.post(baseUrl, newPersonObject);
  return request.then((response) => {
    console.log('Response after create: ', response);
    return response.data;
  });
};

const updatePerson = (id, newPersonObject) => {
  const request = axios.put(`${baseUrl}/${id}`, newPersonObject);
  return request.then((response) => {
    console.log('Response after update: ', response);
    return response.data;
  });
};

const deletePerson = (id) => {
  const request = axios.delete(`${baseUrl}/${id}`);
  return request.then((response) => {
    console.log('Response after delete: ', response);
    return response.data;
  });
};

export default { getAllPersons, createPerson, updatePerson, deletePerson };
