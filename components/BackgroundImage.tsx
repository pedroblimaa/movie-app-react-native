import {Image, StyleSheet} from 'react-native'
import React from 'react'
import {images} from "@/constants/images";

const BackgroundImage = () => {
    return (
        <Image source={images.bg} style={styles.img} resizeMode="cover"/>
    )
}
export default BackgroundImage
const styles = StyleSheet.create({
    img: {
        position: 'absolute',
        width: '100%',
        zIndex: 0,
    },
})
