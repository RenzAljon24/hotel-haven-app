import axios from "axios";

const instance = axios.create({
    baseURL: 'https://4af4-136-158-123-1.ngrok-free.app/api',
});
export default instance;