// 使用简单的内存存储用于 MVP，可以后续升级到 Vercel KV
export interface Task {
  id: string;
  name: string;
  description?: string;
  prompt: string;
  schedule: string;
  templateId?: string;
  status: 'active' | 'paused' | 'completed';
  createdAt: string;
  updatedAt: string;
}

export interface TaskExecution {
  id: string;
  taskId: string;
  status: 'success' | 'failed';
  result?: string;
  error?: string;
  executedAt: string;
}

export interface Template {
  id: string;
  name: string;
  description: string;
  category: string;
  prompt: string;
  defaultSchedule: string;
}

// 内存存储（简化版本，生产环境应使用 Vercel KV 或数据库）
// 使用 global 对象来避免 Next.js 热重载时重置数据
const globalForStorage = global as typeof globalThis & {
  tasks?: Task[];
  executions?: TaskExecution[];
};

if (!globalForStorage.tasks) {
  globalForStorage.tasks = [];
}
if (!globalForStorage.executions) {
  globalForStorage.executions = [];
}

const tasks = globalForStorage.tasks;
const executions = globalForStorage.executions;

export const storage = {
  // Tasks
  getTasks: async (): Promise<Task[]> => {
    return tasks;
  },

  getTask: async (id: string): Promise<Task | undefined> => {
    return tasks.find(t => t.id === id);
  },

  createTask: async (task: Omit<Task, 'id' | 'createdAt' | 'updatedAt'>): Promise<Task> => {
    const newTask: Task = {
      ...task,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    tasks.push(newTask);
    return newTask;
  },

  updateTask: async (id: string, updates: Partial<Task>): Promise<Task | null> => {
    const index = tasks.findIndex(t => t.id === id);
    if (index === -1) return null;

    tasks[index] = {
      ...tasks[index],
      ...updates,
      updatedAt: new Date().toISOString(),
    };
    return tasks[index];
  },

  deleteTask: async (id: string): Promise<boolean> => {
    const index = tasks.findIndex(t => t.id === id);
    if (index === -1) return false;
    tasks.splice(index, 1);
    return true;
  },

  // Executions
  getExecutions: async (taskId: string): Promise<TaskExecution[]> => {
    return executions.filter(e => e.taskId === taskId).slice(0, 50);
  },

  createExecution: async (execution: Omit<TaskExecution, 'id' | 'executedAt'>): Promise<TaskExecution> => {
    const newExecution: TaskExecution = {
      ...execution,
      id: Date.now().toString(),
      executedAt: new Date().toISOString(),
    };
    executions.push(newExecution);
    return newExecution;
  },
};
