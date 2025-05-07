interface IPostgresProvider {
  findByEmail(email: string): Promise<ReturnID>;
  createUser(data: ICreateUser): Promise<ReturnID>;
}

type ReturnID = Array<{ id: string }>;

interface ICreateUser {
  email: string;
  password_hash: string;
}

export { IPostgresProvider, ICreateUser, ReturnID };
