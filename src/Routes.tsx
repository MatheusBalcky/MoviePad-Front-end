import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SignIn from './pages/signIn';
import SignUp from './pages/signUp';

export default function AppRoutes() {
  return (
    <Router>
      <Routes>
        <Route path="/signin" element={<SignIn/>} />
        <Route path="/signup" element={<SignUp/>} />
      </Routes>
    </Router>
  );
}
