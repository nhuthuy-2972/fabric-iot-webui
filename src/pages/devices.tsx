import * as React from 'react'
import { useParams, Route, useHistory } from 'react-router-dom'
import StreamDevices from '../components/devices/stream'
import { useStyletron } from 'baseui'
import { toaster } from 'baseui/toast'
import { fbase, useAuth } from '../hooks/use-auth'
import { db } from '../hooks/use-auth'
import IndexPage from '.'
import { FastField } from 'formik'
import dotenv from 'dotenv'
import axios from 'axios'
dotenv.config()
const DevicesPage: React.FC<{}> = () => {
  const [css, theme] = useStyletron()
  const { typeDevice, id }: any = useParams()
  const par: any = useParams()
  console.log('prarams', par)
  console.log('params ne : ', typeDevice, id)
  const { state }: any = useAuth()
  console.log('state ne :', state)
  const [check, setcheck] = React.useState(Boolean)
  const [infoDevice, setInfo] = React.useState({})
  const router = useHistory()

  React.useEffect(() => {
    const getdata = async () => {
      console.log(id)
      const colectionName: any =
        typeDevice === 'own' ? 'ownDevice' : 'refDevices'
      console.log(colectionName)
      let docs = db
        .collection(colectionName)
        .where('auth', '==', state.user.uid)
        .where('deviceID', '==', id)
      docs
        .get()
        .then((doc: any) => {
          let infooo: any = {}
          console.log(doc.size)
          if (doc.size > 0) {
            doc.forEach((dev: any) => {
              const devdata = dev.data()
              infooo = {
                user: devdata.bcUser,
                channel: devdata.bcChannel,
                org: devdata.bcOrg,
              }
              setInfo(infooo)
            })
            console.log('co infoi roi ne ', infooo)
            // if (sessionStorage.getItem(state.user.uid + id) === null) {
            //   console.log("khong co token")
            //   console.log("co infoi roi ne ", infooo.user)
            //   axios({
            //     method: "post",
            //     url: "http://localhost:9997/api/auth/gettoken",
            //     data: {
            //       username: infooo.user,
            //       orgName: infooo.org,
            //       channel: infooo.channel
            //     }
            //   }).then(resulttoken => {
            //     console.log(resulttoken.data.token)
            //     sessionStorage.setItem(state.user.uid + id, resulttoken.data.token)
            //   }).catch(err => {
            //     console.log("ra loi r ne ", err)
            //     toaster.negative("Thiết bị chưa được kích hoạt hoặc không có kết nối. Vui lòng thử lại sau", {
            //       autoHideDuration: 5000,
            //     })
            //     router.push('/')
            //   })
            // }
            // setcheck(true)
            console.log('yes!')
          } else {
            toaster.warning('Thiết bị không tồn tại!', {
              autoHideDuration: 5000,
            })
            router.push(`/`)
          }
        })
        .catch((err) => {
          console.log('Error getting document', err)
          // setcheck(false)
          toaster.warning(`Đã xãy ra lỗi : ${err}`, {
            autoHideDuration: 5000,
          })
          router.push(`/`)
        })
    }
    getdata()
  }, [])

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
