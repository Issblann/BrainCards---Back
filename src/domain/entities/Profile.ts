class Profile {
  id?: string;
  userId: string;
  name: string;
  lastName?: string | null;
  bio?: string | null;
  image?: string | null;
  updatedAt: Date | null;

  constructor(
    userId: string,
    name: string,
    lastName: string,
    bio: string,
    image: string,
    updatedAt: Date,
    id?: string
  ) {
    this.id = id;
    this.userId = userId;
    this.name = name;
    this.lastName = lastName;
    this.bio = bio;
    this.image = image;
    this.updatedAt = updatedAt;
  }
}

export { Profile };
