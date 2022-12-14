import Head from 'next/head' //Allow to write in Head component without going to index.js
import 'bulma/css/bulma.css'
import Web3 from'web3'
import React from "react";
import navbar from './components/navbar'
import contactus from './components/contactus'

const imgback = new URL('../images/back1.png',import.meta.url)

const index = () => {
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
                
                const accounts = await web3.eth.getAccounts()
                if(accounts == "0x489F9D3E74D01E2249da03822bDa19BB2d1BEC8C")
                    window.location.href = `http://localhost:3000/admin/Showproduct`
                else
                    window.location.href = `http://localhost:3000/buy_product`
            }   
            catch(err){
                alert(err.message)
            }
        }
        else{
            alert('Please install MetaMask')
        }
    }

    return (
    <div>
        <Head>
            <title>Smart Contract</title>
            <meta  name="description" content="A BlockChain Smart Contract" />
        </Head>
        <div className="main" style={{backgroundImage:`url(${imgback}`}}>
            {navbar()}
            <div className="firstdiv">
                <div className="div2">
                    <h1>
                        <b>Purchase with ethereum across the WORLD</b>
                    </h1>
                    <h6 className="h6">Anyone can join the blockchain <b>NO ONE </b>has control over the network</h6>
                    <br></br>
                    <button className="button is-medium hover is-outlined is-rounded is-fullwidth " style={{color:'whitesmoke',backgroundColor:'#29465b'}} onClick={connectWalletHandler}>Connect Wallet</button>
                    <div className="colbutton">
                        <div className='button buttondescription' style={{backgroundColor:'transparent'}}>Security</div>
                        <div className="button buttondescription" style={{backgroundColor:'transparent'}}>Relability</div>
                        <div className="button buttondescription" style={{backgroundColor:'transparent'}}>Ethereum</div>
                        <div className="button buttondescription" style={{backgroundColor:'transparent'}}>BlockChain</div>
                        <div className="button buttondescription" style={{backgroundColor:'transparent'}}>Low Fees</div>
                        <div className="button buttondescription" style={{backgroundColor:'transparent'}}>Web 3.0</div>
                    </div>
                </div>
                <div className="description">
                    <article>
                        <div className="message-body" style={{color:'#737CA1',fontSize:'16px'}}>
                            EtherShop is a platform for small businesses where Blockchain technology can be combined,
                            in the e-commerce industry for the sale of derivative products 
                            using cryptocurrencies and smart contracts, within the Ethereum state.
                        </div>
                    </article>
                </div>
            </div>
        </div>
        {contactus()}
    </div>
    )
}
export default index
