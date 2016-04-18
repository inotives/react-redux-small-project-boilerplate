import React from 'react';
import { connect } from 'react-redux'
import { Link } from 'react-router';

class NavBar extends React.Component {
  renderLinks() {
      return this.props.navLinks.map( (navLink) => {
        return (
          <li key={navLink.path} className="page-scroll"> <Link to={navLink.path} >{navLink.text}</Link> </li>
        )
      })
  }

  render(){
    if(!this.props.navLinks) return console.log('render...')
    console.log(this.props.navLinks)
    return (
      <nav className="navbar navbar-default">
          <div className="container">
              <div className="navbar-header page-scroll">
                  <button type="button" className="navbar-toggle" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1">
                      <span className="sr-only">Toggle navigation</span>
                      <span className="icon-bar"></span>
                      <span className="icon-bar"></span>
                      <span className="icon-bar"></span>
                  </button>
                  <a className="navbar-brand" href="#page-top">Start Bootstrap</a>
              </div>

              <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
                  <ul className="nav navbar-nav navbar-right">
                      {this.renderLinks()}
                  </ul>
              </div>
          </div>
      </nav>
    )

  }
}

function mapStateToProps(state) {
  // whatever return here will show up as props
  return {
    navLinks: state.navLinks
  }
}

export default connect(mapStateToProps)(NavBar);
