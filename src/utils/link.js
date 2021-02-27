exports.getNavLink = (locale, item) => {
  const { page } = item;
  const { url } = page || {};
  return `/${locale}${url || ''}`
}
