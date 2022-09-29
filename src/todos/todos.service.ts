import { Injectable, NotFoundException } from '@nestjs/common';
import { NotFoundError } from 'rxjs';
import { CreateTodoDto } from './dto/create-todo.dto';
import { Todo } from './interfaces/todo.interface';

@Injectable()
export class TodosService {
  todos: Todo[] = [
    {
      id: 1,
      title: 'todos app',
      description: 'Create NestJs todo',
      done: false,
    },
    {
      id: 2,
      title: 'bread',
      description: 'buy bread',
      done: true,
    },
    {
      id: 3,
      title: 'wine',
      description: 'buy wine',
      done: true,
    },
  ];

  findAll(): Todo[] {
    return this.todos;
  }

  findOne(id: string) {
    return this.todos.find((todos) => todos.id === parseInt(id));
  }

  create(todo: CreateTodoDto) {
    this.todos = [...this.todos, todo];
  }

  update(id: string, todo: Todo) {
    //retrieve the todo to update
    const todoToUpdate = this.todos.find((t) => t.id === parseInt(id));
    if (!todoToUpdate) {
      return new NotFoundException();
    }
    //apply to granulary update a single property
    if (todo.hasOwnProperty('done')) {
      todoToUpdate.done = todo.done;
    }
    if (todo.title) {
      todoToUpdate.title = todo.title;
    }
    if (todo.description) {
      todoToUpdate.description = todo.description;
    }
    const uptatedTodos = this.todos.map((t) =>
      t.id !== parseInt(id) ? t : todoToUpdate,
    );
    this.todos = [...uptatedTodos];
    return uptatedTodos;
  }

  delete(id: string) {
    const nbOfTodosBeforeDelete = this.todos.length;
    this.todos = [...this.todos.filter((t) => t.id !== parseInt(id))];
    if (this.todos.length < nbOfTodosBeforeDelete) {
      return 'todo deleted';
    } else {
      return 'todo not found';
    }
  }
}
