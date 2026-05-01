
"use client";

import React, { useState } from 'react';
import { LabelData, ExcelProduct, TableRow } from '@/lib/types';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Upload, X, FileSpreadsheet, Search, Trash2, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import * as XLSX from 'xlsx';
import { toast } from '@/hooks/use-toast';

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
    const cleanVal = val.toString().replace(/\./g, '').replace(',', '.');
    const num = parseFloat(cleanVal);
    if (isNaN(num)) return val.toString();
    return new Intl.NumberFormat('tr-TR').format(num);
  };

  const handleManualChange = (e: React.ChangeEvent<HTMLInputElement>) => {
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
        toast({
          title: "Excel Yüklendi",
          description: `${products.length} ürün başarıyla içe aktarıldı.`,
        });
      };
      reader.readAsBinaryString(file);
    }
  };

  const handleProductSelect = (product: ExcelProduct) => {
    const newRows = [
      ...data.tableRows,
      {
        productName: product.productName,
        quantity: product.quantity.toString(),
        cashPrice: product.cashPrice,
        installmentPrice: product.installmentPrice,
      }
    ];

    onChange({
      ...data,
      tableRows: newRows
    });
    setSearchTerm('');
    setShowDropdown(false);
  };

  const removeRow = (index: number) => {
    const newRows = data.tableRows.filter((_, i) => i !== index);
    onChange({
      ...data,
      tableRows: newRows
    });
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
          <Label className="text-[10px] uppercase font-bold text-[#9f2732]">2. Ürün Ekle (Excel)</Label>
          <div className="flex gap-2">
            <div className="relative flex-1">
              <Button variant="outline" className="w-full h-9 rounded-none text-xs border-dashed border-zinc-300 hover:bg-zinc-50 relative overflow-hidden">
                <FileSpreadsheet className="w-4 h-4 mr-2 text-green-600" />
                {excelProducts.length > 0 ? `${excelProducts.length} Ürün Yüklü` : 'Excel Yükle'}
                <input type="file" accept=".xlsx, .xls" onChange={handleExcelUpload} className="absolute inset-0 opacity-0 cursor-pointer" />
              </Button>
            </div>
          </div>

          <div className="relative mt-2">
            <div className="relative">
              <Search className="absolute left-3 top-2.5 h-4 w-4 text-zinc-400" />
              <Input
                placeholder={excelProducts.length > 0 ? "Ürün adı ara ve ekle..." : "Önce Excel yükleyin"}
                value={searchTerm}
                disabled={excelProducts.length === 0}
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
                      className="p-2 text-xs hover:bg-zinc-100 cursor-pointer border-b last:border-0 group flex items-center justify-between"
                      onClick={() => handleProductSelect(p)}
                    >
                      <div>
                        <div className="font-bold">{p.productName}</div>
                        <div className="text-zinc-500">{p.cashPrice} ₺ / {p.installmentPrice} ₺</div>
                      </div>
                      <Plus className="w-4 h-4 text-blue-500 opacity-0 group-hover:opacity-100" />
                    </div>
                  ))
                ) : (
                  <div className="p-4 text-center text-xs text-zinc-400">Ürün bulunamadı</div>
                )}
              </div>
            )}
          </div>
        </div>

        {/* SEÇİLEN ÜRÜNLER LİSTESİ */}
        {data.tableRows.length > 0 && (
          <div className="space-y-2">
            <Label className="text-[10px] uppercase font-bold text-zinc-400">Eklenen Ürünler ({data.tableRows.length})</Label>
            <div className="space-y-1">
              {data.tableRows.map((row, idx) => (
                <div key={idx} className="flex items-center justify-between p-2 bg-zinc-50 border border-zinc-200 text-[11px]">
                  <div className="truncate flex-1 pr-2">
                    <span className="font-bold text-zinc-700">{row.productName}</span>
                    <span className="ml-2 text-zinc-400">x{row.quantity}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="font-bold">{row.cashPrice} ₺</span>
                    <button onClick={() => removeRow(idx)} className="text-zinc-300 hover:text-red-500 transition-colors">
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        <Separator />

        <div className="space-y-4">
          <Label className="text-[10px] uppercase font-bold text-[#9f2732]">3. Başlık ve Toplam Fiyatlar</Label>
          <div className="grid gap-2">
            <Label htmlFor="productTitle" className="text-[10px] uppercase font-bold text-zinc-400">Siyah Bar Başlığı</Label>
            <Input id="productTitle" name="productTitle" value={data.productTitle} onChange={handleManualChange} className="rounded-none h-9 text-sm" />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="grid gap-2">
              <Label htmlFor="totalCashPrice" className="text-[10px] uppercase font-bold text-zinc-400">Toplam Peşin</Label>
              <Input id="totalCashPrice" name="totalCashPrice" value={data.totalCashPrice} onChange={handleManualChange} className="rounded-none h-9 text-sm" />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="totalInstallmentPrice" className="text-[10px] uppercase font-bold text-zinc-400">Toplam Taksit</Label>
              <Input id="totalInstallmentPrice" name="totalInstallmentPrice" value={data.totalInstallmentPrice} onChange={handleManualChange} className="rounded-none h-9 text-sm" />
            </div>
          </div>
        </div>

      </CardContent>
    </Card>
  );
};

export default LabelForm;
