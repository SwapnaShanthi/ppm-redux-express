const express = require( 'express');
const app=express();
var bodyParser = require('body-parser');
app.use(bodyParser.json());
const axios = require( 'axios');

app.use(express.static("./../react-app/build/")); 

app.post("/createproduct/",(request, response)=>{
    axios.post(`http://5c99215a423656001439321e.mockapi.io/api/v1/product`,request.body)
         .then(function (mockApiCreatePostResponse) {
                        return response.json({
                                data: mockApiCreatePostResponse.data,
                                status:true
                            })
                    
        })
        .catch(error => {
                console.log("create product post call failed"+error);
                return response.json({
                    data: mockApiCreatePostResponse.data,
                    status:false
                })
        });
    

})
app.get("/getproductlist/",(request, response)=>{

    axios.get(`http://5c99215a423656001439321e.mockapi.io/api/v1/product`)
         .then(function (mockApiGetproductListResponse) {
                        return response.json({
                                data: mockApiGetproductListResponse.data,
                                status:true
                            })
                    
        })
        .catch(error => {
                console.log("get product list call failed"+error);
                return response.json({
                    data: mockApiCreatePostResponse.data,
                    status:false
                })
        });
    

})
app.delete("/deleteproduct/:id",(request, response)=>{
    axios.delete(`http://5c99215a423656001439321e.mockapi.io/api/v1/product/${request.params.id}`)
         .then(function (mockApiGetproductListResponse) {
                        return response.json({
                                data: mockApiGetproductListResponse.data,
                                status:true
                            })
                    
        })
        .catch(error => {
                console.log("delete product  call failed"+error);
                return response.json({
                    data: mockApiCreatePostResponse.data,
                    status:false
                })
        });
    

})
app.get("/getproduct/:id",(request, response)=>{
    axios.get(`http://5c99215a423656001439321e.mockapi.io/api/v1/product/${request.params.id}`)
         .then(function (mockApiGetproductListResponse) {
                        return response.json({
                                data: mockApiGetproductListResponse.data,
                                status:true
                            })
                    
        })
        .catch(error => {
                console.log("get edit product  call failed"+error);
                return response.json({
                    data: mockApiCreatePostResponse.data,
                    status:false
                })
        });
    

})
app.post("/updateproduct/",(request, response)=>{
    axios.put(`http://5c99215a423656001439321e.mockapi.io/api/v1/product/${request.body.updatedproduct.id}`,request.body.updatedproduct)
         .then(function (mockApiEditPostResponse) {
                console.log("got resposnse from product update post",mockApiEditPostResponse.data)
                        return response.json({
                                data: mockApiEditPostResponse.data,
                                status:true
                            })
                    
        })
        .catch(error => {
                console.log("update product  call failed"+error);
                return response.json({
                    data: mockApiCreatePostResponse.data,
                    status:false
                })
        });
    

})        


app.listen(5000 ,()=>{

});