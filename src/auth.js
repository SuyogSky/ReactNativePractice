import auth from '@react-native-firebase/auth'

export const registerUser = async (email, password) => {
    try {
        const userDetails = await auth().createUserWithEmailAndPassword(email, password)
        await userDetails.user.sendEmailVerification()
        return userDetails
    } catch (error) {
        console.log(error.code)
        throw new Error(error.code)
    }
}

export const loginUser = async (email, password) => {
    try {
        const userDetails = await auth().signInWithEmailAndPassword(email, password)
        const user = userDetails.user;
        return {user, isEmailVerified: user.emailVerified}
    } catch (error) {
        console.log(error.code)
        throw new Error(error.code)
    }
}

export const resetPassword = async (email) => {
    try {
        await auth().sendPasswordResetEmail(email)
    } catch (error) {
        throw new Error(error.code)
    }
}