import { useEffect, useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import {
  getDetailActivity,
  getItems,
  setActiveItem,
  deleteItem,
  mockOptions as options,
  mockOrder as listOrder,
} from '../api'
import { AddEdit } from './addEdit'
import { AddEdit as EditTitle } from '../todos/addEdit'
import { Modal, Tooltip, Toast, Order } from '../_components'
import { orderBy } from 'lodash'
import qs from 'qs'

const EmptyData = ({ onClick }) => {
  return (
    <div
      className='d-flex align-items-center justify-content-center vh-60'
      data-cy='todo-empty-state'
    >
      <img
        className='w-300px opacity-25'
        src={require('../_images/nodata.svg').default}
        alt='img'
      />
      <div className='text-center position-relative'>
        {Array(3)
          .fill('')
          ?.map((m, index) => (
            <div
              key={index}
              className='d-flex align-items-center w-300px bg-white py-3 px-2 border rounded my-2'
            >
              <div className='same-10px bg-f5 radius-20 me-2' />
              <div className='h-10px w-100 bg-f5 radius-5' />
            </div>
          ))}
        <div
          className='btn d-flex align-items-center justify-content-center btn-primary same-50px radius-50 position-absolute top-0 end-0'
          style={{ margin: '-1rem' }}
          onClick={onClick}
        >
          <i className='las la-plus text-white fs-3' />
        </div>
        <p className='mb-0 mt-3 fs-7'>Buat List Item Kamu</p>
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

const Header = ({ onClick, title, onSort, detailActivity, setTitleActivity }) => {
  const navigate = useNavigate()
  const [showModalEdit, setShowModalEdit] = useState(false)
  return (
    <>
      <div className='col-12'>
        <div className='d-flex align-items-center justify-content-between py-3'>
          <h5
            className='d-flex align-items-center m-0 fw-bold pointer text-capitalize'
            onClick={() => navigate('/todo-list')}
            data-cy='todo-back-button'
          >
            <i className='las la-angle-left me-1 fs-4' />
            <span data-cy='todo-title'>{title || 'Activity'}</span>
            <i
              className='las la-pencil-alt ms-3 fs-4'
              data-cy='todo-title-edit-button'
              onClick={(e) => {
                e.stopPropagation()
                setShowModalEdit(true)
              }}
            />
          </h5>
          <div className='ms-auto me-3'>
            <Order options={listOrder} onChange={onSort} />
          </div>
          <div
            className='btn btn-primary radius-50 fs-8 text-white'
            data-cy='todo-add-button'
            onClick={onClick}
          >
            + Tambah
          </div>
        </div>
      </div>
      {/*MODAL EDIT TITLE*/}
      <EditTitle
        show={showModalEdit}
        setShow={setShowModalEdit}
        onSubmit={setTitleActivity}
        detail={detailActivity}
      />
    </>
  )
}

const Card = ({ detail, onEdit, onDelete }) => {
  const { title } = detail || {}
  const { color } = options?.find(({ value }) => value === detail?.priority) || {}
  const [cardHover, setCardHover] = useState(false)
  const [checked, setChecked] = useState(false)
  useEffect(() => {
    setChecked(detail?.is_active === 0)
  }, [detail?.is_active])
  const setIsActive = (isActive) => {
    const is_active = isActive ? 0 : 1
    setActiveItem({ is_active }, detail?.id)
      .then(({ data: { title, is_active: active } }) => {
        Toast({
          type: 'success',
          message: `${title} successfully mark as ${active ? 'undone' : 'done'}`,
        })
      })
      .catch(() => {
        setChecked(!checked)
      })
  }
  return (
    <div
      className='card shadow-lg border-0'
      onMouseEnter={() => setCardHover(true)}
      onMouseLeave={() => setCardHover(false)}
    >
      <div className='card-body'>
        <div className='d-flex align-items-center'>
          <div className='form-check me-3' style={{ minHeight: 'unset' }}>
            <input
              className='form-check-input same-25px radius-50 pointer'
              data-cy='todo-item-checkbox'
              type='checkbox'
              checked={checked}
              onChange={({ target: { checked: isChecked } }) => {
                setChecked(isChecked)
                setIsActive(isChecked)
              }}
            />
          </div>
          <div className={`same-15px radius-10 me-2 bg-${color || 'purple'}`} />
          <h6 className='my-1 text-capitalize fw-bold'>
            {checked ? (
              <del>
                <em>{title}</em>
              </del>
            ) : (
              title
            )}
          </h6>
          <div className={`d-flex ms-auto opacity-${cardHover ? 1 : 0}`}>
            <Tooltip placement='top' title='Edit'>
              <div
                className='d-flex same-25px bg-light-warning btn-sm radius-10 p-1 ms-1 pointer'
                data-cy='todo-item-edit-button'
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
                data-cy='todo-item-delete-button'
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
      </div>
    </div>
  )
}

const Index = () => {
  const location = useLocation()
  const [data, setData] = useState([])
  const [detailActivity, setDetailActivity] = useState(undefined)
  const [detailTodo, setDetailTodo] = useState(undefined)
  const [reload, setReload] = useState(false)
  const [titleActivity, setTitleActivity] = useState(false)
  const [showModalAddEdit, setShowModalAddEdit] = useState(false)
  const [showModalDelete, setShowModalDelete] = useState(false)
  const [loadingBtn, setLoadingBtn] = useState(false)

  useEffect(() => {
    const { activity_group_id } = qs.parse(location?.search?.slice(1)) || {}
    getDetailActivity(activity_group_id).then(({ data }) => {
      setDetailActivity(data)
    })
  }, [location])

  useEffect(() => {
    detailActivity?.id &&
      getItems({ activity_group_id: detailActivity?.id }).then(({ data: { data } }) => {
        setData(data)
      })
  }, [detailActivity?.id, reload])

  const submitDelete = () => {
    setLoadingBtn(true)
    deleteItem(detailTodo?.id)
      .then(() => {
        setShowModalDelete(false)
        setLoadingBtn(false)
        setReload(!reload)
        Toast({
          type: 'success',
          message: `${detailTodo?.title} successfully deleted`,
        })
      })
      .catch(() => {
        setLoadingBtn(false)
      })
  }
  const onSort = (e) => {
    const { key, dir } = e || {}
    setData(
      orderBy(data, (o) => (typeof o[key] === 'string' ? o[key]?.toLowerCase() : o[key]), dir)
    )
  }
  return (
    <>
      <div className='row'>
        <Header
          title={titleActivity || detailActivity?.title}
          detailActivity={detailActivity}
          onClick={() => {
            setDetailTodo(undefined)
            setShowModalAddEdit(true)
          }}
          onSort={onSort}
          setTitleActivity={(e) => setTitleActivity(e?.title)}
        />
        <div className='col-12 mt-4'>
          {data?.length ? (
            <div className='row'>
              {data?.map((detail, index) => (
                <div className='col-12 my-2' key={index}>
                  <Card
                    detail={detail}
                    onEdit={() => {
                      setDetailTodo(detail)
                      setShowModalAddEdit(true)
                    }}
                    onDelete={() => {
                      setDetailTodo(detail)
                      setShowModalDelete(true)
                    }}
                  />
                </div>
              ))}
            </div>
          ) : (
            <EmptyData
              onClick={() => {
                setDetailTodo(undefined)
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
        detail={detailTodo}
        detailActivity={detailActivity}
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
        <div className='row w-100' data-cy='todo-modal-delete'>
          <div className='col my-3'>
            Are you sure want to delete
            <span className='fw-bold text-capitalize'> "{detailTodo?.title}" </span>?
          </div>
        </div>
      </Modal>
    </>
  )
}
export default Index
