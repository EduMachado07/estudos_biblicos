import { CloudinaryProvider } from "../../../providers/implementations/CloudinaryUploadImageProvider";
import { MockStudyRepository } from "../../../repositories/implementations/MockStudyRepository";
import { UpdateStudyController } from "./UpdateStudy_Controller";
import { UpdateStudyUseCase } from "./UpdateStudy_UseCase";

const studyRepository = new MockStudyRepository();
const uploadThumbnail = new CloudinaryProvider();

const updateStudyUseCase = new UpdateStudyUseCase(studyRepository, uploadThumbnail);

const updateStudyController = new UpdateStudyController(updateStudyUseCase);

export { updateStudyController };
