import { useState } from "react";
import { db } from "../firebase/firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { toast } from "react-toastify";
import styles from "../styles/AdForm.module.css";

export default function AdForm() {
  const [form, setForm] = useState({
    title: "",
    price: "",
    description: "",
    category: "Электроника",
    image: "" 
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.title || !form.price) return toast.error("Толук толтур!");

    try {
      await addDoc(collection(db, "ads"), {
        ...form,
        price: Number(form.price),
        createdAt: serverTimestamp(),
      });
      toast.success("Жарыя кошулду!");
      setForm({ title: "", price: "", description: "", category: "Электроника", image: "" });
    } catch (err) {
      toast.error("Ката кетти!");
    }
  };

  return (
    <div className={styles.formWrapper}>
      <form onSubmit={handleSubmit} className={styles.form}>
        <input className={styles.input} placeholder="Аталышы" value={form.title} onChange={(e)=>setForm({...form, title:e.target.value})} />
        <input className={styles.input} type="number" placeholder="Баа" value={form.price} onChange={(e)=>setForm({...form, price:e.target.value})} />
        <input className={styles.input} placeholder="Сүрөт URL (мис: https://...)" value={form.image} onChange={(e)=>setForm({...form, image:e.target.value})} />
        <textarea className={styles.textarea} placeholder="Сүрөттөмө" value={form.description} onChange={(e)=>setForm({...form, description:e.target.value})} />
        <select className={styles.select} value={form.category} onChange={(e)=>setForm({...form, category:e.target.value})}>
          <option>Электроника</option>
          <option>Кийим</option>
          <option>Авто</option>
          <option>Башка</option>
        </select>
        <button className={styles.submitBtn}>+ Жарыя кошуу</button>
      </form>
    </div>
  );
}