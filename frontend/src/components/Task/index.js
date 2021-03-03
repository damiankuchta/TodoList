import "./task.css"

export default function Task(props) {

    const {setTasks} = props
    const {taskApiLink} = props

    function updateTask(id, data) {
            setTasks(prevTasks => {
            let index = prevTasks.findIndex(task =>  task.id === id )
            let newTasksArray = prevTasks
            newTasksArray[index] = {...data}
            return [...newTasksArray]
        })
    }

    function deleteTask(id) {
        setTasks(prevTasks => {
            let data = prevTasks.filter(task => { return task.id !== id })
            return [...data]
        })
    }

    function onTaskComplete(task) {
        const updateOptions = {
            method: "PUT",
            headers: {'Content-Type': "application/json"},
            body: JSON.stringify({...task, is_completed: !task.is_completed})
        }

        fetch(taskApiLink+task.id+"/", updateOptions)
            .then(response => {return response.json()})
            .then(data => updateTask(task.id, data))

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

    const toBeCompletedBy = props.task.is_completed ? "" :
        props.task.to_be_completed_date ?
            `To be completed by: ${props.task.to_be_completed_date}`
            : `To be completed date not set`

    const doneButtontext = props.task.is_completed ? "undone" : "done"

    return (
        <li className="task">
            <input type="checkbox" name={props.task.name}
                   checked={props.task.is_completed}
                   onChange={() => onTaskComplete(props.task)}/>
                <label htmlFor={props.task.name}>{props.task.name}</label>
            <button className="task-button" onClick={() => onDeleteTask(props.task.id)}>Delete</button>
            <button className="task-button" onClick={() => onTaskComplete(props.task)}>{doneButtontext}</button>
            <p>{toBeCompletedBy}</p>
            <hr/>
        </li>

    )
}

