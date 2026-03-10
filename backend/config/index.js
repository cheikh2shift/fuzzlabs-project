module.exports = {
  port: process.env.PORT || 3001,
  jwtSecret: process.env.JWT_SECRET || 'portfolio-secret-key-2026',
  jwtExpiresIn: '7d',
  uploadDir: 'uploads',
  maxFileSize: 5 * 1024 * 1024,
  allowedImageTypes: /jpeg|jpg|png|webp/,
  db: {
    host: process.env.DB_HOST || 'localhost',
    port: Number(process.env.DB_PORT || 5432),
    user: process.env.DB_USER || 'postgres',
    password: process.env.DB_PASSWORD || 'postgres',
    database: process.env.DB_NAME || 'portfolio'
  }
}
