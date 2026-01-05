import { test, expect } from '@playwright/test';

test.describe('Grok Tasks Manager', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:3000');
  });

  test('页面加载正常', async ({ page }) => {
    await expect(page.locator('h1')).toContainText('Grok Tasks Manager');
  });

  test('显示模板库', async ({ page }) => {
    // 点击「从模板创建任务」按钮
    await page.click('text=从模板创建任务');

    // 等待模板库显示
    await expect(page.locator('text=预设模板库')).toBeVisible();

    // 检查是否有模板
    await expect(page.locator('text=X 热帖监控')).toBeVisible();
    await expect(page.locator('text=AI 技术追踪')).toBeVisible();
  });

  test('创建任务并执行', async ({ page }) => {
    // 打开模板库
    await page.click('text=从模板创建任务');

    // 等待模板加载
    await page.waitForTimeout(500);

    // 选择第一个模板（X 热帖监控）
    await page.click('text=X 热帖监控');

    // 等待任务创建
    await page.waitForTimeout(1000);

    // 检查任务是否创建成功
    await expect(page.locator('text=我的任务')).toBeVisible();

    // 找到播放按钮并点击执行
    const playButtons = page.locator('button[title="立即执行"]');
    const count = await playButtons.count();

    if (count > 0) {
      await playButtons.first().click();

      // 等待执行完成（最多60秒）
      await page.waitForTimeout(3000);

      // 检查是否有弹窗或结果
      console.log('任务执行触发');
    }
  });

  test('测试 API - 获取任务列表', async ({ request }) => {
    const response = await request.get('http://localhost:3000/api/tasks');
    expect(response.ok()).toBeTruthy();

    const data = await response.json();
    expect(data.success).toBeTruthy();
    expect(Array.isArray(data.data)).toBeTruthy();
  });

  test('测试 API - 创建任务', async ({ request }) => {
    const response = await request.post('http://localhost:3000/api/tasks', {
      data: {
        name: '测试任务',
        description: '这是一个测试任务',
        prompt: '请说你好',
        schedule: '0 * * * *',
        status: 'active'
      }
    });

    expect(response.ok()).toBeTruthy();
    const data = await response.json();
    expect(data.success).toBeTruthy();
    expect(data.data.name).toBe('测试任务');

    // 保存任务 ID 用于后续测试
    const taskId = data.data.id;

    // 测试执行任务
    const executeResponse = await request.post(`http://localhost:3000/api/tasks/${taskId}/execute`);
    console.log('执行结果:', await executeResponse.json());
  });

  test('测试 API - 获取模板', async ({ request }) => {
    const response = await request.get('http://localhost:3000/api/templates');
    expect(response.ok()).toBeTruthy();

    const data = await response.json();
    expect(data.success).toBeTruthy();
    expect(data.data.length).toBeGreaterThan(0);
  });
});
