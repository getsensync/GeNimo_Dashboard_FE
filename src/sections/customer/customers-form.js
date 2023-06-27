import PropTypes from 'prop-types';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import {
  Box,
  Button,
  Stack,
  TextField,
  InputLabel,
  FormControl,
  Select,
  MenuItem,
  Typography
} from '@mui/material';

export const CustomersForm = (props) => {
  const {
    isFormOpen,
    setIsFormOpen,
    formData,
    setFormData,
  } = props;
  
  const formik = useFormik({
    initialValues: {
      uuid: '',
      name: '',
      dob: new Date(0),
      balance: '',
      type: '',
    },
    validationSchema: Yup.object({
      // uuid is a string with 8 characters
      uuid: Yup
        .string()
        .length(8)
        .required('UUID is required'),
      // name is a string with 1-255 characters
      name: Yup
        .string()
        .min(1)
        .max(255)
        .required('Name is required'),
      // dob is a date and > 0
      // 1/1/1940 as a Date object is new Date(0)
      dob: Yup
        .date('Must be a valid date')
        .min(new Date(1), 'Must be after 1/1/1970')
        .max(new Date(), 'Must be before today')
        .required('Date of birth is required'),
      // balance is a number
      balance: Yup
        .number('Must be a number')
        .required('Balance is required'),
      // type is a select with 3 options
      type: Yup
        .string()
        .oneOf(['AES', 'DES', '3DES'])
        .required('Type is required'),
    }),
    onChange: (event) => {
      setFormData({
        ...formData,
        [event.target.name]: event.target.value,
      });
    },
    onSubmit: async (values, helpers) => {
      try {
        // axios here
        if (isFormOpen.editOrAdd === 'edit') {
          const uuid = isFormOpen.uuid;
          // edit
        } else if (isFormOpen.editOrAdd === 'add') {
          // add
        }
        console.log(values);
        helpers.setStatus({ success: true });
        helpers.setSubmitting(false);
        resetForm();
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
    setIsFormOpen({ status: false, editOrAdd: '', uuid: '' });
    setFormData({
      uuid: '',
      name: '',
      dob: new Date(0),
      balance: '',
      type: '',
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
                New User
              </Typography>              
            </Stack>            
            <form
              noValidate
              onSubmit={formik.handleSubmit}
            >
              <Stack spacing={3}>
                {/* form for uuid, name, dob, balance, type */}
                <TextField
                  error={!!(formik.touched.uuid && formik.errors.uuid)}
                  fullWidth
                  helperText={formik.touched.uuid && formik.errors.uuid}
                  label="UUID"
                  name="uuid"
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  type="uuid"
                  value={formik.values.uuid}
                  required
                />
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
                  error={!!(formik.touched.dob && formik.errors.dob)}
                  fullWidth
                  helperText={formik.touched.dob && formik.errors.dob}
                  label="Date of birth"
                  name="dob"
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  type="date"
                  value={formik.values.dob}
                  required
                />
                <TextField
                  error={!!(formik.touched.balance && formik.errors.balance)}
                  fullWidth
                  helperText={formik.touched.balance && formik.errors.balance}
                  label="Balance"
                  name="balance"
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  type="number"
                  value={formik.values.balance}
                  required
                />
                {/* type is a select with 3 options */}
                <FormControl
                  fullWidth
                  required
                >
                  <InputLabel id="type">Encryption</InputLabel>
                  <Select
                    labelId="type"
                    error={!!(formik.touched.type && formik.errors.type)}
                    fullWidth
                    helperText={formik.touched.type && formik.errors.type}
                    label="Type"
                    name="type"
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    value={formik.values.type}
                  >
                    <MenuItem value="AES">AES</MenuItem>
                    <MenuItem value="DES">DES</MenuItem>
                    <MenuItem value="3DES">3DES</MenuItem>
                  </Select>
                </FormControl>
                
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

CustomersForm.propTypes = {
  isFormOpen: PropTypes.object.isRequired,
  setIsFormOpen: PropTypes.func.isRequired,
  formData: PropTypes.object.isRequired,
  setFormData: PropTypes.func.isRequired,
};
