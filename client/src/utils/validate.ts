export function validateText(text: string): boolean {
  const allowedTags: Record<string, string[]> = {
    a: ["href", "title"],
    code: [],
    i: [],
    strong: [],
  };

  const tagPattern = /<\/?([a-z][a-z0-9]*)\b([^>]*)>/gi;
  const attributePattern = /([a-zA-Z]+)="([^"]*)"/g;
  const stack = [];

  let match;
  while ((match = tagPattern.exec(text)) !== null) {
    const [fullTag, tagName, attributes] = match;
    const isClosingTag = fullTag.startsWith("</");

    if (!allowedTags[tagName]) {
      return false;
    }

    if (isClosingTag) {
      if (stack.length === 0 || stack.pop() !== tagName) {
        return false;
      }
    } else {
      const attrMatch = [];
      let attr;
      while ((attr = attributePattern.exec(attributes)) !== null) {
        const [fullAttr, attrName] = attr;
        if (!allowedTags[tagName].includes(attrName)) {
          return false;
        }
        attrMatch.push(fullAttr);
      }
      stack.push(tagName);
    }
  }

  return stack.length === 0;
}
