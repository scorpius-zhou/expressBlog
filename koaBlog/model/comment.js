module.exports = function (sequelize, DataTypes) {
	return sequelize.define('Comment', {
		id: { type:DataTypes.BIGINT(11), autoIncrement:true, primaryKey : true, unique : true},
		sessionId: { type: DataTypes.BIGINT(11), field: 'session_id', allowNull: false, comment:'会话Id' },
		nickname: { type: DataTypes.STRING,  allowNull: true, comment:'昵称' },
		email: { type: DataTypes.STRING, allowNull: true, comment:'邮箱' },
		content: { type: DataTypes.STRING, allowNull: false, comment:'回复内容' }
	},
	{
		timestamps: true,
		underscored: true,
    // paranoid: true,
		freezeTableName: true,
		tableName: 'comment',
		charset: 'utf8',
		collate: 'utf8_general_ci'
	});
}
