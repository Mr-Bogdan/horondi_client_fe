import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme) => ({
  cardBody: ({ position, fromSideBar }) => ({
    flex: position === 'center' ? 0 : 1,
    '@media screen and (max-width: 552px)': {
      width: '50%',
      padding: '20px 25px 10px',
      margin: fromSideBar ? '20px 0 10px 0' : ''
    }
  }),
  logo: ({ color }) => ({
    boxSizing: 'border-box',
    letterSpacing: '0.2rem',
    fontSize: '1.5rem',
    color,
    textDecoration: 'none',
    fontFamily: 'Montserrat',
    fontWeight: 'bold',
    '@media (max-width: 768px)': {
      display: 'flex',
      justifyContent: 'center',
      textAlign: 'center',
      marginLeft: '0px',
      fontSize: '1rem'
    }
  }),
  cardBodyFooter: {
    flex: 1,
    padding: '50px 20px 20px',
    '@media screen and (max-width: 768px)': {
      flex: '1 1 50%'
    },
    '@media screen and (max-width: 552px)': {
      flex: 1
    }
  },
  iconsBox: {
    display: 'flex',
    flexDirection: 'column',
    paddingTop: '15px',
    '@media (max-width: 552px)': {
      paddingTop: '20px'
    }
  },
  cardTitleFooter: {
    marginTop: '50px'
  },
  cardTitle: {
    fontSize: '14px',
    '@media screen and (max-width: 552px)': {
      textAlign: 'center'
    }
  },
  iconsContainer: ({ position, fromSideBar }) => ({
    display: 'flex',
    justifyContent: position,
    '@media screen and (max-width: 552px)': {
      justifyContent: 'space-around'
    },
    transform: fromSideBar ? 'scale(1.2)' : '',
    marginTop: '19px',
    marginLeft: fromSideBar ? '25px' : ''
  }),
  iconWrap: {
    marginRight: '16px',
    color: 'transparent',
    transition: 'color 0.5s linear 0s',
    '&:hover': {
      color: theme.palette.type === 'light' ? '#000000' : '#FFFFFF'
    }
  }
}));
