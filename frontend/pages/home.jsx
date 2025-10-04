import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function Home() {
  const [contacts, setContacts] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    axios.get(`/api/contacts?q=${search}`).then(res => setContacts(res.data));
  }, [search]);

  return (
    <div>
      <h1>Contacts</h1>
      <input placeholder="Search..." value={search} onChange={(e) => setSearch(e.target.value)} />
      <Link to="/add">Add Contact</Link>
      <ul>
        {contacts.map(c => (
          <li key={c._id}>
            {c.name} - {c.email} - {c.phone}
            <Link to={`/edit/${c._id}`}>Edit</Link>
            <button onClick={() => axios.delete(`/api/contacts/${c._id}`).then(() => setContacts(contacts.filter(ct => ct._id !== c._id)))}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Home;
