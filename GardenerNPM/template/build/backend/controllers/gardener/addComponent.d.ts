import type { Request, Response } from "express";
interface AddComponentBody {
    path: string;
    component: string;
}
export declare function addComponent(req: Request<{}, {}, AddComponentBody>, res: Response): Promise<void>;
export {};
//# sourceMappingURL=addComponent.d.ts.map