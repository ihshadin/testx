import mongoose from "mongoose";
import seedSuperAdmin from "./supperAdmin";
import {seedCounter} from "@/helpers/seedCounter";

type ConnectionObject = {
  isConnected?: boolean;
};

const connection: ConnectionObject = {};

async function dbConnect(): Promise<void> {
  if (connection.isConnected) {
    console.log("Already connected to the database");
    return;
  }

  try {
    await mongoose.connect(process.env.DATABASE_URL || "", {});

    await seedSuperAdmin();
    await seedCounter();

    connection.isConnected = true;

    console.log("Database connected successfully");
  } catch (error) {
    console.error("Database connection failed:", error);
    connection.isConnected = false;
    process.exit(1);
  }
}

export default dbConnect;
