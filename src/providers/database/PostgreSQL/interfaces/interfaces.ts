interface IPostgresProvider {
  findByEmail(email: string): Promise<IFindByEmail | undefined>;
  createUser(data: ICreateUser): Promise<ReturnID>;
}

type ReturnID = Array<{ id: string }>;

interface ICreateUser {
  email: string;
  password_hash: string;
}

interface IFindByEmail {
  id: string;
  password_hash: string;
  role: string;
}

export { IPostgresProvider, ICreateUser, IFindByEmail, ReturnID };
