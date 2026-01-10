
import { Link, BrowserRouter, Route, Routes } from 'react-router-dom';
import SignUp from './pages/SignUp.jsx';
import SignIn from './pages/SignIn.jsx';
import Home from './pages/Home.jsx';
import Navigation from './components/Navigation.jsx';
import PageNotFound from './pages/PageNotFound.jsx';

function App() {

  return (
      <BrowserRouter>

        <Navigation />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/*" element={<PageNotFound />} />
        </Routes>
      </BrowserRouter>
  )
}

export default App
