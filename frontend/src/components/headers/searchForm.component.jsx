import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

function SearchForm() {
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  const handleSearch = () => {
    navigate(`/search/${searchQuery}?page=${1}`);
  };

  const handleInputChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    handleSearch();
  };

  return (
    <Form
      className="d-flex custom-placeholder"
      style={{ width: "25%", paddingRight: "40px", backgroundColor: "transparent" }}
      onSubmit={handleSubmit}
    >
      <Form.Control
        type="search"
        placeholder="Nhập tên truyện, tác giả, thể loại.."
        className="me-2 w-100"
        aria-label="Search"
        value={searchQuery}
        onChange={handleInputChange}
        style={{
          border: "1px solid white",
          borderRadius: "20px",
          padding: "10px",
          backgroundColor: "transparent",
          color: "white",
        }}
      />
      <Button
        variant="outline-success"
        onClick={handleSearch}
        style={{ borderRadius: "20px", border: "1px solid white" }}
      >
        <img
          src={`${process.env.PUBLIC_URL}/images/search.png`}
          alt="Search"
          style={{ width: "30px", height: "30px", color: "white" }}
        />
      </Button>
    </Form>
  );
}

export default SearchForm;
