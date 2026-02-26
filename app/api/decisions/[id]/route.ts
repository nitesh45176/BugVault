import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  const session = await auth();

  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = params;

  const decision = await prisma.bug.findFirst({
    where: {
      id,
      entryType: "DECISION",
      project: {
        userId: session.user.id,
      },
    },
  });

  if (!decision) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  await prisma.bug.delete({
    where: { id },
  });

  return NextResponse.json({ success: true });
}

export async function PUT(
  req: Request,
  { params }: { params: { id: string } }
) {
  const session = await auth();

  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = params;
  const body = await req.json();

  const decision = await prisma.bug.findFirst({
    where: {
      id,
      entryType: "DECISION",
      project: {
        userId: session.user.id,
      },
    },
  });

  if (!decision) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  const updated = await prisma.bug.update({
    where: { id },
    data: {
      title: body.title,
      context: body.context,
      solution: body.solution,
    },
  });

  return NextResponse.json(updated);
}