import NepalClock from "./Components/NepalClock"
import "./Dashboard.css"
function Dashboard(){
    return(
        <>
        <div className="background">
            <div className="Nepal">
                <NepalClock />
            </div>
        </div>
        </>
    )
}
export default Dashboard