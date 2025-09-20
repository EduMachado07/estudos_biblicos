import { MockStudyRepository } from "../../../repositories/implementations/MockStudyRepository";
import { GetStudyByIdController, GetStudyController } from "./GetStudy_Controller";
import { GetStudyByIdUseCase, GetStudyUseCase } from "./GetStudy_UseCase";

const studyRepository = new MockStudyRepository();

const getStudyUseCase = new GetStudyUseCase(studyRepository);
const getStudyByIdUseCase = new GetStudyByIdUseCase(studyRepository);

const getStudyController = new GetStudyController(getStudyUseCase);
const getStudyByIdController = new GetStudyByIdController(getStudyByIdUseCase);

export { getStudyController, getStudyByIdController };
