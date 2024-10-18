import axios from "axios";

const instance = axios.create({
    baseURL: 'https://a32e-110-54-199-211.ngrok-free.app/api',
});
export default instance;