import React, { useEffect, useState } from "react";
import ShowApi from "./ShowApi";

const URL = "https://jsonplaceholder.typicode.com/posts";

export default function UseApi() {
  let time = new Date().toLocaleString();
  const [data, setData] = useState([]);
  const [text, setText] = useState("");
  const [error, setError] = useState(null);
  const [loading, setloading] = useState(true);
  const [livetime, setLivetime] = useState(time);

  setInterval(() => {
    setLivetime(new Date().toLocaleString());
  }, 1000);

  const Getinputvalue = (e) => {
    setText(e.target.value.trim());
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(URL);
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const result = await response.json();
        setData(result);
      } catch (error) {
        setError(error);
      } finally {
        setloading(false);
      }
    };
    fetchData();
  }, []);
  if (loading)
    return <div className="text-center font-semibold">Loading....</div>;
  if (error) return <div>Error: {error.message}</div>;
  return (
    <ShowApi
      data={data}
      inputvalue={Getinputvalue}
      text={text}
      time={livetime}
    />
  );
}
