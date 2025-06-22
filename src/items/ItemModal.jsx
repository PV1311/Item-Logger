import styled from "styled-components";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getItemImages } from "../services/apiItems";
import { HiChevronLeft, HiChevronRight } from "react-icons/hi";

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.6);
  z-index: 1000;
`;

const Modal = styled.div`
  background: rgb(255, 255, 255);
  box-shadow: 3px 3px 15px rgba(255, 254, 254, 0.39);
  border-radius: var(--border-radius-md);
  padding: 1rem 2rem;
  max-width: 70rem;
  width: 90vw;
  min-height: 44rem; /* Ensures enough height for flex to work */
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 1001;
  display: flex;
  flex-direction: column;
`;

const ModalContent = styled.div`
  flex: 1 1 auto;
  display: flex;
  flex-direction: column;
`;

const CarouselWrapper = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 1rem;
  margin-top: 1rem;
`;

const Img = styled.img`
  width: 400px;
  height: 307px;
  object-fit: cover;
  border-radius: var(--border-radius-sm);
`;

const ArrowButton = styled.button`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background: rgba(255, 255, 255, 0.7);
  border: none;
  border-radius: 50%;
  padding: 0.5rem;
  cursor: pointer;
  z-index: 2;
  &:hover {
    background: #eee;
  }
`;

const LeftArrow = styled(ArrowButton)`
  background-color: rgb(148, 148, 148);
  left: 0;

  &:hover {
    background-color: rgb(171, 171, 171);
  }
`;

const RightArrow = styled(ArrowButton)`
  background-color: rgb(148, 148, 148);
  right: 0;

  &:hover {
    background-color: rgb(171, 171, 171);
  }
`;

const Indicators = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 0.5rem;
  gap: 0.5rem;
`;

const Dot = styled.button`
  width: 10px;
  height: 10px;
  border-radius: 50%;
  border: none;
  background: ${({ active }) => (active ? "#6366f1" : "#ccc")};
  cursor: pointer;
`;

const ButtonRow = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: auto;
`;

const Button = styled.button`
  background: var(--color-brand-600);
  color: white;
  padding: 0.6rem 1.4rem;
  border: none;
  border-radius: var(--border-radius-sm);
  cursor: pointer;
`;

function ItemModal({ item, onClose }) {
  const { data: images } = useQuery({
    queryKey: ["images", item.id],
    queryFn: () => getItemImages(item.id),
  });

  // Combine cover image and gallery images
  const allImages = [
    { id: "cover", url: item.coverImage },
    ...(images?.map((img) => ({ id: img.id, url: img.imageUrl })) || []),
  ];

  const [current, setCurrent] = useState(0);

  const goToPrev = () =>
    setCurrent((prev) => (prev === 0 ? allImages.length - 1 : prev - 1));
  const goToNext = () =>
    setCurrent((prev) => (prev === allImages.length - 1 ? 0 : prev + 1));
  const goToIndex = (idx) => setCurrent(idx);

  return (
    <Overlay onClick={onClose}>
      <Modal onClick={(e) => e.stopPropagation()}>
        <ModalContent>
          {/* Item details */}
          <h2 style={{ textAlign: "center" }}>{item.name}</h2>
          <h4 style={{ textAlign: "center" }}>{item.type}</h4>
          <p style={{ textAlign: "center" }}>{item.description}</p>

          {/* Carousel */}
          <CarouselWrapper>
            {allImages.length > 1 && (
              <>
                <LeftArrow onClick={goToPrev} aria-label="Previous image">
                  <HiChevronLeft size={28} />
                </LeftArrow>
                <RightArrow onClick={goToNext} aria-label="Next image">
                  <HiChevronRight size={28} />
                </RightArrow>
              </>
            )}
            <Img
              src={allImages[current].url}
              alt={`Item image ${current + 1}`}
            />
            <Indicators>
              {allImages.map((img, idx) => (
                <Dot
                  key={img.id}
                  active={idx === current}
                  onClick={() => goToIndex(idx)}
                  aria-label={`Go to image ${idx + 1}`}
                />
              ))}
            </Indicators>
          </CarouselWrapper>

          <ButtonRow>
            <Button onClick={() => alert("Enquiry triggered!")}>Enquire</Button>
          </ButtonRow>
        </ModalContent>
      </Modal>
    </Overlay>
  );
}

export default ItemModal;
