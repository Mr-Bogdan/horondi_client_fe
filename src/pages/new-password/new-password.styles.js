import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme) => ({
  passwordInput: {
    marginBottom: '32px',
    '& label': {
      transform: 'translate(14px, 14px) scale(1)'
    },
    '& div > input': {
      padding: '11px 14px !important',
      position: 'relative'
    },
    '& p': {
      position: 'absolute',
      top: '40px'
    },
    '& label.Mui-focused': {
      color: theme.palette.textColor
    },
    '& .MuiOutlinedInput-root': {
      '& fieldset': {
        borderColor: theme.palette.textColor
      },
      '&.Mui-focused fieldset': {
        borderColor: theme.palette.blue,
        borderWidth: '2px'
      }
    }
  },
  changeBtn: {
    fontSize: '1rem',
    lineHeight: '20px',
    height: '42px',
    backgroundColor: theme.palette.button.normal.backgroundColor,
    color: theme.palette.button.normal.color,
    textTransform: 'capitalize',
    '&:hover': {
      backgroundColor: theme.palette.button.hover.backgroundColor,
      color: theme.palette.button.hover.color
    }
  },
  serverError: {
    color: '#e53935',
    margin: '3px 14px -29px',
    fontSize: '0.6875 !important',
    textAlign: 'left',
    lineHeight: '13px',
    letterSpacing: '0.33px'
  }
}));
