import {Image, StyleSheet, TextInput, View} from 'react-native'
import React from 'react'
import {colors} from "@/constants/colors";
import {icons} from "@/constants/icons";

interface SearchBarProps {
    placeholder: string,
    onPress?: () => void,
    value: string,
    onChangeText: (text: string) => void,
}

const SearchBar = ({placeholder, onPress, value, onChangeText}: SearchBarProps) => {

    return (
        <View style={styles.container}>
            <Image source={icons.search} style={styles.icon} resizeMode="contain" tintColor="#AB8BFF"/>
            <TextInput
                onPress={onPress}
                placeholder={placeholder}
                value={value}
                onChangeText={onChangeText}
                placeholderTextColor="#AB85DB"
                style={{color: 'white', width: '100%'}}
            />
        </View>
    )
}
export default SearchBar
const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: colors.dark["200"],
        borderRadius: 999,
        paddingHorizontal: 20,
        paddingVertical: 8,
    },
    icon: {
        width: 20,
        height: 20,
    }
})
