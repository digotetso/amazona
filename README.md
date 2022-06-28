# MERN AMAZONA

# Here goes Lessons

1. Intro
2. Install tools
3. Create React App
4. Create git repo
5. Create products
    1. Create products array
    2. add product imaages
    3. render products
    4. style products

6. Add routing
    1. `npm install react-router-dom`
    2. create route for home screen
    3. create route for product screen 

7. Create node server
    1. `npm init` ---> create : > package.json
    2. `npm install express`
    3. `npm install nodemon --save-dev` --> for development only
    4. `"type" : "module"` --> to use Es6 (import/export) : > package.json
    5. `"start" : "nodemon server"` ---> to run server (`npm start`)  and monitor changes : > package.json

8. Fetch data from backend
    1. set proxy in package.json
    2. `npm install axios`
    3. use state hook
    4. use effect hook
    5. use reducer hook

9. Manage state by  useReducer hook
    1. define useReducer
    2. update fetchData func
    3. get state from useReducer
    4. `npm install use-reducer-logger --force`

10. Add React boostrap
    1. `npm install react-bootstrap bootstrap`
    2. `import 'bootstrap/dist/css/bootstrap.min.css'` --> index.css
    3. update App.js --> added Bootstrap Navbar
    4. `npm i react-router-bootstrap`

11. Add components  
    1. Add Product component
    2. Add Rating component
    3. use Rating component in Product component

12. Create Product details page
    1. Create product details component
    2. Create the product details url --> backend (`'/api/product/slug/:slug`), frontend--> `/api/product/slug/${slug}`

13. Create loading and massage component
    1. create loading component
    2. use Loading Component
    3. create a Massage Component
    4. create utils.js to define `getError` function 