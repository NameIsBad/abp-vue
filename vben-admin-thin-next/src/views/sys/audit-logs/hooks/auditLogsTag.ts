export function statusCode(statusCode: Nullable<Number>): String {
  if (statusCode?.toString()?.startsWith('2')) return 'success';
  if (statusCode?.toString()?.startsWith('3')) return 'warning';
  return 'error';
}

export function httpMethod(httpMethod: Nullable<String>): String {
  switch (httpMethod?.toLowerCase()) {
    case 'get':
    case 'post':
      return 'success';
    case 'put':
      return 'warning';
    default:
      return 'error';
  }
}
