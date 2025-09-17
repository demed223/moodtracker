import { useEffect, useState } from "react";
import { db } from "../lib/firebase";
import { collection, addDoc, getDocs, query, orderBy, serverTimestamp } from "firebase/firestore";

export default function Home() {
  const [mood, setMood] = useState("😀");
  const [note, setNote] = useState("");
  const [entries, setEntries] = useState([]);

  useEffect(() => {
    fetchMoods();
  }, []);

  async function fetchMoods() {
    const moodsRef = collection(db, "moods");
    const q = query(moodsRef, orderBy("createdAt", "desc"));
    const snapshot = await getDocs(q);
    setEntries(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
  }

  async function addMood() {
    if (!mood) return;
    const moodsRef = collection(db, "moods");
    await addDoc(moodsRef, { mood, note, createdAt: serverTimestamp() });
    setNote("");
    fetchMoods();
  }

  return (
    <div className="flex flex-col items-center min-h-screen p-6">
      <h1 className="text-2xl mb-4">Mood Tracker</h1>

      <div className="mb-4 flex gap-2">
        <select value={mood} onChange={(e) => setMood(e.target.value)} className="border p-2">
          <option>😀</option>
          <option>😐</option>
          <option>😞</option>
        </select>
        <input
          className="border p-2"
          placeholder="Optional note"
          value={note}
          onChange={(e) => setNote(e.target.value)}
        />
        <button className="bg-blue-500 text-white px-4 py-2" onClick={addMood}>
          Add Mood
        </button>
      </div>

      <ul className="w-full max-w-md">
        {entries.map(e => (
          <li key={e.id} className="border p-2 mb-2">
            <span>{e.mood} — {e.note || "No note"}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
