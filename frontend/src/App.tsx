import React, { useState, useEffect } from "react";
import axios from "axios";
import { io, Socket } from "socket.io-client";

type Material = {
  _id: string;
  name: string;
  type: string;
  description: string;
  impactScore: string;
  priceCategory: string;
  source: string;
  image: string;
};

type User = {
  _id?: string;
  name: string;
  email: string;
  measurements: string;
  savedDesigns: string[];
  sustainabilityScore: number;
  rewards: number;
};

const apiBase = "http://localhost:5000/api";

function App() {
  const [screen, setScreen] = useState("home");
  const [materials, setMaterials] = useState<Material[]>([]);
  const [user, setUser] = useState<User | null>(null);
  const [suggestion, setSuggestion] = useState("");
  const [socket, setSocket] = useState<Socket | null>(null);

  useEffect(() => {
    axios.get(`${apiBase}/materials`).then(res => setMaterials(res.data));
    axios.post(`${apiBase}/users`, {
      name: "Eco Designer",
      email: "eco@tailor.com",
      measurements: "36-28-38",
      savedDesigns: [],
      sustainabilityScore: 82,
      rewards: 5
    }).then(res => setUser(res.data));
    const s = io("http://localhost:5000");
    setSocket(s);
    s.on("tryon-suggestion", data => setSuggestion(data.suggestion));
    return () => { s.disconnect(); };
  }, []);

  const requestSuggestion = () => {
    if (socket) socket.emit("tryon-request", { userId: user?._id });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="flex justify-center gap-6 py-6 bg-green-800 text-white font-semibold">
        <button onClick={() => setScreen("home")}>Home</button>
        <button onClick={() => setScreen("tryon")}>Try-On</button>
        <button onClick={() => setScreen("materials")}>Materials</button>
        <button onClick={() => setScreen("profile")}>Profile</button>
      </nav>
      <main className="max-w-3xl mx-auto my-8 bg-white rounded shadow p-8">
        {screen === "home" && (
          <>
            <h1 className="text-3xl font-bold mb-4">Welcome to EcoTailor!</h1>
            <p className="mb-6">Hello, Eco Designer 👋</p>
            <h2 className="text-xl font-semibold mb-2">Featured Eco-friendly Designs</h2>
            <div className="flex gap-6 mb-6">
              <div>
                <img className="w-32 rounded" src="https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=facearea&w=200&q=80" alt="Eco Dress"/>
                <div>Bamboo Silk Dress</div>
              </div>
              <div>
                <img className="w-32 rounded" src="https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=facearea&w=200&q=80" alt="Eco Shirt"/>
                <div>Organic Cotton Shirt</div>
              </div>
            </div>
            <button className="bg-green-700 text-white px-4 py-2 rounded" onClick={() => alert("AI Style Assistant coming soon!")}>
              AI Style Assistant
            </button>
          </>
        )}
        {screen === "tryon" && (
          <>
            <h1 className="text-2xl font-bold mb-4">Virtual Try-On</h1>
            <div className="bg-gray-100 p-4 rounded mb-4 flex flex-col items-center">
              <p>[ AR Camera View Placeholder ]</p>
              <img src="https://via.placeholder.com/200x300?text=Your+Outfit+Here" alt="AR Overlay" className="my-2"/>
            </div>
            <button className="bg-green-700 text-white px-4 py-2 rounded" onClick={requestSuggestion}>
              Get Style Suggestion
            </button>
            {suggestion && <div className="mt-4 text-green-800">{suggestion}</div>}
          </>
        )}
        {screen === "materials" && (
          <>
            <h1 className="text-2xl font-bold mb-4">Material Selection</h1>
            <div className="flex flex-wrap gap-6">
              {materials.map(mat => (
                <div key={mat._id} className="bg-green-50 rounded p-4 w-52">
                  <img className="w-20 h-20 object-cover rounded mb-2" src={mat.image || "https://via.placeholder.com/100"} alt={mat.name}/>
                  <div className="font-bold">{mat.name}</div>
                  <div className="text-sm">Type: {mat.type}</div>
                  <div className="text-sm">Impact: {mat.impactScore}</div>
                  <div className="text-sm">Price: {mat.priceCategory}</div>
                  <button className="mt-2 bg-green-600 text-white px-2 py-1 rounded text-sm"
                    onClick={() => alert(`Added ${mat.name} to design!`)}>Add to Design</button>
                </div>
              ))}
            </div>
          </>
        )}
        {screen === "profile" && user && (
          <>
            <h1 className="text-2xl font-bold mb-4">User Profile</h1>
            <div className="mb-6">
              <div><b>Name:</b> {user.name}</div>
              <div><b>Email:</b> {user.email}</div>
              <div><b>Measurements:</b> {user.measurements}</div>
              <div><b>Sustainability Score:</b> {user.sustainabilityScore}</div>
              <div><b>Rewards:</b> {user.rewards}</div>
            </div>
            <h3 className="text-lg font-semibold">Saved Designs</h3>
            <ul className="list-disc ml-6">
              {user.savedDesigns?.map((d,i) => <li key={i}>{d}</li>)}
            </ul>
          </>
        )}
      </main>
    </div>
  );
}

export default App;