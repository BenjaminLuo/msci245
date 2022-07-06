/*

MSci 245 - Test 1

********* This test contains 4 questions, listed below. ***********

Q1. Turn products list into a stateful list.
- DONE: I refactored the initial list and wrote "const [products, changeProduct] = React.useState(initialList);"

Q2. Create "inStock" stateful variable of type Boolean, and set it to true by default.
- DONE: const [inStock, setStock] = React.useState(true);

Q3. Using ternary operator for conditional rendering, display only those products that are in stock. 
    Use "inStock" stateful variable to perform conditional rendering.
- kind of done... used the terniary operator and passed in the state variable as a prop

Q4. Complete the function "handleDiscountedProducts" that toggles between two modes: "Show discounted products only" 
    and "Show all products", in response to the user checking/unckecking the checkbox "DiscountCheckBox".
- DONE
- Changed discounted items:         event.target.checked ? setText("Show all products") : setText("Show discounted products only")
- Filtered for discounted items:    changeProduct(products.filter(products => products.discount === true))


*/

import * as React from 'react';
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Checkbox from '@material-ui/core/Checkbox';

const App = () => {

  const initialList = [
    {
      id: 1,
      title: 'Gala apple',
      category: 'fruit',
      price: 1.20,
      discount: true,
      discountAmount: "20%",
      inStock: true
    },
    {
      id: 2,
      title: 'Green pepper',
      category: 'vegetable',
      price: 2.30,
      discount: true,
      discountAmount: "10%",
      inStock: false
    },
    {
      id: 3,
      title: 'Whole-wheat tortilla',
      category: 'bread',
      price: 3.20,
      discount: false,
      discountAmount: "20%",
      inStock: true
    },
    {
      id: 4,
      title: 'Sesame bagel',
      category: 'bread',
      price: 1.05,
      discount: true,
      discountAmount: "10%",
      inStock: false
    },
    {
      id: 5,
      title: 'Fruit yoghurt',
      category: 'dairy',
      price: 4.30,
      discount: false,
      discountAmount: "10%",
      inStock: true
    },
    {
      id: 6,
      title: 'Cheddar cheese',
      category: 'dairy',
      price: 5.00,
      discount: true,
      discountAmount: "10%",
      inStock: true
    },
  ];

  // Q1 - Stateful list
  const [products, changeProduct] = React.useState(initialList);
  const [inStock, setStock] = React.useState(true);

  const handleDiscountedProducts = (checked) => {
    if (checked) {
      changeProduct(products.filter(products => products.discount === true))
    } else {
      changeProduct(initialList)
    }
  }

  return (
    <Grid
      container
      spacing={1}
      style={{ maxWidth: '50%', margin: 20 }}
      direction="column"
      justify="flex-start"
      alignItems="stretch"
    >
      <Typography variant="h3" gutterBottom component="div">
        Online Grocery Store
      </Typography>

      <DiscountCheckBox
        onCheck={handleDiscountedProducts}
      />

      <List
        list={products}
        inStock={inStock}
      />

    </Grid>
  );
}


const DiscountCheckBox = ({ onCheck }) => {

  const [helperText, setText] = React.useState("Show discounted products only")

  const handleChange = (event) => {
    onCheck(event.target.checked);
    event.target.checked ? setText("Show all products") : setText("Show discounted products only")
  };

  return (
    <div>
      {helperText}
      <Checkbox
        onChange={handleChange}
      />
      <hr />
    </div>
  );
}

const List = ({ list, inStock }) => {
  return (
    <>
      {list.map((item) => {
        return (
          <>
            <Item
              item={item}
              inStock={inStock}
            />
          </>
        );
      })}
    </>
  )
}

const Item = ({ item, inStock }) => {

  return (

    <>
      {/* Terniary operator */}
      {item.inStock && inStock ?
        <Grid item>
          <p>
            <Typography variant="h6" gutterBottom component="div">
              {item.title}
            </Typography>
            <Typography variant="body1" gutterBottom component="div">
              {"Category: " + item.category}
            </Typography>
            <Typography variant="body1" gutterBottom component="div">
              {"Price: $" + item.price}
            </Typography>
            <Typography variant="body1" gutterBottom component="div">
              {"Discount: " + item.discount}
            </Typography>
            <Typography variant="body1" gutterBottom component="div">
              {"Discount Percentage: " + item.discountAmount}
            </Typography>
          </p>
        </Grid>
        : 
        ""
      }
    </>
  )
}


export default App;