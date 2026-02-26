-- DropForeignKey
ALTER TABLE "Bug" DROP CONSTRAINT "Bug_projectId_fkey";

-- AddForeignKey
ALTER TABLE "Bug" ADD CONSTRAINT "Bug_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "Project"("id") ON DELETE CASCADE ON UPDATE CASCADE;
