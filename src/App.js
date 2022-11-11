import "./App.css";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import { List } from "@mui/material";
import ListItemUser from "./components/ListItemUser";
import { useEffect, useState } from "react";
import axios from "axios";
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
  }, []);

  const handleDeletePost = (postID, idx) => {
    (async function() {
      await axios
        .delete(`${BASE_API_URL}/posts/${postID}`)
        .then(_ => {
          let arr = data;
          arr.splice(idx, 1);
          console.log(arr);
          setData([...arr]);
        })
        .catch(err => {
          console.log(err);
          window.alert(err);
        });
    })()
  };
  
  return (
    <div className="App">
        <div className="list-container">
          <div className="list-title-wrapper">
            <List>
              {data.map((d, idx) => (
                <ListItemUser
                  key={d.id}
                  primaryText={d.title}
                  secondaryText={d.body}
                  onDelete={() => handleDeletePost(d.id, idx)}
                />
              ))}
            </List>
          </div>
        </div>
    </div>
  );
}

export default App;
