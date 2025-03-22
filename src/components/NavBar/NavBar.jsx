import React, { useContext } from "react";
import { Link, NavLink } from "react-router-dom";  
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { useSelector } from "react-redux";
import "bootstrap-icons/font/bootstrap-icons.css"; 
import Favorites from "../Favorites/Favorites";
import { tokenContext } from "../../Context/tokenContext";
import { signOut } from "../../services/auth";
import toast from "react-hot-toast";

function NavBar() {

  const {isAuth,setIsAuth}=useContext(tokenContext)

  console.log(isAuth)
  const favorites = useSelector((state) => state.favorites.favorites);
  const favoritesCount = favorites.length;

  return (
    <>
      <Navbar bg="primary" data-bs-theme="dark">
        <Container>
          <Nav className="me-auto">
            {/* <NavLink to="/" className="nav-link"> Home </NavLink> */}
            <NavLink 
  to={isAuth ? "/movies/1" : "#"} 
  className="nav-link" 
  onClick={(e) => {
    if (!isAuth) {
      e.preventDefault(); 
      toast('Please login First', { icon: '😒' });
    }
  }}
> 
  Movies 
</NavLink>

            {isAuth?      <NavLink onClick={()=>{
              localStorage.removeItem("user")
              setIsAuth(false)
              signOut()
              toast.success('Logout Successfuly')
            }} to="/login" className="nav-link"> LogOut </NavLink>:<>
            
            <NavLink to="/login" className="nav-link"> Login </NavLink>
            <NavLink to="/register" className="nav-link"> Register </NavLink>
            </>}
            <NavLink to="/favorite" className="nav-link"> Favoirtes </NavLink>
          </Nav>

         
          <Link to="/favorite" className="btn position-relative">
            <i 
              className="bi bi-heart-fill" 
              style={{ 
                fontSize: "1.8rem", 
                color: favoritesCount > 0 ? "red" : "gray" 
              }}
            ></i>
            {favoritesCount > 0 && (
              <span 
                className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger"
                style={{ fontSize: "0.8rem", padding: "2px 3px" }}
              >
                {favoritesCount}
              </span>
            )}
          </Link>

        </Container>
      </Navbar>
    </>
  );
}

export default NavBar;
