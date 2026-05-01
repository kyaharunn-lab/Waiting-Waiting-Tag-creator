"use client";

import React from 'react';
import { LabelData } from '@/lib/types';

interface LabelPreviewProps {
  data: LabelData;
}

const LabelPreview: React.FC<LabelPreviewProps> = ({ data }) => {
  return (
    <div className="a5-container">
      {/* 1. HEADER (Kırmızı/Bordo Üst Alan) */}
      <div className="relative h-[34%] bg-[#9f2732] flex flex-col items-center justify-start pt-6 overflow-hidden">
        {/* Dekoratif Dairesel Kesim */}
        <div className="absolute bottom-[-50%] left-[-20%] right-[-20%] h-[150%] bg-[#d82027] rounded-[100%] z-0 opacity-20 transform translate-y-1/2"></div>
        
        {/* Marka Logosu */}
        <div className="relative z-10 text-center text-white mb-4">
          <div className="text-7xl font-bold tracking-tighter leading-none italic">vize</div>
          <div className="text-xl font-normal text-right pr-2">home</div>
        </div>

        {/* Koltuk & Lamba İllüstrasyonu (Basit SVG Temsili) */}
        <div className="relative z-10 w-48 h-24 mt-auto mb-4 flex items-end justify-center">
          {/* Lamba */}
          <div className="absolute left-0 bottom-0 flex flex-col items-center">
             <div className="w-8 h-8 bg-white/90 rounded-t-sm mb-[-2px]"></div>
             <div className="w-0.5 h-16 bg-white/70"></div>
             <div className="w-4 h-1 bg-white/70"></div>
          </div>
          {/* Koltuk */}
          <div className="w-40 h-20 border-2 border-white/90 rounded-t-lg bg-white/10 flex flex-col p-1">
             <div className="flex-1 flex gap-1">
                <div className="flex-1 border border-white/50 rounded-sm"></div>
                <div className="flex-1 border border-white/50 rounded-sm"></div>
             </div>
             <div className="h-6 border-t border-white/50 flex gap-4 px-2">
                <div className="w-2 h-4 border-l border-white/50 mt-1"></div>
                <div className="w-2 h-4 border-r border-white/50 mt-1 ml-auto"></div>
             </div>
          </div>
        </div>
      </div>

      {/* 2. ANA İÇERİK (Beyaz Alan) */}
      <div className="flex-1 flex flex-col items-center pt-8 px-6">
        
        {/* Ürün Başlığı (Siyah Bar) */}
        <div className="w-[84%] bg-[#2d2d2d] py-2 px-4 mb-6">
          <h2 className="text-white text-lg font-bold text-center uppercase tracking-wide truncate">
            {data.productTitle || "Ürün Başlığı Giriniz"}
          </h2>
        </div>

        {/* Fiyat Kutusu (Gri/Bej) */}
        <div className="w-[84%] bg-[#ded8d5] flex mb-8">
          <div className="flex-1 border-r border-white/30 py-3 text-center">
            <div className="text-[10px] font-bold text-gray-700 uppercase mb-1">Peşin Fiyat</div>
            <div className="text-2xl font-black text-[#2d2d2d]">
              {data.totalCashPrice} <span className="text-lg">₺</span>
            </div>
          </div>
          <div className="flex-1 py-3 text-center">
            <div className="text-[10px] font-bold text-gray-700 uppercase mb-1">Taksitli Fiyat</div>
            <div className="text-2xl font-black text-[#2d2d2d]">
              {data.totalInstallmentPrice} <span className="text-lg">₺</span>
            </div>
          </div>
        </div>

        {/* Tablo (Excel Stili) */}
        <div className="w-full">
          <table className="w-full border-collapse border border-gray-400 text-[10px]">
            <thead>
              <tr className="bg-[#ded8d5]">
                <th className="border border-gray-400 py-1 px-2 text-left w-2/5">ÜRÜN</th>
                <th className="border border-gray-400 py-1 px-1 text-center">ADET</th>
                <th className="border border-gray-400 py-1 px-1 text-center">PEŞİN</th>
                <th className="border border-gray-400 py-1 px-1 text-center">TAKSİT</th>
                <th className="border border-gray-400 py-1 px-1 text-center">GEN</th>
                <th className="border border-gray-400 py-1 px-1 text-center">DER</th>
                <th className="border border-gray-400 py-1 px-1 text-center">YÜK</th>
              </tr>
            </thead>
            <tbody>
              {/* Veri Satırı */}
              <tr>
                <td className="border border-gray-400 py-1.5 px-2 font-bold uppercase truncate">{data.tableProductName}</td>
                <td className="border border-gray-400 py-1.5 px-1 text-center font-bold">{data.quantity}</td>
                <td className="border border-gray-400 py-1.5 px-1 text-center font-bold">{data.tableCashPrice}</td>
                <td className="border border-gray-400 py-1.5 px-1 text-center font-bold">{data.tableInstallmentPrice}</td>
                <td className="border border-gray-400 py-1.5 px-1 text-center font-bold">{data.gen}</td>
                <td className="border border-gray-400 py-1.5 px-1 text-center font-bold">{data.der}</td>
                <td className="border border-gray-400 py-1.5 px-1 text-center font-bold">{data.yuk}</td>
              </tr>
              {/* Boş Satırlar (Excel Görünümü İçin) */}
              {[1, 2, 3, 4].map((i) => (
                <tr key={i} className="h-6">
                  <td className="border border-gray-400"></td>
                  <td className="border border-gray-400"></td>
                  <td className="border border-gray-400"></td>
                  <td className="border border-gray-400"></td>
                  <td className="border border-gray-400"></td>
                  <td className="border border-gray-400"></td>
                  <td className="border border-gray-400"></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* 3. FOOTER (Kırmızı Ödeme Şeridi) */}
      <div className="h-14 bg-[#9f2732] mt-auto flex items-center justify-between px-6 text-white overflow-hidden">
        <div className="flex gap-4 items-center scale-75 origin-left">
           {/* Kart Logoları Temsili */}
           <div className="flex items-center gap-1 opacity-90">
             <div className="w-5 h-5 rounded-full bg-orange-500 opacity-80"></div>
             <div className="w-5 h-5 rounded-full bg-red-500 ml-[-8px] opacity-80"></div>
             <span className="text-[8px] font-bold">mastercard</span>
           </div>
           <div className="flex items-center gap-1 italic font-black text-lg skew-x-[-15deg] opacity-90">
             VISA
           </div>
           <div className="flex flex-col items-start leading-none opacity-90">
             <span className="text-[6px] font-bold">AMERICAN</span>
             <span className="text-[8px] font-black">EXPRESS</span>
           </div>
           <div className="text-lg font-black opacity-90 italic">troy</div>
        </div>
        
        <div className="flex items-center gap-2">
           <svg viewBox="0 0 24 24" className="w-5 h-5 fill-white" xmlns="http://www.w3.org/2000/svg">
             <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1.41 16.09V20h-2.82v-1.91h2.82zm3.3-3.06c-.31.39-.7.71-1.18.96-.48.25-1.01.38-1.58.38-.58 0-1.11-.13-1.59-.38-.48-.25-.87-.57-1.18-.96-.31-.39-.55-.84-.71-1.35s-.24-1.07-.24-1.68V9h2.82v3.38c0 .35.03.62.08.82.05.2.14.36.27.49s.3.23.51.3c.21.07.45.1.72.1s.51-.03.72-.1c.21-.07.38-.17.51-.3.13-.13.22-.29.27-.49.05-.2.08-.47.08-.82V9h2.82v3.38c0 .61-.08 1.17-.24 1.68-.16.51-.4.96-.71 1.35z"/>
           </svg>
           <div className="text-right">
             <div className="text-[10px] font-bold italic leading-none">Elden Taksit</div>
             <div className="text-[6px] opacity-70">Türkiye'nin Ödeme Sistemi</div>
           </div>
        </div>
      </div>
    </div>
  );
};

export default LabelPreview;