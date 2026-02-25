import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { error } from "console";
import { NextResponse } from "next/server";

interface ParamsType{
  params: Promise<{
    id: string
  }>,
  
}

export  async function DELETE(req: Request, {params}: ParamsType) {
  const session = await auth();
  const {id} = await params;

  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized access" }, { status: 401 });
  }


  const project = await prisma.project.findFirst({
    where: {
      id: id,
      userId: session.user.id,
    },
  });

  if (!project) {
    return NextResponse.json("Project Not found", {status: 404});
  }

  await prisma.project.delete({
     where:{
       id: id
     }
  });
  return NextResponse.json({success: true})
}


