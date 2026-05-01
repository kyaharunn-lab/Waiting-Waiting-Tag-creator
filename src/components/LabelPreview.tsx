
"use client";

import React from 'react';
import { LabelData } from '@/lib/types';

interface LabelPreviewProps {
  data: LabelData;
}

const LabelPreview: React.FC<LabelPreviewProps> = ({ data }) => {
  const imageUrl = data.productImage;

  return (
    <div className="a5-container relative bg-white overflow-hidden shadow-none border border-zinc-200 print:border-none">
      {/* 1. ŞABLON ARKA PLANI */}
      {imageUrl && (
        <img 
          src={imageUrl} 
          alt="Etiket Şablonu" 
          className="absolute inset-0 w-full h-full object-fill z-10"
        />
      )}

      {/* 2. VERİ KATMANI (OVERLAY) */}
      {imageUrl ? (
        <div className="absolute inset-0 w-full h-full z-20 pointer-events-none select-none font-sans">
          
          {/* Ürün Başlığı (Siyah Bar Üstü) */}
          <div 
            className="absolute top-[37.8%] left-[8%] w-[84%] text-center text-white font-bold uppercase truncate"
            style={{ fontSize: '18px', letterSpacing: '0.05em' }}
          >
            {data.productTitle}
          </div>

          {/* Fiyatlar (Gri Alanlar Üstü) */}
          <div className="absolute top-[48.2%] left-0 w-full flex px-[8%]">
            <div className="flex-1 text-center font-black text-[#2d2d2d]" style={{ fontSize: '24px' }}>
              {data.totalCashPrice} <span style={{ fontSize: '16px' }}>₺</span>
            </div>
            <div className="flex-1 text-center font-black text-[#2d2d2d]" style={{ fontSize: '24px' }}>
              {data.totalInstallmentPrice} <span style={{ fontSize: '16px' }}>₺</span>
            </div>
          </div>

          {/* Tablo Verileri (Tablo Satırı Üstü) */}
          <div className="absolute top-[58.8%] left-0 w-full px-[4.5%] flex items-center text-[#2d2d2d] font-bold uppercase" style={{ fontSize: '11px' }}>
            <div className="w-[38.5%] px-2 truncate">{data.tableProductName}</div>
            <div className="w-[8.5%] text-center">{data.quantity}</div>
            <div className="w-[12.5%] text-center">{data.tableCashPrice}</div>
            <div className="w-[12.5%] text-center">{data.tableInstallmentPrice}</div>
            <div className="w-[9%] text-center">{data.gen}</div>
            <div className="w-[9%] text-center">{data.der}</div>
            <div className="w-[9%] text-center">{data.yuk}</div>
          </div>

        </div>
      ) : (
        /* Görsel Yoksa Boş Sayfa */
        <div className="w-full h-full flex flex-col items-center justify-center text-zinc-300 gap-4">
          <div className="w-24 h-24 border-2 border-dashed border-zinc-200 rounded-lg flex items-center justify-center">
            <svg viewBox="0 0 24 24" className="w-10 h-10 fill-current" xmlns="http://www.w3.org/2000/svg">
              <path d="M19 13H13V19H11V13H5V11H11V5H13V11H19V13Z" />
            </svg>
          </div>
          <p className="text-xs font-bold uppercase tracking-widest">Lütfen bir şablon görseli yükleyin</p>
        </div>
      )}
    </div>
  );
};

export default LabelPreview;
