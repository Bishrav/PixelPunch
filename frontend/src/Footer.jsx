import Social from "./assets/Social.png"
import Social1 from "./assets/Social1.png"
import Social2 from "./assets/Social2.png"
import Social4 from "./assets/Social4.png"

function Footer() {
    return (
        <footer>
            <div className="foot">
                <div>
                    <ul>
                        <li className="top">Vehicles</li>
                        <li>Range Rover</li>
                        <li>RANGE ROVER SPORT</li>
                        <li>RANGE ROVER VELAR </li>
                        <li>RANGE ROVER EVOQUE</li>
                        <li>SV</li>
                        <li>FLEET AND BUSINESS</li>
                        <li>DIPLOMATIC SALES </li>
                    </ul>
                </div>
                <div>
                    <ul>
                        <li className="top">OWNERSHIP</li>
                        <li>OWNERSHIP</li>
                        <li>INCONTROL</li>
                        <li>Software Controls</li>

                    </ul>
                    <ul>
                        <li className="top">About Us</li>
                        <li>JLR</li>
                        <li>Sustainability</li>
                        <li>Vechile Data Emissions</li>
                    </ul>
                </div>
                <div>
                    <ul>
                        <li className="top">Our Brands</li>
                        <li>Range Rover</li>
                        <li>Defender</li>
                        <li>Discovery</li>
                        <li>Jaguar</li>
                    </ul>
                </div>
                <div className="last">
                    <ul>
                        <li className="top">Join The Conversation</li>
                        <li> <img src={Social} alt="" />Instagram</li>
                        <li> <img src={Social1} alt="" />Facebook</li>
                        <li> <img src={Social2} alt="" />Twitter</li>
                        <li> <img src={Social4} alt="" />linkedin</li>
                    </ul>
                </div>

            </div>

        </footer >

    )
}
export default Footer