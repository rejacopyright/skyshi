import { useEffect, useState } from 'react'
import { useNavigate, createSearchParams } from 'react-router-dom'
import { getActivity, deleteActivity } from '../api'
import { AddEdit } from './addEdit'
import { Modal, Tooltip, Toast } from '../_components'
import moment from 'moment'

const EmptyData = ({ onClick }) => {
  return (
    <div
      className='d-flex align-items-center justify-content-center vh-60'
      data-cy='activity-empty-state'
    >
      <img
        className='w-300px opacity-25'
        src={require('../_images/nodata.svg').default}
        alt='img'
      />
      <div className='text-center'>
        <div className='d-flex align-items-center justify-content-center w-200px h-100px border border-4 border-f4 radius-10'>
          <div
            className='btn d-flex align-items-center justify-content-center btn-primary same-50px radius-50'
            onClick={onClick}
          >
            <i className='las la-plus text-white fs-3' />
          </div>
        </div>
        <p className='mb-0 mt-3 fs-7'>Buat Activity Pertamamu</p>
        <div className='d-flex justify-content-center mt-5'>
          {Array(3)
            .fill('')
            ?.map((m, index) => (
              <div className='same-10px bg-ee radius-10 mx-1' key={index} />
            ))}
        </div>
      </div>
    </div>
  )
}

const Header = ({ onClick }) => {
  return (
    <div className='col-12'>
      <div className='d-flex align-items-center justify-content-between py-3'>
        <h5 data-cy='activity-title' className='m-0 fw-bold'>
          Activity
        </h5>
        <div
          className='btn btn-primary radius-50 fs-8 text-white'
          data-cy='activity-add-button'
          onClick={onClick}
        >
          + Tambah
        </div>
      </div>
    </div>
  )
}

const Card = ({ detail, onEdit, onDelete, onView }) => {
  const { title, created_at } = detail || {}
  const [cardHover, setCardHover] = useState(false)
  return (
    <div
      className='card shadow-lg border-0 border-top border-primary'
      onMouseEnter={() => setCardHover(true)}
      onMouseLeave={() => setCardHover(false)}
    >
      <div data-cy='activity-item' className='card-body' onClick={onView}>
        <div className='d-flex align-items-center mb-3'>
          <h6 data-cy='activity-item-title' className='my-1 text-capitalize fw-bold'>
            {title}
          </h6>
          <div className={`d-flex opacity-${cardHover ? 1 : 0}`}>
            <Tooltip placement='top' title='View'>
              <div
                className='d-flex same-25px bg-light-primary btn-sm radius-10 p-1 ms-2 pointer'
                onClick={(e) => {
                  e.stopPropagation()
                  onView()
                }}
              >
                <i className='las la-eye fs-6 text-primary' />
              </div>
            </Tooltip>
            <Tooltip placement='top' title='Edit'>
              <div
                className='d-flex same-25px bg-light-warning btn-sm radius-10 p-1 ms-1 pointer'
                data-cy='activity-item-edit-button'
                onClick={(e) => {
                  e.stopPropagation()
                  onEdit()
                }}
              >
                <i className='las la-pen fs-6 text-warning' />
              </div>
            </Tooltip>
            <Tooltip placement='top' title='Delete'>
              <div
                className='d-flex same-25px bg-light-danger btn-sm radius-10 p-1 ms-1 pointer'
                data-cy='activity-item-delete-button'
                onClick={(e) => {
                  e.stopPropagation()
                  onDelete()
                }}
              >
                <i className='las la-trash fs-6 text-danger' />
              </div>
            </Tooltip>
          </div>
        </div>
        <p data-cy='activity-item-date' className='m-0 text-capitalize text-muted'>
          {moment(created_at).format('DD MMMM Y')}
        </p>
      </div>
    </div>
  )
}

const Index = () => {
  const navigate = useNavigate()
  const [data, setData] = useState([])
  const [detailActivity, setDetailActivity] = useState(undefined)
  const [reload, setReload] = useState(false)
  const [showModalAddEdit, setShowModalAddEdit] = useState(false)
  const [showModalDelete, setShowModalDelete] = useState(false)
  const [loadingBtn, setLoadingBtn] = useState(false)
  useEffect(() => {
    getActivity({ email: 'reja@gmail.com' })
      .then(({ data: { data } }) => {
        setData(data)
      })
      .catch(() => {
        setData([])
      })
  }, [reload])
  const submitDelete = () => {
    setLoadingBtn(true)
    deleteActivity(detailActivity?.id)
      .then(() => {
        setShowModalDelete(false)
        setLoadingBtn(false)
        setReload(!reload)
        Toast({
          type: 'success',
          message: `${detailActivity?.title} successfully deleted`,
        })
      })
      .catch(() => {
        setLoadingBtn(false)
      })
  }
  return (
    <>
      <div className='row'>
        <Header
          onClick={() => {
            setDetailActivity(undefined)
            setShowModalAddEdit(true)
          }}
        />
        <div className='col-12 mt-4'>
          {data?.length ? (
            <div className='row'>
              {data?.map((detail, index) => (
                <div className='col-md-4 col-xl-3 my-2' key={index}>
                  <Card
                    detail={detail}
                    onView={() => {
                      navigate({
                        pathname: '/todo-items',
                        search: createSearchParams({ activity_group_id: detail?.id }).toString(),
                      })
                    }}
                    onEdit={() => {
                      setDetailActivity(detail)
                      setShowModalAddEdit(true)
                    }}
                    onDelete={() => {
                      setDetailActivity(detail)
                      setShowModalDelete(true)
                    }}
                  />
                </div>
              ))}
            </div>
          ) : (
            <EmptyData
              onClick={() => {
                setDetailActivity(undefined)
                setShowModalAddEdit(true)
              }}
            />
          )}
        </div>
      </div>
      {/*MODAL ADD EDIT*/}
      <AddEdit
        show={showModalAddEdit}
        setShow={setShowModalAddEdit}
        onSubmit={() => setReload(!reload)}
        detail={detailActivity}
      />
      {/*MODAL DELETE*/}
      <Modal
        show={showModalDelete}
        setShow={setShowModalDelete}
        buttonText='Delete'
        title={detailActivity?.title}
        buttonIcon='trash'
        onSubmit={submitDelete}
        loading={loadingBtn}
      >
        <div className='row w-100' data-cy='activity-modal-delete'>
          <div className='col my-3'>
            Are you sure want to delete
            <span className='fw-bold text-capitalize'> "{detailActivity?.title}" </span>?
          </div>
        </div>
      </Modal>
    </>
  )
}
export default Index
