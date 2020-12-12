import React from 'react'
import { useStyletron } from 'baseui'
import { Button } from 'baseui/button'
import { Link, useHistory } from 'react-router-dom'
import { Paragraph1,Paragraph2,Label2 } from 'baseui/typography'

import { useAuth } from '../../hooks/use-auth'
import {
  Modal,
  ModalFooter,
  ModalButton,
  ModalHeader,
  ModalBody,
} from 'baseui/modal'
import axios from 'axios'
import {Avatar} from "baseui/avatar";
import { PlusCircle, Plus, X, RotateCcw, Search ,LogOut} from 'react-feather'
import { toaster } from 'baseui/toast'
import { FieldArray, Form, Formik } from 'formik'
import { Block } from 'baseui/block'
import { Input } from 'baseui/input'
import { FormControl } from 'baseui/form-control'
import {
  PhoneInput,
  COUNTRIES
} from "baseui/phone-input";

export const Nav: React.FC<{}> = () => {
  const [css, theme] = useStyletron()
  const { state, signout }: any = useAuth()
  const history = useHistory();
  const [isOpen, setIsOpen] = React.useState(false)
  // const [country, setCountry] = React.useState(COUNTRIES.VN);
  const [phone, setphoneNumber] = React.useState(state.user.phoneNumber? state.user.phoneNumber : '' );

  // function logout() {
  //   history.push('/')
  //   signout()
  // }

  return (
    <>
      <div
        className={css({
          maxHeight: '56px',
          backgroundColor: theme.colors.backgroundPrimary,
          boxShadow: theme.lighting.shadow600,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          paddingLeft: theme.sizing.scale1000,
          paddingRight: theme.sizing.scale1000,
        })}
      >
        <div
          className={css({
            paddingTop: theme.sizing.scale400,
            paddingBottom: theme.sizing.scale300,
          })}
        >
          <Link to="/">
            <img height="40" alt="logo" src="/2152488.ico" />
          </Link>
        </div>
        

        <div className={css({ display: 'flex' })}>
          {/* <div className={css({ marginTop: theme.sizing.scale200 })} ><Avatar name={state.user.displayName} src={state.user.photoURL}/></div> */}
          <Button size='mini' shape='round' kind='tertiary' 
           overrides={{
            BaseButton: {
              style: {
                marginLeft :theme.sizing.scale300,
                backgroundColor : theme.colors.backgroundPrimary,
              },
            },
          }}
          onClick={()=>{setIsOpen(true)}}
          >
          <Avatar name={state.user.displayName} src={state.user.photoURL}/>
          </Button>
          {/* <Paragraph2 marginLeft="scale300" marginTop="scale400" marginRight="scale300" color="scale900">
            {state.user.email}
          </Paragraph2> */}
          <Button size="compact"  onClick={() => {
            history.push('/')
            signout()
          }} kind="tertiary" shape="pill"
          overrides={{
            BaseButton: {
              style: {
                marginLeft :theme.sizing.scale300,
                // backgroundColor : theme.colors.contentInverseSecondary,
              },
            },
          }}
          
          startEnhancer={() => (
            <LogOut color={theme.colors.mono700} size={18} />
          )}

          >
            Đăng xuất
          </Button>
        </div>
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
            email:state.user.email,
            name: state.user.displayName,
            phoneNumber :phone
          }}
          onSubmit={async (values, actions) => {
            actions.setSubmitting(true)
            try {

              // if(text === '') throw Error();
              // const phone = country.dialCode + text
              const phone = values.phoneNumber
              
              const result = await axios({
                method : "post",
                url : "http://192.168.0.100:4002/api/user/updatephonenumber",
                headers:{
                  Authorization : "Bearer " + state.customClaims.token,
                },
                data : {
                  phoneNumber : phone
                }
              })
              console.log("ket qua them may: ",result.data)
              
              console.log(phone)
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
              setphoneNumber(phone)
              actions.setSubmitting(false)
              setIsOpen(false)
            } catch (error) {
              console.log(error)
              actions.setSubmitting(false)
              toaster.negative(
                <div className={css({ ...theme.typography.font200 })}>
                  Đã có lôi. Vui lòng thử lại!
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
              <ModalHeader>THÔNG TIN NGƯỜI DÙNG</ModalHeader>
              <ModalBody>
              {/* <Paragraph1 marginLeft="scale300" marginTop="scale400" marginRight="scale300" color="scale900">
              {`Email :  ${state.user.email}`}
              </Paragraph1> */}
              <FormControl label="Tên người dung">
                  <Input
                    disabled
                    name="desc"
                    type="text"
                    onChange={handleChange}
                    value={values.name}
                    overrides={{
                      InputContainer: {
                        style: {
                          // width : theme.sizing.scale4800,
                          borderTopLeftRadius: theme.sizing.scale400,
                          borderBottomRightRadius: theme.sizing.scale400,
                        },
                      },
                    }}
                  />
              </FormControl>
              <FormControl label="Email">
                  <Input
                    disabled
                    name="desc"
                    type="text"
                    onChange={handleChange}
                    value={values.email}
                    overrides={{
                      InputContainer: {
                        style: {
                          // width : theme.sizing.scale4800,
                          borderTopLeftRadius: theme.sizing.scale400,
                          borderBottomRightRadius: theme.sizing.scale400,
                        },
                      },
                    }}
                  />
                </FormControl>
                <FormControl label="Số điện thoại">
                  <Input
                    required
                    name="phoneNumber"
                    type="text"
                    placeholder='+84'
                    onChange={handleChange}
                    value={values.phoneNumber}
                    overrides={{
                      InputContainer: {
                        style: {
                          width : theme.sizing.scale4800,
                          borderTopLeftRadius: theme.sizing.scale400,
                          borderBottomRightRadius: theme.sizing.scale400,
                        },
                      },
                    }}
                  />
                  {/* <PhoneInput
                    country={country}
                    onCountryChange={( event :any) => setCountry(event.option)}
                    text={text}
                    onTextChange={e => { 
                      setText(e.currentTarget.value)}
                    }
                  /> */}
                </FormControl>

                
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
                  Cập nhật
                </ModalButton>
              </ModalFooter>
            </Form>
          )}
        </Formik>
      </Modal>
      </div>
    </>
  )
}
