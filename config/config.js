module.exports = {
  mysql: {
    dialect: 'mysql',
    timezone: '+08:00',
    write: {
      user: process.env.MYSQL_WRITE_USERNAME,
      password: process.env.MYSQL_WRITE_PASSWORD,
      host: process.env.MYSQL_WRITE_HOSTNAME
    },
    read: {
      user: process.env.MYSQL_READ_USERNAME,
      password: process.env.MYSQL_READ_PASSWORD,
      host: process.env.MYSQL_READ_HOSTNAME
    }
  }
}
