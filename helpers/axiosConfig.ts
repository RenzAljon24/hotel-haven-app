import axios from "axios";

const instance = axios.create({
    baseURL: 'https://aad4-103-3-80-171.ngrok-free.app/api',
});
export default instance;