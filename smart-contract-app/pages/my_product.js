import Head from 'next/head'
import 'bulma/css/bulma.css'
import Web3 from'web3'
import React,{ useState, useEffect } from 'react'
import PurchaseContract from '../blockchain/smart'
import navbar from './components/navbar'
import contactus from './components/contactus'

const imgback = new URL('../images/back1.png',import.meta.url)

const MyProducts = () => {
    const [error, setError] =  useState('')
    const [successMsg, setSuccessMsg] =  useState('')
    const [address, setAddress] =  useState(null)
    const [web3, setWeb3] = useState(null)
    const [pContract, setPContract] = useState(null)
    const [data,setData] = useState('')
     
    useEffect (() => {
        connectWalletHandler()
    },[pContract,address])

    function deletenotdanger(){
        document.getElementById('boxdanger').style.visibility = 'hidden'
    }
    function deletenotsucces(){
        document.getElementById('boxsuccess').style.visibility = 'hidden'
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
                if(pContract) getOrders()
            }   
            catch(err){
                /* setError(err.message) */
            }
        }
        else{
            setError('Please install MetaMask')
        }
    }

    const click =() =>{
        document.getElementById('alert').style.display = 'none'
    }
    
    var orderList = [];
    async function getOrders(){
        const ordersNumber = await pContract.methods.ordersNumber(address).call();
        if(ordersNumber == 0)
            setData('No Order')
        else
        {   
            for(var i=0;i<ordersNumber;i++){
                try{
                    var order = await pContract.methods.orders(address, i).call();
                    orderList.push(order);
                }
                catch(err){
                    //  alert(err.message)
                }
            }
            var i = 1;
             const listorder = orderList.map(order => (
                <div style={{padding:'30px'}}>
                    <div className='header_div'>
                        <label>{'Order '+(i++)}</label>
                        <br></br>
                    </div>
                    <div style={{backgroundColor:'whitesmoke',border:'1px',borderColor:'#29465B',borderStyle:'solid',borderBottomRightRadius:'7px',borderBottomLeftRadius:'7px',paddingRight:'5px',paddingLeft:'5px',paddingTop:'15px',height:'200px',width:'190px'}}>
                        <div className='field' >
                            <label id='name' style={{color:'#29465B',textAlign:'center',fontFamily:'sans-serif',fontStyle:"italic",fontWeight:'bolder'}} className='label'><u>{order.product.name}</u></label>
                        </div> 
                        <div className='field' >
                            <label id='price' style={{color:'#29465B',textAlign:'center'}} className='label'>Price: {(order.product.price*order.bqte)/1000000000000000000} eth</label>
                        </div>
                        <div class="field">
                            <label id='qte' style={{color:'#29465B',textAlign:'center'}} className='label'>Quantite: {order.bqte}</label>
                        </div>
                        <div class="field"> 
                            <label id='time' style={{color:'#29465B',textAlign:'center'}} className='label'>Date: {new Date(order.time*1000).toLocaleDateString()}</label>
                        </div>
                        <div class="field"> 
                            <label id='time' style={{color:'#29465B',textAlign:'center'}} className='label'>At: {new Date(order.time*1000).toLocaleTimeString()}</label>
                        </div>
                    </div>
                </div>
            ))
            setData(listorder) 
        }
    }

    return (
    <div>
        <Head>
            <title>My Products</title>
            <meta name="description" content="A BlockChain Smart Contract" />
        </Head>
        <div 
          style={{backgroundImage: `url(${imgback})`,
          backgroundPosition: 'center',
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat',
          width: '100vw',
          height: 'fit-content;'}}>
            {navbar()}
            <div style={{paddingLeft:'150px',paddingTop:"20px"}}>
                <div style={{color:"#29465B",fontWeight:'bold',fontSize:'22px',textAlign:'center',borderRadius:'5px',height:"40px",width:"210px"}}>
                    <i>Purchased Products</i>
                </div>
            </div>
            <div style={{paddingTop:'1px',paddingLeft:'100px', width:'400px'}}>
                <div id='resData' className='res-data'>
                    {data}
                </div>
                <section>
                        <div className='notification is-danger is-light' style={{visibility:'hidden'}}>
                            <button class="delete" onClick={deletenotdanger}></button>
                            <label style={{textAlign:'center'}}>{error}</label>
                        </div>
                </section>
                <section>
                        <div className='notification is-success' style={{visibility:'hidden'}}>
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

export default MyProducts