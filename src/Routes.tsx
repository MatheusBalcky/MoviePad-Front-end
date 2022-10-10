import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import userDataContext from './contexts/userDataContext';
import CreateList from './pages/CreateList';
import ListPage from './pages/ListPage';
import ContentPage from './pages/ContentPage';
import { ToastContainer } from 'react-toastify';  
import 'react-toastify/dist/ReactToastify.css'; 

export default function AppRoutes() {
  const [userData, setUserData] = useState();

  return (
    <userDataContext.Provider value={{ userData, setUserData }}>
      <Router>
        <ToastContainer/>
        <Routes>
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/home" element={<Home />} />
          <Route path="/createlist" element={<CreateList />} />
          <Route path='/lists/:listId' element={<ListPage />} />
          <Route path='/lists/:listId/content/:contentId' element={<ContentPage />} />
        </Routes>
      </Router>
    </userDataContext.Provider>
  );
}
