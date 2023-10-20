import logo from './logo.svg';
import { BrowserRouter, Route, Switch, Link, NavLink, Routes } from 'react-router-dom';
import './App.css';
import HelloWorld from './HelloWorld';
import EditPage from './EditPage';

// function App() {
//   return (
//     <HelloWorld/>
//   );
// }

const App = () => (
  <BrowserRouter>
    <div>
      <Routes>
        <Route path="/" element={<HelloWorld/>} exact={true} />
        <Route path="/edit/:id" element={<EditPage/>} />
      </Routes>
    </div>
  </BrowserRouter>
);

export default App;
