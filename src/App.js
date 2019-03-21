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
        <User
          username={this.props.user.name}
          age={this.props.user.age}
          salary={this.props.emp.value}
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
    }
  };
};

export default connect(
  mapStatetoProps,
  mapDispatchtoProps
)(App);
