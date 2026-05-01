"use client";

import React from 'react';
import { LabelData } from '@/lib/types';
import { Sofa, Handshake } from 'lucide-react';

interface LabelPreviewProps {
  data: LabelData;
}

const LabelPreview: React.FC<LabelPreviewProps> = ({ data }) => {
  return (
    <div className="label-preview-container flex flex-col h-full bg-white relative">
      {/* Üst Kırmızı Alan - Büyük Daire Formu */}
      <div className="relative h-[42%] w-full overflow-hidden">
        <div className="absolute top-[-55%] left-[-15%] w-[130%] aspect-square bg-[#A11D21] rounded-full flex flex-col items-center justify-end pb-24">
           {/* Logo Grubu */}
           <div className="flex flex-col items-center mb-8">
              <h1 className="font-headline text-[10rem] font-bold tracking-tighter leading-none text-white italic">vize</h1>
              <p className="font-headline text-3xl tracking-[0.5em] font-semibold uppercase text-white/90 -mt-4">home</p>
           </div>
        </div>

        {/* Mobilya İllüstrasyon Alanı (Kırmızı alanın üzerine biniyor) */}
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[85%] z-20">
          <div className="bg-white p-4 rounded-xl shadow-2xl border border-gray-100 flex items-center justify-center">
             <div className="bg-[#A11D21]/5 w-full p-8 rounded-lg flex items-center justify-center">
                <Sofa size={160} className="text-[#A11D21]" strokeWidth={1} />
             </div>
             {/* Lamba Aksesuarı */}
             <div className="absolute -left-6 bottom-0 hidden lg:flex flex-col items-center">
                <div className="w-10 h-12 bg-white rounded shadow-sm border border-gray-100"></div>
                <div className="w-1 h-24 bg-[#4A201B]"></div>
             </div>
          </div>
        </div>
      </div>

      {/* Ana Bilgi Alanı */}
      <div className="flex-1 flex flex-col px-10 pt-16 pb-6 space-y-8">
        {/* Ürün İsmi */}
        <div className="text-center">
          <h2 className={`font-headline uppercase font-black text-[#1A1A1A] tracking-tight leading-none transition-all duration-300 ${
            data.productTitle.length > 30 ? 'text-4xl' : data.productTitle.length > 20 ? 'text-5xl' : 'text-6xl'
          }`}>
            {data.productTitle || "Ürün Başlığı"}
          </h2>
          <div className="w-32 h-2 bg-[#A11D21] mx-auto mt-6 rounded-full"></div>
        </div>

        {/* Fiyatlar - Çok Daha Büyük ve Belirgin */}
        <div className="grid grid-cols-2 gap-0 border-y border-gray-100 py-4">
          <div className="flex flex-col items-center border-r border-gray-100">
            <span className="text-gray-400 font-bold uppercase tracking-[0.25em] text-xs mb-1">Peşin Fiyat</span>
            <div className="flex items-start gap-1 text-[#A11D21]">
              <span className="text-8xl font-headline font-black tracking-tighter tabular-nums">
                {data.totalCashPrice || "0"}
              </span>
              <span className="text-4xl font-black mt-3">₺</span>
            </div>
          </div>
          <div className="flex flex-col items-center">
            <span className="text-gray-400 font-bold uppercase tracking-[0.25em] text-xs mb-1">Taksitli Fiyat</span>
            <div className="flex items-start gap-1 text-[#A11D21]">
              <span className="text-8xl font-headline font-black tracking-tighter tabular-nums">
                {data.totalInstallmentPrice || "0"}
              </span>
              <span className="text-4xl font-black mt-3">₺</span>
            </div>
          </div>
        </div>

        {/* Detay Tablosu */}
        <div className="flex-1">
          <table className="w-full">
            <thead>
              <tr className="text-[11px] font-black text-gray-400 uppercase tracking-[0.3em] border-b border-gray-50">
                <th className="pb-3 text-left">Ürün Detayı</th>
                <th className="pb-3 text-center">Adet</th>
                <th className="pb-3 text-center">Peşin</th>
                <th className="pb-3 text-center">Taksit</th>
                <th className="pb-3 text-right">Ölçüler (G/D/Y)</th>
              </tr>
            </thead>
            <tbody className="text-sm">
              <tr className="text-[#1A1A1A] font-bold uppercase">
                <td className="py-4 text-base">{data.tableProductName}</td>
                <td className="py-4 text-center text-lg">{data.quantity}</td>
                <td className="py-4 text-center tabular-nums text-lg">{data.tableCashPrice} ₺</td>
                <td className="py-4 text-center tabular-nums text-lg">{data.tableInstallmentPrice} ₺</td>
                <td className="py-4 text-right font-mono text-base">{data.gen}x{data.der}x{data.yuk}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Alt Kırmızı Şerit ve Logolar */}
      <div className="bg-[#A11D21] text-white h-24 px-12 flex items-center justify-between shrink-0">
        <div className="flex items-center gap-10">
          <div className="flex flex-col items-center">
             <div className="flex gap-1 mb-1">
               <div className="w-5 h-5 bg-white/20 rounded-full"></div>
               <div className="w-5 h-5 bg-white/40 rounded-full -ml-3"></div>
             </div>
             <span className="text-[10px] font-black uppercase tracking-tighter">mastercard</span>
          </div>
          <div className="text-3xl font-black italic tracking-tighter">VISA</div>
          <div className="flex flex-col items-center">
             <div className="text-[12px] font-black uppercase leading-none">American</div>
             <div className="text-[12px] font-black uppercase leading-none">Express</div>
          </div>
          <div className="text-2xl font-black italic tracking-tighter">troy</div>
        </div>
        
        <div className="flex items-center gap-4 border-l border-white/20 pl-10">
          <Handshake size={36} className="text-white/90" />
          <div className="flex flex-col">
            <span className="text-[14px] font-black uppercase tracking-widest leading-none">Elden Taksit</span>
            <span className="text-[11px] font-medium uppercase opacity-70 tracking-widest mt-1">İmkanı</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LabelPreview;