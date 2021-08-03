# To run this project
1. cd to `shopping-portal/react`
2. run `npm i`
3. run `npm start`

## Site routes 
### Login page 
route: `'/'` <br/>
username: `admin`
password: `admin`
wrong login credential will trigger error message

### shopping page
Protected route: `/itemlist` <br/> 
- pulls data from Mongodb
- allows user to add items to cart
- display total of the cart includes subtotal, est shipping costs, est sale tax, and total
- a number next to shopping cart indicates number of items in cart 
- when click on shopping cart icon, app brings user to checkout page

### checkout page
protected route: `/checkout` <br/>
- data is from previous page shopping page
- allows user to update the quantity of each items
- allows user to remove item from cart
- number next to shopping bag icon indicates number of items in the cart 
- when click on shopping bag icon, app brings user back to shopping page
- when click on checkout button, app brings user to confirmation page

### confirmation page
protected route: `/confirmation`<br/>
- data is from checkout page
- allows user to print this page ( work in process) 
- allows user to ask for help (work in process)
- gives user an overview of the order summary, items ordered, and mocked up data of payment info

###known bug: <br/>
add items to cart -> checkout page -> go back to shopping page -> add item again, shopping cart is not updating(work in process)
add items to cart -> checkout page -> change item quantity -> go back to shopping page -> shopping is not reflecting correct cart numbers( work in progress)
