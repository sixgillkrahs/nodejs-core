import { HeroService } from "@/services/hero.service";
import { NextFunction, Request, Response } from "express";
import { BaseController } from "./base.controller";
import { UploadService } from "@/services/upload.service";



export class UploadController extends BaseController {
    test = [1, 2, 3]
    constructor(private uploadService: UploadService) {
        super()
    }

    uploadFileLarge = (req: Request, res: Response, next: NextFunction) => {
        this.handleRequest(req, res, next, async () => {
            this.uploadService.uploadTrunk()
            this.test.push(Math.random())
            return {
                message: "Upload successful"
            }
        })
    }

    uploadFileLarge1 = (req: Request, res: Response, next: NextFunction) => {
        this.handleRequest(req, res, next, async () => {
            this.uploadService.uploadTrunk()
            this.test.push(Math.random())
            return {
                message: this.test
            }
        })
    }




}