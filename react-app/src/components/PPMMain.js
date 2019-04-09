import React, { Component } from "react";
import { connect } from 'react-redux';
import axios from 'axios';
import { setProductList} from '../redux.js';
import {
    BrowserRouter,
    Route,
    Link,
    Switch,
    Redirect
  } from "react-router-dom";
import PPMHome from "./PPMHome";
import PPMProductList from "./PPMProductList";
import PPMCreate from "./PPMCreate";
import PPMEdit from "./PPMEdit";
import './../style/ppmmain.css';

class PPMMain extends Component {
    constructor(props) {
      super(props);
      this.state={
                }
    }
    deleteProduct=(productid)=>{
        axios.delete(`http://localhost:5000/deleteproduct/${productid}`)
             .then((response) => {
            
                console.log("deleted the product",response.data);
                this.getProductList();
            
             })
             .catch((error) => {
                 this.setState({error:"Server connection failed"});
             });

    }
    getProductList=()=>{
        console.log("calling the getproduct")
        axios.get(`http://localhost:5000/getproductlist/`)
             .then((response) => {
                console.log("productlist",response.data.data);
                this.props.setProductList(response.data.data);
             })
             .catch((error) => {
                 console.log(error);
                 this.setState({error:"Server connection failed"});
             });
    }
    render() {
      return (
        <div className="mainouterdiv" >
            <BrowserRouter>
            <h1>PPM - Project Product Management</h1>
            <div className="naviouterdiv">
                <div className="navibarstyle" ><Link to="/home">Home</Link></div>
                <div className="navibarstyle" ><Link to="/productlist">Product List</Link></div>
                <div className="navibarstyle" ><Link to="/productcreation">Product Creation</Link></div>
            </div>  
            <div className="routerdiv">
               <Switch>
                    <Route exact path="/" render={() => (<Redirect to="/home" /> )} />
                    <Route path="/home" component={PPMHome}/>
                    <Route path="/productlist" render={() => { return <PPMProductList deleteProduct={this.deleteProduct} getProductList={this.getProductList}/>;}}/>
                    <Route path="/productcreation" render={() => { return <PPMCreate  getProductList={this.getProductList}/>;}}/>
                    <Route path="/productedit/:id" render={(props) => { return <PPMEdit {...props} deleteProduct={this.deleteProduct} getProductList={this.getProductList}/>;}}/>
                </Switch>            
            </div>
         
       </BrowserRouter>
      </div>
      );
    }
  }
  
  const mapStateToProps = (state) => ({
    productList:state.productList
  })
  
  const mapDispatchToProps = (dispatch) => ({
    setProductList: (payload) => dispatch(setProductList(payload)),
  })
  
  export default connect(
    mapStateToProps,
    mapDispatchToProps
  )(PPMMain);