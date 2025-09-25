import { Study } from "../../entities/Study";
import { IStudyRepository } from "../IStudyRepository";
import { BadRequest } from "../IErrorRepository";
import { MockUserRepository } from "./MockUserRepository";
import { IUserRepository } from "../IUserRepository";

export let MockStudies: Study[] = [
  new Study({
    title: "Estudo sobre TypeScript",
    description: "Um estudo detalhado sobre TypeScript.",
    thumbnailId: "thumb1",
    thumbnailUrl: "http://example.com/thumb1.jpg",
    body: '{"type":"doc","content":[{"type":"paragraph","content":[{"type":"text","text":"Conteúdo do estudo sobre TypeScript."}]}]}',
    authorId: "user1",
    authorName: "Alice",
    tag: "Cura",
  }),
];

export class MockStudyRepository implements IStudyRepository {
  async createSlug(
    data: Study,
  ): Promise<string> {
    const authorSlug = data.authorName
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "");

    const titleSlug = data.title
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "");

    let slug = `${authorSlug}/${titleSlug}`;
    let version = 2;

    // loop até achar slug único
    while (MockStudies.find((study) => study.slug === slug)) {
      slug = `${authorSlug}/${titleSlug}/v${version}`;
      version++;
    }

    data.slug = slug;

    return data.slug;
  }
  async setReadingTime(body: string): Promise<number> {
    const words = body.trim().split(/\s+/).length; // conta palavras
    const readingTime = Math.ceil(words / 200); // minutos
    return readingTime;
  }
  async create(data: Study): Promise<Study> {
    const slug = await this.createSlug(data);  
    const readingTime = await this.setReadingTime(data.body); 

    MockStudies.push({
      ...data,
      slug,
      readingTime
    });

    return data;
  }
  async findStudies(
    offset?: number,
    limit?: number
  ): Promise<{ studies: Study[]; length: number }> {
    const studies = MockStudies.slice(offset, offset + limit);
    return { studies, length: MockStudies.length };
  }
  async findById(id: string): Promise<Study | null> {
    const study = MockStudies.find((study) => study.id === id);

    return study || null;
  }
  async deleteById(id: string): Promise<void> {
    MockStudies = MockStudies.filter((study) => study.id !== id);
  }
  async updateById(id: string, data: Partial<Study>): Promise<Study> {
    const studyIndex = MockStudies.findIndex((study) => study.id === id);
    if (studyIndex === -1) {
      throw new BadRequest("Estudo nao encontrado.");
    }

    const { id: _, slug: __, ...rest } = data;
    const updatedStudy = {
      ...MockStudies[studyIndex],
      ...rest,
    };

    MockStudies[studyIndex] = updatedStudy;

    return updatedStudy;
  }
}
