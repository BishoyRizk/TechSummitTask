import { GraphQLObjectType, GraphQLSchema } from "graphql";

import * as notes from './note/service/note.resolver.js'

export const schema = new GraphQLSchema({
    query: new GraphQLObjectType({
        name:'query',
        fields:{
            ...notes
        }
    })
})