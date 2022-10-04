import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import userDataContext from './contexts/userDataContext';

export default function AppRoutes() {
  const [userData, setUserData] = useState();

  return (
    <userDataContext.Provider value={{ userData, setUserData }}>
      <Router>
        <Routes>
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/home" element={<Home />} />
        </Routes>
      </Router>
    </userDataContext.Provider>
  );
}
