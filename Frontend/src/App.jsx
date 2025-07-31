import {
  BrowserRouter as Router,
  Routes,
  Route,
} from 'react-router-dom';
import Login from './assets/Pages/Login';
import Signup from './assets/Pages/Signup';
import ProfileCreate from './assets/Pages/ProfileCreate';
import Home from './assets/Pages/Home';
import ViewProfile from './assets/Pages/ViewProfile';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login/>} />
        <Route path="/signup" element={<Signup/>} />
        <Route path="/createProfile" element={<ProfileCreate/>} />
        <Route path="/" element={<Home/>} />
        <Route path="/viewProfile/:id" element={<ViewProfile/>} />
      </Routes>
    </Router>
  );
}

export default App;
