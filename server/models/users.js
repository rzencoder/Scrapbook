'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var User = new Schema({
		username: { type: String,
								required: true,
								unique: true
							}
});

module.exports = mongoose.model('User', User);
