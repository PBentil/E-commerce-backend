
export default (sequelize, DataTypes) => {
    const User = sequelize.define('User', {
        name: DataTypes.STRING,
        email: {
            type: DataTypes.STRING,
            unique: true,
            allowNull: false,
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        role: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                isIn: [['admin', 'user']],
            },
            defaultValue: 'user',
        },
        isVerified: {
            type: DataTypes.BOOLEAN,
            defaultValue: false,
        }
    })
    return User;
}