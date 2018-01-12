const path = require("path");
const { WebpackWarPlugin } = require("webpack-war-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const {DefinePlugin} = require("webpack");

/*global  __dirname:*/
var DIST_DIR = path.resolve(__dirname, "dist");
var SOURCE_DIR = path.resolve(__dirname, "src");

module.exports = env => {
  //console.log("NODE_ENV: ", env.NODE_ENV);

  const __sevice_host_local = JSON.stringify("http://localhost:7304/");
  const __service_host_dev = JSON.stringify("https://ltapp110.bmwgroup.net:26240/");
  const __service_resource_list = JSON.stringify("reference_calculator/admin/configuration/list");
  const __service_resource_get = JSON.stringify("reference_calculator/admin/configuration/get");
  const __service_resource_write = JSON.stringify("reference_calculator/admin/configuration/update");

  function getServiceHost(){
    if (! env || env.production){
      return null; //use the window.href
    } else {
      if (env.NODE_ENV == "local"){
        return __sevice_host_local;
      } if (env.NODE_ENV == "dev") {
        return __service_host_dev;
      }else {
        return null;
      }
    }
  }

  return {
  entry: SOURCE_DIR + "/app/index.js",
  output: {
    path: DIST_DIR,
    filename: "app/bundle.js",
    publicPath: "/app/"
  },
  module:{
    rules:[
      {
        test:/\.js$/,
        include: SOURCE_DIR,
        exclude: /node_modules/,
        use:{
          loader:"babel-loader"
        }
      }      
    ]
  },
  plugins: [
    new CopyWebpackPlugin([{ 
          from: SOURCE_DIR +"/index.html", 
          to: DIST_DIR +"/index.html" 
      },
      { 
        from: SOURCE_DIR +"/react-treeview.css", 
        to: DIST_DIR +"/react-treeview.css" 
      }
    ]),
/*    new WebpackWarPlugin({
      archiveName: 'reference_calculator_admin',
      webInf: './web-inf'
    }),*/
    new DefinePlugin({
      SERVICE_HOST: getServiceHost(),
      SERVICE_RESOURCE_LIST: __service_resource_list,
      SERVICE_RESOURCE_GET: __service_resource_get,
      SERVICE_RESOURCE_WRITE: __service_resource_write
    })        
  ],   
  devServer:{
    contentBase: path.join(__dirname, "dist"),
    compress: false,
    port: 9000
  },  
};};