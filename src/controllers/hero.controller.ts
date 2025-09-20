import { HeroService } from "@/services/hero.service";
import { BaseController } from "./base.controller";
import { uuid } from "zod";
import { NextFunction, Request, Response } from "express";



export class HeroController extends BaseController {

    constructor(private heroService: HeroService) {
        super()
    }

    createHero(req: Request, res: Response, next: NextFunction) {
        console.log(this)
        try {
            this.handleRequest(req, res, next, async () => {
                const { id } = req.body as Hero
                if (id) {

                }
                // const heroCreated = await this.heroService.createHero(req.body);
                return {
                    message: "Tạo thành công",
                    data: req.body
                }
            })
        } catch (error) {
            throw error
        }
    }





}