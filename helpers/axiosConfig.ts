import axios from "axios";

const instance = axios.create({
    baseURL: 'https://65c7-136-158-120-23.ngrok-free.app/api',
});
export default instance;