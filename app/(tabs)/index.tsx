import {StyleSheet, View, Image, ScrollView} from 'react-native'
import React from 'react'
import {colors} from "@/constants/colors";
import {images} from "@/constants/images";
import {icons} from "@/constants/icons";

const Index = () => {
    return (
        <View style={styles.container}>
            <Image source={images.bg} style={styles.topBg}/>
            <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}
                        contentContainerStyle={{minHeight: '100%', paddingBottom: 10}}>
                <Image source={icons.logo} style={styles.logo}/>
            </ScrollView>
        </View>
    )
}
export default Index
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.primary,
    },
    topBg: {
        position: 'absolute',
        width: '100%',
        zIndex: 0,
    },
    scrollView: {
        flex: 1,
        paddingLeft: 5,
        paddingRight: 5,
    },
    logo: {
        width: 60,
        height: 50,
        marginTop: 100,
        marginBottom: 25,
        marginLeft: 'auto',
        marginRight: 'auto'
    }
})
