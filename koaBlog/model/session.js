module.exports = function (sequelize, DataTypes) {
	return sequelize.define('Session', {
		id: { type:DataTypes.BIGINT(11), autoIncrement:true, primaryKey : true, unique : true},
		title: { type: DataTypes.STRING, allowNull: false, comment:'会话标题' },
		content: { type: DataTypes.STRING, allowNull: false, comment:'会话内容' }
	},
	{
		timestamps: true,
		underscored: true,
    // paranoid: true,
		freezeTableName: true,
		tableName: 'session',
		charset: 'utf8',
		collate: 'utf8_general_ci'
	});
}
