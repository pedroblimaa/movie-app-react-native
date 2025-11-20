import useFbAuth from "@/services/useFbAuth"
import * as WebBrowser from "expo-web-browser"
import { useState } from "react"
import { Button, Text, TextInput, View } from "react-native"

WebBrowser.maybeCompleteAuthSession()

const Auth = () => {
    const { user, login, register, loading, error } = useFbAuth()
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    return (
        <View>
            <Text>Email</Text>
            <TextInput value={email} onChangeText={setEmail} autoCapitalize="none" />

            <Text>Password</Text>
            <TextInput
                value={password}
                onChangeText={setPassword}
                secureTextEntry
            />

            <Button title={loading ? "Loading..." : "Login"} onPress={() => login} />

            {!!error && <Text style={{ color: "red" }}>{error}</Text>}
        </View>
    )
}

export default Auth