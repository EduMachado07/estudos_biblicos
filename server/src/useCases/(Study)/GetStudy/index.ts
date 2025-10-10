import { MockStudyRepository } from "../../../repositories/implementations/MockStudyRepository";
import { GetStudyBySlugController, GetStudyController } from "./GetStudy_Controller";
import { GetStudyBySlugUseCase, GetStudyUseCase } from "./GetStudy_UseCase";

const studyRepository = new MockStudyRepository();

const getStudyUseCase = new GetStudyUseCase(studyRepository);
const getStudyByIdUseCase = new GetStudyBySlugUseCase(studyRepository);

const getStudyController = new GetStudyController(getStudyUseCase);
const getStudyByIdController = new GetStudyBySlugController(getStudyByIdUseCase);

export { getStudyController, getStudyByIdController };
