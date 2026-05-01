"use client";

import React, { useState } from 'react';
import { initialLabelData, LabelData } from '@/lib/types';
import LabelForm from '@/components/LabelForm';
import LabelPreview from '@/components/LabelPreview';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Button } from '@/components/ui/button';
import { RotateCcw, Printer } from 'lucide-react';

export default function Home() {
  const [labelData, setLabelData] = useState<LabelData>(initialLabelData);

  const handleReset = () => {
    setLabelData(initialLabelData);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-zinc-200">
      {/* Sidebar Panel - Form */}
      <aside className="w-full md:w-[400px] lg:w-[450px] border-r bg-white flex flex-col shrink-0 print:hidden shadow-xl z-20">
        <div className="p-4 border-b bg-[#9f2732] flex items-center justify-between text-white">
          <div className="flex items-center gap-2">
            <h1 className="font-bold text-lg tracking-tight italic">vize<span className="font-normal opacity-80 ml-1">Tag</span></h1>
          </div>
          <div className="px-2 py-0.5 bg-white/20 text-[10px] font-bold uppercase rounded border border-white/30">
            A5 Format
          </div>
        </div>
        <ScrollArea className="flex-1">
          <div className="p-6">
            <LabelForm data={labelData} onChange={setLabelData} />
            <div className="mt-8 p-4 bg-zinc-50 rounded border border-zinc-200 text-xs text-zinc-500 leading-relaxed">
              <p><strong>Bilgi:</strong> Tasarım referans görsele (Vize Home) göre optimize edilmiştir. Yazdır butonunu kullanarak A5 dikey formatta çıktı alabilirsiniz.</p>
            </div>
          </div>
        </ScrollArea>
      </aside>

      {/* Main Panel - Preview */}
      <main className="flex-1 p-8 md:p-12 overflow-auto flex items-start justify-center print:p-0 print:bg-white">
        <div className="flex flex-col items-center gap-6 print:w-full">
             <div className="w-[148mm] flex justify-between items-end px-2 print:hidden mb-2">
               <div>
                 <h2 className="text-xs font-bold text-zinc-500 uppercase tracking-widest">Canlı Önizleme</h2>
                 <p className="text-[10px] text-zinc-400">A5 Dikey (148mm x 210mm)</p>
               </div>
               <div className="flex gap-2">
                 <Button variant="outline" size="sm" onClick={handleReset} className="h-8 text-[10px] uppercase font-bold rounded-none border-zinc-300">
                    <RotateCcw className="w-3 h-3 mr-1" />
                    Sıfırla
                 </Button>
                 <Button size="sm" onClick={handlePrint} className="h-8 text-[10px] uppercase font-bold bg-[#9f2732] hover:bg-[#832029] rounded-none">
                    <Printer className="w-3 h-3 mr-1" />
                    Yazdır / PDF
                 </Button>
               </div>
             </div>
             
             {/* A5 Preview Component */}
             <LabelPreview data={labelData} />
        </div>
      </main>
    </div>
  );
}