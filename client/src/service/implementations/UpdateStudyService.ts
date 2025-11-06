import { AxiosInstanceWithRefreshToken } from "../AxiosInstance";
import type { IUpdateStudyService } from "../IStudyService";

export class UpdateStudyService implements IUpdateStudyService {
  async exec(id: string | undefined, data: FormData): Promise<void> {
    if (!id) throw new Error("ID do estudo não encontrado");

    await AxiosInstanceWithRefreshToken.patch(`/study/${id}`, data, {
      headers: { "Content-Type": "multipart/form-data" },
    });
  }
}
