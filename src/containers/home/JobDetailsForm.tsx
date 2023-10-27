import { Button, Flex, Box } from "@chakra-ui/react";
import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";

import FormInput from "../../components/formComponents/FormInput";
import { IJobDetails } from "../../interface/forms";

import { useData, initialValues } from "./DataProvider";


const JobDetailsForm: React.FC<{ handleTabChange: (index: number) => void }> = ({ handleTabChange }) => {

  const { state, setState } = useData() as {
    state: typeof initialValues;
    setState: React.Dispatch<React.SetStateAction<typeof initialValues>>;
  };

  const { handleChange, errors, touched, handleBlur, handleSubmit, values } =
    useFormik<IJobDetails>({
      initialValues: {
        jobTitle: state.jobDetails.jobTitle || "",
        jobDetails: state.jobDetails.jobDetails || "",
        jobLocation: state.jobDetails.jobLocation || "",
      },
      validationSchema: Yup.object().shape({
        jobTitle: Yup.string().required("Job Title is required"),
        jobDetails: Yup.string().required("Job Details is required"),
        jobLocation: Yup.string().required("Job Location is required"),
      }),
      onSubmit: (values) => {
        //  Go to Next Step
        console.log({ values });
        handleTabChange(2);
      },
    });

  const handlePrevious = () => {
    handleTabChange(0);
  }

  const updateContext = (fieldName: string, value: string | number) => {
    setState((prevState) => ({
      ...prevState,
      jobDetails: {
        ...prevState.jobDetails,
        [fieldName]: value,
      },
    }));
  };

  return (
    <Box width="100%" as="form" onSubmit={handleSubmit as any}>
      <Box width="100%">
        <FormInput
          label="Job Title"
          placeholder="Enter job title"
          name="jobTitle"
          onChange={(e) => {
            handleChange(e);
            updateContext("jobTitle", e.target.value);
          }}
          onBlur={handleBlur}
          value={values?.jobTitle}
          error={errors?.jobTitle}
          touched={touched?.jobTitle}
        />
        <FormInput
          label="Job Details"
          placeholder="Enter job details"
          name="jobDetails"
          onChange={(e) => {
            handleChange(e);
            updateContext("jobDetails", e.target.value);
          }}
          onBlur={handleBlur}
          value={values?.jobDetails}
          error={errors?.jobDetails}
          touched={touched?.jobDetails}
        />
        <FormInput
          label="Job Location"
          name="jobLocation"
          placeholder="Enter job location"
          onChange={(e) => {
            handleChange(e);
            updateContext("jobLocation", e.target.value);
          }}
          onBlur={handleBlur}
          error={errors.jobLocation}
          touched={touched.jobLocation}
          value={values.jobLocation}
        />
        <Flex w="100%" justify="flex-end" mt="4rem" gap="20px">
          <Button colorScheme="gray" type="button" onClick={handlePrevious}>
            Previous
          </Button>
          <Button colorScheme="red" type="submit">
            Next
          </Button>
        </Flex>
      </Box>
    </Box>
  );
};

export default JobDetailsForm;
