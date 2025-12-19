// load express
const express = require('express');
// load handlebars
const exphbs = require('express-handlebars');

// instantiate express
const app = express();

// configure express to use handlebars as templating engine
app.engine(
  'hbs',
  exphbs.engine({
    extname: '.hbs',
    // use this layout by default - if you have different layout
    // for say home page - you can toggle this in your code
    defaultLayout: 'default',
    // set location of layouts
    layoutsDir: 'views/layouts',
    // set location of partials - header, footer, etc
    partialsDir: 'views/partials',
  })
);
// set the view engine to handlesbards
app.set('view engine', 'hbs');
// where to find all of the view
app.set('views',  'views');
// where to find static files - css, images, js
app.use(express.static('public'));

// SEO defaults middleware: default description and keywords
app.use((req, res, next) => {
  res.locals.defaultDescription = 'Browse our store for great products, offers and reliable service.';
  res.locals.defaultKeywords = 'store, products, shopping, deals';
  next();
});

// home page or home route
app.get('/', (req, res) => {

  // set active for navigation
  state={home:true}
  // set specifics for <head>
  head={
    title: "Home",
    description: "Welcome to our store — featured products and special offers.",
    keywords: "store, home, featured, offers"
  }
  // pass object to to render in "index"
  res.render('index', {state, head});
  // send this to terminal where node app is running
  console.log('home')

});

// contact route
app.get('/shop', (req, res) => {
    state={shop : true}
    head={
      title:"Shop",
      description: "Browse our full product catalog with categories and filters.",
      keywords: "shop, products, categories, filters"
    }
    res.render('shop', { state, head});
    console.log('shop')
  });

app.get('/about', (req, res) => {
    state={about : true}
    head={
      title:"About",
      description: "Learn about our story, values and team.",
      keywords: "about, company, team, values"
    }
    res.render('about', { state, head});
    console.log('about')
  });

app.get('/login', (req, res) => {
    head={
      title:"Login",
      description: "Sign in to access your account and orders.",
      keywords: "login, sign in, account"
    }
    res.render('login', { state, head});
    console.log('login')
  });

app.get('/userdetails', (req, res) => {
    head={
      title:"User Details",
      description: "Manage your profile, addresses and order history.",
      keywords: "profile, account, orders, addresses"
    }
    res.render('userdetails', { state, head});
    console.log('userdetails')
  });

app.get('/checkout', (req, res) => {
    head={
      title:"Checkout",
      description: "Secure checkout — review cart and complete your purchase.",
      keywords: "checkout, payment, cart"
    }
    res.render('checkout', { state, head});
    console.log('checkout')
  });
// Start the server
app.listen(3000, () => {
  console.log('Server is running on port 3000');
});