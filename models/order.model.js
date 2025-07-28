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
    }, {
        timestamps: true,
        tableName: "order",
    });

    Order.associate = (models) => {
        Order.belongsTo(models.User, {
            foreignKey: "userId",
            as: "user",
        });
        Order.hasMany(models.OrderItem, {
            foreignKey: "orderId",
            as: "items",
        });
    };

    return Order;
};
