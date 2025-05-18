const expess=require('express');
const app=expess();
const port=3000;
app.use(experr.json());
const employees=[
    {id:1,name:'John Doe',department:'Software Engineer'},
    {id:2,name:'Jane Smith',department:'Project Manager'},
    {id:3,name:'Sam Wilson',department:'Designer'}
];
app.get("/search",(req,res)=>{
    const query=req.query.q;
    if(!query){
        return res.status(400).json({error:'Query parameter is required'});
    };
    const lowerQuery=query.toLowerCase();
    const result = employees.filter(emp => emp.id == query || emp.name.toLowerCase().includes(lowerQuery));
    if(result.length===0){
        return res.status(404).json({message:'No employees found'});
    }
    res.json(result);
});
app.listen(port,()=>{
    console.log(`Server is running on http://localhost:${port}`);
});