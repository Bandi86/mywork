import React from "react";
import { Formik, Form, Field } from "formik";
import "./../style/contact.css"

function Contact() {
  return (
    <>    
    <h1>Visszajelzését, vagy véleményét itt tudja nekünk elküldeni</h1>
    <div className="form-container-contact">
      <Formik
        initialValues={{ name: "", email: "", message: "", number: "" }}
        onSubmit={(values) => {
          
        }}
      >
        <Form className="form-contact">
          <div className="field">
            <label htmlFor="name" className="label">
              Name:
            </label>
            <Field type="text" name="name" className="input" />
          </div>
          <div className="field">
            <label htmlFor="email" className="label">
              Email:
            </label>
            <Field type="email" name="email" className="input" />
          </div>
          <div className="field">
            <label htmlFor="text" className="label">
              Phone Number:
            </label>
            <Field type="text" name="number" className="input" />
          </div>
          <div className="field">
            <label htmlFor="message" className="label">
              Message:
            </label>
            <Field as="textarea" name="message" className="input" id="textarea" />
          </div>
          <button type="submit" className="form-submit">Submit</button>
        </Form>
      </Formik>
    </div>
    </>
  );
}

export default Contact;
