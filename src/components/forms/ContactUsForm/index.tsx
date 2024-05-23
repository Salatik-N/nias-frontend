'use client'

import React, { useRef, useState } from 'react'
import { Formik, Form, Field, ErrorMessage, FormikHelpers } from 'formik'
import * as Yup from 'yup'
import { setContactFormData } from '@/data/loaders'
import Button from '../../ui/Button'

import styles from './styles.module.scss'

interface FormValues {
  name: string
  email: string
  message: string
  document: File | null
}

const ContactForm = () => {
  const fileInputRef = useRef(null)
  const [isFetching, setIsFetching] = useState(false)

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
    setIsFetching(true)
    await setContactFormData(values)
    resetForm()
    setIsFetching(false)
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
            <Button
              className={styles.addFileButton}
              variant="white"
              onClick={handleFileInputClick}
            >
              File
            </Button>
            <Button
              className={styles.submitButton}
              variant="yellow"
              type="submit"
              isLoading={isFetching}
            >
              Submit
            </Button>
          </div>
        </Form>
      )}
    </Formik>
  )
}

export default ContactForm
