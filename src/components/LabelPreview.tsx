
"use client";

import React from 'react';
import { LabelData } from '@/lib/types';

interface LabelPreviewProps {
  data: LabelData;
}

const LabelPreview: React.FC<LabelPreviewProps> = ({ data }) => {
  // Eğer görsel yüklenmemişse kullanıcıyı yönlendiren boş bir sayfa göster
  if (!data.productImage) {
    return (
      <div className="label-preview-container bg-white shadow-none border-2 border-dashed border-gray-100 flex flex-col items-center justify-center print:border-none">
         <div className="flex flex-col items-center gap-4 opacity-20">
           <div className="w-24 h-32 border-4 border-gray-400 rounded-lg flex items-center justify-center">
             <div className="w-12 h-16 border-2 border-gray-400 rounded-sm"></div>
           </div>
           <span className="text-sm font-black uppercase tracking-[0.3em] text-gray-500">A5 Şablonu Yükleyin</span>
         </div>
      </div>
    );
  }

  return (
    <div className="label-preview-container relative bg-white overflow-hidden shadow-none print:shadow-none print:border-none">
      {/* 1. ŞABLON ARKA PLAN (Görsel) */}
      <img 
        src={data.productImage} 
        alt="Etiket Şablonu" 
        className="absolute inset-0 w-full h-full object-cover z-0" 
      />

      {/* 2. DİNAMİK VERİ KATMANI (Overlay) */}
      <div className="absolute inset-0 z-10 pointer-events-none font-headline">
        
        {/* ÜRÜN BAŞLIĞI - Görseldeki yerleşimine göre yakl. %38-40 civarı */}
        <div 
          style={{ top: '38%' }} 
          className="absolute w-full px-6 text-center"
        >
          <h2 className="text-3xl font-black uppercase text-brand-burgundy tracking-tight leading-none drop-shadow-sm">
            {data.productTitle}
          </h2>
        </div>

        {/* TOPLAM FİYATLAR - Orta Bölge */}
        <div 
          style={{ top: '52%' }} 
          className="absolute w-full px-12 flex justify-between items-end"
        >
          <div className="text-center">
            <div className="text-4xl font-black text-brand-burgundy tracking-tighter">
              ₺{data.totalCashPrice}
            </div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-black text-brand-burgundy tracking-tighter">
              ₺{data.totalInstallmentPrice}
            </div>
          </div>
        </div>

        {/* DETAY TABLOSU - Alt Bölge */}
        <div 
          style={{ bottom: '18%' }} 
          className="absolute w-full px-10"
        >
          {/* Tablo Verileri - Görseldeki şablonun boşluklarına oturacak şekilde hizalandı */}
          <div className="grid grid-cols-4 gap-2 text-[12px] font-bold text-gray-800 uppercase text-center items-center">
            <div className="text-left truncate">{data.tableProductName}</div>
            <div>{data.quantity}</div>
            <div>₺{data.tableCashPrice}</div>
            <div>₺{data.tableInstallmentPrice}</div>
          </div>

          {/* Boyut Bilgileri - En alt */}
          <div 
            style={{ marginTop: '30px' }} 
            className="flex justify-start gap-6 text-[11px] font-bold text-gray-600 uppercase"
          >
            <span>GEN: {data.gen}</span>
            <span>DER: {data.der}</span>
            <span>YÜK: {data.yuk}</span>
          </div>
        </div>

      </div>
    </div>
  );
};

export default LabelPreview;
