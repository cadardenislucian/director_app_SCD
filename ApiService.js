// src/services/ApiService.js
import axios from 'axios';

const api = axios.create({
    withCredentials: true,
});

const ApiService = {
     getDepartments: () => axios.get(`http://localhost:8080/api/department/getAll`),
    deleteDepartment: (departmentId) => axios.delete(`http://localhost:8080/api/department/delete/${departmentId}`),
    addDepartment: (departmentData) => axios.post('http://localhost:8080/api/department/create', departmentData),
    getEmployees: () => axios.get('http://localhost:8080/api/employee/getAll'),
    addEmployee: (employeeData) => axios.post(`http://localhost:8080/api/employee/create`, employeeData),
    deleteEmployee: (employeeId) => axios.delete(`http://localhost:8080/api/employee/delete/${employeeId}`),
    getEmployee: (employeeId) => axios.get(`http://localhost:8080/api/employee/get/${employeeId}`),
    sendEmailToSelected: (selectedEmployees, emailData) =>
        axios.post('http://localhost:8080/api/email/sendToSelected', { selectedEmployees, emailData }),

};

export default ApiService;
