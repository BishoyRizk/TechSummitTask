import { GraphQLID, GraphQLObjectType, GraphQLString } from "graphql";


export const userType =  new GraphQLObjectType({
    name:'userType',
    fields:{
        _id:{type:GraphQLID},
        username:{type:GraphQLString},
        email:{type:GraphQLString},
        password:{type:GraphQLString},
        photo:{type:GraphQLString},
        otp:{type:GraphQLString},
        otpExpire:{type:GraphQLString},
        changeCredentials:{type:GraphQLString}
    }
})