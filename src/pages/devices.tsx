import * as React from 'react'
import { useParams, useHistory } from 'react-router-dom'
import StreamDevices from '../components/devices/stream'
import { useStyletron } from 'baseui'
import { toaster } from 'baseui/toast'
import {  useAuth } from '../hooks/use-auth'
import { db } from '../hooks/use-auth'
import dotenv from 'dotenv'
import axios from 'axios'
dotenv.config()
const DevicesPage = () => {
  const [css, theme] = useStyletron()
  const { id }: any = useParams()
 
  const { state }: any = useAuth()
  console.log('state ne :', state)
 
  const [infoDevice, setInfo] = React.useState({})
  const router = useHistory()

  React.useEffect(() => {
    const getdata = async () => {
      let docs = db
        .collection('bcAccounts')
        .where('auth', '==', state.user.uid)
        .where('deviceID', '==', id)
      docs
        .get()
        .then((doc: any) => {
          let info: any = {}

          console.log(doc.size)
          if (doc.size > 0) {
            doc.forEach((dev: any) => {
              const devdata = dev.data()
              info = {
                bcIdentity: devdata.bcIdentity,
              }
              setInfo(info)
            })
            console.log('co infoi roi ne ', info)
            if (sessionStorage.getItem(state.user.uid + id) === null) {
              console.log('khong co token')
              console.log('co infoi roi ne ', info.bcIdentity)
              axios({
                method: 'post',
                headers: {
                  Authorization: 'Bearer ' + state.customClaims.token,
                },
                url: 'http://localhost:4002/api/user/gettoken',
                data: {
                  bcIdentity: info.bcIdentity,
                  deviceID: id,
                },
              })
                .then((resulttoken) => {
                  console.log(resulttoken.data.token)
                  sessionStorage.setItem(
                    state.user.uid + id,
                    resulttoken.data.token,
                  )
                })
                .catch((err) => {
                  console.log('ra loi r ne ', err)
                  toaster.negative(
                    'Thiết bị chưa được kích hoạt hoặc không có kết nối. Vui lòng thử lại sau',
                    {
                      autoHideDuration: 5000,
                    },
                  )
                  router.replace('/')
                })
            }

            // setcheck(true)
            console.log('yes!')
          } else {
            toaster.warning('Thiết bị không tồn tại!', {
              autoHideDuration: 5000,
            })
            router.replace(`/`)

          }
        })
        .catch((err) => {
          console.log('Error getting document', err)
          // setcheck(false)
          toaster.warning(`Đã xãy ra lỗi : ${err}`, {
            autoHideDuration: 5000,
          })
          router.replace(`/`)
        })
    }
    getdata()
  }, [id,router,state.customClaims.token,state.user.uid])

  // console.log(state.customClaims.token)

  return (
    <div
      className={css({
        maxWidth: '999px',
        padding: theme.sizing.scale400,
        margin: `${theme.sizing.scale600} auto`,
      })}
    >
      <StreamDevices info={infoDevice}></StreamDevices>
      {/* {check == true ? <StreamDevices info={infoDevice}></StreamDevices> : React.Fragment} */}
    </div>
  )
}

export default DevicesPage
