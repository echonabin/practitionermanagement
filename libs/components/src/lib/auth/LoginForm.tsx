import { useRouter } from 'next/router';
import { toast } from 'react-toastify';
import { Formik, Form } from 'formik';
import { setCookie } from 'cookies-next';
import { Oval } from 'react-loader-spinner';
import { Button, Alert } from '..';
import Input from '../Input/Input';
import { privateAgent, useAuthData } from '@practitionermanagement/store';
import { API_ENDPOINTS } from '@practitionermanagement/constants';

const LoginForm = () => {
  const { host_url, base_url, auth } = API_ENDPOINTS;
  const { loginUser, setError, error } = useAuthData();
  const router = useRouter();
  console.log(error);
  return (
    <div>
      <Formik
        initialValues={{ email: '', password: '' }}
        validate={(values) => {
          const errors = {} as any;
          if (!values.email) {
            errors.email = 'Required';
          } else if (
            !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
          ) {
            errors.email = 'Invalid email address';
          }
          return errors;
        }}
        onSubmit={async (values, { setSubmitting }) => {
          const { email, password } = values;
          const id = toast.loading('Loading...');
          try {
            const res = await privateAgent.post(
              `${host_url}${base_url}${auth.login}`,
              { email, password }
            );
            toast.update(id, {
              render: 'Login Successful',
              autoClose: 4000,
              type: 'success',
              isLoading: false,
            });
            setSubmitting(false);
            setCookie('accessToken', res.data.jwtToken);
            setCookie('refreshToken', res.data.refreshToken.token);
            setCookie('userProfile', res.data.profileUrl);
            router.push('/dashboard');
            loginUser(res.data);
          } catch (error: any) {
            console.log(error);
            toast.update(id, {
              render:
                error.response.status === 400
                  ? error.response.data.errors[0].message
                  : error.message,
              autoClose: 4000,
              type: 'error',
              isLoading: false,
            });
            setError(error.response.data.message);
          }
        }}
      >
        {({ values, errors, touched, handleChange, isSubmitting }) => (
          <Form className="space-y-6">
            {errors.email && touched.email && (
              <Alert type="error" content={errors.email} />
            )}
            {errors.password && touched.password && (
              <Alert type="error" content={errors.password} />
            )}
            <Input
              label="Your Email"
              type="email"
              placeholder=""
              name="email"
              value={values.email}
              onChange={handleChange}
              className=""
            />
            <Input
              label="Your password"
              type="password"
              placeholder=""
              name="password"
              value={values.password}
              onChange={handleChange}
              className=""
            />
            <Button
              title={isSubmitting ? 'Logging in' : 'Login'}
              varient="primary"
              // eslint-disable-next-line @typescript-eslint/ban-ts-comment
              // @ts-ignore
              IconRight={isSubmitting ? Oval : null}
              className="w-full rounded-full py-3"
              type="submit"
            />
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default LoginForm;
