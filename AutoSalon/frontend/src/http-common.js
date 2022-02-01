import axios from "axios";

export const axiosDefault = axios.create({
    baseURL: "http://127.0.0.1:8000/",
    headers: {
        Authorization: localStorage.getItem('access_token') 
            ? 'JWT ' + localStorage.getItem('access_token')
            : null, 
        "Content-type": "application/json",
        accept: "application/json",
    },
});

export const axiosMultipart = axios.create({
    baseURL: "http://127.0.0.1:8000/",
    headers: {
        Authorization: localStorage.getItem('access_token') 
            ? 'JWT ' + localStorage.getItem('access_token')
            : null, 
        "Content-type": "multipart/form-data; boundary=----WebKitFormBoundary7MA4YWxkTrZu0gW",
        accept: "application/json",
    },
});