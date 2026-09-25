import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import "../styles/header.css";

function Header() {

    const location = useLocation();

    return (
        <header id="main-header">
            <nav className="nav-element-bar">

                <ol className="nav-leftside">
                    {location.pathname !== "/" && (
                        <li className="nav-element">
                            <Link to="/">HOME</Link>
                        </li>
                    )}

                    {location.pathname !== "/blog" && (
                        <li className="nav-element">
                            <Link to="/blog">BLOGS</Link>
                        </li>
                    )}

                    {location.pathname !== "/about" && (
                        <li className="nav-element">
                            <Link to="/about">ABOUT</Link>
                        </li>
                    )}
                </ol>

                <ol className="nav-rightside">
                    <li className="nav-element">
                        <a id="login">LOG IN</a>
                    </li>

                    <li className="nav-element">
                        <a id="register">REGISTER</a>
                    </li>

                    {location.pathname !== "/admin" && (
                        <li className="nav-element">
                            <Link to="/admin">Admin</Link>
                        </li>
                    )}
                </ol>

            </nav>
        </header>
    );
}

export default Header;