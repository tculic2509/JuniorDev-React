import React, { useState } from 'react';
import "../App.css";
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';
import { useLocation } from 'react-router-dom';

function Index() {
    const location = useLocation();
    const [isAdmin, setIsAdmin] = useState(location.state ? location.state.isAdmin : false);
    const [ID, setID] = useState("");
    
    return (
        <div className='App-home'>
                <Navbar />
            <section id="author">

                <h2>O meni</h2>
                <p>Moj glavni pokretač u životu je obitelj, želja za dokazivanjem, stjecanje znanja i napredovanje. Želim neprestano učiti jer me strastveno zanima područje softverskog i web razvoja. Imam sposobnost brzog usvajanja novih vještina i visok stupanj motivacije.

                    Trenutačno posjedujem vještine u područjima poput C#, Java, SQL, React.js i PHP, a imam i osnovna znanja iz HTML-a i CSS-a.</p>
            </section>

            <section id="contact">
                <h2>Kontakt</h2>
                <form action="" method="post">
                    <div className='form-inputs'>
                        <label htmlFor="name">Ime:</label>
                        <input type="text" id="name" name="name" required className='inputs' />
                        <label htmlFor="email">E-mail:</label>
                        <input type="email" id="email" name="email" required className='inputs' />
                        <label htmlFor="message">Poruka:</label>
                        <textarea id="message" name="message" rows="4" required className='text'></textarea>
                        <button type="submit" className='secondary'>Pošalji</button>
                    </div>
                </form>
            </section>
            <Footer />

        </div>
    );
}

export default Index;
