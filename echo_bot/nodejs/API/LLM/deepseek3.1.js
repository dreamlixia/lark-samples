import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env['ARK_API_KEY'],
  baseURL: 'https://ark.cn-beijing.volces.com/api/v3',
});

const TEMPLATE_ENDPOINT_ID = 'deepseek-v3-1-250821';

export const getDSLLMApiContent = async(text) => {

  if (!text?.length) return;
  
  // Non-streaming:
  console.log('----- standard request -----')
  const completion = await openai.chat.completions.create({
    messages: [
      { role: 'system', content: '你是人工智能助手' },
      { role: 'user', content: text },
    ],
    model: TEMPLATE_ENDPOINT_ID,
  });

  const responseContent = completion.choices[0]?.message?.content;
  console.log('responseContent =', responseContent);

  return responseContent;

  // Streaming:
  // console.log('----- streaming request -----')
  // const stream = await openai.chat.completions.create({
  //   messages: [
  //     { role: 'system', content: '你是人工智能助手' },
  //     { role: 'user', content: '你好' },
  //   ],
  //   model: TEMPLATE_ENDPOINT_ID,
  //   stream: true,
  // });
  // for await (const part of stream) {
  //   process.stdout.write(part.choices[0]?.delta?.content || '');
  // }
  // process.stdout.write('\n');
}