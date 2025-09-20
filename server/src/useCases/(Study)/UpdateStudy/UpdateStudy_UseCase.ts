import { Study } from "../../../entities/Study";
import { IUploadImage } from "../../../providers/IUploadImage";
import { NotFound, Unauthorized } from "../../../repositories/IErrorRepository";
import { IStudyRepository } from "../../../repositories/IStudyRepository";
import { IUpdateStudyDTO } from "./UpdateStudy_DTO";

export class UpdateStudyUseCase {
  constructor(
    private studyRepository: IStudyRepository,
    private uploadThumbnail: IUploadImage
  ) {}

  async execute(data: IUpdateStudyDTO, thumbnail?: Buffer): Promise<Study> {
    const studyExists = await this.studyRepository.findById(data.studyId);
    if (!studyExists) {
      throw new NotFound("Estudo não encontrado no sistema");
    }

    if (studyExists.author !== data.authorId) {
      throw new Unauthorized("Você não tem permissão para alterar este estudo");
    }

    let thumbnailId = studyExists.thumbnailId;
    let thumbnailUrl = studyExists.thumbnailUrl;

    if (thumbnail) {
      if (thumbnailId) {
        await this.uploadThumbnail.destroy(thumbnailId);
      }

      const uploadResult = await this.uploadThumbnail.uploadStream(
        thumbnail,
        thumbnailId
      );

      thumbnailId = uploadResult.id;
      thumbnailUrl = uploadResult.url;
    }

    const { authorId, ...rest } = data;
    const dataStudy: Partial<Study> = { ...rest, thumbnailId, thumbnailUrl };

    const studyUpdated = await this.studyRepository.updateById(
      data.studyId,
      dataStudy
    );
    return studyUpdated;
  }
}
