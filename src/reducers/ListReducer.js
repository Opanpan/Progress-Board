import { CONSTANTS } from "../actions";

let listID = 4;
let cardID = 10;

const initialState = [
  {
    title: "To Do",
    id: `list-${1}`,
    cards: [
      {
        id: `card-${2}`,
        text: "Study",
      },
      {
        id: `card-${3}`,
        text: "Learning",
      },
    ],
  },

  {
    title: "Progress",
    id: `list-${2}`,
    cards: [
      {
        id: `card-${4}`,
        text: "Current",
      },
      {
        id: `card-${5}`,
        text: "Half-Way",
      },
      {
        id: `card-${6}`,
        text: "Almost",
      },
    ],
  },

  {
    title: "Done",
    id: `list-${3}`,
    cards: [
      {
        id: `card-${7}`,
        text: "Not yet",
      },
      {
        id: `card-${8}`,
        text: "Second Day",
      },
      {
        id: `card-${9}`,
        text: "Third Day",
      },
    ],
  },
];

const ListReducer = (state = initialState, action) => {
  switch (action.type) {
    case CONSTANTS.ADD_LIST:
      const newList = {
        title: action.payload,
        cards: [],
        id: `list-${listID}`,
      };
      listID += 1;
      return [...state, newList];

    case CONSTANTS.ADD_CARD: {
      const newCard = {
        text: action.payload.text,
        id: `card-${cardID}`,
      };
      cardID += 1;

      const newState = state.map((list) => {
        if (list.id === action.payload.listID) {
          return {
            ...list,
            cards: [...list.cards, newCard],
          };
        } else {
          return list;
        }
      });
      return newState;
    }

    case CONSTANTS.DRAG_HAPPENED:
      const {
        droppableIdStart,
        droppableIdEnd,
        droppableIndexStart,
        droppableIndexEnd,
        draggableId,
      } = action.payload;

      const newState = [...state];

      // Same Place
      if (droppableIdStart === droppableIdEnd) {
        const list = state.find((list) => droppableIdStart === list.id);
        const card = list.cards.splice(droppableIndexStart, 1);
        list.cards.splice(droppableIndexEnd, 0, ...card);
      }

      // Other Place
      if (droppableIdStart !== droppableIdEnd) {
        // Find the place where drag happened
        const listStart = state.find((list) => droppableIdStart === list.id);

        // pull out the card from this list
        const card = listStart.cards.splice(droppableIndexStart, 1);

        //Find The the place where drag end
        const listEnd = state.find((list) => droppableIdEnd === list.id);

        //Put the card in the new list {
        listEnd.cards.splice(droppableIndexEnd, 0, ...card);
      }

      return newState;

    default:
      return state;
  }
};

export default ListReducer;
