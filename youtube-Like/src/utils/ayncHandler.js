/*export const asyncHandler = (fn) => async (req,res,next)=>{
  try {
    await fn(req,res,next)
  } catch (error) {
    return res.status(error.code || 500).json({
        success: false,
        message: error.message
    })
  }
}
// what this actually is bts//

export const asyncHandler = function (fn)=>{
    return async function (req,res,next){
      then whatever you want to do
    }
    }
*/

export const asyncHandler = (requestHandler)=>{
   return (req,res,next)=>{
        Promise.resolve(requestHandler(req,res,next)).catch((err)=> next(err))
    }
}