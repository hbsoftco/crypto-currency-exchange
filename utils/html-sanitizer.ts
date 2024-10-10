import DOMPurify from 'dompurify';

export const sanitizedHtml = (html: string) => {
	return DOMPurify.sanitize(html);
};
