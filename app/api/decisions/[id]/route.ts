import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

interface ParamsType{
    params: Promise<{id: string}>
}

export async function DELETE(
  req: Request,
  { params }: ParamsType
) {
  const session = await auth();

  if (!session?.user) {
    return NextResponse.json(
      { error: "Unauthorized" },
      { status: 401 }
    );
  }

  const { id } = await params; 

  const decision = await prisma.bug.findFirst({
    where: {
      id: id,
      project: {
        userId: session.user.id,
      },
      entryType: "DECISION"
    },
  });

  if (!decision) {
    return NextResponse.json(
      { error: "decision not found" },
      { status: 404 }
    );
  }

  await prisma.bug.delete({
    where: { id },
  });

  return NextResponse.json({ success: true });
}

export async function PUT(req: Request, {params}:ParamsType){
   const session = await auth()

   if(!session?.user){
      return NextResponse.json({error:"Unauthorized access"}, {status: 404})
   }

   const body = await req.json()

   const decision = await prisma.bug.findFirst({
    where:{
       id: (await params).id,
       project: {
      userId: session.user.id,
    },
       entryType: "DECISION"
    }
   })
   if(!decision){
    return NextResponse.json({error:"Not found"}, {status: 404})
   }

   const updated = await prisma.bug.update({
    where:{
      id: (await params).id
    },

    data:{
       title: body.title,
       context: body.context,
       solution: body.solution,
    }
   })

   return NextResponse.json(updated)


}