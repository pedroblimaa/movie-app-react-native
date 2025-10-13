import {ImageBackground, StyleSheet, Text, View} from 'react-native'
import React from 'react'
import {Tabs} from "expo-router";
import {Image} from "expo-image";
import {icons} from "@/constants/icons";

const TabIcon = ({focused, icon, title}: any) => {
    if (!focused) {
        return (
            <View style={styles.tabView}>
                <Image source={icon} tintColor='#A8B5DB'/>
            </View>
        )
    }

    return (
        <ImageBackground>
            <Image source={icon} tintColor='#151312'/>
            <Text>{title}</Text>
        </ImageBackground>
    )
}

const _Layout = () => {
    return (
        <Tabs
            screenOptions={{
                tabBarShowLabel: false,
            }}
        >
            <Tabs.Screen
                name='index'
                options={{
                    title: 'Home',
                    headerShown: false,
                    tabBarIcon: ({focused}) => (
                        <TabIcon focused={focused} icon={icons.home} title='Home'/>
                    )
                }}
            />
            <Tabs.Screen
                name='search'
                options={{
                    title: 'Search',
                    headerShown: false,
                    tabBarIcon: ({focused}) => (
                        <TabIcon focused={focused} icon={icons.search} title='Search'/>
                    )
                }}
            />
            <Tabs.Screen
                name='saved'
                options={{
                    title: 'Saved',
                    headerShown: false,
                    tabBarIcon: ({focused}) => (
                        <TabIcon focused={focused} icon={icons.save} title='Saved'/>
                    )
                }}
            />
            <Tabs.Screen
                name='profile'
                options={{
                    title: 'Profile',
                    headerShown: false,
                    tabBarIcon: ({focused}) => (
                        <TabIcon focused={focused} icon={icons.person} title='Profile'/>
                    )
                }}
            />
        </Tabs>
    )
}
export default _Layout
const styles = StyleSheet.create({
    tabView: {
        flex: 1,
        height: '100%',
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minWidth: 10,
        minHeight: 40,
    }
})
