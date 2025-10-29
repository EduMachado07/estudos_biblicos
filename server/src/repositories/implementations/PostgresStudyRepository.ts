import { Study } from "../../entities/Study";
import { BadRequest } from "../IErrorRepository";
import { IStudyRepository } from "../IStudyRepository";
import { PrismaClient } from "@prisma/client";

export const prisma = new PrismaClient();

export class PostgresStudyRepository implements IStudyRepository {
  async createSlug(author: string, title: string): Promise<string> {
    const authorSlug = author
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "");

    const titleSlug = title
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "");

    let slug = `${authorSlug}/${titleSlug}`;
    let version = 2;

    while (await prisma.study.findUnique({ where: { slug } })) {
      slug = `${authorSlug}/${titleSlug}-v${version}`;
      version++;
    }

    return slug;
  }
  async setReadingTime(body: string): Promise<number> {
    const words = body.trim().split(/\s+/).length;
    return Math.ceil(words / 200);
  }
  async create(data: Study): Promise<Study> {
    const study = await prisma.study.create({
      data: {
        id: data.id,
        title: data.title,
        description: data.description,
        thumbnailId: data.thumbnailId,
        thumbnailUrl: data.thumbnailUrl,
        body: data.body,
        authorId: data.authorId,
        tag: data.tag,
        slug: data.slug,
        readingTime: data.readingTime,
        createdAt: data.createdAt,
        updatedAt: data.updatedAt,
      },
    });

    return study;
  }
  async findStudies(
    offset: number,
    limit: number
  ): Promise<{ studies: Study[]; length: number }> {
    const [studies, length] = await Promise.all([
      prisma.study.findMany({
        skip: offset,
        take: limit,
        orderBy: { createdAt: "desc" },
      }),
      prisma.study.count(),
    ]);

    return { studies, length };
  }
  async findById(id: string): Promise<Study | null> {
    const study = await prisma.study.findUnique({
      where: { id },
    });
    return study;
  }
  async findBySlug(slug: string): Promise<Study | null> {
    const study = await prisma.study.findUnique({
      where: { slug },
      include: {
        author: {
          select: { name: true },
        },
      },
    });
    return study;
  }
  async deleteById(id: string): Promise<void> {
    await prisma.study.delete({
      where: { id },
    });
  }
  async updateById(id: string, data: Partial<Study>): Promise<Study> {
    const studyExists = await prisma.study.findUnique({ where: { id } });
    if (!studyExists) throw new BadRequest("Estudo não encontrado.");

    const { id: _, slug: __, createdAt: ___, ...rest } = data;

    const updated = await prisma.study.update({
      where: { id },
      data: {
        ...rest,
        updatedAt: new Date(),
      },
    });

    return updated;
  }
}
