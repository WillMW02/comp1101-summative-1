/* eslint-disable no-unused-vars */
'use strict';

let dbm;
let type;
let seed;

/**
	* We receive the dbmigrate dependency from dbmigrate initially.
	* This enables us to not have to rely on NODE_PATH.
	*/
exports.setup = function(options, seedLink) {
	dbm = options.dbmigrate;
	type = dbm.dataType;
	seed = seedLink;
};

exports.up = function(db, callback) {
	db.createTable('reviews', {
		id: { 
			type: 'int', 
			primaryKey: true, 
			autoIncrement: true 
		},
		user_id: {
			type: 'int',
			foreignKey: {
				name: 'user_id_fk',
				table: 'users',
				rules: {
					onDelete: 'CASCADE',
					onUpdate: 'RESTRICT'
				},
				mapping: {
					user_id: 'id'
				}
			}
		},
		title: 'string',
		content: 'string',
		date: 'datetime'
	});
	
	callback();
};

exports.down = function(db, callback) {
	db.dropTable('reviews', callback);
};

exports._meta = {
	'version': 1
};
