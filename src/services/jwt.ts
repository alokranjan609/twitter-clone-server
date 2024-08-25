import JWT from "jsonwebtoken"
import { prismaClient } from "../clients/db";
import { User } from "@prisma/client"

const JWT_SECRET="@super11235"
class JWTServicetoken{
    public static async generateServiceToken(user:User)
    {
    //   const user=await prismaClient.user.findUnique({where:{id:userID}})
      const payload={
        id:user?.id,
        email:user?.email
      };
      const token=JWT.sign(payload,JWT_SECRET)
      return token;
    }
}

export default JWTServicetoken;