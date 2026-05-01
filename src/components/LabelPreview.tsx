
"use client";

import React from 'react';
import { LabelData } from '@/lib/types';

interface LabelPreviewProps {
  data: LabelData;
}

const LabelPreview: React.FC<LabelPreviewProps> = ({ data }) => {
  // KURAL: Eğer kullanıcı bir hazır etiket görseli yüklediyse, 
  // eski tasarımın (başlık, tablo, fiyatlar, logolar) tamamını devre dışı bırakıyoruz.
  if (data.productImage) {
    return (
      <div className="label-preview-container bg-white shadow-none overflow-hidden flex items-center justify-center print:border-none">
        <img 
          src={data.productImage} 
          alt="Yüklenen Hazır Etiket" 
          className="w-full h-full object-contain block" 
        />
      </div>
    );
  }

  // Görsel yüklenmemişse temiz bir boş A5 sayfa gösteriyoruz.
  // Not: Eğer isterseniz buraya eski tasarımın kodlarını tekrar ekleyebiliriz 
  // ama şu anki talebiniz doğrultusunda boş/hazır şablon yapısına geçildi.
  return (
    <div className="label-preview-container bg-white shadow-none border-2 border-dashed border-gray-100 flex flex-col items-center justify-center print:border-none">
       <div className="flex flex-col items-center gap-4 opacity-20">
         <div className="w-24 h-32 border-4 border-gray-400 rounded-lg flex items-center justify-center">
           <div className="w-12 h-16 border-2 border-gray-400 rounded-sm"></div>
         </div>
         <span className="text-sm font-black uppercase tracking-[0.3em] text-gray-500">Hazır Etiket Yükleyin</span>
       </div>
    </div>
  );
};

export default LabelPreview;
