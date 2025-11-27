import { HttpStatus } from "@nestjs/common";
export declare class ErrorManager extends Error {
    readonly type: keyof typeof HttpStatus;
    readonly customMessage: string;
    constructor(type: keyof typeof HttpStatus, customMessage: string);
    static handle(error: unknown): never;
}
