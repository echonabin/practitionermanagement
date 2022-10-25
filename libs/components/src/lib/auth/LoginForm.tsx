import { Formik, Form } from 'formik';
import { Oval } from 'react-loader-spinner';
import { Button, Alert } from '..';
import Input from '../Input/Input';
import {privateAgent} from '@practitionermanagement/store'

const LoginForm = () => {
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
        onSubmit={async(values, { setSubmitting }) => {
         const { email, password } = values;
         const res = await privateAgent.post()
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
