import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { io } from "socket.io-client";

const apiBase = "http://localhost:5000/api";

function App() {
  const [screen, setScreen] = useState('home');
  const [materials, setMaterials] = useState([]);
  const [user, setUser] = useState(null);
  const [suggestion, setSuggestion] = useState('');
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    axios.get(`${apiBase}/materials`).then(res => setMaterials(res.data));
    // For demo, create/fetch a user
    axios.post(`${apiBase}/users`, {
      name: "Eco Designer",
      email: "eco@tailor.com",
      measurements: "36-28-38",
      savedDesigns: [],
      sustainabilityScore: 82,
      rewards: 5
    }).then(res => setUser(res.data));

    // Setup socket.io
    const s = io("http://localhost:5000");
    setSocket(s);

    s.on('tryon-suggestion', data => setSuggestion(data.suggestion));

    return () => s.disconnect();
  }, []);

  const requestSuggestion = () => {
    if (socket) {
      socket.emit('tryon-request', { userId: user?._id });
    }
  };

  return (
    <div>
      <nav>
        <ul>
          <li><button onClick={() => setScreen('home')}>Home</button></li>
          <li><button onClick={() => setScreen('tryon')}>Try-On</button></li>
          <li><button onClick={() => setScreen('materials')}>Materials</button></li>
          <li><button onClick={() => setScreen('profile')}>Profile</button></li>
        </ul>
      </nav>
      {screen === "home" && (
        <section>
          <h1>Welcome to EcoTailor!</h1>
          <p>Hello, Eco Designer 👋</p>
          <div>
            <h2>Featured Eco-friendly Designs</h2>
            <div style={{display:'flex',gap:'1em'}}>
              <div>
                <img src="https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=facearea&w=200&q=80" alt="Eco Dress" width="100"/>
                <div>Bamboo Silk Dress</div>
              </div>
              <div>
                <img src="https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=facearea&w=200&q=80" alt="Eco Shirt" width="100"/>
                <div>Organic Cotton Shirt</div>
              </div>
            </div>
          </div>
          <button onClick={() => alert('AI Style Assistant coming soon!')}>AI Style Assistant</button>
        </section>
      )}
      {screen === "tryon" && (
        <section>
          <h1>Virtual Try-On</h1>
          <div style={{background:'#eef',padding:'1em',display:'inline-block',margin:'1em 0'}}>
            <p>[ AR Camera View Placeholder ]</p>
            <img src="https://via.placeholder.com/200x300?text=Your+Outfit+Here" alt="AR Overlay" />
          </div>
          <div>
            <button onClick={requestSuggestion}>Get Style Suggestion</button>
            {suggestion && <div style={{marginTop:'1em'}}>Suggestion: {suggestion}</div>}
          </div>
        </section>
      )}
      {screen === "materials" && (
        <section>
          <h1>Material Selection</h1>
          <div style={{display:'flex',gap:'1em',flexWrap:'wrap'}}>
            {materials.map(mat => (
              <div key={mat._id} style={{background:'#e1f5e1',padding:'1em',borderRadius:'8px',width:'180px'}}>
                <img src={mat.image || "https://via.placeholder.com/100"} alt={mat.name} width="100"/>
                <div><b>{mat.name}</b></div>
                <div>Type: {mat.type}</div>
                <div>Impact: {mat.impactScore}</div>
                <div>Price: {mat.priceCategory}</div>
                <div>
                  <button onClick={() => alert(`Added ${mat.name} to design!`)}>Add to Design</button>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}
      {screen === "profile" && user && (
        <section>
          <h1>User Profile</h1>
          <div>
            <div>Name: {user.name}</div>
            <div>Email: {user.email}</div>
            <div>Measurements: {user.measurements}</div>
            <div>Sustainability Score: {user.sustainabilityScore}</div>
            <div>Rewards: {user.rewards}</div>
          </div>
          <div>
            <h3>Saved Designs</h3>
            <ul>
              {user.savedDesigns?.map((d,i) => <li key={i}>{d}</li>)}
            </ul>
          </div>
        </section>
      )}
    </div>
  );
}

export default App;