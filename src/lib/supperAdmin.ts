import { USER_ROLE } from "@/app/api/v1/user/userModule/user.constant";
import { UserModel } from "@/app/api/v1/user/userModule/user.model";
import * as bcrypt from "bcrypt";

let superUser = {
  firstName: "Super",
  lastName: "Admin",
  password: "superAdmin00@11",
  email: "superAdmin@gmail.com",
  role: USER_ROLE.superAdmin,
  gender: "male",
  dateOfBirth: "09-5-2024",
  location: "New York",
};

const seedSuperAdmin = async () => {
  const isSuperAdminExits = await UserModel.findOne({
    role: USER_ROLE.superAdmin,
  });

  if (!isSuperAdminExits) {
    superUser.password = await bcrypt.hash(superUser.password, 11);
    await UserModel.create(superUser);
  }
};

export default seedSuperAdmin;
