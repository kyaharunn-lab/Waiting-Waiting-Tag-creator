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
      {/* 1. ARKA PLAN ŞABLONU (Kullanıcının yüklediği görsel) */}
      {data.productImage ? (
        <img 
          src={data.productImage} 
          alt="Etiket Şablonu" 
          className="absolute inset-0 w-full h-full object-fill z-0" 
        />
      ) : (
        <div className="absolute inset-0 flex items-center justify-center bg-zinc-50 text-zinc-300 text-sm italic z-0">
          Lütfen bir şablon görseli yükleyin
        </div>
      )}

      {/* 2. DİNAMİK VERİ KATMANI (OVERLAY) */}
      {/* Bu katman sadece metinleri içerir, uygulama kendi kutularını veya çizgilerini çizmez */}
      <div className="absolute inset-0 z-10 pointer-events-none">
        
        {/* Ürün Başlığı - Şablondaki siyah barın olduğu bölgeye denk gelir */}
        <div 
          className="absolute left-[8%] right-[8%] text-center flex items-center justify-center" 
          style={{ top: '37.5%', height: '36px' }}
        >
          <h2 className="text-white font-bold uppercase tracking-wide leading-none" style={{ fontSize: '22px' }}>
            {data.productTitle}
          </h2>
        </div>

        {/* Fiyat Alanı - Şablondaki gri kutuların olduğu bölgeye denk gelir */}
        <div className="absolute left-[8%] right-[8%] flex justify-between" style={{ top: '46.5%' }}>
          {/* Peşin Fiyat */}
          <div className="w-[45%] flex flex-col items-center">
            <div className="text-black font-black flex items-baseline gap-1" style={{ fontSize: '38px' }}>
              {data.totalCashPrice} <span className="text-xl">₺</span>
            </div>
          </div>
          {/* Taksitli Fiyat */}
          <div className="w-[45%] flex flex-col items-center">
            <div className="text-black font-black flex items-baseline gap-1" style={{ fontSize: '38px' }}>
              {data.totalInstallmentPrice} <span className="text-xl">₺</span>
            </div>
          </div>
        </div>

        {/* Tablo Alanı - Şablondaki tablo bölgesine denk gelir */}
        <div className="absolute left-[3%] right-[3%]" style={{ top: '56.5%' }}>
          <table className="w-full border-collapse text-[11px] uppercase font-bold text-zinc-800">
            <tbody>
              {/* Dinamik Veri Satırı */}
              <tr style={{ height: '32px' }}>
                <td className="w-[34%] px-2 text-left align-middle truncate">{data.tableProductName}</td>
                <td className="w-[11%] text-center align-middle">{data.quantity}</td>
                <td className="w-[11%] text-center align-middle">{data.tableCashPrice}</td>
                <td className="w-[11%] text-center align-middle">{data.tableInstallmentPrice}</td>
                <td className="w-[11%] text-center align-middle">{data.gen}</td>
                <td className="w-[11%] text-center align-middle">{data.der}</td>
                <td className="w-[11%] text-center align-middle">{data.yuk}</td>
              </tr>
              {/* Şablonun tablosuna uygun boş satır boşlukları */}
              {[...Array(4)].map((_, i) => (
                <tr key={i} style={{ height: '32px' }}>
                  <td colSpan={7}></td>
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