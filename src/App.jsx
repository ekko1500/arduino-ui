import { useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { getDatabase, onValue, ref, set } from "firebase/database";
import { app } from "./utils/firebase";

function App() {
  const db = getDatabase(app);
  const [status, setStatus] = useState("NULL");

  function writeUserData() {
    if (status === "ON") {
      set(ref(db), {
        data: "OFF",
      });
    } else {
      set(ref(db), {
        data: "ON",
      });
    }
  }

  function readData() {
    const dataRef = ref(db);
    onValue(dataRef, (snapshot) => {
      const data = snapshot.val();
      console.log(data.data);
      setStatus(data.data);
    });
  }

  useEffect(() => {
    readData();
  }, []);

  return (
    <>
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <h1>LED : {status}</h1>
      <div className="card">
        <button onClick={() => writeUserData()}>Toggle</button>
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  );
}

export default App;
