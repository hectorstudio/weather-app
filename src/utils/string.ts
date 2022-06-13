// Convert Object into Plain URL query
export const generateQuery = (obj: Record<string, string | undefined>): string => {
  let query = '';

  Object.keys(obj).forEach((el: string) => {
    if (obj[el]) {
      query += `&${el}=${obj[el]}`;
    }
  });

  return query;
}
