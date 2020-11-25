import React from 'react'
import { useFormik } from 'formik'
import { Input } from 'baseui/input'
import { useStyletron } from 'baseui'
import { toaster } from 'baseui/toast'
import { Button } from 'baseui/button'
import { FormControl } from 'baseui/form-control'
import { Modal, ModalHeader, ModalBody } from 'baseui/modal'

import { fbase } from '../../hooks/use-auth'
// import {}
export const LoginForm: React.FC<{}> = () => {
  const [css, theme] = useStyletron()

  return (
    <Button onClick={() => {
      fbase.auth().setPersistence(fbase.auth.Auth.Persistence.SESSION)
        .then(async function () {
          // const v = await fbase
          //   .auth()
          //   .signInWithEmailAndPassword(email, password)

          // toaster.positive(`Auth with ${v.user!.email}`, {
          //   autoHideDuration: 5000,
          // })
          //return v;
          let provider = new fbase.auth.GoogleAuthProvider();
          fbase.auth().useDeviceLanguage();
          const v = await fbase.auth().signInWithPopup(provider);
          // console.log("credental : ", v);
          toaster.positive(`Auth with Google`, {
            autoHideDuration: 5000,
          })
          return v;
        })
        .catch(function (error) {
          toaster.warning(error.message, {
            autoHideDuration: 5000,
          })
        });
    }}>Sign in with Google</Button>
  );

  // const { handleSubmit, handleChange, values, isSubmitting } = useFormik({
  //   initialValues: {
  //     email: '',
  //     password: '',
  //   },
  //   onSubmit: async (values, actions) => {
  //     actions.setSubmitting(true)

  //     fbase.auth().setPersistence(fbase.auth.Auth.Persistence.SESSION)
  //       .then(async function () {
  //         const v = await fbase
  //           .auth()
  //           .signInWithEmailAndPassword(values.email, values.password)

  //         toaster.positive(`Auth with ${v.user!.email}`, {
  //           autoHideDuration: 2000,
  //         })
  //         actions.setSubmitting(false)
  //         return v;
  //       })
  //       .catch(function (error) {
  //         toaster.warning(error.message, {
  //           autoHideDuration: 5000,
  //         })
  //       });


  //     // try {
  //     //   const v = await fbase
  //     //     .auth()
  //     //     .signInWithEmailAndPassword(values.email, values.password)

  //     //   toaster.positive(`Auth with ${v.user!.email}`, {
  //     //     autoHideDuration: 2000,
  //     //   })
  //     //   actions.setSubmitting(false)
  //     // } catch (error) {
  //     //   toaster.warning(error.message, {
  //     //     autoHideDuration: 5000,
  //     //   })
  //     // }
  //   },
  // })
  // return (
  //   <Modal
  //     unstable_ModalBackdropScroll={true}
  //     closeable={false}
  //     isOpen={true}
  //     animate
  //     autoFocus
  //     size="default"
  //     role="dialog"
  //     overrides={{
  //       DialogContainer: {
  //         style: {
  //           backgroundColor: theme.colors.mono200,
  //         },
  //       },
  //       Dialog: {
  //         style: {
  //           boxShadow: theme.lighting.shadow700,
  //           borderTopLeftRadius: theme.sizing.scale400,
  //           borderTopRightRadius: theme.sizing.scale400,
  //           borderBottomLeftRadius: theme.sizing.scale400,
  //           borderBottomRightRadius: theme.sizing.scale400,
  //         },
  //       },
  //     }}
  //   >
  //     <ModalHeader>
  //       <div
  //         className={css({
  //           ...theme.typography.font750,
  //           paddingBottom: theme.sizing.scale600,
  //         })}
  //       >
  //         LOGIN
  //       </div>
  //     </ModalHeader>
  //     <ModalBody>
  //       <form onSubmit={handleSubmit}>
  //         <FormControl label="Email">
  //           <Input
  //             type="email"
  //             name="email"
  //             value={values.email}
  //             onChange={handleChange}
  //             overrides={{
  //               InputContainer: {
  //                 style: {
  //                   borderTopLeftRadius: theme.sizing.scale200,
  //                   borderTopRightRadius: theme.sizing.scale200,
  //                   borderBottomRightRadius: theme.sizing.scale200,
  //                   borderBottomLeftRadius: theme.sizing.scale200,
  //                 },
  //               },
  //             }}
  //           />
  //         </FormControl>
  //         <FormControl label="Password">
  //           <Input
  //             type="password"
  //             name="password"
  //             value={values.password}
  //             onChange={handleChange}
  //             overrides={{
  //               InputContainer: {
  //                 style: {
  //                   borderTopLeftRadius: theme.sizing.scale200,
  //                   borderTopRightRadius: theme.sizing.scale200,
  //                   borderBottomRightRadius: theme.sizing.scale200,
  //                   borderBottomLeftRadius: theme.sizing.scale200,
  //                 },
  //               },
  //             }}
  //           />
  //         </FormControl>

  //         <Button
  //           type="submit"
  //           kind="primary"
  //           isLoading={isSubmitting}
  //           disabled={isSubmitting}
  //           overrides={{
  //             BaseButton: {
  //               style: {
  //                 marginRight: theme.sizing.scale600,
  //                 paddingTop: theme.sizing.scale400,
  //                 paddingBottom: theme.sizing.scale400,
  //                 paddingLeft: theme.sizing.scale600,
  //                 paddingRight: theme.sizing.scale600,
  //                 borderTopLeftRadius: theme.sizing.scale200,
  //                 borderTopRightRadius: theme.sizing.scale200,
  //                 borderBottomLeftRadius: theme.sizing.scale200,
  //                 borderBottomRightRadius: theme.sizing.scale200,
  //               },
  //             },
  //           }}
  //         >
  //           Đăng nhập
  //         </Button>
  //       </form>
  //     </ModalBody>
  //   </Modal>
  // )
}
