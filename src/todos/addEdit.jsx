import { useState } from 'react'
import { Formik, Form, Field } from 'formik'
import * as Yup from 'yup'
import { Modal, Toast, Button } from '../_components'
import { updateOrCreateActivity } from '../api'

const validationSchema = Yup.object().shape({
  title: Yup.string()
    .min(3, 'Minimum 3 symbols')
    .max(50, 'Maximum 50 symbols')
    .required('Title is required'),
  email: Yup.string()
    .email('Wrong email format')
    .min(3, 'Minimum 3 symbols')
    .max(50, 'Maximum 50 symbols')
    .required('Email is required'),
})

let AddEdit = ({ detail, show, setShow, onSubmit }) => {
  const initialValues = {
    email: 'reja@gmail.com',
    title: detail?.title || '',
  }
  const [loadingSave, setLoadingSave] = useState(false)
  const handleSubmit = (value) => {
    setLoadingSave(true)
    updateOrCreateActivity(value, detail?.id)
      .then(({ data: { title } }) => {
        setLoadingSave(false)
        setShow(false)
        onSubmit(value)
        Toast({
          type: 'success',
          message: `${title} successfully ${detail?.id ? 'updated' : 'created'}`,
        })
      })
      .catch(() => {
        setLoadingSave(false)
      })
  }
  return (
    <Modal
      size='sm'
      show={show}
      setShow={setShow}
      title={`${detail?.id ? 'Edit' : 'Add'} Activity`}
      loading={false}
      footer={false}
    >
      <div className='row w-100'>
        <div className='col-12 p-0'>
          <Formik
            validationSchema={validationSchema}
            initialValues={initialValues}
            onSubmit={handleSubmit}
            validateOnMount
          >
            {({ errors, isValid }) => {
              return (
                <Form autoComplete='off' noValidate>
                  <div className='row'>
                    <div className='col-12 mb-3'>
                      <label className='fw-bold mb-1 required'>Email</label>
                      <Field
                        type='text'
                        readOnly
                        className={`form-control form-control-solid`}
                        name='email'
                        placeholder='Enter Email'
                        autoComplete='off'
                      />
                    </div>
                    <div className='col-12 mb-3'>
                      <label className='fw-bold mb-1 required'>Title</label>
                      <Field
                        type='text'
                        className={`form-control form-control-solid`}
                        name='title'
                        placeholder='Enter Title'
                      />
                      {errors?.title && <div className='fs-9 text-danger'>{errors?.title}</div>}
                    </div>
                  </div>
                  <div className='row'>
                    <div className='col-12 mb-3'>
                      <div className='separator border-gray-300' />
                    </div>
                    <div className='col-md-6'>
                      <Button
                        text='Cancel'
                        theme='light'
                        className='text-dark w-100 align-items-center'
                        icon={false}
                        iconClass='fs-5'
                        dir='left'
                        onClick={() => setShow(false)}
                      />
                    </div>
                    <div className='col-md-6'>
                      <Button
                        type='submit'
                        text='Save'
                        theme='primary'
                        className='w-100 text-white'
                        loading={loadingSave}
                        disabled={!isValid}
                      />
                    </div>
                  </div>
                </Form>
              )
            }}
          </Formik>
        </div>
      </div>
    </Modal>
  )
}

export { AddEdit }
