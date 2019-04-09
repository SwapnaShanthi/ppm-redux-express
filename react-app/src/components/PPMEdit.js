import React, { Component } from "react";
import { connect } from 'react-redux';
import { Link } from "react-router-dom";
import axios from 'axios';
import { setProductList} from '../redux.js';
import './../style/ppmedit.css'


class PPMCreate extends Component {
    constructor(props) {
      super(props);
      this.state={
                  productid:"",
                  producttitle:"",
                  productprice:"",
                  productimageurl:"",
                  titleerror:"",
                  priceerror:"",
                  error:""
                }
    }
    validation=(name,value)=>{
        if(name==="producttitle"){
          if(value.length<4){
            return false;
          }else{
            return true;
          }
        }else if(name==="productprice"){
          console.log("testd",value);
          if(parseInt(value)>0){
            return true;
          }else{
            return false;
          }
        }
  
  
      }
      handleChange=(e)=>{
         if(e.target.name==="producttitle"){
  
            this.setState({[e.target.name]:e.target.value})
  
            if(!this.validation(e.target.name,e.target.value)){
                
                this.setState({titleerror:"Title requires minimum 4 characters"})
            }else{
              this.setState({titleerror:"",error:""})
            }
         }else if(e.target.name==="productprice"){
  
            this.setState({[e.target.name]:parseInt(e.target.value)})
  
            if(!this.validation(e.target.name,parseInt(e.target.value))&& e.target.name==="productprice"){
              
              this.setState({priceerror:"Price is required"});
            }else{
              this.setState({priceerror:"",error:""})
            }
         }else{
            this.setState({[e.target.name]:e.target.value});
            
         }
      }
    getEditedProduct=()=>{
        axios.get(`http://localhost:5000/getproduct/${this.props.match.params.id}`)
             .then((response) => {
            
            
               console.log("product",response.data.data.id);
               this.setState({productid:response.data.data.id,
                              producttitle:response.data.data.productdetails.title,
                              productprice:response.data.data.productdetails.price,
                              productimageurl:response.data.data.productdetails.imageurl});
                this.setState({error:"",titleerror:"",priceerror:""})
            
             })
             .catch((error) => {
                console.log(error);
                this.setState({error:"Server connection failed"});
             });


    }
    componentDidMount(){
      this.getEditedProduct();
    }
    updateProduct=()=>{
        console.log("updating")
        let updatedproduct={ id:this.state.productid,
                              productdetails:{
                                                title:this.state.producttitle,
                                                price:this.state.productprice,
                                                imageurl:this.state.productimageurl
                                             }

        }
        axios.post(`http://localhost:5000/updateproduct/`,{updatedproduct})
             .then((response) => {
            
                console.log("updated the product",response.data);
                this.setState({error:"",titleerror:"",priceerror:""})
                this.props.getProductList();
            
             })
             .catch((error) => {
                 this.setState({error:"Server connection failed"});
             });

    }
    render() {
        const displayUpdateButton=()=>{
            console.log(this.state.priceerror,this.state.titleerror)
            if(this.state.producttitle !=="" && this.state.productprice!=="" && this.state.priceerror ==="" && this.state.titleerror ===""){
              
              return <div className="updatebuttondiv"><Link  className="updatebutton" onClick={()=>{this.updateProduct()}} to={`/productlist`}>Update</Link></div>
                 
             }else{
               
              return  <div className="updatebuttondiv"><Link  className="updatedisablebutton" onClick={()=>{this.updateProduct()}} to={`/productlist`}>Update</Link></div>
             
            }
        }
        const displayTitleError=()=>{
            if(this.state.titleerror!==""){
              return  <span className="errormessage">{this.state.titleerror}</span>
            }
        }
        const displayPriceError=()=>{
            if(this.state.priceerror!==""){
              return  <span className="errormessage">{this.state.priceerror}</span>
            }
        }
       
      return (
        <div className="editouterdiv">
        <h2>Edit Product</h2> 
        
        <div className="editinnerdiv" >
              <div className="editinputdiv"><span className="requiredfield">*</span>Tile  <input className="editinputboxtitle" type="text" name="producttitle" onChange={this.handleChange} value={this.state.producttitle}/>{displayTitleError()}</div>
              <div className="editinputdiv"><span className="requiredfield">*</span>Price <input className="editinputboxprice" type="number" name="productprice" onChange={this.handleChange} value={this.state.productprice}/>{displayPriceError()}</div>
              <div className="editinputdiv"><span className="requiredfield"></span>Image URL  <input className="editinputboxurl" type="text" name="productimageurl" onChange={this.handleChange} value={this.state.productimageurl}/></div>
             {displayUpdateButton()}
              <div className="deletebuttondiv"><Link  className="deletebutton" onClick={()=>{this.props.deleteProduct(this.state.productid)}} to={`/productlist`}>Delete</Link></div>
        </div>
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
  )(PPMCreate);