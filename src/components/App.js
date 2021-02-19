import React, { Component } from "react";
import CardList from "./CardList";
import { connect } from "react-redux";
import CardActionButton from "./CardActionButton";
import { DragDropContext } from "react-beautiful-dnd";
import { sort } from "../actions";

class App extends Component {
  onDragEnd = (result) => {
    const { destination, source, draggableId } = result;

    if (!destination) {
      return;
    }

    this.props.dispatch(
      sort(
        source.droppableId,
        destination.droppableId,
        source.index,
        destination.index,
        draggableId
      )
    );
  };

  render() {
    const { lists } = this.props;

    return (
      <DragDropContext onDragEnd={this.onDragEnd}>
        <div>
          <h1>Progress Board</h1>
          <div style={style.listsContainer}>
            {lists.map((list) => (
              <CardList
                listID={list.id}
                key={list.id}
                title={list.title}
                cards={list.cards}
              />
            ))}
            <CardActionButton list />
          </div>
        </div>
      </DragDropContext>
    );
  }
}

const style = {
  listsContainer: {
    display: "flex",
    flexDirection: "row",
  },
};

const mapStateToProps = (state) => ({
  lists: state.lists,
});

export default connect(mapStateToProps)(App);
