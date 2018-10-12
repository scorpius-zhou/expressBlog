var sequelize=require('./_db').sequelize();
var Comments = sequelize.import('./comment.js');
var Session = sequelize.import('./session.js');
var Tag = sequelize.import('./tag.js');

// 建立模型之间的关系
Session.hasMany(Comments, {foreignKey:'session_id', targetKey:'id', as:'SessComment'});
Session.belongsToMany(Tag, {through: 'sessTags', as:'SessTags'});
Tag.belongsToMany(Session, {through: 'sessTags', as:'SessTags'});

// 同步模型到数据库中
sequelize.sync();

exports.Tag = Tag;
exports.Session = Session;
exports.Comments = Comments;