export default `
  mutation editPost($text: String!, $id: Int!) {
    editPost(text: $text, id: $id) {
      message
    }
  }
`;
