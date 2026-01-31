import { User } from "./users.model.js";
import { City } from "./city.model.js";
import { Branch } from "./branch.model.js";
import { CategoryProduct } from "./Category_product.model.js";
import { Menu } from "./menu.model.js";
import { Order } from "./order.model.js";
import { OrderItem } from "./orderitem.model.js";

// City -> Branch
City.hasMany(Branch , {foreignKey:'city_id', as:'branch'});
Branch.belongsTo(City , {foreignKey:'city_id', as:'city'});

// Category -> Menu
CategoryProduct.hasMany(Menu , {foreignKey:'category_id', as:'menu'});
Menu.belongsTo(CategoryProduct , {foreignKey:'category_id', as:'categoryProduct'});

// User -> Order
User.hasMany(Order , {foreignKey:"user_id" , as:'order'});
Order.belongsTo(User, {foreignKey:'user_id' , as:'user'});

// Branch -> Order
Branch.hasMany(Order , {foreignKey:'branch_id', as:'order'});
Order.belongsTo(Branch , {foreignKey:"branch_id", as:'branch'});

// Order -> OrderItem
Order.hasMany(OrderItem, { foreignKey: 'order_id', as: 'order_items' });
OrderItem.belongsTo(Order, { foreignKey: 'order_id', as: 'order' });


OrderItem.belongsTo(Menu , {foreignKey:'menu_id', as:"menu"});
Menu.hasMany(OrderItem, {foreignKey:'menu_id',as:'order_item'})

export {
    User,
    City,
    Branch,
    CategoryProduct,
    Menu,
    Order,
    OrderItem
}