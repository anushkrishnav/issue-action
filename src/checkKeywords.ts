export const checkKeywords = (
  parameters: { assignees: string[] }[],
  content: string
): { assignees: string[] }[] | null => {
  console.log('issue content:', content);

  let matchingKeywords: { keywords: string[], labels: string[], assignees: string[] }[] = [];

  parameters.forEach(obj => {
    return obj.keywords.forEach(keyword => {
      if (RegExp(`(?!-)\\b${keyword.toLowerCase()}\\b(?!-)`, 'g').test(content.toLowerCase())) {
        matchingKeywords.push(obj);
      }
    })
  })
  
  if (matchingKeywords.length !== 0) {
    return matchingKeywords;
  } else {
    return null;
  }
  
};
