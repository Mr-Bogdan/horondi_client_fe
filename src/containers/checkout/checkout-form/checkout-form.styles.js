import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles(({ palette }) => ({
  root: {
    color: palette.textColor,
    width: '100%',
    margin: '0 auto'
  },
  formControl: {
    width: 250,
    marginLeft: '2%',
    marginBottom: '3%'
  },
  paymentSelect: {
    height: 50,
    width: 270
  },
  contactInfoTitle: ({ isLightTheme }) => ({
    fontSize: 18,
    fontWeight: 400,
    color: isLightTheme ? '#4E4E4E' : '#fffff',
    width: '40%',
    marginLeft: '2%'
  }),
  paymentTitle: {
    marginTop: '3%'
  },
  contactInfoAdditional: {
    fontSize: 13,
    marginLeft: '2%'
  },
  orderCommentTitle: {
    fontSize: 18,
    fontWeight: 400,
    color: '#4E4E4E'
  },
  contactInfoFields: {
    display: 'flex',
    alignItems: 'flex-start',
    width: '100%',
    marginLeft: 10
  },
  a: {
    margin: 0
  },
  contactPaymentInfo: {
    display: 'flex',
    flexDirection: 'column',
    marginTop: '1%'
  },
  checkoutFormContainer: {
    display: 'flex',
    width: '100%',
    justifyContent: 'space-between'
  },
  userInfoContainer: {
    width: '60%'
  },
  contactInfoWrapper: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    alignItems: 'flex-start'
  },
  error: {
    color: '#e60000',
    marginLeft: '3%'
  },
  textField: {
    width: 300,
    margin: 10
  },
  textAreaField: {
    width: 500,
    marginLeft: '2%'
  },
  submitBtn: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontWeight: 400,
    fontSize: 17,
    outline: 'none',
    background: palette.button.normal.backgroundColor,
    borderRadius: '10px',
    width: 280,
    marginBottom: 20,
    height: 43,
    cursor: 'pointer',
    color: palette.button.normal.color,
    '&:hover': {
      backgroundColor: palette.button.hover.backgroundColor,
      color: palette.button.hover.color
    }
  },
  totalSum: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    borderTop: '1px solid #636262',
    borderBottom: '1px solid #636262',
    margin: '9% 0 7% 0',
    height: 50
  },
  totalSumTitle: ({ isLightTheme }) => ({
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'center',
    fontSize: 16,
    fontWeight: 400,
    color: isLightTheme ? '#363636' : '#fff',
    margin: 0,
    width: '100%',
    height: 20
  }),
  totalSumValue: {
    justifyContent: 'flex-end'
  },
  goods: ({ isLightTheme }) => ({
    fontSize: 13,
    transition: '0.2s',
    '&:hover': {
      transform: 'scale(1.05)',
      transition: '0.2s'
    },
    width: '55%'

  }),
  deliveryContainer: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    width: '36%',
    marginRight: '2%',
    flexWrap: 'wrap'
  },
  inputData: {
    display: 'flex',
    flexDirection: 'column'
  }
}));
