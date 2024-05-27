class User {
  id?: number;
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

export default User;
