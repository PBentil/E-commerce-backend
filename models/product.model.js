
export default (sequelize, DataTypes) => {
    const Product = sequelize.define('Product', {
        name: DataTypes.STRING,
        description: DataTypes.STRING,
        image: DataTypes.STRING,
        price: DataTypes.DECIMAL,
        stock: DataTypes.INTEGER,
    })

    Product.associate = (models) => {
        Product.belongsTo(models.Store);
        Product.belongsTo(models.Category);
    };
    return Product;
}