import React, { Component } from "react";
import { connect } from 'react-redux';
import { Link } from "react-router-dom";
import axios from 'axios';
import './../style/ppmproductlist.css';
import { setProductList} from '../redux.js';

class PPMProductList extends Component {
    constructor(props) {
      super(props);
      this.state={
                 error:""
                }
    }
   
    componentDidMount(){
        this.props.getProductList();
    }

    render() {
      const displayProductList=this.props.productList.map((item,index)=>{
          return ( <div className="productlistinnerdiv">
                        <div><img className="imagestyle" src={item.productdetails.imageurl} alt="image" ></img></div>
                        <div className="titlestyle">{item.productdetails.title}</div>
                        <div className="pricestyle">${item.productdetails.price}</div>
                        <div className="editbuttondiv"><Link  className="editbutton" to={`/productedit/${ item.id }`}>Edit</Link></div>
                        <div className="deleteproductbuttondiv"><Link  className="deleteproductbutton" onClick={()=>this.props.deleteProduct(item.id)}to={`/productlist`}>Delete</Link></div>
                    </div>
                  )

      })
      return (
        <div className="productlistouterdiv">
           {displayProductList}
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
  )(PPMProductList);