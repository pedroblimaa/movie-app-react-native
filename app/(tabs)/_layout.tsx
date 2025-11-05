import {ImageBackground, Pressable, StyleSheet, Text, TouchableOpacity, View} from 'react-native'
import React from 'react'
import {Tabs} from "expo-router";
import {Image} from "expo-image";
import {icons} from "@/constants/icons";
import {images} from "@/constants/images";
import {colors} from "@/constants/colors";

const TabIcon = ({focused, icon, title}: any) => {
    if (!focused) {
        return (
            <View style={styles.tabView}>
                <Image source={icon} tintColor='#A8B5DB' style={styles.tabIcon}/>
            </View>
        )
    }

    return (
        <ImageBackground source={images.highlight} style={styles.tabBackground}>
            <Image source={icon} tintColor='#151312' style={styles.tabIcon}/>
            <Text style={styles.tabText}>{title}</Text>
        </ImageBackground>
    )
}

const _Layout = () => {
    return (
        <Tabs
            screenOptions={{
                tabBarShowLabel: false,
                tabBarItemStyle: {
                    width: '100%',
                    height: '100%',
                    justifyContent: 'center',
                    alignItems: 'center',
                    padding: 0,
                    margin: 0,
                },
                tabBarStyle: {
                    backgroundColor: '#0F0D23',
                    borderRadius: 50,
                    marginHorizontal: 20,
                    marginBottom: 36,
                    height: 44,
                    position: 'absolute',
                    overflow: 'hidden',
                    borderWidth: 1,
                    paddingBottom: 0,
                    paddingLeft: 5,
                    paddingRight: 5,
                    borderColor: 'transparent',
                },
                tabBarIconStyle: {
                    height: '100%',
                    margin: 0,
                    padding: 0,
                },
                tabBarButton: (props) => {
                    const {style, ...rest} = props as any;
                    return <Pressable {...rest} style={[style, {padding: 0}]}/>;
                }
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
        height: '100%',
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minWidth: 10,
    },
    tabIcon: {
        width: 16,
        height: 16
    },
    tabBackground: {
        display: 'flex',
        flexDirection: 'row',
        width: '100%',
        flex: 1,
        minWidth: 90,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 999,
        overflow: 'hidden',
    },
    tabText: {
        color: colors.secondary,
        fontSize: 13,
        fontWeight: 'semibold',
        marginLeft: 4
    }
})
