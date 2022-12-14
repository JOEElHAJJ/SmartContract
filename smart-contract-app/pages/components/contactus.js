
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faAddressCard} from '@fortawesome/free-solid-svg-icons'
import {faPhone} from '@fortawesome/free-solid-svg-icons'
import {faEnvelope} from '@fortawesome/free-solid-svg-icons'
import {faLocationDot} from '@fortawesome/free-solid-svg-icons'

function contactus()
{
    return (
        <div id='contactus' style={{paddingBlockEnd: '45px', backgroundColor:'#29465B', paddingTop:'15px'}}>
            <span align='center' style={{paddingBottom:'50px', color:'whitesmoke',fontSize:'40px'}}>
                <h1>CONTACT US</h1>
                <hr align="center" style={{ width:'225px', borderRadius:'3px', color: 'whitesmoke', backgroundColor: 'whitesmoke', height: '5px',marginLeft:'auto', marginRight:'auto' , borderColor : '#000000' }}/>
            </span>
            <div style={{marginLeft:'300px', color:'whitesmoke'}}>
                <FontAwesomeIcon icon={faAddressCard}></FontAwesomeIcon>
                <span align='center' style={{paddingBottom:'50px',fontSize:'17px'}}>&nbsp;Ali EL Maouch</span>
                <span style={{paddingLeft:'110px', color:'whitesmoke'}}>
                    <FontAwesomeIcon icon={faPhone}></FontAwesomeIcon>
                    <span align='center' style={{paddingBottom:'50px',fontSize:'17px'}}>&nbsp;+96170659154</span>
                </span>
                <span style={{paddingLeft:'110px', color:'whitesmoke'}}>
                    <FontAwesomeIcon icon={faEnvelope}></FontAwesomeIcon>
                    <span align='center' style={{paddingBottom:'50px',fontSize:'17px'}}>&nbsp;<a href='https://mail.google.com/mail/u/0/?hl=en/#inbox?compose=new' style={{color:'whitesmoke'}}>alimaouch2019@gmail.com</a></span>
                </span>
            </div>
            <div style={{marginLeft:'300px', paddingTop:'5px', color:'whitesmoke'}}>
                <FontAwesomeIcon icon={faAddressCard}></FontAwesomeIcon>
                <span align='center' style={{paddingBottom:'50px',fontSize:'17px'}}>&nbsp;Joe EL Hajj</span>
                <span style={{paddingLeft:'138px', color:'whitesmoke'}}>
                    <FontAwesomeIcon icon={faPhone}></FontAwesomeIcon>
                    <span align='center' style={{paddingBottom:'50px',fontSize:'17px'}}>&nbsp;+9613078670</span>
                </span>
                <span style={{paddingLeft:'118px', color:'whitesmoke'}}>
                    <FontAwesomeIcon icon={faEnvelope}></FontAwesomeIcon>
                    <span align='center' style={{paddingBottom:'50px',fontSize:'17px'}}>&nbsp;<a href='https://mail.google.com/mail/u/0/?hl=en/#inbox?compose=new' style={{color:'whitesmoke'}}>joeelhajj53@gmail.com</a></span>
                </span>
            </div>
            <br/>
            <br/>
            <div style={{marginLeft:'380px', paddingTop:'5px', color:'whitesmoke'}}>
                <span style={{paddingLeft:'100px'}}><b>PROJET TUTEURE PAR:&nbsp;&nbsp;&nbsp;</b>
                    <FontAwesomeIcon icon={faAddressCard}></FontAwesomeIcon>
                    <span align='center' style={{paddingBottom:'50px',fontSize:'17px'}}>&nbsp;Dr. Mostafa Al Baba</span>
                </span>
            </div>
            <br/>
            <div style={{marginLeft:'250px', paddingTop:'5px'}}>
                <span style={{paddingLeft:'200px'}}>
                    <a href='https://goo.gl/maps/cnLgqSsjcip1EFXt6' style={{color:'whitesmoke'}}>
                        <FontAwesomeIcon icon={faLocationDot}></FontAwesomeIcon>
                        <span align='center' style={{paddingBottom:'50px', color:'whitesmoke',fontSize:'17px'}}>&nbsp;Universite Libanaise - Faculte de la Technologie - Saida</span>
                    </a>
                </span>
            </div>
        </div>
    )
}

export default contactus;