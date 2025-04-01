export class ApiResponse {
    constructor(
        data=null,
        statusCode = 200,
        message = "success",
    ){
        this.statusCode = statusCode;
        this.message = message;
        this.data = data;
        this.success = Boolean(statusCode < 400);
    }
}