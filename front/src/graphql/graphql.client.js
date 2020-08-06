import ApolloClient from 'apollo-boost';

export const client = new ApolloClient({
  uri: (operation) => {
    if (true || localStorage.getItem('token')) {
      const token = localStorage.getItem('token');
      const context = operation.getContext();
      context.headers = (context.headers || {});
      context.headers['Authorization'] = token || 234;
      operation.setContext(context);
    }
    return 'http://localhost:88/graphql';
  },
});
