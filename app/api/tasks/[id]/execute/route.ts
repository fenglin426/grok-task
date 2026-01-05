import { NextRequest, NextResponse } from 'next/server';
import { storage } from '@/lib/storage';
import { grokClient } from '@/lib/grokClient';

export async function POST(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const params = await context.params;
    const task = await storage.getTask(params.id);
    if (!task) {
      return NextResponse.json(
        { success: false, error: 'Task not found' },
        { status: 404 }
      );
    }

    // 执行 Grok 任务
    const result = await grokClient.executeTask(task.prompt);

    // 记录执行历史
    await storage.createExecution({
      taskId: task.id,
      status: result.success ? 'success' : 'failed',
      result: result.content,
      error: result.error,
    });

    return NextResponse.json({
      success: true,
      data: {
        taskId: task.id,
        executionResult: result,
      },
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
