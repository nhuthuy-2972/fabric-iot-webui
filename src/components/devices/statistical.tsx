import * as React from 'react'
import { useStyletron } from 'baseui'
import { Button } from 'baseui/button'
import axios from 'axios'
import { useParams, useLocation, useHistory } from 'react-router-dom'
import { db, useAuth } from '../../hooks/use-auth'
import Display from './display'
import { Settings, BarChart2, BatteryCharging } from 'react-feather'
import {
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  ModalButton,
  FocusOnce,
} from 'baseui/modal'
import { isAfter, isBefore } from 'date-fns'
import { FormControl } from 'baseui/form-control'
import { ArrowRight } from 'baseui/icon'
import { Datepicker, formatDate } from 'baseui/datepicker'
import { TimePicker } from 'baseui/timepicker'

import createAuthRefreshInterceptor from 'axios-auth-refresh'
const START_DATE = new Date()
const END_DATE = new Date()
function formatDateAtIndex(dates: Date | Array<Date>, index: number) {
  if (!dates || !Array.isArray(dates)) return ''
  const date = dates[index]
  if (!date) return ''
  return formatDate(date, 'yyyy/MM/dd') as string
}
export const Statistical = ({ bcidentity }: any) => {
  const [css, theme] = useStyletron()
  const router = useHistory()
  const { id }: any = useParams()
  const [isOpen, setOpen] = React.useState(false)
  const space = css({ marginRight: theme.sizing.scale500 })
  const { state }: any = useAuth()
  const [data, setData]: any = React.useState({
    data: { timestamp: 0 },
    history: [],
  })
  const [history, sethistory] = React.useState(Object)
  const [fields, setfields] = React.useState(Array)
  const [device, setdevice] = React.useState(Object)
  const [dates, setDates] = React.useState([START_DATE, END_DATE])

  const refreshAuthLogic = (failedRequest: any) =>
    axios({
      method: 'post',
      url: 'http://localhost:4002/api/user/gettoken',
      headers: {
        Authorization: 'Bearer ' + state.customClaims.token,
      },
      data: {
        // bcIdentity: infodev.bcIdentity,
        bcIdentity: bcidentity,
        deviceID: id,
      },
    })
      .then((tokenRefreshResponse: any) => {
        console.log('token respone', tokenRefreshResponse.data.token)
        failedRequest.response.config.headers['Authorization'] =
          'Bearer ' + tokenRefreshResponse.data.token
        sessionStorage.setItem(
          state.user.uid + id,
          tokenRefreshResponse.data.token,
        )
        return Promise.resolve()
      })
      .catch((err) => {
        console.log(err.message)
      })

  createAuthRefreshInterceptor(axios, refreshAuthLogic)

  React.useEffect(() => {
    console.log('set fields')
    const getdata = async () => {
      let docs = db.collection('device').doc(id)

      await docs
        .get()
        .then(async (doc: any) => {
          if (doc.exists && doc.data().auth === state.user.uid) {
            let field = doc.get('data_fields')
            setfields(field)
            setdevice({ name: doc.get('name'), desc: doc.get('desc') })
          } else {
            console.log('No such document!')
          }
        })
        .catch((err) => {
          console.log('Error getting document', err)
        })
    }
    getdata()
  }, [])

  console.log('dume do k')
  console.log(bcidentity)
  return (
    <div className={css({})}>
      <div className={css({ display: 'flex', alignItems: 'center' })}>
        <div
          className={css({
            width: '120px',
            marginRight: theme.sizing.scale300,
          })}
        >
          <FormControl label="Start Date" caption="YYYY/MM/DD">
            <Datepicker
              value={dates}
              onChange={({ date }) => setDates(date as Array<Date>)}
              formatDisplayValue={(date) => formatDateAtIndex(date, 0)}
              timeSelectStart
              range
              mask="9999/99/99"
            />
          </FormControl>
        </div>
        <div
          className={css({
            width: '120px',
            marginRight: theme.sizing.scale300,
          })}
        >
          <FormControl label="Start Time" caption="HH:MM">
            <TimePicker
              value={dates[0]}
              onChange={(time) => setDates([time, dates[1]])}
            />
          </FormControl>
        </div>
        <div
          className={css({
            marginRight: theme.sizing.scale300,
          })}
        >
          <ArrowRight size={24} />
        </div>
        <div
          className={css({
            width: '120px',
            marginRight: theme.sizing.scale300,
          })}
        >
          <FormControl label="End Date" caption="yyyy/MM/DD">
            <Datepicker
              value={dates}
              onChange={({ date }) => setDates(date as Array<Date>)}
              formatDisplayValue={(date) => formatDateAtIndex(date, 1)}
              overrides={{
                TimeSelectFormControl: {
                  props: { label: 'End time' },
                },
              }}
              timeSelectEnd
              range
              mask="9999/99/99"
            />
          </FormControl>
        </div>
        <div
          className={css({
            width: '120px',
          })}
        >
          <FormControl label="End Time" caption="HH:MM">
            <TimePicker
              value={dates[1]}
              onChange={(time) => setDates([dates[0], time])}
            />
          </FormControl>
        </div>
        <div
          className={css({
            marginTop: '-15px',
            marginLeft: theme.sizing.scale300,
          })}
        >
          <Button
            onClick={() => {
              console.log(Math.ceil(dates[0].getTime() / 1000))
              console.log(Math.ceil(dates[1].getTime() / 1000))
            }}
            kind="secondary"
            overrides={{
              BaseButton: {
                style: {
                  backgroundColor: theme.colors.positive,
                  borderTopLeftRadius: theme.sizing.scale400,
                  borderBottomRightRadius: theme.sizing.scale400,
                },
              },
            }}
          >
            Thống kê
          </Button>
        </div>
      </div>

      <div
        className={css({
          marginTop: theme.sizing.scale800,
          marginBottom: theme.sizing.scale800,
          display: 'grid',
          gridTemplateColumns: '0.35fr 1fr',
        })}
      >
        {fields!.map((ite: any, i) => {
          return (
            <Display
              key={Math.random() * 10 + i}
              field={ite}
              data={data}
              history={history}
            ></Display>
          )
        })}
      </div>
    </div>
  )
}
