export interface ProductsReportFilters {
  hasPrice?: boolean;
  startDate?: string;
  endDate?: string;
}

export class NonDeletedProductsReporFiltersUtil {
  static buildMongoQuery(filters: ProductsReportFilters): Record<string, any> {
    const query: Record<string, any> = {};

    if (filters.hasPrice !== undefined) {
      query.hasPrice = filters.hasPrice;
    }

    if (filters.startDate !== undefined && filters.endDate !== undefined) {
      query.createdAt = {
        $gte: filters.startDate,
        $lte: filters.endDate,
      };
    }

    return query;
  }
}
