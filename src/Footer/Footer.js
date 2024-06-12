import React from 'react'
import { Container,Row,Col} from 'react-bootstrap'
import "./footer.css"

import { Link } from 'react-router-dom'


const Footer = () => {

  return (
    <div className='footer py-5'>
 <Container fluid >
 <Row className='justify-content-between'>
 <Col md={4} lg={2} className='d-flex mb-3 align-items-center'>
 <div className='footer-logo'>
 <Link  to="/"><img src="./images/logo.svg" /></Link>
 </div>
 </Col>
 
 <Col md={6} lg={5} >
 <div className='footer-link'>
 <h4>Quick links</h4>
 <Row className='mb-3'>
 <Col lg={4} md={6} sm={6} xs={6}>
 <Link to="/therapy-notes">Therapy Notes</Link>
 </Col>
 <Col lg={4} md={6} sm={6} xs={6}>
 <Link to="/therapy-notes">Contact </Link>
 </Col>
  <Col lg={4} md={6} sm={6} xs={6}>
 <Link to="/termsandconditions">Terms and Conditions</Link>
 </Col> 
 <Col lg={4} md={6} sm={6} xs={6}>
 <Link to="/therapy-notes">Calendar</Link>
 </Col>
 <Col lg={4} md={6} sm={6} xs={6}>
 <Link to="/therapy-notes">Privacy & Policy</Link>
 </Col>
 <Col lg={4} md={6} sm={6} xs={6}>
 <Link to="/therapy-notes">Therapy Notes</Link>
 </Col>
 </Row>
 </div>
 </Col>
 <Col lg={2} md={4} sm={6} >
 <div className='footer-download'>
 <h4>Download Our App</h4></div>
 <div className='footer-download-btns platform mb-3'>
 <Link to="#"><img src='/images/playstore.png'/></Link>
 <Link to="#"><img src='/images/appstore.png'/></Link></div></Col>
 <Col lg={2} md={6} sm={6}>
 <div className='social-link'>
 <h4>Follow Us on</h4>
 <div className='icon-head'>
 <Link to="#"><img src='/images/facebook.svg'/></Link>
 <Link to="#"><img src='/images/twitter.svg'/></Link>
 <Link to="#"><img src='/images/linkedin.svg'/></Link>
 </div>
 </div></Col>
</Row>
 <Col>

 </Col>

 </Container>
 </div>
       

 
  )
}
export default Footer