import { GraphQLID, GraphQLInt, GraphQLNonNull, GraphQLString } from "graphql";
import { noteListResponse } from "../note.types.js";
import { authenticationGraphQl } from "../../../middleware/auth.graphq.js";
import { validationGraph } from "../../../middleware/validation.graph.js";
import { graphqlSchemeForNotes } from "../note.validation.js";
import {noteModel} from '../../../DB/model/note.model.js'

import * as dbService from '../../../DB/dbService.js'



// export const notes = {
//     type: noteListResponse,
//     args:{
//         title:{type:GraphQLString},
//         authorization:{type:new GraphQLNonNull(GraphQLString)}
//     },
//     resolve: async(parent,args)=>{
//         const {authorization,title} = args
       
//         const user = await authenticationGraphQl({authorization})
     
       
        
        

//         await validationGraph({schema:graphqlSchemeForNotes,inputs:{title}})

//         const notes = await dbService.findAll({
//             model:noteModel,
//             filter:{
//                 title,
//                 userId:user._id,
                
//             },
//             populate:[{path:'userId'}]
//         })


//         return {message:'Done',statusCode:200,data:notes}
//     }
// }


/**
 * @type {GraphQLObjectType}
 * @args
 * @param {GraphQLID} userId - The ID of the user whose notes will be fetched.
 * @param {GraphQLString} title - A title filter using partial regex match.
 * @param {GraphQLNonNull<GraphQLString>} authorization - The token used for authentication.
 * @param {GraphQLString} from - The start of the date range filter (ISO format).
 * @param {GraphQLString} to - The end of the date range filter (ISO format).
 * @param {GraphQLInt} [page=1] - (Optional) The page number to fetch.
 * @param {GraphQLInt} [limit=5] - (Optional) Number of results per page.
 */


export const notes = {
  type: noteListResponse,
  args: {
    userId: { type: GraphQLID },
    title: { type: GraphQLString },
    authorization: { type: new GraphQLNonNull(GraphQLString) },
    from: { type: GraphQLString }, // تاريخ بداية للفترة
    to: { type: GraphQLString },   // تاريخ نهاية للفترة
    page: { type: GraphQLInt },
    limit: { type: GraphQLInt },
  },
  resolve: async (parent, args) => {
    const { authorization, userId, title, from, to, page = 1, limit = 5 } = args;

    const user = await authenticationGraphQl({ authorization })
    if (!user) throw new Error("Unauthorized")

      
      
      if (user._id.toString() != userId.toString() ) {
        throw new Error("wrong userId")
      }

    await validationGraph({
      schema: graphqlSchemeForNotes,
      inputs: { title, userId, from, to, page, limit }
    });

  
    const filter = { userId:  user._id };
    if (title) filter.title = { $regex: title, $options: 'i' }
   if (from || to) {
  filter.createdAt = {};
  if (from) filter.createdAt.$gte = new Date(from);
  if (to) {
    const endDate = new Date(to);
    endDate.setHours(23, 59, 59, 999);
    filter.createdAt.$lte = endDate;
  }
}

    const skip = (page - 1) * limit

    const notes = await dbService.findAll({
      model: noteModel,
      filter,
     
        limit,
        skip,
    
      populate: [{ path: 'userId' }]
    });

    return {
      message: 'Done',
      statusCode: 200,
      data: notes 
    };
  }
};