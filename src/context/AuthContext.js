import { createContext, useState } from "react";
import { Alert } from "react-native";

const AuthContext = createContext()

export default AuthContext

export const AuthProvider = ( {children} ) => {
    const userEmail = 'suyog@gmail.com'
    const userPassword = '1234'

    const [userList, setUserList] = useState([
        {
            name: 'user1',
            email: 'user1@gmail.com',
            password: '1234'
        },
        {
            name: 'user2',
            email: 'user2@gmail.com',
            password: '1234'
        }
    ])

    const [user, setUser] = useState(null)

    const loginUser = (email, password) => {
        if (email == '' || password == ''){
            Alert.alert('Login', 'Please enter all the fields.')
        }
        else if (email == userEmail && password == userPassword){
            setUser({name: 'Suyog Shakya', email: userEmail})
            Alert.alert('Login', 'Login successful.')
            return true
        }
        else{
            Alert.alert('Login', 'Please enter valid credentials.')
        }
        return false
    }

    const registerUser = (name, email, password) => {
        if (email == '' || password == '' || name == ''){
            Alert.alert('Register', 'Please enter all the fields.')
        }
        else{
            setUser([...{name, email, password}])
        }
    }

    const contextDate = {
        user,
        loginUser,
        registerUser
    }
    return (
        <AuthContext.Provider value={ contextDate }>
            {children}
        </AuthContext.Provider>
    )
}