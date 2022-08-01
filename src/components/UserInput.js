import React from 'react';
import { TextInput, Text, View, StyleSheet, TouchableOpacity } from 'react-native';
import {
    Arvo_400Regular,
} from "@expo-google-fonts/arvo";
import RNPickerSelect from 'react-native-picker-select';
import * as ImagePicker from 'expo-image-picker';
import { MaterialIcons } from '@expo/vector-icons';


const UserInput = ({ inputName, onInputChange, type, optionalStatus, pickerOptions, curPicker }) => {

    const pickImage = async () => {
        // No permissions request is necessary for launching the image library
        let result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.All,
          allowsEditing: true,
          aspect: [4, 3],
          quality: 1,
        });
      
        if (!result.cancelled) {
          onInputChange(result.uri);
        }
      };

    return (
        <View style={styles.container}>
            <Text style={styles.label}>{inputName + optionalStatus}:</Text>
            {type == 'text' ?
                <TextInput
                    style={styles.input}
                    onChangeText={newInput => onInputChange(newInput)}
                    autoCapitalize='none'
                    autoCorrect={false}
                    secureTextEntry={inputName === 'password' ? true : false}
                /> 
                : type == 'dropdown' ?
                <RNPickerSelect
                    onValueChange={(value) => onInputChange(value)}
                    items={pickerOptions}
                    placeholder={{label: 'Select ' + inputName + '...', value: null, color: '#404969'}}
                    style={pickerSelectStyles}
                />
                : (type == 'addPicture' && !curPicker) ?
                <View>
                    <TouchableOpacity style={styles.addPhoto}onPress={pickImage}>
                        <MaterialIcons name="add-a-photo" size={45} color="black" />
                    </TouchableOpacity> 
                </View>
                : null 
            }

        </View>
    );
}

const styles = StyleSheet.create({
    addPhoto:{
        alignSelf: 'flex-end',
        marginRight: 90
    },  
    pickerButton:{
        backgroundColor: '#AFBCEB'
    },
    container: {
        justifyContent: 'center',
        marginLeft: 50,
        marginTop: 20,
    },
    input: {
        height: 40,
        width: 250,
        borderBottomColor: 'black',
        borderBottomWidth: 1,
        padding: 5,
        borderRadius: 2
    },
    label: {
        fontFamily: 'Arvo_400Regular',
        fontSize: 20,
    }
});

const pickerSelectStyles = StyleSheet.create({
    inputIOS: {
      fontSize: 16,
      width: 250,
      paddingVertical: 12,
      paddingHorizontal: 10,
      borderBottomWidth: 1,
      borderColor: 'black',
      borderRadius: 4,
      color: 'black',
      height: 50 // to ensure the text is never behind the icon
    },
    placeholder:{
        color:"black",
    },
    inputAndroid: {
      fontSize: 16,
      paddingHorizontal: 10,
      paddingVertical: 8,
      borderWidth: 0.5,
      borderColor: 'purple',
      borderRadius: 8,
      color: 'black',
      paddingRight: 30, // to ensure the text is never behind the icon
    },
  });
  
export default UserInput;