
"use client";

import React, { useState } from 'react';
import { initialLabelData, LabelData } from '@/lib/types';
import LabelForm from '@/components/LabelForm';
import LabelPreview from '@/components/LabelPreview';
import { ScrollArea } from '@/components/ui/scroll-area';

export default function Home() {
  const [labelData, setLabelData] = useState<LabelData>(initialLabelData);

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-[#F4F1F0]">
      {/* Sidebar Panel - Form */}
      <aside className="w-full md:w-[400px] lg:w-[450px] border-r bg-white flex flex-col shrink-0">
        <div className="p-4 border-b bg-brand-burgundy/5 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-brand-burgundy rounded flex items-center justify-center text-white font-headline font-bold">V</div>
            <h1 className="font-headline font-bold text-brand-burgundy">VizeTag <span className="text-gray-400 text-xs font-normal">Creator</span></h1>
          </div>
          <div className="px-2 py-1 bg-green-100 text-green-700 text-[10px] font-bold uppercase rounded-full border border-green-200">Canlı Önizleme</div>
        </div>
        <ScrollArea className="flex-1">
          <div className="p-6">
            <LabelForm data={labelData} onChange={setLabelData} />
            <div className="mt-8 p-4 bg-yellow-50 rounded-lg border border-yellow-100 text-xs text-yellow-800 leading-relaxed">
              <p><strong>İpucu:</strong> Formu doldurdukça sağ taraftaki önizleme anında güncellenecektir. Ürün başlığı uzunsa sistem otomatik olarak yazı boyutunu optimize eder.</p>
            </div>
          </div>
        </ScrollArea>
      </aside>

      {/* Main Panel - Preview */}
      <main className="flex-1 p-6 md:p-12 overflow-auto flex items-center justify-center">
        <div className="w-full max-w-4xl transform scale-90 lg:scale-100 origin-center">
          <div className="flex flex-col items-center gap-4">
             <div className="w-full max-w-[800px] flex justify-between items-end px-4 mb-2">
               <div>
                 <h2 className="text-sm font-bold text-gray-500 uppercase tracking-[0.2em]">Önizleme</h2>
                 <p className="text-xs text-gray-400">A4 Dikey Format (1:1.41)</p>
               </div>
               <div className="flex gap-2">
                 <button className="px-3 py-1.5 text-[10px] font-bold uppercase bg-white border rounded shadow-sm hover:bg-gray-50 text-gray-600 transition-colors">Tasarımı Sıfırla</button>
                 <button className="px-3 py-1.5 text-[10px] font-bold uppercase bg-brand-burgundy text-white rounded shadow-sm hover:bg-opacity-90 transition-opacity">PDF Olarak Hazırla</button>
               </div>
             </div>
             <LabelPreview data={labelData} />
          </div>
        </div>
      </main>
    </div>
  );
}
