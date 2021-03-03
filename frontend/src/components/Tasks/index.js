import React, {useState} from "react"

import TaskList from "../TaskList";
import AddTaskForm from "../AddTaskForm";
import "./style.css"

export default function Tasks(props) {

    const taskApiLink = "http://localhost:8000/api/task/"

    const [tasks, setTasks] = useState([])
    const [isTasksLoaded, setIsTasksLoaded] = useState(false)
    const [newTaskData, setNewTaskData] = useState({
            name: "",
            to_be_completed_date: ""
    })

    return (
        <div className="task-container">
            <AddTaskForm
                setTasks={setTasks}
                newTaskData={newTaskData}
                setNewTaskData={setNewTaskData}
                taskApiLink={taskApiLink}/>

            <TaskList
                tasks={tasks}
                setTasks={setTasks}
                setIsTasksLoaded={setIsTasksLoaded}
                isTasksLoaded={isTasksLoaded}
                taskApiLink={taskApiLink}/>
        </div>
    );
}

