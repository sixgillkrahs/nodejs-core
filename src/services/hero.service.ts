import { logger } from "@/config/logger";
import { singleton } from "@/decorators/singleton";
import { PrismaClient, Hero } from "@prisma/client";
import uuid from 'uuid'


@singleton
export class HeroService {
    private prisma: PrismaClient;

    constructor() {
        this.prisma = new PrismaClient();
    }

    createHero(data: Hero) {
        try {
            return this.prisma.hero.create({
                data: data,
            })
        } catch (error) {
            throw error
        }
    }
}