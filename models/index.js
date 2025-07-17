import { Sequelize, DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

import UserModel from './user.model.js';
import StoreModel from './store.model.js';
import ProductModel from './product.model.js';
import CategoryModel from './category.model.js';
import CartItemModel from './cartItem.model.js';
import OrderModel from './order.model.js';
import OrderItemModel from './orderItem.model.js';
import ReviewModel from './review.model.js';

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.User = UserModel(sequelize, DataTypes);
db.Store = StoreModel(sequelize, DataTypes);
db.Product = ProductModel(sequelize, DataTypes);
db.Category = CategoryModel(sequelize, DataTypes);
db.CartItem = CartItemModel(sequelize, DataTypes);
db.Order = OrderModel(sequelize, DataTypes);
db.OrderItem = OrderItemModel(sequelize, DataTypes);
db.Review = ReviewModel(sequelize, DataTypes);

Object.values(db).forEach((model) => {
    if (model.associate) {
        model.associate(db);
    }
});

export default db;
