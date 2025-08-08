// app/page.tsx
"use client";

import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
// Impor ikon-ikon baru
import { Image as ImageIcon, Video as VideoIcon, PenSquare, Camera, Palette, Bot, Copy, Check, Sparkles, Sun, Film, Wind, Smile, User, Shirt, Upload } from "lucide-react";

export default function ArchitectPro() {
  const [activeTab, setActiveTab] = useState("image");

  // === STATE UNTUK INPUT ===
  // State Umum
  const [subject, setSubject] = useState("berdiri di atas tebing menghadap lautan badai");
  const [style, setStyle] = useState("Sinematik");
  const [angle, setAngle] = useState("Low Angle Shot");
  const [negativePrompt, setNegativePrompt] = useState("buram, kualitas rendah, kartun, teks, watermark");

  // State Deskripsi Karakter
  const [characterDetails, setCharacterDetails] = useState("seorang ksatria kesepian");
  const [facialDescription, setFacialDescription] = useState(""); // Default kosong = tidak dipilih
  const [ageRange, setAgeRange] = useState("Dewasa Muda (20-30)");
  const [outfit, setOutfit] = useState(""); // Default kosong = tidak dipilih
  const [expression, setExpression] = useState("Netral");

  // State Khusus Gambar
  const [lighting, setLighting] = useState("Dramatic lighting");
  const [detailLevel, setDetailLevel] = useState("Highly detailed");
  
  // State Khusus Video
  const [motion, setMotion] = useState("Static shot");
  const [filmQuality, setFilmQuality] = useState("Shot on 35mm film");
  const [dialogue, setDialogue] = useState("");

  // State untuk Output
  const [generatedPrompt, setGeneratedPrompt] = useState("");
  const [copyButtonText, setCopyButtonText] = useState("Salin");

  const handleGenerate = () => {
    // Merakit prompt dengan cerdas, mengabaikan field yang kosong
    const characterParts = [
      characterDetails,
      facialDescription,
      ageRange,
      expression,
      outfit,
    ].filter(part => part); // .filter(part => part) akan menghapus string kosong

    const basePrompt = [
      characterParts.join(', '),
      subject,
      style,
      angle
    ].filter(part => part).join(', ');

    let finalPrompt = "";
    
    if (activeTab === 'image') {
      const imageSpecificParts = [lighting, detailLevel];
      finalPrompt = [basePrompt, ...imageSpecificParts, `--no ${negativePrompt}`].filter(part => part).join(', ');
    } else { // untuk video
      const videoSpecificParts = [motion, filmQuality];
      const visualPrompt = [basePrompt, ...videoSpecificParts].filter(part => part).join(', ');
      
      if (dialogue) {
        finalPrompt = `VIDEO: ${visualPrompt} --no ${negativePrompt} | DIALOG: "${dialogue}"`;
      } else {
        finalPrompt = `VIDEO: ${visualPrompt} --no ${negativePrompt}`;
      }
    }

    setGeneratedPrompt(finalPrompt);
    setCopyButtonText("Salin");
  };

  const handleCopy = () => {
    if (!generatedPrompt) return;
    navigator.clipboard.writeText(generatedPrompt);
    setCopyButtonText("Tersalin!");
    setTimeout(() => { setCopyButtonText("Salin"); }, 2000);
  };

  const renderFormContent = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8 mt-6">
      {/* Kolom Kiri: Input Kreatif */}
      <div className="space-y-6">
        <div>
          <Label htmlFor="subject" className="text-lg font-semibold flex items-center gap-2 mb-2"><PenSquare className="w-5 h-5" /> Subjek & Aksi Utama</Label>
          <Textarea id="subject" value={subject} onChange={(e) => setSubject(e.target.value)} placeholder="Apa inti dari adegan ini?" className="h-28" />
        </div>
        <div>
          <Label htmlFor="character" className="text-lg font-semibold flex items-center gap-2 mb-2"><Bot className="w-5 h-5" /> Deskripsi Inti Karakter</Label>
          <Textarea id="character" value={characterDetails} onChange={(e) => setCharacterDetails(e.target.value)} placeholder="Jelaskan karakter secara umum..." className="h-24" />
        </div>
        {/* === FIELD KARAKTER BARU === */}
        <div>
          <Label className="text-lg font-semibold flex items-center gap-2 mb-2"><User className="w-5 h-5" /> Etnis & Wajah</Label>
          <Select value={facialDescription} onValueChange={setFacialDescription}><SelectTrigger><SelectValue placeholder="Pilih etnis..." /></SelectTrigger>
            <SelectContent>
              <SelectItem value="">Tidak ada yang dipilih</SelectItem>
              <SelectItem value="Arabian">Arabian</SelectItem>
              <SelectItem value="Asian (East)">Asian (Timur)</SelectItem>
              <SelectItem value="Asian (South)">Asian (Selatan)</SelectItem>
              <SelectItem value="African">African</SelectItem>
              <SelectItem value="Caucasian">Caucasian</SelectItem>
              <SelectItem value="Hispanic/Latino">Hispanic/Latino</SelectItem>
              <SelectItem value="Native American">Native American</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label className="text-lg font-semibold flex items-center gap-2 mb-2"><Smile className="w-5 h-5" /> Ekspresi & Usia</Label>
          <div className="flex gap-4">
            <Select value={expression} onValueChange={setExpression}><SelectTrigger><SelectValue placeholder="Pilih ekspresi..." /></SelectTrigger>
              <SelectContent>
                <SelectItem value="Netral">Netral</SelectItem>
                <SelectItem value="Senyum bahagia">Senyum bahagia</SelectItem>
                <SelectItem value="Tertawa">Tertawa</SelectItem>
                <SelectItem value="Sedih, menangis">Sedih, menangis</SelectItem>
                <SelectItem value="Marah, berteriak">Marah, berteriak</SelectItem>
                <SelectItem value="Terkejut">Terkejut</SelectItem>
                <SelectItem value="Fokus, serius">Fokus, serius</SelectItem>
              </SelectContent>
            </Select>
            <Select value={ageRange} onValueChange={setAgeRange}><SelectTrigger><SelectValue placeholder="Pilih usia..." /></SelectTrigger>
              <SelectContent>
                <SelectItem value="Bayi">Bayi (0-2 thn)</SelectItem>
                <SelectItem value="Anak-anak">Anak-anak (3-12 thn)</SelectItem>
                <SelectItem value="Remaja">Remaja (13-19 thn)</SelectItem>
                <SelectItem value="Dewasa Muda">Dewasa Muda (20-30 thn)</SelectItem>
                <SelectItem value="Dewasa">Dewasa (31-50 thn)</SelectItem>
                <SelectItem value="Paruh Baya">Paruh Baya (51-65 thn)</SelectItem>
                <SelectItem value="Lansia">Lansia (65+ thn)</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        <div>
          <Label className="text-lg font-semibold flex items-center gap-2 mb-2"><Shirt className="w-5 h-5" /> Pakaian (Outfit)</Label>
          <Select value={outfit} onValueChange={setOutfit}><SelectTrigger><SelectValue placeholder="Pilih pakaian..." /></SelectTrigger>
            <SelectContent>
              <SelectItem value="">Tidak ada yang dipilih</SelectItem>
              <SelectItem value="Pakaian formal, jas, gaun">Pakaian Formal (Jas, Gaun)</SelectItem>
              <SelectItem value="Pakaian kasual, t-shirt, jeans">Pakaian Kasual (T-shirt, Jeans)</SelectItem>
              <SelectItem value="Pakaian olahraga">Pakaian Olahraga</SelectItem>
              <SelectItem value="Pakaian seksi, lingerie">Pakaian Seksi (Lingerie)</SelectItem>
              <SelectItem value="Baju zirah abad pertengahan">Baju Zirah Abad Pertengahan</SelectItem>
              <SelectItem value="Pakaian fiksi ilmiah, futuristik">Pakaian Fiksi Ilmiah</SelectItem>
              <SelectItem value="Pakaian vintage, retro">Pakaian Vintage / Retro</SelectItem>
              <SelectItem value="Pakaian gotik, punk">Pakaian Gotik / Punk</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      
      {/* Kolom Kanan: Pengaturan Teknis */}
      <div className="space-y-6">
        {/* ... (Konten kolom kanan yang sudah ada + tambahan baru) ... */}
        {/* ... (Gaya & Mood, Sudut Kamera) ... */}
        {/* ... (Render kondisional untuk Gambar & Video) ... */}
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
              <SelectItem value="Eye-Level Shot">Eye-Level Shot (Sejajar Mata)</SelectItem>
              <SelectItem value="Low Angle Shot">Low Angle Shot (Dari Bawah)</SelectItem>
              <SelectItem value="High Angle Shot">High Angle Shot (Dari Atas)</SelectItem>
              <SelectItem value="POV">POV (Point of View)</SelectItem>
              <SelectItem value="Selfie Shot">Selfie Foto / Vlogger</SelectItem>
              <SelectItem value="Dutch Angle">Dutch Angle (Miring)</SelectItem>
              <SelectItem value="Top-down View">Top-down View (Tegak Lurus)</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {activeTab === 'image' && (
          <>
            <div>
              <Label className="text-lg font-semibold flex items-center gap-2 mb-2"><Sun className="w-5 h-5" /> Pencahayaan (Lighting)</Label>
              <Select value={lighting} onValueChange={setLighting}><SelectTrigger><SelectValue placeholder="Pilih pencahayaan..." /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="Cinematic lighting">Cinematic lighting</SelectItem>
                  <SelectItem value="Dramatic lighting">Dramatic lighting</SelectItem>
                  <SelectItem value="Golden hour">Golden hour</SelectItem>
                  <SelectItem value="Soft light">Soft light</SelectItem>
                  <SelectItem value="Neon glow">Neon glow</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label className="text-lg font-semibold flex items-center gap-2 mb-2"><Sparkles className="w-5 h-5" /> Tingkat Detail & Kualitas</Label>
              <Select value={detailLevel} onValueChange={setDetailLevel}><SelectTrigger><SelectValue placeholder="Pilih kualitas..." /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="Highly detailed">Highly detailed</SelectItem>
                  <SelectItem value="8K">8K</SelectItem>
                  <SelectItem value="Sharp focus">Sharp focus</SelectItem>
                  <SelectItem value="Insanely detailed">Insanely detailed</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </>
        )}

        {activeTab === 'video' && (
          <>
            <div>
              <Label className="text-lg font-semibold flex items-center gap-2 mb-2"><Wind className="w-5 h-5" /> Gerakan (Motion)</Label>
              <Select value={motion} onValueChange={setMotion}><SelectTrigger><SelectValue placeholder="Pilih gerakan..." /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="Slow motion">Slow motion</SelectItem>
                  <SelectItem value="Time-lapse">Time-lapse</SelectItem>
                  <SelectItem value="Panning shot">Panning shot</SelectItem>
                  <SelectItem value="Static shot">Static shot</SelectItem>
                  <SelectItem value="Dynamic movement">Dynamic movement</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label className="text-lg font-semibold flex items-center gap-2 mb-2"><Film className="w-5 h-5" /> Kualitas Film</Label>
              <Select value={filmQuality} onValueChange={setFilmQuality}><SelectTrigger><SelectValue placeholder="Pilih kualitas film..." /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="Shot on 35mm film">Shot on 35mm film</SelectItem>
                  <SelectItem value="Found footage style">Found footage style</SelectItem>
                  <SelectItem value="Documentary style">Documentary style</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="dialogue" className="text-lg font-semibold flex items-center gap-2 mb-2"><VideoIcon className="w-5 h-5 text-blue-400" /> Naskah Dialog</Label>
              <Textarea id="dialogue" value={dialogue} onChange={(e) => setDialogue(e.target.value)} placeholder="Tuliskan dialog yang akan diucapkan..." className="h-24" />
            </div>
          </>
        )}
        
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
              <TabsContent value="image">{renderFormContent()}</TabsContent>
              <TabsContent value="video">{renderFormContent()}</TabsContent>
              <div className="mt-10 text-center">
                  <Button size="lg" className="px-12 py-7 text-xl font-bold" onClick={handleGenerate}>
                      Buat Prompt
                  </Button>
              </div>
          </div>
        </Tabs>

        {generatedPrompt && (
          <div className="w-full max-w-6xl mt-8">
            <Label className="text-lg font-semibold">Hasil Prompt:</Label>
            <div className="relative mt-2 p-4 border rounded-lg bg-secondary text-secondary-foreground font-mono">
              <p>{generatedPrompt}</p>
              <Button variant="ghost" size="icon" className="absolute top-2 right-2 h-8 w-8" onClick={handleCopy}>
                {copyButtonText === "Salin" ? (<Copy className="h-4 w-4" />) : (<Check className="h-4 w-4 text-green-400" />)}
              </Button>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
