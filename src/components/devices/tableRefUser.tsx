import * as React from 'react'
import { withStyle, useStyletron } from 'baseui'
import { StyledTable, StyledHeadCell, StyledBodyCell} from 'baseui/table-grid'
import { Tag } from 'baseui/tag'
import { Button } from 'baseui/button'
import { Activity,Share2} from 'react-feather'
import { useHistory } from 'react-router-dom'


const CenteredBodyCell = withStyle(StyledBodyCell, ({ $theme }) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    textAlign: 'center',
    paddingTop: $theme.sizing.scale500,
    paddingBottom: $theme.sizing.scale500,
  }))
  
  const CenteredBodyCellLeft = withStyle(StyledBodyCell, {
    display: 'flex',
    alignItems: 'center',
  })
  
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
  
  
  
  const Row = ({ striped, row,type }: any) => {
    const [css, theme] = useStyletron()
    const space = css({marginLeft: theme.sizing.scale300});
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
            {row.actived === 'yes' ? (
              <Tag closeable={false} variant="outlined" kind={'positive'}>
                {'Actived yet'}
              </Tag>
            ) : (
              <Tag closeable={false} variant="outlined" kind={'warning'}>
                {'Not actived'}
              </Tag>
            )}
          </div>
        </CenteredBodyCellLeft>
        <CenteredBodyCell $striped={striped}>
        <div
            className={css({
              display :"flex",
              alignItems : "right",
              textAlign: 'right',
              ...theme.typography.font300,
              textOverflow: 'ellipsis',
              overflow: 'hidden',
              whiteSpace: 'nowrap',
            })}
          >
            {row.actived === 'yes' ? (
            <Button
              size="compact"
              kind="secondary"
              startEnhancer={() => (
                <Activity color={theme.colors.warning} size={15} />
              )}
              overrides={{
                BaseButton: {
                  style: ({ $theme }) => ({
                    backgroundColor: theme.colors.positive,
                    borderBottomRightRadius: theme.sizing.scale200,
                    borderTopLeftRadius: theme.sizing.scale200,
                    color : $theme.colors.mono100,
                    
                  })
                }
              }}
              onClick={() => {
                router.push(`/devices/display/${row.deviceID}`)
              }}
            >
              Xem
            </Button>
          ) : (
            <Button
              size="compact"
              kind="secondary"
              disabled
            >
              Xem
            </Button>
          )}
          {
              (type && type === 'own') && 
              (
                  <>
                    <span className={space} />
          <Button
              size="compact"
              kind="secondary"
              onClick={() => {
                router.push(`/devices/sharemanager/${row.deviceID}`)
              }}
              startEnhancer={() => (
                <Share2 color={theme.colors.contentNegative} size={15} />
              )}
              overrides={{
                BaseButton: {
                  style: ({ $theme }) => ({
                    backgroundColor: theme.colors.positive,
                    borderBottomRightRadius: theme.sizing.scale200,
                    borderTopLeftRadius: theme.sizing.scale200,
                    color : $theme.colors.mono100,
                  })
                }
              }}
            >
              Quản lí chia sẽ
            </Button>
                  </>
              )
          }
          </div>
          
        </CenteredBodyCell>
      </>
    )
  }
  
  export const DevicesTable = ({ devices,type }: any) => {
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
          <HeadCellLeft $sticky={false}>Trạng thái</HeadCellLeft>
          <HeadCellLeft $sticky={false}></HeadCellLeft>
          {/* <HeadCellLeft $sticky={false}>Hành động</HeadCellLeft> */}
          {devices!.map((row: any, index: any) => {
            const striped = (index + 1) % 2 === 0
            return <Row key={index} row={row} striped={striped}  type={type}/>
          })}
        </NewStyledTable>
      </div>
    )
  }