import {useState, useEffect} from 'react'

import DaysLeftCounter from "./DaysLeftCounter"
import TaskName from "./TaskName";
import TaskDate from "./TaskDate";
import "./task.css"

export default function Task(props) {

    const {setTasks} = props
    const {setToggledTasks} = props
    const {taskApiLink} = props

    const [task, setTask] = useState({...props.task})

    function updateCheckedTask(task) {
        updateTask({is_completed: !task.is_completed})
            .then((task) => {
                deleteTaskFromList(task.id)
                setToggledTasks((prevTasks) => {
                return [...prevTasks, task]
                })
            })
    }

    function updateTask(data) {
        const updateOptions = {
            method: "PUT",
            headers: {'Content-Type': "application/json"},
            body: JSON.stringify({...task, ...data})
        }

        return fetch(taskApiLink+task.id+"/", updateOptions)
            .then(response => {return response.json()})
            .then(task => {
                setTask(() => ({...task, ...data}))
                return task
            })
    }

    function deleteTaskFromList(id) {
        setTasks(prevTasks => {
            let data = prevTasks.filter(task => { return task.id !== id })
            return [...data]
        })
    }

    function deleteTask(id) {
        const deleteOptions = {
            method: "DELETE",
            headers: {'Content-Type': "application/json"},
        }

        fetch(taskApiLink+id, deleteOptions)
            .then(response => {
                if(response.status === 204) {
                    deleteTaskFromList(id)
                }
            })
    }

    const doneButtontext = task.is_completed ? "undone" : "done"

    return (
        <li className="task">
            <TaskName name={task.name}
                      updateTask={updateTask}/>

            <TaskDate date={task.is_completed ? task.completed_date : task.to_be_completed_date}
                      canEdit={!task.is_completed}
                      updateTask={updateTask}/>

            <button className="task-button"
                    onClick={() => deleteTask(task.id)}>Delete</button>

            <button className="task-button"
                    onClick={() => updateCheckedTask(task)}>{doneButtontext}</button>

            {!task.is_completed &&
            <DaysLeftCounter toBeCompletedByDate={task.to_be_completed_date}/> }
            <hr/>
        </li>

    )
}

