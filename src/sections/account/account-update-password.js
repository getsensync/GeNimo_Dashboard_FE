import { useCallback, useState } from 'react';
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Divider,
  Stack,
  TextField,
  InputAdornment,
  IconButton,
  SvgIcon,
  Typography,
} from '@mui/material';
import EyeIcons from '@heroicons/react/24/solid/EyeIcon';
import EyeSlashIcon from '@heroicons/react/24/solid/EyeSlashIcon';

import axios from 'axios';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { serverUrl } from 'src/utils/backend-url';
import { useAuth } from 'src/hooks/use-auth';
import { toast } from 'react-toastify';

export const UpdatePassword = () => {
  const { user } = useAuth();

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const formik = useFormik({
    initialValues: {
      oldPassword: '',
      password: '',
      confirm: '',
      submit: null
    },
    validationSchema: Yup.object({
      oldPassword: Yup
        .string()
        .max(255)
        .required('Old password is required'),
      password: Yup
        .string()
        .max(255)
        .required('Password is required'),
      confirm: Yup
        .string()
        .max(255)
        .required('Confirm password is required')
    }),
    onSubmit: async (values, helpers) => {
      try {
        const data = {
          username: user?.username,
          old_password: values.oldPassword,
          new_password: values.password,
        };
        axios.patch(`${serverUrl}/credentials/changePassword`, data)
          .then((response) => {
            toast.success('Password changed successfully!');
          }
          ).catch((error) => {
            toast.error('Old password is incorrect. Failed to change password!');
          });
      } catch (err) {
        helpers.setStatus({ success: false });
        helpers.setErrors({ submit: err.message });
        helpers.setSubmitting(false);
        toast.error('Failed to change password!');
      }
    }
  });

  return (
    <form
      noValidate
      onSubmit={formik.handleSubmit}
    >
      <Card>
        <CardHeader
          subheader="Update password"
          title="Password"
          sx={{ py: 2 }}
        />
        <CardContent
          sx={{
            py: 0
          }}
        >
          <Stack
            spacing={2}
          >
            <TextField
              error={Boolean(formik.touched.oldPassword && formik.errors.oldPassword)}
              fullWidth
              helperText={formik.touched.oldPassword && formik.errors.oldPassword}
              label="Old Password"
              name="oldPassword"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              type='password'
              value={formik.values.oldPassword}
              variant="outlined"
            />
            <TextField
              error={Boolean(formik.touched.password && formik.errors.password)}
              fullWidth
              helperText={formik.touched.password && formik.errors.password}
              label="New Password"
              name="password"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              type={showPassword ? 'text' : 'password'}
              value={formik.values.password}
              variant="outlined"
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() => setShowPassword((prevState) => !prevState)}
                      edge="end"
                    >
                      <SvgIcon>
                        {showPassword ? <EyeSlashIcon /> : <EyeIcons />}
                      </SvgIcon>
                    </IconButton>
                  </InputAdornment>
                )
              }}
            />
            <TextField
              error={Boolean(formik.touched.confirm && formik.errors.confirm)}
              fullWidth
              helperText={formik.touched.confirm && formik.errors.confirm}
              label="Confirm New Password"
              name="confirm"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              type={showConfirmPassword ? 'text' : 'password'}
              value={formik.values.confirm}
              variant="outlined"
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() => setShowConfirmPassword((prevState) => !prevState)}
                      edge="end"
                    >
                      <SvgIcon>
                        {showConfirmPassword ? <EyeSlashIcon /> : <EyeIcons />}
                      </SvgIcon>
                    </IconButton>
                  </InputAdornment>
                )
              }}
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
        </CardContent>
        <CardActions sx={{ justifyContent: 'flex-end', mr: 2 }}>
          <Button
            variant="contained"
            color="secondary"
            type="submit"
            size="large"
          >
            Change
          </Button>
        </CardActions>
      </Card>
    </form>
  );
};
