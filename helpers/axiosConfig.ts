import axios from "axios";

const instance = axios.create({
    baseURL: 'https://aa9d-2001-fd8-1ea4-5167-582b-fa94-65ac-7d1c.ngrok-free.app/api',
});
export default instance;