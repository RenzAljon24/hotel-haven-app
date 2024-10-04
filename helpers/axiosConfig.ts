import axios from "axios";

const instance = axios.create({
    baseURL: 'https://a43e-136-158-120-23.ngrok-free.app/api',
});
export default instance;