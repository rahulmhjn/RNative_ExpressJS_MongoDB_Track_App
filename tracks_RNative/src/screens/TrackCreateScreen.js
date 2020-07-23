import '../_mockLocation';
import React, { useContext, useCallback } from 'react';
import { StyleSheet } from 'react-native';
import { Text } from 'react-native-elements';
import { SafeAreaView, withNavigationFocus } from 'react-navigation';
import Map from '../components/Map';
import { FontAwesome } from '@expo/vector-icons';
import { Context as LocationContext } from '../context/LocationContext';
import useLocation from '../hooks/useLocation';
import TrackForm from '../components/TrackForm';
import { ScrollView } from 'react-native-gesture-handler';


const TrackCreateScreen = ({ isFocused }) => {
   
    const {state, addLocation } = useContext(LocationContext);
    const callback = useCallback((location) => {
        addLocation(location, state.recording);
    }, [state.recording]);
    const [err] = useLocation(isFocused || state.recording, callback);
    
    // console.log(isFocused)
    return (
        <ScrollView>
        <SafeAreaView forceInset={{ top:'always' }}>
            <Text h2>Create a track</Text>
            <Map />
            {err?<Text>Please allow location services.</Text>: null}
            <TrackForm />
        </SafeAreaView>
        </ScrollView>
        )
}; 

TrackCreateScreen.navigationOptions = {
    title: 'Add Track',
    tabBarIcon: <FontAwesome name="plus" size={24} color="black" />
}

const styles = StyleSheet.create({});

export default withNavigationFocus(TrackCreateScreen);