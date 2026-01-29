import { useEffect, useState } from "react";
import "./FlashTimer.css";

function FlashTimer() {
    // Set deal end time (example: 24 hours from now)
    const dealEnd = new Date();
    dealEnd.setHours(dealEnd.getHours() + 24);

    const calculateTimeLeft = () => {
        const difference = dealEnd - new Date();

        let timeLeft = {
            hours: "00",
            minutes: "00",
            seconds: "00",
        };

        if (difference > 0) {
            timeLeft = {
                day: String(Math.floor((difference / (1000 * 60 * 60 * 24)) % 30)).padStart(2, "30"),
                hours: String(Math.floor((difference / (1000 * 60 * 60)) % 24)).padStart(2, "0"),
                minutes: String(Math.floor((difference / (1000 * 60)) % 60)).padStart(2, "0"),
                seconds: String(Math.floor((difference / 1000) % 60)).padStart(2, "0"),
            };
        }

        return timeLeft;
    };

    const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

    useEffect(() => {
        const timer = setInterval(() => {
            setTimeLeft(calculateTimeLeft());
        }, 1000);

        return () => clearInterval(timer);
    }, []);

    return (
        <div className="flash-timer">
            <div className="time-box">
                <span>{timeLeft.day}</span>
                <p>Days</p>
            </div>
            <div className="time-box">
                <span>{timeLeft.hours}</span>
                <p>Hours</p>
            </div>
            <div className="time-box">
                <span>{timeLeft.minutes}</span>
                <p>Minutes</p>
            </div>
            <div className="time-box">
                <span>{timeLeft.seconds}</span>
                <p>Seconds</p>
            </div>
        </div>
    );
}

export default FlashTimer;
