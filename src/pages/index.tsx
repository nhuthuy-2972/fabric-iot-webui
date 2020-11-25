import * as React from 'react'
import { withStyle, useStyletron } from 'baseui'
import { StyledTable, StyledHeadCell, StyledBodyCell } from 'baseui/table-grid'
import Skeleton from 'react-loading-skeleton'
import { Button } from 'baseui/button'
import nanoid from 'nanoid'
import { PlusCircle, Plus, Delete, X } from 'react-feather'
import {
  Modal,
  ModalFooter,
  ModalButton,
  ModalHeader,
  ModalBody,
} from 'baseui/modal'
import { FieldArray, useFormik, Form, Formik } from 'formik'
import { Block } from 'baseui/block'
import { Label2, Paragraph2 } from 'baseui/typography'
import { Input } from 'baseui/input'
import { FormControl } from 'baseui/form-control'
import { toaster } from 'baseui/toast'
import { db } from '../hooks/use-auth'
import { useAuth } from '../hooks/use-auth'
import { useHistory } from 'react-router-dom'
import { StyledSpinnerNext } from 'baseui/spinner'
import { fbase } from "../hooks/use-auth"
import axios from 'axios'
//import { stat } from 'fs'


const CenteredBodyCell = withStyle(StyledBodyCell, ({ $theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  textAlign: 'right',
  paddingTop: $theme.sizing.scale500,
  paddingBottom: $theme.sizing.scale500,
}))

const CenteredBodyCellLeft = withStyle(StyledBodyCell, {
  display: 'flex',
  alignItems: 'center',
})

const HeadCellLeft = withStyle(StyledHeadCell, ({ $theme }) => ({
  boxShadow: 'none',
  borderWidth: '0px',
  backgroundColor: $theme.colors.positive,
  color: $theme.colors.mono100,
}))

const NewStyledTable = withStyle(StyledTable, ({ $theme }) => ({
  ...$theme.borders.border200,
  height: 'auto',
  overflowX: 'auto',
  backgroundColor: $theme.colors.mono100,
  borderTopLeftRadius: $theme.sizing.scale400,
  borderTopRightRadius: $theme.sizing.scale400,
  borderBottomLeftRadius: $theme.sizing.scale400,
  borderBottomRightRadius: $theme.sizing.scale400,
  boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
}))

const Row = ({ striped, row }: any) => {
  const [css, theme] = useStyletron()
  const router = useHistory()
  return (
    <>
      <CenteredBodyCellLeft $striped={striped}>
        <div
          className={css({
            textAlign: 'left',
            ...theme.typography.font300,
            textOverflow: 'ellipsis',
            overflow: 'hidden',
            whiteSpace: 'nowrap',
          })}
        >
          {row.deviceID}
        </div>
      </CenteredBodyCellLeft>
      <CenteredBodyCellLeft $striped={striped}>
        <div
          className={css({
            textAlign: 'left',
            ...theme.typography.font300,
            textOverflow: 'ellipsis',
            overflow: 'hidden',
            whiteSpace: 'nowrap',
          })}
        >
          {row.name}
        </div>
      </CenteredBodyCellLeft>
      <CenteredBodyCellLeft $striped={striped}>
        <div
          className={css({
            textAlign: 'left',
            ...theme.typography.font300,
            textOverflow: 'ellipsis',
            overflow: 'hidden',
            whiteSpace: 'nowrap',
          })}
        >
          {row.desc}
        </div>
      </CenteredBodyCellLeft>
      <CenteredBodyCellLeft $striped={striped}>
        <div
          className={css({
            textAlign: 'left',
            ...theme.typography.font300,
            textOverflow: 'ellipsis',
            overflow: 'hidden',
            whiteSpace: 'nowrap',
          })}
        >
          {row.date}
        </div>
      </CenteredBodyCellLeft>
      <CenteredBodyCellLeft $striped={striped}>
        <Button
          size="compact"
          kind="tertiary"
          onClick={() => router.push(`/devices/${row.deviceID}`)}
        >
          Xem
        </Button>
      </CenteredBodyCellLeft>
    </>
  )
}

export const DevicesTable = ({ devices }: any) => {
  const [css, theme] = useStyletron()

  return (
    <div
      className={css({
        marginTop: theme.sizing.scale400,
        marginBottom: theme.sizing.scale400,
      })}
    >
      <NewStyledTable $gridTemplateColumns="auto auto auto auto auto">
        <HeadCellLeft $sticky={false}>ID</HeadCellLeft>
        <HeadCellLeft $sticky={false}>Tên thiết bị</HeadCellLeft>
        <HeadCellLeft $sticky={false}>Miêu tả</HeadCellLeft>
        <HeadCellLeft $sticky={false}>Cập nhật</HeadCellLeft>
        <HeadCellLeft $sticky={false}>Hành động</HeadCellLeft>

        {devices!.map((row: any, index: any) => {
          const striped = (index + 1) % 2 === 0
          return <Row key={index} row={row} striped={striped} />
        })}
      </NewStyledTable>
    </div>
  )
}

