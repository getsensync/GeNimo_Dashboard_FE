import PropTypes from 'prop-types';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import {
  Box,
  Button,
  Stack,
  TextField,
  Typography
} from '@mui/material';

import { baseUrl } from 'src/utils/backend-url';
import axios from 'axios';

const addSpotUrl = baseUrl + "/management/spots/add";
const editUrl = baseUrl + "/management/spots/update/";

export const SpotsForm = (props) => {
  const {
    isFormOpen,
    setIsFormOpen,
    formData,
    setFormData,
  } = props;
  
  const formik = useFormik({
    initialValues: formData,
    validationSchema: Yup.object({
      name: Yup
        .string()
        .min(1)
        .max(255)
        .required('Name is required'),
      // price is a number
      price: Yup
        .number('Must be a number')
        .required('Price is required'),
    }),
    onChange: (event) => {
      setFormData({
        ...formData,
        [event.target.name]: event.target.value,
      });
    },
    onSubmit: async (values, helpers) => {
      try {
        // get all values to a variable
        const name = values.name;
        const price = values.price;
        const resultData = {
          name: name,
          price: price,
        };
        console.log(resultData);
        if (isFormOpen.editOrAdd === 'edit') {
          const id = isFormOpen.id;
          const editSpotUrl = editUrl + id;
          // edit using axios at editSpotUrl
          axios
            .patch(editSpotUrl, resultData)
            .then((response) => {
              console.log(response);
            })
            .catch((error) => {
              console.log(error);
            });
        } else if (isFormOpen.editOrAdd === 'add') {
          // add using axios at addSpotUrl
          axios
            .post(addSpotUrl, resultData)
            .then((response) => {
              console.log(response);
            })
            .catch((error) => {
              console.log(error);
            }
            );
        }
        helpers.setStatus({ success: true });
        helpers.setSubmitting(false);
        resetForm();
        // window.location.reload();
      } catch (err) {
        helpers.setStatus({ success: false });
        helpers.setErrors({ submit: err.message });
        helpers.setSubmitting(false);
      }
      
    }
  });

  const handleCancel = () => {
    resetForm();
  };

  const resetForm = () => {
    setIsFormOpen({ status: false, editOrAdd: null, id: null });
    setFormData({
      name: '',
      price: '',
      active: false,
    });
  };

  return (
      <Box
        sx={{
          backgroundColor: 'background.paper',
          flex: '1 1 auto',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1200,
          position: 'fixed',
          top: '-24px',
          left: 0,
          right: 0,
          bottom: 0,
          pl: '18.5%',
          overflow: 'auto',
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
        }}
      >
        <Box
          sx={{
            maxWidth: 1280,
            px: 3,
            py: '50px',
            mt: '50px',
            width: '80%',
            backgroundColor: 'background.paper',
          }}
        >
          <div>
            <Stack
              spacing={1}
              sx={{ mb: 3 }}
            >
              <Typography
                variant="h5"
                align="center"
              >
                New Spot
              </Typography>              
            </Stack>            
            <form
              noValidate
              onSubmit={formik.handleSubmit}
            >
              <Stack spacing={3}>
                {/* form for name, dob, price, type */}
                <TextField
                  error={!!(formik.touched.name && formik.errors.name)}
                  fullWidth
                  helperText={formik.touched.name && formik.errors.name}
                  label="Name"
                  name="name"
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  type="name"
                  value={formik.values.name}
                  required
                />
                <TextField
                  error={!!(formik.touched.price && formik.errors.price)}
                  fullWidth
                  helperText={formik.touched.price && formik.errors.price}
                  label="Price"
                  name="price"
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  type="number"
                  value={formik.values.price}
                  required
                />
              </Stack>
              {formik.errors.submit && (
                <Typography
                  color="error"
                  sx={{ mt: 3 }}
                  variant="body2"
                >
                  {formik.errors.submit}
                </Typography>
              )}
              {/* Stack 2 button as a row, such as Submit and Cancel */}
              <Stack
                direction="row"
                spacing={5}
                sx={{ mt: 7, mb: 5 }}
              >
                <Button
                  color="error"
                  disabled={formik.isSubmitting}
                  fullWidth
                  size="large"
                  variant="contained"
                  onClick={handleCancel}
                >
                  Cancel
                </Button>
                <Button
                  color="success"
                  disabled={formik.isSubmitting}  
                  fullWidth
                  size="large"
                  type="submit"
                  variant="contained"
                  onClick={formik.handleSubmit}
                >
                  Save
                </Button>
              </Stack>
            </form>
            
          </div>
        </Box>
      </Box>
  );
};

SpotsForm.propTypes = {
  isFormOpen: PropTypes.object.isRequired,
  setIsFormOpen: PropTypes.func.isRequired,
  formData: PropTypes.object.isRequired,
  setFormData: PropTypes.func.isRequired,
};
