import React, { useContext } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { Button } from 'react-native-elements';
import {Context as AuthContext} from '../context/AuthContext';
import Spacer from '../components/Spacer';
import { NavigationEvents } from 'react-navigation';
import trackerApi from '../api/tracker';

import { SafeAreaView } from 'react-navigation';
import { FontAwesome } from '@expo/vector-icons';

const AccountScreen = () => {
    const {state: {email}, signout, currentUser } = useContext(AuthContext);

    async function getPDF() {
        return await trackerApi.get(`/pdf`, {
          responseType: 'arraybuffer',
          headers: {
            'Accept': 'application/pdf'
          }
    })
    }
    
    const savePDF = () => {
        // openModal() // open modal
       return getPDF() // API call
         .then((response) => {
             console.log(response.data)
           const blob = new Blob([response.data], {type: 'application/pdf'})
           const link = document.createElement('a')
           link.href = window.URL.createObjectURL(blob)
           link.download = `your-file-name.pdf`
           link.click()
        //    closeModal() // close modal
         })
       .catch(err => console.log('rahul',err)/** error handling **/)
     }

     

    return (
    <SafeAreaView forceInset={{ top:'always' }}>
    <NavigationEvents onWillFocus={currentUser} />
        <Text style={{ fontSize: 48 }}>Account Screen</Text>
        <Spacer>
        <Text>Hi, {email}</Text>
        <Button title="Save as pdf" onPress={savePDF} />
        <Button title="Signout" onPress={signout} />
        </Spacer>
    </SafeAreaView>
    )
};

AccountScreen.navigationOptions = () => {
    return {
        title: 'Account',
        tabBarIcon: <FontAwesome name="gear" size={24} color="black" />
    }
}

const styles = StyleSheet.create({});

export default AccountScreen;