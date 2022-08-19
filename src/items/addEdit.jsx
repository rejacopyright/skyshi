import { useState } from 'react'
import { Formik, Form, Field } from 'formik'
import * as Yup from 'yup'
import { Modal, Toast, Button, Select } from '../_components'
import { updateOrCreateItem, mockOptions as options } from '../api'

const validationSchema = Yup.object().shape({
  title: Yup.string()
    .min(3, 'Minimum 3 symbols')
    .max(50, 'Maximum 50 symbols')
    .required('Title is required'),
  priority: Yup.string().required('Priority is required'),
})

let AddEdit = ({ detail, detailActivity, show, setShow, onSubmit }) => {
  const initialValues = {
    is_active: detail?.is_active !== undefined ? detail?.is_active : 1,
    title: detail?.title || '',
    priority: detail?.priority || 'very-high',
  }
  const [loadingSave, setLoadingSave] = useState(false)
  const handleSubmit = (value) => {
    setLoadingSave(true)
    let params = {}
    if (detail?.id) {
      params = value
    } else {
      params = {
        activity_group_id: detailActivity?.id,
        priority: value?.priority,
        title: value?.title,
      }
    }
    updateOrCreateItem(params, detail?.id)
      .then(({ data: { title } }) => {
        setLoadingSave(false)
        setShow(false)
        onSubmit(params)
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
      size='md'
      show={show}
      setShow={setShow}
      title={`${detail?.id ? 'Edit' : 'Add'} Todo`}
      loading={false}
      footer={false}
      scrollable={false}
    >
      <div className='row w-100' data-cy='modal-add'>
        <div className='col-12 p-0'>
          <Formik
            validationSchema={validationSchema}
            initialValues={initialValues}
            onSubmit={handleSubmit}
            validateOnMount
          >
            {({ errors, isValid, setFieldValue }) => {
              return (
                <Form autoComplete='off' noValidate>
                  <div className='row'>
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
                    <div className='col-md-6 mb-3'>
                      <label className='fw-bold mb-1 required'>Priority</label>
                      <Select
                        options={options}
                        defaultValue={detail?.priority}
                        onChange={(val) => {
                          setFieldValue('priority', val)
                        }}
                      />
                      {errors?.priority && (
                        <div className='fs-9 text-danger'>{errors?.priority}</div>
                      )}
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
