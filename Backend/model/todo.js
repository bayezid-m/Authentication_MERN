const mongoose = require('mongoose')

const Todo = new mongoose.Schema(
	{
		text:{type:String,required:true},
        done:{type:String,required:true},
        email:{type:String, reqired:true},
		
	},
	{ collection: 'todo' }
)

const model = mongoose.model('todo', Todo)

module.exports = model