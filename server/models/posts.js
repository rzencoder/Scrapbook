'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Post = new Schema({
		title: {
							type: String
						},
		username: {
								type: String,
		 						required: true
							},
		imageUrl: {
								type: String,
								required: true
		 					},
		likes: {
								type : Number,
								default: 0
						}
});

module.exports = mongoose.model('Post', Post);
