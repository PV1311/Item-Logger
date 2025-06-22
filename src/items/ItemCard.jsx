import { useState } from "react";
import { HiTrash } from "react-icons/hi";
import { toast } from "react-hot-toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteItemAndImages } from "../services/apiItems";
import styled from "styled-components";
import ItemModal from "./ItemModal";

const DeleteButton = styled.button`
  position: absolute;
  bottom: 0.55rem;
  right: 0.75rem;
  background: none;
  border: none;
  border-radius: 50%;
  padding: 0.5rem;
  cursor: pointer;
  z-index: 2;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background 0.3s;

  svg{
    color="#c8c8c8";
    transition: color 0.3s;
  }
  &:hover {
    background: rgb(200, 200, 200);

    svg {
      color: rgb(51, 51, 51);
    }
  }
`;

const Card = styled.div`
  position: relative;
  cursor: pointer;
  padding-bottom: 1rem;
  min-width: 27.5rem;
  // border: 1px solid var(--color-grey-100);
  border-radius: var(--border-radius-md);
  background-color: rgb(51, 51, 51);
  box-shadow: 3px 3px 15px rgba(255, 254, 254, 0.2);
`;

const Img = styled.img`
  width: 100%;
  height: 200px;
  object-fit: cover;
  border-top-left-radius: var(--border-radius-md);
  border-top-right-radius: var(--border-radius-md);
`;

const Title = styled.h3`
  margin-top: 0.8rem;
  font-size: 1.4rem;
  font-weight: 600;
  text-align: center;
`;

function ItemCard({ item }) {
  const [isOpen, setIsOpen] = useState(false);
  const queryClient = useQueryClient();

  const { mutate: handleDelete, isLoading: isDeleting } = useMutation({
    mutationFn: deleteItemAndImages,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["items"] });
      toast.success("Item deleted successfully");
    },
    onError: (err) => toast.error(err.message),
  });

  return (
    <>
      <Card
        onClick={() => !isDeleting && setIsOpen(true)}
        style={{ opacity: isDeleting ? 0.5 : 1 }}
      >
        {/* ...existing content... */}
        <Img src={item.coverImage} alt={item.name} />
        <Title>{item.name}</Title>
        <p style={{ textAlign: "center" }}>{item.type}</p>
        {/* Trash icon button */}
        <DeleteButton
          onClick={(e) => {
            e.stopPropagation();
            handleDelete(item.id);
          }}
          disabled={isDeleting}
          title="Delete item"
        >
          {isDeleting ? "..." : <HiTrash size={19} />}
        </DeleteButton>
      </Card>
      {isOpen && <ItemModal item={item} onClose={() => setIsOpen(false)} />}
    </>
  );
}

export default ItemCard;
