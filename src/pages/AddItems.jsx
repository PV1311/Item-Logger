import Heading from "../ui/Heading";
import Row from "../ui/Row";
import AddItemForm from "../items/AddItemForm";

function AddItems() {
  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">Add Items</Heading>
      </Row>

      <Row>
        <AddItemForm />
      </Row>
    </>
  );
}

export default AddItems;
