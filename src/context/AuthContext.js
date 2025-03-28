import { createContext, useState } from "react";
import auth from '@react-native-firebase/auth'
import { Alert } from 'react-native'

const AuthContext = createContext()

export default AuthContext

export const AuthProvider = ({ children }) => {

    const [loggedInUser, setLoggedInUser] = useState()

    const registerUser = async (email, password) => {
        try {
            const userDetails = await auth().createUserWithEmailAndPassword(email, password)
            await userDetails.user.sendEmailVerification()
            return userDetails
        } catch (error) {
            console.log(error.code)
            throw new Error(error.code)
        }
    }

    const loginUser = async (email, password) => {
        try {
            const userDetails = await auth().signInWithEmailAndPassword(email, password)
            const user = userDetails.user;
            return { user, isEmailVerified: user.emailVerified }
        } catch (error) {
            console.log(error.code)
            throw new Error(error.code)
        }
    }

    const resetPassword = async (email) => {
        try {
            await auth().sendPasswordResetEmail(email)
        } catch (error) {
            throw new Error(error.code)
        }
    }

    const checkLogin = async () => {
        try {
            await auth().onAuthStateChanged((user) => {
                setLoggedInUser(user)
            })
        } catch (error) {
            throw new Error(error)
        }
    }

    const logoutUser = async () => {
        try {
            await auth().signOut()
            Alert.alert('Success', 'You have been logged out.')
        } catch (error) {
            throw new Error(error)
        }
    }

    const contextDate = {
        loggedInUser,
        registerUser,
        loginUser,
        resetPassword,
        checkLogin,
        logoutUser
    }
    return (
        <AuthContext.Provider value={contextDate}>
            {children}
        </AuthContext.Provider>
    )
}