import React, { Fragment, Component } from "react";
import { connect } from "react-redux";
import styled from "styled-components";

const DeleteButton = styled.button.attrs({ children: "X" })`
  color: #f00;
  background: transparent;
  border: none;
  outline: none;
  text-decoration: none;
`;

const UpdateLink = styled.button.attrs({ children: "U" })`
  color: #00f;
  font-weight: bold;
  background: transparent;
  border: none;
  outline: none;
  text-decoration: none;
`;

const UpdateLink2 = styled.button.attrs({ children: "H" })`
  color: #ccc;
  font-weight: bold;
  background: transparent;
  border: none;
  outline: none;
  text-decoration: none;
`;

const EditBox = styled.input`
  display: flex;
  width: 200px;
  height: 50px;
  box-sizing: border-box;
  border-radius: 8px;
  margin: 8px;
  border: 1px solid #ccc;
`;

const UpdateButton = styled.button.attrs({ children: "Save Update" })`
  border-radius: 8px;
  margin: 8px 0px;
  border: 1px solid #c8c8c8;
  background: transparent;
  box-sizing: border-box;
`;

const PingPongValue = styled.span`
  width: 100%;
  height: 50px;
`;

class User extends Component {
  state = {
    index: "",
    message: "",
    count: 0,
    todoText: "",
    todoIndex: ""
  };

  handleChange = event => {
    if (this.state.todoText !== event.target.value) {
      this.setState({
        todoText: event.target.value
      });
      this.props.emp.textEdit = event.target.value;
    }
  };

  handleUpdateItem = () => {
    this.props.updateItem(this.props.emp.indexEdit, this.props.emp.textEdit);
  };

  render() {
    let partners =
      this.props && this.props.salary.length > 0 ? (
        this.props.salary.map((p, index) => (
          <li className="partners" key={index}>
            {p}
            {" Bath"}
            {index}
            <DeleteButton onClick={() => this.props.deleteItem(index)} />
            <UpdateLink onClick={() => this.props.preUpdateItem(index, p)} />
            <UpdateLink2
              onClick={() => this.props.updateItem(index, "Updated")}
            />
          </li>
        ))
      ) : (
        <span />
      );

    return (
      <Fragment>
        <h1>Hello:{this.props.username}</h1>
        <span>Age:{this.props.age}</span>
        <ul>{partners}</ul>

        {this.props.ping.userinfo !== "" ? (
          <span>
            {this.props.ping.userinfo.avatar_url ? (
              <img
                alt="User Avatar"
                src={this.props.ping.userinfo.avatar_url}
              />
            ) : (
              ""
            )}

            {JSON.stringify(this.props.ping.userinfo, null, 2)}
          </span>
        ) : (
          ""
        )}
        <PingPongValue>
          is Pinging: ... {this.props.pingpong.toString()} ...
        </PingPongValue>
        <span>{this.props.pingpong}</span>
        <EditBox onChange={this.handleChange} value={this.props.emp.textEdit} />
        <UpdateButton onClick={this.handleUpdateItem} />
      </Fragment>
    );
  }
}

const mapStatetoProps = state => {
  return state;
};

const mapDispatchtoProps = dispatch => {
  return {
    deleteItem: index => {
      dispatch({
        type: "DELETE",
        payload: index
      });
    },
    updateItem: (index, message) => {
      dispatch({
        type: "EDIT",
        payload: index,
        message: message
      });
    },
    preUpdateItem: (index, message) => {
      dispatch({
        type: "PREEDIT",
        payload: index,
        message: message
      });
    }
  };
};

export default connect(
  mapStatetoProps,
  mapDispatchtoProps
)(User);
