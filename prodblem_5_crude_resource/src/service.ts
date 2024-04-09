import * as fs from "fs-extra";

export enum EGender {
  Male,
  Female,
}

export enum ETitle {
  Mrs,
  Ms,
  Mr,
}

export interface IUser {
  id?: number;
  email: string;
  gender: EGender;
  fullName: string;
  title: ETitle;
  phoneNumber: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface IUserEntity {
  id?: number;
  email: string;
  gender: EGender;
  fullName: string;
  title: ETitle;
  phoneNumber: string;
  createdAt: Date;
  updatedAt?: Date;
  deletedAt?: Date;
}

export interface IFilter {
  name?: string;
  phoneNumber?: string;
  email?: string;
}

export interface IResponse<T> {
  success: boolean;
  data?: T;
  message?: string;
  statusCode?: number;
}

export class UserService {
  private readonly databaseFile = "./data/users.json";
  private activeUsers: IUserEntity[] = [];
  private allUsers: IUserEntity[] = [];
  private nextUserId: number = 0;

  constructor() {
    fs.ensureFileSync(this.databaseFile);
    this.loadData();
  }

  private getMaxId(): number {
    return this.allUsers.reduce((maxId, user) => {
      return user.id && user.id > maxId ? user.id : maxId;
    }, 0);
  }

  private loadData(): void {
    try {
      const dataString = fs.readFileSync(this.databaseFile, "utf8");
      this.allUsers = (dataString ? JSON.parse(dataString) : []) as IUserEntity[];
      this.nextUserId = this.getMaxId() + 1;
      this.activeUsers = this.allUsers?.filter((u) => !u.deletedAt) ?? [];
    } catch (err) {
      console.error("Error reading data from database:", err);
      throw new Error("Error reading data from database");
    }
  }

  private async saveData(): Promise<void> {
    await fs.writeFile(this.databaseFile, JSON.stringify(this.allUsers, null, 2));
  }

  public async updateUser(user: IUser): Promise<IResponse<IUser>> {
    if (!user.id) {
      return {
        success: false,
        message: "User not found!",
        statusCode: 404,
      };
    }
    const userFromDb = this.allUsers.find(
      (u) => u.id === user.id && u.email === user.email
    );
    if (!userFromDb) {
      return {
        success: false,
        message: "User not found!",
        statusCode: 404,
      };
    }
    userFromDb.gender = user.gender;
    userFromDb.title = user.title;
    userFromDb.fullName = user.fullName;
    userFromDb.phoneNumber = user.phoneNumber;
    userFromDb.updatedAt = new Date();

    await this.saveData();
    this.loadData();
    return {
      success: true,
      data: user,
    };
  }

  public async createUser(user: IUser): Promise<IResponse<IUser>> {
    const userFromDb = this.activeUsers.find((u) => u.email === user.email);
    if (userFromDb) {
      return {
        success: false,
        message: "User is already existing!",
        statusCode: 400,
      };
    }
    const newUser: IUserEntity = {
      ...user,
      id: this.nextUserId,
      createdAt: new Date(),
    };
    this.allUsers.push(newUser);

    await this.saveData();
    this.loadData();
    return {
      success: true,
      data: newUser as IUser,
    };
  }

  public getUserById(id: number): IResponse<IUser> {
    const userFromDb = this.activeUsers.find((u) => u.id === id);
    if (!userFromDb) {
      return {
        success: false,
        message: "User not found!",
        statusCode: 404,
      };
    }
    return {
      success: true,
      data: userFromDb as IUser,
    };
  }

  public getUserByEmail(email: string): IResponse<IUser> {
    const userFromDb = this.activeUsers.find((u) => u.email === email);
    if (!userFromDb) {
      return {
        success: false,
        message: "User not found!",
        statusCode: 404,
      };
    }
    return {
      success: true,
      data: userFromDb as IUser,
    };
  }

  public async deleteUser(id: number): Promise<IResponse<string>> {
    const userFromDb = this.activeUsers.find((u) => u.id === id);
    if (!userFromDb) {
      return {
        success: false,
        message: "User not found!",
        statusCode: 404,
      };
    }
    userFromDb.deletedAt = new Date();

    await this.saveData();
    this.loadData();

    return {
      success: true,
      data: "Remove successfully!",
    };
  }

  public listUsers(
    pageNum: number,
    pageSize: number,
    filter?: IFilter
  ): IResponse<{ users: IUser[], totalCount: number }> {
    let users: IUser[] = JSON.parse(JSON.stringify(this.activeUsers));
    if (filter?.name) {
      const regex = new RegExp(filter.name.toLocaleLowerCase(), "i");
      users = users.filter((user) => regex.test(user.fullName.toLocaleLowerCase()));
    }
    if (filter?.email) {
      const regex = new RegExp(filter.email.toLocaleLowerCase(), "i");
      users = users.filter((user) => regex.test(user.email.toLocaleLowerCase()));
    }
    if (filter?.phoneNumber) {
      users = users.filter((user) => user.phoneNumber === filter.phoneNumber);
    }
    const totalCount = users.length;
    if (pageSize >= totalCount) return {
      success: true,
      data: {
        users,
        totalCount
      }
    }
    const startIndex = (pageNum - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    const usersPage = users.slice(startIndex, endIndex);
    return {
      success: true,
      data: {
        users: usersPage,
        totalCount
      },
    };
  }
}
