import dotenv from 'dotenv';

// Set the NODE_ENV to 'development' by default
process.env.NODE_ENV = process.env.NODE_ENV || 'development';

const envFound = dotenv.config();

if (envFound.error) {
  // This error should crash whole process

  throw new Error("⚠️  Couldn't find .env file  ⚠️");
}

export default {
	/**
	 * Server port, Default is 3000
	 */
	port: process.env.PORT || 3000,
  
	/**
	 * Mongo DB connection URI.
	 */
	databaseURL: process.env.MONGODB_URI,
  
	/**
	 * Your secret sauce
	 */
	jwtSecret: process.env.JWT_SECRET,
	jwtExpiry: process.env.JWT_EXPIRY,
	SALT: process.env.SALT,

	/**
	 * API configs
	 */
	api: {
	  prefix: '/api',
	},
	/**
	 * Admin user creds
	 */
	adminEmail: 'admin@gmail.com',
	adminPassword: 'admin@123',

	/**
	 * User Type
	 */
	userType: {
		admin: 1,
		user: 2,
	}
};
