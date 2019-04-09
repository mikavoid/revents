import React, { Component } from 'react'
import { connect } from 'react-redux'

import { testOperations } from 'app/ducks/test'

type Props = {
  counter: number,
  data: number,
  setData: any,
  incrementCounter: any,
  decrementCounter: any
}

class TestComponent extends Component<Props> {
  render() {
    return (
      <div>
        <h1> Test component </h1>
        <p>{this.props.data}</p>
        <p>Counter {this.props.counter}</p>
        <button onClick={() => this.props.setData(Math.floor(Math.random() * 99) + 1)}>Change</button>
        <button onClick={() => this.props.incrementCounter()}>Increment</button>
        <button onClick={() => this.props.decrementCounter()}>Decrement</button>
      </div>
    )
  }
}

function mapStateToProps(state) {
  const { data = 0, counter = 0 } = state.test
  return {
    data,
    counter
  }
}

function mapDispatchToProps(dispatch) {
  return {
    setData: data => dispatch(testOperations.setData(data)),
    incrementCounter: data => dispatch(testOperations.incrementCounter()),
    decrementCounter: data => dispatch(testOperations.decrementCounter())
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TestComponent)
