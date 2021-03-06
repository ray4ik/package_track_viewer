//React Core 
import React, { useEffect, useState } from "react";

import informationAlt from "./information.json"
import HomePage from "./components/templates/HomePage"
import "./styles/style.css"



function App() {

  const [status, setStatus] = useState(0);
  const [information, setInformation] = useState([]);
  const endpoint = "https://my.api.mockaroo.com/orders.json?key=e49e6840";

  useEffect( ()=> {
    const GetData = async () => {
      try 
      {
        const response = await fetch(endpoint, {mode: "cors"})
        const data = await response.json();

        if (response.ok) {
          setInformation(data);
          setStatus(1);
        } else {
          setStatus(2);
        }        
      }
      catch {
        setStatus(2);
      }
    }
    GetData();

  }, []);

  return (
    <div className="App">
          {status === 0 ? <p>Loading...</p> : null}
          {status === 1 ? <HomePage information={information} /> : null}
          {status === 2 ? <p>Sorry we cannot find data from end-point, taking the hardcoded alternative data
            <HomePage information={informationAlt} />
          </p>  : null}
    </div> 
  );
}

export default App;
