import React from 'react';
import { Text, FlatList, View, TextInput, Image, ActivityIndicator } from "react-native";

import { connect } from 'react-redux';

import '../Common/CommonData';
import { getAddressDetails } from '../Actions';

import AddressListItem from './ListItems/AddressListItem'
import { TouchableOpacity } from 'react-native-gesture-handler';

class AddressListScreen extends React.Component {

    state = {
        isRequestFail: false,
        isLoading: true,
        isListEmpty: false
    }

    componentWillMount() {
        this.stickeyHeaderElement = -1;
        const { navigation } = this.props;

        this.props.getAddressDetails();

        this.createDataSource(this.props);
    }

    componentDidMount() {
        this.willFocusSubscription = this.props.navigation.addListener(
            'focus',
            () => {
                console.log('refresh');
                this.props.getAddressDetails();
            }
        );
    }

    componentWillReceiveProps({ addressList, isRequestFail }) {
        var isListEmpty = false;
        if (addressList == null || addressList.length == 0) {
            isListEmpty = true;
        }

        this.setState({
            isLoading: false,
            isListEmpty: isListEmpty,
            isRequestFail: isRequestFail
        });
        this.createDataSource(addressList);
    }

    createDataSource(addressList) {
        this.dataSource = addressList;
        this.arrayholder = addressList;
    }

    renderSearchLayout() {
        this.stickeyHeaderElement = 0;
        return (
            <View style={{ backgroundColor: '#ccc', padding: 5 }}>
                 <TextInput
                        placeholder={"Search  here"}
                        autoCorrect={false}
                        clearButtonMode='always'
                        onChangeText={text => this.searchFilterFunction(text)}
                    />
            </View>

        );
    }

    
    searchFilterFunction = text => {
        this.setState({ refresh: true });
        const newData = this.arrayholder.filter(item => {
            const itemData = `${item.first_name.toUpperCase()}`;
            const textData = text.toUpperCase();
            return itemData.indexOf(textData) > -1;
        });
        this.dataSource = newData;
    };

    render() {
        return (
            <View style={{ flex: 1 }}>
                {this.renderData()}

                <TouchableOpacity
                    onPress={() => this.addAddress()}
                    style={{ backgroundColor: '#841584', height: 50, alignItems: 'center', justifyContent: 'center' }}>
                    <Text style={{ color: '#fff' }}>Add</Text>
                </TouchableOpacity>
            </View>
        );
    }

    renderContentRow = (dataRow) => {
        return <AddressListItem dataRow={dataRow} navigation={this.props.navigation} />
    }


    renderData() {
        if (this.state.isLoading) {
            return (
                <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                    <ActivityIndicator
                        size={'large'}
                    />
                </View>
            );
        } else if (this.state.isRequestFail) {
            return (
                <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                    <Text style={{ color: 'red', fontSize: 12 }}>Something went wrong. please try again</Text>
                </View>
            );
        } else {
            if (this.state.isListEmpty) {
                return (
                    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                        <Text style={{ color: 'red', fontSize: 12 }}>No available data</Text>
                    </View>
                );
            } else {
                return (
                    <View style={{ flex: 1 }}>
                        <FlatList
                            data={this.dataSource}
                            renderItem={this.renderContentRow}
                            extraData={this.state} // when state changed lisr re render
                            keyExtractor={(item, index) => index.toString()}
                            ListHeaderComponent={this.renderSearchLayout()}
                            stickyHeaderIndices={[this.stickeyHeaderElement]}
                        />
                    </View>
                );
            }
        }
    }

    addAddress() {
        this.props.navigation.navigate('AddressAddEditScreen', {
            id: 0
        });
    }

}


const mapStateToProps = state => {
    var isRequestFail = state.main.isRequestFail;
    var addressList = state.main.addressList;
    var time = new Date().getTime();
    return { addressList, isRequestFail, time };
};

export default connect(mapStateToProps, { getAddressDetails })(AddressListScreen);
