export default `
  mutation deletePost($id: Int!) {
    deletePost(id: $id) {
      message
    }
  }
`;
