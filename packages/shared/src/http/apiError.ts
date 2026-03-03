export class ApiError extends Error {
    public readonly statusCode: number
    public readonly errors?: any[]
    public  readonly success: boolean
    public readonly isOperational: boolean
    
    constructor(statusCode:number, message:string, errors?:any[],stack?:string) {
        super(message)

        this.errors = errors
        this.statusCode = statusCode
        this.name="apiError"
        this.isOperational=true
        this.success = false
        if(stack ) {
            this.stack = stack
        }else {
            Error.captureStackTrace(this,this.constructor)
        }
    }

}