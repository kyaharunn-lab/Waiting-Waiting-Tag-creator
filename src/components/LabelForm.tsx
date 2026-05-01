
"use client";

import React, { useState } from 'react';
import { LabelData, ExcelProduct } from '@/lib/types';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Upload, X, FileSpreadsheet, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import * as XLSX from 'xlsx';

interface LabelFormProps {
  data: LabelData;
  onChange: (newData: LabelData) => void;
}

const LabelForm: React.FC<LabelFormProps> = ({ data, onChange }) => {
  const [excelProducts, setExcelProducts] = useState<ExcelProduct[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [showDropdown, setShowDropdown] = useState(false);

  const formatTurkishNumber = (val: any): string => {
    if (val === undefined || val === null || val === '') return '';
    const num = parseFloat(val.toString().replace(',', '.'));
    if (isNaN(num)) return val.toString();
    return new Intl.NumberFormat('tr-TR').format(num);
  };

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

  const handleExcelUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (evt) => {
        const bstr = evt.target?.result;
        const wb = XLSX.read(bstr, { type: 'binary' });
        const wsname = wb.SheetNames[0];
        const ws = wb.Sheets[wsname];
        const dataJson: any[] = XLSX.utils.sheet_to_json(ws);
        
        const products: ExcelProduct[] = dataJson.map(row => ({
          productName: row["ÜRÜN ADI"] || row["Ürün Adı"] || "",
          quantity: row["ADET"] || row["Adet"] || "1",
          cashPrice: formatTurkishNumber(row["FİTA1"] || row["Fiyat1"] || ""),
          installmentPrice: formatTurkishNumber(row["FİYAT2"] || row["Fiyat2"] || "")
        })).filter(p => p.productName);

        setExcelProducts(products);
      };
      reader.readAsBinaryString(file);
    }
  };

  const handleProductSelect = (product: ExcelProduct) => {
    onChange({
      ...data,
      tableProductName: product.productName,
      quantity: product.quantity.toString(),
      tableCashPrice: product.cashPrice,
      tableInstallmentPrice: product.installmentPrice,
      totalCashPrice: product.cashPrice,
      totalInstallmentPrice: product.installmentPrice
    });
    setSearchTerm('');
    setShowDropdown(false);
  };

  const filteredProducts = excelProducts.filter(p => 
    p.productName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Card className="shadow-none border border-zinc-200 rounded-none">
      <CardHeader className="bg-zinc-50 border-b p-4">
        <CardTitle className="text-sm font-bold uppercase tracking-widest text-zinc-700">Panel Ayarları</CardTitle>
      </CardHeader>
      <CardContent className="p-4 space-y-6">
        
        {/* ŞABLON YÜKLEME ALANI */}
        <div className="space-y-3">
          <Label className="text-[10px] uppercase font-bold text-[#9f2732]">1. Şablon Görseli Yükle (A5)</Label>
          {!data.productImage ? (
            <div className="border-2 border-dashed border-zinc-200 p-8 text-center bg-zinc-50 relative">
              <input type="file" accept="image/*" onChange={handleImageUpload} className="absolute inset-0 opacity-0 cursor-pointer" />
              <Upload className="w-8 h-8 mx-auto text-zinc-300 mb-2" />
              <p className="text-[10px] text-zinc-400 font-medium">Boş şablon görselini buraya yükleyin</p>
            </div>
          ) : (
            <div className="relative border border-zinc-200 p-2 bg-white flex items-center gap-4">
              <img src={data.productImage} className="w-12 h-16 object-cover border" alt="Şablon" />
              <div className="flex-1">
                <p className="text-[10px] font-bold text-green-600 uppercase">Şablon Yüklendi</p>
              </div>
              <Button variant="ghost" size="icon" onClick={removeImage} className="h-8 w-8 text-zinc-400 hover:text-red-500">
                <X className="w-4 h-4" />
              </Button>
            </div>
          )}
        </div>

        <Separator />

        {/* EXCEL YÜKLEME VE ÜRÜN SEÇME */}
        <div className="space-y-3">
          <Label className="text-[10px] uppercase font-bold text-[#9f2732]">2. Excel Ürün Listesi</Label>
          <div className="flex gap-2">
            <div className="relative flex-1">
              <Button variant="outline" className="w-full h-9 rounded-none text-xs border-dashed border-zinc-300 hover:bg-zinc-50 relative overflow-hidden">
                <FileSpreadsheet className="w-4 h-4 mr-2 text-green-600" />
                {excelProducts.length > 0 ? `${excelProducts.length} Ürün Yüklü` : 'Excel Yükle'}
                <input type="file" accept=".xlsx, .xls" onChange={handleExcelUpload} className="absolute inset-0 opacity-0 cursor-pointer" />
              </Button>
            </div>
          </div>

          {excelProducts.length > 0 && (
            <div className="relative mt-2">
              <div className="relative">
                <Search className="absolute left-3 top-2.5 h-4 w-4 text-zinc-400" />
                <Input
                  placeholder="Ürün adı ara..."
                  value={searchTerm}
                  onChange={(e) => {
                    setSearchTerm(e.target.value);
                    setShowDropdown(true);
                  }}
                  onFocus={() => setShowDropdown(true)}
                  className="pl-9 h-9 rounded-none text-sm"
                />
              </div>
              {showDropdown && searchTerm && (
                <div className="absolute z-50 w-full mt-1 bg-white border border-zinc-200 shadow-lg max-h-60 overflow-auto">
                  {filteredProducts.length > 0 ? (
                    filteredProducts.map((p, idx) => (
                      <div
                        key={idx}
                        className="p-2 text-xs hover:bg-zinc-100 cursor-pointer border-b last:border-0"
                        onClick={() => handleProductSelect(p)}
                      >
                        <div className="font-bold">{p.productName}</div>
                        <div className="text-zinc-500 flex justify-between">
                          <span>Adet: {p.quantity}</span>
                          <span>{p.cashPrice} ₺</span>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="p-4 text-center text-xs text-zinc-400">Ürün bulunamadı</div>
                  )}
                </div>
              )}
            </div>
          )}
        </div>

        <Separator />

        <div className="space-y-4">
          <Label className="text-[10px] uppercase font-bold text-[#9f2732]">3. Manuel Düzenleme</Label>
          <div className="grid gap-2">
            <Label htmlFor="productTitle" className="text-[10px] uppercase font-bold text-zinc-400">Siyah Bar Yazısı</Label>
            <Input id="productTitle" name="productTitle" value={data.productTitle} onChange={handleChange} className="rounded-none h-9 text-sm" />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="grid gap-2">
              <Label htmlFor="totalCashPrice" className="text-[10px] uppercase font-bold text-zinc-400">Üst Peşin</Label>
              <Input id="totalCashPrice" name="totalCashPrice" value={data.totalCashPrice} onChange={handleChange} className="rounded-none h-9 text-sm" />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="totalInstallmentPrice" className="text-[10px] uppercase font-bold text-zinc-400">Üst Taksit</Label>
              <Input id="totalInstallmentPrice" name="totalInstallmentPrice" value={data.totalInstallmentPrice} onChange={handleChange} className="rounded-none h-9 text-sm" />
            </div>
          </div>
        </div>

        <Separator />

        <div className="space-y-4">
          <Label className="text-[10px] uppercase font-bold text-[#9f2732]">4. Tablo Detayları</Label>
          <div className="grid gap-2">
            <Label htmlFor="tableProductName" className="text-[10px] uppercase font-bold text-zinc-400">Tablo Ürün Adı</Label>
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
        </div>
      </CardContent>
    </Card>
  );
};

export default LabelForm;
