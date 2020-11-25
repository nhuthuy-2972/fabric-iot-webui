import React from 'react'
import { useStyletron } from 'baseui'
import { Button } from 'baseui/button'
import { Link, useHistory } from 'react-router-dom'
import { Paragraph2 } from 'baseui/typography'

import { useAuth } from '../../hooks/use-auth'

export const Nav: React.FC<{}> = () => {
  const [css, theme] = useStyletron()
  const { state, signout }: any = useAuth()
  const history = useHistory();

  function logout() {
    history.push('/')
    signout()
  }

  console.log(state);
  return (
    <>
      <div
        className={css({
          maxHeight: '56px',
          backgroundColor: 'white',
          boxShadow: theme.lighting.shadow400,
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
            <img height="40" alt="logo" src="/logo192.ico" />
          </Link>
        </div>
        <ul
          className={css({
            display: 'flex',
            listStyle: 'none',
            color: 'black',
            alignItems: 'center',
          })}
        >
        </ul>
        <div className={css({ display: 'flex' })}>
          <Paragraph2 marginRight="scale300" color="scale900">
            {state.user.email}
          </Paragraph2>
          <Button size="compact" onClick={() => logout()} kind="secondary">
            Đăng xuất
          </Button>
        </div>
      </div>
    </>
  )
}
