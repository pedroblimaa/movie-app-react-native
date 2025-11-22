import Auth from '@/components/Auth'
import Avatar from '@/components/Avatar'
import EditableTextField from '@/components/EditableTextField'
import LoadingIndicator from '@/components/LoadingIndicator'
import { colors } from '@/constants/colors'
import { icons } from '@/constants/icons'
import { UserInfo } from '@/interfaces/UserInfo'
import fbUserService from '@/services/fbUserService'
import useFbAuth from '@/services/useFbAuth'
import { User } from 'firebase/auth'
import React, { useEffect, useState } from 'react'
import { Image, KeyboardAvoidingView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'

const Profile = () => {
    const [userInfo, setUserInfo] = useState<UserInfo | null>(null)
    const [isEditing, setIsEditing] = useState(false)
    const [editName, setEditName] = useState('')
    const [editAge, setEditAge] = useState('')
    const [isSaving, setIsSaving] = useState(false)
    const { user, logout, loading } = useFbAuth()

    useEffect(() => {
        const handleUserInfo = async (user: User) => {
            const info = await fbUserService.getUserInfo(user)
            setUserInfo(info)
            if (info) {
                setEditName(info.name || '')
                setEditAge(info.age || '')
            }
        }

        if (user) {
            handleUserInfo(user)
        }
    }, [user])

    const handleSave = async () => {
        if (!user) return

        setIsSaving(true)
        try {
            await fbUserService.updateUserInfo(user, {
                name: editName,
                age: editAge
            })

            const updatedInfo = await fbUserService.getUserInfo(user)
            setUserInfo(updatedInfo)
            setIsEditing(false)
        } finally {
            setIsSaving(false)
        }
    }

    const handleCancel = () => {
        if (userInfo) {
            setEditName(userInfo.name || '')
            setEditAge(userInfo.age || '')
        }
        setIsEditing(false)
    }

    if (loading) {
        return (
            <View style={styles.container}>
                <LoadingIndicator />
            </View>
        )
    }

    if (user) {
        return (
            <KeyboardAvoidingView
                style={styles.container}
                behavior='padding'
                keyboardVerticalOffset={-50}
            >
                <ScrollView
                    contentContainerStyle={styles.scrollContent}
                    style={styles.scrollView}
                    keyboardShouldPersistTaps="handled"
                >
                    <View style={styles.userInfo}>
                        <View style={styles.avatarContainer}>
                            <Avatar name={userInfo?.name} />
                        </View>

                        {!isEditing && (
                            <TouchableOpacity
                                style={styles.editIconButton}
                                onPress={() => setIsEditing(true)}
                            >
                                <Text style={styles.editIcon}>✏️</Text>
                            </TouchableOpacity>
                        )}

                        <EditableTextField
                            label="Email"
                            value={user.email || ''}
                            isEditing={false}
                        />

                        <EditableTextField
                            label="Name"
                            value={isEditing ? editName : (userInfo?.name || '')}
                            isEditing={isEditing}
                            onChangeText={setEditName}
                            placeholder="Enter your name"
                        />

                        <EditableTextField
                            label="Age"
                            value={isEditing ? editAge : (userInfo?.age || '')}
                            isEditing={isEditing}
                            onChangeText={setEditAge}
                            placeholder="Enter your age"
                            keyboardType="numeric"
                        />
                    </View>

                    {isEditing ? (
                        <View style={styles.buttonRow}>
                            <TouchableOpacity
                                style={styles.cancelButton}
                                onPress={handleCancel}
                                disabled={isSaving}
                            >
                                <Text style={styles.cancelButtonText}>Cancel</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={[styles.saveButton, isSaving && styles.saveButtonDisabled]}
                                onPress={handleSave}
                                disabled={isSaving}
                            >
                                {isSaving ? (
                                    <LoadingIndicator size='small' />
                                ) : (
                                    <Text style={styles.saveButtonText}>Save</Text>
                                )}
                            </TouchableOpacity>
                        </View>
                    ) : (
                        <TouchableOpacity style={styles.logoutButton} onPress={logout}>
                            <Text style={styles.logoutButtonText}>Logout</Text>
                        </TouchableOpacity>
                    )}
                </ScrollView>
            </KeyboardAvoidingView>
        )
    }

    return (
        <KeyboardAvoidingView
            style={styles.container}
            behavior='padding'
            keyboardVerticalOffset={-50}
        >
            <ScrollView
                contentContainerStyle={styles.scrollContent}
                keyboardShouldPersistTaps="handled"
                style={styles.scrollView}
            >
                <View style={styles.header}>
                    <Image source={icons.person} style={{ width: 40, height: 40 }} tintColor='#fff' />
                    <Text style={styles.headerTitle}>Profile</Text>
                </View>

                <Auth />
            </ScrollView>
        </KeyboardAvoidingView>
    )
}
export default Profile
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.primary,
    },
    scrollView: {
        flex: 1,
        width: '100%',
    },
    scrollContent: {
        flexGrow: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 10,
    },
    header: {
        alignItems: 'center',
        gap: 5,
        marginBottom: 20,
    },
    avatarContainer: {
        position: 'absolute',
        left: '50%',
        transform: [{ translateX: '-50%' }, { translateY: '-50%' }],
    },
    headerTitle: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 16,
    },
    userInfo: {
        width: '100%',
        backgroundColor: colors.dark[100],
        borderRadius: 12,
        padding: 20,
        marginTop: 40,
    },
    editIconButton: {
        position: 'absolute',
        top: 20,
        right: 20,
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: colors.accent,
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 10,
    },
    editIcon: {
        fontSize: 20,
    },
    buttonRow: {
        flexDirection: 'row',
        gap: 10,
        marginTop: 20,
        width: '100%',
    },
    saveButton: {
        flex: 1,
        backgroundColor: colors.accent,
        borderRadius: 8,
        paddingVertical: 15,
        paddingHorizontal: 20,
        alignItems: 'center',
        justifyContent: 'center',
    },
    saveButtonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
    },
    saveButtonDisabled: {
        opacity: 0.6,
    },
    cancelButton: {
        flex: 1,
        backgroundColor: colors.dark[200],
        borderRadius: 8,
        paddingVertical: 15,
        paddingHorizontal: 20,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 1,
        borderColor: colors.light[300],
    },
    cancelButtonText: {
        color: colors.light[100],
        fontSize: 16,
        fontWeight: 'bold',
    },
    logoutButton: {
        backgroundColor: colors.accent,
        borderRadius: 8,
        paddingVertical: 15,
        paddingHorizontal: 20,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 30,
        width: '100%',
    },
    logoutButtonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
    },
})
