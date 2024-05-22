'use client'

import React from "react";
import {Formik, Form, Field, ErrorMessage} from 'formik';
import * as Yup from 'yup';
import styles from './styles.module.scss';
import {setContactFormData} from "@/data/loaders";

const ContactForm = () => {
    const initialValues = {
        name: '',
        email: '',
        message: '',
        document: null,
    };

    const validationSchema = Yup.object({
        name: Yup.string().required('Required'),
        email: Yup.string().email('Invalid email format').required('Required'),
        message: Yup.string().required('Required'),
    });

    const handleSubmit = async (values: any) => {

        await setContactFormData(values)

    };


    return (
        <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
        >
            {({setFieldValue}) => (
                <Form className={styles.form}>
                    <div className={styles.formGroup}>
                        <label htmlFor="name">Name</label>
                        <Field type="text" id="name" name="name"/>
                        <ErrorMessage name="name" component="div" className={styles.error}/>
                    </div>

                    <div className={styles.formGroup}>
                        <label htmlFor="email">Email</label>
                        <Field type="email" id="email" name="email"/>
                        <ErrorMessage name="email" component="div" className={styles.error}/>
                    </div>

                    <div className={styles.formGroup}>
                        <label htmlFor="message">Message</label>
                        <Field as="textarea" id="message" name="message"/>
                        <ErrorMessage name="message" component="div" className={styles.error}/>
                    </div>

                    <div className={styles.formGroup}>
                        <label htmlFor="document">File</label>
                        <input
                            type="file"
                            id="document"
                            name="document"
                            onChange={(event) => {
                                setFieldValue('document', event.currentTarget.files[0]);
                            }}
                        />
                        <ErrorMessage name="document" component="div" className={styles.error}/>
                    </div>

                    <button type="submit">Submit</button>
                </Form>
            )}
        </Formik>
    );
};

export default ContactForm;
