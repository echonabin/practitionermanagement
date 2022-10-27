import { useEffect, useState } from 'react';
import { Formik, Form } from 'formik';
import { Button, Alert, Loading } from '..';
import Input from '../Input/Input';
import { Oval } from 'react-loader-spinner';
import {
  privateAgent,
  usePractitionerData,
} from '@practitionermanagement/store';
import { toast } from 'react-toastify';
import { useRouter } from 'next/router';

const UpdatePractitionerForm = () => {
  const [loading, setLoading] = useState(true);
  const { setError, getSinglePractitioner, singlePractitioner } =
    usePractitionerData();

  const { id } = useRouter().query;
  useEffect(() => {
    if (id !== undefined) {
      const fetch = async () => {
        try {
          const res = await privateAgent.get(`/practitioner/${id}`);
          getSinglePractitioner(res.data.practitioner);
          res.status === 200 && setLoading(false);
        } catch (error) {
          console.log(error);
          toast('An error occured', {
            type: 'error',
          });
        }
      };
      fetch();
    }
  }, [id]);

  const {
    fullname,
    email,
    contact,
    dob,
    workingDays,
    startTime,
    endTime,
    address,
    profileImage,
  } = singlePractitioner;
  console.log(loading);

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <div>
          <Formik
            initialValues={{
              fullname,
              email,
              contact,
              dob,
              workingDays,
              startTime,
              endTime,
              address,
              profileImage,
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
              const notify = toast.loading('Loading...');
              const formData = new FormData();
              for (const key in values) {
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-ignore
                formData.append(key, values[key]);
              }

              try {
                await privateAgent.put(`/practitioner/${id}`, formData);
                toast.update(notify, {
                  render: 'Practitioner Updated',
                  autoClose: 4000,
                  type: 'success',
                  isLoading: false,
                });
                resetForm();
                setSubmitting(false);
              } catch (error: any) {
                console.log(error);
                toast.update(notify, {
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
                <Button
                  title={isSubmitting ? 'Updating Account' : 'Update Account'}
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
      )}
    </>
  );
};

export default UpdatePractitionerForm;
