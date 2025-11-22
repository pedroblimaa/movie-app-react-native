import firebaseConfig from "@/configs/firebaseConfig"
import { UserInfo } from "@/interfaces/UserInfo"
import { User } from "firebase/auth"
import { doc, getDoc, setDoc, updateDoc } from "firebase/firestore"

export const authErrorMaps = {
    'email-already-in-use': 'This email is already in use.',
}

const fbUserService = {
    getUserInfo: async (user: User): Promise<UserInfo | null> => {
        const docSnap = await getDoc(doc(firebaseConfig.db, 'users', user.uid))
        return docSnap.exists() ? docSnap.data() as UserInfo : null
    },

    updateUserInfo: async (user: User, userInfo: Partial<UserInfo>) => {
        const userDocRef = doc(firebaseConfig.db, 'users', user.uid)
        const docSnap = await getDoc(userDocRef)

        if (docSnap.exists()) {
            await updateDoc(userDocRef, userInfo)
        } else {
            await setDoc(userDocRef, { ...userInfo, userId: user.uid })
        }
    }
}

export default fbUserService