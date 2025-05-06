interface IPostgresProvider {
  findByEmail(email: string): Promise<string>;
  createUser(data: ICreateUser): Promise<string>;
}

interface ICreateUser {
  email: string;
  password_hash: string;
}

export { IPostgresProvider, ICreateUser };
