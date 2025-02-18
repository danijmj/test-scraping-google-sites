function makeValidJsonKey(text) {
    // Remove leading and trailing whitespace
    text = text.trim();

    // Replace spaces with underscores
    text = text.replace(/\s+/g, '_');

    // To lowercase
    text = text.toLowerCase();

    // removed accents
    text = text.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  
    // Remove or replace any characters that are not alphanumeric or underscores
    text = text.replace(/[^a-zA-Z0-9_]/g, '');
  
    return text;

}

module.exports = { makeValidJsonKey };