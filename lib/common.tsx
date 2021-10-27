export const StrapiError = (err: any) => {
  switch (err.response.data.statusCode) {
    case 403:
      return 'FORBIDDEN_ERROR';
    default:
      return err.response.data.data?.[0].messages[0].id;
  }
};
