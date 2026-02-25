

import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { error } from "console";
import { NextResponse } from "next/server";



export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await auth();

  if (!session?.user) {
    return NextResponse.json(
      { error: "Unauthorized" },
      { status: 401 }
    );
  }

  const { id } = await params; 

  const bug = await prisma.bug.findFirst({
    where: {
      id: id,
      project: {
        userId: session.user.id,
      },
    },
  });

  if (!bug) {
    return NextResponse.json(
      { error: "Bug not found" },
      { status: 404 }
    );
  }

  await prisma.bug.delete({
    where: { id },
  });

  return NextResponse.json({ success: true });
}


export async function PUT(req: Request, {params}: {params: Promise<{id:string}>}){
   const session = await auth()

   if(!session?.user){
      return NextResponse.json({error:"Unauthorized access"}, {status: 404})
   }

   const body = await req.json()

   const bugs = await prisma.bug.findFirst({
    where:{
       id: (await params).id,
       userId: session.user.id
    }
   })
   if(!bugs){
    return NextResponse.json({error:"Not found"}, {status: 404})
   }

   const updated = await prisma.bug.update({
    where:{
      id: (await params).id
    },

    data:{
       title: body.title,
       errorMessage: body.errorMessage,
       context: body.context,
       solution: body.solution,
       rootCause: body.rootCause
    }
   })

   return NextResponse.json(updated)


}