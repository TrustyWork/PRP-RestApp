const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const restoSchema = {
	// _id will be created by Mongo

	name: {
		type: Schema.Types.String
	},

	city:{
		type: Schema.Types.String
	},

	coordinates:{
		lat: Schema.Types.Number,
		lon: Schema.Types.Number,
	},

	contacts: {
		phones:[
				{
					type: Schema.Types.ObjectId,
					ref: 'num'
				}
		],
		email: {
			type: Schema.Types.String
		},
		address:{
			type: Schema.Types.String
		}
	},

	workingHrs: {
		type: Schema.Types.String
	},

	description: {
		type: Schema.Types.String
	},

	cuisineType: {
		type: Schema.Types.ObjectId,
		ref: 'type'
	},

	createTime: {
		type: Schema.Types.Date,
		default: Date.now
	},

	modifyTime: {
		type: Schema.Types.Date,
		default: Date.now
	}

};


const Rest = new Schema(restoSchema);

restoSchema.statics.findByName = function(name, cb) {
	return this.find({name: new RegExp(name, 'i')}, cb)
};





module.exports = mongoose.model('Rest', Rest);
