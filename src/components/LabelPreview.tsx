
"use client";

import React from 'react';
import { LabelData } from '@/lib/types';

interface LabelPreviewProps {
  data: LabelData;
}

const LabelPreview: React.FC<LabelPreviewProps> = ({ data }) => {
  return (
    <div 
      className="a5-container relative bg-white overflow-hidden shadow-none border border-zinc-200 print:border-none font-sans select-none"
      style={{ width: '148mm', height: '210mm' }}
    >
      {/* 1. ARKA PLAN ŞABLONU (Template Background) */}
      {data.productImage && (
        <img 
          src={data.productImage} 
          alt="Etiket Şablonu" 
          className="absolute inset-0 w-full h-full object-fill z-0" 
        />
      )}

      {/* 2. DİNAMİK İÇERİK KATMANI (Overlay Layer) - Sadece Şablon Üzerine Bindirme */}
      <div className="absolute inset-0 z-10 pointer-events-none overflow-hidden">
        
        {/* ÜRÜN BAŞLIĞI - Siyah Bar Üzeri */}
        <div 
          className="absolute left-[8%] right-[8%] flex items-center justify-center bg-[#252525]" 
          style={{ top: '37.2%', height: '36px' }}
        >
          <h2 className="text-white font-bold uppercase tracking-tight leading-none text-center" style={{ fontSize: '20px', fontFamily: 'Arial, sans-serif' }}>
            {data.productTitle}
          </h2>
        </div>

        {/* FİYAT ALANI - Gri Kutu Üzeri */}
        <div 
          className="absolute left-[8%] right-[8%] grid grid-cols-2 bg-[#ded8d5]" 
          style={{ top: '46%', height: '56px' }}
        >
          {/* Peşin Fiyat */}
          <div className="flex flex-col items-center justify-center border-r border-white/20">
            <span className="text-[12px] font-bold text-black uppercase" style={{ fontFamily: 'Arial, sans-serif' }}>PEŞİN FİYAT</span>
            <div className="text-black font-bold flex items-baseline gap-1" style={{ fontSize: '28px', fontFamily: 'Arial, sans-serif' }}>
              {data.totalCashPrice} <span className="text-lg">₺</span>
            </div>
          </div>
          {/* Taksitli Fiyat */}
          <div className="flex flex-col items-center justify-center">
            <span className="text-[12px] font-bold text-black uppercase" style={{ fontFamily: 'Arial, sans-serif' }}>TAKSİTLİ FİYAT</span>
            <div className="text-black font-bold flex items-baseline gap-1" style={{ fontSize: '28px', fontFamily: 'Arial, sans-serif' }}>
              {data.totalInstallmentPrice} <span className="text-lg">₺</span>
            </div>
          </div>
        </div>

        {/* TABLO ALANI - Dinamik Satır Sayısı */}
        <div 
          className="absolute left-[7.8%] right-[7.8%]" 
          style={{ top: '56.2%' }}
        >
          <table className="w-full border-collapse text-[11px] font-bold text-black" style={{ fontFamily: 'Arial, sans-serif' }}>
            <thead>
              <tr className="bg-[#d8d0cc]">
                <th className="border-[1.5px] border-black h-[22px] text-center uppercase px-1" style={{ width: '50%' }}>ÜRÜN</th>
                <th className="border-[1.5px] border-black h-[22px] text-center uppercase" style={{ width: '15%' }}>ADET</th>
                <th className="border-[1.5px] border-black h-[22px] text-center uppercase" style={{ width: '17.5%' }}>PEŞİN</th>
                <th className="border-[1.5px] border-black h-[22px] text-center uppercase" style={{ width: '17.5%' }}>TAKSİT</th>
              </tr>
            </thead>
            <tbody>
              {data.tableRows.map((row, index) => (
                <tr key={index} className="bg-white/40">
                  <td className="border-[1.5px] border-black h-[24px] px-2 text-left truncate">
                    {row.productName}
                  </td>
                  <td className="border-[1.5px] border-black h-[24px] text-center">
                    {row.quantity}
                  </td>
                  <td className="border-[1.5px] border-black h-[24px] text-center whitespace-nowrap">
                    {row.cashPrice} ₺
                  </td>
                  <td className="border-[1.5px] border-black h-[24px] text-center whitespace-nowrap">
                    {row.installmentPrice} ₺
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default LabelPreview;
