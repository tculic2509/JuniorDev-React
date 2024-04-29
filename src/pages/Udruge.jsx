import '../App.css'
import axios from "axios";
import { useState, useEffect } from "react";
import { Modal, Button, Table, Card } from "react-bootstrap";
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { json, useLocation } from 'react-router-dom';
import Swal from 'sweetalert2';
import Cookies from 'js-cookie';

function Udruge() {
  const [udruge, setUdruge] = useState([]);
  const [deleteID, setDeleteID] = useState("");
  const [reload, setReload] = useState(false);
  const [deleteModalShow, setDeleteModalShow] = useState(false);
  const [editModalShow, setEditModalShow] = useState(false);
  const [addModalShow, setAddModalShow] = useState(false);
  const [ID, setEditID] = useState("");
  const [isAdmitted, setIsAdmitted] = useState(false);
  const [gradovi, setGradovi] = useState([]);
  const [grad, postaviGrad] = useState("");
  const [naziv, postaviNaziv] = useState("");
  const [adresa, postaviAdresa] = useState("");
  const [sortField, setSortField] = useState(null);
  const [sortOrder, setSortOrder] = useState("asc"); // or "desc"
  const location = useLocation();
  const [isAdmin, setIsAdmin] = useState(location.state ? location.state.isAdmin : false);
  const [korisnici, setKorisnici] = useState([]);





  useEffect(() => {
    axios.get("http://localhost:8080/korisnici")
      .then(response => {
        const korisniciData = response.data;
        setKorisnici(korisniciData);

      })
      .catch(error => {
        console.error('Greška prilikom dohvaćanja korisnika:', error);
      });
  }, []); // Empty dependency array to run this effect only once after the initial render



  useEffect(() => {
    axios.get("http://localhost:8080/gradovi")
      .then(res => {
        const cityData = res.data;
        setGradovi(cityData);

      })
      .catch(error => {
        console.error('Greška prilikom dohvaćanja gradova:', error);
      });
  }, [reload]);


  useEffect(() => {
    axios.get("http://localhost:8080/volonterske_udruge")
      .then(resUdruge => {
        let sortedData = resUdruge.data;

        if (sortField) {
          sortedData = sortedData.sort((a, b) => {
            if (a[sortField] < b[sortField]) return sortOrder === "asc" ? -1 : 1;
            if (a[sortField] > b[sortField]) return sortOrder === "asc" ? 1 : -1;
            return 0;
          });
        }

        setUdruge(sortedData);
      })
      .catch(error => {
        console.error('Greška prilikom dohvaćanja aktivnosti:', error);
      });
  }, [reload, sortField, sortOrder]);


  const handleDeleteClick = (contentId) => {
    setDeleteID(contentId);
    setDeleteModalShow(true);
  };

  const handleAdmitClick = async (contentId) => {
    try {
      setEditID(contentId);
      const selectedUdruge = udruge.find(grupe => grupe.id === contentId);
      setIsAdmitted(selectedUdruge.isAdmitted);

      await axios.put(`http://localhost:8080/volonterske_udruge/${contentId}`, {
        naziv: selectedUdruge.naziv,
        opis: selectedUdruge.opis,
        adresa: selectedUdruge.adresa,
        grad: selectedUdruge.grad,
        isAdmitted: true
      });

      setEditModalShow(false);
      setReload(!reload);

      window.location.href = `/udruge/${isAdmin}`;
    } catch (error) {
      console.error("Greška prilikom uređivanja:", error);
      window.location.href = `/udruge/${isAdmin}`;
    }
  };


  const confirmDelete = async () => {
    try {
      await axios.delete(`http://localhost:8080/volonterske_udruge/${deleteID}`);
      setDeleteModalShow(false);
      setReload(!reload);
    } catch (error) {
      console.error("Greška prilikom brisanja:", error);
    }
  };


  const admittedUdruge = udruge.filter(udruga => udruga.isAdmitted);
  const notAdmittedUdruge = udruge.filter(udruga => !udruga.isAdmitted);

  const sortingOptions = [
    { value: "naziv", label: "Naziv" },
    { value: "adresa", label: "Adresa" },
    { value: "grad", label: "Grad" }
  ];

  const handleSortChange = (e) => {
    const selectedField = e.target.value;
    if (selectedField == sortField) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");

    } else {
      setSortField(selectedField);
      setSortOrder("asc");
    }
  };

  const handleAddClick = () => {
    setAddModalShow(true);
  };
  function handleAddSubmit(event) {
    event.preventDefault();

    const data = {
      naziv: naziv,
      opis: opis,
      grad: grad
    };

    axios.post("http://localhost:8080/volonterske_udruge", data)
      .then(response => {
        setAddModalShow(false); // Zatvaramo modal nakon uspješnog dodavanja
        setReload(!reload); // Ponovno učitavanje aktivnosti
        window.location.href = `/udruge/${isAdmin}`;

      })
      .catch(error => {
        console.error('Greška prilikom dodavanja:', error);
      });
  }


  return (
    <div className='aktivnost'>
      <Navbar />
      <div className='App-active'>
        <div className='flex'>

          <div style={{
            maxHeight: "500px",
            overflowY: "auto"
          }}>
            <div className='table card'>
              <h3>Popis udruga</h3>
              {admittedUdruge.map(udruga => (
                <Card key={udruga.id} className='table'>
                  <Card.Body className='padding'>
                    <Card.Text><strong>Naziv: </strong>{udruga.naziv}</Card.Text>
                    <Card.Text><strong>Opis: </strong>{udruga.opis}</Card.Text>
                    <Card.Text><strong>Adresa: </strong> {udruga.adresa}</Card.Text>
                    <Card.Text><strong>Grad: </strong> {udruga.grad}</Card.Text>
                    <Button className="danger float" onClick={() => handleDeleteClick(udruga.id)}>Delete</Button>
                  </Card.Body>
                </Card>
              ))}
            </div>
            <div className='table2 card'>
              <h3>Zahtjevi za odobrenje</h3>
              {notAdmittedUdruge.map(udruga => (
                <Card key={udruga.id} className='table'>
                  <Card.Body className='padding'>
                    <Card.Text><strong>Naziv: </strong>{udruga.naziv}</Card.Text>
                    <Card.Text><strong>Opis: </strong>{udruga.opis}</Card.Text>
                    <Card.Text><strong>Adresa:</strong> {udruga.adresa}</Card.Text>
                    <Card.Text><strong>Grad: </strong> {udruga.grad}</Card.Text>
                    <Button className="danger float" onClick={() => handleDeleteClick(udruga.id)}>Delete</Button>

                      {korisnici.map(user => (
                      user.isAdmin == true && user.id=="1" && (
                        //problem kod prikazivanja botuna samo adminu, prikazuje se konstatno svima ili nikome zavisno o uvjetu
                        <button key={user.id} onClick={() => handleAdmitClick(udruga.id)} className='secondary'>
                          Admit
                        </button>
                      )))}




                  </Card.Body>
                </Card>
              ))}

            </div>
          </div>
          <div className='sorting'>
            <select value={sortField} onChange={handleSortChange}>
              <option value="">Sortiraj po...</option>
              {sortingOptions.map(option => (
                <option key={option.value} value={option.value}>{option.label}</option>
              ))}
            </select>
          </div>

        </div>

        <button onClick={() => handleAddClick()} className='dodaj'>Dodaj</button>



      </div>
      <Modal show={deleteModalShow} onHide={() => setDeleteModalShow(false)} className="modal">
        <Modal.Header className='delete-header'>
          <Modal.Title>Potvrdi brisanje</Modal.Title>
        </Modal.Header>
        <Modal.Body className='delete-body'>
          Jeste sigurni da želite izbrisati aktivnost?
        </Modal.Body>
        <Modal.Footer className='delete-footer'>
          <Button className="secondary" onClick={() => setDeleteModalShow(false)}>
            Odustani
          </Button>
          <Button className="danger" onClick={confirmDelete}>
            Obriši
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal show={addModalShow} onHide={() => setAddModalShow(false)} className="modal" >
        <Modal.Header>
          <Modal.Title className="modal-title">Dodaj novu aktivnost</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={handleAddSubmit} className='modal-form'>
            <label>Naziv:</label>
            <input type="text" onChange={(e) => postaviNaziv(e.target.value)} />
            <label>Opis:</label>
            <textarea onChange={(e) => postaviOpis(e.target.value)} className='text' />
            <label>Adresa:</label>
            <input type="text" onChange={(e) => postaviAdresa(e.target.value)} />
            <label>Grad:</label>
            <input type="text" onChange={(e) => postaviGrad(e.target.value)} />
            <Button type="submit" className='button primary'>
              Dodaj aktivnost
            </Button>
          </form>
        </Modal.Body>
      </Modal>
      <Footer />
    </div>
  )
}

export default Udruge;
