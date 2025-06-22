import styled from "styled-components";
import { useQuery } from "@tanstack/react-query";
import { getItems } from "../services/apiItems";
import ItemCard from "./ItemCard";

const Container = styled.div`
  min-width: 105rem;
  padding: 4rem 0;
  margin: 0 auto;
  background-color: rgba(255, 255, 255, 0.28);
  border-radius: var(--border-radius-lg);
  box-shadow: 3px 3px 15px rgba(255, 254, 254, 0.24);
`;

const StyledDiv = styled.div`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 5.9rem;

  max-width: 94.3rem;
  margin: 0 auto;
`;

function ItemsList() {
  const { data: items, isLoading } = useQuery({
    queryKey: ["items"],
    queryFn: getItems,
  });

  console.log(items);

  if (isLoading) return <h2 style={{ textAlign: "center" }}>Loading ...</h2>;

  if (items.length === 0)
    return <h2 style={{ textAlign: "center" }}>No items in the list yet</h2>;

  return (
    <Container>
      <StyledDiv>
        {items?.map((item) => (
          <ItemCard key={item.id} item={item} />
        ))}
      </StyledDiv>
    </Container>
  );
}

export default ItemsList;
