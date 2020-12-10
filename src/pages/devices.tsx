import * as React from 'react'
<<<<<<< HEAD
import { useParams, useHistory } from 'react-router-dom'
=======
import { useParams, Route, useHistory } from 'react-router-dom'
>>>>>>> 5f04b8245b814d5c64d6824e5edfcf59de2ab1ad
import StreamDevices from '../components/devices/stream'
import { useStyletron } from 'baseui'
import { toaster } from 'baseui/toast'
import { fbase, useAuth } from '../hooks/use-auth'
import { db } from '../hooks/use-auth'
<<<<<<< HEAD
import dotenv from 'dotenv'
import axios from 'axios'
dotenv.config()
const DevicesPage = () => {
  const [css, theme] = useStyletron()
  const { typeDevice, id }: any = useParams()
  // const par: any = useParams()
  // console.log('prarams', par)
  // console.log('params ne : ', typeDevice, id)
  const { state }: any = useAuth()
  console.log('state ne :', state)
  // const [check, setcheck] = React.useState(Boolean)
=======
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
>>>>>>> 5f04b8245b814d5c64d6824e5edfcf59de2ab1ad
  const [infoDevice, setInfo] = React.useState({})
  const router = useHistory()

  React.useEffect(() => {
    const getdata = async () => {
<<<<<<< HEAD
      let docs = db
        .collection('bcAccounts')
=======
      console.log(id)
      const colectionName: any =
        typeDevice === 'own' ? 'ownDevice' : 'refDevices'
      console.log(colectionName)
      let docs = db
        .collection(colectionName)
>>>>>>> 5f04b8245b814d5c64d6824e5edfcf59de2ab1ad
        .where('auth', '==', state.user.uid)
        .where('deviceID', '==', id)
      docs
        .get()
        .then((doc: any) => {
<<<<<<< HEAD
          let info: any = {}
=======
          let infooo: any = {}
>>>>>>> 5f04b8245b814d5c64d6824e5edfcf59de2ab1ad
          console.log(doc.size)
          if (doc.size > 0) {
            doc.forEach((dev: any) => {
              const devdata = dev.data()
<<<<<<< HEAD
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
=======
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
>>>>>>> 5f04b8245b814d5c64d6824e5edfcf59de2ab1ad
            // setcheck(true)
            console.log('yes!')
          } else {
            toaster.warning('Thiết bị không tồn tại!', {
              autoHideDuration: 5000,
            })
<<<<<<< HEAD
            router.replace(`/`)
=======
            router.push(`/`)
>>>>>>> 5f04b8245b814d5c64d6824e5edfcf59de2ab1ad
          }
        })
        .catch((err) => {
          console.log('Error getting document', err)
          // setcheck(false)
          toaster.warning(`Đã xãy ra lỗi : ${err}`, {
            autoHideDuration: 5000,
          })
<<<<<<< HEAD
          router.replace(`/`)
=======
          router.push(`/`)
>>>>>>> 5f04b8245b814d5c64d6824e5edfcf59de2ab1ad
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
