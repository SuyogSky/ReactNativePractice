import { StyleSheet } from "react-native";

const form = StyleSheet.create({
    formContainer: {
        padding: 20,
        backgroundColor: 'white',
        margin: 20,
        borderRadius: 8,
        boxShadow: '1px 1px 10px rgba(0,0,0,0.1)'
    },
    headingText: {
        textAlign: 'center',
        color: 'purple',
        fontSize: 32,
        fontWeight: 'bold',
        marginBottom: 30
    },
    inputField: {
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 20,
        borderRadius: 5,
        paddingHorizontal: 15
    },
    btnStyle: {
        backgroundColor: 'purple',
        padding: 15,
        borderRadius: 5
    },
    btnText: {
        textAlign: 'center',
        fontSize: 18,
        color: 'white',
        fontWeight: 'semibold'
    }
})

export default form