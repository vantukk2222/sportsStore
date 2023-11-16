import { React, Component } from "react"
import { View, Text, Image, ImageBackground, TouchableOpacity } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome';

Component
function UIButton(props) {
    const { onPress, title, isSelected } = props
    return <TouchableOpacity
        onPress={onPress}
        style={{
            justifyContent: 'center',
            alignItems: 'center',
            borderColor: 'white',
            borderWidth: 1,
            borderRadius: 6,
            margin: 10,
            height: 50,
            backgroundColor: isSelected == true ? 'white' : null
        }}>
        {isSelected == true && <Icon

            size={20}
            name={'check-circle'}
            style={{
                color: 'green',
                position: 'absolute',
                top: 15,
                left: 10
            }}></Icon>}
        <Text style={{color: isSelected == true ? 'black' : 'white'}}>{title}</Text>
    </TouchableOpacity>
}

export default UIButton