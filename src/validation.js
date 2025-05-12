import * as Yup from "yup";
import { fieldsConfig } from "./fields";

const types = {
  text: () => Yup.string(),
  textarea: () => Yup.string(),
  password: () => Yup.string(),
  select: () => Yup.string(),
  email: () => Yup.string().email("invalid email"),
  url: () => Yup.string().url("invalid url"),
  number: () => Yup.number().typeError("must be a number"),
  date: () => Yup.date().typeError("invalid date"),
  tel: () => Yup.string().matches(/^\+?[1-9]\d{1,14}$/, "Invalid phone number"),
};

const initValues = Object.fromEntries(
  fieldsConfig.map((field) => [field.name, ""])
);

const validationSchema = Yup.object(
  Object.fromEntries(
    fieldsConfig.map((field) => {
      const typeFn = types[field.type];

      let validator = typeFn();

      if (field.validation?.required) {
        validator = validator.required(`${field.label} is required bruv`);
      }
      if (field.validation?.min != null) {
        validator = validator.min(
          field.validation.min,
          `${field.label} must be at least ${field.validation.min}`
        );
      }
      if (field.validation?.max != null) {
        validator = validator.max(
          field.validation.max,
          `${field.label} must be at most ${field.validation.max}`
        );
      }
      if (field.validation?.pattern) {
        validator = validator.matches(
          field.validation.pattern,
          `${field.label} format is invalid`
        );
      }
      if (field.validation?.matchField) {
        validator = validator.oneOf(
          [Yup.ref(field.validation.matchField)],
          `${field.label} must match ${field.validation.matchField}`
        );
      }

      return [field.name, validator];
    })
  )
);

export { initValues, validationSchema };
