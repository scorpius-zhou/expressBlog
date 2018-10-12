module.exports = function (sequelize, DataTypes) {
	return sequelize.define('Tag', {
		id: { type:DataTypes.BIGINT(11), autoIncrement:true, primaryKey : true, unique : true},
		name: { type: DataTypes.STRING, allowNull: false, unique: true, comment:'标签内容' }
	},
	{
		timestamps: true,
		underscored: true,
    // paranoid: true,
		freezeTableName: true,
		tableName: 'tag',
		charset: 'utf8',
		collate: 'utf8_general_ci'
	});
}
