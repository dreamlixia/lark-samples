import OpenAI from 'openai';
// console.log("llm 读取到的 KEY:", process.env.ARK_API_KEY);

const openai = new OpenAI({
  apiKey: process.env?.['ARK_API_KEY'],
  baseURL: 'https://ark.cn-beijing.volces.com/api/v3',
});

const TEMPLATE_ENDPOINT_ID = 'doubao-seed-1-6-thinking-250715';

// Image input:
export const getLLMApiContent = async (text) => {
    // console.log('text =', text);

    if (!text?.length) return;
    
    const response = await openai.chat.completions.create({
        apiKey: process.env['ARK_API_KEY'],
        messages: [
        {
            role: 'user',
            content: [
                // {
                //     type: 'image_url',
                //     image_url: {
                //         url: 'https://ark-project.tos-cn-beijing.ivolces.com/images/view.jpeg',
                //     },
                // },
                { type: 'text', text: text },
            ],
        },
        ],
        model: TEMPLATE_ENDPOINT_ID,
    });

    const responseContent = response.choices[0]?.message || {};
    console.log('LLM res =', responseContent);
    return responseContent?.content || responseContent?.reasoning_content;
}