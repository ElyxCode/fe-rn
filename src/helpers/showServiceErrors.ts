import React from "react";
import {
    Alert
  } from 'react-native';
import Messages from "../constants/Messages";


export const showServiceErrors = (errors: any) => {
    for (const field in errors) {
      if (errors.hasOwnProperty(field)) {
        Alert.alert(Messages.titleMessage, errors[field].toString(), [
          { text: Messages.okButton },
        ]);
        
        return;
      }
    }
  };