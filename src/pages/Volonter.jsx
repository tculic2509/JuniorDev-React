import '../App.css'
import axios from "axios";
import { useState, useEffect } from "react";
import { Modal, Button, Table } from "react-bootstrap";
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { useLocation} from 'react-router-dom';


function Volontiranje() {
  const [volonteri, setVolonteri] = useState([]);
  const [korisnici, setKorisnici] = useState([]);
  const [deleteID, setDeleteID] = useState("");
  const [reload, setReload] = useState(false);
  const [deleteModalShow, setDeleteModalShow] = useState(false);
  const [editModalShow, setEditModalShow] = useState(false);
  const [addModalShow, setAddModalShow] = useState(false);
  const [readModalShow, setReadModalShow] = useState(false);
  const [ID, setEditID] = useState("");
  const [ime, setIme] = useState("");
  const [telefon, setTelefon] = useState("");
  const [dob, setDob] = useState(null);
  const [email, setEmail] = useState("");
  const [grad, setGrad] = useState("");
  const [gradovi, setGradovi] = useState([]);
  const [vrstaVolontiranja, setVrstaVolontiranja] = useState("");
  const [poslovi, setPoslovi] = useState([]);
  const location = useLocation();
  const [filter, setFilter] = useState("");

  const handleFilter = (e) => {
    setFilter(e.target.value);
  };
  const filterData = (data) => {
    if (filter === grad) {
      return data.filter(volonter => volonter.grad === filter);
    } else {
      return data;
    }
  };
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
    axios.get("http://localhost:8080/vrstaPosla")
      .then(res => {
        const jobData = res.data;
        setPoslovi(jobData);

      })
      .catch(error => {
        console.error('Greška prilikom dohvaćanja poslova:', error);
      });
  }, [reload]);
  useEffect(() => {
    axios.get("http://localhost:8080/volonteri")
      .then(resVolonteri => {
        let sortedData = resVolonteri.data;

        setVolonteri(sortedData);
      })
      .catch(error => {
        console.error('Greška prilikom dohvaćanja aktivnosti:', error);
      });
  }, [reload]);
  useEffect(() => {
    axios.get("http://localhost:8080/korisnici")
      .then(response => {
        const korisniciData = response.data;
        setKorisnici(korisniciData);
      })
      .catch(error => {
        console.error('Greška prilikom dohvaćanja korisnika:', error);
      });
  }, [reload]);

  const handleDeleteClick = (contentId) => {
    setDeleteID(contentId);
    setDeleteModalShow(true);
  };
  const handleEditClick = (contentId) => {
    setEditID(contentId);
    const selectedVolonter = volonteri.find(volontiranje => volontiranje.id === contentId);
    setIme(selectedVolonter.ime);
    setEmail(selectedVolonter.email);
    setDob(selectedVolonter.dob);
    setTelefon(selectedVolonter.telefon);
    setGrad(selectedVolonter.grad);
    setVrstaVolontiranja(selectedVolonter.posao);
    setEditModalShow(true);
  };
  const update = async () => {
    try {
      await axios.put(`http://localhost:8080/volonteri/${ID}`, {
        ime: ime,
        email: email,
        dob: dob,
        telefon: telefon,
        grad: grad,
        posao: vrstaVolontiranja
      });
      setEditModalShow(false);
      setReload(!reload);
    } catch (error) {
      console.error("Greška prilikom uređivanja:", error);
    }
  };
  const confirmDelete = async () => {
    try {
      await axios.delete(`http://localhost:8080/volonteri/${deleteID}`);
      setDeleteModalShow(false);
      setReload(!reload);
    } catch (error) {
      console.error("Greška prilikom brisanja:", error);
    }
  };
  const handleAddClick = () => {
    setAddModalShow(true);
  };
  const handleRead = (contentId) => {
    setEditID(contentId);
    const selectedVolonter = volonteri.find(volontiranje => volontiranje.id === contentId);
    setIme(selectedVolonter.ime);
    setEmail(selectedVolonter.email);
    setDob(selectedVolonter.dob);
    setTelefon(selectedVolonter.telefon);
    setGrad(selectedVolonter.grad);
    setVrstaVolontiranja(selectedVolonter.vrstaVolontiranja);

    setReadModalShow(true);
  };
  function handleAddSubmit(event) {
    event.preventDefault();

    const data = {
      ime: ime,
      email: email,
      dob: dob,
      telefon: telefon,
      grad: grad,
      posao: vrstaVolontiranja
    };

    axios.post("http://localhost:8080/volonteri", data)
      .then(response => {
        console.log('Uspješno dodano:', response.data);
        setAddModalShow(false);
        setReload(!reload);
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
            <Table border={1} className='table card'>
              <thead style={{
                position: "sticky",
                top: "0"
              }}>
                <tr>
                  <th>Ime</th>
                  <th>Dob</th>
                  <th>Grad</th>
                  <th>Opcije</th>
                </tr>
              </thead>
              <tbody>
                {filter ? (
                  filterData(volonteri).map(volonter => (
                    <tr key={volonter.id}>
                      <td onClick={() => handleRead(volonter.id)}>{volonter.ime}</td>
                      <td onClick={() => handleRead(volonter.id)}>{volonter.dob}</td>
                      <td onClick={() => handleRead(volonter.id)}>{volonter.grad}</td>
                      <td className="buttons">
                        <button onClick={() => handleEditClick(volonter.id)} className="edit">Edit</button>
                        <button onClick={() => handleDeleteClick(volonter.id)} className='danger margin'>Delete</button>
                      </td>
                    </tr>
                  ))
                ) : (
                  filter === "" && (
                    volonteri.map(volonter => (
                      <tr key={volonter.id}>
                        <td onClick={() => handleRead(volonter.id)}>{volonter.ime}</td>
                        <td onClick={() => handleRead(volonter.id)}>{volonter.dob}</td>
                        <td onClick={() => handleRead(volonter.id)}>{volonter.grad}</td>
                        <td className="buttons">
                          <button onClick={() => handleEditClick(volonter.id)} className="edit">Edit</button>
                          <button onClick={() => handleDeleteClick(volonter.id)} className='danger margin'>Delete</button>
                        </td>
                      </tr>
                    ))
                  )
                )}

              </tbody>
            </Table >
          </div>
        </div>

        {korisnici.map(korisnik => (
          <div key={korisnik.id}>
            {korisnik.isAdmin && (
              <Button onClick={handleAddClick} className='dodaj'>Dodaj</Button>
            )}
          </div>
        ))}
      </div>
      <div className='filt'>
        <p>Filtriraj: </p>
        <select value={grad} onChange={(e) => setGrad(e.target.value)} onClick={handleFilter}>
          <option value={""}>Izaberite grad</option>
          {gradovi.map(city => (
            <option key={city.id} value={city.grad}>{city.grad}</option>
          ))}
        </select>

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
          <Modal.Title className='modal-form-volonter'>Uredi aktivnost</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={update} className='modal-form-volonter'>
            <label>Ime:</label>
            <input type="text" value={ime} onChange={(e) => setIme(e.target.value)} />

            <label>Dob:</label>
            <input type="text" value={dob} onChange={(e) => setDob(e.target.value)} />

            <label>E-mail:</label>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />

            <label>Telefon:</label>
            <input type="tel" value={telefon} onChange={(e) => setTelefon(e.target.value)} />

            <select value={grad} onChange={(e) => setGrad(e.target.value)}>
              <option value="">Izaberite grad</option>
              {gradovi.map(city => (
                <option key={city.id} value={city.grad}>{city.grad}</option>
              ))}
            </select>
            <select value={vrstaVolontiranja} onChange={(e) => setVrstaVolontiranja(e.target.value)}>
              <option value="">Izaberite posao</option>
              {poslovi.map(job => (
                <option key={job.id} value={job.posao}>{job.posao}</option>
              ))}
            </select>


            <Button type="submit" className='button primary'>
              Spremi promjene
            </Button>
          </form>
        </Modal.Body>
      </Modal>

      <Modal show={readModalShow} onHide={() => setReadModalShow(false)} className="modal">
        <Modal.Header>
          <Modal.Title className='modal-form-volonter'>Podaci</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form className='modal-form-volonter'>
            <label>Ime:</label>
            <input type="text" value={ime} readOnly />

            <label>Dob:</label>
            <input type="text" value={dob} readOnly />

            <label>E-mail:</label>
            <input type="email" value={email} readOnly />

            <label>Telefon:</label>
            <input type="tel" value={telefon} readOnly />

            <label>Grad:</label>
            <input type="text" value={grad} readOnly />

            <label>Posao:</label>
            <input type="text" value={vrstaVolontiranja} readOnly />

          </form>
        </Modal.Body>
      </Modal>
      
      <Modal show={addModalShow} onHide={() => setAddModalShow(false)} className="modal" >
        <Modal.Header>
          <Modal.Title className="modal-title">Dodaj novu aktivnost</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={handleAddSubmit} className='modal-form-volonter'>
            <label>Ime:</label>
            <input type="text" value={ime} onChange={(e) => setIme(e.target.value)} />

            <label>Dob:</label>
            <input type="text" value={dob} onChange={(e) => setDob(e.target.value)} />

            <label>E-mail:</label>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />

            <label>Telefon:</label>
            <input type="tel" value={telefon} onChange={(e) => setTelefon(e.target.value)} />

            <select value={grad} onChange={(e) => setGrad(e.target.value)}>
              <option value="">Izaberite grad</option>
              {gradovi.map(city => (
                <option key={city.id} value={city.grad}>{city.grad}</option>
              ))}
            </select>

            <select value={vrstaVolontiranja} onChange={(e) => setVrstaVolontiranja(e.target.value)}>
              <option value="">Izaberite posao</option>
              {poslovi.map(job => (
                <option key={job.id} value={job.posao}>{job.posao}</option>
              ))}
            </select>



            <Button type="submit" className='button primary sign'>
              Dodaj aktivnost
            </Button>
          </form>
        </Modal.Body>
      </Modal>
      <Footer />
    </div>
  )
}

export default Volontiranje;
