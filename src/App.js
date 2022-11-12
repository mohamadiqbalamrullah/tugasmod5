import "./App.css";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import { List } from "@mui/material";
import ListItemUser from "./components/ListItemUser";
import CreatePost from "./components/CreatePost";
import { useEffect, useState, createContext } from "react";
import axios from "axios";
import './App.css';
import UpdatePost from "./components/UpdatePost";

const BASE_API_URL = 'https://jsonplaceholder.typicode.com';

export const UpdateContext = createContext();

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

  const handleCreatePost = (title, body) => {
    (async function() {
      await axios
        .post(`${BASE_API_URL}/posts`, {
          title: title,
          body: body,
          userId: 1,
        })
        .then(res => {
          console.log(res);
          const post = res.data;
          setData([post, ...data]);
        })
        .catch(err => {
          console.log(err);
          window.alert(err);
        });
    })()
  };

  const [post, setPost] = useState(null);

  const handleUpdatePost = (title, body) => {
    const { id, idx } = post;
    (async function() {
      await axios
        .put(`${BASE_API_URL}/posts/${id}`, {
          title: title,
          body: body,
        })
        .then(res => {
          console.log(res);
          let arr = data;
          arr[idx] = res.data;
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
          <CreatePost onSubmit={handleCreatePost} />
          <div className="list-title-wrapper">
            <List>
              {data.map((d, idx) => (
                <ListItemUser
                  key={d.id}
                  primaryText={d.title}
                  secondaryText={d.body}
                  onDelete={() => handleDeletePost(d.id, idx)}
                  onUpdate={() => setPost({...d, idx})}
                />
              ))}
            </List>
          </div>
        </div>
        <UpdateContext.Provider value={{ post, setPost }}>
          <UpdatePost
            onUpdate={handleUpdatePost}
            post={{ postTitle: post?.title, postBody: post?.body }}
          />
        </UpdateContext.Provider>
    </div>
  );
}

export default App;
