/**
 *
 * Author: Yizhong Chen
 * Date: Apr.28th.2018
 * Description: Connection with PostgreSQL and create the pool
 */

const { Pool, Client } = require('pg');

// pools will use environment variables for connection information
const pool = new Pool();

module.exports = pool;
