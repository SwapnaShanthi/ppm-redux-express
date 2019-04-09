import React, { Component } from "react";
import { connect } from 'react-redux';
import { Link } from "react-router-dom";
import axios from 'axios';
import './../style/ppmcreate.css';
import { setProductList} from '../redux.js';

class PPMCreate extends Component {
    constructor(props) {
      super(props);
      this.state={
                  title:"",
                  price:"",
                  imageurl:"",
                  titleerror:"",
                  priceerror:""
                }
    }
    validation=(name,value)=>{
      if(name==="title"){
        if(value.length<4){
          return false;
        }else{
          return true;
        }
      }else if(name==="price"){
        console.log("testd",value);
        if(parseInt(value)>0){
          return true;
        }else{
          return false;
        }
      }


    }
    handleChange=(e)=>{
       if(e.target.name==="title"){

          this.setState({[e.target.name]:e.target.value})

          if(!this.validation(e.target.name,e.target.value)){
              
              this.setState({titleerror:"Title requires minimum 4 characters"})
          }else{
            this.setState({titleerror:"",error:""})
          }
       }else if(e.target.name==="price"){

          this.setState({[e.target.name]:parseInt(e.target.value)})

          if(!this.validation(e.target.name,parseInt(e.target.value))&& e.target.name==="price"){
            
            this.setState({priceerror:"Price is required"});
          }else{
            this.setState({priceerror:"",error:""})
          }
       }else{
          this.setState({[e.target.name]:e.target.value});
       }
    }
    createProduct=()=>{
      let productdetails={  title:this.state.title,
                            price:this.state.price,
                            imageurl:this.state.imageurl
                      }
      axios.post(`http://localhost:5000/createproduct/`,{productdetails})
           .then((response) => {
              console.log("posted new product",response.data);
              this.props.getProductList();
              this.setState({error:"",titleerror:"",priceerror:""})
                         
            })
            .catch((error) => {
                this.setState({error:"Server connection failed"});
            });  

    }
    render() {
      const displayCreateButton=()=>{
       if(this.state.error==="" && this.state.titleerror==="" && this.state.priceerror===""){

         return <div className="createbuttondiv"><Link  className="createbutton" onClick={this.createProduct}to={`/productlist`}>Create</Link></div> 
            
        }else{
          
         return  <div className="createbuttondiv" ><Link  className="createdisablebutton" onClick={this.createProduct}to={`/productlist`}>Create</Link></div>
        
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
        <div className="createouterdiv">
           <h2>Create a New Product</h2>
           <div className="createinnerdiv">
              <div className="inputdiv">Tile  <input className="inputboxtitle" type="text" name="title" onChange={this.handleChange} value={this.state.title}/>{displayTitleError()}</div>
              <div className="inputdiv">Price <input className="inputboxprice" type="number" name="price" onChange={this.handleChange} value={this.state.price}/>{displayPriceError()}</div>
              <div className="inputdiv">Image URL  <input className="inputboxurl" type="text" name="imageurl" onChange={this.handleChange} value={this.state.imageurl}/></div>
              {displayCreateButton()}
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