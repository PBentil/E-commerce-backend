
export default (sequelize, DataTypes) => {
    const Category = sequelize.define('Category', {
        categoryName : DataTypes.STRING,
        slug : DataTypes.STRING,
    });
    Category.associate = (models) => {
        Category.hasMany(models.Product);
    };
    return Category;
}