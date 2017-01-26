import {config} from '../Config';

export class CoderadarAuthorizationService {

    constructor() {
        this.URL = config.BASE_URL + '/user/auth';
    }

    authorize() {
        var params = {
            'username': config.USERNAME,
            'password': config.PASSWORD
        };

        return axios.post(this.URL, params).then((response) => {
            if (!response.data.accessToken) {
                throw new Error('access token could not be found in response');
            }
            config.ACCESS_TOKEN = response.data.accessToken;
            axios.defaults.headers.common['Authorization'] = response.data.accessToken;
        });
    }
}