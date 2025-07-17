

export default (sequelize, DataTypes) => {
    const Review = sequelize.define("Review", {
        rating: DataTypes.INTEGER,
        comment: DataTypes.STRING
    });

    Review.associate = (models) => {
        Review.belongsTo(models.User);
        Review.belongsTo(models.Product);
    };

    return Review;
};
