import axios from 'axios'
import auth from './auth'
export default {
    sendRequest: async (method, endpoint, params) => {
        let headers = auth.getAuthHeader();
        let request = {
            headers: headers,
            method: method,
            url: `http://localhost:8081/api/v1/${endpoint}`,
            data: params
        }
        try {
            let data = await axios(request);
            return data.data;
        } catch (e) {
            //console.log(e.response);
            throw e.response.data;
        }
    }
}