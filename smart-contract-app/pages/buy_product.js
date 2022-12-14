import Head from 'next/head' //Allow to write in Head component without going to index.js
import 'bulma/css/bulma.css'
import Web3 from'web3'
import React,{ useState, useEffect, Component } from 'react'
import PurchaseContract from '../blockchain/smart'
import navbar from './components/navbar'
import contactus from './components/contactus'
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const imgback = new URL('../images/back1.png',import.meta.url)
const img = new URL('../images/back1.png',import.meta.url)
const SmartContract = () => {
    const [error, setError] =  useState('')
    const [successMsg, setSuccessMsg] =  useState('')
    const [bQte, setBqte] =  useState(1)
    const [address, setAddress] =  useState(null)
    const [web3, setWeb3] = useState(null)
    const [pContract, setPContract] = useState(null)
    const [data,setData] = useState('')
    const [data2,setData2] = useState('')
    const [search,setSearch] = useState('')
     
    useEffect (() => {
        /* StateButton() */
        connectWalletHandler()
    },[pContract,address])

    //Update Qty with evry input change
    const updateItemQty = event =>{
        setBqte(event.target.value)
    }

    const updateSearch = event =>{
        setSearch(event.target.value)
    }

    //window.ethereum !only exists if user has metamask installed
    const connectWalletHandler = async()=>{
        /* check if MetaMask is available */
        if(typeof window !='undefined' && typeof window.ethereum !='undefined')
        {  
            try{
                /* request wallet connect */
                await window.ethereum.request({method:'eth_requestAccounts'})//Send request to connect to metamask
                /*  set web3 instance */ 
                web3 = new Web3(window.ethereum) //constructeur qui prend le"Provider Api"
                setWeb3(web3)
                /* get list of account */
                const accounts = await web3.eth.getAccounts()
                setAddress(accounts[0]) // current account

                /* create local contract copy */
                const pc = PurchaseContract(web3)
                setPContract(pc)
                if(pContract) getProducts()
            }   
            catch(err){
                /* setError(err.essage)
                document.getElementById('boxdanger').style.visibility = 'visible' */
            }
        }
        else{
            alert('Please install MetaMask')
        }
    }

    /* const StateButton = () =>{
        if(document.getElementById('check').checked == false)
            document.getElementById('btnBuy').disabled=true;
        else
            document.getElementById('btnBuy').disabled=false;
    } */
    
    const BuyItemHandler = async (productId) =>{
        try {
            const prod = productList[productId-1]
            const price1 = prod.price
            const amount = price1*bQte
            if(prod.quantity >= bQte)
            {
                setSuccessMsg("")
                setError("")
                await pContract.methods.buyProduct(prod.id,bQte).send({
                    from: address,
                    gas: 300000,
                    value: web3.utils.toWei(String(amount), 'wei')
                })
                setSuccessMsg(`${bQte} items purchased!!`)
                getProducts()
                document.getElementById('boxsuccess').style.visibility = 'visible'
            }
            else
            { 
                setError("The quantity is not enough.")
                document.getElementById('boxdanger').style.visibility = 'visible'
            }
        } catch (err) {
            /* setError(err.message)
            document.getElementById('boxdanger').style.visibility = 'visible' */
        }
    }
    
    function deletenotdanger(){
        document.getElementById('boxdanger').style.visibility = 'hidden'
    }
    function deletenotsucces(){
        document.getElementById('boxsuccess').style.visibility = 'hidden'
    }

    var productList = [];
    async function getProducts(){
        const productNumber = await pContract.methods.getProductsNumber().call();
        if(productNumber == 0){
            document.getElementById('resData').innerHTML = "<b>No Product</b>";
        }
        else{
            var img = false;
            for(var i=1;i<=productNumber;i++){
                var product = await pContract.methods.getProductById(i).call();
                if(product.id != 0 && product.quantity !=0 && product.visible == true){
                    productList.push(product);
                }
            }
        }
        var i= 0
        const listproduct = productList.filter((prod)=>prod.name.toLowerCase().includes(search)).map(prod => (
            <div className='divprinc'>
                <div className='header_div'>
                    <label>{prod.name}</label>
                </div>
                <div className='content-div'>
                    {/* <div class="field has-addons">
                        <p class="control color-content qte-content">{prod.image}
                            <img src={prod.image} width='180px' height="180px" alt='no image' ></img>
                        </p>
                    </div> */}
                    <div className='field has-addons f-content color-content'>
                        <label id='price' className='color-content price-content'>Price: {prod.price/1000000000000000000} eth</label>
                    </div>
                    <div class="field has-addons">
                        <p class="control color-content qte-content">
                            Quantite: <input id='bqte' onChange={updateItemQty} class="input is-small color-content" min={1} type="number" style={{width:'50px',height:'25px'}} />
                        </p>
                    </div>
                    <div class="field has-addons">
                        <p class="control" style={{color:'#29465B',paddingLeft:'30px',fontWeight:'bold'}}>
                        <label id='price' style={{color:'#29465B'}} className='label'> {prod.description}</label>
                        </p>
                    </div>
                    <p class="control color-content buy-content" >
                        <button id={'btnBuyP_'+(prod.id)} onClick={()=>BuyItemHandler(prod.id)} style={{backgroundColor: '#29465B',color: 'white',height: '35px'}} class="button inbuy-content" >Buy</button>
                    </p>
                    <br></br>
                </div>
            </div>
        ))
        setData(listproduct)
    }

    return (
    <div>
        <Head>
            <title>Smart Contract</title>
            <meta name="description" content="Ether Shop" />
            <meta name="viewport" content="width=device-width, initial-scale=1"/>
        </Head>
        <div className='first-div'
          style={{backgroundImage: `url(${imgback})`}}>
            {navbar()}
            {/* <div style={{paddingLeft:'150px',paddingTop:"20px"}}>
                <div style={{backgroundColor:"#29465B",color:"whitesmoke",fontSize:'20px',textAlign:'center',borderRadius:'5px',height:"40px",width:"200px"}}>Buy Product</div>
            </div>
            <div style={{paddingLeft:'150px'}}>
                <button className='button' style={{height:'30px',width:'300px',textAlign:'center',backgroundColor:"#29465B",color:'whitesmoke',borderTopRightRadius:'150px',borderTopLeftRadius:'150px'}}>Search</button>
                 <br></br>
                <input type='text' onChange={updateSearch} className='search' style={{height:'45px',width:'300px',border:'none',fontSize:'15px',padding:'14px',border:'solid 1px #29465B',backgroundColor:'transparent',color:'#29465B',borderRadius:'10px'}} placeholder='Find a product' />
            </div> */}
            <div style={{paddingLeft:'80px',paddingTop:"20px",height:'125px'}}>
                <div style={{color:"#29465B",fontSize:'22px',textAlign:'center',fontWeight:'bold',height:"40px",width:"200px"}}>
                    <p><i>Buy Product</i></p>
                </div>
            
                <div class="control has-icons-left" style={{textAlign:'center'}}>
                    <input type='text' onChange={updateSearch} className='search' style={{height:'45px',width:'350px',border:'none',fontSize:'15px',paddingLeft:'30px',border:'solid 1px #29465B',borderRadius:'10px'}}  placeholder='Find a product' />
                    <span class="icon is-left" style={{paddingLeft:'463px',color:'#29465B'}}>
                        <FontAwesomeIcon icon={faMagnifyingGlass} ></FontAwesomeIcon>
                    </span>
                </div>
            </div>
            <div className='second-div'>
                <div id='resData' className='res-data'>
                    {data}{data2}
                </div>
                <section>
                        {/* <div className='container has-text-danger'>
                            <p>{error}</p>
                        </div> */}
                        <div id='boxdanger' className='notification is-danger is-light' style={{visibility:'hidden'}}>
                            <button class="delete" onClick={deletenotdanger}></button>
                            <label style={{textAlign:'center'}}>{error}</label>
                        </div>
                </section>
                <section>
                        <div id='boxsuccess' className='notification is-success' style={{visibility:'hidden'}}>
                            <button class="delete" onClick={deletenotsucces}></button>
                            <label style={{textAlign:'center'}}>{successMsg}</label>
                        </div>
                </section>
            </div>
        </div>
        {contactus()}
    </div>
    )
}
export default SmartContract