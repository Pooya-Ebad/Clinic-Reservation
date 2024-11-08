namespace NodeJS{
    interface ProcessEnv{
        //DB
        DB_NAME : string
        DB_PORT : number
        DB_HOST : string
        DB_USERNAME : string
        DB_PASSWORD : string
        //APPLICATION
        PORT : number
        //S3
        S3_SECRET_KEY : string
        S3_ACCESS_KEY : string
        S3_ENDPOINT : string
        S3_BUCKET_NAME : string
        //jwt
        ACCESS_TOKEN_SECRET : string
        REFRESH_TOKEN_SECRET : string
    }
}