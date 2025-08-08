// app/page.tsx
"use client";

import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Image as ImageIcon, Video as VideoIcon, PenSquare, Camera, Palette, Bot, Copy, Check, Sparkles, Sun, Film, Wind, Smile, User, Shirt } from "lucide-react";

// Hook kecil untuk memastikan client sudah siap sebelum render konten dinamis
const useIsClient = () => {
  const [isClient, setIsClient] = useState(false);
  useEffect(() => {
    setIsClient(true);
  }, []);
  return isClient;
};

export default function ArchitectPro() {
  const isClient = useIsClient(); // Gunakan hook

  const [activeTab, setActiveTab] = useState("image");

  // State Umum
  const [subject, setSubject] = useState("berdiri di atas tebing menghadap lautan badai");
  const [style, setStyle] = useState("Photography");
  const [angle, setAngle] = useState("Low Angle Shot");
  const [negativePrompt, setNegativePrompt] = useState("buram, kualitas rendah, kartun, teks, watermark");

  // State Deskripsi Karakter
  const [characterDetails, setCharacterDetails] = useState("seorang ksatria kesepian");
  const [facialDescription, setFacialDescription] = useState("");
  const [ageRange, setAgeRange] = useState("Dewasa Muda");
  const [outfit, setOutfit] = useState("");
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
    const characterParts = [characterDetails, facialDescription, ageRange, expression, outfit].filter(Boolean);
    const basePromptParts = [characterParts.join(', '), subject, style, angle].filter(Boolean);

    let finalPrompt = "";
    
    if (activeTab === 'image') {
      const imageSpecificParts = [lighting, detailLevel];
      const allParts = [...basePromptParts, ...imageSpecificParts];
      finalPrompt = `${allParts.join(', ')} --no ${negativePrompt}`;
    } else {
      const videoSpecificParts = [motion, filmQuality];
      const visualParts = [...basePromptParts, ...videoSpecificParts];
      const visualPrompt = visualParts.join(', ');
      
      finalPrompt = dialogue 
        ? `VIDEO: ${visualPrompt} --no ${negativePrompt} | DIALOG: "${dialogue}"`
        : `VIDEO: ${visualPrompt} --no ${negativePrompt}`;
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

  // Selama server-side rendering atau sebelum client siap, tampilkan UI yang aman dan tidak crash
  if (!isClient) {
    return (
      <main className="min-h-screen p-4 md:p-10 flex flex-col items-center">
         <div className="w-full max-w-6xl">
            <div className="text-center mb-10">
              <h1 className="text-5xl font-bold tracking-tight">Prompt Architect Pro</h1>
              <p className="text-xl text-muted-foreground mt-2">Bangun Prompt Sempurna untuk Gambar dan Video Anda</p>
            </div>
         </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen p-4 md:p-10 flex flex-col items-center">
      <div className="w-full max-w-6xl">
        <div className="text-center mb-10">
          <h1 className="text-5xl font-bold tracking-tight">Prompt Architect Pro</h1>
          <p className="text-xl text-muted-foreground mt-2">Bangun Prompt Sempurna untuk Gambar dan Video Anda</p>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-2 max-w-md mx-auto">
            <TabsTrigger value="image" className="py-3 text-lg"><ImageIcon className="w-5 h-5 mr-2" /> Text-to-Image</TabsTrigger>
            <TabsTrigger value="video" className="py-3 text-lg"><VideoIcon className="w-5 h-5 mr-2" /> Text-to-Video</TabsTrigger>
          </TabsList>

          <div className="bg-card mt-6 p-8 rounded-2xl border">
            {/* KONTEN TAB GAMBAR (Ditulis Langsung) */}
            <TabsContent value="image" className="mt-0">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8">
                {/* Kolom Kiri Gambar */}
                <div className="space-y-6">
                   <div><Label htmlFor="subject-img" className="text-lg font-semibold flex items-center gap-2 mb-2"><PenSquare className="w-5 h-5" /> Subjek & Aksi Utama</Label><Textarea id="subject-img" value={subject} onChange={(e) => setSubject(e.target.value)} placeholder="Apa inti dari adegan ini?" className="h-28" /></div>
                   <div><Label htmlFor="character-img" className="text-lg font-semibold flex items-center gap-2 mb-2"><Bot className="w-5 h-5" /> Deskripsi Inti Karakter</Label><Textarea id="character-img" value={characterDetails} onChange={(e) => setCharacterDetails(e.target.value)} placeholder="Jelaskan karakter secara umum..." className="h-24" /></div>
                   <div><Label className="text-lg font-semibold flex items-center gap-2 mb-2"><User className="w-5 h-5" /> Etnis & Wajah</Label><Select value={facialDescription} onValueChange={setFacialDescription}><SelectTrigger><SelectValue placeholder="Pilih etnis... (opsional)" /></SelectTrigger><SelectContent><SelectItem value="">Tidak ada</SelectItem><SelectItem value="Arabian">Arabian</SelectItem><SelectItem value="Asian (East)">Asian (Timur)</SelectItem><SelectItem value="Asian (South)">Asian (Selatan)</SelectItem><SelectItem value="African">African</SelectItem><SelectItem value="Caucasian">Caucasian</SelectItem><SelectItem value="Hispanic/Latino">Hispanic/Latino</SelectItem><SelectItem value="Native American">Native American</SelectItem></SelectContent></Select></div>
                   <div><Label className="text-lg font-semibold flex items-center gap-2 mb-2"><Smile className="w-5 h-5" /> Ekspresi & Usia</Label><div className="flex gap-4"><Select value={expression} onValueChange={setExpression}><SelectTrigger><SelectValue placeholder="Pilih ekspresi..." /></SelectTrigger><SelectContent><SelectItem value="Netral">Netral</SelectItem><SelectItem value="Senyum bahagia">Senyum</SelectItem><SelectItem value="Tertawa">Tertawa</SelectItem><SelectItem value="Sedih, menangis">Sedih</SelectItem><SelectItem value="Marah, berteriak">Marah</SelectItem><SelectItem value="Terkejut">Terkejut</SelectItem><SelectItem value="Fokus, serius">Serius</SelectItem></SelectContent></Select><Select value={ageRange} onValueChange={setAgeRange}><SelectTrigger><SelectValue placeholder="Pilih usia..." /></SelectTrigger><SelectContent><SelectItem value="Bayi">Bayi</SelectItem><SelectItem value="Anak-anak">Anak-anak</SelectItem><SelectItem value="Remaja">Remaja</SelectItem><SelectItem value="Dewasa Muda">Dewasa Muda</SelectItem><SelectItem value="Dewasa">Dewasa</SelectItem><SelectItem value="Paruh Baya">Paruh Baya</SelectItem><SelectItem value="Lansia">Lansia</SelectItem></SelectContent></Select></div></div>
                   <div><Label className="text-lg font-semibold flex items-center gap-2 mb-2"><Shirt className="w-5 h-5" /> Pakaian</Label><Select value={outfit} onValueChange={setOutfit}><SelectTrigger><SelectValue placeholder="Pilih pakaian... (opsional)" /></SelectTrigger><SelectContent><SelectItem value="">Tidak ada</SelectItem><SelectItem value="Pakaian formal">Formal</SelectItem><SelectItem value="Pakaian kasual">Kasual</SelectItem><SelectItem value="Pakaian olahraga">Olahraga</SelectItem><SelectItem value="Pakaian seksi">Seksi</SelectItem><SelectItem value="Baju zirah">Zirah</SelectItem><SelectItem value="Pakaian fiksi ilmiah">Fiksi Ilmiah</SelectItem><SelectItem value="Pakaian vintage">Vintage</SelectItem><SelectItem value="Pakaian gotik">Gotik</SelectItem></SelectContent></Select></div>
                </div>
                {/* Kolom Kanan Gambar */}
                <div className="space-y-6">
                  <div><Label className="text-lg font-semibold flex items-center gap-2 mb-2"><Palette className="w-5 h-5" /> Style</Label><Select value={style} onValueChange={setStyle}><SelectTrigger><SelectValue placeholder="Pilih style..." /></SelectTrigger><SelectContent><SelectItem value="Photography">Photography</SelectItem><SelectItem value="Fotorealistic">Fotorealistic</SelectItem><SelectItem value="Teal & Orange">Teal & Orange</SelectItem><SelectItem value="Cartoon C4D">Cartoon C4D</SelectItem><SelectItem value="Ghibli">Ghibli</SelectItem><SelectItem value="Japanese Anime">Japanese Anime</SelectItem><SelectItem value="Glass">Glass</SelectItem><SelectItem value="Retro film">Retro film</SelectItem><SelectItem value="3d polaroid">3D Polaroid</SelectItem><SelectItem value="Steampunk">Steampunk</SelectItem><SelectItem value="Future sci-fi">Future Sci-fi</SelectItem><SelectItem value="Chibi 3D">Chibi 3D</SelectItem></SelectContent></Select></div>
                  <div><Label className="text-lg font-semibold flex items-center gap-2 mb-2"><Camera className="w-5 h-5" /> Sudut Kamera</Label><Select value={angle} onValueChange={setAngle}><SelectTrigger><SelectValue placeholder="Pilih sudut..." /></SelectTrigger><SelectContent><SelectItem value="Eye-Level Shot">Eye-Level</SelectItem><SelectItem value="Low Angle Shot">Low Angle</SelectItem><SelectItem value="High Angle Shot">High Angle</SelectItem><SelectItem value="POV">POV</SelectItem><SelectItem value="Selfie Shot">Selfie</SelectItem><SelectItem value="Dutch Angle">Dutch Angle</SelectItem><SelectItem value="Top-down View">Top-down</SelectItem></SelectContent></Select></div>
                  <div><Label className="text-lg font-semibold flex items-center gap-2 mb-2"><Sun className="w-5 h-5" /> Pencahayaan</Label><Select value={lighting} onValueChange={setLighting}><SelectTrigger><SelectValue placeholder="Pilih cahaya..." /></SelectTrigger><SelectContent><SelectItem value="Cinematic lighting">Cinematic</SelectItem><SelectItem value="Dramatic lighting">Dramatic</SelectItem><SelectItem value="Golden hour">Golden hour</SelectItem><SelectItem value="Soft light">Soft light</SelectItem><SelectItem value="Neon glow">Neon</SelectItem></SelectContent></Select></div>
                  <div><Label className="text-lg font-semibold flex items-center gap-2 mb-2"><Sparkles className="w-5 h-5" /> Detail & Kualitas</Label><Select value={detailLevel} onValueChange={setDetailLevel}><SelectTrigger><SelectValue placeholder="Pilih kualitas..." /></SelectTrigger><SelectContent><SelectItem value="Highly detailed">Highly detailed</SelectItem><SelectItem value="8K">8K</SelectItem><SelectItem value="Sharp focus">Sharp focus</SelectItem><SelectItem value="Insanely detailed">Insanely detailed</SelectItem></SelectContent></Select></div>
                  <div><Label htmlFor="negative-img" className="text-base font-medium">Prompt Negatif</Label><Textarea id="negative-img" value={negativePrompt} onChange={(e) => setNegativePrompt(e.target.value)} placeholder="Hindari..." className="h-28" /></div>
                </div>
              </div>
            </TabsContent>

            {/* KONTEN TAB VIDEO (Ditulis Langsung) */}
            <TabsContent value="video" className="mt-0">
               <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8">
                {/* Kolom Kiri Video */}
                <div className="space-y-6">
                   <div><Label htmlFor="subject-vid" className="text-lg font-semibold flex items-center gap-2 mb-2"><PenSquare className="w-5 h-5" /> Subjek & Aksi Utama</Label><Textarea id="subject-vid" value={subject} onChange={(e) => setSubject(e.target.value)} placeholder="Apa inti dari adegan ini?" className="h-28" /></div>
                   <div><Label htmlFor="character-vid" className="text-lg font-semibold flex items-center gap-2 mb-2"><Bot className="w-5 h-5" /> Deskripsi Inti Karakter</Label><Textarea id="character-vid" value={characterDetails} onChange={(e) => setCharacterDetails(e.target.value)} placeholder="Jelaskan karakter secara umum..." className="h-24" /></div>
                   <div><Label className="text-lg font-semibold flex items-center gap-2 mb-2"><User className="w-5 h-5" /> Etnis & Wajah</Label><Select value={facialDescription} onValueChange={setFacialDescription}><SelectTrigger><SelectValue placeholder="Pilih etnis... (opsional)" /></SelectTrigger><SelectContent><SelectItem value="">Tidak ada</SelectItem><SelectItem value="Arabian">Arabian</SelectItem><SelectItem value="Asian (East)">Asian (Timur)</SelectItem><SelectItem value="Asian (South)">Asian (Selatan)</SelectItem><SelectItem value="African">African</SelectItem><SelectItem value="Caucasian">Caucasian</SelectItem><SelectItem value="Hispanic/Latino">Hispanic/Latino</SelectItem><SelectItem value="Native American">Native American</SelectItem></SelectContent></Select></div>
                   <div><Label className="text-lg font-semibold flex items-center gap-2 mb-2"><Smile className="w-5 h-5" /> Ekspresi & Usia</Label><div className="flex gap-4"><Select value={expression} onValueChange={setExpression}><SelectTrigger><SelectValue placeholder="Pilih ekspresi..." /></SelectTrigger><SelectContent><SelectItem value="Netral">Netral</SelectItem><SelectItem value="Senyum bahagia">Senyum</SelectItem><SelectItem value="Tertawa">Tertawa</SelectItem><SelectItem value="Sedih, menangis">Sedih</SelectItem><SelectItem value="Marah, berteriak">Marah</SelectItem><SelectItem value="Terkejut">Terkejut</SelectItem><SelectItem value="Fokus, serius">Serius</SelectItem></SelectContent></Select><Select value={ageRange} onValueChange={setAgeRange}><SelectTrigger><SelectValue placeholder="Pilih usia..." /></SelectTrigger><SelectContent><SelectItem value="Bayi">Bayi</SelectItem><SelectItem value="Anak-anak">Anak-anak</SelectItem><SelectItem value="Remaja">Remaja</SelectItem><SelectItem value="Dewasa Muda">Dewasa Muda</SelectItem><SelectItem value="Dewasa">Dewasa</SelectItem><SelectItem value="Paruh Baya">Paruh Baya</SelectItem><SelectItem value="Lansia">Lansia</SelectItem></SelectContent></Select></div></div>
                   <div><Label className="text-lg font-semibold flex items-center gap-2 mb-2"><Shirt className="w-5 h-5" /> Pakaian</Label><Select value={outfit} onValueChange={setOutfit}><SelectTrigger><SelectValue placeholder="Pilih pakaian... (opsional)" /></SelectTrigger><SelectContent><SelectItem value="">Tidak ada</SelectItem><SelectItem value="Pakaian formal">Formal</SelectItem><SelectItem value="Pakaian kasual">Kasual</SelectItem><SelectItem value="Pakaian olahraga">Olahraga</SelectItem><SelectItem value="Pakaian seksi">Seksi</SelectItem><SelectItem value="Baju zirah">Zirah</SelectItem><SelectItem value="Pakaian fiksi ilmiah">Fiksi Ilmiah</SelectItem><SelectItem value="Pakaian vintage">Vintage</SelectItem><SelectItem value="Pakaian gotik">Gotik</SelectItem></SelectContent></Select></div>
                </div>
                {/* Kolom Kanan Video */}
                <div className="space-y-6">
                  <div><Label className="text-lg font-semibold flex items-center gap-2 mb-2"><Palette className="w-5 h-5" /> Style</Label><Select value={style} onValueChange={setStyle}><SelectTrigger><SelectValue placeholder="Pilih style..." /></SelectTrigger><SelectContent><SelectItem value="Photography">Photography</SelectItem><SelectItem value="Fotorealistic">Fotorealistic</SelectItem><SelectItem value="Teal & Orange">Teal & Orange</SelectItem><SelectItem value="Cartoon C4D">Cartoon C4D</SelectItem><SelectItem value="Ghibli">Ghibli</SelectItem><SelectItem value="Japanese Anime">Japanese Anime</SelectItem><SelectItem value="Glass">Glass</SelectItem><SelectItem value="Retro film">Retro film</SelectItem><SelectItem value="3d polaroid">3D Polaroid</SelectItem><SelectItem value="Steampunk">Steampunk</SelectItem><SelectItem value="Future sci-fi">Future Sci-fi</SelectItem><SelectItem value="Chibi 3D">Chibi 3D</SelectItem></SelectContent></Select></div>
                  <div><Label className="text-lg font-semibold flex items-center gap-2 mb-2"><Camera className="w-5 h-5" /> Sudut Kamera</Label><Select value={angle} onValueChange={setAngle}><SelectTrigger><SelectValue placeholder="Pilih sudut..." /></SelectTrigger><SelectContent><SelectItem value="Eye-Level Shot">Eye-Level</SelectItem><SelectItem value="Low Angle Shot">Low Angle</SelectItem><SelectItem value="High Angle Shot">High Angle</SelectItem><SelectItem value="POV">POV</SelectItem><SelectItem value="Selfie Shot">Selfie</SelectItem><SelectItem value="Dutch Angle">Dutch Angle</SelectItem><SelectItem value="Top-down View">Top-down</SelectItem></SelectContent></Select></div>
                  <div><Label className="text-lg font-semibold flex items-center gap-2 mb-2"><Wind className="w-5 h-5" /> Gerakan</Label><Select value={motion} onValueChange={setMotion}><SelectTrigger><SelectValue placeholder="Pilih gerakan..." /></SelectTrigger><SelectContent><SelectItem value="Slow motion">Slow motion</SelectItem><SelectItem value="Time-lapse">Time-lapse</SelectItem><SelectItem value="Panning shot">Panning</SelectItem><SelectItem value="Static shot">Static</SelectItem><SelectItem value="Dynamic movement">Dynamic</SelectItem></SelectContent></Select></div>
                  <div><Label className="text-lg font-semibold flex items-center gap-2 mb-2"><Film className="w-5 h-5" /> Kualitas Film</Label><Select value={filmQuality} onValueChange={setFilmQuality}><SelectTrigger><SelectValue placeholder="Pilih kualitas film..." /></SelectTrigger><SelectContent><SelectItem value="Shot on 35mm film">35mm film</SelectItem><SelectItem value="Found footage style">Found footage</SelectItem><SelectItem value="Documentary style">Documentary</SelectItem></SelectContent></Select></div>
                  <div><Label htmlFor="dialogue" className="text-lg font-semibold flex items-center gap-2 mb-2"><VideoIcon className="w-5 h-5 text-blue-400" /> Naskah Dialog</Label><Textarea id="dialogue" value={dialogue} onChange={(e) => setDialogue(e.target.value)} placeholder="Tuliskan dialog... (opsional)" className="h-24" /></div>
                  <div><Label htmlFor="negative-vid" className="text-base font-medium">Prompt Negatif</Label><Textarea id="negative-vid" value={negativePrompt} onChange={(e) => setNegativePrompt(e.target.value)} placeholder="Hindari..." className="h-28" /></div>
                </div>
               </div>
            </TabsContent>

            <div className="mt-10 text-center">
              <Button size="lg" className="px-12 py-7 text-xl font-bold" onClick={handleGenerate}>Buat Prompt</Button>
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
