export class ApiResponse<T> {
    public success: boolean
    public data?:T
    public message?:string
    public statusCode:number

    constructor(statusCode:number, message?:string, data?:T) {
        
        this.message = message
        this.statusCode = statusCode
        this.success = true
        if(data) {
            this.data = data
        }
    }

}