const IndexPage = () => {


  const [css, theme] = useStyletron()
  // const [allDevices, setAllDevices] = React.useState({ mydevice: "loading", linkeddevice: "loading" })
  const [devices, setDevices] = React.useState('loading')

  const [linkedDevices, setLinkedDevices] = React.useState('loading');
  const router = useHistory()
  const [isOpen, setIsOpen] = React.useState(false)
  const { state }: any = useAuth()
  //console.log(state.user.uid)
  const [isload, setload] = React.useState(false)
  React.useEffect(() => {
    console.log("goi useffect")
    let unsubscribe: any = db.collection('ownDevice').where('auth', '==', state.user.uid).onSnapshot((snapshot: any) => {
      let arrdevice: any = [];
      snapshot.forEach(async (doc: any) => {
        const data = doc.data().device.get()
        arrdevice.push(data)
      })
      if (arrdevice.length > 0) {
        Promise.all(arrdevice).then((res: any) => {

          let arr: any = []

          res.forEach((device: any) => {
            arr.push(device.data())
          })
          setDevices(arr);
        })
      } else {
        let arr: any = [];
        setDevices(arr);
      }
    })
    // const [devices, setDevices] = React.useState('loading')
    // console.log(mydevicedata)
    console.log("set device")
    // setDevices(mydevicedata);
    console.log("after set device:" + devices)
    console.log("render lai");
    return () => unsubscribe()
  }, [])

  React.useEffect(() => {
    console.log("goi useffect")
    let unsubscribe: any = db.collection('refDevices').where('auth', '==', state.user.uid).onSnapshot((snapshot: any) => {
      let arrdevice: any = [];
      snapshot.forEach(async (doc: any) => {
        // const data = await doc.data();
        const data = doc.data().device.get()
        // console.log(data)
        arrdevice.push(data)
      })
      if (arrdevice.length > 0) {
        Promise.all(arrdevice).then((res: any) => {

          let arr: any = []
          for (let device of res) {
            // console.log(res[device].data())
            const dev = device.data();
            arr.push(dev)
          }

          setLinkedDevices(arr);
        })
      } else {
        let arr: any = [];
        setLinkedDevices(arr);
      }
    })
    // const [devices, setDevices] = React.useState('loading')
    console.log("set device")
    // setDevices(mydevicedata);
    console.log("after set device:" + devices)
    console.log("render lai");
    return () => unsubscribe()
  }, [])


  console.log("day la mydevice : ", devices);
  // console.log("day la linked device: ", linkedDevices)
  console.log("render ne")
  return (
    <div
      className={css({
        maxWidth: '999px',
        padding: theme.sizing.scale400,
        margin: `${theme.sizing.scale600} auto`,
      })}
    >
      <div
        className={css({
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        })}
      >
        <div className={css({ ...theme.typography.font550 })}>
          Danh sách thiết bị
        </div>
        <Button
          onClick={() => setIsOpen(true)}
          kind="secondary"
          startEnhancer={() => (
            <PlusCircle color={theme.colors.mono700} size={18} />
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
          Thêm thiết bị
        </Button>
      </div>

      {devices === 'loading' && (
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
      )}



      {devices !== 'loading' && devices.length === 0 && (
        <div
          className={css({
            display: 'flex',
            justifyContent: 'center',
            flexDirection: 'column',
            alignItems: 'center',
            marginTop: theme.sizing.scale1000,
          })}
        >
          <img width="300" src="/assets/no-devices.svg" />
          <Paragraph2>Không có thiết bị</Paragraph2>
        </div>
      )}

      {devices !== 'loading' && devices.length > 0 && (
        <DevicesTable devices={devices} />
      )}


      <div className={css({ ...theme.typography.font550 })}>
        Danh sách thiết bị linked
        </div>
      {linkedDevices !== 'loading' && linkedDevices.length === 0 && (
        <div
          className={css({
            display: 'flex',
            justifyContent: 'center',
            flexDirection: 'column',
            alignItems: 'center',
            marginTop: theme.sizing.scale1000,
          })}
        >
          <img width="300" src="/assets/no-devices.svg" />
          <Paragraph2>Không có thiết bị linked</Paragraph2>
        </div>
      )}

      {linkedDevices !== 'loading' && linkedDevices.length > 0 && (
        <DevicesTable devices={linkedDevices} />
      )}
      {/* add device modal */}
      <Modal
        unstable_ModalBackdropScroll={true}
        closeable={false}
        isOpen={isOpen}
        animate
        autoFocus
        size="default"
        role="dialog"
        overrides={{
          Dialog: {
            style: {
              borderTopLeftRadius: theme.sizing.scale400,
              borderBottomRightRadius: theme.sizing.scale400,
            },
          },
        }}
      >
        <Formik
          initialValues={{
            name: '',
            deviceID: nanoid(),
            desc: '',
            data_fields: [
              {
                field_display: '',
                field_name: '',
                field_unit: '',
              },
            ],
          }}
          onSubmit={async (values, actions) => {
            actions.setSubmitting(true)
            try {
              // let res_create_key = await axios({
              //   method: "post",
              //   url: "http://localhost:8888/device/create_key",
              //   data: {
              //     device_id: values.devicesId
              //   }
              // });
              // let { data } = res_create_key;
              // values.privateKey = data.privatekey

              // let res_token = await axios({
              //   method: "post",
              //   url: "http://localhost:8888/device/token",
              //   data: {
              //     device_id: values.devicesId
              //   }
              // })

              // let data_token = res_token.data
              // values.token = data_token.token
              await db
                .collection('devices')
                .doc(values.deviceID)
                .set({
                  ...values,
                  date: new Date().toISOString(),
                })
              // router.push(`/devices/${values.devicesID}`)

              let deviceItem: any = {
                auth: state.user.uid,
                deiveID: values.deviceID,
                device: db.doc('devices/' + values.deviceID)
              }

              console.log(deviceItem)
              // myDevices.push(deviceItem);
              await db.collection('ownDevice').add(deviceItem)

              toaster.positive(
                <div className={css({ ...theme.typography.font200 })}>
                  Thêm thiết bị thành công!
                </div>,
                {
                  autoHideDuration: 3000,
                  overrides: {
                    Body: {
                      style: {
                        borderTopLeftRadius: theme.sizing.scale400,
                        borderBottomRightRadius: theme.sizing.scale400,
                      },
                    },
                  },
                },
              )

              actions.setSubmitting(false)
              setIsOpen(false)
            } catch (error) {
              console.log(error)
              actions.setSubmitting(false)
              toaster.negative(
                <div className={css({ ...theme.typography.font200 })}>
                  Xảy ra trong quá trình thêm dữ liệu. Vui lòng thử lại!
                </div>,
                {
                  autoHideDuration: 3000,
                  overrides: {
                    Body: {
                      style: {
                        borderTopLeftRadius: theme.sizing.scale400,
                        borderBottomRightRadius: theme.sizing.scale400,
                      },
                    },
                  },
                },
              )
            }
          }}
          render={({ handleChange, values, isSubmitting }) => (
            <Form>
              <ModalHeader>Thêm thiết bị</ModalHeader>
              <ModalBody>
                <FormControl label="Tên thiết bị *">
                  <Input
                    required
                    name="name"
                    type="text"
                    onChange={handleChange}
                    placeholder="X Iot"
                    value={values.name}
                    overrides={{
                      InputContainer: {
                        style: {
                          borderTopLeftRadius: theme.sizing.scale400,
                          borderBottomRightRadius: theme.sizing.scale400,
                        },
                      },
                    }}
                  />
                </FormControl>
                <FormControl label="ID thiết bị *">
                  <Input
                    required
                    disabled
                    name="deviceID"
                    type="text"
                    onChange={handleChange}
                    value={values.deviceID}
                    overrides={{
                      InputContainer: {
                        style: {
                          borderTopLeftRadius: theme.sizing.scale400,
                          borderBottomRightRadius: theme.sizing.scale400,
                        },
                      },
                    }}
                  />
                </FormControl>
                {/* <FormControl
                  label="Khóa riêng tư Sawtooth *"
                  caption="TODO: Help"
                >
                  <Input
                    required
                    name="privateKey"
                    type="text"
                    onChange={handleChange}
                    value={values.privateKey}
                    overrides={{
                      InputContainer: {
                        style: {
                          borderTopLeftRadius: theme.sizing.scale400,
                          borderBottomRightRadius: theme.sizing.scale400,
                        },
                      },
                    }}
                  />
                </FormControl> */}
                <FormControl label="Miêu tả thêm *">
                  <Input
                    required
                    name="desc"
                    type="text"
                    onChange={handleChange}
                    value={values.desc}
                    overrides={{
                      InputContainer: {
                        style: {
                          borderTopLeftRadius: theme.sizing.scale400,
                          borderBottomRightRadius: theme.sizing.scale400,
                        },
                      },
                    }}
                  />
                </FormControl>

                <FieldArray
                  name="data_fields"
                  render={arrayHelpers => (
                    <>
                      <Block display="flex" alignItems="center">
                        <Label2 paddingRight="scale400">Data fields</Label2>
                        <Block>
                          <Button
                            type="button"
                            shape="round"
                            kind="secondary"
                            size="compact"
                            onClick={() =>
                              arrayHelpers.push({
                                field_display: '',
                                field_name: '',
                                field_unit: '',
                              })
                            }
                          >
                            <Plus size={18} />
                          </Button>
                        </Block>
                      </Block>

                      <Block as="br" />

                      {values.data_fields &&
                        values.data_fields.length > 0 &&
                        values.data_fields.map((data_field, i) => (
                          <div key={i}>
                            <Block
                              display="flex"
                              justifyContent="space-between"
                              alignItems="center"
                            >
                              <Block flex="2" marginRight="scale400">
                                <FormControl label="Trường hiển thị*">
                                  <Input
                                    required
                                    name={`data_fields.${i}.field_display`}
                                    type="text"
                                    onChange={handleChange}
                                    placeholder="Nhiệt độ"
                                    value={data_field.field_display}
                                    overrides={{
                                      InputContainer: {
                                        style: {
                                          borderTopLeftRadius:
                                            theme.sizing.scale400,
                                          borderBottomRightRadius:
                                            theme.sizing.scale400,
                                        },
                                      },
                                    }}
                                  />
                                </FormControl>
                              </Block>
                              <Block flex="2" marginRight="scale400">
                                <FormControl label="key*">
                                  <Input
                                    required
                                    name={`data_fields.${i}.field_name`}
                                    type="text"
                                    onChange={handleChange}
                                    placeholder="temperature"
                                    value={data_field.field_name}
                                    overrides={{
                                      InputContainer: {
                                        style: {
                                          borderTopLeftRadius:
                                            theme.sizing.scale400,
                                          borderBottomRightRadius:
                                            theme.sizing.scale400,
                                        },
                                      },
                                    }}
                                  />
                                </FormControl>
                              </Block>
                              <Block flex="1" marginRight="scale400">
                                <FormControl label="Đơn vị">
                                  <Input
                                    //required
                                    name={`data_fields.${i}.field_unit`}
                                    type="text"
                                    onChange={handleChange}
                                    placeholder="°C"
                                    value={data_field.field_unit || ""}
                                    overrides={{
                                      InputContainer: {
                                        style: {
                                          borderTopLeftRadius:
                                            theme.sizing.scale400,
                                          borderBottomRightRadius:
                                            theme.sizing.scale400,
                                        },
                                      },
                                    }}
                                  />
                                </FormControl>
                              </Block>

                              <Block marginTop="scale500">
                                <Button
                                  disabled={
                                    values.data_fields.length === 1
                                      ? true
                                      : false
                                  }
                                  type="button"
                                  shape="round"
                                  kind="tertiary"
                                  onClick={() => arrayHelpers.remove(i)}
                                >
                                  <X size={18} color={theme.colors.mono700} />
                                </Button>
                              </Block>
                            </Block>
                          </div>
                        ))}
                    </>
                  )}
                />
              </ModalBody>
              <ModalFooter>
                <ModalButton
                  type="button"
                  onClick={() => setIsOpen(false)}
                  kind="tertiary"
                  overrides={{
                    BaseButton: {
                      style: {
                        borderTopLeftRadius: theme.sizing.scale400,
                        borderBottomRightRadius: theme.sizing.scale400,
                      },
                    },
                  }}
                >
                  Hủy
                </ModalButton>
                <ModalButton
                  disabled={isSubmitting}
                  isLoading={isSubmitting}
                  type="submit"
                  overrides={{
                    BaseButton: {
                      style: {
                        borderTopLeftRadius: theme.sizing.scale400,
                        borderBottomRightRadius: theme.sizing.scale400,
                        backgroundColor: theme.colors.positive500,
                        ':hover': {
                          backgroundColor: theme.colors.positive600,
                          boxShadow: theme.lighting.shadow500,
                        },
                        ':focus': {
                          backgroundColor: theme.colors.positive600,
                          boxShadow: theme.lighting.shadow500,
                        },
                        ':active': {
                          backgroundColor: theme.colors.positive700,
                          boxShadow: theme.lighting.shadow400,
                        },
                      },
                    },
                  }}
                >
                  Thêm
                </ModalButton>
              </ModalFooter>
            </Form >
          )}
        />
      </Modal >
    </div >
    // <div>hihi</div>
  )
}

export default IndexPage
