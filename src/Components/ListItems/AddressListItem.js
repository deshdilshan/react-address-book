import React, { Component } from "react";
import { View, Alert, Text } from "react-native";
import { TouchableHighlight } from "react-native-gesture-handler";

const AddressListItem = (props) => {
    const { first_name, id, last_name, email, contact_number } = props.dataRow.item;

    return (
        <TouchableHighlight onPress={() => openAddress(props.navigation, id, first_name, last_name, email, contact_number)}>
            <View style={{ padding: 16 }}>
                <Text>{first_name}</Text>
            </View>
        </TouchableHighlight>
    );

}

openAddress = (navigation, id, first_name, last_name, email, contact_number) => {
    navigation.navigate('AddressAddEditScreen', {
        id: id,
        first_name: first_name,
        last_name: last_name,
        email: email,
        contact_number: contact_number,
    });
}


export default AddressListItem;

