import { BrowserRouter, Route, Routes } from 'react-router-dom';
import SignUp from './pages/SignUp.jsx';
import SignIn from './pages/SignIn.jsx';
import Home from './pages/Home.jsx';
import NavigationBar from './components/NavigationBar.jsx';
import PageNotFound from './pages/PageNotFound.jsx';
import SavedList from './pages/SavedList.jsx';
import RegisterSuccess from './pages/RegisterSuccess.jsx';
import CreateJoke from './pages/CreateJoke.jsx';
import MyJokes from './pages/MyJoke.jsx';
import ProtectedPageRouter from './components/ProtectedPageRouter.jsx';
import "./App.css";


function App() {



  return (
      <BrowserRouter>

        <NavigationBar />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />

          <Route element= {<ProtectedPageRouter />} >
              <Route path="/signup/success" element={ <RegisterSuccess />} />
              <Route path="/create" element={ <CreateJoke /> } /> 
              <Route path="/savedlist" element={ <SavedList /> } />
              <Route path="/myjokes" element={ <MyJokes /> } />
          </Route>
          
          <Route path="/*" element={<PageNotFound />} />

        </Routes>
      </BrowserRouter>
  )
}

export default App
