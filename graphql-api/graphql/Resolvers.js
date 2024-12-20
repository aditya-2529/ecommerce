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
  addToCart: async ({userId,productId,total}) => {
    try{
      const user = await User.findById(userId);
      const product = await Product.findById(productId);
      const cart = await Cart.create({user,products:product,total})
      await cart.save();
      return cart;
    } catch (err) {
      console.error(err);
    }
  },
  getCart: async({userId}) => {
    try{
      const cart = await Cart.findOne({userId:userId});
      return cart;
    } catch(e) {
      console.log(e)
    }
  },
  placeOrder: async ({id}) => {
    try {
      const cart = await Cart.findById(id)
      return cart;
    } catch (err) {
      console.error(err);
    }
  },
  createCart: async() => {
    try{
      const cart = await Cart.create();
      await cart.save();
      return cart;
    } catch(e) {
      console.log(e)
    }
  },
  setCartToUser: async({id, cartId}) => {
    try{
      const user = await User.findByIdAndUpdate(id,{
        cartId
      });
      return user;
    } catch(e) {
      console.log(e);
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