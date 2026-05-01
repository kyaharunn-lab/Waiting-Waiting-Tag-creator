
"use client";

import React from 'react';
import { LabelData } from '@/lib/types';
import { Handshake } from 'lucide-react';

interface LabelPreviewProps {
  data: LabelData;
}

const LabelPreview: React.FC<LabelPreviewProps> = ({ data }) => {
  return (
    <div className="label-preview-container bg-white border border-gray-100 flex flex-col shadow-none print:shadow-none">
      {/* Üst Görsel Alanı - Tamamen Temiz ve Beyaz */}
      <div className="w-full h-[220px] bg-white flex items-center justify-center overflow-hidden shrink-0 border-b border-gray-50">
        {data.productImage ? (
          <img 
            src={data.productImage} 
            alt="Ürün" 
            className="w-full h-full object-contain object-center block" 
          />
        ) : (
          /* Görsel yokken bomboş beyaz alan */
          <div className="w-full h-full bg-white" />
        )}
      </div>

      {/* Ana İçerik Alanı */}
      <div className="flex-1 flex flex-col items-center px-8 pt-8 pb-4">
        {/* Başlık */}
        <div className="text-center w-full mb-4">
          <h2 className={`font-black uppercase text-[#1A1A1A] tracking-tighter leading-none mb-4 ${
            data.productTitle.length > 30 ? 'text-4xl' : 'text-5xl'
          }`}>
            {data.productTitle || "Ürün Başlığı"}
          </h2>
          <div className="w-24 h-1.5 bg-[#A11D21] mx-auto rounded-full"></div>
        </div>

        {/* Fiyatlar - Devasa */}
        <div className="grid grid-cols-2 w-full border-b border-gray-100 pb-4 mb-4">
          <div className="flex flex-col items-center border-r border-gray-100 px-4">
            <span className="text-[10px] text-gray-400 font-black uppercase tracking-[0.2em] mb-1">Peşin Fiyat</span>
            <div className="flex items-start text-[#A11D21] font-black">
              <span className="text-7xl tracking-tighter tabular-nums leading-none">{data.totalCashPrice}</span>
              <span className="text-2xl mt-1 ml-0.5">₺</span>
            </div>
          </div>
          <div className="flex flex-col items-center px-4">
            <span className="text-[10px] text-gray-400 font-black uppercase tracking-[0.2em] mb-1">Taksitli Fiyat</span>
            <div className="flex items-start text-[#A11D21] font-black">
              <span className="text-7xl tracking-tighter tabular-nums leading-none">{data.totalInstallmentPrice}</span>
              <span className="text-2xl mt-1 ml-0.5">₺</span>
            </div>
          </div>
        </div>

        {/* Tablo */}
        <div className="w-full flex-1 overflow-hidden">
          <table className="w-full border-collapse">
            <thead>
              <tr className="text-[9px] text-gray-400 font-black uppercase tracking-[0.3em]">
                <th className="py-2 text-left">Ürün Detayı</th>
                <th className="py-2 text-center">Adet</th>
                <th className="py-2 text-center">Peşin</th>
                <th className="py-2 text-center">Taksit</th>
                <th className="py-2 text-right">Ölçüler (G/D/Y)</th>
              </tr>
            </thead>
            <tbody>
              <tr className="text-[#1A1A1A] font-bold text-xs uppercase border-t border-gray-50">
                <td className="py-4 text-sm w-1/3 leading-tight">{data.tableProductName}</td>
                <td className="py-4 text-center font-black text-sm">{data.quantity}</td>
                <td className="py-4 text-center">
                  <div className="flex flex-col">
                    <span className="text-sm">{data.tableCashPrice}</span>
                    <span className="text-[10px]">₺</span>
                  </div>
                </td>
                <td className="py-4 text-center">
                   <div className="flex flex-col">
                    <span className="text-sm">{data.tableInstallmentPrice}</span>
                    <span className="text-[10px]">₺</span>
                  </div>
                </td>
                <td className="py-4 text-right font-black text-sm tracking-tighter">
                  {data.gen}x{data.der}x{data.yuk}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Alt Bar - Logolar */}
      <div className="bg-[#A11D21] h-20 w-full px-6 flex items-center justify-between mt-auto">
        <div className="flex items-center gap-6">
           <div className="flex flex-col items-center">
             <div className="flex -space-x-2">
               <div className="w-4 h-4 rounded-full bg-white/20"></div>
               <div className="w-4 h-4 rounded-full bg-white/40"></div>
             </div>
             <span className="text-[7px] text-white/80 font-bold uppercase mt-0.5">mastercard</span>
           </div>
           <div className="text-xl text-white font-black italic tracking-tighter">VISA</div>
           <div className="text-[10px] text-white font-black uppercase leading-none text-center">
             American<br/>Express
           </div>
           <div className="text-lg text-white font-black italic tracking-tighter">troy</div>
        </div>

        <div className="flex items-center gap-3 border-l border-white/20 pl-6 h-10">
           <Handshake className="text-white/90" size={24} />
           <div className="flex flex-col text-white">
             <span className="text-[12px] font-black uppercase leading-none tracking-wider">Elden Taksit</span>
             <span className="text-[9px] font-medium uppercase tracking-[0.2em] opacity-80 mt-0.5">İmkanı</span>
           </div>
        </div>
      </div>
    </div>
  );
};

export default LabelPreview;
