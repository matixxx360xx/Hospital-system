import { useState, useEffect } from 'react'
import './Dashboard.css'

function Dashboard({ doctor }) {
    const [patients, setPatients] = useState([]);
    const [visits, setVisits] = useState([]);

    useEffect(() => {
        fetch("http://localhost:5000/patients")
            .then(res => res.json())
            .then(data => setPatients(data))
            .catch(err => console.error(err))

        fetch("http://localhost:5000/visits")
            .then(res => res.json())
            .then(data => setVisits(data))
            .catch(err => console.error(err))
    }, [])
    return (
        <>
            <div className='Dashboard'>
                <div className='navbar'>
                    <h1>PULPIT LEKARZA - dr {doctor.first_name} {doctor.last_name}</h1>
                </div>
                <div className='sitebar'>

                </div>
                <div className='addvisits'>
                    <h2>Wszystkie Wizyty</h2>
                    <button>Dodaj Wizytę</button>
                </div>
                <div className='visits'>
                    <div className='navinfo'><span>Imie</span><span>Data</span> <span>Dolegliwości</span></div>
                    {visits.map(visit => {
                        const patient = patients.find(p => p.id === visit.patient_id);

                        return (
                            <div key={visit.id} className="visitCard">
                                <div className="visitRow">
                                    <h3>{patient?.first_name} {patient?.last_name}</h3>
                                    <p className='date'>{visit.visit_date}</p>
                                    <p className='info'>{visit.description}</p>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </>
    )
}

export default Dashboard
