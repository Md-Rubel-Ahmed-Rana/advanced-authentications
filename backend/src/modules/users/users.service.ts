import ApiError from "@/middlewares/error";
import { IUser } from "./users.interface";
import { UserModel } from "./users.model";
import { HttpStatusCode } from "@/lib/httpStatus";

class Service {
  async create(data: IUser) {
    const isExist = await UserModel.findOne({
      email: data.email,
    });

    if (isExist) {
      throw new ApiError(
        HttpStatusCode.CONFLICT,
        `You already have an account. Please login to your account`
      );
    }

    await UserModel.create(data);
  }
}

export const UserService = new Service();
