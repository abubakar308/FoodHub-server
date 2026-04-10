import bcrypt from "bcrypt"
import { Role } from "../../generated/prisma/enums";
import { prisma } from "../lib/prisma";

const seedAdmin = async () => {
  const hashedPassword = await bcrypt.hash("Admin@12", 8);

  const adminData = {
    name: "Admin",
    email: "admin@gmail.com",
    role: Role.ADMIN,
    password: hashedPassword,
  };


  try {
    const isExists = await prisma.user.findUnique({
      where: {
        email: adminData.email,
      },
    });

    if (isExists) {
      console.log("Admin already exists!!");
      return;
    }
    await prisma.user.create({
      data: adminData,
    });
  } catch (error) {
    console.log(error);
  } finally {
    await prisma.$disconnect()
  }
};
seedAdmin();