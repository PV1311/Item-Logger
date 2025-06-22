// import styled from "styled-components";
import Heading from "../ui/Heading";
import Row from "../ui/Row";
import ItemsList from "../items/ItemsList";

function PageItems() {
  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">All Items</Heading>
      </Row>

      <Row>
        <ItemsList />
      </Row>
    </>
  );
}

export default PageItems;
