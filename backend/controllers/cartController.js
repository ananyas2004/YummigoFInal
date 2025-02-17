import userModel from "../models/userModel.js"

// add to user cart  
const addToCart = async (req, res) => {
   try {
      let userData = await userModel.findOne({_id:req.body.userId});
      let cartData = await userData.cartData;
      if (!cartData[req.body.itemId]) {
         cartData[req.body.itemId] = 1;
      }
      else {
         cartData[req.body.itemId] += 1;
      }
      await userModel.findByIdAndUpdate(req.body.userId, {cartData});
      res.json({ success: true, message: "Added To Cart" });
   } catch (error) {
      console.log(error);
      res.json({ success: false, message: "Error" })
   }
}

// remove food from user cart
const removeFromCart = async (req, res) => {
   try {
      let userData = await userModel.findById(req.body.userId);
      let cartData = await userData.cartData;
      if (cartData[req.body.itemId] > 0) {
         cartData[req.body.itemId] -= 1;
      }
      await userModel.findByIdAndUpdate(req.body.userId, {cartData});
      res.json({ success: true, message: "Removed From Cart" });
   } catch (error) {
      console.log(error);
      res.json({ success: false, message: "Error" })
   }

}

// get user cart
const getCart = async (req, res) => {
    try {
        const user = await userModel.findById(req.body.userId);
        if (!user) {
            return res.status(404).json({ success: false, message: 'User not found' });
        }

        const cartData = user.cartData;
        if (!cartData) {
            return res.status(404).json({ success: false, message: 'Cart data not found' });
        }

        res.json({ success: true, cartData });
    } catch (error) {
        console.error('Error fetching cart data:', error);
        res.status(500).json({ success: false, message: 'Server error' });
    }
};

export { addToCart, removeFromCart, getCart }