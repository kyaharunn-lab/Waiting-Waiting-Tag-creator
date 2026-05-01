"use client";

import React from 'react';
import { LabelData } from '@/lib/types';

interface LabelPreviewProps {
  data: LabelData;
}

const LabelPreview: React.FC<LabelPreviewProps> = ({ data }) => {
  return (
    <div className="a5-container relative bg-white overflow-hidden shadow-none border border-zinc-200 print:border-none font-sans select-none">
      
      {/* 1. KIRMIZI ÜST ALAN (HEADER) */}
      <div className="relative h-[34%] w-full bg-[#9f2732] flex flex-col items-center justify-start pt-6">
        {/* Beyaz Dairesel Kesik Detayı */}
        <div className="absolute top-0 left-0 w-12 h-12 bg-white rounded-br-full" />
        <div className="absolute top-0 right-0 w-12 h-12 bg-white rounded-bl-full" />
        
        {/* LOGO ALANI */}
        <div className="flex flex-col items-end">
          <h1 className="text-white font-black italic tracking-tighter leading-none" style={{ fontSize: '72px' }}>
            vize
          </h1>
          <span className="text-white font-bold tracking-widest -mt-2 uppercase" style={{ fontSize: '14px' }}>
            home
          </span>
        </div>

        {/* KOLTUK İLLÜSTRASYONU (Sade Çizim) */}
        <div className="mt-4 opacity-90">
          <svg width="120" height="60" viewBox="0 0 120 60" fill="none" xmlns="http://www.w3.org/2000/svg">
             <path d="M10 40H110V50H10V40Z" fill="white"/>
             <path d="M15 25C15 20 25 15 35 15H85C95 15 105 20 105 25V40H15V25Z" fill="white"/>
             <path d="M5 25H15V40H5V25Z" fill="white"/>
             <path d="M105 25H115V40H105V25Z" fill="white"/>
             <circle cx="95" cy="10" r="4" fill="white"/>
             <line x1="95" y1="14" x2="95" y2="25" stroke="white" strokeWidth="2"/>
          </svg>
        </div>
      </div>

      {/* 2. BEYAZ ORTA ALAN & ÜRÜN BAŞLIĞI */}
      <div className="flex flex-col items-center w-full mt-10">
        {/* Siyah Başlık Barı */}
        <div className="w-[84%] bg-[#1a1a1a] py-2 px-4 flex items-center justify-center">
          <h2 className="text-white font-bold uppercase text-center truncate leading-tight" style={{ fontSize: '20px', letterSpacing: '0.05em' }}>
            {data.productTitle}
          </h2>
        </div>

        {/* Fiyat Kutusu (Gri Alan) */}
        <div className="w-[84%] mt-2 bg-[#ded8d5] flex border border-zinc-300">
          <div className="flex-1 p-3 border-r border-zinc-300 flex flex-col items-center">
            <span className="text-[10px] font-bold text-zinc-600 uppercase mb-1">Peşin Fiyat</span>
            <div className="text-[#9f2732] font-black" style={{ fontSize: '32px' }}>
              {data.totalCashPrice} <span className="text-xl">₺</span>
            </div>
          </div>
          <div className="flex-1 p-3 flex flex-col items-center">
            <span className="text-[10px] font-bold text-zinc-600 uppercase mb-1">Taksitli Fiyat</span>
            <div className="text-[#9f2732] font-black" style={{ fontSize: '32px' }}>
              {data.totalInstallmentPrice} <span className="text-xl">₺</span>
            </div>
          </div>
        </div>
      </div>

      {/* 3. TABLO (EXCEL TARZI) */}
      <div className="w-[92%] mx-auto mt-8 overflow-hidden">
        <table className="w-full border-collapse border border-zinc-800 text-[11px] uppercase">
          <thead>
            <tr className="bg-[#ded8d5]">
              <th className="border border-zinc-800 p-1 text-left w-[35%] font-bold">Ürün</th>
              <th className="border border-zinc-800 p-1 text-center font-bold">Adet</th>
              <th className="border border-zinc-800 p-1 text-center font-bold">Peşin</th>
              <th className="border border-zinc-800 p-1 text-center font-bold">Taksit</th>
              <th className="border border-zinc-800 p-1 text-center font-bold">Gen</th>
              <th className="border border-zinc-800 p-1 text-center font-bold">Der</th>
              <th className="border border-zinc-800 p-1 text-center font-bold">Yük</th>
            </tr>
          </thead>
          <tbody>
            {/* Dinamik Veri Satırı */}
            <tr>
              <td className="border border-zinc-800 p-1 font-medium truncate">{data.tableProductName}</td>
              <td className="border border-zinc-800 p-1 text-center">{data.quantity}</td>
              <td className="border border-zinc-800 p-1 text-center">{data.tableCashPrice}</td>
              <td className="border border-zinc-800 p-1 text-center">{data.tableInstallmentPrice}</td>
              <td className="border border-zinc-800 p-1 text-center">{data.gen}</td>
              <td className="border border-zinc-800 p-1 text-center">{data.der}</td>
              <td className="border border-zinc-800 p-1 text-center">{data.yuk}</td>
            </tr>
            {/* Boş Satırlar (Excel Görünümü İçin) */}
            {[1, 2, 3, 4].map((i) => (
              <tr key={i} className="h-6">
                <td className="border border-zinc-800 p-1"></td>
                <td className="border border-zinc-800 p-1"></td>
                <td className="border border-zinc-800 p-1"></td>
                <td className="border border-zinc-800 p-1"></td>
                <td className="border border-zinc-800 p-1"></td>
                <td className="border border-zinc-800 p-1"></td>
                <td className="border border-zinc-800 p-1"></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* 4. ALT ÖDEME ŞERİDİ (FOOTER) */}
      <div className="absolute bottom-0 left-0 w-full h-10 bg-[#9f2732] flex items-center justify-between px-6 text-white">
        <div className="flex items-center gap-4 text-[9px] font-bold">
          <span>MasterCard</span>
          <span>VISA</span>
          <span>AMERICAN EXPRESS</span>
          <span className="italic">troy</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-[11px] font-black uppercase tracking-tight italic">Elden Taksit</span>
          <div className="w-5 h-5 bg-white rounded-full flex items-center justify-center">
            <div className="w-3 h-3 border-2 border-[#9f2732] rounded-full" />
          </div>
        </div>
      </div>

    </div>
  );
};

export default LabelPreview;
