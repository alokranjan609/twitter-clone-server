import express from 'express'
import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import { prismaClient } from '../clients/db';
import {User} from "./user"
const bodyParser=require("body-parser")
const cors = require("cors");


export default async function initServer()
{
    const app=express();
    app.use(bodyParser.json())
    app.use(cors());
    const graphqlServer = new ApolloServer({
        typeDefs:`
        ${User.types}

        type Query {

         ${User.queries}

        }
         `,
        resolvers:{
          Query:{
            ...User.resolvers.queries
          }
        },
      });
      await graphqlServer.start();
      app.use('/graphql',expressMiddleware(graphqlServer));

      return app;
} 
