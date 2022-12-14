import Head from 'next/head' //Allow to write in Head component without going to index.js
import 'bulma/css/bulma.css'
import Web3 from'web3'
import React, { useState,useEffect } from "react"
import navbaradmin from '../components/navbaradmin'
import PurchaseContract from '../../blockchain/smart'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import { faPencil } from '@fortawesome/free-solid-svg-icons'

const imgback = new URL('../../images/back1.png',import.meta.url)


const admin = () => {
    const [web3,setWeb3] = useState('')
    const [account,setAccount] = useState('')
    const [pContract, setPContract] = useState(null)
    const [balance, setBalance] = useState('')
    const [data, setData] = useState('')
    const [success, setSuccess] = useState('')
    const [error, setError] = useState('')
    

    useEffect (() => {
        if(account == '') connectWalletHandler()
        else getProducts()
    })
    //window.ethereum !only exists if user has metamask installed
    const connectWalletHandler = async()=>{
        // typeof window :to test if the script is being run in a web-browser or not
        //window.ethereum:MetaMask injects a global API into websites visited by its users at window.ethereum 
        /* check if MetaMask is available */
        
        if(typeof window !='undefined' && typeof window.ethereum !='undefined')
        {  
            try{
                /* request wallet connect */
                await window.ethereum.request({method:'eth_requestAccounts'})//Send request to connect to metamask
                /* set web3 instance */
                web3 = new Web3(window.ethereum) //constructeur qui prend le"Provider Api" 
                setWeb3(web3)
                
                const accounts = await web3.eth.getAccounts()
                setAccount(accounts[0])

                /* create local contract copy */
                const pc = PurchaseContract(web3)
                setPContract(pc)
            }   
            catch(err){
                setError(err.message)
                document.getElementById('boxdanger').style.visibility = 'visible'
            }
        }
        else{
            setError('Please install MetaMask')
            document.getElementById('boxdanger').style.visibility = 'visible'
        }
    }

    function ischeck(){
        productList.forEach(function(prod,index){
            if(prod.visible){
                document.getElementById(`ckvisible_${prod.id}`).defaultChecked = true
                document.getElementById(`ckinvisible_${prod.id}`).defaultChecked = false
            }
            else{
                document.getElementById(`ckvisible_${prod.id}`).defaultChecked = false
                document.getElementById(`ckinvisible_${prod.id}`).defaultChecked = true
            }
        })
    }

    var productList = [];
    const getProducts = async ()=>{
        try{
            if(account == '0x489F9D3E74D01E2249da03822bDa19BB2d1BEC8C'){
                const productNumber = await pContract.methods.getProductsNumber().call()
                if(productNumber == 0){
                    document.getElementById('resData').innerHTML = "<tr><td colspan='5'>No Product</td></tr>";
                }
                else{
                    for(var i=1;i<=productNumber;i++){
                        var product = await pContract.methods.getProductById(i).call()
                            productList.push(product)
                    }

                    var resData = " "
                    resData = productList.map(prod => (
                        <tr>
                            <td><b><label id='id'>{prod.id}</label></b></td>
                            <td><input id={`name_${prod.id}`} defaultValue={prod.name} class="input is-info" style={{background:'transparent'}} autoComplete="of" type="text" placeholder="Name" required /></td>
                            <td><input id={`price_${prod.id}`} defaultValue={prod.price/1000000000000000000} min="0" step="0.01" class="input is-info" style={{background:'transparent'}} autoComplete="of" type="number" placeholder="Price in eth" required /></td>
                            <td><input id={`qte_${prod.id}`} defaultValue={prod.quantity} class="input is-info" min="0" style={{background:'transparent',width:'120px'}} autoComplete="of" type="number" placeholder="Quantite" required /></td>
                            <td><input id={`desc_${prod.id}`} defaultValue={prod.description} class="input is-info" style={{background:'transparent'}} autoComplete="of" type="text" placeholder="Description" required /></td>
                            <td>
                                <label class="radio" >
                                    <input type="radio" value={`${prod.visible}`} id={`ckvisible_${prod.id}`} name={`ck_${prod.id}`} />
                                    Visible
                                </label>
                                <label class="radio" >
                                    <input type="radio" value={`${prod.visible}`} id={`ckinvisible_${prod.id}`} name={`ck_${prod.id}`} />
                                    Invisible
                                </label>
                            </td>
                            <td style={{paddingTop:'10px'}}>
                                <button onClick={()=>updateProduct(prod.id)} className='button' style={{backgroundColor:'#29465B',width:'25px',height:'30px',color:'whitesmoke'}}><FontAwesomeIcon icon={faPencil}></FontAwesomeIcon></button>
                                &nbsp;&nbsp;&nbsp;&nbsp;
                                {/* <button style={{color:'red'}} onClick={()=>deleteProduct(prod.id)} ><FontAwesomeIcon icon={faTrashCan}></FontAwesomeIcon></button> */}
                            </td>
                        </tr>
                    ))
                    if(resData=='') resData="No Product"
                    setData(resData)
                    ischeck()
                    getContractBalance()
                }
            }
            else{
                setError('Only admin can have acces')
                document.getElementById('boxdanger').style.visibility = 'visible'
            }
        }
        catch(error){
            /* setError(error.message)
            document.getElementById('boxdanger').style.visibility = 'visible' */
        }
    }

    const updateProduct = async (id) =>{
        try {
            const pname = document.getElementById(`name_${id}`).value
            const price = document.getElementById(`price_${id}`).value
            const quantity = document.getElementById(`qte_${id}`).value
            const description = document.getElementById(`desc_${id}`).value
            const ck = true;
            if(document.getElementById(`ckvisible_${id}`).checked)
                ck = true
            else ck = false

            await pContract.methods.updateProduct(id,pname,String(price*1000000000000000000),quantity,description,ck,"").send({
                from: account })
            setSuccess('Item has been updated')
            document.getElementById('boxsuccess').style.visibility = 'visible'
        } catch (error) {
            setError(error.message)
            document.getElementById('boxdanger').style.visibility = 'visible'
        }
    }

    async function deleteProduct(id) {
        /* try {
            await pContract.methods.deleteProduct(id).send({
                from: account })
            window.location.reload()
        } catch (error) {
            setError(error.message)
            document.getElementById('boxdanger').style.visibility = 'visible'
        } */
    }

    const sendBalancetoSeller = async ()=>{
        try {
            await pContract.methods.sendContractBalanceToOwner().send({ from: account })
            getContractBalance()
            setSuccess('Ether has been converted')
            document.getElementById('boxsuccess').style.visibility = 'visible'
        } catch (error) {
            setError(error.message)
            document.getElementById('boxdanger').style.visibility = 'visible'
        }
    }

    const getContractBalance = async ()=>{
        try {
            const balance = await pContract.methods.getContractBalance().call()
            setBalance(balance)
        } catch (error) {
            setError(error.message)
            document.getElementById('boxdanger').style.visibility = 'visible'
        }
    }

    function deletenotdanger(){
        document.getElementById('boxdanger').style.visibility = 'hidden'
    }
    function deletenotsucces(){
        document.getElementById('boxsuccess').style.visibility = 'hidden'
    }

    return (
    <div>
        <Head>
            <title>Smart Contract</title>
            <meta  name="description" content="A BlockChain Smart Contract" />
        </Head>
        <div
            style={{backgroundImage: `url(${imgback})`,
            backgroundPosition: 'center',
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat',
            width: '100vw',
            height: '150vh'}}>
            {navbaradmin('Add')}
            <div style={{textAlign:'center'}}>
                <button onClick={()=>sendBalancetoSeller()} class="bd-tw-button button is-rounded is-normal" style={{width:'210px',backgroundColor:'#29465B',color:'white'}}> 
                    Send Balance To My Wallet
                </button>
            </div>
            <div style={{display:'flex',paddingTop:'15px'}}>
                <div style={{color:'#29465B',
                    paddingLeft:'100px',
                    paddingTop:'0px',
                    margin:'40px',
                    fontFamily:'Arial, Helvetica, sans-serif'}}>
                    <div style={{display:'flex'}}>
                        <span style={{backgroundColor:'transparent',width:'550px',fontWeight:'bold',paddingTop:'15px'}}>
                            Admin Address: {account}
                        </span>
                        <span style={{backgroundColor:'transparent',paddingLeft:'250px',width:'500px',fontWeight:'bold',paddingTop:'15px',height:'55px'}}>
                            Balance: {balance/1000000000000000000} eth
                        </span>
                    </div>
                    <table class="table is-narrow " style={{background:'transparent'}}>
                        <thead>
                            <tr>
                                <th>Id</th>
                                <th>Name</th>
                                <th>Price</th>
                                <th>Quantite</th>
                                <th>Description</th>
                                <th>Visibility</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody id='resData'>
                            {data}
                        </tbody>
                    </table>
                    <div id='boxdanger' className='notification is-danger is-light' style={{visibility:'hidden'}}>
                        <button class="delete" onClick={deletenotdanger}></button>
                        <label style={{textAlign:'center'}}>{error}</label>
                    </div>
                    <div id='boxsuccess' className='notification is-success' style={{visibility:'hidden'}}>
                        <button class="delete" onClick={deletenotsucces}></button>
                        <label style={{textAlign:'center'}}>{success}</label>
                    </div>
                </div>
            </div>
        </div>
    </div>
    )
}
export default admin
