const express = require("express")
const { GraphQLSchema, GraphQLObjectType, GraphQLInt, GraphQLString, GraphQLList } = require("graphql")
const expressGraphql = require("express-graphql").graphqlHTTP
const schema = require("./schema/schema")
const app = express()


app.use("/", expressGraphql({
        graphiql:true,
        schema:schema
    })
)



app.listen(4000, console.log("server is running"))