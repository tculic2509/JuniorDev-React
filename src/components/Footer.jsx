import React, { useState} from 'react';
import github from "../assets/github.png"
import linkedin from "../assets/linkedin.png"
import { Link, useParams } from 'react-router-dom';
function Footer() {
  const { id, isAdmin } = useParams();
  const [isAdminState, setIsAdminState] = useState(isAdmin === 'true');
  return (
    <div className='App-footer'>
      <div className='footer'>
        <p className='footer-link'><span>Stranice</span></p>
        <Link to={`/index/${isAdminState}`}className='footer-link'>Početna</Link>
        <Link to={`/aktivnost/${isAdminState}`}className='footer-link'>Aktivnost</Link>
        <Link to={`/udruge/${isAdminState}`} className='footer-link'>Udruge</Link>
        <Link to={`/volonter/${isAdminState}`} className='footer-link'>Volonter</Link>

      </div>
      <div className='footer'>
        <p className='footer-link'><span>Udruge</span></p>
        <Link to="https://krijesnica.hr/kutak-za-volontere/" className='footer-link'>Udruga Krijesnica</Link>
        <Link to="https://volonterski-centar-iskra.com/" className='footer-link'>Udruga ZvoniMir</Link>

      </div>
      <div className='footer'>
        <p className='footer-link'><span>Aktivnosti</span></p>
        <Link to="https://www.volonteka.hr/split-i-okolica/volonterske-aktivnosti/13527-kreacija-casopisa-grafika-i-dizajn" className='footer-link'>Kreacija časopisa</Link>
        <Link to="https://www.volonteka.hr/split-i-okolica/volonterske-aktivnosti/13532-pomocna-radionici-keramike" className='footer-link'>Radionica keramike</Link>
        <Link to="https://www.volonteka.hr/split-i-okolica/volonterske-aktivnosti/13503-prikupljanje-donacija" className='footer-link'>Prikljupljanje donacija</Link>
        <Link to="https://www.volonteka.hr/split-i-okolica/volonterske-aktivnosti/13488-pomoc-pri-ucenju" className='footer-link'>Pomoć pri učenju</Link>

      </div>
      <div id="social-media">
        <a href='https://www.linkedin.com/'><img src={linkedin} className='linkedin'></img></a>
        <a href='https://github.com/'> <img src={github} className='github'></img></a>

      </div>
    </div>
  );
}

export default Footer;
