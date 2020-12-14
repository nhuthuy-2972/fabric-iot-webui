import * as React from 'react'
import { useStyletron,withStyle } from 'baseui'
import { Button } from 'baseui/button'
import { DevicesTable } from './table'
import { PlusCircle, Plus, X, RotateCcw, Search } from 'react-feather'
import {
  Modal,
  ModalFooter,
  ModalButton,
  ModalHeader,
  ModalBody,
} from 'baseui/modal'
import { toaster } from 'baseui/toast'
import { db } from '../hooks/use-auth'
import { useAuth } from '../hooks/use-auth'
import axios from 'axios'
import { FieldArray, Form, Formik } from 'formik'
import { Block } from 'baseui/block'
import { Label2, Paragraph2 } from 'baseui/typography'
import { Input } from 'baseui/input'
import { FormControl } from 'baseui/form-control'
import { StyledSpinnerNext } from 'baseui/spinner'
import { Radio, RadioGroup } from 'baseui/radio'
import { Checkbox, LABEL_PLACEMENT } from 'baseui/checkbox'
import { StyledTable, StyledHeadCell, StyledBodyCell } from 'baseui/table-grid'

// import Yup from 'yup';
const IndexPage = () => {
  const [css, theme] = useStyletron()
  const [devices, setDevices] = React.useState('loading')

  const [linkedDevices, setLinkedDevices] = React.useState('loading')
  const [isOpen, setIsOpen] = React.useState(false)
  const { state }: any = useAuth()
  const inputRefOwn = React.useRef<HTMLInputElement>(null)
  const inputRefShare = React.useRef<HTMLInputElement>(null)
  const [valueOwn, setValueOwn] = React.useState('deviceID')
  const [valueShare, setValueShare] = React.useState('deviceID')
  const [warning, setWarning] = React.useState(false)
  // const testfun = async () => {
  //   // db.collection('device')
  //   //   .add({
  //   //     actived: 'no',
  //   //     auth: state.user.uid,
  //   //     name: 'name ne',
  //   //     desc: 'mieu ta ne',
  //   //     refUser: [],
  //   //   })
  //   //   .catch((err) => {
  //   //     console.log(err)
  //   //   })
  //   // db.collection('device')
  //   //   .doc("BEYrnnNHj2f3hgQiLkL4")
  //   //   .get()
  //   //   .then((doc : any)=>{
  //   //     if(doc.exit())
  //   //   })
  //   db.collection('device')
  //     .add({
  //       actived: 'no',
  //       auth: state.user.uid,
  //       name: 'name ne',
  //       desc: 'mieu ta ne',
  //       refUser: [],
  //     })
  //     .catch((err) => {
  //       console.log(err)
  //     })
  // }
  // const phoneRegExp = /(03|05|07|08|09|01[2|6|8|9])+([0-9]{8})\b/
  // const displayError = Yup.object().shape({
  //   phone_number: Yup.string().matches(phoneRegExp,'Sô điện thoại không hợp lệ')
  // });

  const HeadCellLeft = withStyle(StyledHeadCell, ({ $theme }) => ({
    boxShadow: 'none',
    backgroundColor: $theme.colors.positive,
  
    borderWidth: '0px',
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
  
  const searchbutton1 = async (e: any, type: String) => {
    // console.log(e)
    e.preventDefault()
    const result: any = []
    console.log(type)

    const inputRef = type === 'searchOwn' ? inputRefOwn : inputRefShare

    if (inputRef.current?.value !== '') {
      console.log(inputRef.current?.value)
      const searchinput = inputRef.current?.value
      const fieldcompare = type === 'searchOwn' ? valueOwn : valueShare
      console.log(fieldcompare)
      const listdevice: any = type === 'searchOwn' ? devices : linkedDevices

      if (fieldcompare === 'deviceID') {
        for (let i in listdevice) {
          // const deviceID: any = listdevice[i].deviceID
          // console.log(deviceID)
          if (listdevice[i].deviceID.includes(searchinput)) {
            console.log('co chua')
            result.push(listdevice[i])
          }
        }
        type === 'searchOwn' ? setDevices(result) : setLinkedDevices(result)
      } else if (fieldcompare === 'name') {
        for (let i in listdevice) {
          // const deviceID: any = listdevice[i].deviceID
          console.log(listdevice[i])
          if (listdevice[i].name.includes(searchinput)) {
            console.log('co chua')
            result.push(listdevice[i])
          }
        }
        type === 'searchOwn' ? setDevices(result) : setLinkedDevices(result)
      } else {
        type === 'searchOwn' ? setDevices(result) : setLinkedDevices(result)
      }
    } else {
      console.log('rong')
      return inputRef.current && inputRef.current.focus()
    }
  }

  // const searchbutton = async () => {
  //   const result: any = []
  //   if (inputRefOwn.current?.value !== '') {
  //     console.log(inputRefOwn.current?.value)
  //     const searchinput = inputRefOwn.current?.value
  //     const fieldcompare = valueOwn
  //     console.log(fieldcompare)
  //     if (fieldcompare === 'deviceID') {
  //       await db
  //         .collection('device')
  //         .doc(searchinput)
  //         .get()
  //         .then((doc: any) => {
  //           if (doc.exists) {
  //             let data = doc.data()
  //             data.deviceID = doc.id
  //             result.push(data)
  //             setDevices(result)
  //           } else {
  //             setDevices(result)
  //           }
  //         })
  //         .catch((err) => {
  //           console.log(err)
  //           setDevices(result)
  //         })
  //     } else {
  //       console.log('do day')
  //       await db
  //         .collection('device')
  //         .where('auth', '==', state.user.uid)
  //         .where(fieldcompare, '==', searchinput)
  //         .get()
  //         .then((snapshot: any) => {
  //           snapshot.forEach(async (doc: any) => {
  //             const data = doc.data()
  //             data.deviceID = doc.id
  //             result.push(data)
  //           })
  //           setDevices(result)
  //         })
  //         .catch((err) => {
  //           console.log(err)
  //           setDevices(result)
  //         })
  //     }
  //   } else {
  //     console.log('rong')
  //     return inputRefOwn.current && inputRefOwn.current.focus()
  //   }
  // }

  const reloadbutton = (e: any, type: String) => {
    e.preventDefault()

    const snapshot: any =
      type === 'reloadOwn'
        ? db.collection('device').where('auth', '==', state.user.uid)
        : db
            .collection('device')
            .where('refUser', 'array-contains', state.user.uid)
    let arrdevice: any = []
    snapshot
      .get()
      .then((snapshot: any) => {
        snapshot.forEach(async (doc: any) => {
          const data = doc.data()
          data.deviceID = doc.id
          // console.log(data)
          arrdevice.push(data)
        })

        type === 'reloadOwn'
          ? setDevices(arrdevice)
          : setLinkedDevices(arrdevice)
      })
      .catch(function (error: any) {
        console.log('Error getting documents: ', error)
      })
  }

  React.useEffect(() => {
    console.log('goi useffect')
    let unsubscribe: any = db
      .collection('device')
      .where('auth', '==', state.user.uid)
      .onSnapshot((snapshot: any) => {
        let arrdevice: any = []
        snapshot.forEach(async (doc: any) => {
          const data = doc.data()
          // // console.log(data)
          data.deviceID = doc.id
          arrdevice.push(data)
        })
        setDevices(arrdevice)
      })
    return () => unsubscribe()
  }, [state.user.uid])

  React.useEffect(() => {
    console.log('goi useffect')
    let unsubscribe: any = db
      .collection('device')
      .where('refUser', 'array-contains', state.user.uid)
      .onSnapshot((snapshot: any) => {
        let arrdevice: any = []
        snapshot.forEach(async (doc: any) => {
          const data = doc.data()
          data.deviceID = doc.id
          arrdevice.push(data)
        })
        setLinkedDevices(arrdevice)
      })
    return () => unsubscribe()
  }, [state.user.uid])

  return (
    <div
      className={css({
        maxWidth: '1300px',
        padding: theme.sizing.scale400,
        margin: `${theme.sizing.scale600} auto`,
      })}
    >
      <div
        className={css({
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: theme.sizing.scale600,
        })}
      >
        <div
          className={css({
            ...theme.typography.font650,
            marginBottom: theme.sizing.scale600,
          })}
        >
          DANH SÁCH THIẾT BỊ ĐANG SỞ HỬU
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
                backgroundColor: theme.colors.contentInverseSecondary,
                borderBottomRightRadius: theme.sizing.scale600,
                borderTopLeftRadius: theme.sizing.scale400,
                // color : theme.colors.mono100,
              },
            },
          }}
        >
          Thêm thiết bị
        </Button>
      </div>

      <div
        className={css({
          display: 'flex',
          justifyContent: 'flex-left',
          alignItems: 'center',
          marginBottom: theme.sizing.scale600,
        })}
      >
        <Input
          inputRef={inputRefOwn}
          placeholder="Nhập ID hoặc tên để tìm kiếm thiết bi"
          overrides={{
            Root: {
              style: {
                width: '30%',
                marginRight: theme.sizing.scale700,
              },
            },
          }}
        />
        <RadioGroup
          align="horizontal"
          name="horizontal"
          // overrides={{
          //   Root: {
          //     style: {
          //       marginRight: theme.sizing.scale700,
          //     },
          //   },
          // }}
          onChange={(e) => setValueOwn(e.target.value)}
          value={valueOwn}
        >
          <Radio
            value="deviceID"
            overrides={{
              RadioMarkOuter: {
                style: ({ $theme }) => {
                  return {
                    backgroundColor: $theme.colors.contentInverseSecondary,
                  }
                },
              },
            }}
          >
            ID thiết bị
          </Radio>
          <Radio
            value="name"
            overrides={{
              RadioMarkOuter: {
                style: ({ $theme }) => {
                  return {
                    backgroundColor: $theme.colors.contentInverseSecondary,
                  }
                },
              },
            }}
          >
            Tên thiết bị
          </Radio>
        </RadioGroup>
        <Button
          kind={'secondary'}
          overrides={{
            BaseButton: {
              style: {
                backgroundColor: theme.colors.contentInverseSecondary,
                // color : theme.colors.mono700,
                borderTopLeftRadius: theme.sizing.scale400,
                borderBottomRightRadius: theme.sizing.scale400,
                marginRight: theme.sizing.scale400,
                marginLeft: theme.sizing.scale700,
              },
            },
          }}
          startEnhancer={() => (
            <Search color={theme.colors.mono700} size={18} />
          )}
          onClick={(e) => searchbutton1(e, 'searchOwn')}
        >
          Tim kiếm
        </Button>
        <Button
          kind={'secondary'}
          overrides={{
            BaseButton: {
              style: {
                borderTopLeftRadius: theme.sizing.scale400,
                borderBottomRightRadius: theme.sizing.scale400,
                backgroundColor: theme.colors.contentInverseSecondary,
                // color : theme.colors.mono100,
              },
            },
          }}
          startEnhancer={() => (
            <RotateCcw color={theme.colors.mono700} size={18} />
          )}
          onClick={(e) => reloadbutton(e, 'reloadOwn')}
        >
          Tải lại
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
       <> <div
        className={css({
          marginTop: theme.sizing.scale400,
          marginBottom: theme.sizing.scale400,
        })}
      >
        <NewStyledTable $gridTemplateColumns="auto auto auto auto auto">
          <HeadCellLeft $sticky={false}>ID</HeadCellLeft>
          <HeadCellLeft $sticky={false}>Tên thiết bị</HeadCellLeft>
          <HeadCellLeft $sticky={false}>Miêu tả</HeadCellLeft>
          <HeadCellLeft $sticky={false}>Trạng thái</HeadCellLeft>
          <HeadCellLeft $sticky={false}></HeadCellLeft>
        </NewStyledTable>
      </div>
        <div
          className={css({
            display: 'flex',
            justifyContent: 'center',
            flexDirection: 'column',
            alignItems: 'center',
            marginTop: theme.sizing.scale1000,
          })}
        >
          
          <img width="300" src="/assets/no-devices.svg" alt="#" />
          <Paragraph2>Không có thiết bị</Paragraph2>
        </div>
        </>
      )}

      {devices !== 'loading' && devices.length > 0 && (
        <DevicesTable devices={devices} type="own" />
      )}

      <div
        className={css({
          ...theme.typography.font650,
          marginBottom: theme.sizing.scale600,
          marginTop: theme.sizing.scale1000,
        })}
      >
        DANH SÁCH THIẾT BỊ ĐƯỢC CHIA SẼ
      </div>

      <div
        className={css({
          display: 'flex',
          justifyContent: 'flex-left',
          alignItems: 'center',
          marginBottom: theme.sizing.scale600,
        })}
      >
        <Input
          inputRef={inputRefShare}
          placeholder="Nhập ID hoặc tên để tìm kiếm thiết bi"
          overrides={{
            Root: {
              style: {
                width: '30%',
                marginRight: theme.sizing.scale700,
              },
            },
          }}
        />
        <RadioGroup
          align="horizontal"
          name="horizontal"
          // overrides={{
          //   Root: {
          //     style: {
          //       marginRight: theme.sizing.scale700,
          //     },
          //   },
          // }}
          onChange={(e) => setValueShare(e.target.value)}
          value={valueShare}
        >
          <Radio
            value="deviceID"
            overrides={{
              RadioMarkOuter: {
                style: ({ $theme }) => {
                  return {
                    backgroundColor: $theme.colors.contentInverseSecondary,
                  }
                },
              },
            }}
          >
            ID thiết bị
          </Radio>
          <Radio
            value="name"
            overrides={{
              RadioMarkOuter: {
                style: ({ $theme }) => {
                  return {
                    backgroundColor: $theme.colors.contentInverseSecondary,
                  }
                },
              },
            }}
          >
            Tên thiết bị
          </Radio>
        </RadioGroup>
        <Button
          kind={'secondary'}
          overrides={{
            BaseButton: {
              style: {
                backgroundColor: theme.colors.contentInverseSecondary,
                borderTopLeftRadius: theme.sizing.scale400,
                borderBottomRightRadius: theme.sizing.scale400,
                marginRight: theme.sizing.scale400,
                marginLeft: theme.sizing.scale700,
              },
            },
          }}
          startEnhancer={() => (
            <Search color={theme.colors.mono700} size={18} />
          )}
          onClick={(e) => searchbutton1(e, 'searchShare')}
        >
          Tim kiếm
        </Button>
        <Button
          kind={'secondary'}
          overrides={{
            BaseButton: {
              style: {
                backgroundColor: theme.colors.contentInverseSecondary,
                borderTopLeftRadius: theme.sizing.scale400,
                borderBottomRightRadius: theme.sizing.scale400,
              },
            },
          }}
          startEnhancer={() => (
            <RotateCcw color={theme.colors.mono700} size={18} />
          )}
          onClick={(e) => reloadbutton(e, 'reloadShare')}
        >
          Tải lại
        </Button>
      </div>
      {linkedDevices === 'loading' && (
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

      {linkedDevices !== 'loading' && linkedDevices.length === 0 && (
       <> <div
       className={css({
         marginTop: theme.sizing.scale400,
         marginBottom: theme.sizing.scale400,
       })}
     >
       <NewStyledTable $gridTemplateColumns="auto auto auto auto auto">
         <HeadCellLeft $sticky={false}>ID</HeadCellLeft>
         <HeadCellLeft $sticky={false}>Tên thiết bị</HeadCellLeft>
         <HeadCellLeft $sticky={false}>Miêu tả</HeadCellLeft>
         <HeadCellLeft $sticky={false}>Trạng thái</HeadCellLeft>
         <HeadCellLeft $sticky={false}></HeadCellLeft>
       </NewStyledTable>
     </div>
       <div
         className={css({
           display: 'flex',
           justifyContent: 'center',
           flexDirection: 'column',
           alignItems: 'center',
           marginTop: theme.sizing.scale1000,
         })}
       >
         
         <img width="300" src="/assets/no-devices.svg" alt="#" />
         <Paragraph2>Không có thiết bị Linked</Paragraph2>
       </div>
       </>
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
        size="auto"
        role="dialog"
        overrides={{
          Dialog: {
            style: {
              width: '800px',
              borderTopLeftRadius: theme.sizing.scale400,
              borderBottomRightRadius: theme.sizing.scale400,
            },
          },
        }}
      >
        <Formik
          initialValues={{
            name: '',
            desc: '',
            warning: false,
            phone_number: '',
            data_fields: [
              {
                field_display: '',
                field_name: '',
                field_unit: '',
                min: '',
                max: '',
              },
              // {
              //   field_display: 'pH',
              //   field_name: 'ph',
              //   field_unit: 'pH',
              //   min : null,
              //   max : null
              // },
              // {
              //   field_display: 'Humidity',
              //   field_name: 'humidity',
              //   field_unit: '%',
              //   min : null,
              //   max : null
              // },
            ],
          }}
          onSubmit={async (values, actions) => {
            actions.setSubmitting(true)
            console.log(warning)
            // console.log("value",values)
            let data: any = values
            try {
              values.warning = warning
              if (!warning) {
                delete data.phone_number
                for (const i in data.data_fields) {
                  // console.log(data.data_fields[i])
                  delete data.data_fields[i].max
                  delete data.data_fields[i].min
                }
              }

              console.log(data)
              const result = await axios({
                method: 'post',
                url: 'http://192.168.0.100:4002/api/user/adddevice',
                headers: {
                  Authorization: 'Bearer ' + state.customClaims.token,
                },
                data: {
                  infoDevice: {
                    ...data,
                  },
                },
              })
              console.log('ket qua them may: ', result.data)
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
              setWarning(false)
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
        >
          {({ handleChange, values, isSubmitting }) => (
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
                <FormControl>
                  <Checkbox
                    name="warning"
                    checked={warning}
                    onChange={(e: any) => {
                      setWarning(e.target.checked)
                    }}
                    labelPlacement={LABEL_PLACEMENT.right}
                  >
                    Canh Bao
                  </Checkbox>
                </FormControl>
                {warning === true && (
                  <FormControl label="Số điện thoại">
                    <Input
                      required
                      name="phone_number"
                      type="text"
                      onChange={handleChange}
                      value={values.phone_number}
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
                )}

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
                  render={(arrayHelpers) => (
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
                                    required
                                    name={`data_fields.${i}.field_unit`}
                                    type="text"
                                    onChange={handleChange}
                                    placeholder="°C"
                                    value={data_field.field_unit || ''}
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
                              {warning === true && (
                                <Block flex="1" marginRight="scale400">
                                  <FormControl label="Giá trị min">
                                    <Input
                                      required
                                      name={`data_fields.${i}.min`}
                                      type="text"
                                      onChange={handleChange}
                                      placeholder="10"
                                      value={data_field.min || ''}
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
                              )}
                              {warning === true && (
                                <Block flex="1" marginRight="scale400">
                                  <FormControl label="Giá trị Max">
                                    <Input
                                      required
                                      name={`data_fields.${i}.max`}
                                      type="text"
                                      onChange={handleChange}
                                      placeholder="40"
                                      value={data_field.max || ''}
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
                              )}

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
            </Form>
          )}
        </Formik>
      </Modal>
    </div>
    // <div>hihi</div>
  )
}

export default IndexPage
