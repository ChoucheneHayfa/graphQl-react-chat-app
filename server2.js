import { ApolloServer } from 'apollo-server-express'
import typeDefs from './typeDefs.js'
import resolvers from './resolvers.js';
import express from 'express';
import jwt from "jsonwebtoken"

import { useServer } from "graphql-ws/lib/use/ws"
import { makeExecutableSchema } from "@graphql-tools/schema"
import { WebSocketServer } from 'ws';
//initilize express 
const app = express()
//initiliza apollo server

const port = process.env.PORT || 4000

const context = ({ req }) => {
    const { authorization } = req.headers
    if (authorization) {
        const { userId } = jwt.verify(authorization, process.env.JWT_SECRET)
        return { userId }
    }

}

const schema = makeExecutableSchema({ typeDefs, resolvers })

const apolloServer = new ApolloServer({ schema, context })


//apply middelware
await apolloServer.start()
apolloServer.applyMiddleware({ app, path: "/graphql" });


const server = app.listen(port, () => {
    const wsServer = new WebSocketServer({
        server,
        path: '/graphql',

    })
    useServer({ schema }, wsServer)
    console.log("Apollo and subscription server is up")
})
