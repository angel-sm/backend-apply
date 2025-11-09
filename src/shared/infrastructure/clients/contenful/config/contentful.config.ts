export interface ContenfulCongif {
  url: string;
}

export const getContentfulConfig = (): ContenfulCongif => {
  const spaceId = process.env.CONTENTFUL_SPACE_ID;
  const accessToken = process.env.CONTENTFUL_ACCESS_TOKEN;
  const environment = process.env.CONTENTFUL_ENVIRONMENT;
  const contentType = process.env.CONTENTFUL_CONTENT_TYPE;
  const host = process.env.CONTENTFUL_HOST;

  const url = `${host}/spaces/${spaceId}/environments/${environment}/entries?access_token=${accessToken}&content_type=${contentType}`;

  return {
    url,
  };
};
