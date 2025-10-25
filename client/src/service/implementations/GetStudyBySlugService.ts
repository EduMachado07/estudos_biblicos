import type { IStudies } from "@/app/(Studies)/get/getStudies.type";
import type { IGetStudyBySlugService } from "../IStudyService";
import { AxiosInstance } from "../AxiosInstance";

export class GetStudyBySlugService implements IGetStudyBySlugService {
  async exec(slug: string): Promise<IStudies> {
    const { data } = await AxiosInstance.get(`study/${slug}`);

    return data.study;
  }
}
