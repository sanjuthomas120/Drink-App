import axios from "axios";

const API = axios.create({
    baseURL: "http://drink-app-w7lr.onrender.com:10000/api", 
    headers: {
        'Content-Type': 'application/json',
    },
});

export default API