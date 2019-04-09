import React, { Component } from "react";
import { connect } from 'react-redux';
import { Link } from "react-router-dom";
import axios from 'axios';

import './../style/ppmhome.css'


class PPMHome extends Component {
    constructor(props) {
      super(props);
      this.state={
                }
    }
    render() {
      return (
        <div  className="homeouterdiv">
            <h2>Home Page </h2>
            <p>Welcome to the Project Product Management.Here we can manage a set of products. You are able to  create new products, remove old products and edit products</p>
    
        </div>
      );
    }
  }
  const mapStateToProps = (state) => ({
    productList:state.productList
  })
  
  const mapDispatchToProps = (dispatch) => ({
    //setProductList: (payload) => dispatch(setProductList(payload)),
  })
  
  export default connect(
    mapStateToProps,
    mapDispatchToProps
  )(PPMHome);