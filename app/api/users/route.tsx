import { NextRequest, NextResponse } from "next/server";
import { currentUser } from "@clerk/nextjs/server";
import { db } from "@/config/db";
import { usersTable } from "@/config/schema";
import { eq } from "drizzle-orm";

export async function POST(req: NextRequest) {
  const user = await currentUser();

  // check if User Already Exist
  try {
    const users = await db
      .select()
      .from(usersTable)
      //@ts-ignore
      .where(eq(usersTable.email, user?.primaryEmailAddress?.emailAddress));

    if (users?.length == 0) {
      const result = await db
        .insert(usersTable)
        .values({
          //@ts-ignore
          name: user?.fullName,
          email: user?.primaryEmailAddress?.emailAddress,
          credits: 100,
        })
        .returning();

      return NextResponse.json(result[0]);
    }

    return NextResponse.json(users[0]);
  } catch (e) {
    return NextResponse.json(e);
  }

  // If Not Create a New User
}
