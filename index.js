/**
 * @format
 */

import { AppRegistry } from 'react-native';
import App from './App';
import { name as appName } from './app.json';
import DataWedgeIntents from 'react-native-datawedge-intents'

function sendCommand(extraName, extraValue) {

    console.log("Sending Command: " + extraName + ", " + JSON.stringify(extraValue));

    var broadcastExtras = {};

    broadcastExtras[extraName] = extraValue;

    DataWedgeIntents.sendBroadcastWithExtras({

        action: "com.symbol.datawedge.api.ACTION",

        extras: broadcastExtras
    });

}

sendCommand("com.symbol.datawedge.api.CREATE_PROFILE", "PokayokePL2022");

var profileConfig = {

    "PROFILE_NAME": "PokayokePL2022",
  
    "PROFILE_ENABLED": "true",
  
    "CONFIG_MODE": "UPDATE",
  
    "PLUGIN_CONFIG": {
  
      "OUTPUT_PLUGIN_NAME": "KEYSTROKE",
  
      "RESET_CONFIG": "true",
  
      "PARAM_LIST": {
        "bdf_enabled" : "true",
        "bdf_send_data": "true",
        "bdf_send_enter" : "true",
      }
  
    },
  
    "APP_LIST": [{
  
      "PACKAGE_NAME": "com.pokayoke_mobile",
  
      "ACTIVITY_LIST": ["*"]
  
    }]
  
  };
  
  sendCommand("com.symbol.datawedge.api.SET_CONFIG", profileConfig);



AppRegistry.registerComponent(appName, () => App);
