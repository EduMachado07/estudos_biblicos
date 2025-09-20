import { DeleteStudyController } from "./DeleteStudy_Controller";
import { DeleteStudyUseCase } from "./DeleteStudy_UseCase";
import { MockStudyRepository } from "../../../repositories/implementations/MockStudyRepository";
import { CloudinaryProvider } from "../../../providers/implementations/CloudinaryUploadImageProvider";


const mockStudyRepository = new MockStudyRepository();
const uploadThumbnail = new CloudinaryProvider();

const deleteStudyUseCase = new DeleteStudyUseCase(mockStudyRepository, uploadThumbnail);

const deleteStudyController = new DeleteStudyController(deleteStudyUseCase);

export { deleteStudyController };