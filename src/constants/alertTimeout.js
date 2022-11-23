import SweetAlert from "react-native-sweet-alert-best";
export const delay = (ms = 2000) => {
    setTimeout(() => {
        console.log('2 sec is pass');
        SweetAlert.dismissAlert()
    }, ms);
    
};
