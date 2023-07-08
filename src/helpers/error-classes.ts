class InvalidUserInput extends Error {
    status: number
    where: string

    constructor({ m, status = 400, w }: { m: string, status?: number, w: string }){
        super(m)

        this.name = 'InvalidUserInput'
        this.status = status
        this.where = w

        Error.captureStackTrace(this, this.constructor)
    }
}

class InvalidObjectId extends Error {
    status: number
    where: string

    constructor({ m, status = 400, w }: { m: string, status?: number, w: string }) {
        super(m)

        this.name = 'InvalidObjectId'
        this.status = status
        this.where = w

        Error.captureStackTrace(this, this.constructor)
    }
}

class CustomError extends Error {
    status: number
    where: string

    constructor({ m, status = 400, w }: { m: string, status?: number, w: string }) {
        super(m)

        this.name = 'CustomError'
        this.status = status
        this.where = w

        Error.captureStackTrace(this, this.constructor)
    }
}

export {
    InvalidUserInput, InvalidObjectId, CustomError
}