const mongoose=require("mongoose");
const postschema=new mongoose.Schema({
    title:{
        type:String,
        required:true,
    },
    image: {
        type: String, 
        required: false,
    },
    description: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    tags: {
        type: String,
        required: false,
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: false,
        validate: {
            validator: function (v) {
                return mongoose.Types.ObjectId.isValid(v);
            },
            message: props => `${props.value} is not a valid user ID!`
        },
    },
});
postschema.pre('find', function () {
    this.populate('user', 'username email');
});

module.exports = mongoose.model('Post', postschema);