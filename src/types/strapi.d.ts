interface File {
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
  data: StrapiEntry<File> | null;
}

export interface StrapiEntry<
  T extends Record<string, unknown> = Record<string, unknown>
> {
  id: number;
  attributes: T;
}
