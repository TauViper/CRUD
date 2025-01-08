import React from "react";
import { Link } from "react-router-dom";
import "./Common.css";
export default function Header() {
  return (
    <div>
      <nav className="navbar navbar-expand-sm navbar-dark bg-secondary">
        <div className="container-fluid">

            <ul className="navbar-nav">
              <li className="nav-item">
                <Link className="nav-link" to="/">
                  Создвть новость
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="show-news">
                  Показать новости
                </Link>
              </li>
            </ul>

        </div>
      </nav>
    </div>
  );
}
