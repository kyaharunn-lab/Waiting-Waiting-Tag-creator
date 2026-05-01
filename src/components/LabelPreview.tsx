"use client";

import React from 'react';
import { LabelData } from '@/lib/types';

interface LabelPreviewProps {
  data: LabelData;
}

const LabelPreview: React.FC<LabelPreviewProps> = ({ data }) => {
  return (
    <div className="a5-container relative bg-white overflow-hidden shadow-none border border-zinc-200 print:border-none font-sans select-none">
      
      {/* 1. ÜST MARKA ALANI (HEADER) - Görseldeki Çok Katmanlı Yapı */}
      <div className="relative h-[36%] w-full overflow-hidden">
        {/* Koyu Bordo Üst Katman */}
        <div className="absolute top-0 left-0 w-full h-full bg-[#8a191e]" />
        
        {/* Kırmızı Dairesel Alan */}
        <div className="absolute top-[10%] left-[-10%] w-[120%] h-[90%] bg-[#d82027] rounded-b-[50%] shadow-lg" />
        
        {/* Üst Orta Üçgen Detay */}
        <div 
          className="absolute top-0 left-1/2 -translate-x-1/2 w-0 h-0 border-l-[40px] border-l-transparent border-r-[40px] border-r-transparent border-t-[40px] border-t-[#8a191e]" 
        />

        {/* LOGO: vize home */}
        <div className="absolute top-10 left-0 w-full flex flex-col items-center">
          <div className="relative">
            <h1 className="text-white font-black italic tracking-tighter leading-none" style={{ fontSize: '92px' }}>
              vize
              <span className="absolute -top-1 -right-4 text-[14px] font-bold">®</span>
            </h1>
            <div className="w-full text-right -mt-4 pr-2">
              <span className="text-white font-medium tracking-widest text-xl">home</span>
            </div>
          </div>
        </div>

        {/* İLLÜSTRASYON: Koltuk ve Lamba */}
        <div className="absolute bottom-4 left-0 w-full flex items-end justify-center px-8">
           {/* Lamba */}
           <div className="absolute left-16 bottom-4 flex flex-col items-center">
              <div className="w-10 h-10 bg-white rounded-sm shadow-sm" />
              <div className="w-0.5 h-16 bg-[#4a2a24]" />
              <div className="w-8 h-3 bg-[#4a2a24] clip-path-trapezoid" style={{ clipPath: 'polygon(20% 0%, 80% 0%, 100% 100%, 0% 100%)' }} />
           </div>

           {/* Koltuk */}
           <div className="relative z-10 w-[240px]">
              <svg viewBox="0 0 240 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                {/* Koltuk Ayakları */}
                <path d="M40 85L35 95H45L40 85Z" fill="#4a2a24"/>
                <path d="M200 85L195 95H205L200 85Z" fill="#4a2a24"/>
                <rect x="30" y="80" width="180" height="6" fill="#4a2a24"/>
                {/* Ana Gövde */}
                <rect x="20" y="40" width="200" height="40" fill="white" stroke="#9f2732" strokeWidth="1"/>
                <path d="M20 40C20 30 35 20 50 20H190C205 20 220 30 220 40V70H20V40Z" fill="white" stroke="#9f2732" strokeWidth="1"/>
                {/* Yastık Detayları (Pembe Yarım Daireler) */}
                <path d="M60 20C60 35 100 35 100 20H60Z" fill="#f8b4b4" stroke="#9f2732" strokeWidth="0.5"/>
                <path d="M140 20C140 35 180 35 180 20H140Z" fill="#f8b4b4" stroke="#9f2732" strokeWidth="0.5"/>
                {/* Yan kollar */}
                <circle cx="25" cy="45" r="8" fill="white" stroke="#9f2732" strokeWidth="1"/>
                <circle cx="215" cy="45" r="8" fill="white" stroke="#9f2732" strokeWidth="1"/>
                {/* Orta Çizgi */}
                <line x1="120" y1="40" x2="120" y2="80" stroke="#9f2732" strokeWidth="1"/>
              </svg>
           </div>
        </div>

        {/* Halı Çizgileri */}
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[80%] h-4 overflow-hidden flex gap-1 opacity-40">
           {[...Array(30)].map((_, i) => (
             <div key={i} className="w-1 h-full bg-[#9f2732] rotate-12" />
           ))}
        </div>
      </div>

      {/* 2. ÜRÜN BAŞLIĞI (SİYAH BAR) */}
      <div className="w-full flex justify-center mt-12">
        <div className="w-[88%] bg-[#1a1a1a] py-2.5 px-4">
          <h2 className="text-white font-bold uppercase text-center truncate tracking-wide" style={{ fontSize: '24px' }}>
            {data.productTitle}
          </h2>
        </div>
      </div>

      {/* 3. FİYAT KUTUSU (GRİ ALAN) */}
      <div className="w-[88%] mx-auto mt-2 bg-[#ded8d5] flex">
        <div className="flex-1 p-4 border-r border-white/50 flex flex-col items-center">
          <span className="text-[12px] font-bold text-zinc-600 uppercase mb-1">Peşin Fiyat</span>
          <div className="text-[#1a1a1a] font-black flex items-baseline gap-1" style={{ fontSize: '38px' }}>
            {data.totalCashPrice} <span className="text-2xl font-bold">₺</span>
          </div>
        </div>
        <div className="flex-1 p-4 flex flex-col items-center">
          <span className="text-[12px] font-bold text-zinc-600 uppercase mb-1">Taksitli Fiyat</span>
          <div className="text-[#1a1a1a] font-black flex items-baseline gap-1" style={{ fontSize: '38px' }}>
            {data.totalInstallmentPrice} <span className="text-2xl font-bold">₺</span>
          </div>
        </div>
      </div>

      {/* 4. TABLO (EXCEL GÖRÜNÜMÜ) */}
      <div className="w-[94%] mx-auto mt-8">
        <table className="w-full border-collapse border border-zinc-800 text-[12px] uppercase">
          <thead>
            <tr className="bg-[#bcbcbc]">
              <th className="border border-zinc-800 p-1.5 text-center font-bold w-[35%]">Ürün</th>
              <th className="border border-zinc-800 p-1.5 text-center font-bold">Adet</th>
              <th className="border border-zinc-800 p-1.5 text-center font-bold">Peşin</th>
              <th className="border border-zinc-800 p-1.5 text-center font-bold">Taksit</th>
              <th className="border border-zinc-800 p-1.5 text-center font-bold">Gen</th>
              <th className="border border-zinc-800 p-1.5 text-center font-bold">Der</th>
              <th className="border border-zinc-800 p-1.5 text-center font-bold">Yük</th>
            </tr>
          </thead>
          <tbody>
            {/* Dinamik Veri */}
            <tr className="h-8">
              <td className="border border-zinc-800 px-2 font-medium truncate">{data.tableProductName}</td>
              <td className="border border-zinc-800 text-center">{data.quantity}</td>
              <td className="border border-zinc-800 text-center">{data.tableCashPrice}</td>
              <td className="border border-zinc-800 text-center">{data.tableInstallmentPrice}</td>
              <td className="border border-zinc-800 text-center">{data.gen}</td>
              <td className="border border-zinc-800 text-center">{data.der}</td>
              <td className="border border-zinc-800 text-center">{data.yuk}</td>
            </tr>
            {/* Boş Excel Satırları */}
            {[...Array(5)].map((_, i) => (
              <tr key={i} className="h-8 bg-zinc-50/50">
                <td className="border border-zinc-800"></td>
                <td className="border border-zinc-800"></td>
                <td className="border border-zinc-800"></td>
                <td className="border border-zinc-800"></td>
                <td className="border border-zinc-800"></td>
                <td className="border border-zinc-800"></td>
                <td className="border border-zinc-800"></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* 5. ALT ÖDEME ŞERİDİ (FOOTER) */}
      <div className="absolute bottom-0 left-0 w-full h-14 bg-[#d82027] flex items-center justify-between px-10">
        <div className="flex items-center gap-6">
          {/* Mastercard Placeholder */}
          <div className="flex items-center gap-1 opacity-90">
             <div className="w-5 h-5 bg-white/20 rounded-full" />
             <div className="w-5 h-5 bg-white/20 rounded-full -ml-3" />
             <span className="text-[10px] text-white font-bold ml-1">mastercard</span>
          </div>
          {/* VISA */}
          <span className="text-white font-black italic text-xl tracking-tighter">VISA</span>
          {/* AMEX */}
          <div className="flex flex-col items-center">
             <span className="text-[8px] text-white font-bold leading-none">AMERICAN</span>
             <span className="text-[10px] text-white font-black leading-none">EXPRESS</span>
          </div>
          {/* troy */}
          <div className="flex items-center gap-1">
             <span className="text-white font-black italic text-2xl">troy</span>
             <span className="text-[8px] text-white/70">®</span>
          </div>
        </div>

        {/* Elden Taksit Bölümü */}
        <div className="flex items-center gap-3">
          <div className="flex flex-col items-end">
            <span className="text-white font-black uppercase italic leading-none" style={{ fontSize: '18px' }}>Elden Taksit</span>
            <span className="text-white/70 text-[8px] font-bold uppercase tracking-widest">vize home güvencesiyle</span>
          </div>
          <div className="w-8 h-8 rounded-full border-2 border-white flex items-center justify-center">
            <div className="w-5 h-5 border-2 border-white rounded-full flex items-center justify-center">
               <div className="w-2 h-2 bg-white rounded-full" />
            </div>
          </div>
        </div>
      </div>

    </div>
  );
};

export default LabelPreview;
