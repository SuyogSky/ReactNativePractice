import firestore from '@react-native-firebase/firestore'

export const addUserData = async (userData) => {
    try {
        await firestore().collection('users').add(userData)
        console.log('User added successfully.')
    } catch (error) {
        console.log('Error adding user: ', error)
    }
}

export const getUsers = async () => {
    try {
        const fetchedData = await firestore().collection('users').get()
        const users = fetchedData.docs.map((doc) => ({ id: doc.id, ...doc.data() }))
        console.log('User Fetched: ', users)
        return users
    } catch (error) {
        console.log('Error fetching user: ', error)
    }
}

export const updateUser = async (id, newUserData) => {
    try {
        await firestore().collection('users').doc(id).update(newUserData)
        console.log('User updated successfully.')
    } catch (error) {
        console.log('Error updating user: ', error)
    }
}

export const deleteUser = async (id) => {
    try {
        await firestore().collection('users').doc(id).delete()
        console.log('User deleted successfully.')
    } catch (error) {
        console.log('Error deleting user: ', error)
    }
}
