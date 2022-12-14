import 'bulma/css/bulma.css'
import React from "react"

const imgworld = new URL('C:/projects/Block_Explorer/PFE/smart-contract-app/images/logoeth.png',import.meta.url)

const navbar =()=>{
    const focContact =() =>{
        document.getElementById("contactus").scrollIntoView();
    }
    
    const HelpHandler = () =>{
        document.getElementById('alert').style.display = 'block'
    }

    return(
    <nav className="navbar"
        style={{backgroundColor:'transparent',
        backgroundPosition: 'center',
        width: '100vw',
        height: '0px'}}>
        <div className="navbar-brand" style={{paddingLeft:'30px'}}>
            <a className="navbar-item" href='https://ethereum.org/'><label  style={{color:'#29465B'}}><b>E-Shop</b></label> 
            <img src={imgworld}  width="50" height="150"></img>
            </a>
            <div className="navbar-burger" data-target="navbarExampleTransparentExample">
                <span></span>
                <span></span>
                <span></span>
            </div>
        </div>

        <div id="navbarExampleTransparentExample" className="navbar-menu">
            <div className="navbar-start">
                <div class="navbar-item">
                    <a class="bd-tw-button" style={{backgroundColor:'transparent',color:'#29465B'}} href="http://localhost:3000/">
                    <span>
                        Home
                    </span>
                    </a>
                </div>
                <div class="navbar-item">
                    <a class="bd-tw-button" style={{backgroundColor:'transparent',color:'#29465B'}} href="./report.pdf" download="report.pdf">
                    <span>
                         Documentation
                    </span>
                    </a>
                </div>
            <div class="navbar-item has-dropdown is-hoverable">
                <a class="navbar-link"  style={{backgroundColor:'transparent',color:'#29465B'}}>
                    More
                </a>

                <div class="navbar-dropdown" style={{backgroundColor:'transparent',color:'#29465B'}}>
                    <a class="navbar-item" href='http://localhost:3000/components/aboutus' style={{color:'#29465B'}}>
                        About Us
                    </a>
                    <a class="navbar-item" style={{color:'#29465B'}} onClick={focContact}>
                        Contact Us
                    </a>
                </div>
            </div>
            </div>
            <div class="navbar-end">
                <div class="navbar-item">
                    <div class="field is-grouped" style={{paddingRight:'150px'}}>
                        <p class="control">
                            <a  href='http://localhost:3000/my_product' class="bd-tw-button button is-link is-rounded is-normal" style={{width:'140px', backgroundColor:'transparent',color:'#29465B'}}> 
                            <span>
                            Purchased Products
                            </span>
                            </a>
                        </p>
                        <p class="control">
                            <a  href='http://localhost:3000/buy_product' class="bd-tw-button button is-link is-rounded is-normal" style={{width:'140px', backgroundColor:'transparent',color:'#29465B'}}> 
                            <span>
                                Buy Products
                            </span>
                            </a>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    </nav>
    )
}
export default navbar