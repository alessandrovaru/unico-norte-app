import * as React from "react";
import { Link } from "gatsby";

import logo from "../../img/logoWhite.png";
import { FaTwitter, FaFacebook, FaYoutube, FaLinkedin } from 'react-icons/fa';
import './styles.sass'

const Footer = class extends React.Component {
  render() {
    return (
      <footer className="footer has-background-black has-text-white-ter">
        <div className="content has-text-centered">
          <img
            src={logo}
            alt="Único Norte"
          />
        </div>
        <div className="content has-text-centered has-background-black has-text-white-ter">
          <div className="container has-background-black has-text-white-ter">
            <div style={{ maxWidth: "100vw" }} className="columns">
              <div className="column is-12">
                <section className="menu">
                  <ul className="menu-list">
                    <li>
                      <Link to="/" className="navbar-item">
                        Home
                      </Link>
                    </li>
                    <li>
                      <Link className="navbar-item" to="/about">
                        ¿Quiénes somos?
                      </Link>
                    </li>
                    <li>
                      <Link className="navbar-item" to="/portfolio">
                        Porfolio
                      </Link>
                    </li>
                    <li>
                      <a
                        className="navbar-item"
                        href="/admin/"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Admin
                      </a>
                    </li>
                    {/* <li>
                      <Link className="navbar-item" to="/products">
                        Products
                      </Link>
                    </li>
                    <li>
                      <Link className="navbar-item" to="/contact/examples">
                        Form Examples
                      </Link>
                    </li>
                    <li>
                      <a
                        className="navbar-item"
                        href="/admin/"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Admin
                      </a>
                    </li> */}
                  </ul>
                </section>
              </div>            
            </div>
            <div style={{ maxWidth: "100vw" }} className="columns is-centered">
                <div className="column is-4 social">
                  <a title="instagram" href="https://instagram.com/uniconorte">
                    <FaFacebook />
                  </a>
                  <a title="instagram" href="https://instagram.com/uniconorte">
                    <FaTwitter />
                  </a>
                  <a title="instagram" href="https://instagram.com/uniconorte">
                    <FaYoutube />
                  </a>
                  <a title="instagram" href="https://instagram.com/uniconorte">
                    <FaLinkedin />
                  </a>
                </div>
              </div>
          </div>
        </div>
      </footer>
    );
  }
};

export default Footer;
