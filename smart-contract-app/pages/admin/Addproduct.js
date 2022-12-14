import Head from 'next/head' //Allow to write in Head component without going to index.js
import 'bulma/css/bulma.css'
import Web3 from'web3'
import React, { useState,useEffect } from "react"
import navbaradmin from '../components/navbaradmin'
import PurchaseContract from '../../blockchain/smart'

const imgback = new URL('../../images/back1.png',import.meta.url)


const admin = () => {

    const [web3,setWeb3] = useState('')
    const [account,setAccount] = useState('')
    const [pContract, setPContract] = useState(null)
    const [error, setError] =  useState('')
    const [successMsg, setSuccessMsg] =  useState('')
    const [img, setImg] =  useState('')

    useEffect (() => {
        connectWalletHandler()
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
            }
        }
        else{
            setError('Please install MetaMask')
        }
    }

    function clearInput(){
        document.getElementById(`productName`).value="";
        document.getElementById('productPrice').value="";
        document.getElementById('productQte').value="";
        document.getElementById('productdesc').value="";
    }

    const addProduct = async () =>{
        const nameproduct = document.getElementById(`productName`).value;
        const priceproduct = document.getElementById('productPrice').value;
        const qteproduct = document.getElementById('productQte').value;
        const descproduct = document.getElementById('productdesc').value;
        var img =""
        /*const file = document.getElementById('input_img').files[0];
             const reader = new FileReader();
            reader.addEventListener("load", function () {
                // convert image file to base64 string
                img = reader.result;
                alert(img)
            }, false);
            if (file) {
                reader.readAsDataURL(file);
            } */
        if(nameproduct == "" || priceproduct == "" || qteproduct == "" || descproduct == "" ){
            setError("Input is empty")
            document.getElementById('boxdanger').style.visibility = 'visible'
        }
        else{
            try {
                if( account == "0x489F9D3E74D01E2249da03822bDa19BB2d1BEC8C")
                {
                    await pContract.methods.addProduct(nameproduct,String(priceproduct*1000000000000000000),qteproduct,descproduct,true,"").send({
                        from: account
                    })
                    setSuccessMsg('Item has been added succesfully')
                    document.getElementById('boxsuccess').style.visibility = 'visible'
                    clearInput()
                }
                else{
                    setError("Only Seller can have acces")
                    document.getElementById('boxdanger').style.visibility = 'visible'
                }
            } catch (err) {
                setError(err.message)
                document.getElementById('boxdanger').style.visibility = 'visible'
            }
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
            width: 'fit-content',
            height: 'fit-content'}}>
            {navbaradmin('Show')}
            <div style={{display:'flex',paddingTop:'15px'}}>
                <div style={{color:'#29465B',
                    paddingTop:'10px',
                    paddingLeft:'350px',
                    margin:'40px',
                    fontFamily:'Arial, Helvetica, sans-serif'}}>
                    <div class="field">
                        <div class="column is-four-fifths" style={{width:'600px', backgroundColor:'#C0C0C0', borderRadius:'5px', fontWeight:'bold', color:'#29465B', textAlign:'center'}}>Add Product</div>
                    </div>
                    <div class="field is-horizontal">
                        <div class="field-label is-normal">
                            <label className='label'>Name: </label>
                        </div>
                        <div class="field-body">
                            <div class="field">
                                <p class="control">
                                    <input id='productName' class="input is-info" style={{background:'transparent'}} autoComplete="of" type="text" placeholder="Name" required></input>
                                </p>
                            </div>
                        </div>
                    </div>
                    <div class="field is-horizontal">
                        <div class="field-label is-normal">
                            <label className='label'>Price: </label>
                        </div>
                        <div class="field-body">
                            <div class="field">
                                <p class="control">
                                    <input id='productPrice' class="input is-info" style={{background:'transparent'}} autoComplete="of" type="number" placeholder="Price in eth" required></input>
                                </p>
                            </div>
                        </div>
                    </div>
                    <div class="field is-horizontal">
                        <div class="field-label is-normal">
                            <label className='label'>Quantite: </label>
                        </div>
                        <div class="field-body">
                            <div class="field">
                                <p class="control">
                                    <input id='productQte' class="input is-info" style={{background:'transparent'}} autoComplete="of" type="number" min="0" placeholder="Quantite" required></input>
                                </p>
                            </div>
                        </div>
                    </div>
                    {/* <div class="field is-horizontal">
                        <div class="field-label is-normal">
                            <label className='label'>Image: </label>
                        </div>
                        <div class="field-body">
                            <div class="field">
                                <p class="control">
                                    <input id='input_img' type="file" accept='image/*'></input>
                                </p>
                            </div>
                        </div>
                    </div> */}
                    {/* <div class="field is-horizontal" style={{paddingLeft:'200px'}}>
                        <label class="radio" >
                            <input type="radio" id='ckvisible' name="foobar" />
                            Visible
                        </label>
                    </div> */}
                    <div class="field is-horizontal">
                        <div class="field-label is-normal">
                            <label className='label'>Description: </label>
                        </div>
                        <div class="field-body">
                            <div class="field">
                                <p class="control">
                                    <textarea id='productdesc' class="input is-info" style={{background:'transparent',height:'100px'}} autoComplete="of" placeholder="Description" required/>
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className='field'  style={{paddingLeft:'150px'}}>
                        <button onClick={addProduct} style={{backgroundColor:'#29465B',color:'white',width:'300px'}} className="button is-medium is-rounded" >Add Product</button>
                    </div>
                    <section>
                            <div id='boxdanger' className='notification is-danger is-light' style={{visibility:'hidden'}}>
                                <button class="delete" onClick={deletenotdanger}></button>
                                <label style={{textAlign:'center'}}>{error}</label>
                            </div>
                    </section>
                    <section>
                            <div id='boxsuccess' className='notification  is-success' style={{visibility:'hidden'}}>
                                <button class="delete" onClick={deletenotsucces}></button>
                                <label style={{textAlign:'center'}}>{successMsg}</label>
                            </div>
                    </section>
                    <img src={img} id='img' alt={img}></img>
                </div>
            </div>
        </div>
    </div>
    )
}
export default admin
