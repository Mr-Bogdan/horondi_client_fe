import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles(() => ({
  root: ({ fromSideBar }) => ({
    display: 'flex',
    alignItems: 'center',
    marginLeft: 'auto',
    marginTop: fromSideBar ? 'auto' : 0,
    padding: 0
  }),

  wishlist: {
    '@media (max-width: 450px)': {
      display: 'none'
    }
  },

  cart: {
    '@media (max-width: 450px)': {
      display: 'none'
    }
  },

  profile: {
    '@media (max-width: 450px)': {
      display: 'none'
    }
  }
}));
