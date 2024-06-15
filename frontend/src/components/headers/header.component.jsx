import React, { useState, useEffect } from "react";
import { Navbar, Container } from "react-bootstrap";
import { useTheme } from "../../assets/context/theme.context.js";
import { useServer } from "../../assets/context/server.context.js";

import NavBar from "./navbar.component.jsx";
import SearchForm from "./searchForm.component.jsx";

import "../../assets/styles/style.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "../../App.css";

const TITLE = "My Novel";

function Header() {
  const { theme } = useTheme();
  const { selectedServer, setSelectedServer } = useServer();
  const [headerBg, setHeaderBg] = useState(
    "linear-gradient(180deg, rgba(18, 18, 20, .68), transparent)"
  );

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const windowHeight = window.innerHeight;
      const headerHeight = 0.55 * windowHeight;

      if (scrollPosition > headerHeight) {
        setHeaderBg("linear-gradient(0, rgba(18, 18, 20, .68), transparent)");
      } else {
        setHeaderBg(
          "linear-gradient(180deg, rgba(18, 18, 20, .68), transparent)"
        );
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div
      style={{
        position: "fixed",
        top: "0",
        left: "0",
        width: "100%",
        background: headerBg,
        zIndex: "1000",
        transition: "background 0.3s ease",
      }}
    >
      <Navbar expand="md" style={{ padding: "0px", height: "80px" }}>
        <Container fluid>
          <Navbar.Brand href="/">
            <img
              src={`${process.env.PUBLIC_URL}/images/logo.png`}
              alt={TITLE}
              style={{ width: "80px", height: "80px", backgroundColor: "transparent" }}
            />{" "}
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll">
            <NavBar theme={theme} selectedServer={selectedServer} setSelectedServer={setSelectedServer} />
            <SearchForm />
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
}

export default Header;


