import axios from "axios";

const instance = axios.create({
    baseURL: 'http://152.42.167.15/api',
});
export default instance;