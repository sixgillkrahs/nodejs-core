import { logger } from "@/config/logger";
import { singleton } from "@/decorators/singleton";
import { PrismaClient } from "@prisma/client";
import uuid from 'uuid'


@singleton
export class HeroService {
    private prisma: PrismaClient;

    constructor() {
        this.prisma = new PrismaClient();
    }

    test() {
        return "hello"
    }
}