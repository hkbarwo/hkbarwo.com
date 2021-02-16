
const merge = require('deepmerge');

exports.fetchSiteData = async ({ graphql }, { locale }) => {
  const result = await graphql(`
    {
      contact: yamlPagesContactInfo {
        fields {
          ${locale} {
            phone
            fax
            email
            address
            title
          }
        }
      }
      general: yamlSiteGeneral {
        fields {
          ${locale} {
            copyright
            menuTitle
            siteTitle
            socialAccounts {
              facebook
              instagram
              youtube
            }
            themeSettings {
              light
              dark
            }
          }
        }
      }
      newsletter: yamlSiteNewsletter {
        fields {
          ${locale} {
            buttonTitle
            cta
            placeholder
          }
        }
      }
    }
  `);

  return {
    contact: result.data.contact.fields[locale],
    general: result.data.general.fields[locale],
    newsletter: result.data.newsletter.fields[locale],
  }
}