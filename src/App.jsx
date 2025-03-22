import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";

import NavBar from "./components/NavBar/NavBar";
import Footer from "./components/Footer/Footer";
import RegisterForm from "./components/RegisterForm/RegisterForm";
import LoginForm from "./components/LoginForm/LoginForm";
import Home from "./components/Home/Home";
import NotFound from "./components/NotFound/NotFound";
import MovieCards from "./components/MovieCards/MovieCards";

import Details from "./components/Details/Details";
import { Provider } from "react-redux";
import store from "./components/redux/store";
import Favorites from "./components/Favorites/Favorites";
import { TokenProvider } from "./Context/tokenContext";
import { useState } from "react";
import Guard from "./components/Guard/Guard";
import { Toaster } from "react-hot-toast";
import Main from "./components/Main/Main";



function App() {
  const [isAuth, setIsAuth] = useState(localStorage.getItem("user") ? true : false);

  return (
    <TokenProvider value={{ isAuth, setIsAuth }}>
      <Provider store={store}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Main />}>
              <Route index element={<Home />} />
              <Route
                path="movies/:page"
                element={
                  <Guard>
                    <MovieCards />
                  </Guard>
                }
              />
           
              <Route path="details/:id" element={<Details />} />
              <Route path="favorite" element={<Favorites />} />
              <Route path="login" element={<LoginForm />} />
              <Route path="register" element={<RegisterForm />} />
              <Route path="*" element={<NotFound />} />
              
            </Route>
      
          </Routes>
        </BrowserRouter>
        <Toaster position="top-center" reverseOrder={false} />
      </Provider>
    </TokenProvider>
  );
}

export default App;
