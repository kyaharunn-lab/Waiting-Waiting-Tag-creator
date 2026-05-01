
"use client";

import React, { useState, useEffect, useRef, useMemo } from 'react';
import { LabelData, ExcelProduct, TableRow } from '@/lib/types';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { 
  Upload, X, FileSpreadsheet, Search, Trash2, Plus, 
  CheckCircle2, AlertCircle, ListPlus, MousePointer2 
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Badge } from '@/components/ui/badge';
import * as XLSX from 'xlsx';
import { toast } from '@/hooks/use-toast';
import { cn, parsePrice, formatPrice } from '@/lib/utils';
import { ScrollArea } from '@/components/ui/scroll-area';

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
  
  // Selection states
  const [selectedIndices, setSelectedIndices] = useState<Set<number>>(new Set());
  const [lastSelectedIndex, setLastSelectedIndex] = useState<number | null>(null);
  
  const searchRef = useRef<HTMLDivElement>(null);
  const resultsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setShowResults(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const cleanAndFormatExcelPrice = (val: any): string => {
    if (val === undefined || val === null || val === '') return '';
    let cleanVal = val.toString().replace(/\s/g, '').replace('₺', '');
    if (cleanVal.includes(',')) {
      cleanVal = cleanVal.split(',')[0].replace(/\./g, '');
    } else {
      cleanVal = cleanVal.replace(/\./g, '');
    }
    const num = parseFloat(cleanVal);
    if (isNaN(num)) return val.toString();
    return formatPrice(num);
  };

  const tableTotals = useMemo(() => {
    return data.tableRows.reduce((acc, row) => {
      return {
        cash: acc.cash + (parsePrice(row.cashPrice) * row.quantity),
        installment: acc.installment + (parsePrice(row.installmentPrice) * row.quantity)
      };
    }, { cash: 0, installment: 0 });
  }, [data.tableRows]);

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
        
        const dataRows: any[][] = XLSX.utils.sheet_to_json(ws, { header: 1 });
        
        if (dataRows.length < 2) {
          toast({
            variant: "destructive",
            title: "Hata",
            description: "Excel boş veya sadece başlık içeriyor.",
          });
          return;
        }

        const products: ExcelProduct[] = dataRows.slice(1).map(row => {
          const name = row[0] || "";
          const cash = row[2] || "";
          const installment = row[3] || "";
          
          return {
            productName: name.toString().trim(),
            quantity: "1",
            cashPrice: cleanAndFormatExcelPrice(cash),
            installmentPrice: cleanAndFormatExcelPrice(installment)
          };
        }).filter(p => p.productName);

        if (products.length === 0) {
          toast({
            variant: "destructive",
            title: "Format Hatası",
            description: "Excel'de geçerli ürün bulunamadı. A sütununda Ürün Adı, C'de Peşin, D'de Taksit olmalıdır.",
          });
          return;
        }

        setExcelProducts(products);
        setFileName(file.name);
        setSelectedIndices(new Set());
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

  const filteredProducts = useMemo(() => {
    return excelProducts.map((p, originalIndex) => ({ ...p, originalIndex }))
      .filter(p => p.productName.toLowerCase().includes(searchTerm.toLowerCase()));
  }, [excelProducts, searchTerm]);

  const toggleSelect = (originalIndex: number, isShift: boolean) => {
    const newSelected = new Set(selectedIndices);
    
    if (isShift && lastSelectedIndex !== null) {
      const currentFilteredIndices = filteredProducts.map(p => p.originalIndex);
      const start = currentFilteredIndices.indexOf(lastSelectedIndex);
      const end = currentFilteredIndices.indexOf(originalIndex);
      
      if (start !== -1 && end !== -1) {
        const [low, high] = [Math.min(start, end), Math.max(start, end)];
        for (let i = low; i <= high; i++) {
          newSelected.add(currentFilteredIndices[i]);
        }
      }
    } else {
      if (newSelected.has(originalIndex)) {
        newSelected.delete(originalIndex);
      } else {
        newSelected.add(originalIndex);
      }
    }
    
    setSelectedIndices(newSelected);
    setLastSelectedIndex(originalIndex);
  };

  const selectAllFiltered = () => {
    const newSelected = new Set(selectedIndices);
    filteredProducts.forEach(p => newSelected.add(p.originalIndex));
    setSelectedIndices(newSelected);
  };

  const clearSelection = () => {
    setSelectedIndices(new Set());
    setLastSelectedIndex(null);
  };

  const addSelectedToTable = () => {
    if (selectedIndices.size === 0) return;
    
    const productsToAdd = Array.from(selectedIndices).map(idx => excelProducts[idx]);
    const newRows = [...data.tableRows, ...productsToAdd.map(p => ({
      productName: p.productName,
      quantity: 1,
      cashPrice: p.cashPrice,
      installmentPrice: p.installmentPrice
    }))];
    
    onChange({ ...data, tableRows: newRows });
    setSelectedIndices(new Set());
    setLastSelectedIndex(null);
    setSearchTerm('');
    setShowResults(false);
    
    toast({
      title: "Ürünler Eklendi",
      description: `${productsToAdd.length} ürün tabloya başarıyla eklendi.`,
    });
  };

  const updateRowQuantity = (index: number, quantity: number) => {
    const safeQuantity = Math.max(1, quantity);
    const newRows = data.tableRows.map((row, i) => 
      i === index ? { ...row, quantity: safeQuantity } : row
    );
    onChange({ ...data, tableRows: newRows });
  };

  const removeRow = (index: number) => {
    const newRows = data.tableRows.filter((_, i) => i !== index);
    onChange({ ...data, tableRows: newRows });
  };

  const isAlreadyAdded = (productName: string) => {
    return data.tableRows.some(row => row.productName === productName);
  };

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
      if (selectedIndices.size > 0) {
        addSelectedToTable();
      } else if (activeIndex >= 0) {
        toggleSelect(filteredProducts[activeIndex].originalIndex, e.shiftKey);
      }
    } else if (e.key === 'Escape') {
      setShowResults(false);
    }
  };

  return (
    <Card className="shadow-none border border-zinc-200 rounded-none overflow-visible">
      <CardHeader className="bg-zinc-50 border-b p-4">
        <CardTitle className="text-sm font-bold uppercase tracking-widest text-zinc-700">Panel Ayarları</CardTitle>
      </CardHeader>
      <CardContent className="p-4 space-y-6 overflow-visible">
        
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

        <div className="space-y-3">
          <Label className="text-[10px] uppercase font-bold text-[#9f2732]">2. Vize Excel Ürün Seçimi</Label>
          
          <div 
            className={cn(
              "relative border-2 border-dashed rounded-none transition-all duration-200 p-4 text-center cursor-pointer",
              isDragging ? "border-[#9f2732] bg-[#9f2732]/5" : "border-zinc-200 bg-zinc-50",
              fileName ? "border-green-200 bg-green-50" : "hover:border-zinc-300 hover:bg-zinc-100"
            )}
            onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
            onDragLeave={() => setIsDragging(false)}
            onDrop={(e) => { e.preventDefault(); setIsDragging(false); const file = e.dataTransfer.files?.[0]; if (file && (file.name.endsWith('.xlsx') || file.name.endsWith('.xls'))) processExcel(file); }}
          >
            <input type="file" accept=".xlsx, .xls" onChange={(e) => { const file = e.target.files?.[0]; if (file) processExcel(file); }} className="absolute inset-0 opacity-0 cursor-pointer" />
            
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

          <div className="relative mt-4" ref={searchRef}>
            <div className="flex flex-col gap-2 mb-2">
              <div className="relative">
                <Search className={cn(
                  "absolute left-3 top-2.5 h-4 w-4 transition-colors",
                  excelProducts.length > 0 ? "text-zinc-500" : "text-zinc-300"
                )} />
                <Input
                  placeholder={excelProducts.length > 0 ? "Ürün ara, SPACE ile seç, ENTER ile ekle..." : "Önce Excel yükleyin"}
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

              {selectedIndices.size > 0 && (
                <div className="flex items-center justify-between bg-zinc-100 p-2 border border-zinc-200 animate-in fade-in slide-in-from-top-1">
                  <div className="flex items-center gap-2">
                    <Badge variant="secondary" className="bg-[#9f2732] text-white rounded-none text-[10px]">
                      {selectedIndices.size} SEÇİLDİ
                    </Badge>
                  </div>
                  <div className="flex gap-2">
                    <Button 
                      size="sm" 
                      variant="ghost" 
                      onClick={clearSelection}
                      className="h-7 text-[9px] font-bold uppercase hover:text-[#9f2732]"
                    >
                      TEMİZLE
                    </Button>
                    <Button 
                      size="sm" 
                      onClick={addSelectedToTable}
                      className="h-7 text-[9px] font-bold uppercase bg-[#9f2732] hover:bg-[#832029] rounded-none"
                    >
                      <ListPlus className="w-3 h-3 mr-1" />
                      SEÇİLENLERİ EKLE
                    </Button>
                  </div>
                </div>
              )}
            </div>
            
            {showResults && searchTerm && (
              <div 
                ref={resultsRef}
                className="absolute z-50 w-full mt-1 bg-white border border-zinc-200 shadow-2xl max-h-[400px] flex flex-col animate-in fade-in slide-in-from-top-1"
              >
                <div className="p-2 border-b bg-zinc-50 flex items-center justify-between sticky top-0 z-10">
                  <span className="text-[9px] font-bold text-zinc-400 uppercase tracking-tighter">
                    {filteredProducts.length} SONUÇ BULUNDU
                  </span>
                  <Button variant="ghost" size="sm" onClick={selectAllFiltered} className="h-6 text-[9px] font-bold uppercase hover:bg-zinc-200">
                    TÜMÜNÜ SEÇ
                  </Button>
                </div>

                <ScrollArea className="flex-1">
                  <div className="p-0">
                    {filteredProducts.length > 0 ? (
                      filteredProducts.map((p, idx) => {
                        const isSelected = selectedIndices.has(p.originalIndex);
                        const added = isAlreadyAdded(p.productName);
                        
                        return (
                          <div
                            key={idx}
                            className={cn(
                              "p-3 text-xs border-b last:border-0 cursor-pointer transition-all flex items-center gap-3 group relative",
                              activeIndex === idx ? "bg-zinc-100" : "hover:bg-zinc-50",
                              isSelected && "bg-[#9f2732]/5 border-l-4 border-l-[#9f2732]"
                            )}
                            onClick={(e) => toggleSelect(p.originalIndex, e.shiftKey)}
                            onDoubleClick={addSelectedToTable}
                            onMouseEnter={() => setActiveIndex(idx)}
                          >
                            <Checkbox 
                              checked={isSelected} 
                              className="rounded-none border-zinc-300 data-[state=checked]:bg-[#9f2732] data-[state=checked]:border-[#9f2732]"
                            />
                            
                            <div className="flex-1 truncate pr-4">
                              <div className="flex items-center gap-2">
                                <span className={cn(
                                  "font-bold uppercase truncate",
                                  added ? "text-zinc-400" : "text-zinc-800"
                                )}>
                                  {p.productName}
                                </span>
                                {added && (
                                  <Badge variant="outline" className="text-[8px] font-bold uppercase text-zinc-400 border-zinc-200 px-1 py-0 h-4">
                                    <CheckCircle2 className="w-2 h-2 mr-1" /> EKLENDİ
                                  </Badge>
                                )}
                              </div>
                              <div className="flex gap-3 mt-0.5">
                                <span className="text-[10px] text-zinc-500 font-medium">Peşin (C): <b className="text-zinc-700">{p.cashPrice} ₺</b></span>
                                <span className="text-[10px] text-zinc-500 font-medium">Taksit (D): <b className="text-zinc-700">{p.installmentPrice} ₺</b></span>
                              </div>
                            </div>
                            
                            <div className="opacity-0 group-hover:opacity-100 transition-opacity flex gap-1">
                               <MousePointer2 className="w-3 h-3 text-zinc-300" />
                            </div>
                          </div>
                        );
                      })
                    ) : (
                      <div className="p-8 text-center">
                        <AlertCircle className="w-6 h-6 mx-auto text-zinc-300 mb-2" />
                        <p className="text-xs text-zinc-400 font-medium italic">Sonuç bulunamadı</p>
                      </div>
                    )}
                  </div>
                </ScrollArea>
              </div>
            )}
          </div>
        </div>

        {data.tableRows.length > 0 && (
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label className="text-[10px] uppercase font-bold text-zinc-400">Etiket Tablo Satırları ({data.tableRows.length})</Label>
              <Button 
                variant="ghost" 
                size="sm"
                onClick={() => onChange({...data, tableRows: []})} 
                className="h-6 text-[9px] uppercase font-bold text-red-500 hover:bg-red-50"
              >
                TÜMÜNÜ TEMİZLE
              </Button>
            </div>
            <div className="space-y-1 max-h-[300px] overflow-auto pr-1">
              {data.tableRows.map((row, idx) => (
                <div key={idx} className="flex flex-col p-2.5 bg-white border border-zinc-200 group hover:border-[#9f2732]/30 transition-all">
                  <div className="flex items-center justify-between gap-2">
                    <div className="truncate flex-1">
                      <div className="font-bold text-zinc-700 text-[10px] uppercase truncate">{row.productName}</div>
                      <div className="flex items-center gap-3 mt-0.5">
                        <span className="text-[9px] font-bold text-[#9f2732]">Birim P: {row.cashPrice} ₺</span>
                        <span className="text-[9px] font-bold text-zinc-400">Birim T: {row.installmentPrice} ₺</span>
                      </div>
                    </div>
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      onClick={() => removeRow(idx)} 
                      className="h-7 w-7 text-zinc-300 hover:text-red-500 hover:bg-red-50 shrink-0"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </Button>
                  </div>
                  <div className="flex items-center gap-2 mt-2 pt-2 border-t border-zinc-100">
                    <span className="text-[9px] font-bold text-zinc-500 uppercase">Adet:</span>
                    <Input 
                      type="number" 
                      min="1" 
                      value={row.quantity} 
                      onChange={(e) => updateRowQuantity(idx, parseInt(e.target.value) || 1)}
                      className="h-7 w-16 text-[10px] rounded-none focus-visible:ring-[#9f2732]"
                    />
                    <div className="ml-auto text-right">
                       <div className="text-[9px] font-bold text-[#9f2732]">Toplam P: {formatPrice(parsePrice(row.cashPrice) * row.quantity)} ₺</div>
                    </div>
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
            <Input 
              id="productTitle" 
              name="productTitle" 
              placeholder="Ürün başlığını giriniz"
              value={data.productTitle} 
              onChange={handleManualChange} 
              className="rounded-none h-10 text-sm border-zinc-300 focus-visible:ring-[#9f2732]" 
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="grid gap-2">
              <Label htmlFor="totalCashPrice" className="text-[10px] uppercase font-bold text-zinc-400">Büyük Peşin Fiyat</Label>
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
              <Label htmlFor="totalInstallmentPrice" className="text-[10px] uppercase font-bold text-zinc-400">Büyük Taksit Fiyat</Label>
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

        <div className="space-y-3 p-4 bg-zinc-100/50 border border-zinc-200 animate-in fade-in zoom-in-95">
          <div className="flex items-center gap-2">
            <Label className="text-[10px] uppercase font-bold text-zinc-500">TABLO TOPLAMI (Otomatik)</Label>
            <Badge variant="outline" className="text-[8px] font-bold text-zinc-400 border-zinc-300 bg-white">Bilgi</Badge>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <span className="text-[9px] uppercase font-bold text-zinc-400">Toplam Peşin</span>
              <div className="text-sm font-bold text-zinc-800 tabular-nums">
                {formatPrice(tableTotals.cash)} ₺
              </div>
            </div>
            <div className="space-y-1">
              <span className="text-[9px] uppercase font-bold text-zinc-400">Toplam Taksit</span>
              <div className="text-sm font-bold text-zinc-800 tabular-nums">
                {formatPrice(tableTotals.installment)} ₺
              </div>
            </div>
          </div>
          <Separator className="bg-zinc-200" />
          <p className="text-[8px] text-zinc-400 italic font-medium leading-tight">
            * Tablo satırlarındaki tutarların toplamıdır. Üstteki manuel büyük fiyat alanlarını etkilemez.
          </p>
        </div>

      </CardContent>
    </Card>
  );
};

export default LabelForm;
