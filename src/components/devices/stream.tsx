import * as React from 'react'
import { DeepstreamClient } from '@deepstream/client'
import { useStyletron } from 'baseui'
// import { Button } from 'baseui/button'
<<<<<<< HEAD
// import moment from 'moment'
=======
import moment from 'moment'
>>>>>>> 5f04b8245b814d5c64d6824e5edfcf59de2ab1ad
import axios from 'axios'
import { useParams } from 'react-router-dom'
import { db, useAuth } from '../../hooks/use-auth'
import Display from './display'
<<<<<<< HEAD
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

// moment().zone(7)
=======
// import { Settings } from 'react-feather';
import {
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  ModalButton,
  FocusOnce,
} from 'baseui/modal'
import { Input, SIZE } from 'baseui/input'
import createAuthRefreshInterceptor from 'axios-auth-refresh'

moment().zone(7)
>>>>>>> 5f04b8245b814d5c64d6824e5edfcf59de2ab1ad

const StreamDevices = ({ info }: any) => {
  const [css, theme] = useStyletron()
  const [data, setData]: any = React.useState(Object)
  const { typeDevice, id }: any = useParams()
  const [history, sethistory] = React.useState(Object)
  const [fields, setfields] = React.useState(Array)
<<<<<<< HEAD
=======
  const [private_key, setPrivate_key] = React.useState(Array)
  const [token, setToken] = React.useState(Array)
>>>>>>> 5f04b8245b814d5c64d6824e5edfcf59de2ab1ad
  const [device, setdevice] = React.useState(Object)
  const [isOpen, setOpen] = React.useState(false)
  const { state }: any = useAuth()
  React.useEffect(() => {
    const client = new DeepstreamClient('localhost:6020')
    client.login()
    const record = client.record.getRecord('news')
    function getds() {
<<<<<<< HEAD
      const refreshAuthToken = (failedRequest: any) => {
        axios({
          method: 'post',
          url: 'http://localhost:4002/api/user/gettoken',
          data: {},
=======
      const refreshAuthToken = (failedRequest: any) =>
        axios({
          method: 'post',
          url: 'http://localhost:9997/api/auth/gettoken',
          data: {
            username: '5FkfDy4apYdpjt2JlyE1VL4jQGg1',
            orgName: 'Org1',
            channel: 'channelid1',
          },
>>>>>>> 5f04b8245b814d5c64d6824e5edfcf59de2ab1ad
        }).then((tokenRefreshResponse: any) => {
          // localStorage.setItem('token', tokenRefreshResponse.data.token);
          console.log('token respone', tokenRefreshResponse)
          failedRequest.response.config.headers['Authorization'] =
            'Bearer ' + tokenRefreshResponse.data.token
          return Promise.resolve()
        })
<<<<<<< HEAD
      }
=======

>>>>>>> 5f04b8245b814d5c64d6824e5edfcf59de2ab1ad
      record.subscribe(`news/${id}`, async (value: any) => {
        await setData(value)
        console.log('valuene ', value)

        // axios({
        //   method: 'post',
        //   url: 'http://localhost:9997/api/device/datadevice',
        //   // url: 'http://6a5d8441b61a.ngrok.io/api/getdata',
        //   headers: {
        //     'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE2MDYyNzA5MTgsInVzZXJuYW1lIjoiNUZrZkR5NGFwWWRwanQySmx5RTFWTDRqUUdnMSIsIm9yZ05hbWUiOiJPcmcxIiwiY2hhbm5lbCI6ImNoYW5uZWxpZDEiLCJpYXQiOjE2MDYyMzQ5MTh9.mfGcgLc3nMoTGA9P9wChGunKxUfeUgzwmx-KXhbVuZg'
        //   },
        //   data: {
        //     username: info.user,
        //     orgName: info.org,
        //     channel: info.channel,
        //     deviceId: id
        //   }
        // }).then(data => {
        //   console.log("Postgres", data.data)
        //   let datatemp: any = [];

        //   for (let item of data.data) {
        //     let ob = {
        //       ...item.data,
        //       time: new Date(item.data.timestamp * 1000).toLocaleString()
        //     }
        //     datatemp.push(ob)
        //   }
        //   console.log(datatemp.reverse())
        //   // let res = [...data.data.rows]
        //   sethistory(datatemp)
        // })
        //   .catch(er => { console.log("hhh", er) })

        // axios({
        //   method: 'post',
        //   url: 'http://localhost:4002/api/auth/verify',
        //   // url: 'http://6a5d8441b61a.ngrok.io/api/getdata',

        //   data: {
        //     token: state.customClaims.token,
        //     deviceID: id,
        //     userAccount: "plnhuy1507@gmail.com"
        //   }
        // }).then(data => {
        //   console.log("Postgres", data.data)
        // })
        //   .catch(er => { console.log("hhh", er) })
        // axios({
        //   method: 'post',
        //   url: 'http://localhost:4002/api/auth/register',
        //   // url: 'http://6a5d8441b61a.ngrok.io/api/getdata',
        //   headers: {
        //     'Authorization': `Bearer ${state.customClaims.token}`
        //   },
        //   data: {
        //     deviceID: id,
        //     userAccount: "taib1606931@student.ctu.edu.vn",
        //     channel: "chanelid1",
        //     sensors: ["temperature", "ph"]
        //   }
        // }).then(data => {
        //   console.log("Postgres", data.data)
        // })
        //   .catch(er => { console.log("hhh", er) })
      })
    }
    getds()

    return () => {
      record.unsubscribe(`news/${id}`, () => console.log('offline'))
    }
  }, [])

  React.useEffect(() => {
    console.log('set fields')
    const getdata = async () => {
<<<<<<< HEAD
      let docs = db.collection('device').doc(id)
=======
      let docs = db.collection('devices').doc(id)

>>>>>>> 5f04b8245b814d5c64d6824e5edfcf59de2ab1ad
      await docs
        .get()
        .then(async (doc) => {
          if (!doc.exists) {
            console.log('No such document!')
          } else {
<<<<<<< HEAD
=======
            // console.log('Document data:', doc.get('data_fields'));
>>>>>>> 5f04b8245b814d5c64d6824e5edfcf59de2ab1ad
            let field = doc.get('data_fields')
            // setPrivate_key(doc.get('privateKey'))
            // setToken(doc.get('token'))
            setfields(field)
            setdevice({ name: doc.get('name'), desc: doc.get('desc') })
          }
        })
        .catch((err) => {
          console.log('Error getting document', err)
        })
    }
    getdata()
  }, [])

  console.log('info ne', info)

  console.log('typedevice ne', typeDevice)
  //console.log("fields", fields)
  console.log('name', device)
  console.log('history', history)
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
          {data.batery} %
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
              data={data}
              history={history}
            ></Display>
          )
        })}
      </div>
    </div>
  )
}

export default StreamDevices
