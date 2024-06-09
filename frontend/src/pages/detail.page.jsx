import React from "react";
import { useParams } from "react-router-dom";
import Detail from "../components/detailPage/detail.component";
import { Container } from "react-bootstrap";

function DetailPage() {
  const { id } = useParams();
//   console.log("Search query 2:", id);
  return (
    <div style={{ backgroundColor: "#1D3557" }}>
      <Container className="d-flex justify-content-center">
        {" "}
        {/* Container để căn giữa homepage */}

        <Detail id={id} />
      </Container>
    </div>
  );
}

export default DetailPage;
