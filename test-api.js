const axios = require('axios');

async function testAPI() {
  const baseURL = 'http://localhost:3000';

  console.log('🧪 开始测试 API...\n');

  try {
    // 1. 创建任务
    console.log('1️⃣ 测试创建任务...');
    const createRes = await axios.post(`${baseURL}/api/tasks`, {
      name: '测试任务',
      description: '这是一个测试任务',
      prompt: '请用一句话介绍你自己',
      schedule: '0 * * * *',
      status: 'active'
    });
    console.log('✅ 任务创建成功:', createRes.data);
    const taskId = createRes.data.data.id;
    console.log('   任务 ID:', taskId, '\n');

    // 2. 获取任务列表
    console.log('2️⃣ 测试获取任务列表...');
    const listRes = await axios.get(`${baseURL}/api/tasks`);
    console.log('✅ 任务列表:', listRes.data.data.length, '个任务\n');

    // 3. 获取单个任务
    console.log('3️⃣ 测试获取单个任务...');
    const getRes = await axios.get(`${baseURL}/api/tasks/${taskId}`);
    console.log('✅ 任务详情:', getRes.data.data.name, '\n');

    // 4. 执行任务
    console.log('4️⃣ 测试执行任务...');
    console.log('   正在调用 Grok API，请稍候...');
    const executeRes = await axios.post(`${baseURL}/api/tasks/${taskId}/execute`);
    console.log('✅ 任务执行结果:');
    console.log('   成功:', executeRes.data.success);
    if (executeRes.data.data?.executionResult?.content) {
      console.log('   Grok 响应:', executeRes.data.data.executionResult.content.substring(0, 200), '...\n');
    } else {
      console.log('   完整响应:', JSON.stringify(executeRes.data, null, 2), '\n');
    }

    // 5. 获取执行历史
    console.log('5️⃣ 测试获取执行历史...');
    const execRes = await axios.get(`${baseURL}/api/tasks/${taskId}/executions`);
    console.log('✅ 执行历史:', execRes.data.data.length, '条记录\n');

    // 6. 删除任务
    console.log('6️⃣ 测试删除任务...');
    const deleteRes = await axios.delete(`${baseURL}/api/tasks/${taskId}`);
    console.log('✅ 任务已删除\n');

    console.log('🎉 所有测试通过！');

  } catch (error) {
    console.error('❌ 测试失败:');
    if (error.response) {
      console.error('   状态码:', error.response.status);
      console.error('   错误信息:', error.response.data);
    } else {
      console.error('   错误:', error.message);
    }
  }
}

testAPI();
