import React, {useEffect,useState} from 'react'
import './Nav.css'
const Nav = () => {
    const [show, handleShow]= useState(false)
    useEffect(() => {
     window.addEventListener('scroll', ()=>{
        if(window.scrollY >100) {
            handleShow(true)
        } else  handleShow(false)
     })
     return () => {
        window.removeEventListener('scroll')
     }
    }, []);
    console.log(show);
  return (
    <div className={`nav ${show && 'nav__black'}`}>
        <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/7/7a/Logonetflix.png/640px-Logonetflix.png" alt="netflix-logo" className="nav__logo" />
        <img src="https://robohash.org/e57907f4330ec0341b2640c0af697380?set=set4&bgset=bg2&size=400x400" alt="none" className="nav__avatar" />
    </div>
    
  )
}

export default Nav