// app/page.tsx
"use client";

import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Image as ImageIcon, Video as VideoIcon, PenSquare, Camera, Palette, Bot, Copy, Check } from "lucide-react";

export default function ArchitectPro() {
  const [activeTab, setActiveTab] = useState("image");

  // State untuk input
  const [subject, setSubject] = useState("seorang astronot menemukan taman rahasia di bulan");
  const [characterDetails, setCharacterDetails] = useState("mengenakan helm kaca dengan pantulan bintang, baju antariksa putih dengan emblem bunga mawar");
  const [style, setStyle] = useState("Sinematik");
  const [angle, setAngle] = useState("Low Angle");
  const [dialogue, setDialogue] = useState("Aku tidak percaya ini... setelah sekian lama.");
  const [negativePrompt, setNegativePrompt] = useState("buram, kualitas rendah, kartun");

  // State BARU untuk output dan tombol salin
  const [generatedPrompt, setGeneratedPrompt] = useState("");
  const [copyButtonText, setCopyButtonText] = useState("Salin");

  const handleGenerate = () => {
    // Merakit prompt
    let finalPrompt = `${characterDetails}, ${subject}, dengan gaya ${style}, dilihat dari sudut pandang ${angle}. --no ${negativePrompt}`;

    if (activeTab === 'video') {
        finalPrompt = `VIDEO: ${finalPrompt} | DIALOG: "${dialogue}"`;
    }

    // Menampilkan hasil di halaman
    setGeneratedPrompt(finalPrompt);
    setCopyButtonText("Salin"); // Reset tombol salin setiap kali generate baru
  };

  const handleCopy = () => {
    if (!generatedPrompt) return;
    navigator.clipboard.writeText(generatedPrompt);
    setCopyButtonText("Tersalin!");
    setTimeout(() => {
      setCopyButtonText("Salin");
    }, 2000); // Reset setelah 2 detik
  };

  const renderFormContent = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8 mt-6">
      {/* ... (Konten form tetap sama seperti sebelumnya, tidak perlu diubah) ... */}
      <div className="space-y-6">
        <div>
          <Label htmlFor="subject" className="text-lg font-semibold flex items-center gap-2 mb-2"><PenSquare className="w-5 h-5" /> Subjek & Aksi Utama</Label>
          <Textarea id="subject" value={subject} onChange={(e) => setSubject(e.target.value)} placeholder="Apa inti dari adegan ini?" className="h-28" />
        </div>
        <div>
          <Label htmlFor="character" className="text-lg font-semibold flex items-center gap-2 mb-2"><Bot className="w-5 h-5" /> Detail Karakter</Label>
          <Textarea id="character" value={characterDetails} onChange={(e) => setCharacterDetails(e.target.value)} placeholder="Jelaskan karakter secara detail..." className="h-36" />
        </div>
        {activeTab === 'video' && (
          <div>
            <Label htmlFor="dialogue" className="text-lg font-semibold flex items-center gap-2 mb-2"><VideoIcon className="w-5 h-5 text-blue-400" /> Naskah Dialog</Label>
            <Textarea id="dialogue" value={dialogue} onChange={(e) => setDialogue(e.target.value)} placeholder="Tuliskan dialog yang akan diucapkan..." className="h-24" />
          </div>
        )}
      </div>
      <div className="space-y-6">
        <div>
          <Label className="text-lg font-semibold flex items-center gap-2 mb-2"><Palette className="w-5 h-5" /> Gaya & Mood</Label>
          <Select value={style} onValueChange={setStyle}><SelectTrigger><SelectValue placeholder="Pilih gaya..." /></SelectTrigger>
            <SelectContent>
              <SelectItem value="Fotorealistis">Fotorealistis</SelectItem>
              <SelectItem value="Sinematik">Sinematik</SelectItem>
              <SelectItem value="Gaya Anime">Gaya Anime</SelectItem>
              <SelectItem value="Lukisan Minyak">Lukisan Minyak</SelectItem>
              <SelectItem value="Surealis">Surealis</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label className="text-lg font-semibold flex items-center gap-2 mb-2"><Camera className="w-5 h-5" /> Sudut Kamera (Angle)</Label>
          <Select value={angle} onValueChange={setAngle}><SelectTrigger><SelectValue placeholder="Pilih sudut pandang..." /></SelectTrigger>
            <SelectContent>
              <SelectItem value="High Angle">High Angle (Dari Atas)</SelectItem>
              <SelectItem value="Eye-Level">Eye-Level (Sejajar Mata)</SelectItem>
              <SelectItem value="Low Angle">Low Angle (Dari Bawah)</SelectItem>
              <SelectItem value="Dutch Angle">Dutch Angle (Miring)</SelectItem>
              <SelectItem value="Top-down View">Top-down View (Tegak Lurus)</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div>
            <Label htmlFor="negative" className="text-base font-medium">Prompt Negatif</Label>
            <Textarea id="negative" value={negativePrompt} onChange={(e) => setNegativePrompt(e.target.value)} placeholder="contoh: buram, teks, watermark" className="h-20" />
        </div>
      </div>
    </div>
  );

  return (
    <main className="min-h-screen p-4 md:p-10 flex flex-col items-center">
      <div className="w-full max-w-6xl">
        <div className="text-center mb-10">
            <h1 className="text-5xl font-bold tracking-tight">Prompt Architect Pro</h1>
            <p className="text-xl text-muted-foreground mt-2">Bangun Prompt Sempurna untuk Gambar dan Video Anda</p>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-2 max-w-md mx-auto">
            <TabsTrigger value="image" className="py-3 text-lg"><ImageIcon className="w-5 h-5 mr-2"/> Text-to-Image</TabsTrigger>
            <TabsTrigger value="video" className="py-3 text-lg"><VideoIcon className="w-5 h-5 mr-2"/> Text-to-Video</TabsTrigger>
          </TabsList>

          <div className="bg-card mt-6 p-8 rounded-2xl border">
              {renderFormContent()}
              <div className="mt-10 text-center">
                  <Button size="lg" className="px-12 py-7 text-xl font-bold" onClick={handleGenerate}>
                      Buat Prompt
                  </Button>
              </div>
          </div>
        </Tabs>

        {/* === AREA OUTPUT BARU === */}
        {generatedPrompt && (
          <div className="w-full max-w-6xl mt-8">
            <Label className="text-lg font-semibold">Hasil Prompt:</Label>
            <div className="relative mt-2 p-4 border rounded-lg bg-secondary text-secondary-foreground font-mono">
              <p>{generatedPrompt}</p>
              <Button 
                variant="ghost" 
                size="icon" 
                className="absolute top-2 right-2 h-8 w-8"
                onClick={handleCopy}
              >
                {copyButtonText === "Salin" ? (
                  <Copy className="h-4 w-4" />
                ) : (
                  <Check className="h-4 w-4 text-green-400" />
                )}
              </Button>
            </div>
          </div>
        )}
        {/* === AKHIR AREA OUTPUT BARU === */}

      </div>
    </main>
  );
}
