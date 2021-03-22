import { useEffect, useState } from "react";
import "./App.css";
import Hotel from "./Hotels.component";
import LoadingMask from "./LoadingMask.component";

const App = () => {
  let [loading, setLoading] = useState(false);
  let [data, setData] = useState(false);

  let myFetch = async () => {
    try {
      setLoading(true);
      let resp = await fetch("api/hotels");
      let data = await resp.json();
      setData(data);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    myFetch();
  }, []);

  return (
    <div className="App">
      <h1>Hotels</h1>
      {loading && <LoadingMask />}
      {!data
        ? null
        : data.map((hotel, key) => <Hotel key={key} hotel={hotel} />)}
    </div>
  );
};

export default App;
