const config = {
  screens: {
    Order: {
      path: 'order',
    },
    Assignment: {
      path: 'assign',
    },
    Details: {
      path: 'details',
    },
  },
};

const linking = {
  prefixes: ['myapp://app'],
  config,
};

export default linking;
