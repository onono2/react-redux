import React, { Component } from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import User from "./User";

const Wrapper = styled.div`
  display: flex;
  margin: 16px;
  flex-direction: column;
`;

const EmployeeSalary = styled.input`
  display: flex;
  width: 200px;
  height: 50px;
  box-sizing: border-box;
  border-radius: 8px;
  margin: 8px;
  border: 1px solid #ccc;
`;

const SaveSalary = styled.button.attrs({ children: "Save" })`
  border-radius: 8px;
  margin: 8px;
  padding: 8px;
`;

const ClearHistory = styled.button.attrs({ children: "Clear History" })`
  border-radius: 8px;
  padding: 8px;
  margin: 8px;
`;

const PingButton = styled.button.attrs({ children: "Ping" })`
  border-radius: 8px;
  padding: 8px;
  margin: 8px;
`;

const PongButton = styled.button.attrs({ children: "Pong" })`
  border-radius: 8px;
  padding: 8px;
  margin: 8px;
`;

class App extends Component {
  state = {
    todoInt: 0
  };

  handleChange = event => {
    this.setState({ todoInt: event.target.value });
  };

  render() {
    return (
      <Wrapper>
        <PingButton onClick={this.props.pingButton} />
        <PongButton onClick={this.props.pongButton} />
        <span style={{ color: "#c9c9c9" }}>
          User Time Stamp:{Math.round(new Date().getTime() / 1000)}
        </span>
        <User
          username={this.props.user.name}
          age={this.props.user.age}
          salary={this.props.emp.value}
          pingpong={this.props.ping.isPinging}
        />
        <button
          onClick={() =>
            this.props.setName("Redux Tutorial", 29, "Frontend Developer")
          }
        >
          Change Name
        </button>
        <EmployeeSalary
          onChange={this.handleChange}
          value={this.state.todoInt}
        />
        <SaveSalary onClick={() => this.props.addSalary(this.state.todoInt)} />
        <ClearHistory onClick={() => this.props.resetSalary()} />
      </Wrapper>
    );
  }
}

const mapStatetoProps = state => {
  //console.log(state);
  return state;
};

const mapDispatchtoProps = dispatch => {
  return {
    setName: (name, age, position) => {
      dispatch({
        type: "setName",
        payload: name,
        age: age,
        position: position
      });
    },
    addSalary: value => {
      dispatch({
        type: "ADD",
        payload: value
      });
    },
    resetSalary: () => {
      dispatch({
        type: "SUBTRACT"
      });
    },
    pingButton: () => {
      dispatch({
        type: "PING"
      });
    },
    pongButton: () => {
      dispatch({
        type: "PONGPONG"
      });
    }
  };
};

export default connect(
  mapStatetoProps,
  mapDispatchtoProps
)(App);
