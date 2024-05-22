'use client'

import React, { useRef } from 'react'
import { Formik, Form, Field, ErrorMessage, FormikHelpers } from 'formik'
import * as Yup from 'yup'
import { setContactFormData } from '@/data/loaders'

import styles from './styles.module.scss'

interface FormValues {
  name: string
  email: string
  message: string
  document: File | null
}

const ContactForm = () => {
  const fileInputRef = useRef(null)

  const initialValues: FormValues = {
    name: '',
    email: '',
    message: '',
    document: null,
  }

  const validationSchema = Yup.object({
    name: Yup.string().required('Required'),
    email: Yup.string().email('Invalid email format').required('Required'),
    message: Yup.string().required('Required'),
  })

  const handleFileInputClick = () => {
    fileInputRef.current.click()
  }

  const handleSubmit = async (
    values: FormValues,
    { resetForm }: FormikHelpers<FormValues>
  ) => {
    await setContactFormData(values)
    resetForm() // Сброс формы после успешной отправки
  }

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {({ setFieldValue, touched, errors }) => (
        <Form className={styles.contactForm}>
          <div className={styles.formGroup}>
            <label htmlFor="name">_name</label>
            <Field
              type="text"
              id="name"
              name="name"
              className={`${touched.name && errors.name ? styles.fieldError : ''}`}
            />
            <ErrorMessage
              name="name"
              component="div"
              className={styles.errorMessage}
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="email">_email</label>
            <Field
              type="email"
              id="email"
              name="email"
              className={`${touched.email && errors.email ? styles.fieldError : ''}`}
            />
            <ErrorMessage
              name="email"
              component="div"
              className={styles.errorMessage}
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="message">_message</label>
            <Field
              as="textarea"
              id="message"
              name="message"
              className={`${touched.message && errors.message ? styles.fieldError : ''}`}
            />
            <ErrorMessage
              name="message"
              component="div"
              className={styles.errorMessage}
            />
          </div>
          <input
            type="file"
            id="document"
            name="document"
            ref={fileInputRef}
            style={{ display: 'none' }}
            onChange={(event) => {
              setFieldValue('document', event.currentTarget.files[0])
            }}
          />
          <div className={styles.actions}>
            <button
              className={styles.addFileButton}
              type="button"
              onClick={handleFileInputClick}
            >
              File
            </button>
            <button className={styles.submitButton} type="submit">
              Submit
            </button>
          </div>
        </Form>
      )}
    </Formik>
  )
}

export default ContactForm
