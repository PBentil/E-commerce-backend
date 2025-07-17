

export default (sequelize, DataTypes) => {
    const OrderItem = sequelize.define("OrderItem", {
        priceAtPurchase: DataTypes.FLOAT,
        quantity: DataTypes.INTEGER
    });

    OrderItem.associate = (models) => {
        OrderItem.belongsTo(models.Order);
        OrderItem.belongsTo(models.Product);
        OrderItem.belongsTo(models.Store);
    };

    return OrderItem;
};
