
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
      {/* 1. ARKA PLAN ŞABLONU (User Uploaded Template) */}
      {data.productImage ? (
        <img 
          src={data.productImage} 
          alt="Etiket Şablonu" 
          className="absolute inset-0 w-full h-full object-fill z-0" 
        />
      ) : (
        <div className="absolute inset-0 flex items-center justify-center bg-zinc-50 text-zinc-300 text-sm italic z-0">
          Lütfen boş bir etiket şablonu yükleyin
        </div>
      )}

      {/* 2. DİNAMİK EDİTLENEBİLİR KATMAN (Overlay Layer) */}
      <div className="absolute inset-0 z-10 pointer-events-none overflow-hidden">
        
        {/* ÜRÜN BAŞLIĞI - Siyah Bar */}
        <div 
          className="absolute left-[8%] right-[8%] flex items-center justify-center bg-[#252525] print:bg-[#252525]" 
          style={{ top: '37.2%', height: '36px' }}
        >
          <h2 className="text-white font-bold uppercase tracking-tight leading-none text-center" style={{ fontSize: '20px', fontFamily: 'Arial, sans-serif' }}>
            {data.productTitle}
          </h2>
        </div>

        {/* FİYAT ALANI - Gri Kutu */}
        <div 
          className="absolute left-[8%] right-[8%] grid grid-cols-2 bg-[#ded8d5] print:bg-[#ded8d5]" 
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

        {/* TABLO ALANI - Excel Formatında */}
        <div 
          className="absolute left-[7.8%] right-[7.8%]" 
          style={{ top: '56.2%' }}
        >
          <table className="w-full border-collapse text-[11px] font-bold text-black" style={{ fontFamily: 'Arial, sans-serif' }}>
            <thead>
              <tr className="bg-[#d8d0cc] print:bg-[#d8d0cc]">
                <th className="border-[1.5px] border-black h-[22px] text-center uppercase px-1" style={{ width: '36%' }}>ÜRÜN</th>
                <th className="border-[1.5px] border-black h-[22px] text-center uppercase" style={{ width: '9%' }}>ADET</th>
                <th className="border-[1.5px] border-black h-[22px] text-center uppercase" style={{ width: '13%' }}>PEŞİN</th>
                <th className="border-[1.5px] border-black h-[22px] text-center uppercase" style={{ width: '13%' }}>TAKSİT</th>
                <th className="border-[1.5px] border-black h-[22px] text-center uppercase" style={{ width: '9.66%' }}>GEN</th>
                <th className="border-[1.5px] border-black h-[22px] text-center uppercase" style={{ width: '9.66%' }}>DER</th>
                <th className="border-[1.5px] border-black h-[22px] text-center uppercase" style={{ width: '9.66%' }}>YÜK</th>
              </tr>
            </thead>
            <tbody>
              {/* Dinamik Veri Satırı */}
              <tr className="bg-white/40">
                <td className="border-[1.5px] border-black h-[30px] px-2 text-left truncate">{data.tableProductName}</td>
                <td className="border-[1.5px] border-black h-[30px] text-center">{data.quantity}</td>
                <td className="border-[1.5px] border-black h-[30px] text-center">{data.tableCashPrice}</td>
                <td className="border-[1.5px] border-black h-[30px] text-center">{data.tableInstallmentPrice}</td>
                <td className="border-[1.5px] border-black h-[30px] text-center">{data.gen}</td>
                <td className="border-[1.5px] border-black h-[30px] text-center">{data.der}</td>
                <td className="border-[1.5px] border-black h-[30px] text-center">{data.yuk}</td>
              </tr>
              {/* Boş Satırlar (Görseldeki gibi 4 adet) */}
              {[...Array(4)].map((_, i) => (
                <tr key={i} className="bg-white/20">
                  <td className="border-[1.5px] border-black h-[30px]"></td>
                  <td className="border-[1.5px] border-black h-[30px]"></td>
                  <td className="border-[1.5px] border-black h-[30px]"></td>
                  <td className="border-[1.5px] border-black h-[30px]"></td>
                  <td className="border-[1.5px] border-black h-[30px]"></td>
                  <td className="border-[1.5px] border-black h-[30px]"></td>
                  <td className="border-[1.5px] border-black h-[30px]"></td>
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
