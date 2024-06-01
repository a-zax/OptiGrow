import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AllocationItem from './AllocationItem';
import { Box, Button, TextField } from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";
import Header from "../../components/Header";


const Dashboard = () => {
  const [allocations, setAllocations] = useState([]);
  const [fundsToAdd, setFundsToAdd] = useState('');

  useEffect(() => {
    const fetchAllocations = async () => {
      try {
        const response = await axios.get('/api/allocations');
        setAllocations(response.data.topAllocations);
      } catch (error) {
        console.error('Error fetching allocations:', error);
      }
    };

    fetchAllocations();
  }, []);

  const handleAddFunds = async () => {
    try {
      // Replace '/api/addFunds' with the actual API endpoint to add funds
      const response = await axios.post('/api/addFunds', { amount: fundsToAdd });
      // Handle response, e.g., refresh allocations or show a success message
      console.log(response.data);
    } catch (error) {
      console.error('Error adding funds:', error);
    }
    
    const Form = () => {
    const isNonMobile = useMediaQuery("(min-width:600px)");

    const handleFormSubmit = (values) => {
        console.log(values);
    };

    return (
    <Box m="20px">
      <Header title="CREATE USER" subtitle="Create a New User Profile" />

      <Formik
        onSubmit={handleFormSubmit}
        initialValues={initialValues}
        validationSchema={checkoutSchema}
      >
        {({
          values,
          errors,
          touched,
          handleBlur,
          handleChange,
          handleSubmit,
        }) => (
          <form onSubmit={handleSubmit}>
            <Box
              display="grid"
              gap="30px"
              gridTemplateColumns="repeat(4, minmax(0, 1fr))"
              sx={{
                "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
              }}
            >
              <TextField
                fullWidth
                variant="filled"
                type="number"
                label="Quantity"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.quantity}
                name="quantity"
                error={!!touched.quantity && !!errors.quantity}
                helperText={touched.quantity && errors.quantity}
                sx={{ gridColumn: "span 2" }}
              />
              <TextField
                fullWidth
                select
                variant="filled"
                label="Buy/Sell Option"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.buySellOption}
                name="buySellOption"
                error={!!touched.buySellOption && !!errors.buySellOption}
                helperText={touched.buySellOption && errors.buySellOption}
                sx={{ gridColumn: "span 2" }}
              >
              </TextField>
            </Box>
            <Box display="flex" justifyContent="end" mt="20px">
              <Button type="submit" color="secondary" variant="contained">
                Create New User
              </Button>
            </Box>
          </form>
        )}
      </Formik>
    </Box>
  )
            }
        };
    };
export default Dashboard;
