"use server";
import { db } from "@/db";
import { usersTable } from "@/db/schema";
import { newUser } from "@/types/user";

export async function createUser(user: newUser) {
  await db.insert(usersTable).values(user);
  console.log(`New user ${user.name} with email ${user.email}`);
}