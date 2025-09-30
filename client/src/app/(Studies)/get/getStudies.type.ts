export interface IStudies {
  id?: string;
  title: string;
  description: string;
  thumbnailUrl: string;
  body: string;
  authorName: string;
  slug: string;
  tag: string;
  createdAt?: string;
  updatedAt?: string;
}
export interface ITagFilters {
  tag: string;
  color: string; // classe usada para hover
  borderColor: string; // classe usada quando ativo
  textColor: string; // classe usada quando ativo
}