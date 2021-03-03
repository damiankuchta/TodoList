import "./styles.css"

export default function DaysLeftCounter(props) {

    const renderTime = {
            placeholder: "",
            styles: ""
    }

    const oneDay = 24 * 60 * 60 * 1000
    const today = new Date()
    const {toBeCompletedByDate} = props
    const daysLeftToComplete = Math.round((new Date(toBeCompletedByDate) - today) / oneDay) +1

    if( daysLeftToComplete === -18689) {
        renderTime.placeholder = `You can take your time`
        renderTime.styles = "no-time time"
    } else if(Math.sign(daysLeftToComplete) === -1) {
       renderTime.placeholder = `You are past ${Math.abs(daysLeftToComplete)} days!`
        renderTime.styles = "past-time time"
    } else {
        renderTime.placeholder = `You have ${daysLeftToComplete} days left`
        renderTime.styles = "have-time time"
    }

    return (
        <p className={renderTime.styles}>{renderTime.placeholder}</p>
    )
}