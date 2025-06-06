class User {
  id?: string;
  username: string;
  email: string;
  password: string;
  createdAt: Date;

  constructor(
    username: string,
    email: string,
    password: string,
    createdAt: Date,
    id?: string
  ) {
    this.id = id;
    this.username = username;
    this.email = email;
    this.password = password;
    this.createdAt = createdAt;
  }
}

// class AuthenticatedUser extends User {
//   id: string;

//   constructor(
//     id: string,
//     username: string,
//     email: string,
//     password: string,
//     createdAt: Date
//   ) {
//     super(username, email, password, createdAt);
//     this.id = id;
//   }
// }
export { User };
