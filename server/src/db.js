import pg from "pg";
const {Pool} = pg;

const pool = new Pool({
    user : "postgres",
    host : "localhost",
    database : "PixelPunch",
    password : "Postgres"
});