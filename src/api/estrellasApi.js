import axios from "axios";

const estrellasApi = axios.create({
    baseURL: 'https://estrellas-nails-art-4caf0-default-rtdb.firebaseio.com/'
})

export default estrellasApi