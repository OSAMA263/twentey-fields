import { ErrorMessage, Field, Form, Formik } from "formik";
import "./App.css";
import { fieldsConfig } from "./fields";
import { initValues, validationSchema } from "./validation";

function App() {
  const handleSubmit = (vals) => {
    console.log("submitted vals:", vals);
    alert("form submitted! take a look at the console.");
  };

  return (
    <Formik
      initialValues={initValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      <Form className="form-container">
        {fieldsConfig.map((field) => (
          <div className="input-wrapper" key={field.name}>
            <label htmlFor={field.name}>
              {field.label}
              {field.validation.required && (
                <span style={{ color: "red" }}>*</span>
              )}
            </label>
            {/* inputs */}
            {field.type === "textarea" ? (
              <Field
                as="textarea"
                name={field.name}
                id={field.name}
                rows={5}
                // style={{ width: "100%" }}
              ></Field>
            ) : field.type === "select" ? (
              <Field as="select" name={field.name} id={field.name}>
                <option value="">ur gender...</option>
                {field.options.map((opt) => (
                  <option key={opt} value={opt}>
                    {opt}
                  </option>
                ))}
              </Field>
            ) : (
              <Field
                as="input"
                id={field.name}
                name={field.name}
                type={field.type}
              />
            )}
            <ErrorMessage
              name={field.name}
              component="small"
              style={{ color: "#ce1339", marginTop: "10px" }}
            />
          </div>
        ))}
        <button className="submit-btn" type="submit">
          submit
        </button>
      </Form>
    </Formik>
  );
}

export default App;
