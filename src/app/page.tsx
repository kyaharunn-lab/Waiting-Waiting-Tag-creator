"use client";

import React, { useState } from 'react';
import { initialLabelData, LabelData } from '@/lib/types';
import LabelForm from '@/components/LabelForm';
import LabelPreview from '@/components/LabelPreview';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Button } from '@/components/ui/button';
import { RotateCcw, FileDown } from 'lucide-react';

export default function Home() {
  const [labelData, setLabelData] = useState<LabelData>(initialLabelData);

  const handleReset = () => {
    setLabelData(initialLabelData);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-[#F4F1F0]">
      {/* Sidebar Panel - Form */}
      <aside className="w-full md:w-[400px] lg:w-[450px] border-r bg-white flex flex-col shrink-0 print:hidden">
        <div className="p-4 border-b bg-brand-burgundy/5 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-brand-burgundy rounded flex items-center justify-center text-white font-headline font-bold">V</div>
            <h1 className="font-headline font-bold text-brand-burgundy">VizeTag <span className="text-gray-400 text-xs font-normal">Creator</span></h1>
          </div>
          <div className="px-2 py-1 bg-green-100 text-green-700 text-[10px] font-bold uppercase rounded-full border border-green-200">A5 Format</div>
        </div>
        <ScrollArea className="flex-1">
          <div className="p-6">
            <LabelForm data={labelData} onChange={setLabelData} />
            <div className="mt-8 p-4 bg-yellow-50 rounded-lg border border-yellow-100 text-xs text-yellow-800 leading-relaxed">
              <p><strong>İpucu:</strong> A5 dikey format için optimize edilmiştir. Ürün başlığı uzunsa sistem otomatik olarak yazı boyutunu küçültür.</p>
            </div>
          </div>
        </ScrollArea>
      </aside>

      {/* Main Panel - Preview */}
      <main className="flex-1 p-6 md:p-12 overflow-auto flex items-center justify-center bg-gray-200 print:bg-white print:p-0">
        <div className="w-full max-w-4xl flex flex-col items-center gap-6 print:w-full print:max-w-none">
             <div className="w-full max-w-[595px] flex justify-between items-end px-2 mb-2 print:hidden">
               <div>
                 <h2 className="text-sm font-bold text-gray-500 uppercase tracking-[0.2em]">Önizleme</h2>
                 <p className="text-xs text-gray-400">A5 Dikey (148mm x 210mm)</p>
               </div>
               <div className="flex gap-2">
                 <Button variant="outline" size="sm" onClick={handleReset} className="h-8 text-[10px] uppercase font-bold">
                    <RotateCcw className="w-3 h-3 mr-1" />
                    Sıfırla
                 </Button>
                 <Button size="sm" onClick={handlePrint} className="h-8 text-[10px] uppercase font-bold bg-brand-burgundy hover:bg-opacity-90">
                    <FileDown className="w-3 h-3 mr-1" />
                    Yazdır / PDF
                 </Button>
               </div>
             </div>
             
             {/* Preview Container */}
             <div className="w-full max-w-[595px] print:w-full">
                <LabelPreview data={labelData} />
             </div>
        </div>
      </main>
    </div>
  );
}