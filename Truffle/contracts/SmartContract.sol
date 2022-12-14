// SPDX-License-Identifier: MIT
pragma solidity  ^0.8.3;

contract SmartContract{

    struct Product {
        uint id;
        string name;
        uint price;
        uint quantity;
        string description;
        bool visible;
        string image;
    }

    struct Order{
        address clientAddress;
        Product product;
        uint bqte;
        uint time;
    }

    address public owner;
    Product[] public productsList;
    mapping(address=>Order[]) public orders;
    mapping(address=>uint) public ordersNumber;

    constructor() {
        owner = msg.sender; 
    }

    modifier isOwner() {
        require(msg.sender == owner, "Caller is not owner");
        _;
    }

    function getProductsNumber()public view returns( uint){
        return productsList.length;
    }

    function addProduct(string memory name, uint price,uint quantity,string memory description,bool visible,string memory image) public {
            productsList.push(Product(productsList.length+1,name,price,quantity,description,visible,image));
    }

    function deleteProduct(uint productId) public{
        require(productId < (productsList.length+1),"index out of bound");

        for (uint i = productId-1; i<productsList.length-1; i++){
            productsList[i] = productsList[i+1];
        }
        productsList.pop();
    }

    function updateProduct(uint productId, string memory name, uint price,uint quantity,string memory description,bool visible,string memory image) public payable{
            productsList[productId-1] = Product(productId,name,price,quantity,description,visible,image);
    }

    function getProductById(uint productId)public view returns(Product memory){
        for(uint i=0;i<productsList.length;i++){
            if(productsList[i].id==productId){
                return  productsList[i];
            }
        }
        return Product(0,"",0,0,"",false,"");
    }

    function buyProduct(uint productId,uint bqte)public payable returns(string memory) {
        for(uint i=0;i<productsList.length;i++){
            if(productsList[i].id==productId){
                productsList[i].quantity = productsList[i].quantity - bqte;
                orders[msg.sender].push(Order(msg.sender,productsList[i],bqte,block.timestamp));
                ordersNumber[msg.sender]++;
                return "done";
            }
        }
        return "Not found";
    }


    function getOrdersByClientAddress()public view returns(Order[] memory){
        return orders[msg.sender];
    }

    function getContractBalance()public view  returns(uint){
        return address(this).balance;
    }
   
    function sendContractBalanceToOwner() public {
        payable(owner).transfer(address(this).balance);
    }

}