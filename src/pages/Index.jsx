import React from 'react';
import "../App.css";
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';

function Index() {


    return (
        <div className='App-home'>
            <Navbar />
            <section id="author">

                <h2>O meni</h2>
                <p>Trenutno sam na trećoj godini u Visokoj školi Aspira, smjer Računarstvo. Imam mogućnost studentskog ugovora, kao i odrađivanje stručne prakse. Tijekom studija sam sudjelovao u nekoliko projekata koji su mi omogućili razvoj svojih programerskih  vještina. Kao npr.: WordPress (Elementor), C#, .NET, Java, PHP, JavaScript, MySQL i naprednije poznavanje HTML-a, CSS-a, React.js-a. Jedan od projekata mi je bio, korištenjem HTML-a, CSS-a, JavaScripta, PHP-a i baze podataka kreirati neki kviz. Zadnjih mjesec dana sam vanjski suradnik firmi Omnylynx, koristeći WordPress i React.js.</p>
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
