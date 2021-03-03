import {useEffect} from 'react'

import './task_list.css'
import Task from "../Task";

export default function TaskList(props) {
    const placeHolder = "Loading..."

    const {tasks, setTasks} = props
    const {isTasksLoaded, setIsTasksLoaded } = props
    const {taskApiLink} = props

    // load tasks for a first time
    useEffect(() => {
        fetch(taskApiLink)
            .then(response => {return response.json()})
            .then(tasks => setTasks(() => {return [...tasks]}))
            .then(() => setIsTasksLoaded(() => { return {isTasksLoaded: true}}))

    }, [setTasks, setIsTasksLoaded, taskApiLink])

    return (
        <div>
            <h2>Tasks to be done</h2>
            <ul className="task-list">
                {isTasksLoaded ? tasks.map(task => <Task taskApiLink={taskApiLink} key={task.id} task={task} setTasks={setTasks}/>) : placeHolder}
            </ul>
        </div>
    )
}