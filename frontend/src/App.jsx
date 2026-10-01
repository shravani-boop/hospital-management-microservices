import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [patients, setPatients] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [appointments, setAppointments] = useState([]);

  const [patient, setPatient] = useState({
    name: "",
    age: "",
    disease: "",
  });

  const [doctor, setDoctor] = useState({
    name: "",
    specialization: "",
  });

  const [appointment, setAppointment] = useState({
    patientId: "",
    doctorId: "",
    date: "",
    time: "",
    status: "Scheduled",
  });

  const patientAPI = "/api/patients";
  const doctorAPI = "/api/doctors";
  const appointmentAPI = "/api/appointments";;

  const loadData = async () => {
    try {
      const patientsResponse = await fetch(`${patientAPI}/patients`);
      const doctorsResponse = await fetch(`${doctorAPI}/doctors`);
      const appointmentsResponse = await fetch(
        `${appointmentAPI}/appointments`
      );

      setPatients(await patientsResponse.json());
      setDoctors(await doctorsResponse.json());
      setAppointments(await appointmentsResponse.json());
    } catch (error) {
      console.error("Error loading data:", error);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const addPatient = async (e) => {
    e.preventDefault();

    await fetch(`${patientAPI}/patients`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ...patient,
        age: Number(patient.age),
      }),
    });

    setPatient({
      name: "",
      age: "",
      disease: "",
    });

    loadData();
  };

  const addDoctor = async (e) => {
    e.preventDefault();

    await fetch(`${doctorAPI}/doctors`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(doctor),
    });

    setDoctor({
      name: "",
      specialization: "",
    });

    loadData();
  };

  const addAppointment = async (e) => {
    e.preventDefault();

    await fetch(`${appointmentAPI}/appointments`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(appointment),
    });

    setAppointment({
      patientId: "",
      doctorId: "",
      date: "",
      time: "",
      status: "Scheduled",
    });

    loadData();
  };

  return (
    <div className="container">
      <h1>🏥 Hospital Management System</h1>

      <p className="subtitle">
        Microservices-based Hospital Management Dashboard
      </p>

      <div className="cards">
        <div className="card">
          <h2>👥 Patients</h2>
          <h3>{patients.length}</h3>
        </div>

        <div className="card">
          <h2>👨‍⚕️ Doctors</h2>
          <h3>{doctors.length}</h3>
        </div>

        <div className="card">
          <h2>📅 Appointments</h2>
          <h3>{appointments.length}</h3>
        </div>
      </div>

      <section>
        <h2>Patient Management</h2>

        <form onSubmit={addPatient}>
          <input
            placeholder="Patient Name"
            value={patient.name}
            onChange={(e) =>
              setPatient({
                ...patient,
                name: e.target.value,
              })
            }
            required
          />

          <input
            type="number"
            placeholder="Age"
            value={patient.age}
            onChange={(e) =>
              setPatient({
                ...patient,
                age: e.target.value,
              })
            }
            required
          />

          <input
            placeholder="Disease"
            value={patient.disease}
            onChange={(e) =>
              setPatient({
                ...patient,
                disease: e.target.value,
              })
            }
            required
          />

          <button type="submit">Add Patient</button>
        </form>

        <div className="list">
          {patients.map((p) => (
            <div className="item" key={p._id}>
              <strong>{p.name}</strong> — Age: {p.age} — {p.disease}
            </div>
          ))}
        </div>
      </section>

      <section>
        <h2>Doctor Management</h2>

        <form onSubmit={addDoctor}>
          <input
            placeholder="Doctor Name"
            value={doctor.name}
            onChange={(e) =>
              setDoctor({
                ...doctor,
                name: e.target.value,
              })
            }
            required
          />

          <input
            placeholder="Specialization"
            value={doctor.specialization}
            onChange={(e) =>
              setDoctor({
                ...doctor,
                specialization: e.target.value,
              })
            }
            required
          />

          <button type="submit">Add Doctor</button>
        </form>

        <div className="list">
          {doctors.map((d) => (
            <div className="item" key={d._id}>
              <strong>{d.name}</strong> — {d.specialization}
            </div>
          ))}
        </div>
      </section>

      <section>
        <h2>Appointment Management</h2>

        <form onSubmit={addAppointment}>
          <input
            placeholder="Patient ID"
            value={appointment.patientId}
            onChange={(e) =>
              setAppointment({
                ...appointment,
                patientId: e.target.value,
              })
            }
            required
          />

          <input
            placeholder="Doctor ID"
            value={appointment.doctorId}
            onChange={(e) =>
              setAppointment({
                ...appointment,
                doctorId: e.target.value,
              })
            }
            required
          />

          <input
            type="date"
            value={appointment.date}
            onChange={(e) =>
              setAppointment({
                ...appointment,
                date: e.target.value,
              })
            }
            required
          />

          <input
            type="time"
            value={appointment.time}
            onChange={(e) =>
              setAppointment({
                ...appointment,
                time: e.target.value,
              })
            }
            required
          />

          <button type="submit">Book Appointment</button>
        </form>

        <div className="list">
          {appointments.map((a) => (
            <div className="item" key={a._id}>
              Patient: {a.patientId} | Doctor: {a.doctorId} | {a.date}{" "}
              {a.time} | {a.status}
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

export default App;
