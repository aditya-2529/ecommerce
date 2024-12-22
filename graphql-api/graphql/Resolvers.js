const Order = require("../models/Order");
const Product = require("../models/Product");
const User = require("../models/User");
const Cart = require("../models/Cart")
const bycrypt = require('bcryptjs')

const resolvers = {
  register: async ({username, email, age, password}) => {
    try{
      console.log({username,email,age,password})
      const user = await User.create({username:username, email:email, age:age, password:password});
      await user.save();
      return user;
    } catch (err) {
      console.error(err);
    }
  },
  login: async ({email,password}) => {
    let token;
    try{
      const user = await User.findOne({email:email})
      if(user){
        const isMatch = await bycrypt.compare(password,user.password);
        token = await user.generateAuthToken();
        // console.log(token);
        // console.log(isMatch)
      }
      return user;
    }catch(e){
      console.log(e)
    }
  },
  addToCart: async ({id, userId,productId,total,productTotal}) => {
    try{
      const product = await Product.findById(productId);
      const cart = await Cart.findByIdAndUpdate(id,{$push:{userId:userId,products:[{product:product,productTotal}]},total})
      // await cart.save();
      return cart;
    } catch (err) {
      console.error(err);
    }
  },
  getCart: async({userId}) => {
    try{
      const cart = await Cart.findOne({user:userId});
      // console.log(cart)
      return cart;
    } catch(e) {
      console.log(e)
    }
  },
  placeOrder: async ({userId,name,total,createdAt,status}) => {
    try {
      const product = await Product.findOne({name:name});
      const order = await Order.create({userId:userId,products:product,total:total,createdAt:createdAt,status:status})
      await order.save();
      await User.findByIdAndUpdate(userId,{orders:order});
      return order;
    } catch (err) {
      console.error(err);
    }
  },
  orderNow: async({productId,userId,total,createdAt,status}) =>{
    try{
      const order = Order.create({productId,userId,total,createdAt,status})
      await order.save();
      return order;
    } catch (e) {
      console.log(e);
    }
  },
  createCart: async({userId}) => {
    try{
      const cart = await Cart.create({user:userId});
      await cart.save();
      return cart;
    } catch(e) {
      console.log(e)
    }
  },
  createProduct: async ({name, description,price,category,stock,imageUrl}) => {
    try{
      const product = await Product.create({name, description,price,category,stock,imageUrl});
      await product.save();
      return product;
    } catch (err) {
      console.error(err);
    }
  },
  getUser: async ({ id }) => {
    try {
      const user = await User.findById(id);
      return user;
    } catch (err) {
      throw new Error("Error retrieving user");
    }
  },
  getUsers: async () => {
    try {
      const users = await User.find();
      // console.log(users)
      return users;
    } catch (err) {
      throw new Error("Error retrieving users");
    }
  },
  getAllProduct: async () => {
    try {
      const products = await Product.find();
      return products;
    } catch (err) {
      throw new Error("Error retrieving products");
    }
  },
  getProductById: async ({id}) => {
    try{
      const product = await Product.findById(id);
      return product
    } catch (e){
      console.error(e);
    }
  },
  createUser: async ({ name, email, password }) => {
    try {
      const user = new User({ name, email, password });
      await user.save();
      return user;
    } catch (err) {
      throw new Error("Error creating user");
    }
  },
  updateUser: async ({ id, name, email, password }) => {
    try {
      const user = await User.findByIdAndUpdate(
        id,
        { name, email, password },
        { new: true }
      );
      return user;
    } catch (err) {
      throw new Error("Error updating user");
    }
  },
  deleteUser: async ({ id }) => {
    try {
      const user = await User.findByIdAndRemove(id);
      return user;
    } catch (err) {
      throw new Error("Error deleting user");
    }
  },
};

module.exports = resolvers;