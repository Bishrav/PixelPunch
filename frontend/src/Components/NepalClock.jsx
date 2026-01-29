import { useEffect, useState } from "react";

const NepalClock = () => {
  const [time, setTime] = useState("");

  useEffect(() => {
    const updateTime = () => {
      const nepalTime = new Intl.DateTimeFormat("en-US", {
        timeZone: "Asia/Kathmandu",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: false, // set true if you want AM/PM
      }).format(new Date());

      setTime(nepalTime);
    };

    updateTime(); // initial call
    const interval = setInterval(updateTime, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div style={{ fontSize: "24px", fontWeight: "bold" }}>
    {time}
    </div>
  );
};

export default NepalClock;
