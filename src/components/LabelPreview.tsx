
"use client";

import React from 'react';
import { LabelData } from '@/lib/types';
import { Sofa, Lamp, CreditCard, Handshake } from 'lucide-react';

interface LabelPreviewProps {
  data: LabelData;
}

const LabelPreview: React.FC<LabelPreviewProps> = ({ data }) => {
  return (
    <div className="label-preview-container flex flex-col h-full bg-white shadow-2xl border border-gray-100 relative overflow-hidden">
      {/* Curved Brand Header Section */}
      <div className="relative h-[45%] w-full flex flex-col items-center justify-start pt-12">
        {/* The large circular background element */}
        <div className="absolute top-[-40%] left-[-10%] w-[120%] aspect-square bg-[#A11D21] rounded-full z-0 flex flex-col items-center justify-end pb-32">
           {/* Logo within the circle */}
           <div className="flex flex-col items-center mb-10">
              <h1 className="font-headline text-8xl font-bold tracking-tighter leading-none text-white italic">vize</h1>
              <p className="font-headline text-2xl tracking-[0.4em] font-medium uppercase text-white/90 -mt-2">home</p>
           </div>
        </div>

        {/* Illustration Area (Sofa and Lamp) */}
        <div className="z-10 mt-auto mb-[-2px] relative w-full max-w-[500px] flex items-end justify-center px-10">
          {/* Lamp */}
          <div className="absolute left-12 bottom-0 flex flex-col items-center">
            <div className="w-12 h-14 bg-white rounded-sm shadow-sm"></div>
            <div className="w-1 h-32 bg-[#4A201B]"></div>
            <div className="w-10 h-4 bg-[#4A201B] rounded-t-full"></div>
          </div>
          
          {/* Sofa Illustration (Stylized SVG) */}
          <div className="relative z-20 w-full bg-white p-2 rounded-lg shadow-xl border border-gray-100">
             <div className="bg-[#A11D21]/5 p-6 rounded-md flex items-center justify-center">
                <Sofa size={140} className="text-[#A11D21]" strokeWidth={1} />
             </div>
          </div>
          
          {/* Rug Pattern */}
          <div className="absolute bottom-[-10px] w-full h-8 bg-repeat-x opacity-20" 
               style={{backgroundImage: 'repeating-linear-gradient(45deg, #A11D21, #A11D21 2px, transparent 2px, transparent 10px)'}}>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col p-8 gap-6 z-20">
        {/* Product Title - Clean and Large */}
        <div className="text-center py-4">
          <h2 className={`font-headline uppercase leading-tight tracking-wide font-black text-[#1A1A1A] transition-all duration-300 ${
            data.productTitle.length > 30 ? 'text-4xl' : data.productTitle.length > 20 ? 'text-5xl' : 'text-6xl'
          }`}>
            {data.productTitle || "Ürün Başlığı"}
          </h2>
          <div className="w-24 h-1.5 bg-[#A11D21] mx-auto mt-4 rounded-full"></div>
        </div>

        {/* Pricing Section */}
        <div className="grid grid-cols-2 gap-8 px-4">
          <div className="flex flex-col items-center py-6 border-r border-gray-100">
            <span className="text-gray-400 font-bold uppercase tracking-[0.2em] text-sm mb-2">Peşin Fiyat</span>
            <div className="flex items-start gap-1 text-[#A11D21]">
              <span className="text-7xl font-headline font-black tabular-nums tracking-tighter">
                {data.totalCashPrice || "0"}
              </span>
              <span className="text-3xl font-bold mt-2">₺</span>
            </div>
          </div>
          <div className="flex flex-col items-center py-6">
            <span className="text-gray-400 font-bold uppercase tracking-[0.2em] text-sm mb-2">Taksitli Fiyat</span>
            <div className="flex items-start gap-1 text-[#A11D21]">
              <span className="text-7xl font-headline font-black tabular-nums tracking-tighter">
                {data.totalInstallmentPrice || "0"}
              </span>
              <span className="text-3xl font-bold mt-2">₺</span>
            </div>
          </div>
        </div>

        {/* Product Details Table - Simplified and elegant */}
        <div className="mt-2 border-t border-gray-100 pt-6">
          <table className="w-full text-left">
            <thead>
              <tr className="text-[10px] font-black text-gray-400 uppercase tracking-[0.3em]">
                <th className="pb-4 w-1/3">Ürün Detayı</th>
                <th className="pb-4 text-center">Adet</th>
                <th className="pb-4 text-center">Peşin</th>
                <th className="pb-4 text-center">Taksit</th>
                <th className="pb-4 text-center">G / D / Y</th>
              </tr>
            </thead>
            <tbody className="text-sm">
              <tr className="text-gray-900 font-bold uppercase">
                <td className="py-2">{data.tableProductName}</td>
                <td className="py-2 text-center">{data.quantity}</td>
                <td className="py-2 text-center tabular-nums">{data.tableCashPrice} ₺</td>
                <td className="py-2 text-center tabular-nums">{data.tableInstallmentPrice} ₺</td>
                <td className="py-2 text-center font-mono text-xs">{data.gen}x{data.der}x{data.yuk}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Solid Red Footer with Logos */}
      <div className="bg-[#A11D21] text-white py-6 px-10 mt-auto flex items-center justify-between z-20">
        <div className="flex items-center gap-10">
          <div className="flex flex-col items-center">
             <div className="flex gap-1 mb-1">
               <div className="w-4 h-4 bg-white/20 rounded-full"></div>
               <div className="w-4 h-4 bg-white/40 rounded-full -ml-2"></div>
             </div>
             <span className="text-[8px] font-black uppercase tracking-tighter">mastercard</span>
          </div>
          <div className="text-xl font-black italic tracking-tighter">VISA</div>
          <div className="flex flex-col items-center">
             <div className="text-[10px] font-black uppercase leading-none">American</div>
             <div className="text-[10px] font-black uppercase leading-none">Express</div>
          </div>
          <div className="text-xl font-black italic tracking-tighter">troy</div>
        </div>
        
        <div className="flex items-center gap-3 border-l border-white/20 pl-10">
          <Handshake size={28} className="text-white/90" />
          <div className="flex flex-col">
            <span className="text-[10px] font-black uppercase tracking-widest leading-none">Elden Taksit</span>
            <span className="text-[8px] font-medium uppercase opacity-70 tracking-widest">İmkanı</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LabelPreview;
