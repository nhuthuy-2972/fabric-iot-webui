import * as React from 'react'
import { useParams, useHistory } from 'react-router-dom'
import StreamDevicesRef from '../components/devices/streamref'
import { StyledSpinnerNext } from 'baseui/spinner'

import { useStyletron } from 'baseui'
import { toaster } from 'baseui/toast'
import { useAuth } from '../hooks/use-auth'
import { db } from '../hooks/use-auth'
import dotenv from 'dotenv'
import axios from 'axios'
dotenv.config()
const DevicesPageRef = () => {
  const [css, theme] = useStyletron()
  const { id }: any = useParams()
  const { state }: any = useAuth()
  console.log('state ne :', state)
  const [isTrue, setTrue] = React.useState(false)
  const [bcIdenity, setbcIdentity] = React.useState('')
  const [deviceFields, setdevicefield] = React.useState([])
  const router = useHistory()
  React.useEffect(() => {
    const getdata = async () => {
      await db
        .collection('device')
        .doc(id)
        .get()
        .then((doc: any) => {
          if (doc.exists && doc.data().auth === state.user.uid) {
            toaster.warning('Không có quyền truy cập!!!', {
              autoHideDuration: 5000,
            })
            router.replace(`/devices/owner/${id}`)
          } else {
            console.log('yes!')
            db.collection('bcAccounts')
              .where('auth', '==', state.user.uid)
              .where('deviceID', '==', id)
              .get()
              .then(async (doc: any) => {
                let infodev: any = {}
                console.log(doc.size)
                if (doc.size > 0) {
                  doc.forEach((dev: any) => {
                    const devdata = dev.data()
                    infodev = {
                      bcIdentity: devdata.bcIdentity,
                    }
                    setbcIdentity(devdata.bcIdentity)
                    console.log(devdata.bcIdentity)
                  })
                  const result = await axios({
                    method: 'post',
                    url: 'http://localhost:4002/api/user/gettoken',
                    headers: {
                      Authorization: 'Bearer ' + state.customClaims.token,
                    },
                    data: {
                      // bcIdentity: infodev.bcIdentity,
                      bcIdentity: infodev.bcIdentity,
                      deviceID: id,
                    },
                  })
                  console.log(result.data)
                  if (result.data.success === true) {
                    sessionStorage.setItem(
                      state.user.uid + id,
                      result.data.token,
                    )
                    setTrue(true)
                  }
                }
              })
          }
        })
        .catch((err) => {
          console.log('Error getting document', err)

          toaster.warning(`Đã xãy ra lỗi : ${err}`, {
            autoHideDuration: 5000,
          })
          router.replace(`/`)
        })
    }
    getdata()
  }, [])

  return (
    <div
      className={css({
        maxWidth: '999px',
        padding: theme.sizing.scale400,
        margin: `${theme.sizing.scale600} auto`,
      })}
    >
      {bcIdenity !== '' && isTrue === true ? (
        <StreamDevicesRef bcidentity={bcIdenity}></StreamDevicesRef>
      ) : (
        <>
          <div
            className={css({
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              height: '30vh',
            })}
          >
            <StyledSpinnerNext />
          </div>
        </>
      )}

      {/* {check == true ? <StreamDevices info={infoDevice}></StreamDevices> : React.Fragment} */}
    </div>
  )
}

export default DevicesPageRef
