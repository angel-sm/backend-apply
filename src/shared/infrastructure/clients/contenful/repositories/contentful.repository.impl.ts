import { Contentful } from '@shared/domain/entities/contentful.entity';
import { ContentfulRepository } from '@shared/domain/repositories/contenful.repository';
import { getContentfulConfig } from '../config/contentful.config';

export class ContentfulRepositoryImpl extends ContentfulRepository {
  private readonly contentfulConfig = getContentfulConfig();

  async fetchProducts(): Promise<Contentful[]> {
    const response = await fetch(this.contentfulConfig.url);
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const data = await response.json();
    return data.items as Contentful[];
  }
}
