import React, { useState } from 'react';
import { StatusBar, View, Button, Text, TextInput } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Add = ({ navigation, route }) => {
    const [letter, setLetter] = useState("");
    const [type, setType] = useState("Vowels");

    const saveData = async (value) => {
        await AsyncStorage.setItem("alphadata", value);
        navigation.navigate("Home");
    };

    return (
        <View>
            <StatusBar />
            <Text>Letter:</Text>

            <TextInput
                maxLength={1}
                style={{ borderWidth: 1 }}
                onChangeText={setLetter}
            />

            <Picker selectedValue={type} onValueChange={setType}>
                <Picker.Item label="Vowels" value="Vowels" />
                <Picker.Item label="Consonants" value="Consonants" />
            </Picker>

            <Button
                title="Submit"
                onPress={() => {
                    let mydata = JSON.parse(route.params.datastring);
                    let indexnum = type === "Vowels" ? 0 : 1;

                    mydata[indexnum].data.push({ key: letter });

                    let stringdata = JSON.stringify(mydata);
                    saveData(stringdata);
                }}
            />
        </View>
    );
};

export default Add;
