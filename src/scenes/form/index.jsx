import { Box, Button, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import axios from 'axios';

const Form = () => { 
  const [data, setData] = useState([]); // Initialize state as an empty array

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await axios.get('http://localhost:3000');
        setData(response.data); // Update the state with the fetched data
        console.log(response.data); // Log the fetched data
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    getData(); // Call the getData function to fetch data when the component mounts
  }, []);

  const [values, setValues] = useState({ rs: "", usd: "" });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    const rsAmount = parseFloat(value); // Parse the input value to a float
    const usdAmount = rsAmount * 0.014; // Convert Rs to USD
    setValues({ ...values, [name]: value, usd: usdAmount.toFixed(2) }); // Update both Rs and USD values
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    try {
      // Calculate new balance
      const newBalance = parseFloat(data[0].balance) + parseFloat(values.rs);
console.log(newBalance);
      // Send a POST request to update the database with the new balance
      const response = await axios.post('http://localhost:3000/updatebalance', { balance: newBalance });

      console.log(response);
      // Update the local state with the new balance
      //setData([{ ...data[0].balance, balance: newBalance }]);
    } catch (error) {
      console.error('Error updating balance:', error);
    }
  };

  return (
    <Box m="20px" display="flex" flexDirection="column" alignItems="center">
      <Box mb={2}>
        {/* Display the balance above the text fields */}
        {data && data.length > 0 && (
          <p style={{ fontSize: '24px', fontWeight: 'bold' }}>Your Balance: {data[0].balance}</p>
        )}
      </Box>

      <form style={{ width: "100%" }} onSubmit={handleFormSubmit}>
        <Box display="flex" justifyContent="space-between" width="100%" mb={2}>
          <TextField
            fullWidth
            variant="filled"
            type="number"
            label="Amount in Rs"
            name="rs"
            value={values.rs}
            onChange={handleInputChange}
          />
          <TextField
            fullWidth
            variant="filled"
            type="number"
            label="Amount in USD"
            name="usd"
            value={values.usd}
            disabled
          />
        </Box>
        <Button type="submit" color="secondary" variant="contained" fullWidth>
          Add Funds
        </Button>
      </form>
      {values.usd && (
        <Box mt="50px">
          <p>Equivalent Amount in USD: {values.usd}</p>
        </Box>
      )}
    </Box>
  );
};

export default Form;
