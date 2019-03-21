import React, { Component } from "react";
import { connect } from "react-redux";
import { addTodo, editTodo } from "../actions/actionCreator";

class CreateTodo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      todotext: "",
      tempEditID: "",
      tempEditText: "",
      tempEdit: {}
    };
    this.onChangeTodoText = this.onChangeTodoText.bind(this);
  }
  componentDidUpdate(prevProps) {
    //console.log("componentWillReceiveProps", this.props);
    if (prevProps.textEditValue !== this.props.textEditValue) {
      this.onChangeTodo(this.props.textEditValue);
    }
  }

  onChangeTodoText(event) {
    this.setState({
      todotext: event.target.value
    });
    this.setState({
      tempEdit: { id: this.state.tempEditID, text: this.state.todotext }
    });
  }

  onChangeTodo = value => {
    this.setState({
      todotext: value.text,
      tempEditID: value.id,
      tempEditText: value.text
    });
  };

  render() {
    return (
      <div className="form-group row test-class-todo">
        <div className="col-sm-10">
          <input
            onChange={this.onChangeTodoText}
            value={this.state.todotext}
            type="text"
            className="form-control"
            id="inputEmail3"
            placeholder="add todo here..."
          />
          <button
            type="button"
            onClick={() => this.setState({ todotext: "" })}
            style={{ marginTop: "25px", marginRight: "15px" }}
            className="btn btn-danger"
          >
            Cancel
          </button>
          {this.props.textEditValue ? (
            <button
              type="button"
              onClick={() => {
                this.props.textEditValue
                  ? this.props.editTodo(this.state.tempEdit)
                  : this.props.addTodo(this.state.todotext);

                this.setState({ todotext: "" });
              }}
              style={{ marginTop: "25px" }}
              className="btn btn-success"
            >
              SAVE EDIT
            </button>
          ) : (
            <button
              type="button"
              onClick={() => {
                this.props.addTodo(this.state.todotext);
                this.setState({ todotext: "" });
              }}
              style={{ marginTop: "25px" }}
              className="btn btn-success"
            >
              ADD TODO
            </button>
          )}
        </div>
      </div>
    );
  }
}
const mapStateToProps = state => {
  return state;
};

const mapDispatchToProps = {
  addTodo,
  editTodo
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CreateTodo);
