import mongoose from "mongoose";

// mongoose.set('strictQuery', false);

// const connectToDb = async (req,res) => {
//     try {
//         await mongoose.connect(process.env.MONGO_URI)
//         .then((conn)=>{console.log(`connect to db : ${conn.connection.host}`)} , {
//             useNewUrlParser: true,
//             useUnifiedTopology: true,
//         });
//     } 
//     catch (error) {
//         console.log(error);
//         process.exit(1);
//     }
// }

// export default connectToDb; 

const connectToDb = async (req, res) => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log(`Connected to db: ${conn.connection.host}`);
    } catch (error) {
        console.error(error);
        process.exit(1);
    }
};

export default connectToDb;
