import { Button, Flex, Box } from "@chakra-ui/react";
import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";

import FormSelect from "../../components/formComponents/FormSelect";
import { IInterViewSettings } from "../../interface/forms";
import {
  interviewDurationOptions,
  interviewLanguageOptions,
  interviewModeOptions,
} from "./constants";

import { useData, initialValues } from "./DataProvider";

const InterviewDetailsForm: React.FC<{ handleTabChange: (index: number) => void }> = ({ handleTabChange }) => {

  const { state, setState } = useData() as {
    state: typeof initialValues;
    setState: React.Dispatch<React.SetStateAction<typeof initialValues>>;
  };

  const {
    errors,
    touched,
    handleSubmit,
    values,
    setFieldTouched,
    setFieldValue,
  } = useFormik<IInterViewSettings>({
    initialValues: {
      interviewMode: state.interviewSettings.interviewMode || "",
      interviewDuration: state.interviewSettings.interviewDuration || "",
      interviewLanguage: state.interviewSettings.interviewLanguage || "",
    },
    validationSchema: Yup.object().shape({
      interviewMode: Yup.string().required("Interview mode is required"),
      interviewDuration: Yup.string().required("Interview duration mode is required"),
      interviewLanguage: Yup.string().required("Interview language mode is required"),
    }),
    onSubmit: (values) => {
      console.log({ values });
      alert("Form successfully submitted");
    },
  });

  const updateContext = (fieldName: string, value: string | number) => {
    setState((prevState) => ({
      ...prevState,
      interviewSettings: {
        ...prevState.interviewSettings,
        [fieldName]: value,
      },
    }));
  };

  const handlePrevious = () => {
    handleTabChange(1);
  }

  return (
    <Box width="100%" as="form" onSubmit={handleSubmit as any}>
      <Box width="100%">
        <FormSelect
          label="Interview Mode"
          placeholder="Select interview mode"
          name="interviewMode"
          options={interviewModeOptions}
          onChange={(name: string, value: any) => {
            setFieldValue("interviewMode", value);
            updateContext("interviewMode", value);
          }}
          onBlur={setFieldTouched}
          value={values?.interviewMode}
          error={errors?.interviewMode}
          touched={touched?.interviewMode}
          wrapperProps={{ zIndex: "4" }}
        />
        <FormSelect
          label="Interview Duration"
          placeholder="Select interview duration"
          name="interviewDuration"
          options={interviewDurationOptions}
          onChange={(name: string, value: any) => {
            setFieldValue("interviewDuration", value);
            updateContext("interviewDuration", value);
          }}
          onBlur={setFieldTouched}
          value={values?.interviewDuration}
          error={errors?.interviewDuration}
          touched={touched?.interviewDuration}
          wrapperProps={{ zIndex: "3" }}
        />
        <FormSelect
          label="Job Location"
          name="interviewLanguage"
          placeholder="Select interview language"
          options={interviewLanguageOptions}
          onChange={(name: string, value: any) => {
            setFieldValue("interviewLanguage", value);
            updateContext("interviewLanguage", value);
          }}
          onBlur={setFieldTouched}
          error={errors.interviewLanguage}
          touched={touched.interviewLanguage}
          value={values.interviewLanguage}
          wrapperProps={{ zIndex: "2" }}
        />
        <Flex w="100%" justify="flex-end" mt="4rem" gap="20px">
          <Button colorScheme="gray" type="button" onClick={handlePrevious}>
            Previous
          </Button>
          <Button colorScheme="red" type="submit">
            Submit
          </Button>
        </Flex>
      </Box>
    </Box>
  );
};

export default InterviewDetailsForm;
