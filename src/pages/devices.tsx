import * as React from 'react'
import { useParams, Route } from 'react-router-dom'
import StreamDevices from '../components/devices/stream'
import { useStyletron } from 'baseui'
import { fbase, useAuth } from '../hooks/use-auth'
import { db } from '../hooks/use-auth'
import IndexPage from '.'
import { FastField } from 'formik'


const DevicesPage: React.FC<{}> = () => {
  const [css, theme] = useStyletron()
  const { id }: any = useParams();
  console.log("params ne : ", id)
  const { state }: any = useAuth()
  console.log("state ne :", state)
  const [check, setcheck] = React.useState(Boolean)
  const [infoDevice, setInfo] = React.useState({})

  React.useEffect(() => {
    const getdata = async () => {
      console.log(id)
      let docs = db.collection('ownDevice').where("auth", '==', state.user.uid).where("deviceID", '==', id)
      docs.get().then((doc: any) => {

        console.log(doc.size)
        if (doc.size > 0) {
          doc.forEach((dev: any) => {
            const devdata = dev.data()
            const infooo = { user: devdata.bcUser, channel: devdata.bcChannel, org: devdata.bcOrg }
            setInfo(infooo)
          });
          setcheck(true)
          console.log('yes!');
        } else {
          console.log('Document data:', doc.data());
          setcheck(false)
        }
      })
        .catch(err => {
          console.log('Error getting document', err);
          setcheck(false)
        });
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
      {check == true ? <StreamDevices info={infoDevice}></StreamDevices> : React.Fragment}
    </div>
  )
}

export default DevicesPage
