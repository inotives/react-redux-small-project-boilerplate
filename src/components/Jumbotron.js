import React from 'react';

export default class extends React.Component {
  render() {
    <div className="jumbotron">
      <h1>{this.props.pageTitle} </h1>
      <p>{this.props.pageDescr}</p>
    </div>
  }
}
