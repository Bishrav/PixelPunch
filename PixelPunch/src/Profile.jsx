import ProfileCar from "./assets/Purchase3.png"
import "./Profile.css"
import Call from "./assets/call.png"
import Mail from "./assets/Mail.png"
import Mark from "./assets/mark.png"
import Car from "./assets/ProfCar.png"
import Logo from "./assets/Zap.png"
import Package from "./assets/Package.png"
function Profile() {
    const user = JSON.parse(localStorage.getItem("user") || "{}");
    return (

        <>
            <section className="Profile">
                <div className="ProfDiv">
                    <div className="sidebar">
                        <img src={ProfileCar} alt="" />
                    </div>
                    <div className="ProfCon">
                        <h1>{user.username || "User Name"}</h1>
                        <hr />
                        <div className="profdis">
                            <img src={Mail} alt="" />
                            <p>{user.email || "user@example.com"}</p>
                        </div>
                        <div className="profdis">
                            <img src={Call} alt="" />
                            <p>+977 9820423323</p>
                        </div>
                        <div className="profdis">
                            <img src={Mark} alt="" />
                            <p>Kathmandu,Nepal</p>
                        </div>
                    </div>
                    <hr />
                    <div>

                        <div>


                        </div>
                    </div>
                </div>

                <div className="ProfHead">
                    <div className="ProfContent">
                        <h1>Account Overview</h1>
                        <div className="ProfCo">
                            <img src={Car} alt="" />
                            <div className="Profdiv">
                                <h1>Car Bought</h1>
                                <p>2</p>
                            </div>
                        </div>

                    </div>
                    <div className="arrange">
                        <div className="ProfContent">

                            <div className="ProfCo">
                                <img src={Logo} alt="" />
                                <div className="Profdiv">
                                    <h1>Cars Rented</h1>
                                    <p>3</p>
                                </div>
                            </div>

                        </div>
                        <div className="ProfContent">

                            <div className="ProfCo">
                                <img src={Package} alt="" />
                                <div className="Profdiv">
                                    <h1>Car Bought</h1>
                                    <p>2</p>
                                </div>
                            </div>

                        </div>

                        <div className="ProfContent">

                            <div className="ProfCo">
                                <img src={Car} alt="" />
                                <div className="Profdiv">
                                    <h1>Car Bought</h1>
                                    <p>2</p>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>

            </section>
        </>
    )
}
export default Profile;