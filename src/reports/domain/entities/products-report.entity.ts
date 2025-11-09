export interface PrimitiveProductsReport {
  totalProducts: number;
  deletedProducts: number;
  activeProducts: number;
  deletedPercentage: number;
  activePercentage: number;
}

const HOUNDRED_PERCENT = 100;

export class ProductsReport {
  constructor(private readonly report: PrimitiveProductsReport) {}

  static create(data: { totalProducts: number; deletedProducts: number; activeProducts: number }) {
    const report = new ProductsReport({
      ...data,
      deletedPercentage: 0,
      activePercentage: 0,
    });

    report.calculateDeletePersentage();
    report.calculateActivePersentage();

    return report;
  }

  calculateDeletePersentage() {
    this.report.deletedPercentage =
      this.report.totalProducts > 0 ? (this.report.deletedProducts / this.report.totalProducts) * HOUNDRED_PERCENT : 0;
  }

  calculateActivePersentage() {
    this.report.activePercentage = HOUNDRED_PERCENT - this.report.deletedPercentage;
  }

  get toPrimitive() {
    return this.report;
  }
}
