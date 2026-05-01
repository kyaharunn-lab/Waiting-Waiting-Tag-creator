"use client";

import React from 'react';
import { LabelData } from '@/lib/types';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';

interface LabelFormProps {
  data: LabelData;
  onChange: (newData: LabelData) => void;
}

const LabelForm: React.FC<LabelFormProps> = ({ data, onChange }) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    onChange({ ...data, [name]: value });
  };

  return (
    <Card className="shadow-none border border-zinc-200 rounded-none">
      <CardHeader className="bg-zinc-50 border-b p-4">
        <CardTitle className="text-sm font-bold uppercase tracking-widest text-zinc-700">Etiket İçeriği</CardTitle>
      </CardHeader>
      <CardContent className="p-4 space-y-6">
        <div className="space-y-4">
          <div className="grid gap-2">
            <Label htmlFor="productTitle" className="text-[10px] uppercase font-bold text-zinc-400">Ürün Başlığı (Siyah Bar)</Label>
            <Input
              id="productTitle"
              name="productTitle"
              value={data.productTitle}
              onChange={handleChange}
              className="rounded-none h-9 text-sm"
              placeholder="Örn: DELFİN KOLTUK TAKIMI (3+3+B)"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="grid gap-2">
              <Label htmlFor="totalCashPrice" className="text-[10px] uppercase font-bold text-zinc-400">Genel Peşin Fiyat</Label>
              <div className="relative">
                <Input id="totalCashPrice" name="totalCashPrice" value={data.totalCashPrice} onChange={handleChange} className="pl-7 rounded-none h-9 text-sm" />
                <span className="absolute left-2.5 top-1/2 -translate-y-1/2 text-zinc-400 font-bold text-xs">₺</span>
              </div>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="totalInstallmentPrice" className="text-[10px] uppercase font-bold text-zinc-400">Genel Taksitli</Label>
              <div className="relative">
                <Input id="totalInstallmentPrice" name="totalInstallmentPrice" value={data.totalInstallmentPrice} onChange={handleChange} className="pl-7 rounded-none h-9 text-sm" />
                <span className="absolute left-2.5 top-1/2 -translate-y-1/2 text-zinc-400 font-bold text-xs">₺</span>
              </div>
            </div>
          </div>
        </div>

        <Separator />

        <div className="space-y-4">
          <h3 className="text-[10px] font-bold text-[#9f2732] uppercase tracking-widest">Tablo Verileri</h3>
          <div className="grid gap-2">
            <Label htmlFor="tableProductName" className="text-[10px] uppercase font-bold text-zinc-400">Tablo - Ürün Adı</Label>
            <Input id="tableProductName" name="tableProductName" value={data.tableProductName} onChange={handleChange} className="rounded-none h-9 text-sm" />
          </div>
          
          <div className="grid grid-cols-3 gap-2">
            <div className="grid gap-2">
              <Label htmlFor="quantity" className="text-[10px] uppercase font-bold text-zinc-400">Adet</Label>
              <Input id="quantity" name="quantity" value={data.quantity} onChange={handleChange} className="rounded-none h-9 text-sm" />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="tableCashPrice" className="text-[10px] uppercase font-bold text-zinc-400">Peşin</Label>
              <Input id="tableCashPrice" name="tableCashPrice" value={data.tableCashPrice} onChange={handleChange} className="rounded-none h-9 text-sm" />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="tableInstallmentPrice" className="text-[10px] uppercase font-bold text-zinc-400">Taksit</Label>
              <Input id="tableInstallmentPrice" name="tableInstallmentPrice" value={data.tableInstallmentPrice} onChange={handleChange} className="rounded-none h-9 text-sm" />
            </div>
          </div>

          <div className="grid grid-cols-3 gap-2">
            <div className="grid gap-2">
              <Label htmlFor="gen" className="text-[10px] uppercase font-bold text-zinc-400">GEN (cm)</Label>
              <Input id="gen" name="gen" value={data.gen} onChange={handleChange} className="rounded-none h-9 text-sm" />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="der" className="text-[10px] uppercase font-bold text-zinc-400">DER (cm)</Label>
              <Input id="der" name="der" value={data.der} onChange={handleChange} className="rounded-none h-9 text-sm" />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="yuk" className="text-[10px] uppercase font-bold text-zinc-400">YÜK (cm)</Label>
              <Input id="yuk" name="yuk" value={data.yuk} onChange={handleChange} className="rounded-none h-9 text-sm" />
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default LabelForm;