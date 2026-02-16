
const validation = (schema)=>{
    return (req, res, nxt)=>{
        const data = {...req.body , ...req.query , ...req.params};
        const result = schema.validate(data , {abortEarly:false});
        if(result.error){
            return nxt(result.error)
        }
        return nxt()
    }
}
export default validation;