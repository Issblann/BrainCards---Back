class User {
  username: string;
  email: string;
  password: string;
  createdAt: Date;
  updatedAt: Date;

  constructor(
    username: string,
    email: string,
    password: string,
    createdAt: Date,
    updatedAt: Date
  ) {
    this.username = username;
    this.email = email;
    this.password = password;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }
}

class AuthenticatedUser extends User {
  id: string;

  constructor(
    id: string,
    username: string,
    email: string,
    password: string,
    createdAt: Date,
    updatedAt: Date
  ) {
    super(username, email, password, createdAt, updatedAt);
    this.id = id;
  }
}
export { User, AuthenticatedUser };
