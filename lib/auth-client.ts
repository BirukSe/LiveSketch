import { createAuthClient } from "better-auth/react"
export const {signIn, signUp, useSession} = createAuthClient({
    baseURL: "http://localhost:3001" // the base url of your auth server
})