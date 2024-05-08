import { Meta, StoryObj } from "@storybook/react";
import { ApiStories } from "./apiStories";

const meta: Meta<typeof ApiStories> = {
  component: ApiStories,
  title: "Компоненты/API_Stories",
  tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof ApiStories>;
export const get_todos: Story = {
  args: {
    btnName: "Получить тудулисты",
  },
};
export const delete_todo: Story = {
  args: {
    btnName: "Удалить тудулист",
  },
};
export const create_todo: Story = {
  args: {
    btnName: "Создать тудулист",
  },
};
export const update_todo_title: Story = {
  args: {
    btnName: "Обновить тайтл тудулиста",
  },
};

export const get_tasks_for_todo: Story = {
  args: {
    btnName: "Получить таски тудулиста",
  },
};
export const create_task_for_todo: Story = {
  args: {
    btnName: "Создать таску тудулиста",
  },
};
export const delete_task_for_todo: Story = {
  args: {
    btnName: "Удалить таску тудулиста",
  },
};
export const update_task_for_todo: Story = {
  args: {
    btnName: "Обновить таску тудулиста",
  },
};
