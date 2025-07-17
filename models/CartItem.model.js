

export default (sequelize, DataTypes) => {
    const CartItem = sequelize.define('CartItem', {
        quantity: DataTypes.INTEGER,
    });

    CartItem.associate = (models) => {
        CartItem.belongsTo(models.User);
        CartItem.belongsTo(models.Product);
    };
    return CartItem;
}