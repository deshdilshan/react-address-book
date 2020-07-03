import React from 'react';
import { StyleSheet, TextInput, Text, Alert, View, ScrollView, TouchableOpacity, ActivityIndicator } from 'react-native';
import { addAddress, removeAddress, editAddress } from '../Actions';

import { connect } from 'react-redux';

class AddressAddEditScreen extends React.Component {
    state = {
        isRequestFail: false, isLoading: false, id: -1,
        first_name: '', last_name: '', email: '', contact_number: ''
    }

    id = 0;

    componentWillMount() {
        const { route, navigation } = this.props;
        console.log(this.props);

        this.id = route.params.id;

        if (this.id != 0) {
            var first_name = route.params.first_name;
            var last_name = route.params.last_name;
            var email = route.params.email;
            var contact_number = route.params.contact_number;

            this.setState({first_name: first_name, last_name: last_name, email: email, contact_number: contact_number});
        }
    }

    componentWillReceiveProps({ isRequestFail, addStatus, removeStatus }) {
        this.setState({ isRequestFail: isRequestFail, isLoading: false });
        if (!isRequestFail) {
            if (addStatus == 1) {
                Alert.alert("Success", "Save successfully");
                this.props.navigation.goBack(null);
            } else if (addStatus == 0) {
                Alert.alert("Failed", "Something went wrong");
            }

            if (removeStatus == 1) {
                Alert.alert("Success", "Remove successfully");
                this.props.navigation.goBack(null);
            } else if (removeStatus == 0) {
                Alert.alert("Failed", "Something went wrong");
            }
        } else {
            Alert.alert("Server error", "Something went wrong. Please try again");
        }
    }

    add() {
        if (this.state.last_name.length == 0 || this.state.email.length == 0 
            || this.state.contact_number == 0 || this.state.first_name == 0) {
            Alert.alert("Required", "All fields required");
            return;
        }
        if (!this.validateEmail(this.state.email)) {
            Alert.alert("Email error", "Please add valid email address");
            return;
        }
        if (this.state.contact_number.length <= 9) {
            Alert.alert("Contact number wrong", "Contact number should be 10 numbers");
            return;
        }
        this.setState({ isLoading: true });

        var form = new FormData();
        form.append("first_name", this.state.first_name);
        form.append("last_name", this.state.last_name);
        form.append("contact_number", this.state.contact_number);
        form.append("email", this.state.email);

        this.props.addAddress(form);
    }

    edit() {
        if (this.state.last_name.length == 0 || this.state.email.length == 0 
            || this.state.contact_number == 0 || this.state.first_name == 0) {
            Alert.alert("Required", "All fields required");
            return;
        }
        if (!this.validateEmail(this.state.email)) {
            Alert.alert("Email error", "Please add valid email address");
            return;
        }

        if (this.state.contact_number.length <= 9) {
            Alert.alert("Contact number wrong", "Contact number should be 10 numbers");
            return;
        }
        this.setState({ isLoading: true });

        var form = new FormData();
        form.append("first_name", this.state.first_name);
        form.append("last_name", this.state.last_name);
        form.append("contact_number", this.state.contact_number);
        form.append("email", this.state.email);
        form.append("id", this.id);

        this.props.editAddress(form);
    }

    remove() {
        this.setState({ isLoading: true });

        var form = new FormData();
        form.append("id", this.id);

        this.props.removeAddress(form);
    }

    validateEmail(text) {
        let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        if (reg.test(text) === false) {
            return false;
        } else {
            return true;
        }
    }

    render() {
        return (
            <View style={{ flex: 1 }}>
                <ScrollView style={{ padding: 8 }}>

                    <View style={{ flex: 1, flexDirection: 'column' }}>
                        <TextInput
                            placeholder="First name"
                            value={this.state.first_name}
                            style={{ backgroundColor: '#ccc', marginTop: 16 }}
                            onChangeText={(text) => this.setState({ first_name: text })}
                        />

                        <TextInput
                            placeholder="Last name"
                            value={this.state.last_name}
                            style={{ backgroundColor: '#ccc', marginTop: 16 }}
                            onChangeText={(text) => this.setState({ last_name: text })}
                        />

                        <TextInput
                            placeholder="Email"
                            value={this.state.email}
                            style={{ backgroundColor: '#ccc', marginTop: 16 }}
                            onChangeText={(text) => this.setState({ email: text })}
                        />

                        <TextInput
                            placeholder="Contact number"
                            value={this.state.contact_number}
                            keyboardType={'phone-pad'}
                            maxLength={10}
                            style={{ backgroundColor: '#ccc', marginTop: 16 }}
                            onChangeText={(text) => this.setState({ contact_number: text })}
                        />

                    </View>

                    <View style={{ marginBottom: 30, marginTop: 30 }}>
                        {this.renderSpinner()}
                    </View>
                </ScrollView>
            </View>
        );
    }

    renderBtn() {
        if (this.id > 0) {
            return (
                <View style={{ flexDirection: 'column' }}>
                    <TouchableOpacity
                        onPress={() => this.edit()}
                        style={{ backgroundColor: '#841584', height: 50, alignItems: 'center', justifyContent: 'center' }}>
                        <Text style={{ color: '#fff' }}>Update</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        onPress={() => this.remove()}
                        style={{ backgroundColor: 'red', height: 50, alignItems: 'center', justifyContent: 'center', marginTop: 20 }}>
                        <Text style={{ color: '#fff' }}>Remove</Text>
                    </TouchableOpacity>
                </View>
            );
        } else {
            return (
                <TouchableOpacity
                    onPress={() => this.add()}
                    style={{ backgroundColor: '#841584', height: 50, alignItems: 'center', justifyContent: 'center' }}>
                    <Text style={{ color: '#fff' }}>Add</Text>
                </TouchableOpacity>
            );
        }
    }

    renderSpinner() {
        if (this.state.isLoading) {
            return (
                <View style={{ alignItems: 'center' }}>
                    <ActivityIndicator
                        size={'large'}
                    />
                </View>
            );
        } else {
            return (
                this.renderBtn()
            );
        }
    }
}

const styles = StyleSheet.create({
    fieldStyle: {
        flexDirection: 'column',
        marginTop: 10,
    }
});

const mapStateToProps = state => {
    var addStatus = state.main.addStatus;
    var isRequestFail = state.main.isRequestFail;
    var removeStatus = state.main.removeStatus;
    var time = new Date().getTime();
    return { addStatus, isRequestFail, removeStatus, time };
};

export default connect(mapStateToProps, { addAddress, removeAddress, editAddress })(AddressAddEditScreen);
