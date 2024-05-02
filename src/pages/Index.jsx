import React from 'react';
import "../App.css";
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';
import Profil from '../assets/profil_slika.jpg';
function Index() {
    const pdfUrl = 'https://example.com/your-document.pdf';

    return (
        <div className='App-home'>
            <Navbar />
            <section id="author">

                <h2>O meni</h2>
                <div className='index-about'>
                <img src={Profil} className='profilna'></img>
                <p><span className='about'></span>Ja sam Toni Čulić i trenutno sam na trećoj godini u Visokoj školi Aspira, smjer Računarstvo. Imam mogućnost studentskog ugovora, kao i odrađivanje stručne prakse. Tijekom studija sam sudjelovao u nekoliko projekata koji su mi omogućili razvoj svojih programerskih  vještina. Kao npr.: WordPress (Elementor), C#, .NET, Java, PHP, JavaScript, MySQL i naprednije poznavanje HTML-a, CSS-a, React.js-a. Jedan od projekata mi je bio, korištenjem HTML-a, CSS-a, JavaScripta, PHP-a i baze podataka kreirati neki kviz. Zadnjih mjesec dana sam vanjski suradnik firmi Omnylynx, koristeći WordPress i React.js. U linku se nalaze neki od moji projekata koje sam napravio u zadnjih dvije godine.&nbsp;<a href='https://github.com/tculic2509?tab=repositories'>Link</a></p>
                </div>
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
