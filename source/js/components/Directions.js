import React, { Component } from 'react'


class Directions extends Component {

  render() {
    if (this.props.directions) {
      return (
        <ul>
          {
            this.props.directions.map((direction, index) => {
              return (
                <li key={index}>{direction}</li>
              )
            })
          }
        </ul>
      )
    }
    return null;
  }

}


export default Directions
