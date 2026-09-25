import { Link } from "react-router-dom";

import '../styles/footer.css'

function Footer() {

    return ( 

      <footer id="main-footer">
        <div className="footer-element-bar">
            <ul>
                <li><a href="#">Privacy Policy</a></li>
                <li><a href="#">Terms of Service</a></li>
                <li>Rick in Asia © Copyright 2025. All Rights Reserved</li>
            </ul>
        </div>
      </footer>
    )

}

export default Footer;