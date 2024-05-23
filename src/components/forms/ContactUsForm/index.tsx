'use client'

import React, { useRef, useState } from 'react'
import { Formik, Form, Field, ErrorMessage, FormikHelpers } from 'formik'
import * as Yup from 'yup'

import Button from '../../ui/Button'
import { setContactFormData } from '@/data/loaders'

import styles from './styles.module.scss'

interface FormValues {
  name: string
  email: string
  message: string
  document: File | null
}

const ContactForm = () => {
  const fileInputRef = useRef<HTMLInputElement>(null)

  const [fileName, setFileName] = useState<string>('')
  const [isFetching, setIsFetching] = useState<boolean>(false)
  const [formStep, setFormStep] = useState<number>(1)

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
    if (fileInputRef.current) {
      fileInputRef.current.click()
    }
  }

  const handleSubmit = async (
    values: FormValues,
    { resetForm }: FormikHelpers<FormValues>
  ) => {
    setIsFetching(true)
    await setContactFormData(values)
    resetForm()
    setFileName('')
    setIsFetching(false)
    setFormStep(2)
  }

  return (
    <>
      {formStep === 1 && (
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
                  const files = event.currentTarget.files
                  if (files && files.length > 0) {
                    setFieldValue('document', files[0])
                    setFileName(files[0].name || '')
                  }
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
                  Send
                </Button>
              </div>
              {fileName && (
                <p className={styles.fileName}>Added file: {fileName}</p>
              )}
            </Form>
          )}
        </Formik>
      )}
      {formStep === 2 && (
        <div className={`${styles.contactForm} ${styles.successFormContainer}`}>
          <div className={styles.successForm}>
            <span className={styles.successFormTitle}>Thank you!</span>
            <p className={styles.successFormDescription}>
              Your message has been accepted. You will receive answer really
              soon!
            </p>
            <Button
              variant="yellow"
              onClick={() => setFormStep(1)}
              className={styles.backButton}
            >
              Send-new-message
            </Button>
          </div>
        </div>
      )}
    </>
  )
}

export default ContactForm
