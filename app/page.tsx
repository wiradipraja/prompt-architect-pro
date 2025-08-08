// app/page.tsx
"use client";

import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
// Impor ikon-ikon baru
import { Image as ImageIcon, Video as VideoIcon, PenSquare, Camera, Palette, Bot, Copy, Check, Sparkles, Sun, Film, Wind } from "lucide-react";

export default function ArchitectPro() {
  const [activeTab, setActiveTab] = useState("image");

  // State untuk input yang ada
  const [subject, setSubject] = useState("seorang astronot menemukan taman rahasia di bulan");
  const [characterDetails, setCharacterDetails] = useState("mengenakan helm kaca dengan pantulan bintang, baju antariksa putih dengan emblem bunga mawar");
  const [style, setStyle] = useState("Sinematik");
  const [angle, setAngle] = useState("Low Angle");
  const [negativePrompt, setNegativePrompt] = useState("buram, kualitas rendah, kartun");

  // === STATE BARU UNTUK FOTO ===
  const [lighting, setLighting] = useState("Cinematic lighting");
  const [detailLevel, setDetailLevel] = useState("Highly detailed");
  
  // === STATE BARU UNTUK VIDEO ===
  const [motion, setMotion] = useState("Static shot");
  const [filmQuality, setFilmQuality] = useState("Shot on 35mm film");
  const [dialogue, setDialogue] = useState("Aku tidak percaya ini... setelah sekian lama.");

  // State untuk output dan tombol salin
  const [generatedPrompt, setGeneratedPrompt] = useState("");
  const [copyButtonText, setCopyButtonText] = useState("Salin");

  const handleGenerate = () => {
    // Merakit prompt dengan logika baru
    let finalPrompt = "";
    
    // Bagian dasar yang selalu ada
    const baseParts = [characterDetails, subject, style, angle];
    
    if (activeTab === 'image') {
      const imageSpecificParts = [lighting, detailLevel];
      finalPrompt = [...baseParts, ...imageSpecificParts, `--no ${negativePrompt}`].join(', ');
    } else { // untuk video
      const videoSpecificParts = [motion, filmQuality];
      const visualPrompt = [...baseParts, ...videoSpecificParts].join(', ');
      finalPrompt = `VIDEO: ${visualPrompt} --no ${negativePrompt} | DIALOG: "${dialogue}"`;
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
      {/* Kolom Kiri: Input Kreatif (tetap sama, kecuali dialog dipindah ke kanan) */}
      <div className="space-y-6">
        <div>
          <Label htmlFor="subject" className="text-lg font-semibold flex items-center gap-2 mb-2"><PenSquare className="w-5 h-5" /> Subjek & Aksi Utama</Label>
          <Textarea id="subject" value={subject} onChange={(e) => setSubject(e.target.value)} placeholder="Apa inti dari adegan ini?" className="h-28" />
        </div>
        <div>
          <Label htmlFor="character" className="text-lg font-semibold flex items-center gap-2 mb-2"><Bot className="w-5 h-5" /> Detail Karakter</Label>
          <Textarea id="character" value={characterDetails} onChange={(e) => setCharacterDetails(e.target.value)} placeholder="Jelaskan karakter secara detail..." className="h-36" />
        </div>
      </div>
      
      {/* Kolom Kanan: Pengaturan Teknis (dengan tambahan) */}
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
              {/* === TAMBAHAN BARU DI SINI === */}
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

        {/* === FIELD KHUSUS GAMBAR === */}
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

        {/* === FIELD KHUSUS VIDEO === */}
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
