import Head from 'next/head' //Allow to write in Head component without going to index.js
import 'bulma/css/bulma.css'
import navbar from './navbar'

const imgback = new URL('../../images/back1.png',import.meta.url)

function footer()
{
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
                height: '100vh'}}>
                {navbar()}
                <div id='contactus' style={{height:'450px', paddingBlockEnd: '45px', backgroundColor:'#29465B',marginTop:'50px',borderRadius:'10px', marginLeft:'150px',marginRight:'150px'}}>
                    <span align='center' style={{color:'whitesmoke',fontSize:'40px'}}>
                        <h1>About US</h1>
                        <hr align="center" style={{ width:'225px', borderRadius:'3px', color: 'whitesmoke', backgroundColor: 'whitesmoke', height: '5px',marginLeft:'auto', marginRight:'auto' , borderColor : '#000000' }}/>
                    </span>
                    <div style={{margin:'50px'}}>
                        <span style={{paddingBottom:'50px',color:'whitesmoke',fontSize:'17px'}}>
                            <p style={{textAlign:'center',textAlignLast:'center',fontSize:'20px',marginTop:'5px'}}>
                                Currently students in third year in business informatics at the Lebanese University,
                                working on a project that can record transactions between two parties efficiently,
                                cheaply, and in verifiable and permanent way.
                                <br></br>
                                Our mission is an all-in-one Platform for small Business where Blochchain technology can be combined.
                                <br></br>
                                This technology can be utilized in the e-commerce industry to develop a decentralized online buying and selling platform.
                                <br></br>
                                We want our customers to be happy, so then our customers are happy and that makes us happy.
                            </p>
                        </span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default footer;