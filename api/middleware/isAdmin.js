const mongoose = require('mongoose');
const User = mongoose.model('User');

module.exports = async (user_email) => {
    const user = await User.findOne({email: user_email})
    //console.log(user);
    if(user.role == `admin`){
        return true;
    }else{
        return false;
    }
}