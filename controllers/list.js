const List=require('../models/List').List;
const item=require('../models/List').item;
const _=require('lodash');
module.exports.getList =(req,res,next)=>{
    const list_name=_.capitalize(req.params.name);
    async function find(){return await List.findOne({name:list_name})}
    
    async function createList() { return await List.create({name:list_name})}
    find()
    .then(List=>{
        
        if(List){

            let myItems=List.items;
            for(let i=0;i<myItems.length;i++){
                myItems[i].curr_list=List.name;
            }
            res.render('list',{
                tasks:myItems,
                Listname:List.name,
                hasTask:List.items.length>0
            })
        }
        else{ 
            createList().then((List)=>{
                res.render('list',{
                    tasks:List.items,
                    Listname:List.name,
                    hasTask:List.items.length>0
                })
            })
            .catch((err)=>{console.log(err);})
             
        }
    })   
}
module.exports.addTask=(req, res, next)=>{
    const ListName = req.body.ListName;
    console.log(ListName)
    const task= req.body.task;
    async function find(){return await List.findOne({name:ListName})}
    async function createItem(){ return await item.create({name:task})}
    createItem()
    .then(item=>{
        find().then(curr_list=>{
            curr_list.items.push(item);
            return curr_list.save();
        })
        .then(()=>{
            res.redirect('/'+ListName);
        })
    })
}

module.exports.deleteTask=(req,res,next)=>{
    const myid=req.body.task_id;
    const ListName=req.body.ListName;
    async function deleteTask(){
    await List.findOneAndUpdate(
        {name:ListName},{$pull:{items:{_id:myid}}})
}
    deleteTask()
    .then(()=>{
        res.redirect('/'+ListName);
    })
    .catch(err=>{
        console.log(err);
    })
}
