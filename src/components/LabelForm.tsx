
"use client";

import React, { useState, useEffect, useRef } from 'react';
import { LabelData, ExcelProduct, TableRow } from '@/lib/types';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Upload, X, FileSpreadsheet, Search, Trash2, Plus, CheckCircle2, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import * as XLSX from 'xlsx';
import { toast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';

interface LabelFormProps {
  data: LabelData;
  onChange: (newData: LabelData) => void;
}

const LabelForm: React.FC<LabelFormProps> = ({ data, onChange }) => {
  const [excelProducts, setExcelProducts] = useState<ExcelProduct[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [showResults, setShowResults] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);
  const [isDragging, setIsDragging] = useState(false);
  const [fileName, setFileName] = useState<string | null>(null);
  
  const searchRef = useRef<HTMLDivElement>(null);
  const resultsRef = useRef<HTMLDivElement>(null);

  // Close search results when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setShowResults(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const formatTurkishNumber = (val: any): string => {
    if (val === undefined || val === null || val === '') return '';
    let cleanVal = val.toString().replace(/\s/g, '');
    if (cleanVal.includes(',')) {
      cleanVal = cleanVal.replace(/\./g, '').replace(',', '.');
    }
    const num = parseFloat(cleanVal);
    if (isNaN(num)) return val.toString();
    return new Intl.NumberFormat('tr-TR', {
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(num);
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

  const processExcel = (file: File) => {
    const reader = new FileReader();
    reader.onload = (evt) => {
      try {
        const bstr = evt.target?.result;
        const wb = XLSX.read(bstr, { type: 'binary' });
        const wsname = wb.SheetNames[0];
        const ws = wb.Sheets[wsname];
        const dataJson: any[] = XLSX.utils.sheet_to_json(ws);
        
        // Vize Excel Format: A=Product, C=Cash, D=Installment
        const products: ExcelProduct[] = dataJson.map(row => {
          const keys = Object.keys(row);
          // Try to match by header name or by index (if headers are missing)
          const name = row["Ürün Adı"] || row["ÜRÜN ADI"] || row[keys[0]] || "";
          const cash = row["Kredi Katı Satıs Fiyat"] || row["FİTA1"] || row[keys[2]] || "";
          const installment = row["1+7 Ay Taksit Fiyat"] || row["FİYAT2"] || row[keys[3]] || "";
          
          return {
            productName: name.toString().trim(),
            quantity: "1",
            cashPrice: formatTurkishNumber(cash),
            installmentPrice: formatTurkishNumber(installment)
          };
        }).filter(p => p.productName);

        if (products.length === 0) {
          toast({
            variant: "destructive",
            title: "Format Hatası",
            description: "Excel'de geçerli ürün bulunamadı. Lütfen sütunları kontrol edin.",
          });
          return;
        }

        setExcelProducts(products);
        setFileName(file.name);
        toast({
          title: "Excel Başarıyla Yüklendi",
          description: `${products.length} ürün listelendi.`,
        });
      } catch (error) {
        toast({
          variant: "destructive",
          title: "Hata",
          description: "Excel dosyası okunamadı.",
        });
      }
    };
    reader.readAsBinaryString(file);
  };

  const handleExcelDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file && (file.name.endsWith('.xlsx') || file.name.endsWith('.xls'))) {
      processExcel(file);
    }
  };

  const handleExcelSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) processExcel(file);
  };

  const addProduct = (product: ExcelProduct) => {
    const newRows = [
      ...data.tableRows,
      {
        productName: product.productName,
        quantity: "1",
        cashPrice: product.cashPrice,
        installmentPrice: product.installmentPrice,
      }
    ];
    onChange({ ...data, tableRows: newRows });
    setSearchTerm('');
    setShowResults(false);
    setActiveIndex(-1);
  };

  const removeRow = (index: number) => {
    const newRows = data.tableRows.filter((_, i) => i !== index);
    onChange({ ...data, tableRows: newRows });
  };

  const filteredProducts = excelProducts.filter(p => 
    p.productName.toLowerCase().includes(searchTerm.toLowerCase())
  ).slice(0, 50); // Limit results for performance

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!showResults || filteredProducts.length === 0) return;

    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setActiveIndex(prev => (prev < filteredProducts.length - 1 ? prev + 1 : prev));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setActiveIndex(prev => (prev > 0 ? prev - 1 : prev));
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (activeIndex >= 0) {
        addProduct(filteredProducts[activeIndex]);
      } else if (filteredProducts.length > 0) {
        addProduct(filteredProducts[0]);
      }
    } else if (e.key === 'Escape') {
      setShowResults(false);
    }
  };

  // Scroll active item into view
  useEffect(() => {
    if (activeIndex >= 0 && resultsRef.current) {
      const activeElement = resultsRef.current.children[activeIndex] as HTMLElement;
      if (activeElement) {
        activeElement.scrollIntoView({ block: 'nearest' });
      }
    }
  }, [activeIndex]);

  return (
    <Card className="shadow-none border border-zinc-200 rounded-none overflow-visible">
      <CardHeader className="bg-zinc-50 border-b p-4">
        <CardTitle className="text-sm font-bold uppercase tracking-widest text-zinc-700">Panel Ayarları</CardTitle>
      </CardHeader>
      <CardContent className="p-4 space-y-6 overflow-visible">
        
        {/* 1. Şablon Yükleme */}
        <div className="space-y-3">
          <Label className="text-[10px] uppercase font-bold text-[#9f2732]">1. Şablon Görseli Yükle (A5)</Label>
          {!data.productImage ? (
            <div className="border-2 border-dashed border-zinc-200 p-8 text-center bg-zinc-50 relative hover:bg-zinc-100 transition-colors">
              <input type="file" accept="image/*" onChange={handleImageUpload} className="absolute inset-0 opacity-0 cursor-pointer" />
              <Upload className="w-8 h-8 mx-auto text-zinc-300 mb-2" />
              <p className="text-[10px] text-zinc-400 font-medium">Boş şablon görselini buraya yükleyin</p>
            </div>
          ) : (
            <div className="relative border border-zinc-200 p-2 bg-white flex items-center gap-4 group">
              <img src={data.productImage} className="w-12 h-16 object-cover border" alt="Şablon" />
              <div className="flex-1">
                <p className="text-[10px] font-bold text-green-600 uppercase flex items-center gap-1">
                  <CheckCircle2 className="w-3 h-3" /> Şablon Yüklendi
                </p>
                <p className="text-[9px] text-zinc-400 truncate max-w-[150px]">Önizleme aktif</p>
              </div>
              <Button variant="ghost" size="icon" onClick={() => onChange({ ...data, productImage: undefined })} className="h-8 w-8 text-zinc-300 hover:text-red-500 hover:bg-red-50">
                <X className="w-4 h-4" />
              </Button>
            </div>
          )}
        </div>

        <Separator />

        {/* 2. Excel Yükleme (Dropzone) */}
        <div className="space-y-3">
          <Label className="text-[10px] uppercase font-bold text-[#9f2732]">2. Excel Ürün Listesi</Label>
          
          <div 
            className={cn(
              "relative border-2 border-dashed rounded-none transition-all duration-200 p-4 text-center cursor-pointer",
              isDragging ? "border-[#9f2732] bg-[#9f2732]/5" : "border-zinc-200 bg-zinc-50",
              fileName ? "border-green-200 bg-green-50" : "hover:border-zinc-300 hover:bg-zinc-100"
            )}
            onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
            onDragLeave={() => setIsDragging(false)}
            onDrop={handleExcelDrop}
          >
            <input type="file" accept=".xlsx, .xls" onChange={handleExcelSelect} className="absolute inset-0 opacity-0 cursor-pointer" />
            
            {fileName ? (
              <div className="space-y-1">
                <FileSpreadsheet className="w-6 h-6 mx-auto text-green-600" />
                <p className="text-[10px] font-bold text-green-700 truncate px-2">{fileName}</p>
                <p className="text-[9px] text-green-600/70 font-medium uppercase">{excelProducts.length} Ürün Aktif</p>
              </div>
            ) : (
              <div className="space-y-1">
                <FileSpreadsheet className="w-6 h-6 mx-auto text-zinc-400" />
                <p className="text-[10px] font-bold text-zinc-500">Excel'i Buraya Bırakın</p>
                <p className="text-[9px] text-zinc-400">veya tıklayarak dosya seçin</p>
              </div>
            )}
          </div>

          {/* Arama Sistemi */}
          <div className="relative mt-4" ref={searchRef}>
            <div className="relative">
              <Search className={cn(
                "absolute left-3 top-2.5 h-4 w-4 transition-colors",
                excelProducts.length > 0 ? "text-zinc-500" : "text-zinc-300"
              )} />
              <Input
                placeholder={excelProducts.length > 0 ? "Ürün adı ara ve ENTER'la ekle..." : "Önce Excel yükleyin"}
                value={searchTerm}
                disabled={excelProducts.length === 0}
                onChange={(e) => {
                  setSearchTerm(e.target.value);
                  setShowResults(true);
                  setActiveIndex(-1);
                }}
                onFocus={() => setShowResults(true)}
                onKeyDown={handleKeyDown}
                className="pl-9 h-10 rounded-none text-sm border-zinc-300 focus-visible:ring-[#9f2732]"
              />
            </div>
            
            {/* Arama Sonuçları Paneli */}
            {showResults && searchTerm && (
              <div 
                ref={resultsRef}
                className="absolute z-50 w-full mt-1 bg-white border border-zinc-200 shadow-xl max-h-[300px] overflow-auto animate-in fade-in slide-in-from-top-1"
              >
                {filteredProducts.length > 0 ? (
                  filteredProducts.map((p, idx) => (
                    <div
                      key={idx}
                      className={cn(
                        "p-3 text-xs border-b last:border-0 cursor-pointer transition-colors flex items-center justify-between group",
                        activeIndex === idx ? "bg-zinc-100 border-l-4 border-l-[#9f2732]" : "hover:bg-zinc-50"
                      )}
                      onClick={() => addProduct(p)}
                      onMouseEnter={() => setActiveIndex(idx)}
                    >
                      <div className="flex-1 truncate pr-4">
                        <div className="font-bold text-zinc-800 uppercase truncate">{p.productName}</div>
                        <div className="flex gap-3 mt-0.5">
                          <span className="text-zinc-500">Peşin: <b className="text-zinc-700">{p.cashPrice} ₺</b></span>
                          <span className="text-zinc-500">Taksit: <b className="text-zinc-700">{p.installmentPrice} ₺</b></span>
                        </div>
                      </div>
                      <Button size="icon" variant="ghost" className="h-8 w-8 rounded-full opacity-0 group-hover:opacity-100 text-[#9f2732] bg-[#9f2732]/5">
                        <Plus className="w-4 h-4" />
                      </Button>
                    </div>
                  ))
                ) : (
                  <div className="p-8 text-center">
                    <AlertCircle className="w-6 h-6 mx-auto text-zinc-300 mb-2" />
                    <p className="text-xs text-zinc-400 font-medium italic">Sonuç bulunamadı</p>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        {/* 3. Eklenen Ürünler Listesi */}
        {data.tableRows.length > 0 && (
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label className="text-[10px] uppercase font-bold text-zinc-400">Eklenen Ürünler ({data.tableRows.length})</Label>
              <button 
                onClick={() => onChange({...data, tableRows: []})} 
                className="text-[9px] uppercase font-bold text-red-500 hover:underline"
              >
                TÜMÜNÜ TEMİZLE
              </button>
            </div>
            <div className="space-y-1 max-h-[250px] overflow-auto pr-1">
              {data.tableRows.map((row, idx) => (
                <div key={idx} className="flex items-center justify-between p-3 bg-white border border-zinc-200 group hover:border-[#9f2732]/30 transition-all">
                  <div className="truncate flex-1 pr-2">
                    <div className="font-bold text-zinc-700 text-[11px] uppercase truncate">{row.productName}</div>
                    <div className="flex items-center gap-2 mt-0.5">
                      <span className="text-[9px] bg-zinc-100 px-1 py-0.5 rounded font-bold text-zinc-500">ADET: {row.quantity}</span>
                      <span className="text-[10px] font-bold text-[#9f2732]">{row.cashPrice} ₺</span>
                    </div>
                  </div>
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    onClick={() => removeRow(idx)} 
                    className="h-8 w-8 text-zinc-300 hover:text-red-500 hover:bg-red-50 opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </Button>
                </div>
              ))}
            </div>
          </div>
        )}

        <Separator />

        {/* 4. Manuel Toplam Fiyatlar */}
        <div className="space-y-4">
          <Label className="text-[10px] uppercase font-bold text-[#9f2732]">4. Başlık ve Toplam Fiyatlar</Label>
          <div className="grid gap-2">
            <Label htmlFor="productTitle" className="text-[10px] uppercase font-bold text-zinc-400">Siyah Bar Başlığı</Label>
            <Input 
              id="productTitle" 
              name="productTitle" 
              placeholder="Örn: DELFİN KOLTUK TAKIMI"
              value={data.productTitle} 
              onChange={handleManualChange} 
              className="rounded-none h-10 text-sm border-zinc-300 focus-visible:ring-[#9f2732]" 
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="grid gap-2">
              <Label htmlFor="totalCashPrice" className="text-[10px] uppercase font-bold text-zinc-400">Toplam Peşin</Label>
              <Input 
                id="totalCashPrice" 
                name="totalCashPrice" 
                placeholder="0"
                value={data.totalCashPrice} 
                onChange={handleManualChange} 
                className="rounded-none h-10 text-sm border-zinc-300 focus-visible:ring-[#9f2732]" 
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="totalInstallmentPrice" className="text-[10px] uppercase font-bold text-zinc-400">Toplam Taksit</Label>
              <Input 
                id="totalInstallmentPrice" 
                name="totalInstallmentPrice" 
                placeholder="0"
                value={data.totalInstallmentPrice} 
                onChange={handleManualChange} 
                className="rounded-none h-10 text-sm border-zinc-300 focus-visible:ring-[#9f2732]" 
              />
            </div>
          </div>
        </div>

      </CardContent>
    </Card>
  );
};

export default LabelForm;
