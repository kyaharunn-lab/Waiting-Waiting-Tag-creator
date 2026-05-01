
"use client";

import React from 'react';
import { LabelData } from '@/lib/types';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Upload, X } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface LabelFormProps {
  data: LabelData;
  onChange: (newData: LabelData) => void;
}

const LabelForm: React.FC<LabelFormProps> = ({ data, onChange }) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    onChange({ ...data, [name]: value });
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        onChange({ ...data, productImage: reader.result as string });
      };
      reader.readAsDataURL(file);
    }
  };

  const removeImage = () => {
    onChange({ ...data, productImage: undefined });
  };

  return (
    <Card className="shadow-none border border-zinc-200 rounded-none">
      <CardHeader className="bg-zinc-50 border-b p-4">
        <CardTitle className="text-sm font-bold uppercase tracking-widest text-zinc-700">Etiket & Şablon Ayarları</CardTitle>
      </CardHeader>
      <CardContent className="p-4 space-y-6">
        
        {/* ŞABLON YÜKLEME ALANI */}
        <div className="space-y-3">
          <Label className="text-[10px] uppercase font-bold text-[#9f2732]">1. Şablon Görseli Yükle (A5)</Label>
          {!data.productImage ? (
            <div className="border-2 border-dashed border-zinc-200 p-8 text-center bg-zinc-50 relative">
              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="absolute inset-0 opacity-0 cursor-pointer"
              />
              <Upload className="w-8 h-8 mx-auto text-zinc-300 mb-2" />
              <p className="text-[10px] text-zinc-400 font-medium">Logolu ve boş tablolu şablon görselini buraya yükleyin</p>
            </div>
          ) : (
            <div className="relative border border-zinc-200 p-2 bg-white flex items-center gap-4">
              <img src={data.productImage} className="w-12 h-16 object-cover border" alt="Şablon" />
              <div className="flex-1">
                <p className="text-[10px] font-bold text-green-600 uppercase">Şablon Yüklendi</p>
                <p className="text-[9px] text-zinc-400">Arka plan olarak ayarlandı.</p>
              </div>
              <Button variant="ghost" size="icon" onClick={removeImage} className="h-8 w-8 text-zinc-400 hover:text-red-500">
                <X className="w-4 h-4" />
              </Button>
            </div>
          )}
        </div>

        <Separator />

        <div className="space-y-4">
          <Label className="text-[10px] uppercase font-bold text-[#9f2732]">2. Etiket İçeriği</Label>
          <div className="grid gap-2">
            <Label htmlFor="productTitle" className="text-[10px] uppercase font-bold text-zinc-400">Ürün Başlığı</Label>
            <Input
              id="productTitle"
              name="productTitle"
              value={data.productTitle}
              onChange={handleChange}
              className="rounded-none h-9 text-sm"
              placeholder="Siyah barın üzerine gelecek yazı"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="grid gap-2">
              <Label htmlFor="totalCashPrice" className="text-[10px] uppercase font-bold text-zinc-400">Peşin Fiyat</Label>
              <Input id="totalCashPrice" name="totalCashPrice" value={data.totalCashPrice} onChange={handleChange} className="rounded-none h-9 text-sm" />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="totalInstallmentPrice" className="text-[10px] uppercase font-bold text-zinc-400">Taksitli Fiyat</Label>
              <Input id="totalInstallmentPrice" name="totalInstallmentPrice" value={data.totalInstallmentPrice} onChange={handleChange} className="rounded-none h-9 text-sm" />
            </div>
          </div>
        </div>

        <Separator />

        <div className="space-y-4">
          <Label className="text-[10px] uppercase font-bold text-[#9f2732]">3. Tablo Verileri</Label>
          <div className="grid gap-2">
            <Label htmlFor="tableProductName" className="text-[10px] uppercase font-bold text-zinc-400">Ürün Adı</Label>
            <Input id="tableProductName" name="tableProductName" value={data.tableProductName} onChange={handleChange} className="rounded-none h-9 text-sm" />
          </div>
          
          <div className="grid grid-cols-2 gap-2">
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
              <Label htmlFor="gen" className="text-[10px] uppercase font-bold text-zinc-400">GEN</Label>
              <Input id="gen" name="gen" value={data.gen} onChange={handleChange} className="rounded-none h-9 text-sm" />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="der" className="text-[10px] uppercase font-bold text-zinc-400">DER</Label>
              <Input id="der" name="der" value={data.der} onChange={handleChange} className="rounded-none h-9 text-sm" />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="yuk" className="text-[10px] uppercase font-bold text-zinc-400">YÜK</Label>
              <Input id="yuk" name="yuk" value={data.yuk} onChange={handleChange} className="rounded-none h-9 text-sm" />
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default LabelForm;
