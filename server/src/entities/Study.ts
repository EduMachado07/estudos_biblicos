import { v4 as uuidv4 } from "uuid";
import { customAlphabet } from "nanoid";

const nanoid = customAlphabet("1234567890abcdef", 10);

export class Study {
  public readonly id: string;
  public slug: string;
  public title: string;
  public description: string;
  public thumbnailId: string;
  public thumbnailUrl: string;
  public body: object;
  public author: string;
  public tags: string[];
  public readingTime: number;
  public readonly createdAt: Date;
  public updatedAt: Date;

  constructor(
    props: Omit<
      Study,
      "id" | "slug" | "createdAt" | "updatedAt" | "readingTime"
    >,
    id?: string,
    createdAt?: Date,
    updatedAt?: Date
  ) {
    Object.assign(this, props);

    this.id = id ?? uuidv4();
    this.slug = nanoid();
    this.createdAt = createdAt ?? new Date();
    this.updatedAt = updatedAt ?? new Date();

    const bodyText = this.extractTextFromTiptap(this.body);
    const text = `${this.description} ${bodyText}`;
    this.readingTime = this.estimateReadingTime(text);
  }

  extractTextFromTiptap(doc: any): string {
    if (!doc) return "";

    let text = "";

    if (doc.type === "text" && doc.text) {
      text += doc.text + " ";
    }

    if (doc.content && Array.isArray(doc.content)) {
      for (const child of doc.content) {
        text += this.extractTextFromTiptap(child);
      }
    }

    return text;
  }

  estimateReadingTime = (text: string) => {
    const words = text.trim().split(/\s+/).length; // conta palavras
    const wordsPerMinute = 200; // taxa média
    return Math.ceil(words / wordsPerMinute); // minutos
  };

  update(data: Partial<Omit<Study, "id" | "slug" | "createdAt">>) {
    Object.assign(this, data);

    const bodyText = this.extractTextFromTiptap(this.body);
    const text = `${this.description} ${bodyText}`;
    this.readingTime = this.estimateReadingTime(text);

    this.updatedAt = new Date();
  }
}
