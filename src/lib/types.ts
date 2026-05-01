
export interface ExcelProduct {
  productName: string;
  quantity: string;
  cashPrice: string;
  installmentPrice: string;
}

export interface TableRow {
  productName: string;
  quantity: number;
  cashPrice: string; // Birim peşin fiyatı saklar
  installmentPrice: string; // Birim taksitli fiyatı saklar
}

export interface LabelData {
  productTitle: string;
  totalCashPrice: string;
  totalInstallmentPrice: string;
  tableRows: TableRow[];
  productImage?: string;
}

export const initialLabelData: LabelData = {
  productTitle: "",
  totalCashPrice: "",
  totalInstallmentPrice: "",
  tableRows: [],
};
