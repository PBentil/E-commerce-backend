

export default  (sequelize, DataTypes) => {
    const Store = sequelize.define('Store', {
        name: DataTypes.STRING,
        description: DataTypes.STRING,
    })

    Store.associate = (models) => {
        Store.belongsTo(models.User, {as: 'owner', foreignKey: 'OwnerId'});
        Store.hasMany(models.Product)
    }
    return Store;

};