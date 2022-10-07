import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import userDataContext from './contexts/userDataContext';
import CreateList from './pages/CreateList';
import ListPage from './pages/ListPage';

export default function AppRoutes() {
  const [userData, setUserData] = useState();

  return (
    <userDataContext.Provider value={{ userData, setUserData }}>
      <Router>
        <Routes>
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/home" element={<Home />} />
          <Route path="/createlist" element={<CreateList />} />
          <Route path='/lists/:listId' element={<ListPage />} />
        </Routes>
      </Router>
    </userDataContext.Provider>
  );
}
