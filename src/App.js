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
import logo from './logo.svg';
import './App.css';

const BASE_API_URL = 'https://jsonplaceholder.typicode.com';


function App() {
  
  const [data, setData] = useState([]);


  useEffect(() => {
    async function getData() {
      await axios
        .get(`${BASE_API_URL}/posts`)
        .then((res) => {
          const resultData = res.data;
          setData(resultData);
          console.log(res);
        })
        .catch((error) => {
          console.log(error);
          window.alert(error);
        })
    }

    getData();
  }, );
  
  return (
    <div className="App">
        <div className="list-container">
          <div className="list-title-wrapper">
            <List>
              {data.map((d) => (
                <ListItemUser
              key={d.id}
              primaryText={d.title}
              secondaryText={d.body}
              />
              ))}
            </List>
          </div>
        </div>
    </div>
  );
}

export default App;
