import React from "react";
import { useParams } from "react-router-dom";
import Detail from "../components/detailPage/detail.component";

function DetailPage() {
  const { id } = useParams();
  //   console.log("Search query 2:", id);
  return (
    <Detail id={id} />
  );
}

export default DetailPage;
