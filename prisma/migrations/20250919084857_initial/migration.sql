-- CreateTable
CREATE TABLE "quando"."policy_permission" (
    "id" TEXT NOT NULL,
    "permissionId" TEXT NOT NULL,
    "policyId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "createdBy" TEXT,
    "updatedBy" TEXT,

    CONSTRAINT "policy_permission_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "quando"."passwordHistory" (
    "id" TEXT NOT NULL,
    "userAuthId" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "createAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "passwordHistory_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "quando"."user" (
    "id" TEXT NOT NULL,
    "firstname" TEXT NOT NULL,
    "lastname" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "isDeleted" BOOLEAN NOT NULL DEFAULT false,
    "image" TEXT,
    "createAt" TIMESTAMP(3) NOT NULL,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "user_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "quando"."userAuth" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "createAt" TIMESTAMP(3) NOT NULL,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "roleId" TEXT NOT NULL,

    CONSTRAINT "userAuth_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "quando"."role" (
    "id" TEXT NOT NULL,
    "name" TEXT,
    "isActive" BOOLEAN NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL,
    "createdBy" TEXT,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "updatedBy" TEXT,

    CONSTRAINT "role_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "quando"."resouces" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "createdAr" TIMESTAMP(3) NOT NULL,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "description" TEXT,
    "updatedBy" TEXT,
    "createdBy" TEXT,

    CONSTRAINT "resouces_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "quando"."permisson" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "isActice" BOOLEAN NOT NULL,
    "resourceId" TEXT NOT NULL,
    "operationId" INTEGER,

    CONSTRAINT "permisson_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "quando"."operation" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL,
    "createdBy" TEXT,
    "updatedBy" TEXT,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "description" TEXT,

    CONSTRAINT "operation_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "quando"."policy" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL,
    "createdBy" TEXT,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "updatedBy" TEXT,
    "isActive" BOOLEAN NOT NULL,

    CONSTRAINT "policy_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "quando"."role_policy" (
    "id" TEXT NOT NULL,
    "roleId" TEXT NOT NULL,
    "policyId" TEXT NOT NULL,
    "isActive" BOOLEAN NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL,
    "createdBy" TEXT,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "updatedBy" TEXT,

    CONSTRAINT "role_policy_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "passwordHistory_index_0" ON "quando"."passwordHistory"("userAuthId", "id");

-- AddForeignKey
ALTER TABLE "quando"."policy_permission" ADD CONSTRAINT "policy_permission_policyId_fkey" FOREIGN KEY ("policyId") REFERENCES "quando"."policy"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "quando"."policy_permission" ADD CONSTRAINT "policy_permission_permissionId_fkey" FOREIGN KEY ("permissionId") REFERENCES "quando"."permisson"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "quando"."passwordHistory" ADD CONSTRAINT "passwordHistory_userAuthId_fkey" FOREIGN KEY ("userAuthId") REFERENCES "quando"."userAuth"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "quando"."userAuth" ADD CONSTRAINT "userAuth_userId_fkey" FOREIGN KEY ("userId") REFERENCES "quando"."user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "quando"."userAuth" ADD CONSTRAINT "userAuth_roleId_fkey" FOREIGN KEY ("roleId") REFERENCES "quando"."role"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "quando"."permisson" ADD CONSTRAINT "permisson_resourceId_fkey" FOREIGN KEY ("resourceId") REFERENCES "quando"."resouces"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "quando"."permisson" ADD CONSTRAINT "permisson_operationId_fkey" FOREIGN KEY ("operationId") REFERENCES "quando"."operation"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "quando"."role_policy" ADD CONSTRAINT "role_policy_roleId_fkey" FOREIGN KEY ("roleId") REFERENCES "quando"."role"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "quando"."role_policy" ADD CONSTRAINT "role_policy_policyId_fkey" FOREIGN KEY ("policyId") REFERENCES "quando"."policy"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
