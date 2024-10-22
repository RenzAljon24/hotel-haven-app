import axios from "axios";

const instance = axios.create({
    baseURL: 'https://a556-2001-fd8-26c5-21bf-dce9-d7b4-cd00-70f3.ngrok-free.app/api',
});
export default instance;