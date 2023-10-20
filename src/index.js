import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import HelloWorld from './HelloWorld';
import {
    createBrowserRouter,
    RouterProvider,
  } from "react-router-dom";
import EditPage from './EditPage';
import { BrowserRouter } from 'react-router-dom'

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
     <App />
  </React.StrictMode>
);
// const router = createBrowserRouter([
//     {
//         path: "edit/:id",
//         element: <EditPage/>,
//       },
//       {
//         path: "/",
//         element: <HelloWorld/>,
//       },
//   ]);
  
//   ReactDOM.createRoot(document.getElementById("root")).render(
//     <React.StrictMode>
//          <BrowserRouter>
//       <App router={router} />
//   </BrowserRouter>
//     </React.StrictMode>
//   );  
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
