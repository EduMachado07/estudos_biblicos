import { v4 as uuidv4 } from "uuid";

export enum Role {
  ADMIN = "ADMIN",
  AUTHOR = "AUTHOR",
  READER = "READER",
}

export class User {
  public readonly id: string;

  public name: string;
  public email: string;
  public password: string;
  public role: Role;

  constructor(props: Omit<User, "id">, id?: string) {
    Object.assign(this, props);

    this.id = id ?? uuidv4();
  }
}
