export default theme => ({
    main: {
      width: 'auto',
      display: 'block', // Fix IE 11 issue.
      marginTop: theme.spacing.unit * 10,
      marginLeft: theme.spacing.unit * 3,
      marginRight: theme.spacing.unit * 3,
      [theme.breakpoints.up(400 + theme.spacing.unit * 3 * 2)]: {
        width: 400,
        marginLeft: 'auto',
        marginRight: 'auto',
      },
    },
    paper: {
      marginTop: theme.spacing.unit * 3,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${theme.spacing.unit * 3}px`,
    },
    avatar: {
      margin: 10,
      cursor: 'pointer'
    },
    link: {
      textDecoration: 'none',
      color: 'inherit'
    },
    hidden:{
      display: 'none'
    },
    bigAvatar: {
      margin: 10,
      width: 60,
      height: 60,
      cursor: 'pointer',
    },
    form: {
      width: '100%', // Fix IE 11 issue.
      marginTop: theme.spacing.unit,
    },
    submit: {
      marginTop: theme.spacing.unit * 3,
    },
  });