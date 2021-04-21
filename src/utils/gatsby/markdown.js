const { Remarkable, utils } = require('remarkable');

exports.createRemarkable = () => {
  const remarkable = new Remarkable();

  const parseImageToken = remarkable.renderer.rules.image;
  remarkable.renderer.rules.image = (tokens, idx, options) => {
    const imageBlock = parseImageToken(tokens, idx, options);
    const title = tokens[idx].title ? utils.escapeHtml(utils.replaceEntities(tokens[idx].title)) : '';
    return `<figure>${imageBlock}<figcaption class="text-14 text-center">${title}</figcaption></figure>`;
  }

  return remarkable;
}
