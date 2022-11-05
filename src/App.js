import "./App.css";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import { Button, IconButton, List, Paper, Typography } from "@mui/material";
import ListItemUser from "./components/ListItemUser";
import { useEffect, useState } from "react";
import axios from "axios";
import { AddCircle } from "@mui/icons-material";
import AddUserDialog from "./components/AddUserDialog";
import logo from './logo.svg';
import './App.css';

const BASE_API_URL = 'https://jsonplaceholder.typicode.com/';


function App() {
  
  const [data, setDatas] = useState([]);


  useEffect(() => {
    async function getData() {
      await axios
        .get(`${BASE_API_URL}/posts`)
        .then((res) => {
          const resultData = res.data.data;
          setData(resultData);
        })
        .catch((error) => {
          console.log(error);
          window.alert(error);
        })
    }

    getData();
  });
  
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <List>
          {data.map((d) => (
            <ListItemUser
          key={d.id}
          primaryText={d.title}
          secondaryText={d.body}
          />
          ))}
        </List>

        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
