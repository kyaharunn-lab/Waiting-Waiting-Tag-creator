
"use client";

import React from 'react';
import { LabelData } from '@/lib/types';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';
import { ImagePlus, X } from 'lucide-react';

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
      reader.onload = (event) => {
        const result = event.target?.result;
        if (typeof result === 'string') {
          onChange({ ...data, productImage: result });
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveImage = () => {
    onChange({ ...data, productImage: undefined });
  };

  return (
    <Card className="shadow-lg border-none">
      <CardHeader className="bg-brand-burgundy text-white rounded-t-lg">
        <CardTitle className="text-xl font-headline tracking-tight">Etiket Bilgileri</CardTitle>
      </CardHeader>
      <CardContent className="p-6 space-y-6">
        <div className="space-y-4">
          <div className="grid gap-2">
            <Label htmlFor="productTitle" className="text-xs uppercase font-bold text-gray-400">Ürün Başlığı</Label>
            <Input
              id="productTitle"
              name="productTitle"
              value={data.productTitle}
              onChange={handleChange}
              placeholder="Örn: DELFİN KOLTUK TAKIMI"
            />
          </div>

          <div className="grid gap-2">
            <Label className="text-xs uppercase font-bold text-gray-400">Ürün Görseli (Opsiyonel)</Label>
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <label htmlFor="image-upload" className="flex-1 flex items-center justify-center border-2 border-dashed border-gray-200 rounded-lg p-4 cursor-pointer hover:bg-gray-50 transition-colors">
                  <div className="flex flex-col items-center gap-2">
                    <ImagePlus className="w-5 h-5 text-gray-400" />
                    <span className="text-xs text-gray-500 font-medium">
                      {data.productImage ? "Görseli Değiştir" : "Görsel Yükle"}
                    </span>
                  </div>
                  <input id="image-upload" type="file" accept="image/*" className="hidden" onChange={handleImageUpload} />
                </label>
                
                {data.productImage && (
                  <Button 
                    variant="outline" 
                    size="icon" 
                    onClick={handleRemoveImage}
                    className="h-12 w-12 border-red-100 text-red-500 hover:bg-red-50 hover:text-red-600"
                  >
                    <X className="w-5 h-5" />
                  </Button>
                )}
              </div>
              
              {data.productImage && (
                <div className="relative w-20 h-20 border rounded-md overflow-hidden bg-gray-50 flex items-center justify-center">
                  <img src={data.productImage} alt="Form Önizleme" className="max-w-full max-h-full object-contain" />
                </div>
              )}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="grid gap-2">
              <Label htmlFor="totalCashPrice" className="text-xs uppercase font-bold text-gray-400">Peşin Fiyat</Label>
              <div className="relative">
                <Input id="totalCashPrice" name="totalCashPrice" value={data.totalCashPrice} onChange={handleChange} className="pl-8" />
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 font-bold">₺</span>
              </div>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="totalInstallmentPrice" className="text-xs uppercase font-bold text-gray-400">Taksitli Fiyat</Label>
              <div className="relative">
                <Input id="totalInstallmentPrice" name="totalInstallmentPrice" value={data.totalInstallmentPrice} onChange={handleChange} className="pl-8" />
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 font-bold">₺</span>
              </div>
            </div>
          </div>
        </div>

        <Separator />

        <div className="space-y-4">
          <h3 className="text-sm font-bold text-brand-burgundy uppercase tracking-widest">Tablo Detayları</h3>
          <div className="grid gap-2">
            <Label htmlFor="tableProductName" className="text-xs uppercase font-bold text-gray-400">Tablo Ürün Adı</Label>
            <Input id="tableProductName" name="tableProductName" value={data.tableProductName} onChange={handleChange} />
          </div>
          <div className="grid grid-cols-3 gap-2">
            <div className="grid gap-2">
              <Label htmlFor="quantity" className="text-xs uppercase font-bold text-gray-400">Adet</Label>
              <Input id="quantity" name="quantity" value={data.quantity} onChange={handleChange} />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="tableCashPrice" className="text-xs uppercase font-bold text-gray-400">Peşin</Label>
              <Input id="tableCashPrice" name="tableCashPrice" value={data.tableCashPrice} onChange={handleChange} />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="tableInstallmentPrice" className="text-xs uppercase font-bold text-gray-400">Taksit</Label>
              <Input id="tableInstallmentPrice" name="tableInstallmentPrice" value={data.tableInstallmentPrice} onChange={handleChange} />
            </div>
          </div>

          <div className="grid grid-cols-3 gap-2">
            <div className="grid gap-2">
              <Label htmlFor="gen" className="text-xs uppercase font-bold text-gray-400">GEN (cm)</Label>
              <Input id="gen" name="gen" value={data.gen} onChange={handleChange} />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="der" className="text-xs uppercase font-bold text-gray-400">DER (cm)</Label>
              <Input id="der" name="der" value={data.der} onChange={handleChange} />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="yuk" className="text-xs uppercase font-bold text-gray-400">YÜK (cm)</Label>
              <Input id="yuk" name="yuk" value={data.yuk} onChange={handleChange} />
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default LabelForm;
