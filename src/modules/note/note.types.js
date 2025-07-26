import { GraphQLID, GraphQLInt, GraphQLList, GraphQLObjectType, GraphQLString } from "graphql";
import { userType } from "../user/user.types.js";

export const noteType = new GraphQLObjectType({
    name:'noteType',
    fields:{
        _id:{type:GraphQLID},
        title:{type:GraphQLString,},
        content:{type:GraphQLString,},
        userId:{type:userType}
    }
})

export const noteList = new GraphQLList(noteType)


export const noteListResponse = new GraphQLObjectType({
    name:'Response',
    fields:{
        statusCode:{type:GraphQLInt},
        message:{type:GraphQLString},
        data:{type:noteList}
    }
})