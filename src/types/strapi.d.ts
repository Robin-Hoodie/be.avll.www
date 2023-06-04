export interface StrapiCollectionResponse<T = any> {
  data: StrapiEntry<T>[];
}

export interface StrapiSingleResponse<T = any> {
  data: StrapiEntry<T>;
}

export interface File {
  alternativeText: string | null;
  caption: string | null;
  createdAt: string;
  ext: string;
  formats: null;
  hash: string;
  height: number;
  mime: string;
  name: string;
  previewUrl: string | null;
  provider: string;
  provider_metadata: null;
  size: number;
  updatedAt: string;
  url: string;
  width: number;
}

export interface StrapiFile {
  data: StrapiEntry<File>;
}

interface StrapiEntry<T> {
  id: number;
  attributes: T;
}
