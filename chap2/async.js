const findAndSaveUser = async (User)=>{
    try{
        let user = await Users.find({});
        user.name = 'zero';
        user = await user.save();
        user = await Users.findOne({gender:'m'});
    }catch(error){
        console.log(error);
    }
}