export class ApiError extends Error {
    public statusCode: number
    public errors?: any[]
    public success: boolean
    constructor(statusCode:number, message:string, errors?:any[],stack?:string) {
        super(message)

        this.errors = errors
        this.statusCode = statusCode
        this.success = false
        if(stack ) {
            this.stack = stack
        }else {
            Error.captureStackTrace(this,this.constructor)
        }
    }

}