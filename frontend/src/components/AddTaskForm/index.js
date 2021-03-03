import "./style.css"

export default function AddTaskForm(props) {

    const {newTaskData, setNewTaskData} = props
    const {setTasks} = props
    const {taskApiLink} = props

    function addTask(newTask) {
        setTasks(prevTasks => {
            return [...prevTasks, newTask]})
    }

    function onNewTaskChange(event) {
        const {name, value} = event.target
        setNewTaskData(pervState => {
            return  { ...pervState,
                     [name]: value }
        })
    }

    function onSubmitNewTask(event) {
        event.preventDefault()

        const chanagedData = newTaskData
        chanagedData.to_be_completed_date = chanagedData.to_be_completed_date === "" ? null : chanagedData.to_be_completed_date

        const postOptions = {
            method: "POST",
            headers: {'Content-Type': "application/json"},
            body: JSON.stringify(chanagedData)

        }

        fetch(taskApiLink, postOptions)
            .then(response => {
                if (response.status >= 400) {
                    console.log("whoops")
                } else {
                    Promise.resolve(response.json())
                        .then(data => addTask(data))
                }
            })
    }

    return (
          <form className="task-form" onSubmit={onSubmitNewTask}>
            <input name="name" type="text" placeholder="Name" value={newTaskData.name} onChange={onNewTaskChange} required={true}/> <br/>
            <input name="to_be_completed_date" type="date" value={newTaskData.to_be_completed_date} onChange={onNewTaskChange}/> <br/>
            <button>Add task</button>
          </form>
    )
}