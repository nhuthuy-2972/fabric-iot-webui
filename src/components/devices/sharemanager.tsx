// import * as React from 'react'
// import {  useStyletron } from 'baseui'
// import { Button } from 'baseui/button'
// import {DevicesTable} from '../../pages/table'
// import { PlusCircle, Plus, X, RotateCcw, Search } from 'react-feather'
// import {
//   Modal,
//   ModalFooter,
//   ModalButton,
//   ModalHeader,
//   ModalBody,
// } from 'baseui/modal'

// import { toaster } from 'baseui/toast'
// import { db } from '../../hooks/use-auth'
// import { useAuth } from '../../hooks/use-auth'
// import { useHistory,useParams } from 'react-router-dom'
// import axios from 'axios'

// export const ShareDeviceManager = ()=>{
//     const [refUSer ,setRefUser] = React.useState([])
//     const { id }: any = useParams()


//     React.useEffect(()=>{
//         const unsubcrible = db.collection('device').doc(id)
//     })
//     return (<div>Share device manager</div>)
// }


import * as React from 'react'
import { useParams, useHistory } from 'react-router-dom'
import { useStyletron } from 'baseui'
import { toaster } from 'baseui/toast'
import { db, fbase, useAuth } from '../../hooks/use-auth'
import dotenv from 'dotenv'
dotenv.config()
export const ShareDeviceManager = () => {
  const [css, theme] = useStyletron()
  const { id }: any = useParams()
  const {state} :any = useAuth()
  const router = useHistory()
  const [refUSer ,setRefUser] = React.useState([])

  React.useEffect(() => {
    const getdata = async () => {
      let docs = db.collection('device').doc(id)
        docs
        .get()
        .then((doc: any) => {
          if (doc.exists && doc.data().auth === state.user.uid) {
            console.log('yes!')
            const getuserRef = doc.data().refUser
            console.log(getuserRef)
          } else {
            toaster.warning('Không có quyền truy cập!!!', {
              autoHideDuration: 5000,
            })
            router.replace(`/`)
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
  }, [id,router,state.user.uid])


  return (
    <div
      className={css({
        maxWidth: '999px',
        padding: theme.sizing.scale400,
        margin: `${theme.sizing.scale600} auto`,
      })}
    >
        Device Manager
    </div>
  )
}
