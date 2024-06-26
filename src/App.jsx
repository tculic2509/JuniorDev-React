import './App.css';
import axios from "axios";
import { useState, useEffect } from "react";
import Login from "./pages/Login";



function App() {
  const [podaci, postaviPodatke] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:8080/korisnici')
      .then((resUser) => {
        const podaci = [...resUser.data];
        postaviPodatke(podaci);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, []);

  return (
    <div className='App'>
      <Login />
    </div>
  );
}

export default App;
