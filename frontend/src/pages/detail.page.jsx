import React from "react";
import { useParams } from "react-router-dom";
import Detail from "../components/detailPage/detail.component";
import { Container } from "react-bootstrap";
import { useTheme } from "../assets/context/theme.context.js";

function DetailPage() {
  const { id } = useParams();
 // ----- Theme -----
 const { theme } = useTheme();
 // ----- Theme End -----
  return (
    <div style={{ backgroundColor: theme === "dark" ? "#1D3557" : "#fff" }}>
      <Container className="d-flex justify-content-center">
        {" "}
        {/* Container để căn giữa homepage */}

        <Detail id={id} />
      </Container>
    </div>
  );
}

export default DetailPage;
