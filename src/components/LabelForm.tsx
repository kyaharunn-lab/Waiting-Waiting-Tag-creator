
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
              className="font-medium"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="grid gap-2">
              <Label htmlFor="totalCashPrice" className="text-xs uppercase font-bold text-gray-400">Peşin Fiyat (Genel)</Label>
              <div className="relative">
                <Input
                  id="totalCashPrice"
                  name="totalCashPrice"
                  value={data.totalCashPrice}
                  onChange={handleChange}
                  placeholder="90.000"
                  className="pl-8"
                />
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 font-bold">₺</span>
              </div>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="totalInstallmentPrice" className="text-xs uppercase font-bold text-gray-400">Taksitli Fiyat (Genel)</Label>
              <div className="relative">
                <Input
                  id="totalInstallmentPrice"
                  name="totalInstallmentPrice"
                  value={data.totalInstallmentPrice}
                  onChange={handleChange}
                  placeholder="120.000"
                  className="pl-8"
                />
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 font-bold">₺</span>
              </div>
            </div>
          </div>
        </div>

        <Separator />

        <div className="space-y-4">
          <h3 className="text-sm font-bold text-brand-burgundy uppercase tracking-widest">Tablo Detayları</h3>
          <div className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="tableProductName" className="text-xs uppercase font-bold text-gray-400">Tablo Ürün Adı</Label>
              <Input
                id="tableProductName"
                name="tableProductName"
                value={data.tableProductName}
                onChange={handleChange}
                placeholder="Örn: DELFİN 3'lü Koltuk"
              />
            </div>
            <div className="grid grid-cols-3 gap-2">
              <div className="grid gap-2">
                <Label htmlFor="quantity" className="text-xs uppercase font-bold text-gray-400">Adet</Label>
                <Input
                  id="quantity"
                  name="quantity"
                  value={data.quantity}
                  onChange={handleChange}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="tableCashPrice" className="text-xs uppercase font-bold text-gray-400">Peşin</Label>
                <Input
                  id="tableCashPrice"
                  name="tableCashPrice"
                  value={data.tableCashPrice}
                  onChange={handleChange}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="tableInstallmentPrice" className="text-xs uppercase font-bold text-gray-400">Taksit</Label>
                <Input
                  id="tableInstallmentPrice"
                  name="tableInstallmentPrice"
                  value={data.tableInstallmentPrice}
                  onChange={handleChange}
                />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-2">
            <div className="grid gap-2">
              <Label htmlFor="gen" className="text-xs uppercase font-bold text-gray-400">GEN (cm)</Label>
              <Input
                id="gen"
                name="gen"
                value={data.gen}
                onChange={handleChange}
                placeholder="230"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="der" className="text-xs uppercase font-bold text-gray-400">DER (cm)</Label>
              <Input
                id="der"
                name="der"
                value={data.der}
                onChange={handleChange}
                placeholder="95"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="yuk" className="text-xs uppercase font-bold text-gray-400">YÜK (cm)</Label>
              <Input
                id="yuk"
                name="yuk"
                value={data.yuk}
                onChange={handleChange}
                placeholder="85"
              />
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default LabelForm;
