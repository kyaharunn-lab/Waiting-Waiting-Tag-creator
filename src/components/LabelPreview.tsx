
"use client";

import React from 'react';
import { LabelData } from '@/lib/types';
import { Sofa, CreditCard, CheckCircle2 } from 'lucide-react';

interface LabelPreviewProps {
  data: LabelData;
}

const LabelPreview: React.FC<LabelPreviewProps> = ({ data }) => {
  return (
    <div className="label-preview-container flex flex-col h-full bg-white shadow-2xl border border-gray-100">
      {/* Brand Header */}
      <div className="bg-[#72241D] text-white py-12 px-8 flex flex-col items-center justify-center relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -mr-16 -mt-16 blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-32 h-32 bg-white/5 rounded-full -ml-16 -mb-16 blur-3xl"></div>
        <h1 className="font-headline text-8xl font-extrabold tracking-tighter leading-none mb-0">vize</h1>
        <p className="font-headline text-2xl tracking-[0.5em] font-medium uppercase opacity-90 -mt-2">home</p>
      </div>

      <div className="flex-1 flex flex-col p-10 gap-8">
        {/* Visual / Logo Placeholder */}
        <div className="flex justify-center items-center py-6 border-2 border-dashed border-gray-100 rounded-2xl bg-gray-50/50">
          <Sofa size={120} className="text-[#72241D]/20" strokeWidth={1} />
        </div>

        {/* Product Title Bar */}
        <div className="bg-black text-white py-6 px-8 flex items-center justify-center text-center rounded-lg shadow-lg">
          <h2 className={`font-headline uppercase leading-tight tracking-wide transition-all duration-300 ${
            data.productTitle.length > 30 ? 'text-2xl' : data.productTitle.length > 20 ? 'text-3xl' : 'text-4xl'
          } font-bold`}>
            {data.productTitle || "Ürün Başlığı Giriniz"}
          </h2>
        </div>

        {/* Main Prices Area */}
        <div className="grid grid-cols-2 gap-6 mt-2">
          <div className="bg-[#F4F1F0] rounded-xl p-8 border border-[#72241D]/10 flex flex-col items-center justify-center group hover:bg-[#72241D]/5 transition-colors">
            <span className="text-gray-500 font-semibold uppercase tracking-widest text-sm mb-3">Peşin Fiyat</span>
            <div className="flex items-end gap-1 text-[#72241D]">
              <span className="text-6xl font-headline font-extrabold tabular-nums">
                {data.totalCashPrice || "0"}
              </span>
              <span className="text-3xl font-bold mb-2">₺</span>
            </div>
          </div>
          <div className="bg-[#F4F1F0] rounded-xl p-8 border border-[#CC6691]/10 flex flex-col items-center justify-center hover:bg-[#CC6691]/5 transition-colors">
            <span className="text-gray-500 font-semibold uppercase tracking-widest text-sm mb-3">Taksitli Fiyat</span>
            <div className="flex items-end gap-1 text-[#CC6691]">
              <span className="text-6xl font-headline font-extrabold tabular-nums">
                {data.totalInstallmentPrice || "0"}
              </span>
              <span className="text-3xl font-bold mb-2">₺</span>
            </div>
          </div>
        </div>

        {/* Product Details Table */}
        <div className="mt-4 border-2 border-gray-100 rounded-xl overflow-hidden shadow-sm">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50 border-b-2 border-gray-100 text-[11px] font-bold text-gray-400 uppercase tracking-widest">
                <th className="px-5 py-4 w-1/3">Ürün</th>
                <th className="px-3 py-4 text-center">Adet</th>
                <th className="px-3 py-4 text-center">Peşin</th>
                <th className="px-3 py-4 text-center">Taksit</th>
                <th className="px-3 py-4 text-center">Gen</th>
                <th className="px-3 py-4 text-center">Der</th>
                <th className="px-3 py-4 text-center">Yük</th>
              </tr>
            </thead>
            <tbody className="text-sm font-medium">
              <tr className="border-b border-gray-50 bg-white">
                <td className="px-5 py-5 text-gray-800 font-bold uppercase">{data.tableProductName}</td>
                <td className="px-3 py-5 text-center text-gray-600">{data.quantity}</td>
                <td className="px-3 py-5 text-center text-gray-600 tabular-nums">{data.tableCashPrice}</td>
                <td className="px-3 py-5 text-center text-gray-600 tabular-nums">{data.tableInstallmentPrice}</td>
                <td className="px-3 py-5 text-center text-gray-600 tabular-nums font-mono">{data.gen}</td>
                <td className="px-3 py-5 text-center text-gray-600 tabular-nums font-mono">{data.der}</td>
                <td className="px-3 py-5 text-center text-gray-600 tabular-nums font-mono">{data.yuk}</td>
              </tr>
              {/* Dummy rows for visual balance */}
              {[...Array(3)].map((_, i) => (
                <tr key={i} className="border-b border-gray-50 opacity-10">
                  <td className="px-5 py-5">&nbsp;</td>
                  <td className="px-3 py-5">&nbsp;</td>
                  <td className="px-3 py-5">&nbsp;</td>
                  <td className="px-3 py-5">&nbsp;</td>
                  <td className="px-3 py-5">&nbsp;</td>
                  <td className="px-3 py-5">&nbsp;</td>
                  <td className="px-3 py-5">&nbsp;</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Brand Footer / Payment Strip */}
      <div className="bg-[#72241D] text-white py-4 px-10 mt-auto flex items-center justify-between gap-6 overflow-hidden">
        <div className="flex items-center gap-8 opacity-90 grayscale brightness-200">
          <div className="text-[10px] font-bold uppercase tracking-widest">Mastercard</div>
          <div className="text-[10px] font-bold uppercase tracking-widest">VISA</div>
          <div className="text-[10px] font-bold uppercase tracking-widest">AMEX</div>
          <div className="text-[10px] font-bold uppercase tracking-widest italic">troy</div>
        </div>
        <div className="flex items-center gap-2">
          <CheckCircle2 size={14} className="text-[#CC6691]" />
          <span className="text-[10px] font-bold uppercase tracking-widest whitespace-nowrap">Elden Taksit İmkanı</span>
        </div>
      </div>
    </div>
  );
};

export default LabelPreview;
