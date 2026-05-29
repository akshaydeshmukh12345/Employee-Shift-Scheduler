import { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [employees, setEmployees] = useState([]);
  const [name, setName] = useState("");
  const [role, setRole] = useState("Developer");
  const [search, setSearch] = useState("");

  useEffect(() => {
    const data = localStorage.getItem("employees");
    if (data) {
      setEmployees(JSON.parse(data));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("employees", JSON.stringify(employees));
  }, [employees]);

  const addEmployee = () => {
    if (!name.trim()) return;

    const newEmployee = {
      id: Date.now(),
      name,
      role,
      shift: "Morning"
    };

    setEmployees([...employees, newEmployee]);
    setName("");
  };

  const deleteEmployee = (id) => {
    setEmployees(employees.filter(emp => emp.id !== id));
  };

  const filteredEmployees = employees.filter(emp =>
    emp.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="container">
      <h1>Employee Shift Scheduler</h1>

      <div className="card">
        <input
          type="text"
          placeholder="Employee Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <select
          value={role}
          onChange={(e) => setRole(e.target.value)}
        >
          <option>Developer</option>
          <option>Tester</option>
          <option>Manager</option>
          <option>Designer</option>
        </select>

        <button onClick={addEmployee}>
          Add Employee
        </button>
      </div>

      <input
        className="search"
        placeholder="Search Employee..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <div className="summary">
        Total Employees: {employees.length}
      </div>

      {filteredEmployees.map(emp => (
        <div key={emp.id} className="employee">
          <div>
            <h3>{emp.name}</h3>
            <p>{emp.role}</p>
            <p>{emp.shift} Shift</p>
          </div>

          <button
            className="delete"
            onClick={() => deleteEmployee(emp.id)}
          >
            Delete
          </button>
        </div>
      ))}
    </div>
  );
}

export default App;
