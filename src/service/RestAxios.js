import axios from 'axios';
import SweetAlert from 'react-native-sweet-alert-best';
import { playSound } from '../helpers/playSound';
import { PROD_REST_API_URL } from '@env'


const baseUrl = PROD_REST_API_URL;

const instance = axios.create({
    baseURL: baseUrl,
    timeout: 1000,

});

instance.interceptors.request.use(async (config) => {


    //console.log('after configs' + JSON.stringify(config));
    return config;
});

instance.interceptors.response.use(function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    //console.log('res'+JSON.stringify(response));


    if (response.data.NG) {
        playSound("NG")
        SweetAlert.showAlertWithOptions({
            title: 'NG',
            subTitle: response.data.NG,
            confirmButtonTitle: 'OK',
            confirmButtonColor: '#000',

            style: 'error',
            cancellable: true
        },
            callback => console.log('NG from mix'));
    }
    return response;
}, async function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    // const originalConfig = err.config;
    if (error.code == "ERR_NETWORK") {

        SweetAlert.showAlertWithOptions({
            title: "Error",
            subTitle: 'Network not working',
            confirmButtonTitle: 'OK',
            confirmButtonColor: '#000',
            style: 'error',
            cancellable: true
        },
            callback => console.log('Network not working'));
    }
    if (error.response) {
        if (error.response.status === 400) {
            console.log('400 from internal api');
        }

    }

    // console.log(JSON.stringify(error));
    return Promise.reject(error);
});

export const RestAxios = instance;