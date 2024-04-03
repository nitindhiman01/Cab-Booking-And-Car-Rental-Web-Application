import React from 'react';
import Typography from '@mui/material/Typography';
import InstagramIcon from '@mui/icons-material/Instagram';
import XIcon from '@mui/icons-material/X';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import EmailIcon from '@mui/icons-material/Email';
import FacebookIcon from '@mui/icons-material/Facebook';
import CopyrightIcon from '@mui/icons-material/Copyright';
import "../stylesheets/footer.css";

function Footer(){
    return(
        <footer className='footer-container shapedividers_com-5827'>
            <div className='footer-main'>
                <div className='footer-branding'>
                    <div>
                        <Typography
                            variant="h6"
                            noWrap
                            component="a"
                            href="#app-bar-with-responsive-menu"
                            sx={{
                            mr: 2,
                            fontFamily: 'monospace',
                            fontSize: "22px",
                            fontWeight: 700,
                            letterSpacing: '.3rem',
                            color: '#fff',
                            textDecoration: 'none',
                            lineHeight: "100px"
                            }}
                        >
                            CarBuddy
                        </Typography>
                    </div>
                    <div className='footer-social-links links'>
                        <a href="..."><InstagramIcon /></a>
                        <a href="..."><FacebookIcon /></a>
                        <a href="..."><WhatsAppIcon /></a>
                        <a href="..."><XIcon /></a>
                        <a href="..."><EmailIcon /></a>
                    </div>
                </div>
                <div>
                    <button className='footer-help-button'>Visit Help Center</button>
                </div>
                <div className='footer-content'>
                    <div className='footer-company-profile'>
                        <p className='footer-heading'>Our Company</p>
                        <div className='footer-links'>
                            <a href='...'>About us</a>
                            <a href='...'>Careers</a>
                            <a href='...'>Blog</a>
                            <a href='...'>FAQs</a>
                        </div>
                    </div>
                    <div className='vertical-bar'></div>
                    <div className='footer-company-profile'>
                        <p className='footer-heading'>Products</p>
                        <div className='footer-links'>
                            <a href='...'>Ride</a>
                            <a href='...'>Drive</a>
                            <a href='...'>Rental</a>
                            <a href='...'>Business</a>
                        </div>
                    </div>
                    <div className='vertical-bar'></div>
                    <div className='footer-company-profile'>
                        <p className='footer-heading'>Contact Us!</p>
                        <p>Please type your mail to connect with us.</p>
                        <form className='footer-input-form'>
                            <input className='footer-input' type='email' name='email' placeholder='Your E-Mail Address...'></input>
                            <input className='footer-help-button' type='submit'></input>
                        </form>
                    </div>
                </div>
                <div className='download-links links'>
                    <p>Download our app.</p>
                    <a href="..." title='Download from google play.'><i class="fa-brands fa-google-play"></i></a>
                    <a href="..." title='Download from App store.'><i class="fa-brands fa-app-store-ios"></i></a>
                </div>
                <div className='copyright-section'>
                    <div className='copyright'>
                        <p><CopyrightIcon sx={{fontSize: "12px"}} /> 2024 CarBuddy Inc.</p>
                    </div>
                    <div className='privacy-policy'>
                        <a href='...'>Privacy</a>
                        <a href='...'>Terms</a> 
                    </div>
                </div>
            </div>
        </footer>
    );
}

export default Footer;