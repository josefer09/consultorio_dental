// const Sequelize = require("sequelize").Sequelize;
// const userModel = require("../models/user");
// const catchAsync = require('../utils/catchAsync');
// const AppError = require('../utils/appError');


// export const compareTokens = async (userDataSession) => {
//     try {
//         const {email, token} = userDataSession;
//         const user = await userModel.findOne({where: {email}});
//         if (user) {
//             // Usuario encontrado en la db por el email
//             if(user.token == token) { // Se comparan los tokens
//                 return true; // Si son iguales
//             } else {
//                 return false;
//             }
//         } else {
//             console.log('No son iguales');
//         }
//     } catch (error) {
//         console.log(error);
//     }
// }