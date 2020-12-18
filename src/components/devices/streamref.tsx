import * as React from 'react'
import { DeepstreamClient } from '@deepstream/client'
import { useStyletron } from 'baseui'
// import { Button } from 'baseui/button'
// import moment from 'moment'
import axios from 'axios'
import { useParams, useHistory } from 'react-router-dom'
import { db, useAuth } from '../../hooks/use-auth'
import Display from './display'
// // import { Settings } from 'react-feather';
// import {
//   Modal,
//   ModalHeader,
//   ModalBody,
//   ModalFooter,
//   ModalButton,
//   FocusOnce,
// } from 'baseui/modal'
// import { Input, SIZE } from 'baseui/input'
import createAuthRefreshInterceptor from 'axios-auth-refresh'
import { resolve } from 'dns'
import { rejects } from 'assert'

// moment().zone(7)

const StreamDevicesRef = ({ bcidentity }: any) => {
  const [css, theme] = useStyletron()
  const [data, setData]: any = React.useState(Object)
  const [data1, setData1]: any = React.useState({
    data: { timestamp: 0 },
    history: [],
  })
  const { id }: any = useParams()
  const [history, sethistory] = React.useState(Object)
  const [fields, setfields] = React.useState(Array)
  const router = useHistory()
  const [bcIdentity, setbcIdentity] = React.useState('')
  const [device, setdevice] = React.useState(Object)
  const [isOpen, setOpen] = React.useState(false)
  const { state }: any = useAuth()
  console.log('identity hihihhihi', bcidentity)
  // axios.interceptors.request.use((request) => {
  //   request.headers['Authorization'] =
  //     `Bearer ` + sessionStorage.getItem(state.user.uid + id)
  //   return request
  // })
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

  // Location.
  // const infodevice = info
  // React.useEffect(() => {
  //   axios({
  //     method: 'post',
  //     headers: {
  //       Authorization: 'Bearer ' + sessionStorage.getItem(state.user.uid + id),
  //     },
  //     url: 'http://localhost:4002/api/device/sensorsinfo',
  //   })
  //     .then((result: any) => {
  //       if (result.data.success === true) {
  //         setfields(result.data.data.data_fields)
  //         setdevice(result.data.data.deviceInfo)
  //       } else {
  //         console.log('khong co token')
  //         // router.replace('/')
  //       }
  //     })
  //     .catch((err) => {
  //       // router.replace('/')
  //     })
  // }, [])

  React.useEffect(() => {
    console.log('set fields')
    const getdata = async () => {
      await db
        .collection('fieldRef')
        .where('auth', '==', state.user.uid)
        .where('deviceID', '==', id)
        .onSnapshot((doc) => {
          doc.forEach((elem: any) => {
            console.log(elem.id)
            setfields(elem.data().data_fields)
            setdevice({ name: 'asfasf', desc: 'ASfasfas' })
          })
        })
    }
    getdata()
  }, [])

  React.useEffect(() => {
    const client = new DeepstreamClient('localhost:6020')
    client.login()
    const record = client.record.getRecord('news')

    function getds() {
      record.subscribe(`news/${id}`, async (value: any) => {
        // await setData(value)
        console.log('valuene ', value)
        axios({
          method: 'post',
          headers: {
            Authorization:
              'Bearer ' + sessionStorage.getItem(state.user.uid + id),
          },
          url: 'http://localhost:4002/api/device/datadevice',
        })
          .then((res: any) => {
            console.log(res.data)
            const data = res.data.map((item: any) => {
              return {
                ...item.data,
                time: new Date(item.data.timestamp * 1000).toLocaleTimeString(),
              }
            })
            console.log(data)
            setData1({ data: value, history: data.reverse() })
            // sethistory(data.reverse())
          })
          .catch((Err) => {
            console.log(Err)
          })
      })
    }
    getds()

    return () => {
      record.unsubscribe(`news/${id}`, () => console.log('offline'))
    }
  }, [])

  // console.log('co bc identity c', bcIdentity)

  // console.log('info ne', bcidentity)
  //console.log("fields", fields)
  // console.log('name', device)
  // console.log('history', history)
  return (
    <div className={css({})}>
      <div
        className={css({
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        })}
      >
        <div className={css({ ...theme.typography.font550 })}>
          {`${device.name || 'X iot'} (${device.desc || ''})`} Batery :{' '}
          {data1.history.slice(-1).pop()
            ? `${data1.history.slice(-1).pop().battery} %`
            : ''}
        </div>
        {/* <Button
          onClick={() => setOpen(true)}
          kind="secondary"
          startEnhancer={() => (
            <Settings color={theme.colors.mono700} size={18} />
          )}
          overrides={{
            BaseButton: {
              style: {
                borderTopLeftRadius: theme.sizing.scale400,
                borderBottomRightRadius: theme.sizing.scale400,
              },
            },
          }}
        >
          Chi tiết
        </Button>
        <Modal onClose={() => setOpen(false)} isOpen={isOpen}>
          <FocusOnce>
            <ModalHeader>Chi tiết</ModalHeader>
          </FocusOnce>
          <ModalBody>
            <div>Private key</div>
            <Input value={private_key.toString()}
              disabled
              size={SIZE.mini}
            />
            <div>Token</div>
            <Input
              value={token.toString()}
              disabled
              size={SIZE.mini}
            />

          </ModalBody>
          <ModalFooter>
          </ModalFooter>
        </Modal> */}
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
              data={data1.data}
              history={data1.history}
            ></Display>
          )
        })}
      </div>
    </div>
  )
}

export default StreamDevicesRef
