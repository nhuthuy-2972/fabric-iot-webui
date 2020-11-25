import * as React from 'react'
import { DeepstreamClient } from '@deepstream/client'
import { useStyletron } from 'baseui'
import { Button } from 'baseui/button'
import moment from 'moment';
import axios from 'axios'
import { useParams, } from "react-router-dom";
import { db, useAuth } from '../../hooks/use-auth'
import Display from './display'
import { Settings } from 'react-feather';
import {
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  ModalButton,
  FocusOnce,
} from 'baseui/modal';
import { Input, SIZE } from "baseui/input";
moment().zone(7)

const StreamDevices = ({ info }: any) => {
  const [css, theme] = useStyletron();
  const [data, setData]: any = React.useState(Object)
  const { id }: any = useParams()
  const [history, sethistory] = React.useState(Object)
  const [fields, setfields] = React.useState(Array);
  const [private_key, setPrivate_key] = React.useState(Array);
  const [token, setToken] = React.useState(Array);
  const [device, setdevice] = React.useState(Object)
  const [isOpen, setOpen] = React.useState(false)
  const { state }: any = useAuth()
  React.useEffect(() => {

    const client = new DeepstreamClient('localhost:6020')
    client.login()
    const record = client.record.getRecord('news')
    function getds() {
      record.subscribe(`news/${id}`, async (value: any) => {
        await setData(value)
        console.log("valuene ", value)
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
        axios({
          method: 'post',
          url: 'http://localhost:4002/api/auth/register',
          // url: 'http://6a5d8441b61a.ngrok.io/api/getdata',
          headers: {
            'Authorization': `Bearer ${state.customClaims.token}`
          },
          data: {
            deviceID: id,
            userAccount: "plnhuy1507@gmail.com",
            channel: "chanelid",
            sensors: ["temperature", "ph"]
          }
        }).then(data => {
          console.log("Postgres", data.data)
        })
          .catch(er => { console.log("hhh", er) })
      })
    }
    getds();

    return () => {
      record.unsubscribe(`news/${id}`, () => console.log('offline'))
    }
  }, [])



  React.useEffect(() => {
    console.log("set fields")
    const getdata = async () => {
      let docs = db.collection('devices').doc(id);

      await docs.get().then(async doc => {
        if (!doc.exists) {
          console.log('No such document!');
        } else {
          // console.log('Document data:', doc.get('data_fields'));
          let field = doc.get('data_fields')
          // setPrivate_key(doc.get('privateKey'))
          // setToken(doc.get('token'))
          setfields(field)
          setdevice({ name: doc.get('name'), desc: doc.get('desc') })
        }
      })
        .catch(err => {
          console.log('Error getting document', err);
        });
    }
    getdata()
  }, [])


  console.log("info ne", info);
  //console.log("fields", fields)
  console.log("name", device)
  console.log("history", history)
  return (
    < div className={css({})} >
      <div
        className={css({
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        })}
      >
        <div className={css({ ...theme.typography.font550 })}>
          {`${device.name || "X iot"} (${device.desc || ""})`} Batery : {data.batery} %
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
        {
          fields!.map((ite: any, i) => { return <Display key={Math.random() * 10 + i} field={ite} data={data} history={history} ></Display> })
        }
      </div>
    </div >
  )
}

export default StreamDevices
