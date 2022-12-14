import { StyleSheet } from "react-native";

export const customStyles = StyleSheet.create({
    HeaderContainer: {
        flex: 1,
        backgroundColor: "#778A35",
        flexDirection:'row',
        
    },
    contentContainer: {
        flex: 8,
        backgroundColor: "#D1E2C4",
        alignItems: 'center',
        justifyContent: 'center'
    },
    menuContainer: {

        width:'50%',
        height:'40%',
        margin:'5%',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor:'#EBEBE8',
        borderRadius:5,
        borderWidth:2
    },
    footerContainer: {
        flex: 1,
        backgroundColor: "#31352E",
        alignItems: 'center',
        justifyContent: 'center'
    },
    regularTextStyle: {
        fontFamily: 'Kanit-Regular',
        fontSize: 16
    },
    header1TextStyle: {
        fontFamily: 'Kanit-Regular',
        fontSize: 32
    },
    header2TextStyle: {
        fontFamily: 'Kanit-Regular',
        fontSize: 26
    },
    header3TextStyle: {
        fontFamily: 'Kanit-Regular',
        fontSize: 22
    },
    loginContainer: {
        flex: 1,
        backgroundColor: "white",
        flexDirection: 'column',
        
    }


});


