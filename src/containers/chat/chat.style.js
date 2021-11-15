import { makeStyles } from '@material-ui/core/styles';

const flexCenter = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center'
};

export const useStyles = makeStyles(({ palette }) => ({
  chatIcon: ({ iconsVisible }) => ({
    ...flexCenter,
    background: iconsVisible ? '#E4B200' : 'black',
    margin: '0px 12px',
    padding: '0px',
    position: 'fixed',
    zIndex: '900',
    bottom: '30px',
    top: 'auto',
    height: '60px',
    width: '60px',
    borderRadius: '29px',
    boxShadow: 'rgba(0, 0, 0, 0.15) 0px 4px 12px 0px',
    right: '5%',
    transition: 'background 0.3s',
    '@media (max-width: 768px)': {
      width: '40px',
      height: '40px',
      boxShadow: ' 0 0 10px white',
      zIndex: 900
    },
    '&:hover': {
      cursor: 'pointer',
      background: '#E4B200'
    }
  }),
  iconsMessengers: {
    margin: '0px 12px',
    padding: '0px',
    position: 'fixed',
    zIndex: '900',
    bottom: '110px',
    top: 'auto',
    height: '60px',
    width: '60px',
    borderRadius: '29px',
    boxShadow: 'rgba(0, 0, 0, 0.15) 0px 4px 12px 0px',
    background: 'none',
    display: 'block',
    right: '5%',
    '@media (max-width: 768px)': {
      width: '40px',
      height: '40px'
    }
  },
  msgIcon: {
    ...flexCenter,
    width: '60px',
    height: '60px',
    background: 'black',
    position: 'fixed',
    zIndex: '900',
    borderRadius: '50%',
    marginBottom: '20px',
    cursor: 'pointer',
    boxShadow: 'white 0px 0px 10px',
    transition: 'background 0.3s',
    '@media (max-width: 768px)': {
      width: '45px',
      height: '45px'
    },
    '&:hover': {
      background: '#E4B200'
    }
  },
  msgIconActive: (mailFormVisible) => ({
    ...flexCenter,
    width: '60px',
    height: '60px',
    background: mailFormVisible ? '#E4B200' : 'black',
    borderRadius: '50%',
    marginBottom: '20px',
    cursor: 'pointer',
    position: 'fixed',
    zIndex: '900',
    '@media (max-width: 768px)': {
      width: '40px',
      height: '40px'
    }
  }),
  mailForm: {
    borderRadius: '4px',
    position: 'fixed',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    right: '15%',
    top: '10%',
    bottom: '10%',
    width: '320px',
    height: '600px',
    zIndex: 899,
    background: palette.type === 'light' ? 'white' : '#232323',
    boxShadow: '0px 5px 8px rgba(0, 0, 0, 0.25)',
    '@media (max-width: 768px)': {
      width: '70%',
      right: '15%',
      top: '8%'
    },
    '@media (max-width: 420px)': {
      width: '90%',
      right: '5%'
    },
    '@media (max-height: 750px)': {
      height: '80%',
      top: '15%'
    }
  },
  cancelIcon: {
    position: 'absolute',
    right: '1px',
    '&:hover': {
      cursor: 'pointer'
    }
  },
  contacts: {
    ...flexCenter,
    background: palette.backgroundColor,
    width: '100%',
    height: '40%',
    fontSize: '1.1rem',
    flexDirection: 'column',
    borderRadius: '4px'
  },
  contactsTitle: {
    margin: '3px 0 2px 0',
    fontSize: '1.3rem'
  },
  phoneNumbers: {
    color: palette.textColor
  },
  mailTitle: {
    marginTop: '5%',
    marginBottom: '6%',
    fontSize: '1.3rem'
  },
  logo: {
    height: '15px',
    width: '15px'
  },
  formField: {
    ...flexCenter,
    background: palette.type === 'light' ? '#efefef' : '#232323',
    flexDirection: 'column',
    width: '100%',
    height: '100%',
    borderRadius: '4px'
  },
  btnSend: {
    marginBottom: '20px',
    background: palette.button.normal.backgroundColor,
    borderRadius: '5px',
    fontSize: '1.5em',
    padding: 10,
    color: palette.button.normal.color,
    '& a': {
      color: 'inherit'
    },
    '&:hover': {
      backgroundColor: palette.button.hover.backgroundColor,
      color: palette.button.hover.color
    },
    '@media (max-width: 768px)': {
      fontSize: '1em',
      padding: 5
    }
  },
  dataInput: {
    height: '100%',
    marginBottom: '15px',
    width: '90%'
  },
  icon: {
    color: palette.white,
    fontSize: '35px',
    '@media (max-width: 768px)': {
      fontSize: '25px !important'
    }
  },
  activeMsgWrapper: {
    height: '65%',
    width: '100%'
  },
  thankForMsgWrapper: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    width: '60%'
  },
  thankForMsg: {
    fontSize: '1rem',
    marginBottom: '20px'
  }
}));
