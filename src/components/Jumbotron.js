import React from 'react';

export default class extends React.Component {
  render() {
    return (
      <div className="jumbotron">
        <h1>{this.props.pageTitle} </h1>
        <p>{this.props.pageDescr}</p>
      </div>
    )
  }
}
