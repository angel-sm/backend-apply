import { Contentful } from '../entities/contentful.entity';

export abstract class ContentfulRepository {
  /**
   * Fetch all products from Contentful CMS.
   * Retrieves product entries with all associated fields and metadata from the Contentful API.
   *
   * @returns Promise resolving to array of Contentful product entries
   * @throws {Error} If Contentful API request fails or connection issues occur
   */
  abstract fetchProducts(): Promise<Contentful[]>;
}
