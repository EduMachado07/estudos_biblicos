import { v4 as uuidv4 } from 'uuid';
import { customAlphabet } from 'nanoid';

const nanoid = customAlphabet('1234567890abcdef', 10);

export class Study {

    public readonly id: string;
    public slug: string;

    public title: string;
    public description: string;
    public thumbnailId: string;
    public thumbnailUrl: string;
    public body: Object;
    public author: string;

    constructor(props: Omit<Study, 'id' | 'slug'>, id?: string) {
        Object.assign(this, props);

        this.id = id ?? uuidv4();
        this.slug = nanoid();
    }
}