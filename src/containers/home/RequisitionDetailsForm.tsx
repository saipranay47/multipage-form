import { Button, Flex, Box } from "@chakra-ui/react";
import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";

import FormInput from "../../components/formComponents/FormInput";
import FormSelect from "../../components/formComponents/FormSelect";
import { IRequisitionDetails } from "../../interface/forms";
import { genderOptions, urgencyOptions } from "./constants";

import { useData, initialValues } from "./DataProvider";

const RequisitionDetailsForm: React.FC<{ handleTabChange: (index: number) => void }> = ({ handleTabChange }) => {

  const { state, setState } = useData() as {
    state: typeof initialValues;
    setState: React.Dispatch<React.SetStateAction<typeof initialValues>>;
  };


  const {
    handleChange,
    errors,
    touched,
    handleBlur,
    handleSubmit,
    values,
    setFieldTouched,
    setFieldValue,
  } = useFormik<IRequisitionDetails>({
    initialValues: {
      requisitionTitle: state.requisitionDetails.requisitionTitle || "",
      noOfOpenings: state.requisitionDetails.noOfOpenings || 0,
      urgency: state.requisitionDetails.urgency || "",
      gender: state.requisitionDetails.gender || "",
    },
    validationSchema: Yup.object().shape({
      requisitionTitle: Yup.string().required("Requisition title is required"),
      noOfOpenings: Yup.number()
        .typeError("Enter a valid number")
        .required("Number of openings is required")
        .positive("Enter a valid number")
        .min(1, "Enter a valid number"),
      urgency: Yup.string().required("Urgency is required"),
      gender: Yup.string().required("Gender is required"),
    }),
    onSubmit: (values) => {
      //  Go to Next Step
      handleTabChange(1);
    },
  });

  const updateContext = (fieldName: string, value: string | number) => {
    setState((prevState) => ({
      ...prevState,
      requisitionDetails: {
        ...prevState.requisitionDetails,
        [fieldName]: value,
      },
    }));
  };

  return (
    <Box width="100%" as="form" onSubmit={handleSubmit as any}>
      <Box width="100%">
        <FormInput
          label="Requisition Title"
          placeholder="Enter requisition title"
          name="requisitionTitle"
          onChange={(e) => {
            handleChange(e);
            updateContext("requisitionTitle", e.target.value);
          }}
          onBlur={handleBlur}
          value={values?.requisitionTitle}
          error={errors?.requisitionTitle}
          touched={touched?.requisitionTitle}
        />
        <FormInput
          label="Number of openings"
          placeholder="Enter number of openings"
          name="noOfOpenings"
          onChange={(e) => {
            handleChange(e);
            updateContext("noOfOpenings", parseInt(e.target.value));
          }}
          onBlur={handleBlur}
          value={values?.noOfOpenings}
          error={errors?.noOfOpenings}
          touched={touched?.noOfOpenings}
        />
        <FormSelect
          label="Gender"
          name="gender"
          placeholder="Select gender"
          options={genderOptions}
          onChange={(name : string, value: any) => {
            setFieldValue("gender", value);
            updateContext("gender", value);
          }}
          onBlur={setFieldTouched}
          error={errors.gender}
          touched={touched.gender}
          value={values.gender}
          wrapperProps={{ zIndex: "3" }}
        />
        <FormSelect
          label="Urgency"
          name="urgency"
          placeholder="Select urgency"
          options={urgencyOptions}
          onChange={(name: string, value: any) => {
            setFieldValue("urgency", value);
            updateContext("urgency", value);
          }}
          onBlur={setFieldTouched}
          error={errors.urgency}
          touched={touched.urgency}
          value={values.urgency}
          wrapperProps={{ zIndex: "2" }}

        />
        <Flex w="100%" justify="flex-end" mt="4rem">
          <Button colorScheme="red" type="submit">
            Next
          </Button>
        </Flex>
      </Box>
    </Box>
  );
};

export default RequisitionDetailsForm;