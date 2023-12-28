const express=require("express")
const cors=require("cors");
const RegisterStudioRoutes=require("./routes/RegisterStudioRoutes/Routes.js")
require("./db/config.js")
const AuthRoutes=require("./routes/AuthRoutes/AuthenticationRoutes.js")
const AdminAuthRoutes=require("./routes/AdminRoutes/AdminAuthRoutes.js")
const AdminRoutes=require("./routes/AdminRoutes/AdminRoutes.js")
const path=require("path");
const fs=require("fs")
let dotenv=require("dotenv");

// create a node app
const app=express();

// set the port 
const PORT=process.env.PORT||8000;

// set the all middleware
app.use(cors());
app.use(express.urlencoded({extended:false}));
app.use(express.json());
dotenv.config();


// set the app routes
app.use("/pixel/register",RegisterStudioRoutes)
app.use("/pixel",AuthRoutes)
app.use("/pixel/admin",AdminAuthRoutes)
app.use("/pixel/admin",AdminRoutes)


// ssr code
// const serverRenderer = (req, res, next) => {
//   fs.readFile(path.resolve('./build/index.html'), 'utf8', (err, data) => {
//     if (err) {
//       console.error(err)
//       return res.status(500).send('An error occurred')
//     }
//     return res.send(
//       data.replace(
//         '<div id="root"></div>',
//         `<div id="root">${ReactDOMServer.renderToString(<App />)}</div>`
//       )
//     )
//   })
// }


// app.use('^/$', serverRenderer)

// app.use(
//   express.static(path.resolve(__dirname, '..', 'build'), { maxAge: '30d' })
// )


app.listen(PORT,()=>{
  console.log(`app is running on port ${PORT}`)
})