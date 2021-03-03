import DaysLeftCounter from "../DaysLeftCounter"

import "./task.css"

export default function Task(props) {

    const {setTasks} = props
    const {setToggledTasks} = props
    const {taskApiLink} = props

    const {name, to_be_completed_date, is_completed} = props.task

    // function updateTask(id, data) {
    //     setTasks(prevTasks => {
    //         let index = prevTasks.findIndex(task =>  task.id === id )
    //         let newTasksArray = prevTasks
    //         newTasksArray[index] = {...data}
    //         return [...newTasksArray]
    //     })
    // }

    function updateToggledTask(id, data) {
        deleteTask(id)
        setToggledTasks((prevTasks) => {
            return [...prevTasks, data]
        })
    }

    function deleteTask(id) {
        setTasks(prevTasks => {
            let data = prevTasks.filter(task => { return task.id !== id })
            return [...data]
        })
    }

    function onTaskChecked(task) {
        const updateOptions = {
            method: "PUT",
            headers: {'Content-Type': "application/json"},
            body: JSON.stringify({...task, is_completed: !task.is_completed})
        }

        fetch(taskApiLink+task.id+"/", updateOptions)
            .then(response => {return response.json()})
            .then(data => updateToggledTask(task.id, data))

    }

    function onDeleteTask(id) {
        const deleteOptions = {
            method: "DELETE",
            headers: {'Content-Type': "application/json"},
        }

        fetch(taskApiLink+id, deleteOptions)
            .then(response => {
                if(response.status === 204) {
                    deleteTask(id)
                }
            })
    }

    const doneButtontext = props.task.is_completed ? "undone" : "done"

    return (
        <li className="task">
            <input type="checkbox" name={name}
                   checked={is_completed}
                   onChange={() => onTaskChecked(props.task)}/>
                <label htmlFor={name}>{name} {to_be_completed_date && "("+to_be_completed_date+")"}</label>
            <button className="task-button" onClick={() => onDeleteTask(props.task.id)}>Delete</button>
            <button className="task-button" onClick={() => onTaskChecked(props.task)}>{doneButtontext}</button>
            {!is_completed &&
            <DaysLeftCounter toBeCompletedByDate={to_be_completed_date}/>}
            <hr/>
        </li>

    )
}

