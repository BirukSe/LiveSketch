import { betterAuth } from "better-auth"
import { Pool } from "pg";
 
export const auth = betterAuth({
    database: new Pool({
        connectionString: process.env.CONNECTION_STRING, // Your Neon connection string directly here
        ssl: {
          rejectUnauthorized: false // Ensure SSL is enabled
        }
      }),
    //...other options
    emailAndPassword: {  
        enabled: true
    },
    socialProviders: { 
       google: { 
        clientId: process.env.GOOGLE_CLIENT_ID!, 
        clientSecret: process.env.GOOGLE_CLIENT_SECRET!, 
       } 
    }, 
});