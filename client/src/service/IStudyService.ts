import type { IStudies } from "@/app/(Studies)/get/getStudies.type";

export interface ICreateStudyService {
  exec: (formData: FormData) => Promise<void>;
}

export interface IGetStudyAllService {
  exec: (
    offset?: number,
    limit?: number
  ) => Promise<{
    studies: IStudies[];
    next: number | null;
    previous: number | null;
    length: number;
  }>;
}

export interface IGetStudyBySlugService {
  exec: (id: string) => Promise<IStudies>;
}
export interface IDeleteStudyService {
  exec: (id: string) => Promise<void>;
}
export interface IUpdateStudyService {
  exec: (
    authorName: string,
    authorId: string,
    title?: string,
    description?: string,
    thumbnail?: File,
    tag?: string,
    body?: string
  ) => Promise<void>;
}
