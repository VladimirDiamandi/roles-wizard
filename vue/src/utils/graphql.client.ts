import ApolloClient from "apollo-boost";

export const apolloClient = new ApolloClient({
  uri: operation => {
    if (localStorage.getItem("token")) {
      const token = localStorage.getItem("token");
      const context = operation.getContext();
      context.headers = context.headers || {};
      context.headers["Authorization"] = token || 234;
      operation.setContext(context);
    }
    return "http://localhost:88/graphql";
  }
});
