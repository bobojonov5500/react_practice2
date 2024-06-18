import React, { useEffect, useState } from "react";

export default function Timer() {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const intervalID = setInterval(() => {
      //   const now = new Date();
      //   let years = now.getFullYear();
      //   let month = now.getMonth();
      //   let day = now.getDay();
      //   let hours = now.getHours();
      //   let minutes = now.getMinutes();
      //   let second = now.getSeconds();
      setTime(new Date());
    }, 1000);
    return () => clearInterval(intervalID);
  }, []);

  return time;
}
