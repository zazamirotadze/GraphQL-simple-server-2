const { response } = require("express")
const express = require("express")
const { GraphQLSchema, GraphQLObjectType, GraphQLInt, GraphQLString, GraphQLList, GraphQLNonNull } = require("graphql")
const expressGraphql = require("express-graphql").graphqlHTTP
const   axios = require("axios")

const app = express()


const villageType = new GraphQLObjectType({
    name: "villageType",
    fields:{
        id: {type: GraphQLInt  },
        name:{type:  GraphQLString }
    }
})

const rootQuieryType = new GraphQLObjectType({
    name: "RootQuery",
    fields:{
        objectType:{
        type: new GraphQLList(villageType) ,
        resolve: () => axios.get(`http://localhost:3000/villages`)
            .then(res =>  res.data)
        }
    }
    
})

const mutation = new GraphQLObjectType({
    name: "Mutation",
    fields:{
        addVillage:{
            type: villageType ,
            args:{
                name:{type: new GraphQLNonNull( GraphQLString)  }
            },
            resolve: (parentValue, args) => axios.post(`http://localhost:3000/villages`, args)
                .then(res =>  res.data)
        },
        deleteVillage:{
            type: villageType ,
            args:{
                id:{type: new GraphQLNonNull( GraphQLInt)  }
            },
            resolve: (parentValue, args) => axios.delete(`http://localhost:3000/villages/${args.id}`)
                .then(res =>  res.data)
        },
        editVillage:{
            type: villageType ,
            args:{
                id:{type: new GraphQLNonNull( GraphQLInt)  },
                name:{type: new GraphQLNonNull( GraphQLString)  }
            },
            resolve: (parentValue, {id, name}) => axios.patch(`http://localhost:3000/villages/${id}`, {name})
                .then(res =>  res.data)
        }
    }
    
})

const schema = new GraphQLSchema({
    query: rootQuieryType,
    mutation: mutation
})
module.exports = schema