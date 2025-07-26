


export const validationGraph = async({schema,inputs={}}={})=>{
    
      
        const validationResult = schema.validate(inputs,{abortEarly:false})

        if (validationResult.error) {
            throw new Error (JSON.stringify({
                message:'validation Error',
                details:validationResult.error.details
            })
                
            )
           
        }

        return true


        
}