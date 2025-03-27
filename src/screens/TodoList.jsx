import { View, Text, TextInput, Touchable, TouchableOpacity, StyleSheet, ScrollView } from 'react-native'
import React, { useState } from 'react'

const TodoList = () => {
    const [taskName, setTaskName] = useState('')
    const [taskList, setTaskList] = useState([])
    const [editingTask, setEditingTask] = useState(null)

    const addTask = () => {
        if (taskName.trim() != '') {
            if (editingTask) {
                setTaskList(taskList.map(task => task.id === editingTask.id ? {...task, text: taskName}: task))
                setEditingTask(null)
                setTaskName('')
            }
            else {
                console.log(taskName, 'Added')
                setTaskList([...taskList, { id: Date.now().toString(), text: taskName }])
                console.log(taskList)
                setTaskName('')
            }
        }
    }

    const markAsDone = (id) => {
        setTaskList(taskList.filter(task => task.id !== id))
        console.log(taskList)
    }

    const editTask = (task) => {
        setTaskName(task.text)
        setEditingTask(task)
    }
    return (
        <View style={styles.mainContainer}>
            <Text style={styles.heading}>Todo List</Text>
            <TextInput
                placeholder='Enter a Task'
                style={styles.input}
                onChangeText={setTaskName}
                value={taskName}
            />
            <TouchableOpacity style={styles.btnStyle} onPress={addTask}>
                <Text style={{ fontWeight: 'bold', fontSize: 18 }}>{editingTask?'Save Task': 'Add Task'}</Text>
            </TouchableOpacity>

            <ScrollView style={styles.taskContainer}>
                {taskList.map((task) => {
                    return (
                        <View style={styles.task} key={task.id}>
                            <Text style={styles.taskText}>{task.text}</Text>
                            <View style={styles.btnContainer}>
                                <TouchableOpacity style={[styles.doneBtn, styles.editBtn]} onPress={() => editTask(task)}>
                                    <Text style={{ color: 'white' }}>Edit</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={styles.doneBtn} onPress={() => markAsDone(task.id)}>
                                    <Text>Mark as Done</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    )
                })}
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    mainContainer: {
        padding: 20,
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.05)'
    },
    heading: {
        textAlign: 'center',
        fontSize: 32,
        fontWeight: 'bold',
        marginBottom: 30
    },
    input: {
        borderColor: 'black',
        borderWidth: 1,
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderRadius: 5,
        marginBottom: 20,
        fontSize: 18
    },
    btnStyle: {
        backgroundColor: 'lightgreen',
        paddingVertical: 10,
        alignItems: 'center',
        borderRadius: 5
    },
    taskContainer: {
        marginVertical: 40
    },
    task: {
        paddingVertical: 20,
        paddingHorizontal: 30,
        backgroundColor: 'white',
        borderRadius: 5,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 15
    },
    taskText: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    btnContainer: {
        flexDirection: 'row'
    },
    editBtn: {
        backgroundColor: 'blue',
        color: 'white',
        marginRight: 15,
        paddingHorizontal: 20
    },
    doneBtn: {
        paddingVertical: 7,
        paddingHorizontal: 10,
        backgroundColor: 'lightgreen',
        borderRadius: 5
    }
})

export default TodoList