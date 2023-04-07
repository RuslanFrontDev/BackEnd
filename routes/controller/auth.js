const { sendJwtToClient } = require("../../helpers/authorization/tokenHelpers");
const User = require("../../modals/user");
const asyncErrorWrapper = require("express-async-handler");
const register = asyncErrorWrapper(async (req, res, next) => {
  const { name, number, about, checkbox, role } = req.body;

  const user = await User.create({
    name,
    email,
    password,
    role,
  });
  sendJwtToClient(user, res);
});
const getUser = (req,res,next)=>{
  res.json({
    success:true,
    data:{
      id:req.user.id,
      name:req.user.name
    }
  })
}
module.exports = {
  register,
  getUser
};
