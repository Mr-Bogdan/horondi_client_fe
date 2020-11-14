import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme) => ({
  drawer: {
    '& .MuiDrawer-paper': {
      top: 64,
      padding: theme.spacing(3),
      height: 'calc(100vh - 64px)'
    }
  },
  list: {
    width: '400px'
  },
  mainItem: {
    color: theme.palette.textColor,
    textTransform: 'uppercase',
    display: 'flex',
    alignItems: 'center',
    margin: '0 20px',
    cursor: 'pointer',
    '& span, & svg': {
      fontSize: '2em'
    },
    '&:hover span': {
      textDecoration: 'underline'
    }
  },
  subList: {
    marginTop: '50px'
  },
  subItem: {
    color: theme.palette.textColor,
    textTransform: 'uppercase',
    display: 'flex',
    margin: '0 20px',
    cursor: 'pointer',
    '& span': {
      fontSize: '1.3em'
    },
    '&:hover span': {
      textDecoration: 'underline'
    }
  },
  socialIconsStyles: {
    color: '#000',
    fontSize: '3rem',
    transition: 'all 0.5s',
    padding: '0.5rem',
    borderRadius: '100%',
    width: '40px !important',
    height: '40px',
    '&:hover': {
      color: '#fff',
      backgroundColor: '#000'
    }
  }
}));
