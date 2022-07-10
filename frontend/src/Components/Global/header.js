import { useState, useEffect } from "react";
import axios from "axios";
import constants from "../../utils/constants";
import { useNavigate  , Link } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate ();
  const [userData, setUserData] = useState("");
  useEffect(() => {
    const localData = localStorage.getItem("token") ?? "";
    setUserData(localData);
  }, [userData]);

  const logoutHandler = () => {
    try {
      axios
        .delete(`${constants.API_URL}/auth/logout`)
        .then((res) => {
          localStorage.removeItem("token");
          alert(JSON.stringify(res.data?.message));
          navigate("/");
          setUserData("");
        })
        .catch((e) => {
          if (e.response) {
            alert(e.response?.data?.message ?? "Something went wrong");
          }
        });
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container-fluid">
          <a className="navbar-brand" href="#">
            Practical
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              {userData && userData !== "" ? (
                <li className="nav-item">
                  <Link
                    to="/dashboard"
                    className="nav-link active"
                    aria-current="page"
                  >
                    Dashboard
                  </Link>
                </li>
              ) : (
                <li className="nav-item">
                  <Link to="/" className="nav-link">
                    Home
                  </Link>
                </li>
              )}
            </ul>
            <div className="d-flex">
              {userData && userData !== "" ? (
                <a
                  href="/"
                  className="nav-link"
                  onClick={(e) => {
                    e.preventDefault();
                    logoutHandler();
                  }}
                >
                  Logout
                </a>
              ) : (
                <Link to="/login" className="nav-link">
                  Login
                </Link>
              )}
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Header;
