import axios from "axios";

const instance = axios.create({
    baseURL: 'https://0cdd-2001-fd8-1ea4-5167-b5fb-e2d8-2cff-cd07.ngrok-free.app/api',
});
export default instance;