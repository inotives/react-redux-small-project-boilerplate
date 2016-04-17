import React from 'react'
import { connect } from 'react-redux'
import { increase, decrease } from '../actions/count'

function Home({ number, increase, decrease }) {
  return (
    <div>

      <div className="container">

      </div>
      <hr/>
      <div className="container">
        <div className="col-md-3 well">
          <button className="btn btn-lg btn-primary" onClick={() => increase(1)}><i className="fa fa-plus"></i></button>
          <span className="well"> {number}</span>
          <button className="btn btn-lg btn-danger" onClick={() => decrease(1)}><i className="fa fa-minus"></i></button>
        </div>
      </div>
    </div>
  )
}

export default connect(
  state => ({ number: state.count.number }),
  { increase, decrease }
)(Home)
