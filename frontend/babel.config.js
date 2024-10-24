const isProduction = process.env.NODE_ENV === "production";

const plugins = [];

// React hot reloading необходим только в режиме разработки
// if (!isProduction) {
//   plugins.push("react-refresh/babel");
// }

module.exports = {
  presets: ["@babel/preset-env", "@babel/preset-react"], // Добавляем в babel
  // пресет для работы с React
  plugins,
};
