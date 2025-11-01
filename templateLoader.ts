
export const loadTemplate = async (templateName: string): Promise<string> => {
    const response = await fetch(`/templates/${templateName}`);
    if (!response.ok) {
        throw new Error(`Failed to load template ${templateName}: ${response.statusText}`);
    }
    return response.text();
};