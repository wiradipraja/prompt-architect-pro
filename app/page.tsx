// app/page.tsx
"use client";

import { useState } from 'react';

const SteppedSlider = ({ label, options, explanation, value, onChange }: any) => (
  <div className="mb-6">
    <label className="block text-sm font-medium text-gray-300">{label}</label>
    <p className="text-xs text-gray-500 mb-2">{explanation}</p>
    <select 
      value={value} 
      onChange={e => onChange(e.target.value)} 
      className="w-full bg-gray-700 border border-gray-600 rounded-md p-2 text-white focus:ring-blue-500 focus:border-blue-500"
    >
      {options.map((opt: string) => <option key={opt} value={opt}>{opt}</option>)}
    </select>
  </div>
);

export default function ArchitectPro() {
  const [subject, setSubject] = useState("seorang astronot menemukan taman rahasia di bulan");
  const [characterDetails, setCharacterDetails] = useState("mengenakan helm kaca dengan pantulan bintang, baju antariksa putih dengan emblem bunga mawar");
  const [style, setStyle] = useState("Sinematik");
  const [angle, setAngle] = useState("Low Angle");
  const [dialogue, setDialogue] = useState("Aku tidak percaya ini... setelah sekian lama.");
  const [negativePrompt, setNegativePrompt] = useState("buram, kualitas rendah, kartun");

  const handleGenerate = () => {
    const finalPrompt = `${characterDetails}, ${subject}, dengan gaya ${style}, dilihat dari sudut pandang ${angle}. --no ${negativePrompt}`;
    const finalVideoPrompt = `VIDEO: ${finalPrompt} | DIALOG: "${dialogue}"`;

    console.log("--- PROMPT TEXT-TO-IMAGE ---", finalPrompt);
    console.log("--- PROMPT TEXT-TO-VIDEO ---", finalVideoPrompt);

    alert("Prompt telah dibuat! Cek console log (F12) untuk melihat hasilnya.");
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-8 bg-gray-900 text-white">
      <div className="w-full max-w-4xl bg-gray-800 p-8 rounded-xl shadow-2xl shadow-blue-500/10">
        <h1 className="text-4xl font-bold text-center mb-2">Prompt Architect Pro</h1>
        <p className="text-center text-gray-400 mb-8">Bangun Prompt Sempurna untuk Gambar dan Video Anda</p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-4">
            <div>
              <label htmlFor="subject" className="block text-lg font-semibold text-gray-200 mb-2">1. Subjek & Aksi Utama</label>
              <textarea id="subject" value={subject} onChange={(e) => setSubject(e.target.value)} className="w-full h-24 bg-gray-700 border border-gray-600 rounded-md p-3 text-white focus:ring-2 focus:ring-blue-500" placeholder="Apa inti dari adegan ini?"/>
            </div>
            <div>
              <label htmlFor="character" className="block text-lg font-semibold text-gray-200 mb-2">2. Detail Karakter</label>
              <textarea id="character" value={characterDetails} onChange={(e) => setCharacterDetails(e.target.value)} className="w-full h-32 bg-gray-700 border border-gray-600 rounded-md p-3 text-white focus:ring-2 focus:ring-blue-500" placeholder="Jelaskan karakter secara detail..."/>
            </div>
             <div>
              <label htmlFor="dialogue" className="block text-lg font-semibold text-gray-200 mb-2">3. Naskah Dialog (untuk Video)</label>
              <textarea id="dialogue" value={dialogue} onChange={(e) => setDialogue(e.target.value)} className="w-full h-20 bg-gray-700 border border-gray-600 rounded-md p-3 text-white focus:ring-2 focus:ring-blue-500" placeholder="Tuliskan dialog yang akan diucapkan..."/>
            </div>
          </div>
          
          <div>
            <h2 className="text-lg font-semibold text-gray-200 mb-2">4. Pengaturan Teknis & Gaya</h2>
            <SteppedSlider label="Gaya & Mood" value={style} onChange={setStyle} options={["Fotorealistis", "Sinematik", "Gaya Anime", "Lukisan Minyak", "Surealis"]} explanation="Pilih nuansa artistik dan emosional dari output." />
            <SteppedSlider label="Sudut Kamera (Angle)" value={angle} onChange={setAngle} options={["High Angle", "Eye-Level", "Low Angle", "Dutch Angle", "Top-down View"]} explanation="Pilih sudut pandang kamera untuk menentukan perspektif."/>
             <div>
              <label htmlFor="negative" className="block text-sm font-medium text-gray-300">Prompt Negatif</label>
              <p className="text-xs text-gray-500 mb-2">Sebutkan hal-hal yang ingin Anda hindari.</p>
              <input id="negative" type="text" value={negativePrompt} onChange={(e) => setNegativePrompt(e.target.value)} className="w-full bg-gray-700 border border-gray-600 rounded-md p-2 text-white focus:ring-blue-500 focus:border-blue-500" placeholder="contoh: buram, teks, watermark" />
            </div>
          </div>
        </div>

        <div className="mt-10 text-center">
            <button onClick={handleGenerate} className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-10 rounded-lg text-lg transition-transform transform hover:scale-105">
                Buat Prompt
            </button>
        </div>
      </div>
    </main>
  );
}
