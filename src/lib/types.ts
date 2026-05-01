
export interface ExcelProduct {
  productName: string;
  quantity: string;
  cashPrice: string;
  installmentPrice: string;
}

export interface LabelData {
  productTitle: string;
  totalCashPrice: string;
  totalInstallmentPrice: string;
  tableProductName: string;
  quantity: string;
  tableCashPrice: string;
  tableInstallmentPrice: string;
  productImage?: string;
}

export const initialLabelData: LabelData = {
  productTitle: "DELFİN KOLTUK TAKIMI (3+3+B)",
  totalCashPrice: "90.000",
  totalInstallmentPrice: "120.000",
  tableProductName: "DELFİN 3'LU KOLTUK",
  quantity: "1",
  tableCashPrice: "90.000",
  tableInstallmentPrice: "120.000",
};
