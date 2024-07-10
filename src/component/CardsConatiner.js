import React from "react";
import { Col, Row } from "rsuite";
import Card from "./Cards";
import { useTagContext } from "rsuite/esm/InputPicker/InputPickerContext";

const CardsConatiner = ({ data }) => {
  const { loading } = useTagContext();
  return (
    <div
      style={{
        display: "flex",
        height: "100vh",
        flexWrap: "wrap",
        justifyContent: "center",
      }}
    >
      {loading ? (
        "Loding"
      ) : data?.length > 0 ? (
        data?.map((item, index) => {
          return (
            <Col md={6} sm={12} style={{ margin: "10px" }} key={index}>
              <Card item={item} />
            </Col>
          );
        })
      ) : (
        <div
          style={{
            display: "grid",
            placeItems: "center",
            height: "400px",
            width: "100%",
          }}
        >
          No Data Found
        </div>
      )}
    </div>
  );
};

export default CardsConatiner;
