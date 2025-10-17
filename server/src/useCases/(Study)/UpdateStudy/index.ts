import { CloudinaryProvider } from "../../../providers/implementations/CloudinaryUploadImageProvider";
import { MockStudyRepository } from "../../../repositories/implementations/MockStudyRepository";
import { PostgresStudyRepository } from "../../../repositories/implementations/PostgresStudyRepository";
import { UpdateStudyController } from "./UpdateStudy_Controller";
import { UpdateStudyUseCase } from "./UpdateStudy_UseCase";

const studyRepository = new PostgresStudyRepository();
const uploadThumbnail = new CloudinaryProvider();

const updateStudyUseCase = new UpdateStudyUseCase(studyRepository, uploadThumbnail);

const updateStudyController = new UpdateStudyController(updateStudyUseCase);

export { updateStudyController };
