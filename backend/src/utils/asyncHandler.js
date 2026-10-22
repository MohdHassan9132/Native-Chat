const asyncHandler = (fn)=>async (req,res,next)=>{
    try{
        return await fn(req,res,next)
    }catch(error){
        next(error)
    }
}
const socketAsyncHandler = (executionTarget) => {
    return async (socket, args) => {
        // Find if client provided a trailing acknowledgement function callback
        const hasAck = typeof args[args.length - 1] === "function";
        const ackCallback = hasAck ? args.pop() : null;

        try {
            const result = await executionTarget(socket, args);
            if (ackCallback) {
                ackCallback({ success: true, data: result });
            }
        } catch (error) {
            console.error("[Socket Error Intercepted]:", error);
            if (ackCallback) {
                ackCallback({
                    success: false,
                    error: error.message || "Internal Server Error",
                    status: error.statusCode || 500
                });
            }
        }
    };
};

export{asyncHandler,socketAsyncHandler}

