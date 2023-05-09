const mongoose=require('../util/database');

const itemsSchema=new mongoose.Schema({
    name:{
        type:String,
        required: true
    }
})
const item=mongoose.model('item',itemsSchema);

const ListSchema=new mongoose.Schema({
    name:{
        type:String,
        required: true
    },
    items:[itemsSchema]
})
const list=mongoose.model('list',ListSchema)

module.exports.List=list;
module.exports.item=item;