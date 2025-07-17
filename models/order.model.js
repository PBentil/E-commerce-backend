export default (sequelize, DataTypes) => {
    const Order = sequelize.define('Order', {
        totalAmount: {
            type: DataTypes.FLOAT,
            allowNull: false,
        },
        status: {
            type: DataTypes.STRING,
            defaultValue: 'pending',
            validate: {
                isIn: [['pending', 'paid', 'shipped', 'delivered', 'canceled']],
            },
        },
    });

    Order.associate = (models) => {
        Order.belongsTo(models.User);
        Order.hasMany(models.OrderItem);
    };

    return Order;
};
