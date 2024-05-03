import '../App.css'
import axios from "axios";
import { useState, useEffect } from "react";
import { Modal, Button, Table } from "react-bootstrap";
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';
import { useParams } from 'react-router-dom';

function Aktivnost() {
  const [aktivnosti, postaviAktivnosti] = useState([]);
  const [listaUdruge, postaviListuUdruge] = useState([]);
  const [deleteID, setDeleteID] = useState("");
  const [reload, setReload] = useState(false);
  const [deleteModalShow, setDeleteModalShow] = useState(false);
  const [editModalShow, setEditModalShow] = useState(false);
  const [addModalShow, setAddModalShow] = useState(false);
  const [assignModalShow, setAssignModalShow] = useState(false);
  const [ID, setEditID] = useState("");
  const [datum, postaviDatum] = useState("");
  const [grad, postaviGrad] = useState("");
  const [naziv, postaviNaziv] = useState("");
  const [opis, postaviOpis] = useState("");
  const [lokacija, postaviLokacija] = useState("");
  const [udruga, postaviUdruga] = useState("");
  const [sudionici, postaviSudionici] = useState([]);
  const [sudionik, postaviSudionika] = useState("");
  const [ime, postaviIme] = useState("");
  const [sortField, setSortField] = useState(null);
  const [sortOrder, setSortOrder] = useState("asc");
  const [korisnici, setKorisnici] = useState([]);
  const [admin, setAdmin] = useState(false);
  const { id, isAdmin } = useParams();
  const [readModalShow, setReadModalShow] = useState(false);
  const [korisnikID, setKorisnikID] = useState("");
  const [deleteParticipantModalShow, setDeleteParticipantModalShow] = useState(false);
  const [participantToDelete, setParticipantToDelete] = useState("");

  useEffect(() => {
    axios.get("http://localhost:8080/korisnici")
      .then(response => {
        const korisniciData = response.data;
        setKorisnici(korisniciData);
        setAdmin(korisniciData.filter(korisnik => korisnik.isAdmin === true));
        setKorisnikID(korisniciData.map(korisnik => korisnik.id));

      })
      .catch(error => {
        console.error('Greška prilikom dohvaćanja korisnika:', error);
      });
  }, []);
  useEffect(() => {
    axios.get("http://localhost:8080/volonterske_udruge")
      .then(resUdruga => {
        let sortedData = resUdruga.data;

        postaviListuUdruge(sortedData);
      })
      .catch(error => {
        console.error('Greška prilikom dohvaćanja udruga:', error);
      });
  }, []);
  useEffect(() => {
    axios.get("http://localhost:8080/aktivnosti")
      .then(resAktivnosti => {
        let sortedData = resAktivnosti.data;
        if (sortField) {
          sortedData = sortedData.sort((a, b) => {
            if (a[sortField] < b[sortField]) return sortOrder === "asc" ? -1 : 1;
            if (a[sortField] > b[sortField]) return sortOrder === "asc" ? 1 : -1;
            return 0;
          });
        }
        postaviAktivnosti(sortedData);
      })
      .catch(error => {
        console.error('Greška prilikom dohvaćanja aktivnosti:', error);
      });
  }, [sortField, sortOrder]);
  useEffect(() => {
    axios.get(`http://localhost:8080/aktivnosti/${ID}&sudionici/${korisnikID}`)
      .then(response => {
        const sudionici = response.data;
        postaviSudionici(sudionici);
        postaviSudionika(sudionici);
      })
      .catch(error => {
        console.error('Greška prilikom dohvaćanja aktivnosti:', error);
      });
  }, []);



  const handleDeleteClick = (contentId) => {
    setDeleteID(contentId);
    setDeleteModalShow(true);
  };
  const handleEditClick = (contentId) => {
    setEditID(contentId);
    const selectedAktivnost = aktivnosti.find(aktivnost => aktivnost.id === contentId);
    postaviNaziv(selectedAktivnost.naziv);
    postaviOpis(selectedAktivnost.opis);
    postaviDatum(selectedAktivnost.datum);
    postaviGrad(selectedAktivnost.grad);
    postaviUdruga(selectedAktivnost.udruga);
    postaviLokacija(selectedAktivnost.lokacija);
    postaviSudionici(selectedAktivnost.sudionici);
    setEditModalShow(true);
  };
  const update = async () => {
    try {
      await axios.put(`http://localhost:8080/aktivnosti/${ID}`, {
        naziv: naziv,
        opis: opis,
        datum: datum,
        grad: grad,
        udruga: udruga,
        lokacija: lokacija,
        sudionici: sudionici
      });
      setEditModalShow(false);
      setReload(!reload);
      window.location.href = `/aktivnost/${isAdmin}`;
    } catch (error) {
      console.error("Greška prilikom uređivanja:", error);
    }
  };
  const confirmDelete = async () => {
    try {
      await axios.delete(`http://localhost:8080/aktivnosti/${deleteID}`);
      setDeleteModalShow(false);
      setReload(!reload);
      window.location.href = `/aktivnost/${isAdmin}`;
    } catch (error) {
      console.error("Greška prilikom brisanja:", error);
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
      datum: datum,
      grad: grad,
      udruga: udruga,
      lokacija: lokacija,
      sudionici: sudionici
    };

    axios.post("http://localhost:8080/aktivnosti", data)
      .then(response => {
        console.log('Uspješno dodano:', response.data);
        setAddModalShow(false);
        setReload(!reload);
        window.location.href = `/aktivnost/${isAdmin}`;
      })
      .catch(error => {
        console.error('Greška prilikom dodavanja:', error);
      });
  }
  const sortingOptions = [
    { value: "datum", label: "Datum" },
    { value: "grad", label: "Grad" }
  ];
  const handleSortChange = (e) => {
    const selectedField = e.target.value;
    if (selectedField === sortField) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortField(selectedField);
      setSortOrder("asc");
    }
  };
  const handleRead = (contentId) => {
    setEditID(contentId);
    const selectedAktivnost = aktivnosti.find(aktivnosti => aktivnosti.id === contentId);
    postaviNaziv(selectedAktivnost.naziv);
    postaviOpis(selectedAktivnost.opis);
    postaviDatum(selectedAktivnost.datum);
    postaviGrad(selectedAktivnost.grad);
    postaviUdruga(selectedAktivnost.udruga);
    postaviLokacija(selectedAktivnost.lokacija);
    postaviSudionici(selectedAktivnost.sudionici);
    setReadModalShow(true);


  };
  function handleAssign(event) {
    event.preventDefault();

    const data = {
      ime: ime
    };

    axios.post(`http://localhost:8080/aktivnosti/${ID}&sudionici`, alert(data))
      .then(response => {
        alert('Uspješno dodano:', response.data);
        setAssignModalShow(false);
        setReload(!reload);
        window.location.href = `/aktivnost/${isAdmin}`;
      })
      .catch(error => {
        console.error('Greška prilikom dodavanja:', error);
      });
  }
  const handleDeleteParticipantClick = (contentId) => {
    setParticipantToDelete(contentId);
    setDeleteParticipantModalShow(true);
  };
  const confirmDeleteParticipant = async () => {
    try {
      await axios.delete(`http://localhost:8080/aktivnosti/${ID}&sudionici/${alert(participantToDelete)}`);
      setDeleteParticipantModalShow(false);
      setReload(!reload);
    } catch (error) {
      console.error("Greška prilikom brisanja sudionika:", error);
    }
  };


  return (
    <div className='aktivnost'>
      <Navbar />
      <div className='App-active'>
        <div className='flex'>

          <div style={{
            maxHeight: "500px",
            overflowY: "auto"

          }} >
            <Table border={1} className='table card'>
              <thead style={{
                position: "sticky",
                top: "0"
              }}>
                <tr>
                  <th>Naziv</th>
                  <th>Datum</th>
                  <th>Grad</th>
                  {Array.isArray(admin) && admin.filter(user => user.isAdmin === true) && <th>Opcije</th>}

                </tr>
              </thead>
              <tbody>
                {aktivnosti.map(aktivnost => (
                  <tr key={aktivnost.id} className='table'>
                    <td onClick={() => handleRead(aktivnost.id)} className='td'>{aktivnost.naziv}</td>
                    <td onClick={() => handleRead(aktivnost.id)} className='td'>{aktivnost.datum}</td>
                    <td onClick={() => handleRead(aktivnost.id)} className='td'>{aktivnost.grad}</td>
                    {admin && (
                      <td className="td justify">
                        <Button className="danger float margin" onClick={() => handleDeleteClick(aktivnost.id)}>Delete</Button>
                        <Button className="secondary" onClick={() => handleEditClick(aktivnost.id)}>Edit</Button>
                      </td>
                    )}
                  </tr>
                ))}
              </tbody>
            </Table>

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

      <Modal show={editModalShow} onHide={() => setEditModalShow(false)} className="modal">
        <Modal.Header>
          <Modal.Title className='modal-form-podaci'>Uredi aktivnost</Modal.Title>
        </Modal.Header>
        <Modal.Body className='modal-form-udruga'>
          <form onSubmit={update} className='modal-form-podaci'>
            <label>Naziv:</label>
            <input type="text" value={naziv} onChange={(e) => postaviNaziv(e.target.value)} />
            <label>Opis:</label>
            <textarea value={opis} onChange={(e) => postaviOpis(e.target.value)} className='text' />
            <label>Datum:</label>
            <input type="date" value={datum} onChange={(e) => postaviDatum(e.target.value)} />
            <label>Grad:</label>
            <input type="text" value={grad} onChange={(e) => postaviGrad(e.target.value)} />
            <label>Lokacija:</label>
            <input type="text" value={lokacija} onChange={(e) => postaviLokacija(e.target.value)} />
            <Button type="submit" className='button primary'>
              Spremi promjene
            </Button>
          </form>
        </Modal.Body>
      </Modal>

      <Modal show={addModalShow} onHide={() => setAddModalShow(false)} className="modal" >
        <Modal.Header>
          <Modal.Title className="modal-form">Dodaj novu aktivnost</Modal.Title>
        </Modal.Header>
        <Modal.Body className='modal-form-udruga'>
          <form onSubmit={handleAddSubmit} className='modal-form-udruga'>
            <label>Naziv:</label>
            <input type="text" onChange={(e) => postaviNaziv(e.target.value)} />
            <label>Opis:</label>
            <textarea type="text" onChange={(e) => postaviOpis(e.target.value)} className='text' />
            <label>Datum:</label>
            <input type="date" onChange={(e) => postaviDatum(e.target.value)} />
            <label>Grad:</label>
            <input type="text" onChange={(e) => postaviGrad(e.target.value)} />
            <label>Udruga:</label>
            <select value={udruga} className='udrugaSelect' onChange={(e) => postaviUdruga(e.target.value)}>
              <option value={""}>------</option>
              {listaUdruge.map(udruge => (
                <option key={udruge.id} value={udruge.naziv}>{udruge.naziv}</option>
              ))}

            </select>
            <label>Lokacija:</label>
            <input type="text" onChange={(e) => postaviLokacija(e.target.value)} />
            <Button type="submit" className='button primary'>
              Dodaj aktivnost
            </Button>
          </form>
        </Modal.Body>
      </Modal>


      <Modal show={readModalShow} onHide={() => setReadModalShow(false)} className="modal">
        <Modal.Header>
          <Modal.Title className='modal-form-udruga'>Podaci</Modal.Title>
        </Modal.Header>
        <Modal.Body className='modal-form-udruga'>
          <form className='modal-form-podaci'>
            <label>Naziv:</label>
            <input type="text" value={naziv} readOnly />

            <label>Opis:</label>
            <input type="text" value={opis} readOnly />

            <label>Datum:</label>
            <input type="text" value={datum} readOnly />

            <label>Grad:</label>
            <input type="text" value={grad} readOnly />

            <label>Udruga:</label>
            <input type="text" value={udruga} readOnly />

            <label>Lokacija:</label>
            <input type="text" value={lokacija} readOnly />


            <select value={sudionici} readOnly>
              <option value="">Sudionici</option>
              {sudionici.map(sudionik => (
                <option key={sudionik.id} value={sudionik.ime}>{sudionik.ime}</option>
              ))}

            </select>
            <div className='modal-buttons'>
              <div className="danger sign" onClick={() => handleDeleteParticipantClick(korisnikID)}>Delete Participant</div>
              <div className='button primary sign' onClick={() => setAssignModalShow(true)}>
                Prijavi se
              </div>
            </div>
          </form>
        </Modal.Body>
      </Modal>

      <Modal show={assignModalShow} onHide={() => setAssignModalShow(false)} className="modal">
        <Modal.Header className='delete-header'>
          <Modal.Title>Prijavi se</Modal.Title>
        </Modal.Header>
        <Modal.Body className='delete-body'>
          <form onSubmit={handleAssign} className='modal-form'>
            <label>Ime i prezime:</label>
            <input type="text" onChange={(e) => postaviIme(e.target.value)} />
            <Button type="submit" onClick={() => setAssignModalShow(false)} className='button primary'>
              Prijava
            </Button>
          </form>
        </Modal.Body>
      </Modal>

      <Modal show={deleteParticipantModalShow} onHide={() => setDeleteParticipantModalShow(false)} className="modal">
        <Modal.Header className='delete-header'>
          <Modal.Title>Potvrdi brisanje sudionika</Modal.Title>
        </Modal.Header>
        <Modal.Body className='delete-body'>
          <select value={sudionik} onChange={(e) => postaviSudionika(e.target.value)}>
            <option value={""}>------</option>
            {sudionici.map(sudionik => (
              <option key={sudionik.id} value={sudionik.ime}>{sudionik.ime}</option>
            ))}
          </select>
        </Modal.Body>
        <Modal.Footer className='delete-footer'>
          <Button className="secondary" onClick={() => setDeleteParticipantModalShow(false)}>
            Odustani
          </Button>
          <Button className="danger" onClick={confirmDeleteParticipant}>
            Obriši
          </Button>
        </Modal.Footer>
      </Modal>

      <Footer />
    </div>
  )
}

export default Aktivnost





