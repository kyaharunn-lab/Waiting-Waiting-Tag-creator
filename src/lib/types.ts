
export interface ExcelProduct {
  productName: string;
  quantity: string;
  cashPrice: string;
  installmentPrice: string;
}

export interface TableRow {
  productName: string;
  quantity: string;
  cashPrice: string;
  installmentPrice: string;
}

export interface LabelData {
  productTitle: string;
  totalCashPrice: string;
  totalInstallmentPrice: string;
  tableRows: TableRow[];
  productImage?: string;
}

export const initialLabelData: LabelData = {
  productTitle: "DELFİN KOLTUK TAKIMI (3+3+B)",
  totalCashPrice: "90.000",
  totalInstallmentPrice: "120.000",
  tableRows: [
    {
      productName: "DELFİN 3'LU KOLTUK",
      quantity: "1",
      cashPrice: "90.000",
      installmentPrice: "120.000",
    }
  ],
};
