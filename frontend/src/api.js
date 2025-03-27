import axios from "axios";

const API = axios.create({
    baseURL: "https://drink-app-w7lr.onrender.com/api", 
    headers: {
        'Content-Type': 'application/json',
    },
});

export default API