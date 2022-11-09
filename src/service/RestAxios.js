import axios from 'axios';
import SweetAlert from 'react-native-sweet-alert-best';
import { playSound } from '../helpers/playSound';

const baseUrl = 'https://asvanmfg02.siamkubota.co.th:444/pokayoke';

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
    

    if(response.data.NG)
    {
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
    if (error.response) {
        if (error.response.status === 400 )
        {
            console.log();
        }
        
    }

    // console.log(JSON.stringify(error));
    return Promise.reject(error);
});

export const RestAxios = instance;