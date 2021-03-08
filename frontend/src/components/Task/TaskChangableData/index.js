import {useState} from "react";

export default function TaskChangableData(props){

    const [data, setData] = useState(props.data)
    const [editable, setEditable] = useState(false)

    const {type} = props
    const {dataName} = props
    const {setState} = props
    const {updateTask} = props
    const {isEditBlocked} = props

    function onClick() {
        setEditable(() => (true))
    }

    function onFocustOut() {
        updateTask({[dataName]: data})
        setEditable(() => (false))
    }

    function onChange(event) {
        setData(() => (event.target.value))
    }

    const displayData = data ? data : "(no data)"

    return (
        isEditBlocked ?
        editable ?
            <input onChange={onChange} onBlur={onFocustOut} value={data} type={type} autoFocus={true}/> :
            <span onClick={onClick}>{displayData} </span> :
        <span>{data} </span>
    )
}