"use client"; 

import { useState, useEffect } from "react";
import { db } from "../lib/firebase";
import {
  collection,
  addDoc,
  getDocs,
  query,
  orderBy,
  serverTimestamp,
} from "firebase/firestore";

export default function Home() {
  const [mood, setMood] = useState("😀");
  const [note, setNote] = useState("");
  const [entries, setEntries] = useState([]);

  // Fetch moods from Firestore on load
  useEffect(() => {
    fetchMoods();
  }, []);

  async function fetchMoods() {
    const moodsRef = collection(db, "moods");
    const q = query(moodsRef, orderBy("createdAt", "desc"));
    const snapshot = await getDocs(q);
    setEntries(snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
  }

  async function addMood() {
    if (!mood) return;
    const moodsRef = collection(db, "moods");
    await addDoc(moodsRef, { mood, note, createdAt: serverTimestamp() });
    setNote("");
    fetchMoods();
  }

  return (
    <div style={{ padding: "2rem", maxWidth: "600px", margin: "0 auto" }}>
      <h1 style={{ textAlign: "center" }}>Mood Tracker</h1>

      <div style={{ display: "flex", gap: "0.5rem", marginBottom: "1rem" }}>
        <select value={mood} onChange={(e) => setMood(e.target.value)}>
          <option>😀</option>
          <option>😐</option>
          <option>😞</option>
        </select>
        <input
          type="text"
          placeholder="Optional note"
          value={note}
          onChange={(e) => setNote(e.target.value)}
        />
        <button onClick={addMood}>Add Mood</button>
      </div>

      <ul>
        {entries.map((e) => (
          <li
            key={e.id}
            style={{
              border: "1px solid #ccc",
              padding: "0.5rem",
              marginBottom: "0.5rem",
            }}
          >
            <span>{e.mood} — {e.note || "No note"}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
