import { useState } from 'react';
import { Formik, Form } from 'formik';
import { Button, Alert } from '..';
import Input from '../Input/Input';
import { Oval } from 'react-loader-spinner';
import {
  privateAgent,
  usePractitionerData,
} from '@practitionermanagement/store';
import { toast } from 'react-toastify';

const PractitionerForm = () => {
  const [image, setImage] = useState(null);
  console.log(image);
  const onImageChange = (event: any) => {
    if (event.target.files && event.target.files[0]) {
      setImage(event.target.files[0]);
      console.log(event.target.files[0]);
    }
  };

  const { registerPractitioner, setLoading, setError } = usePractitionerData();

  return (
    <div>
      <Formik
        initialValues={{
          fullname: '',
          email: '',
          contact: '',
          dob: '',
          workingDays: '',
          startTime: '',
          endTime: '',
          address: '',
          profileImage: '',
        }}
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
        onSubmit={async (values, { setSubmitting, resetForm }) => {
          const id = toast.loading('Loading...');
          const formData = new FormData();
          for (const key in values) {
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            formData.append(key, values[key]);
            formData.append('image', image!);
          }

          try {
            const res = await privateAgent.post('/practitioner', formData);
            toast.update(id, {
              render: 'Practitioner Added',
              autoClose: 4000,
              type: 'success',
              isLoading: false,
            });
            setLoading();
            resetForm();
            setSubmitting(false);
            registerPractitioner(res.data);
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
            setLoading();
            setError(error.response.data.message);
          }
        }}
      >
        {({ values, errors, touched, handleChange, isSubmitting }) => (
          <Form className="space-y-6">
            {errors.email && touched.email && (
              <Alert type="error" content={errors.email} />
            )}
            <div className="flex space-x-4 w-full">
              <Input
                label="Full Name"
                type="text"
                placeholder="John Doe"
                name="fullname"
                value={values.fullname}
                onChange={handleChange}
                className="w-full"
              />
              <Input
                label="Contact Number"
                type="number"
                placeholder="9812324567"
                name="contact"
                value={values.contact}
                onChange={handleChange}
                className="w-full"
              />
            </div>
            <Input
              label="Email"
              type="email"
              placeholder="example@example.com"
              name="email"
              value={values.email}
              onChange={handleChange}
              className=""
            />
            <div className="flex space-x-4 w-full">
              <Input
                label="Address"
                type="text"
                placeholder="Kathmandu, Nepal"
                name="address"
                value={values.address}
                onChange={handleChange}
                className="w-full"
              />
              <Input
                label="Date of Birth"
                type="date"
                placeholder="2021-01-01"
                name="dob"
                value={values.dob}
                onChange={handleChange}
                className="w-full"
              />
            </div>
            <div className="flex space-x-4 w-full">
              <Input
                label="Start Time"
                type="text"
                placeholder="9:00 AM"
                name="startTime"
                value={values.startTime}
                onChange={handleChange}
                className="w-full"
              />
              <Input
                label="End Time"
                type="text"
                placeholder="5:00 PM"
                name="endTime"
                value={values.endTime}
                onChange={handleChange}
                className="w-full"
              />
            </div>
            <Input
              label="Working Days"
              type="number"
              placeholder="28"
              name="workingDays"
              value={values.workingDays}
              onChange={handleChange}
              className="w-full"
            />
            <div className="flex flex-col">
              <label className="font-poppins font-thin text-base text-gray-500">
                Upload profile image
              </label>
              <input
                type="file"
                multiple={false}
                name="profileImage"
                placeholder="Profile Image"
                onChange={onImageChange}
                className="border-[1px] border-gray-300 rounded-lg px-4 py-2 mt-2"
              />
            </div>
            <Button
              title={isSubmitting ? 'Creating Account' : 'Create Account'}
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

export default PractitionerForm;
