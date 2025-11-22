import { colors } from "@/constants/colors"
import useFbAuth from "@/services/useFbAuth"
import * as WebBrowser from "expo-web-browser"
import { useState } from "react"
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native"
import LoadingIndicator from "./LoadingIndicator"

WebBrowser.maybeCompleteAuthSession()

const Auth = () => {
    const { login, register, loading, error } = useFbAuth()
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const button = (isRegister = false) => (
        <TouchableOpacity
            style={[styles.button, loading && styles.buttonDisabled]}
            onPress={() => isRegister ? register(email, password) : login(email, password)}
            disabled={loading}
        >
            <Text style={styles.buttonText}>{isRegister ? "Register" : "Login"}</Text>
        </TouchableOpacity>
    )

    return (
        <View style={styles.container}>
            <Text style={styles.label}>Email</Text>
            <TextInput
                value={email}
                onChangeText={setEmail}
                autoCapitalize="none"
                style={styles.input}
                placeholderTextColor={colors.light[300]}
            />

            <Text style={styles.label}>Password</Text>
            <TextInput
                value={password}
                onChangeText={setPassword}
                secureTextEntry
                style={styles.input}
                placeholderTextColor={colors.light[300]}
            />

            {loading ?
                (<View style={{ marginTop: 30 }}>
                    <LoadingIndicator />
                </View>)
                : (
                    <View style={{ flexDirection: 'row', gap: 12 }}>
                        {button(true)}
                        {button(false)}
                    </View>
                )
            }


            {!!error && <Text style={styles.errorText}>{error}</Text>}
        </View>
    )
}

export default Auth

const styles = StyleSheet.create({
    container: {
        width: '100%',
        paddingHorizontal: 20,
    },
    label: {
        color: colors.light[200],
        fontSize: 14,
        fontWeight: 'bold',
        marginBottom: 8,
        marginTop: 16,
    },
    input: {
        backgroundColor: colors.dark[100],
        color: colors.light[100],
        borderRadius: 8,
        paddingHorizontal: 12,
        paddingVertical: 12,
        fontSize: 14,
    },
    button: {
        backgroundColor: colors.accent,
        borderRadius: 8,
        paddingVertical: 15,
        paddingHorizontal: 20,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 20,
        flex: 1
    },
    buttonDisabled: {
        opacity: 0.6,
    },
    buttonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
    },
    errorText: {
        color: '#ff4444',
        fontSize: 14,
        marginTop: 12,
        textAlign: 'center',
    },
})