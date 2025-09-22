import { singleton } from "@/decorators/singleton";
import { Prisma, PrismaClient } from "@prisma/client";


@singleton
export class ResourcesService {
    private prisma: PrismaClient;

    constructor() {
        this.prisma = new PrismaClient();
    }

    getResources = async (limit: number = 10, offset: number = 0, search?: string, sort: {
        field: string;
        order: 'asc' | 'desc';
    } = {
            field: 'id',
            order: 'asc',
        }, select?: Prisma.resourcesSelect) => {
        let whereCondition: Prisma.resourcesWhereInput = {};
        if (search) {
            whereCondition = {
                name: {
                    contains: search
                }
            }
        }
        const [items, total] = await Promise.all([
            this.prisma.resources.findMany({
                take: limit,
                skip: offset,
                orderBy: {
                    [sort.field]: sort.order,
                },
                select: select || {
                    id: true,
                    name: true,
                    description: true,
                }
            }),
            this.prisma.resources.count({
                where: whereCondition
            })
        ]);
        const hasNext = offset + limit < total;
        const hasPrev = offset > 0;
        const totalPages = Math.ceil(total / limit);
        const currentPage = Math.floor(offset / limit) + 1;
        return {
            permission: items,
            pagination: {
                hasNext,
                hasPrev,
                totalPages,
                currentPage,
                total,
            },
        };
    }

    getResourceById = async (id: string, select?: Prisma.resourcesSelect) => {
        return this.prisma.resources.findUnique({
            where: {
                id: id.toString(),
            },
            select: select || {
                id: true,
                name: true,
                description: true,
            }
        })
    }

}