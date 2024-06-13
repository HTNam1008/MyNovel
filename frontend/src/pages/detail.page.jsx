import React from "react";
import { useParams } from "react-router-dom";
import Detail from "../components/detailPage/detail.component";
import { Container } from "react-bootstrap";
import { useTheme } from "../assets/context/theme.context.js";

function DetailPage() {
  const { id,title } = useParams();

 // ----- Theme -----
 const { theme } = useTheme();
 // ----- Theme End -----
  return (
    <div style={{ backgroundColor: theme === "dark" ? "#1D3557" : "#E3F4F4" }}>
      <Container >
        {" "}
        {/* Container để căn giữa homepage */}

        <Detail id={id} title={title} />
      </Container>
    </div>
  );
}

export default DetailPage;
