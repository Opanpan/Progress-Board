import React from "react";
import EachCard from "./EachCard";
import CardActionButton from "./CardActionButton";
import { Droppable } from "react-beautiful-dnd";

const CardList = ({ title, cards, listID }) => {
  console.log(cards);
  return (
    <Droppable droppableId={String(listID)}>
      {(provided) => (
        <div
          {...provided.droppableProps}
          ref={provided.innerRef}
          style={style.container}
        >
          <h3>{title}</h3>
          {cards.map((card, index) => (
            <EachCard
              key={card.id}
              index={index}
              text={card.text}
              id={card.id}
            />
          ))}
          <CardActionButton listID={listID} />
          {provided.placeholder}
        </div>
      )}
    </Droppable>
  );
};

const style = {
  container: {
    backgroundColor: "#ccc",
    borderRadius: 3,
    width: 300,
    height: "100%",
    padding: 8,
    marginRight: 8,
  },
};

export default CardList;
