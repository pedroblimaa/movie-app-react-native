import { colors } from '@/constants/colors'
import React from 'react'
import { StyleSheet, Text, TextInput, TextInputProps, View } from 'react-native'

interface EditableTextFieldProps {
    label: string
    value: string
    isEditing: boolean
    onChangeText?: (text: string) => void
    placeholder?: string
    keyboardType?: TextInputProps['keyboardType']
}

const EditableTextField = ({
    label,
    value,
    isEditing,
    onChangeText,
    placeholder,
    keyboardType = 'default'
}: EditableTextFieldProps) => {
    return (
        <View style={styles.container}>
            <Text style={styles.label}>{label}</Text>
            {isEditing ? (
                <TextInput
                    style={styles.input}
                    value={value}
                    onChangeText={onChangeText}
                    placeholder={placeholder}
                    placeholderTextColor={colors.light[300]}
                    keyboardType={keyboardType}
                    editable={!!onChangeText}
                />
            ) : (
                <Text style={styles.value}>{value || 'Not set'}</Text>
            )}
        </View>
    )
}

export default EditableTextField

const styles = StyleSheet.create({
    container: {
        marginTop: 12,
    },
    label: {
        color: colors.light[300],
        fontSize: 12,
        fontWeight: 'bold',
        textTransform: 'uppercase',
    },
    value: {
        color: colors.light[100],
        fontSize: 16,
        marginTop: 6,
    },
    input: {
        color: colors.light[100],
        fontSize: 16,
        marginTop: 6,
        backgroundColor: colors.dark[200],
        borderRadius: 8,
        paddingHorizontal: 12,
        paddingVertical: 10,
        borderWidth: 1,
        borderColor: colors.light[300],
    },
})
