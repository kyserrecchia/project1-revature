export class User {
  id: number;
  username: string;
  password: string;
  name: string;

  constructor(id = 0, username = '', password = '', name = '') {
    this.id = id;
    this.username = username;
    this.password = password;
    this.name = name;
  }
}